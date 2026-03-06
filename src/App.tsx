import { motion } from 'framer-motion';
import { Shield, Zap, MessageSquare, Globe, ArrowRight, MousePointer2, FlaskConical, Bot } from 'lucide-react';

const Header = () => (
    <header className="fixed top-0 w-full z-50 px-6 py-8 flex justify-between items-center bg-black/80 backdrop-blur-md border-b border-slate-900">
        <div className="text-xl font-black tracking-tighter text-white">AUTONOMOUS<span className="text-blue-600">.REV</span></div>
        <nav className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-slate-400">
            <a href="#arsenal" className="hover:text-blue-600 transition-colors">The Arsenal</a>
            <a href="#results" className="hover:text-blue-600 transition-colors">Results</a>
            <a href="#lab" className="hover:text-blue-600 transition-colors">The Lab</a>
            <a href="#qualification" className="hover:text-blue-600 transition-colors">Lead Engine</a>
        </nav>
        <button className="brutalist-button text-xs">Access Intel</button>
    </header>
);

const Hero = () => (
    <section className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-4xl"
        >
            <div className="inline-block px-4 py-1 border border-blue-600/30 text-blue-500 text-xs font-black uppercase tracking-[0.3em] bg-blue-600/5 mb-4">
                Autonomous Revenue Engines
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter">
                SCALE WITHOUT <br /> <span className="text-blue-600 italic blue-glow">SURRENDER</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
                We deploy high-performance assets that capture, convert, and close local revenue 24/7. Zero upfront cost. 100% Performance.
            </p>
            <div className="pt-8 flex flex-col md:flex-row gap-4 justify-center">
                <button className="brutalist-button py-4 px-12 text-lg">Deploy My Razor</button>
                <button className="py-4 px-12 text-lg font-bold text-slate-500 border-2 border-slate-900 hover:border-slate-700 transition-all uppercase tracking-widest">
                    View Protocol
                </button>
            </div>
        </motion.div>
    </section>
);

const ArsenalCard = ({ icon: Icon, title, desc, price, highlight }: any) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="brutalist-card p-8 flex flex-col justify-between h-full group"
    >
        <div className="space-y-6">
            <div className="p-4 border border-slate-800 inline-block group-hover:border-blue-600 group-hover:bg-blue-600/5 transition-all">
                <Icon className="w-8 h-8 text-slate-400 group-hover:text-blue-600" />
            </div>
            <div className="space-y-2">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">{title}</h3>
                <p className="text-slate-400 font-medium leading-relaxed">{desc}</p>
            </div>
        </div>
        <div className="pt-8 flex justify-between items-end border-t border-slate-900 mt-8">
            <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">{highlight}</div>
                <div className="text-xl font-black text-white">{price}</div>
            </div>
            <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
            >
                <ArrowRight className="w-5 h-5" />
            </motion.button>
        </div>
    </motion.div>
);

const Arsenal = () => (
    <section id="arsenal" className="py-32 px-6 bg-black border-y border-slate-900">
        <div className="max-w-7xl mx-auto space-y-20">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-4 text-blue-600">
                        <div className="h-px w-12 bg-blue-600"></div>
                        <span className="font-black uppercase tracking-[0.2em] text-xs">Weaponized Assets</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">THE ARSENAL</h2>
                </div>
                <p className="text-slate-400 max-w-md font-medium">Our core revenue-generating components. Select your primary blade.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ArsenalCard
                    icon={Globe}
                    title="The Website Printing Machine"
                    desc="Proprietary high-speed deployment kit for local business capture pages. 90+ Lighthouse score guaranteed."
                    price="₹0 Upfront"
                    highlight="The Razor"
                />
                <ArsenalCard
                    icon={MessageSquare}
                    title="The WhatsApp Missed-Call Blade"
                    desc="Automated engagement engine that turns every missed call into a WhatsApp conversion sequence."
                    price="₹1,500/mo"
                    highlight="Conversion Bot"
                />
                <ArsenalCard
                    icon={Zap}
                    title="The GMB Velocity Kit"
                    desc="Rapid local ranking optimization to ensure you own your territory's first fold on Google."
                    price="₹2,500"
                    highlight="Visibility"
                />
            </div>
        </div>
    </section>
);

const ShowcaseCard = ({ title, url, image }: any) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className="brutalist-card overflow-hidden group"
    >
        <div className="aspect-video bg-slate-900 relative">
            <img src={image} alt={title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>
        <div className="p-6 space-y-4">
            <h3 className="text-xl font-black text-white uppercase tracking-tight">{title}</h3>
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
            >
                View Live Build <ArrowRight className="w-4 h-4" />
            </a>
        </div>
    </motion.div>
);

const Showcase = () => (
    <section id="showcase" className="py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
            <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">LIVE DEPLOYMENTS</h2>
                <p className="text-slate-400 max-w-lg mx-auto font-medium text-lg italic">The "Website Printing Machine" in action. Pre-built revenue assets.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <ShowcaseCard
                    title="Premium Pest Management (Kolkata)"
                    url="https://master-template-blush.vercel.app"
                    image="https://picsum.photos/seed/pest-control/800/450"
                />
                <ShowcaseCard
                    title="Aesthetic Medical Clinic (Draft)"
                    url="#"
                    image="https://picsum.photos/seed/clinic/800/450"
                />
            </div>
        </div>
    </section>
);

const CaseStudyCard = ({ title, metric, label, desc }: any) => (
    <div className="brutalist-card p-10 border-slate-900 group">
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">{label}</div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{title}</h3>
                </div>
                <div className="text-4xl font-black text-white italic blue-glow">{metric}</div>
            </div>
            <p className="text-slate-400 font-medium leading-relaxed">{desc}</p>
            <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-blue-600"
                />
            </div>
        </div>
    </div>
);

const CaseStudies = () => (
    <section id="results" className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto space-y-20">
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex items-center gap-4 text-blue-600">
                    <div className="h-px w-8 bg-blue-600"></div>
                    <span className="font-black uppercase tracking-[0.2em] text-xs">Proof of Concept</span>
                    <div className="h-px w-8 bg-blue-600"></div>
                </div>
                <h2 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none">HARD METRICS</h2>
                <p className="text-slate-400 max-w-lg font-medium text-lg italic mt-4">Numbers don't surrender. Real performance from our latest deployments.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <CaseStudyCard
                    label="Speed Benchmark"
                    title="Kolkata Pest Control"
                    metric="98/100"
                    desc="Sub-1s LCP on mobile. Custom Vite rendering engine ensures near-instant paint times across the board."
                />
                <CaseStudyCard
                    label="Execution Velocity"
                    title="Emerald Pest Pune"
                    metric="<18hr"
                    desc="From lead discovery to fully branded live deployment on Vercel. 100% autonomous branding sequence."
                />
                <CaseStudyCard
                    label="Conversion Flow"
                    title="SS Pest Solutions"
                    metric="2X"
                    desc="Redesigned WhatsApp funnel increased mobile click-through rates by 200% compared to legacy design."
                />
            </div>
        </div>
    </section>
);

const TheLab = () => (
    <section id="lab" className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 space-y-10 order-2 lg:order-1">
                <div className="space-y-6">
                    <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none uppercase italic">THE LAB</h2>
                    <p className="text-xl text-slate-400 max-w-lg font-medium leading-relaxed">
                        Where we engineer the next generation of autonomous sales agents and SEO engines. Currently in private beta.
                    </p>
                </div>
                <div className="space-y-8">
                    {[
                        { label: "AI Sales Agents (Voice/Chat)", icon: Bot },
                        { label: "Predictive Lead Scoring Engines", icon: FlaskConical },
                        { label: "Hyper-Local SEO Automators", icon: Zap }
                    ].map((item, id) => (
                        <div key={id} className="flex items-center gap-6 group">
                            <div className="w-12 h-12 border border-slate-900 flex items-center justify-center group-hover:border-blue-600 transition-colors">
                                <item.icon className="w-5 h-5 text-slate-600 group-hover:text-blue-600" />
                            </div>
                            <span className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="lg:w-1/2 relative order-1 lg:order-2">
                <div className="aspect-square border-2 border-slate-900 p-8 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-blue-600/5 blur-[100px]"></div>
                    <div className="w-full h-full border border-slate-800 rotate-45 absolute flex items-center justify-center">
                        <div className="w-1/2 h-1/2 border border-blue-600/20"></div>
                    </div>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-64 h-64 border-2 border-dashed border-blue-600/30 rounded-full flex items-center justify-center"
                    >
                        <Shield className="w-16 h-16 text-blue-600" />
                    </motion.div>
                </div>
            </div>
        </div>
    </section>
);

const LeadEngine = () => (
    <section id="qualification" className="py-32 px-6 bg-black border-t border-slate-900">
        <div className="max-w-4xl mx-auto space-y-12 text-center">
            <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic">GO LIVE</h2>
                <p className="text-slate-400 font-medium">Begin the autonomous revenue sequence. Only for business owners ready to scale.</p>
            </div>
            <div className="brutalist-card p-12 space-y-8 text-left border-blue-600/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Target Sector</label>
                        <input type="text" placeholder="e.g. Pest Control" className="w-full bg-slate-900/50 border border-slate-800 p-4 text-white focus:border-blue-600 outline-none" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Monthly Revenue Goal</label>
                        <input type="text" placeholder="e.g. ₹5,00,000" className="w-full bg-slate-900/50 border border-slate-800 p-4 text-white focus:border-blue-600 outline-none" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">WhatsApp / Direct Intel</label>
                    <input type="text" placeholder="+91" className="w-full bg-slate-900/50 border border-slate-800 p-4 text-white focus:border-blue-600 outline-none" />
                </div>
                <button className="brutalist-button w-full py-5 text-xl font-black italic">REQUEST FREE PREVIEW ENGINE</button>
                <p className="text-[10px] text-slate-600 text-center uppercase tracking-widest">Limited to 3 autonomous deployments per week.</p>
            </div>
        </div>
    </section>
)

const Footer = () => (
    <footer className="py-20 px-6 border-t border-slate-900 text-center">
        <div className="text-slate-500 text-xs font-bold uppercase tracking-[0.5em]">AUTONOMOUS.REV © 2026</div>
    </footer>
);

export default function App() {
    return (
        <div className="bg-black text-slate-400 min-h-screen selection:bg-blue-600 selection:text-white">
            <Header />
            <main>
                <Hero />
                <Arsenal />
                <Showcase />
                <CaseStudies />
                <TheLab />
                <LeadEngine />
            </main>
            <Footer />
        </div>
    );
}
