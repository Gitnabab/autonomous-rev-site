import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

// Helper to parse CLI arguments
function parseArgs() {
    const args = process.argv.slice(2);
    const config: Record<string, string> = {
        name: 'AutoLeadForce',
        suffix: '.REV',
        niche: 'business',
        color: '#F47B20' // orange-500 hex
    };

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--name') config.name = args[++i];
        if (args[i] === '--suffix') config.suffix = args[++i];
        if (args[i] === '--niche') config.niche = args[++i];
        if (args[i] === '--color') config.color = args[++i];
    }
    return config;
}

const config = parseArgs();
const PORT = 5173;
const URL = `http://localhost:${PORT}`;

async function waitForServer(url: string, timeout = 30000): Promise<boolean> {
    const start = Date.now();
    while (Date.now() - start < timeout) {
        try {
            const res = await fetch(url);
            if (res.ok) return true;
        } catch (e) {
            // Ignore fetch errors, just wait and retry
        }
        await new Promise(r => setTimeout(r, 1000));
    }
    return false;
}

async function main() {
    console.log(`🚀 Starting Razor Preview Generator`);
    console.log(`   Client Name: ${config.name}${config.suffix}`);
    console.log(`   Niche: ${config.niche}`);

    // Ensure output directory exists
    const outDir = path.join(process.cwd(), 'automation', 'out');
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    // 1. Start Dev Server
    console.log(`\n⏳ Booting Vite Dev Server...`);
    // We run it from the root project directory
    const projectRoot = process.cwd();

    // In windows we need shell: true to correctly spawn npm
    const serverProcess = spawn('npm', ['run', 'dev'], { cwd: projectRoot, shell: true });

    // 2. Wait for server
    console.log(`⏳ Waiting for localhost to serve...`);
    const isUp = await waitForServer(URL);
    if (!isUp) {
        console.error(`❌ Server failed to start on ${URL}`);
        serverProcess.kill();
        process.exit(1);
    }
    console.log(`✅ Server is online at ${URL}`);

    // 3. Launch Puppeteer
    console.log(`⏳ Launching headless browser...`);
    const browser = await puppeteer.launch({
        headless: true, // run in headless mode
        defaultViewport: {
            width: 430,  // iPhone 14 Pro width
            height: 932, // iPhone 14 Pro height
            deviceScaleFactor: 3, // High-res retina capture
            isMobile: true,
            hasTouch: true
        }
    });

    const page = await browser.newPage();
    console.log(`⏳ Navigating to application...`);
    await page.goto(URL, { waitUntil: 'networkidle0' });

    // 4. Inject Client Data using DOM manipulation
    console.log(`⏳ Injecting customized data into the DOM...`);
    await page.evaluate((cfg) => {
        // Change text containing REVENUE
        const elements = document.querySelectorAll('*');
        elements.forEach((el: any) => {
            if (el.childNodes) {
                el.childNodes.forEach((node: any) => {
                    if (node.nodeType === 3 && node.nodeValue?.includes('REVENUE')) {
                        node.nodeValue = node.nodeValue.replace('REVENUE', cfg.name.toUpperCase());
                    }
                    if (node.nodeType === 3 && node.nodeValue?.includes('.REV')) {
                        node.nodeValue = node.nodeValue.replace('.REV', cfg.suffix);
                    }
                });
            }
        });

        // Change the main title paragraph to match niche
        const subtitle = Array.from(document.querySelectorAll('p')).find(p => p.textContent?.includes('We build beautiful, fast websites for your business') || p.textContent?.includes('engineer Revenue Machines'));
        if (subtitle) {
            subtitle.innerHTML = `We engineer <span class="text-white font-bold">${cfg.name} Machines</span>. Stop losing customers to competitors in ${cfg.niche} — it's time to own your market.`;
        }

        // Extremely hacky but effective way to change color:
        // By injecting a style block that overrides our custom classes!
        const style = document.createElement('style');
        style.innerHTML = `
            .text-orange-500 { color: ${cfg.color} !important; }
            .bg-orange-500 { background-color: ${cfg.color} !important; }
            .bg-orange-500\\/5 { background-color: ${cfg.color}0D !important; }
            .bg-orange-500\\/10 { background-color: ${cfg.color}1A !important; }
            .border-orange-500 { border-color: ${cfg.color} !important; }
            .border-orange-500\\/30 { border-color: ${cfg.color}4D !important; }
            .border-orange-500\\/50 { border-color: ${cfg.color}80 !important; }
            .accent-glow { text-shadow: 0 0 20px ${cfg.color}80 !important; }
            ::selection { background: ${cfg.color} !important; }
        `;
        document.head.appendChild(style);
    }, config);

    // Wait for a brief moment for styles/fonts to settle
    await new Promise(r => setTimeout(r, 1000));

    // 5. Capture screenshot
    const timestamp = Date.now();
    const outputPath = path.join(outDir, `preview_${timestamp}.png`);
    console.log(`📸 Capturing mobile-first Hero screenshot...`);

    await page.screenshot({
        path: outputPath,
        fullPage: false,
        clip: { x: 0, y: 0, width: 430, height: 900 } // Capture the hero explicitly
    });

    console.log(`✅ Custom preview successfully generated at:`);
    console.log(`   ${outputPath}`);

    // 6. Cleanup
    await browser.close();
    serverProcess.kill();
    // Sometimes child processes stick around on Windows, forcefully kill it
    spawn('taskkill', ['/pid', serverProcess.pid?.toString() || '', '/f', '/t']);
    console.log(`🏁 Pipeline finished.`);
}

main().catch(error => {
    console.error(`❌ Pipeline failed:`, error);
    process.exit(1);
});
