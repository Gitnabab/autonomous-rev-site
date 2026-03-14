
import { sendWhatsApp } from "./whatsapp";

const businesses = [
    {
        name: "Super Safe Pest Control",
        subject: "Subject: A Holi gift for Super Safe Pest Control 🎨",
        phone: "+917595024294",
        owner: "Abhijit",
        link: "https://super-safe-pest-control.vercel.app",
        hook: "I noticed Super Safe Pest Control has an incredible reputation in Newtown (111+ reviews!) and is government-certified. However, without a dedicated website, you might be missing out on high-value corporate leads from the nearby DLF IT Park who are searching for professional services online."
    },
    {
        name: "Hi Killing Pest Control",
        subject: "Subject: A Holi gift for Hi Killing Pest Control 🎨",
        phone: "+919748498236",
        owner: "Abhishek Bhattacharya",
        link: "https://hi-killing-pest-control.vercel.app",
        hook: "I noticed Hi Killing Pest Control has a strong reputation on Duttabad Road with over 137 positive reviews. However, without a dedicated website, you might be missing out on new customers who are searching online and not finding your excellent service."
    },
    {
        name: "Soham Civil & Pest Control",
        subject: "Subject: A Holi gift for Soham Civil & Pest Control 🎨",
        phone: "+918584982570",
        owner: "Subhendu C.",
        link: "https://soham-civil-pest-control.vercel.app",
        hook: "I noticed Soham Civil & Pest Control operates across 8 cities and has over 25 years of experience. However, without a dedicated website, you might be missing out on massive B2B and corporate leads who are looking for a professional, multi-city service provider online."
    },
    {
        name: "Bengal Pest Control Service",
        subject: "Subject: A Holi gift for Bengal Pest Control Service 🎨",
        phone: "+918048982184",
        owner: "Owner",
        link: "https://bengal-pest-control.vercel.app",
        hook: "I noticed Bengal Pest Control Service offers unique services like professional snake control, which is a rare and highly sought-after specialty in Kolkata. However, without a dedicated website, this unique selling proposition isn't reaching its full potential to attract high-intent clients."
    },
    {
        name: "Sr Pest Control",
        subject: "Subject: A Holi gift for Sr Pest Control 🎨",
        phone: "+918048986873",
        owner: "Owner",
        link: "https://sr-pest-control.vercel.app",
        hook: "I noticed Sr Pest Control has a perfect 5.0-star rating in the Sree Bhumi area and offers unique services like car pest control. However, without a dedicated website, this niche service isn't being highlighted to attract customers specifically looking for such specialized solutions."
    }
];

async function runOutreach(dryRun: boolean = true) {
    console.log(`🚀 Starting WhatsApp Outreach (${dryRun ? "DRY RUN" : "LIVE"})`);
    console.log("--------------------------------------------------");

    for (const biz of businesses) {
        const greeting = biz.owner === "Owner" ? "Hello" : `Hello ${biz.owner} ji`;
        const message = `${biz.subject}

${greeting}, wishing you and your family a very Happy Holi!

I’m Nabab. I specialize in building digital systems that help top-rated businesses like yours grow on autopilot.

${biz.hook}

In the spirit of the festival, I wanted to give you a gift to help your business reach the next level. I’ve already built a custom, professional website preview for you, completely for free, as you are one of my foundational clients.

See your Holi gift here: ${biz.link}

I believe this is the first step to capturing those premium clients automatically. I’ll give you a quick call tomorrow to get your thoughts.

Enjoy the festival of colors!

Best,
Nabab`;

        if (dryRun) {
            console.log(`\nTo: ${biz.phone}\nMessage:\n${message}\n`);
            console.log("--------------------------------------------------");
        } else {
            try {
                process.stdout.write(`Sending to ${biz.name} (${biz.phone})... `);
                await sendWhatsApp(biz.phone, message);
                console.log("✅ Sent");
            } catch (error) {
                console.error(`\n❌ Failed to send to ${biz.name}:`, error);
            }
        }
    }

    console.log("\nOutreach complete.");
}

const isLive = process.argv.includes("--live");
runOutreach(!isLive).catch(console.error);
