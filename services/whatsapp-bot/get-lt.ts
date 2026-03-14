import localtunnel from 'localtunnel';
import { writeFileSync } from 'fs';

async function main() {
    try {
        const tunnel = await localtunnel({ port: 3001 });
        console.log(`Tunnel URL: ${tunnel.url}`);
        writeFileSync('lt_url.txt', tunnel.url);

        tunnel.on('close', () => {
            console.log('Tunnel closed');
        });
    } catch (err) {
        console.error('Error starting tunnel:', err);
    }
}

main();
