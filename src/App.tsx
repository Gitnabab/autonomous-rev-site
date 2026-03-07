import { motion } from 'framer-motion';
import { Shield, Zap, MessageSquare, Globe, ArrowRight, MousePointer2, FlaskConical, Bot, CheckCircle2, Play, Users, Cpu, Star, Quote } from 'lucide-react';

const Header = () => (
    <header className="fixed top-0 w-full z-50 px-6 py-8 flex justify-between items-center bg-black/50 backdrop-blur-xl border-b border-white/5">
        <div className="text-xl font-black tracking-tighter text-white font-syne">AUTONOMOUS<span className="text-amber-500">.REV</span></div>
        <nav className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-slate-400">
            <a href="#arsenal" className="hover:text-amber-500 transition-colors">The Arsenal</a>
            <a href="#results" className="hover:text-amber-500 transition-colors">Results</a>
            <a href="#lab" className="hover:text-amber-500 transition-colors">The Lab</a>
            <a href="#qualification" className="hover:text-amber-500 transition-colors">Lead Engine</a>
        </nav>
        <button className="brutalist-button text-xs py-3 px-6">Access Intel</button>
    </header>
);

const Hero = () => (
    <section className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* Premium Liquid Glass Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 max-w-5xl relative z-10"
        >
            <div className="inline-block px-4 py-1.5 border border-amber-500/30 text-amber-500 text-xs font-black uppercase tracking-[0.4em] bg-amber-500/5 backdrop-blur-md mb-4">
                Autonomous Revenue Engines
            </div>
            <h1 className="text-6xl md:text-[7rem] font-black text-white leading-[0.9] tracking-tighter font-syne mix-blend-difference">
                SCALE WITHOUT <br /> <span className="text-amber-500 italic accent-glow mix-blend-normal">SURRENDER</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                We deploy high-performance assets that capture, convert, and close local revenue 24/7. Zero upfront cost. 100% Performance.
            </p>
            <div className="pt-10 flex flex-col md:flex-row gap-6 justify-center items-center">
                <button className="brutalist-button py-5 px-14 text-lg">Deploy My Razor</button>
                <button className="flex items-center gap-3 py-5 px-10 text-lg font-bold text-white hover:text-amber-500 transition-colors group">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-amber-500/50 transition-colors">
                        <Play className="w-4 h-4 ml-1 fill-current" />
                    </div>
                    VIEW PROTOCOL
                </button>
            </div>
        </motion.div>

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
    </section>
);

const ProcessStep = ({ number, title, desc, icon: Icon }: any) => (
    <div className="relative pl-14 pb-20 last:pb-0 group">
        <div className="absolute left-[24px] top-12 bottom-0 w-px bg-white/10 group-last:bg-transparent transition-colors group-hover:bg-amber-500/30"></div>
        <div className="absolute left-0 top-0 w-12 h-12 bg-black border border-white/20 flex items-center justify-center text-slate-500 font-black group-hover:border-amber-500 group-hover:text-amber-500 transition-all duration-500 z-10 shadow-xl">
            {number}
        </div>
        <div className="space-y-4 pt-2">
            <div className="flex items-center gap-5">
                <Icon className="w-6 h-6 text-amber-500" />
                <h3 className="text-3xl font-black text-white uppercase tracking-tight font-syne">{title}</h3>
            </div>
            <p className="text-slate-400 font-medium leading-relaxed max-w-xl">{desc}</p>
        </div>
    </div>
);

const Process = () => (
    <section id="process" className="py-32 px-6 bg-[#030303] border-y border-white/5 relative">
        <div className="max-w-5xl mx-auto space-y-24 relative z-10">
            <div className="text-left space-y-6">
                <div className="flex items-center gap-4 text-amber-500 mb-6">
                    <div className="h-px w-16 bg-amber-500"></div>
                    <span className="font-black uppercase tracking-[0.3em] text-xs">Transparency</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none font-syne">THE DEPLOYMENT PROTOCOL</h2>
                <p className="text-slate-400 font-medium text-xl italic mt-6 max-w-xl">Our "foot-in-the-door" process. From first contact to autonomous operation.</p>
            </div>

            <div className="p-16 glass-card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-[120px] pointer-events-none"></div>
                <ProcessStep
                    number="1"
                    title="Initial Recon"
                    desc="We identify high-value local targets via automated lead scraping and deploy targeted WhatsApp outreach sequences offering immense upfront value."
                    icon={Bot}
                />
                <ProcessStep
                    number="2"
                    title="The Razor (Free Preview)"
                    desc="We utilize Google AI Studio and our proprietary Codebase Generator to deploy a live, high-converting, mobile-first website preview in under 20 minutes—completely free."
                    icon={MousePointer2}
                />
                <ProcessStep
                    number="3"
                    title="The Blade (Upsell)"
                    desc="Once value is proven and trust established, we attach the operational engine: custom domain hosting, SSL, SEO optimization suites, and ongoing monthly maintenance."
                    icon={Zap}
                />
                <ProcessStep
                    number="4"
                    title="Autonomous Scaling"
                    desc="The final stage unlocks advanced assets like Missed-Call WhatsApp Bots and AI Sales Agents to turn the static asset into an autonomous lead conversion machine."
                    icon={Shield}
                />
            </div>
        </div>
    </section>
);

const Arsenal = () => (
    <section id="arsenal" className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto space-y-20">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-6">
                    <div className="flex items-center gap-4 text-amber-500">
                        <div className="h-px w-16 bg-amber-500"></div>
                        <span className="font-black uppercase tracking-[0.3em] text-xs">Weaponized Assets</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none font-syne">THE ARSENAL</h2>
                </div>
                <p className="text-slate-400 max-w-md font-medium text-lg">Our core revenue-generating components. Select your primary blade.</p>
            </div>

            {/* Premium Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
                {/* Large Featured Card */}
                <motion.div whileHover={{ y: -5 }} className="brutalist-card md:col-span-2 md:row-span-2 p-12 flex flex-col justify-between group relative overflow-hidden border-white/10 hover:border-amber-500">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="space-y-8 relative z-10">
                        <div className="flex justify-between items-start">
                            <div className="p-5 border border-white/10 group-hover:border-amber-500 bg-black/50 backdrop-blur transition-all">
                                <Globe className="w-10 h-10 text-white group-hover:text-amber-500" />
                            </div>
                            <div className="px-4 py-1.5 bg-amber-500 text-black text-[10px] font-black uppercase tracking-[0.2em]">The Razor</div>
                        </div>
                        <div className="space-y-4 max-w-lg">
                            <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight font-syne">The Website Printing Machine</h3>
                            <p className="text-slate-400 font-medium leading-relaxed text-lg">Proprietary high-speed deployment kit for local business capture pages. 90+ Lighthouse score guaranteed.</p>
                        </div>
                    </div>
                    <div className="relative z-10 flex justify-between items-end border-t border-white/10 pt-8 mt-12">
                        <div className="text-3xl font-black text-white tracking-tighter">₹0 Upfront</div>
                        <div className="w-14 h-14 border border-white/20 flex items-center justify-center text-white group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:text-black transition-all">
                            <ArrowRight className="w-6 h-6" />
                        </div>
                    </div>
                </motion.div>

                {/* Secondary Card 1 */}
                <motion.div whileHover={{ y: -5 }} className="glass-card p-10 flex flex-col justify-between group hover:border-amber-500/50">
                    <div className="space-y-6">
                        <div className="flex justify-between items-start">
                            <MessageSquare className="w-8 h-8 text-slate-400 group-hover:text-amber-500 transition-colors" />
                            <div className="text-[10px] font-black uppercase tracking-widest text-amber-500">Conversion</div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight font-syne">WhatsApp Missed-Call Blade</h3>
                            <p className="text-slate-400 text-sm font-medium leading-relaxed">Automated engagement engine that turns every missed call into a conversion sequence.</p>
                        </div>
                    </div>
                    <div className="text-2xl font-black text-white mt-8">₹1,500/mo</div>
                </motion.div>

                {/* Secondary Card 2 */}
                <motion.div whileHover={{ y: -5 }} className="glass-card p-10 flex flex-col justify-between group hover:border-amber-500/50">
                    <div className="space-y-6">
                        <div className="flex justify-between items-start">
                            <Zap className="w-8 h-8 text-slate-400 group-hover:text-amber-500 transition-colors" />
                            <div className="text-[10px] font-black uppercase tracking-widest text-amber-500">Visibility</div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight font-syne">The GMB Velocity Kit</h3>
                            <p className="text-slate-400 text-sm font-medium leading-relaxed">Rapid local ranking optimization to ensure you own your territory's first fold on Google.</p>
                        </div>
                    </div>
                    <div className="text-2xl font-black text-white mt-8">₹2,500/mo</div>
                </motion.div>
            </div>
        </div>
    </section>
);

const ShowcaseCard = ({ title, url, image }: any) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className="brutalist-card overflow-hidden group cursor-pointer border-white/10"
        onClick={() => window.open(url, '_blank')}
    >
        <div className="aspect-video bg-[#050505] relative overflow-hidden">
            <img src={image} alt={title} className="w-full h-full object-cover opacity-50 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-20 h-20 rounded-full border border-amber-500 bg-amber-500/10 flex items-center justify-center backdrop-blur-md shadow-[0_0_40px_rgba(202,138,4,0.3)]">
                    <Play className="w-8 h-8 text-amber-500 ml-1 fill-amber-500" />
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>
        <div className="p-8 space-y-4 bg-black">
            <h3 className="text-2xl font-black text-white uppercase tracking-tight font-syne">{title}</h3>
            <div className="inline-flex items-center gap-3 text-amber-500 font-bold uppercase tracking-[0.2em] text-xs hover:text-white transition-colors">
                View Live Build <ArrowRight className="w-4 h-4" />
            </div>
        </div>
    </motion.div>
);

const Showcase = () => (
    <section id="showcase" className="py-32 px-6 bg-[#030303] border-y border-white/5">
        <div className="max-w-7xl mx-auto space-y-24">
            <div className="text-center space-y-6">
                <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none font-syne">LIVE DEPLOYMENTS</h2>
                <p className="text-slate-400 max-w-lg mx-auto font-medium text-xl italic">The "Website Printing Machine" in action. Pre-built revenue assets.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <ShowcaseCard
                    title="Premium Pest Management"
                    url="https://master-template-blush.vercel.app"
                    image="https://picsum.photos/seed/pest-control/800/450"
                />
                <ShowcaseCard
                    title="Aesthetic Medical Clinic"
                    url="#"
                    image="https://picsum.photos/seed/clinic/800/450"
                />
            </div>
        </div>
    </section>
);

const CaseStudyCard = ({ title, metric, label, desc }: any) => (
    <div className="glass-card p-12 group hover:border-amber-500/40">
        <div className="space-y-8">
            <div className="flex justify-between items-start">
                <div className="space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500">{label}</div>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter font-syne">{title}</h3>
                </div>
                <div className="text-5xl font-black text-white italic accent-glow">{metric}</div>
            </div>
            <p className="text-slate-400 font-medium leading-relaxed text-lg">{desc}</p>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-amber-500 shadow-[0_0_10px_rgba(202,138,4,0.8)]"
                />
            </div>
        </div>
    </div>
);

const CaseStudies = () => (
    <section id="results" className="py-32 px-6 bg-black relative">
        <div className="max-w-7xl mx-auto space-y-24">
            <div className="flex flex-col items-center text-center space-y-6">
                <div className="flex items-center gap-4 text-amber-500">
                    <div className="h-px w-12 bg-amber-500"></div>
                    <span className="font-black uppercase tracking-[0.3em] text-xs">Proof of Concept</span>
                    <div className="h-px w-12 bg-amber-500"></div>
                </div>
                <h2 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-none font-syne">HARD METRICS</h2>
                <p className="text-slate-400 max-w-lg font-medium text-xl italic mt-6">Numbers don't surrender. Real performance from our latest deployments.</p>
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

const AboutUs = () => (
    <section id="about" className="py-32 px-6 bg-[#030303] border-y border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 space-y-10">
                <div className="flex items-center gap-4 text-amber-500 mb-2">
                    <div className="h-px w-16 bg-amber-500"></div>
                    <span className="font-black uppercase tracking-[0.3em] text-xs">Who We Are</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none font-syne">THE ARCHITECTS</h2>
                <p className="text-2xl text-slate-400 font-medium leading-relaxed">
                    We are a specialized strike team engineering premium AI-powered assets for small businesses. We don't just build websites; we construct <span className="text-white font-bold">digital monopolies</span>.
                </p>
                <div className="flex flex-col gap-6 pt-6">
                    <div className="flex items-start gap-6 p-8 glass-card border-l-4 border-l-amber-500">
                        <Cpu className="w-10 h-10 text-amber-500 shrink-0 mt-1" />
                        <div>
                            <h4 className="text-white font-bold text-xl mb-2 uppercase tracking-widest font-syne">Advanced AI Tooling</h4>
                            <p className="text-slate-400">We leverage Gemini Pro for deep market research and Google AI Studio for unprecedented rapid generation capabilities.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-6 p-8 glass-card border-l-4 border-l-amber-500">
                        <Users className="w-10 h-10 text-amber-500 shrink-0 mt-1" />
                        <div>
                            <h4 className="text-white font-bold text-xl mb-2 uppercase tracking-widest font-syne">Elite UI/UX Expertise</h4>
                            <p className="text-slate-400">Our "Premium Neo-Brutalist" design architecture guarantees your asset stands out, drives trust, and converts at enterprise levels.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:w-1/2 w-full aspect-square md:aspect-video lg:aspect-square relative flex items-center justify-center p-8">
                <div className="absolute w-full h-full border border-white/5 bg-white/[0.02]"></div>
                <div className="absolute w-[90%] h-[90%] border border-white/10 bg-white/[0.03] rotate-3 transition-transform duration-1000 hover:rotate-6"></div>
                <div className="absolute w-[80%] h-[80%] border border-amber-500/20 glass-card -rotate-3 p-12 flex flex-col items-center justify-center text-center space-y-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10 transition-transform duration-1000 hover:rotate-0">
                    <div className="w-24 h-24 border border-amber-500 bg-amber-500/5 flex items-center justify-center backdrop-blur">
                        <Bot className="w-12 h-12 text-white" />
                    </div>
                    <div>
                        <div className="font-black tracking-widest text-white text-3xl uppercase font-syne">Nabab</div>
                        <div className="text-amber-500 font-bold text-sm uppercase tracking-[0.3em] mt-3">Lead Systems Architect</div>
                    </div>
                </div>
                {/* Minimalist accent marks */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-amber-500"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-amber-500"></div>
            </div>
        </div>
    </section>
);

const TestimonialCard = ({ client, role, quote }: any) => (
    <div className="glass-card p-12 flex flex-col justify-between h-full group hover:border-amber-500/30">
        <div className="space-y-8">
            <Quote className="w-12 h-12 text-white/10 group-hover:text-amber-500/30 transition-colors" />
            <p className="text-white text-xl font-medium leading-relaxed italic">"{quote}"</p>
        </div>
        <div className="pt-10 flex items-center gap-6 mt-10 border-t border-white/10">
            <div className="w-14 h-14 bg-black border border-white/20 flex items-center justify-center">
                <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
            </div>
            <div>
                <h4 className="text-white font-bold uppercase tracking-widest text-lg font-syne">{client}</h4>
                <div className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mt-1">{role}</div>
            </div>
        </div>
    </div>
);

const Testimonials = () => (
    <section id="testimonials" className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto space-y-24">
            <div className="flex flex-col items-center text-center space-y-6">
                <h2 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-none font-syne">FIELD REPORTS</h2>
                <p className="text-slate-400 max-w-lg font-medium text-xl italic mt-6">Actual intelligence from deployed assets on the front lines.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                <TestimonialCard
                    client="Vikram S."
                    role="Owner, Emerald Pest Control"
                    quote="I was skeptical about the 'zero upfront cost', but the live preview they built blew me away. Within a month of taking the paid plan, our online leads jumped 30%. The AI WhatsApp bot alone is worth gold."
                />
                <TestimonialCard
                    client="Rahul D."
                    role="Founder, SS Solutions"
                    quote="These guys operate on another level. The UI/UX makes my small local business look like an enterprise corp. We saw a 15% reduction in acquisition costs simply because the asset converts so efficiently."
                />
            </div>
        </div>
    </section>
);

const TheLab = () => (
    <section id="lab" className="py-32 px-6 overflow-hidden bg-[#030303] border-y border-white/5 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-amber-500/5 blur-[150px] pointer-events-none rounded-full"></div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center relative z-10">
            <div className="lg:w-1/2 space-y-12 order-2 lg:order-1">
                <div className="space-y-6">
                    <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase italic font-syne">THE LAB</h2>
                    <p className="text-2xl text-slate-400 max-w-lg font-medium leading-relaxed">
                        Where we engineer the next generation of autonomous sales agents and SEO engines. Currently in private beta.
                    </p>
                </div>
                <div className="space-y-8">
                    {[
                        { label: "AI Sales Agents (Voice/Chat)", icon: Bot },
                        { label: "Predictive Lead Scoring Engines", icon: FlaskConical },
                        { label: "Hyper-Local SEO Automators", icon: Zap }
                    ].map((item, id) => (
                        <div key={id} className="flex items-center gap-8 group">
                            <div className="w-16 h-16 border border-white/10 flex items-center justify-center group-hover:border-amber-500 bg-black/50 transition-colors">
                                <item.icon className="w-6 h-6 text-slate-600 group-hover:text-amber-500 transition-colors" />
                            </div>
                            <span className="text-xl font-bold text-slate-300 group-hover:text-white transition-colors">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="lg:w-1/2 relative order-1 lg:order-2">
                <div className="aspect-square border border-white/10 p-12 flex items-center justify-center relative bg-black/20 backdrop-blur-sm">
                    <div className="w-full h-full border border-white/5 rotate-45 absolute flex items-center justify-center transition-transform duration-10000 linear animate-[spin_60s_linear_infinite]">
                        <div className="w-1/2 h-1/2 border border-amber-500/20"></div>
                    </div>
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="w-80 h-80 border border-dashed border-amber-500/30 rounded-full flex items-center justify-center bg-black"
                    >
                        <Shield className="w-20 h-20 text-amber-500" />
                    </motion.div>
                </div>
            </div>
        </div>
    </section>
);

const LeadEngine = () => (
    <section id="qualification" className="py-40 px-6 bg-black">
        <div className="max-w-5xl mx-auto space-y-16 text-center">
            <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic font-syne">GO LIVE</h2>
                <p className="text-slate-400 font-medium text-xl">Begin the autonomous revenue sequence. Only for business owners ready to scale.</p>
            </div>
            <div className="brutalist-card p-16 space-y-10 text-left border-amber-500/30 bg-[#050505] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[80px]"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                    <div className="space-y-4">
                        <label className="text-xs font-black uppercase tracking-[0.2em] text-amber-500 block">Target Sector</label>
                        <input type="text" placeholder="e.g. Pest Control" className="w-full bg-black border border-white/20 p-5 text-white focus:border-amber-500 outline-none transition-colors text-lg font-medium font-syne" />
                    </div>
                    <div className="space-y-4">
                        <label className="text-xs font-black uppercase tracking-[0.2em] text-amber-500 block">Monthly Revenue Goal</label>
                        <input type="text" placeholder="e.g. ₹5,00,000" className="w-full bg-black border border-white/20 p-5 text-white focus:border-amber-500 outline-none transition-colors text-lg font-medium font-syne" />
                    </div>
                </div>
                <div className="space-y-4 relative z-10">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-amber-500 block">WhatsApp / Direct Intel</label>
                    <input type="text" placeholder="+91" className="w-full bg-black border border-white/20 p-5 text-white focus:border-amber-500 outline-none transition-colors text-lg font-medium font-syne" />
                </div>
                <div className="pt-6 relative z-10">
                    <button className="w-full py-6 text-2xl font-black italic text-black bg-amber-500 hover:bg-white transition-colors uppercase tracking-[0.1em] font-syne">REQUEST FREE PREVIEW ENGINE</button>
                    <p className="text-xs text-slate-500 text-center uppercase tracking-[0.3em] mt-6">Limited to 3 autonomous deployments per week.</p>
                </div>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="py-24 px-6 border-t border-white/10 text-center bg-[#000000]">
        <div className="text-slate-600 text-sm font-bold uppercase tracking-[0.6em] font-syne">AUTONOMOUS.REV © 2026</div>
    </footer>
);

export default function App() {
    return (
        <div className="bg-black text-slate-400 min-h-screen selection:bg-amber-500 selection:text-black">
            <Header />
            <main>
                <Hero />
                <Process />
                <Arsenal />
                <Showcase />
                <CaseStudies />
                <AboutUs />
                <Testimonials />
                <TheLab />
                <LeadEngine />
            </main>
            <Footer />
        </div>
    );
}
