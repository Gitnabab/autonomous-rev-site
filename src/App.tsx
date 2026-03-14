import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Shield, Zap, MessageSquare, Globe, ArrowRight, MousePointer2, FlaskConical, Bot, CheckCircle2, Play, Users, Cpu, Star, Quote, Menu, X, Phone, Mail, MapPin, Instagram, Linkedin, ChevronRight, Sparkles, Clock, IndianRupee, TrendingUp } from 'lucide-react';

// Utility for cleaner class merging
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Import local images
import heroBg from './assets/hero_background.png';
import showcasePest from './assets/showcase_pest_control.png';
import showcaseClinic from './assets/showcase_medical_clinic.png';
import founderImg from './assets/founder_portrait.png';

// ─── WHATSAPP CONFIG ─────────────────────────────────
const WHATSAPP_NUMBER = '917478418786';
const whatsappLink = (msg = '') =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

// ─── ANIMATIONS ──────────────────────────────────────
const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

const stagger = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
};

// ─── TOP BANNER ──────────────────────────────────────
const TopBanner = () => (
    <div className="bg-orange-600 text-black py-2.5 px-6 text-center relative z-[60] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10"></div>
        <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] relative z-10 flex items-center justify-center gap-4">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 animate-pulse" />
            <span>FOUNDATIONAL PARTNER PROGRAM: 60% OFF FOR THE FIRST 3 PARTNERS (2 SLOTS LEFT)</span>
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 animate-pulse" />
        </p>
    </div>
);

// ─── HEADER ──────────────────────────────────────────
const Header = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'How It Works', href: '#process' },
        { label: 'Services', href: '#services' },
        { label: 'Results', href: '#results' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'About', href: '#about' },
    ];

    return (
        <header className={clsx(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6",
            scrolled ? "py-4 md:py-6" : "py-8 md:py-10"
        )}>
            <div className={clsx(
                "max-w-7xl mx-auto flex justify-between items-center transition-all duration-500 px-6 py-4 md:px-10 rounded-full border border-white/5",
                scrolled ? "bg-black/40 backdrop-blur-xl shadow-2xl" : "bg-transparent"
            )}>
                <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <img src="/autoleadforce_logo.png" alt="AutoLeadForce" className="h-10 md:h-14 w-auto mix-blend-lighten object-contain transition-transform group-hover:scale-105" />
                    <span className="text-xl md:text-2xl font-black text-white italic tracking-tighter uppercase font-syne accent-glow">
                        AutoLeadForce
                    </span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-slate-400">
                    {navLinks.map((l) => (
                        <a key={l.href} href={l.href} className="hover:text-orange-500 transition-colors">{l.label}</a>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <a href="#get-started" className="brutalist-button text-xs py-3 px-6 hidden md:inline-block">Get Started</a>
                    {/* Mobile Hamburger */}
                    <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2" aria-label="Menu">
                        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Nav */}
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 flex flex-col py-8 px-6 gap-6 md:hidden"
                        >
                            {navLinks.map((l) => (
                                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-lg font-bold uppercase tracking-widest text-slate-300 hover:text-orange-500 transition-colors">{l.label}</a>
                            ))}
                            <a href="#get-started" onClick={() => setOpen(false)} className="brutalist-button text-center py-4 mt-4">Get Started Free</a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

// ─── HERO ────────────────────────────────────────────
const Hero = () => (
    <section className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
            <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
        </div>

        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-900/15 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 max-w-5xl relative z-10"
        >
            <div className="inline-block px-4 py-1.5 border border-orange-500/30 text-orange-500 text-xs font-black uppercase tracking-[0.4em] bg-orange-500/5 backdrop-blur-md mb-4">
                The Kolkata Growth Blueprint — 2026 Edition
            </div>
            <h1 className="text-5xl md:text-[6.5rem] font-black text-white leading-[0.9] tracking-tighter font-syne uppercase">
                DOMINATE <br /> <span className="text-orange-500 italic accent-glow">KOLKATA</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed mt-6">
                We don't just build websites. We engineer <span className="text-white font-bold">Revenue Machines</span>. Stop losing customers to competitors in Salt Lake and New Town — it's time to own your market.
            </p>
            <div className="pt-10 flex flex-col md:flex-row gap-6 justify-center items-center">
                <a href="#get-started" className="brutalist-button py-5 px-14 text-lg hover:shadow-[0_0_50px_rgba(244,123,32,0.4)]">Claim Your Unfair Advantage</a>
                <a href="#process" className="flex items-center gap-3 py-5 px-10 text-lg font-bold text-white hover:text-orange-500 transition-colors group">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-orange-500/50 transition-colors">
                        <Play className="w-4 h-4 ml-1 fill-current" />
                    </div>
                    The Strategic Blueprint
                </a>
            </div>

            {/* Trust badges */}
            <div className="pt-12 flex flex-wrap justify-center gap-8 text-sm text-slate-500 font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-500/70" /> Zero Upfront Risk</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-500/70" /> Deployment in 24hrs</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-500/70" /> Bengali/Hindi AI Support</div>
            </div>
        </motion.div>

        {/* Inline noise overlay */}
        <div className="absolute inset-0 noise-overlay pointer-events-none"></div>
    </section>
);

// ─── PROCESS ─────────────────────────────────────────
const ProcessStep = ({ number, title, desc, icon: Icon }: any) => (
    <div className="relative pl-14 pb-20 last:pb-0 group">
        <div className="absolute left-[24px] top-12 bottom-0 w-px bg-white/10 group-last:bg-transparent transition-colors group-hover:bg-orange-500/30"></div>
        <div className="absolute left-0 top-0 w-12 h-12 bg-black border border-white/20 flex items-center justify-center text-slate-500 font-black group-hover:border-orange-500 group-hover:text-orange-500 transition-all duration-500 z-10 shadow-xl">
            {number}
        </div>
        <div className="space-y-4 pt-2">
            <div className="flex items-center gap-5">
                <Icon className="w-6 h-6 text-orange-500" />
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight font-syne">{title}</h3>
            </div>
            <p className="text-slate-400 font-medium leading-relaxed max-w-xl">{desc}</p>
        </div>
    </div>
);

const Process = () => (
    <section id="process" className="py-32 px-6 bg-[#030303] border-y border-white/5 relative">
        <div className="max-w-5xl mx-auto space-y-24 relative z-10">
            <motion.div {...fadeUp} className="text-left space-y-6">
                <div className="flex items-center gap-4 text-orange-500 mb-6">
                    <div className="h-px w-16 bg-orange-500"></div>
                    <span className="font-black uppercase tracking-[0.3em] text-xs">Simple Process</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none font-syne">HOW IT WORKS</h2>
                <p className="text-slate-400 font-medium text-xl mt-6 max-w-xl">Four easy steps. You go from zero to a stunning live website — without spending a single rupee upfront.</p>
            </motion.div>

            <motion.div {...fadeUp} className="p-8 md:p-16 glass-card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 blur-[120px] pointer-events-none"></div>
                <ProcessStep
                    number="1"
                    title="The Market Audit"
                    desc="We dissect your current presence and your competitors in Kolkata. We find the exact gaps where you're losing money and market share."
                    icon={Bot}
                />
                <ProcessStep
                    number="2"
                    title="Revenue Prototype"
                    desc="In under 24 hours, we build a mobile-first Revenue Engine tailored for the local market. You see the results before you pay a single paisa."
                    icon={MousePointer2}
                />
                <ProcessStep
                    number="3"
                    title="Flawless Execution"
                    desc="We launch on your official domain, secure your infrastructure, and prepare your business for the Durga Puja rush and beyond."
                    icon={Zap}
                />
                <ProcessStep
                    number="4"
                    title="Autonomous Scaling"
                    desc="We deploy your custom AI bots and dominate Google Maps. Your business now captures and closes leads 24/7 without you lifting a finger."
                    icon={Shield}
                />
            </motion.div>
        </div>
    </section>
);

// ─── CAPABILITIES (BENTO GRID) ──────────────────────
const Capabilities = () => {
    const items = [
        {
            title: 'WhatsApp Revenue Bot',
            desc: 'Your 24/7 autonomous sales associate. Handles Bengali, Hindi, and English to ensure you never miss a Kolkata lead again.',
            icon: <MessageSquare className="w-8 h-8" />,
            span: 'md:col-span-2 md:row-span-1',
            color: 'from-orange-500/10 to-transparent',
            accent: 'orange'
        },
        {
            title: 'AI Lead Finder',
            desc: 'Hyper-targeted lead extraction from JustDial & GMB.',
            icon: <Bot className="w-8 h-8" />,
            span: 'md:col-span-1 md:row-span-1',
            color: 'from-blue-500/10 to-transparent',
            accent: 'blue'
        },
        {
            title: 'Premium Web Engine',
            desc: 'Built for speed and psychological conversion.',
            icon: <Globe className="w-8 h-8" />,
            span: 'md:col-span-1 md:row-span-1',
            color: 'from-purple-500/10 to-transparent',
            accent: 'purple'
        },
        {
            title: 'GMB Domination',
            desc: 'We fix your reputation and put you at the top of Google Maps where calls happen.',
            icon: <Shield className="w-8 h-8" />,
            span: 'md:col-span-1 md:row-span-1',
            color: 'from-green-500/10 to-transparent',
            accent: 'green'
        },
        {
            title: 'Maps Ranking Surge',
            desc: 'Engineered visibility for Salt Lake, New Town, and Rajarhat.',
            icon: <Zap className="w-8 h-8" />,
            span: 'md:col-span-1 md:row-span-1',
            color: 'from-yellow-500/10 to-transparent',
            accent: 'yellow'
        }
    ];

    return (
        <section id="services" className="py-32 px-6 bg-black relative">
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="max-w-7xl mx-auto space-y-20 relative z-10">
                <motion.div {...fadeUp} className="flex flex-col md:flex-row justify-between items-end gap-8">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-orange-500">
                            <div className="h-px w-16 bg-orange-500"></div>
                            <span className="font-black uppercase tracking-[0.3em] text-xs">The Arsenal</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none font-syne">WHAT WE <br /> <span className="text-orange-500 accent-glow">BUILD FOR YOU</span></h2>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
                    {items.map((item, idx) => (
                        <motion.div
                            key={item.title}
                            {...stagger}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -8, scale: 1.01 }}
                            className={cn(
                                "group relative rounded-[2rem] p-8 border border-white/5 transition-all duration-500 overflow-hidden bg-gradient-to-br",
                                item.span,
                                item.color,
                                "hover:border-orange-500/30"
                            )}
                        >
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-5"></div>
                            <div className="relative z-10 flex flex-col justify-between h-full">
                                <div className="space-y-6">
                                    <div className="w-14 h-14 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center text-white group-hover:text-orange-500 group-hover:scale-110 transition-all duration-500">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tight font-syne group-hover:text-orange-500 transition-colors">{item.title}</h3>
                                </div>
                                <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ─── SHOWCASE ────────────────────────────────────────
const ShowcaseCard = ({ title, url, image, desc }: any) => (
    <motion.div
        {...stagger}
        whileHover={{ scale: 1.02 }}
        className="brutalist-card overflow-hidden group cursor-pointer border-white/10"
        onClick={() => url !== '#' && window.open(url, '_blank')}
    >
        <div className="aspect-video bg-[#050505] relative overflow-hidden">
            <img src={image} alt={title} className="w-full h-full object-cover opacity-70 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-20 h-20 rounded-full border border-orange-500 bg-orange-500/10 flex items-center justify-center backdrop-blur-md shadow-[0_0_40px_rgba(244,123,32,0.3)]">
                    <Play className="w-8 h-8 text-orange-500 ml-1 fill-orange-500" />
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>
        <div className="p-8 space-y-3 bg-black">
            <h3 className="text-2xl font-black text-white uppercase tracking-tight font-syne">{title}</h3>
            <p className="text-slate-500 text-sm font-medium">{desc}</p>
            <div className="inline-flex items-center gap-3 text-orange-500 font-bold uppercase tracking-[0.2em] text-xs hover:text-white transition-colors pt-2">
                Launch Experience <ArrowRight className="w-4 h-4" />
            </div>
        </div>
    </motion.div>
);

const Showcase = () => (
    <section id="showcase" className="py-32 px-6 bg-[#030303] border-y border-white/5">
        <div className="max-w-7xl mx-auto space-y-24">
            <motion.div {...fadeUp} className="text-center space-y-6">
                <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none font-syne">OUR WORK</h2>
                <p className="text-slate-400 max-w-lg mx-auto font-medium text-xl">Real websites we've built for real businesses. Check them out live.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <ShowcaseCard
                    title="Pest Control — Kolkata"
                    url="https://master-template-blush.vercel.app"
                    image={showcasePest}
                    desc="Premium mobile-first website with WhatsApp integration. Built & deployed in under 18 hours."
                />
                <ShowcaseCard
                    title="Medical Clinic — Coming Soon"
                    url="#"
                    image={showcaseClinic}
                    desc="Modern healthcare website with appointment booking. Currently in development."
                />
            </div>
        </div>
    </section>
);

// ─── CASE STUDIES ────────────────────────────────────
const CaseStudyCard = ({ title, metric, label, desc, icon: Icon }: any) => (
    <motion.div {...stagger} className="glass-card p-10 md:p-12 group hover:border-orange-500/40">
        <div className="space-y-8">
            <div className="flex flex-col gap-4">
                <div className="space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">{label}</div>
                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter font-syne">{title}</h3>
                </div>
                <div className="text-4xl md:text-5xl font-black text-orange-500 italic accent-glow">{metric}</div>
            </div>
            <p className="text-slate-400 font-medium leading-relaxed text-base md:text-lg">{desc}</p>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-orange-500 shadow-[0_0_10px_rgba(202,138,4,0.8)]"
                />
            </div>
        </div>
    </motion.div>
);

const CaseStudies = () => (
    <section id="results" className="py-32 px-6 bg-black relative">
        <div className="max-w-7xl mx-auto space-y-24">
            <motion.div {...fadeUp} className="flex flex-col items-center text-center space-y-6">
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-black/40 backdrop-blur-sm border border-orange-500/20 mb-8 rounded-full">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    <span className="text-[10px] md:text-xs font-black text-orange-500 uppercase tracking-[0.3em] font-syne">THE KOLKATA GROWTH BLUEPRINT — 2026 EDITION</span>
                </div>
                <h2 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-none font-syne">REAL RESULTS</h2>
                <p className="text-slate-400 max-w-lg font-medium text-xl mt-6">See what we've achieved for businesses like yours. Real numbers, real impact.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <CaseStudyCard
                    label="Speed Score"
                    title="Kolkata Pest Control"
                    metric="98/100"
                    desc="Google PageSpeed score of 98 on mobile. Your customers see your website instantly — no waiting, no frustration."
                    icon={Zap}
                />
                <CaseStudyCard
                    label="Delivery Speed"
                    title="Emerald Pest — Pune"
                    metric="<18hr"
                    desc="From first contact to a fully live, branded website on the internet. Less than 18 hours, start to finish."
                    icon={Clock}
                />
                <CaseStudyCard
                    label="More Clicks"
                    title="SS Pest Solutions"
                    metric="2X"
                    desc="After the website redesign, twice as many visitors clicked the WhatsApp button to contact the business."
                    icon={TrendingUp}
                />
            </div>
        </div>
    </section>
);

// ─── PRICING ─────────────────────────────────────────
const PricingCard = ({ tier, name, price, period, features, highlighted, accent = 'orange' }: any) => {
    const accents: any = {
        orange: 'text-orange-500 border-orange-500 bg-orange-500',
        blue: 'text-blue-500 border-blue-500 bg-blue-500',
        indigo: 'text-indigo-500 border-indigo-500 bg-indigo-500'
    };

    const accentColor = accents[accent].split(' ')[0];
    const accentBorder = accents[accent].split(' ')[1];
    const accentBg = accents[accent].split(' ')[2];

    return (
        <motion.div
            {...stagger}
            whileHover={{ y: -8 }}
            className={cn(
                "relative p-8 md:p-10 flex flex-col justify-between transition-all duration-500",
                highlighted
                    ? `brutalist-card border-2 ${accentBorder} shadow-[0_0_50px_rgba(0,0,0,0.3)]`
                    : `glass-card hover:border-${accent}-500/40`
            )}
        >
            {highlighted && (
                <div className={cn("absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 text-black text-[10px] font-black uppercase tracking-[0.2em]", accentBg)}>
                    Kolkata Favorite
                </div>
            )}
            <div className="space-y-8">
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <div className={cn("text-[10px] font-black uppercase tracking-[0.3em]", accentColor)}>{tier}</div>
                        {price !== '₹0' && (
                            <div className="px-2 py-0.5 bg-white/10 text-white text-[8px] font-black uppercase tracking-widest rounded-full border border-white/5">Foundational: 60% OFF</div>
                        )}
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tight font-syne">{name}</h3>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-white italic">{price}</span>
                        {period && <span className="text-slate-500 font-bold text-sm">/{period}</span>}
                    </div>
                    {price !== '₹0' && (
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            Standard: <span className="line-through">
                                ₹{(() => {
                                    const numeric = parseFloat(price.replace('₹', '').replace('k', '').replace('L', ''));
                                    const isLakh = price.includes('L');
                                    const valInK = isLakh ? numeric * 100 : numeric;
                                    const standardPriceInK = Math.round(valInK / 0.4);
                                    if (isLakh) {
                                        return (standardPriceInK / 100).toFixed(2).replace(/\.00$/, '') + 'L';
                                    }
                                    return standardPriceInK + 'k';
                                })()}
                            </span>
                        </div>
                    )}
                </div>
                <ul className="space-y-4">
                    {features.map((f: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300 font-medium">
                            <CheckCircle2 className={cn("w-5 h-5 shrink-0 mt-0.5", accentColor)} />
                            <span>{f}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <a href="#get-started" className={cn(
                "mt-10 block text-center py-4 font-black uppercase tracking-[0.1em] text-sm transition-all duration-500",
                highlighted
                    ? `${accentBg} text-black hover:bg-white`
                    : `border border-white/20 text-white hover:${accentBg} hover:border-${accent}-500 hover:text-black`
            )}>
                {price === '₹0' ? 'Start Free' : 'Secure Your Spot'}
            </a>
        </motion.div>
    );
};

const Pricing = () => (
    <section id="pricing" className="py-32 px-6 bg-[#030303] border-y border-white/5 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl aspect-square bg-orange-500/5 blur-[150px] pointer-events-none rounded-full"></div>
        <div className="max-w-7xl mx-auto space-y-20 relative z-10">
            <motion.div {...fadeUp} className="text-center space-y-6">
                <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none font-syne text-glow">REVENUE TIERS</h2>
                <p className="text-slate-400 max-w-lg mx-auto font-medium text-xl mt-6">We don't sell websites. We sell market share. Choose your engine speed.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <PricingCard
                    tier="Tier 01: Growth"
                    name="Core Engine"
                    price="₹49k"
                    period="month"
                    features={[
                        'High-Converting Local Website',
                        'WhatsApp AI Response Bot',
                        'Lead Finder Dashboard',
                        'Sector-specific SEO Audit',
                        '24/7 Technical Support',
                    ]}
                    highlighted={false}
                    accent="orange"
                />
                <PricingCard
                    tier="Tier 02: Dominance"
                    name="Market Dominator"
                    price="₹99k"
                    period="month"
                    features={[
                        'Everything in Growth, plus:',
                        'Hyper-Local SEO Domination',
                        'AI Voice Call Assistant (Bengali/Hindi)',
                        'Durga Puja Seasonal Scaling',
                        'Automated Review Management',
                        'Aggressive Ads Management',
                    ]}
                    highlighted={true}
                    accent="blue"
                />
                <PricingCard
                    tier="Tier 03: Elite"
                    name="The Monopoly"
                    price="₹1.9L"
                    period="month"
                    features={[
                        'Everything in Dominator, plus:',
                        'Full-Scale Custom AI Sales Rep',
                        'Strategic Market Intelligence',
                        'Unlimited Landing Page Sprints',
                        'Founder-level Growth Strategy',
                        'Exclusive Niche Lock (1 per city)',
                    ]}
                    highlighted={false}
                    accent="indigo"
                />
            </div>
            <p className="text-center text-slate-500 text-sm uppercase tracking-widest font-bold">One-time setup fee apply for all partnerships · Billed annually for 20% off</p>
        </div>
    </section>
);

// ─── ABOUT US ────────────────────────────────────────
const AboutUs = () => (
    <section id="about" className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
            <motion.div {...fadeUp} className="lg:w-1/2 space-y-10">
                <div className="flex items-center gap-4 text-orange-500 mb-2">
                    <div className="h-px w-16 bg-orange-500"></div>
                    <span className="font-black uppercase tracking-[0.3em] text-xs">The Vision</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none font-syne">THE KOLKATA REVENUE LAB</h2>
                <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed">
                    We aren't a digital agency. We're an <span className="text-white font-bold">Inquiry Engineering Firm</span> dedicated to making Kolkata businesses un-ignorable.
                </p>
                <div className="flex flex-col gap-6 pt-6">
                    <div className="flex items-start gap-6 p-6 md:p-8 glass-card border-l-4 border-l-orange-500">
                        <Cpu className="w-10 h-10 text-orange-500 shrink-0 mt-1" />
                        <div>
                            <h4 className="text-white font-bold text-lg md:text-xl mb-2 uppercase tracking-widest font-syne">AI-Powered Domination</h4>
                            <p className="text-slate-400">By leveraging specialized AI for the local market, we extract more value from every lead than any human team could. We don't sleep, and neither does your growth.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-6 p-6 md:p-8 glass-card border-l-4 border-l-orange-500">
                        <Users className="w-10 h-10 text-orange-500 shrink-0 mt-1" />
                        <div>
                            <h4 className="text-white font-bold text-lg md:text-xl mb-2 uppercase tracking-widest font-syne">Built for India</h4>
                            <p className="text-slate-400">We understand Indian businesses. Mobile-first design, WhatsApp integration, and local SEO — because 80% of your customers are on their phone.</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div {...fadeUp} className="lg:w-1/2 w-full aspect-square md:aspect-video lg:aspect-square relative flex items-center justify-center p-8">
                <div className="absolute w-full h-full border border-white/5 bg-white/[0.02]"></div>
                <div className="absolute w-[90%] h-[90%] border border-white/10 bg-white/[0.03] rotate-3 transition-transform duration-1000 hover:rotate-6"></div>
                <div className="absolute w-[80%] h-[80%] border border-orange-500/20 glass-card -rotate-3 p-8 md:p-12 flex flex-col items-center justify-center text-center space-y-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10 transition-transform duration-1000 hover:rotate-0 overflow-hidden">
                    <img src={founderImg} alt="Nabab — Founder" className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-orange-500/40" />
                    <div>
                        <div className="font-black tracking-widest text-white text-2xl md:text-3xl uppercase font-syne">Nabab</div>
                        <div className="text-orange-500 font-bold text-sm uppercase tracking-[0.3em] mt-3">Kolkata's AI Growth Expert</div>
                    </div>
                </div>
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-orange-500"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-orange-500"></div>
            </motion.div>
        </div>
    </section>
);

// ─── TESTIMONIALS ────────────────────────────────────
const TestimonialCard = ({ client, role, quote, initials }: any) => (
    <motion.div {...stagger} className="glass-card p-10 md:p-12 flex flex-col justify-between h-full group hover:border-orange-500/30">
        <div className="space-y-8">
            <Quote className="w-12 h-12 text-white/10 group-hover:text-orange-500/30 transition-colors" />
            <p className="text-white text-lg md:text-xl font-medium leading-relaxed italic">"{quote}"</p>
        </div>
        <div className="pt-10 flex items-center gap-6 mt-10 border-t border-white/10">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-black font-black text-lg rounded-full">
                {initials}
            </div>
            <div>
                <h4 className="text-white font-bold uppercase tracking-widest text-lg font-syne">{client}</h4>
                <div className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mt-1">{role}</div>
            </div>
        </div>
    </motion.div>
);

const Testimonials = () => (
    <section id="testimonials" className="py-32 px-6 bg-[#030303] border-y border-white/5">
        <div className="max-w-7xl mx-auto space-y-24">
            <motion.div {...fadeUp} className="flex flex-col items-center text-center space-y-6">
                <h2 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-none font-syne text-glow">WHAT OUR PARTNERS SAY</h2>
                <p className="text-slate-400 max-w-lg font-medium text-xl mt-6">We don't have "clients." We have partners in growth. Here's what they say about our execution.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                <TestimonialCard
                    client="Vikram S."
                    role="Owner, Emerald Pest Control (Kolkata)"
                    initials="VS"
                    quote="I was skeptical about the AI bots, but the result was undeniable. Within weeks of launching, our inquiries from Salt Lake and Rajarhat doubled. They don't just build sites; they build revenue."
                />
                <TestimonialCard
                    client="Rahul D."
                    role="Founder, SS Solutions"
                    initials="RD"
                    quote="The website they built makes my business look like the market leader. It's fast, brutal, and it converts. The WhatsApp integration is a game-changer for the local Kolkata market."
                />
            </div>
        </div>
    </section>
);

// ─── THE LAB ─────────────────────────────────────────
const TheLab = () => (
    <section id="lab" className="py-32 px-6 overflow-hidden bg-black relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-orange-500/5 blur-[150px] pointer-events-none rounded-full"></div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center relative z-10">
            <motion.div {...fadeUp} className="lg:w-1/2 space-y-12 order-2 lg:order-1">
                <div className="space-y-6">
                    <div className="flex items-center gap-4 text-orange-500">
                        <div className="h-px w-16 bg-orange-500"></div>
                        <span className="font-black uppercase tracking-[0.3em] text-xs">Proprietary Tech</span>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase italic font-syne">THE ARSENAL</h2>
                    <p className="text-xl md:text-2xl text-slate-400 max-w-lg font-medium leading-relaxed">
                        Upcoming tools currently in aggressive testing. We build the future of local commerce.
                    </p>
                </div>
                <div className="space-y-8">
                    {[
                        { label: 'Hyper-Local AI Voice', desc: 'Smarter calls in Bengali & Hindi', icon: Bot },
                        { label: 'Automated GMB Surge', desc: 'AI-driven reputation repair', icon: FlaskConical },
                        { label: 'Puja Rush Optimizer', desc: 'Dynamic scaling for peak seasons', icon: Sparkles },
                    ].map((item, id) => (
                        <div key={id} className="flex items-center gap-6 group">
                            <div className="w-14 h-14 border border-white/10 flex items-center justify-center group-hover:border-orange-500 bg-black/50 transition-colors shrink-0">
                                <item.icon className="w-6 h-6 text-slate-600 group-hover:text-orange-500 transition-colors" />
                            </div>
                            <div>
                                <span className="text-lg font-bold text-slate-300 group-hover:text-white transition-colors">{item.label}</span>
                                <p className="text-sm text-slate-500">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
            <div className="lg:w-1/2 relative order-1 lg:order-2">
                <div className="aspect-square border border-white/10 p-12 flex items-center justify-center relative bg-black/20 backdrop-blur-sm">
                    <div className="w-full h-full border border-white/5 rotate-45 absolute flex items-center justify-center transition-transform animate-[spin_60s_linear_infinite]">
                        <div className="w-1/2 h-1/2 border border-orange-500/20"></div>
                    </div>
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="w-64 h-64 md:w-80 md:h-80 border border-dashed border-orange-500/30 rounded-full flex items-center justify-center bg-black"
                    >
                        <Sparkles className="w-16 h-16 md:w-20 md:h-20 text-orange-500" />
                    </motion.div>
                </div>
            </div>
        </div>
    </section>
);

// ─── LEAD ENGINE (Contact Form) ──────────────────────
const LeadEngine = () => {
    const [form, setForm] = useState({ business: '', name: '', phone: '' });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const msg = `Hi! I want to automate my business lead generation.\n\nBusiness: ${form.business}\nName: ${form.name}\nPhone: ${form.phone}`;
        window.open(whatsappLink(msg), '_blank');
    };

    return (
        <section id="get-started" className="py-40 px-6 bg-[#030303] border-t border-white/5">
            <div className="max-w-5xl mx-auto space-y-16 text-center">
                <motion.div {...fadeUp} className="space-y-6">
                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic font-syne">DEPLOY YOUR ENGINE</h2>
                    <p className="text-slate-400 font-medium text-xl max-w-2xl mx-auto">Apply for a free Kolkata Market Audit and Revenue Prototype. We only partner with one business per niche to ensure absolute domination.</p>
                </motion.div>
                <motion.form {...fadeUp} onSubmit={handleSubmit} className="brutalist-card p-8 md:p-16 space-y-10 text-left border-orange-500/30 bg-[#050505] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px]"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                        <div className="space-y-4">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-orange-500 block">Niche / Industry</label>
                            <input
                                type="text"
                                placeholder="e.g. Pest Control, Medical, Real Estate"
                                value={form.business}
                                onChange={(e) => setForm({ ...form, business: e.target.value })}
                                className="w-full bg-black border border-white/20 p-5 text-white focus:border-orange-500 outline-none transition-colors text-lg font-medium font-syne placeholder:text-slate-600"
                                required
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-orange-500 block">Decision Maker Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Rajesh Kumar"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="w-full bg-black border border-white/20 p-5 text-white focus:border-orange-500 outline-none transition-colors text-lg font-medium font-syne placeholder:text-slate-600"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-4 relative z-10">
                        <label className="text-xs font-black uppercase tracking-[0.2em] text-orange-500 block">WhatsApp Number (For Revenue Prototype)</label>
                        <input
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full bg-black border border-white/20 p-5 text-white focus:border-orange-500 outline-none transition-colors text-lg font-medium font-syne placeholder:text-slate-600"
                            required
                        />
                    </div>
                    <div className="pt-6 relative z-10">
                        <button type="submit" className="w-full py-6 text-xl md:text-2xl font-black text-black bg-orange-500 hover:bg-white transition-colors uppercase tracking-[0.1em] font-syne cursor-pointer hover:shadow-[0_0_50px_rgba(244,123,32,0.4)]">
                            ACTIVATE REVENUE PROTOTYPE →
                        </button>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.4em] mt-8">Limited Availability · Exclusive Partner Strategy</p>
                    </div>
                </motion.form>
            </div>
        </section>
    );
};

// ─── WHATSAPP FLOATING BUTTON ────────────────────────
const WhatsAppButton = () => (
    <a
        href={whatsappLink('Hi! I saw your website and I\'m interested in a free website preview for my business.')}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
    >
        <svg viewBox="0 0 32 32" className="w-8 h-8 fill-white">
            <path d="M16.004 0h-.008C7.174 0 .002 7.174.002 16c0 3.502 1.13 6.744 3.048 9.38L1.06 31.502l6.318-1.958A15.91 15.91 0 0 0 16.004 32C24.826 32 32 24.826 32 16S24.826 0 16.004 0zm9.43 22.604c-.396 1.116-1.954 2.042-3.218 2.312-.866.182-1.998.328-5.808-1.248-4.876-2.014-8.012-6.948-8.254-7.27-.232-.322-1.954-2.604-1.954-4.968s1.234-3.528 1.674-4.012c.396-.436 1.044-.638 1.664-.638.198 0 .376.01.536.018.44.02.66.046.952.736.362.86 1.248 3.044 1.358 3.264.11.22.222.518.072.826-.14.318-.264.518-.484.796-.22.278-.462.494-.684.794-.2.264-.424.546-.182.986.242.44 1.076 1.774 2.312 2.872 1.59 1.414 2.93 1.852 3.348 2.058.44.22.696.184.952-.11.264-.302 1.134-1.32 1.438-1.776.296-.456.598-.378.998-.228.406.148 2.576 1.216 3.018 1.438.44.222.736.332.846.518.11.184.11 1.078-.286 2.194z" />
        </svg>
    </a>
);

// ─── FOOTER ──────────────────────────────────────────
const Footer = () => (
    <footer className="py-24 md:py-32 px-6 border-t border-orange-500/10 bg-[#020202] relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
                {/* Brand & Mission */}
                <div className="lg:col-span-5 space-y-10">
                    <div className="space-y-6">
                        <img src="/autoleadforce_logo.png" alt="AutoLeadForce" className="h-24 md:h-32 w-auto mix-blend-lighten object-contain -ml-2" />
                        <h2 className="text-2xl md:text-3xl font-black text-white italic tracking-tighter uppercase font-syne accent-glow">THE REVENUE ARCHITECTS</h2>
                        <p className="text-slate-400 font-medium leading-relaxed text-lg max-w-md">
                            Kolkata's elite partner for local business dominance. We don't just build websites; we engineer revenue-generating assets that work 24/7.
                        </p>
                    </div>
                    {/* Exclusivity Pledge */}
                    <div className="p-6 border border-orange-500/20 bg-orange-500/5 backdrop-blur-sm">
                        <div className="flex items-center gap-3 text-orange-500 mb-3">
                            <Shield className="w-5 h-5" />
                            <span className="font-black uppercase tracking-widest text-xs">Exclusivity Pledge</span>
                        </div>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed">
                            To ensure total market domination for our partners, <span className="text-orange-500 font-bold">we only accept one business per niche</span> in any given territory. Once your niche is locked, your competitors are locked out.
                        </p>
                    </div>
                </div>

                {/* Navigation Grid */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 lg:gap-16">
                    {/* The Blueprint */}
                    <div className="space-y-8">
                        <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs font-syne border-b border-white/5 pb-4">The Blueprint</h4>
                        <div className="flex flex-col gap-4">
                            {['How It Works', 'Capabilities', 'Pricing', 'Results', 'About'].map((l) => (
                                <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`} className="text-slate-500 hover:text-orange-500 transition-all hover:translate-x-1 font-medium text-sm inline-flex items-center gap-2 group">
                                    <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    {l}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Reach Out */}
                    <div className="space-y-8">
                        <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs font-syne border-b border-white/5 pb-4">HQ & Support</h4>
                        <div className="flex flex-col gap-5">
                            <a href={whatsappLink()} className="flex items-start gap-4 text-slate-500 hover:text-orange-500 transition-colors group">
                                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <div>
                                    <span className="block font-bold text-white text-sm">Direct WhatsApp</span>
                                    <span className="text-xs font-medium">Priority Partner Support</span>
                                </div>
                            </a>
                            <a href="mailto:autoleadforce@gmail.com" className="flex items-start gap-4 text-slate-500 hover:text-orange-500 transition-colors group">
                                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <div>
                                    <span className="block font-bold text-white text-sm">Email HQ</span>
                                    <span className="text-xs font-medium">autoleadforce@gmail.com</span>
                                </div>
                            </a>
                            <a href="https://www.google.com/maps/place/Auto+Lead+Force" target="_blank" rel="noreferrer" className="flex items-start gap-4 text-slate-500 hover:text-orange-500 transition-colors group">
                                <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <div>
                                    <span className="block font-bold text-white text-sm">Location</span>
                                    <span className="text-xs font-medium">Kolkata HQ, India</span>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="space-y-8">
                        <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs font-syne border-b border-white/5 pb-4">Network</h4>
                        <div className="flex flex-col gap-4">
                            <a href="https://www.instagram.com/autoleadforce/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-500 hover:text-orange-500 transition-colors font-medium text-sm">
                                <Instagram className="w-4 h-4" /> Instagram
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=61582427739532" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-500 hover:text-orange-500 transition-colors font-medium text-sm">
                                <Users className="w-4 h-4" /> Facebook
                            </a>
                            <a href="https://www.linkedin.com/in/auto-lead-force-4811573b7/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-500 hover:text-orange-500 transition-colors font-medium text-sm">
                                <Linkedin className="w-4 h-4" /> LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                    <span className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] font-syne">AutoLeadForce © 2026</span>
                    <span className="hidden md:block w-1 h-1 bg-white/10 rounded-full"></span>
                    <span className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] font-syne">Built For Market Leaders</span>
                </div>
                <div className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] font-syne">Made with ❤️ in India</div>
            </div>
        </div>
    </footer>
);

// ─── APP ─────────────────────────────────────────────
export default function App() {
    return (
        <div className="relative">
            <TopBanner />
            <div className="noise-overlay fixed inset-0 pointer-events-none z-[60]"></div>
            <div className="bg-black text-slate-400 min-h-screen selection:bg-orange-500 selection:text-black scroll-smooth">
                <Header />
                <main>
                    <Hero />
                    <Process />
                    <Capabilities />
                    <Showcase />
                    <CaseStudies />
                    <Pricing />
                    <AboutUs />
                    <Testimonials />
                    <TheLab />
                    <LeadEngine />
                </main>
                <Footer />
                <WhatsAppButton />
            </div>
        </div>
    );
}
