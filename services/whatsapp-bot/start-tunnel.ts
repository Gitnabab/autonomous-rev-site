import localtunnel from 'localtunnel';
import { config } from './config.js';

(async () => {
    const tunnel = await localtunnel({ port: config.port, subdomain: 'autoleadforce-bot' });

    console.log(`\n🚀 Localtunnel is live at: ${tunnel.url}`);
    console.log(`🔗 Meta Webhook URL: ${tunnel.url}/whatsapp`);
    console.log(`🔑 Verify Token: ${config.meta.webhookVerifyToken}\n`);

    tunnel.on('close', () => {
        console.log('❌ Tunnel closed');
    });
})();
