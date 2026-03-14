import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenAI } from '@google/genai';
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

const EMBEDDING_MODEL = "gemini-embedding-001";

// Generate Embedding for Query
async function getQueryEmbedding(text: string): Promise<number[]> {
    const response = await ai.models.embedContent({
        model: EMBEDDING_MODEL,
        contents: text
    });
    // @ts-ignore
    const emb = response.embeddings?.[0]?.values || response.embedding?.values || response.embeddings;
    if (Array.isArray(emb) && typeof emb[0] === 'number') return emb as number[];
    return emb || [];
}

/**
 * Query Vector Database with namespace support.
 * 
 * @param query - The search query text
 * @param topK - Number of top results to return (default: 3)
 * @param namespace - Pinecone namespace to search within (default: '' = search all)
 * 
 * Usage:
 *   queryKnowledgeBase("how to build a website", 3, "blade-websites")
 *   queryKnowledgeBase("missed call bot setup", 3, "whatsapp-bot")
 *   queryKnowledgeBase("google business ranking", 3, "seo-optimization")
 *   queryKnowledgeBase("general question")  // searches default namespace
 */
export async function queryKnowledgeBase(query: string, topK: number = 3, namespace: string = '') {
    const nsLabel = namespace ? ` [namespace: ${namespace}]` : ' [all namespaces]';
    console.log(`🔎 Searching Knowledge Base for: "${query}"${nsLabel}`);

    try {
        const queryVector = await getQueryEmbedding(query);

        if (!queryVector || queryVector.length === 0) {
            throw new Error("Failed to generate embedding for query.");
        }

        // Use namespace if provided, otherwise query the default namespace
        const index = namespace
            ? pc.index(PINECONE_INDEX).namespace(namespace)
            : pc.index(PINECONE_INDEX);

        const queryResponse = await index.query({
            vector: queryVector,
            topK: topK,
            includeMetadata: true
        });

        if (queryResponse.matches.length === 0) {
            console.log("⚠️ No relevant knowledge found.");
            return [];
        }

        console.log(`✅ Found ${queryResponse.matches.length} matching contexts.\n`);

        const results = queryResponse.matches.map(match => ({
            score: match.score,
            source: match.metadata?.source,
            text: match.metadata?.text,
            namespace: match.metadata?.namespace || 'default',
        }));

        results.forEach((r, i) => {
            console.log(`--- Match ${i + 1} (Score: ${r.score?.toFixed(4)}) [${r.namespace}] ---`);
            console.log(`Source: ${r.source}`);
            console.log(`${r.text}\n`);
        });

        return results;

    } catch (error) {
        console.error("❌ Error querying Knowledge Base:", error);
        return [];
    }
}

/**
 * Query multiple namespaces and merge results by score.
 * Useful when a question spans multiple service areas.
 */
export async function queryMultiNamespace(query: string, namespaces: string[], topK: number = 3) {
    console.log(`🔎 Multi-namespace search: "${query}" across [${namespaces.join(', ')}]`);

    const allResults: any[] = [];

    for (const ns of namespaces) {
        const results = await queryKnowledgeBase(query, topK, ns);
        allResults.push(...results);
    }

    // Sort by score descending and take top K
    allResults.sort((a, b) => (b.score || 0) - (a.score || 0));
    return allResults.slice(0, topK);
}

// If run directly from CLI
if (process.argv[1] && process.argv[1].endsWith('query.ts')) {
    const args = process.argv.slice(2);
    let namespace = '';
    let queryParts: string[] = [];

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--namespace' || args[i] === '-n') {
            namespace = args[i + 1] || '';
            i++;
        } else {
            queryParts.push(args[i]);
        }
    }

    const query = queryParts.join(' ') || "What is the pitch strategy for the Razor offer?";
    queryKnowledgeBase(query, 3, namespace).catch(console.error);
}
