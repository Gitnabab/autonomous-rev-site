import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

// Ensure Required Variables Exist
const requireEnv = (key: string) => {
    const val = process.env[key];
    if (!val) throw new Error(`Missing environment variable: ${key}`);
    return val;
};

const PINECONE_API_KEY = requireEnv('PINECONE_API_KEY');
const PINECONE_INDEX = requireEnv('PINECONE_INDEX');
const GEMINI_API_KEY = requireEnv('GEMINI_API_KEY');

// Initialize Clients
const pc = new Pinecone({ apiKey: PINECONE_API_KEY });
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Constants
const EMBEDDING_MODEL = "gemini-embedding-001";
const CHUNK_SIZE = 1000;
const CHUNK_OVERLAP = 200;

// ─── AVAILABLE NAMESPACES ────────────────────────────
// Each namespace maps to a service knowledge base
export const NAMESPACES = {
    'default': 'docs',                                    // Legacy: all docs
    'blade-websites': 'docs/notebook_sources/blade_websites',
    'seo-optimization': 'docs/notebook_sources/seo_optimization',
    'whatsapp-bot': 'docs/notebook_sources/whatsapp_bot',
    'content-writing': 'docs/notebook_sources/content_writing',
    'geo-mastery': 'docs/notebook_sources/geo_mastery',
    'social-media': 'docs/notebook_sources/social_media',
    'ai-chatbot': 'docs/notebook_sources/ai_chatbot',
    'master-intelligence': 'docs/notebook_sources/master_intelligence',
} as const;

export type NamespaceKey = keyof typeof NAMESPACES;

// Naive Text Chunker
function chunkText(text: string, size: number = CHUNK_SIZE, overlap: number = CHUNK_OVERLAP): string[] {
    const chunks: string[] = [];
    let i = 0;
    while (i < text.length) {
        let maxEnd = i + size;
        if (maxEnd >= text.length) {
            chunks.push(text.slice(i));
            break;
        }

        let end = text.lastIndexOf('\n\n', maxEnd);
        if (end <= i) end = text.lastIndexOf('. ', maxEnd);
        if (end <= i) end = text.lastIndexOf(' ', maxEnd);
        if (end <= i) end = maxEnd;

        if (text[end] === '.') end += 1;

        chunks.push(text.slice(i, end).trim());
        i = end - overlap;

        if (i < 0) i = 0;
        if (i === end - overlap && end - overlap < i + 1) i = end;
    }
    return chunks.filter(c => c.length > 10);
}

// Generate Embedding
async function getEmbedding(text: string): Promise<number[]> {
    const response = await ai.models.embedContent({
        model: EMBEDDING_MODEL,
        contents: text
    });
    // @ts-ignore - response object structure depending on SDK version
    const emb = response.embeddings?.[0]?.values || response.embedding?.values || response.embeddings;
    if (Array.isArray(emb) && typeof emb[0] === 'number') return emb as number[];
    return emb || [];
}

// Recursively find Markdown or Text Files
function findFiles(dir: string, fileList: string[] = []): string[] {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file === 'node_modules' || file.startsWith('.')) continue;
            findFiles(filePath, fileList);
        } else {
            if (filePath.endsWith('.md') || filePath.endsWith('.txt')) {
                fileList.push(filePath);
            }
        }
    }
    return fileList;
}

async function main() {
    // ─── PARSE CLI ARGS ──────────────────────────────
    const args = process.argv.slice(2);
    let namespace = 'default';
    let customPath = '';

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--namespace' || args[i] === '-n') {
            namespace = args[i + 1] || 'default';
            i++;
        } else if (args[i] === '--path' || args[i] === '-p') {
            customPath = args[i + 1] || '';
            i++;
        } else if (args[i] === '--list') {
            console.log('\n📋 Available Namespaces:');
            Object.entries(NAMESPACES).forEach(([key, dir]) => {
                console.log(`   ${key.padEnd(20)} → ${dir}`);
            });
            return;
        } else if (args[i] === '--help' || args[i] === '-h') {
            console.log(`
🚀 AUTONOMOUS.REV. Knowledge Base Ingestion Pipeline

Usage:
  npx tsx scripts/rag/ingest.ts [options]

Options:
  --namespace, -n <name>   Pinecone namespace to ingest into (default: "default")
  --path, -p <dir>         Custom directory path to scan for .md/.txt files
  --list                   List all available namespaces
  --help, -h               Show this help message

Examples:
  npx tsx scripts/rag/ingest.ts --namespace blade-websites
  npx tsx scripts/rag/ingest.ts -n seo-optimization
  npx tsx scripts/rag/ingest.ts -n whatsapp-bot
  npx tsx scripts/rag/ingest.ts --list
  npx tsx scripts/rag/ingest.ts -n custom-service -p docs/my_custom_docs
`);
            return;
        }
    }

    // Resolve docs path
    let docsPath: string;
    if (customPath) {
        docsPath = path.resolve(process.cwd(), customPath);
    } else if (namespace in NAMESPACES) {
        docsPath = path.resolve(process.cwd(), NAMESPACES[namespace as NamespaceKey]);
    } else {
        docsPath = path.resolve(process.cwd(), 'docs');
    }

    console.log(`\n🚀 Starting Data Ingestion Pipeline...`);
    console.log(`📂 Namespace: "${namespace}"`);
    console.log(`📁 Source directory: ${docsPath}\n`);

    // Get the index with namespace
    const index = pc.index(PINECONE_INDEX).namespace(namespace);

    const files = findFiles(docsPath);

    if (files.length === 0) {
        console.log(`❌ No markdown (.md) or text (.txt) files found in ${docsPath}`);
        return;
    }

    console.log(`📂 Found ${files.length} files to ingest.`);

    let totalChunks = 0;
    const vectorsToUpsert = [];

    for (const file of files) {
        console.log(`\n⏳ Processing: ${path.basename(file)}...`);
        const content = fs.readFileSync(file, 'utf-8');
        const chunks = chunkText(content);

        console.log(`  ➔ Split into ${chunks.length} chunks.`);

        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];
            try {
                const vector = await getEmbedding(chunk);
                if (vector.length > 0) {
                    vectorsToUpsert.push({
                        id: `${namespace}-${path.basename(file).replace(/[^a-zA-Z0-9-]/g, '-')}-chunk-${i}`,
                        values: vector,
                        metadata: {
                            text: chunk,
                            source: file,
                            namespace: namespace,
                            service: namespace,
                        }
                    });
                    totalChunks++;
                }
            } catch (error) {
                console.error(`  ❌ Failed to embed chunk ${i} of ${file}:`, error);
            }
        }
    }

    if (vectorsToUpsert.length > 0) {
        console.log(`\n🚀 Upserting ${vectorsToUpsert.length} vectors to Pinecone [${PINECONE_INDEX}] namespace="${namespace}"...`);
        const batchSize = 100;
        for (let i = 0; i < vectorsToUpsert.length; i += batchSize) {
            const batch = vectorsToUpsert.slice(i, i + batchSize);
            await index.upsert({ records: batch });
            console.log(`  ➔ Upserted batch ${Math.floor(i / batchSize) + 1} (${batch.length} vectors)`);
        }
        console.log(`✅ Success! Ingested ${totalChunks} chunks into namespace "${namespace}".`);
    } else {
        console.log(`⚠️ No vectors generated to upsert.`);
    }
}

main().catch(console.error);
