"use client";

import Footer from "@/components/layout/footer";
import { Header } from "@/components/layout/navbar";
import { TutorCard } from "@/components/tutors/tutor-card";
import { tutorService } from "@/lib/services/tutor.service";
import type { TutorProfile } from "@/types/api";
import { motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle,
  Code2,
  Globe2,
  GraduationCap,
  Loader2,
  MessageSquare,
  Music,
  Search,
  Star,
  TrendingUp,
  ArrowRight,
  Mail,
  Phone,
  Clock,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [featuredTutors, setFeaturedTutors] = useState<TutorProfile[]>([]);
  const [loadingTutors, setLoadingTutors] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const tutors = await tutorService.getAllTutors();
        tutors.sort((a, b) => b.averageRating - a.averageRating);
        setFeaturedTutors(tutors.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch featured tutors", error);
        toast.error("Failed to load featured tutors");
      } finally {
        setLoadingTutors(false);
      }
    };

    fetchTutors();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  const stagger = {
    whileInView: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    viewport: { once: true },
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 md:pt-40 md:pb-48">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-70"></div>
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="flex flex-col items-center text-center space-y-10 max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="space-y-6">
                <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-primary/10">
                    Trusted by 50,000+ Students
                </Badge>
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent pb-2">
                Learn from the <br /> Best Tutors.
              </h1>
              <p className="mx-auto max-w-[800px] text-muted-foreground md:text-2xl leading-relaxed">
                Unlock your potential with personalized 1-on-1 sessions. Find experts 
                in any subject and start your journey today.
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="w-full max-w-3xl">
              <div className="p-2 sm:p-3 bg-card border border-border rounded-2xl md:rounded-3xl shadow-2xl flex flex-col md:flex-row gap-3">
                <div className="flex-1 flex items-center px-4 py-3 bg-muted/50 rounded-xl md:rounded-2xl transition-all focus-within:bg-muted focus-within:ring-2 ring-primary/20">
                  <Search className="h-5 w-5 text-muted-foreground mr-3" />
                  <input
                    type="text"
                    placeholder="What do you want to learn?"
                    className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <Button className="h-auto py-4 px-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl md:rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]">
                  Search Tutors
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section - NEW */}
      <section className="py-12 border-y border-border bg-muted/20">
        <div className="container px-4 mx-auto">
            <p className="text-center text-xs font-bold text-muted-foreground/60 mb-10 uppercase tracking-[0.3em]">Students join us from world-leading institutions</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                {['Google', 'Microsoft', 'Stanford', 'Amazon', 'Harvard', 'Meta'].map((name) => (
                    <span key={name} className="text-xl md:text-2xl font-black tracking-tighter text-foreground">{name}</span>
                ))}
            </div>
        </div>
      </section>

      {/* Stats/Process Section */}
      <section className="py-32 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
              <h3 className="text-primary font-bold tracking-widest uppercase text-sm">How it works</h3>
            <h2 className="text-4xl md:text-6xl font-black text-foreground">
              Your Path to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Expertise
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started with SkillBridge in three simple steps designed for your success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                step: "01",
                title: "Find Your Match",
                description: "Browse thousands of verified tutors. Filter by subject, price, and availability to find the perfect educator for your needs.",
                icon: Search,
                color: "from-blue-500 to-cyan-500",
              },
              {
                step: "02",
                title: "Book & Schedule",
                description: "Choose a time that works for you. Book sessions instantly with our secure payment system and flexible scheduling tools.",
                icon: BookOpen,
                color: "from-purple-500 to-pink-500",
              },
              {
                step: "03",
                title: "Learn & Grow",
                description: "Join your interactive session. Get personalized attention, track your progress, and achieve your learning goals faster.",
                icon: TrendingUp,
                color: "from-orange-500 to-red-500",
              },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                className="group relative p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500"
                whileHover={{ y: -10 }}
              >
                <div className="absolute top-6 right-8 text-6xl font-black text-muted/20 group-hover:text-primary/10 transition-colors">
                    {item.step}
                </div>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-8 shadow-lg shadow-current/20`}>
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tutors Section */}
      <section className="py-32 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4 max-w-2xl">
              <h3 className="text-primary font-bold tracking-widest uppercase text-sm">Expert Educators</h3>
              <h2 className="text-4xl md:text-5xl font-black">
                Meet{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Our Top
                </span>{" "}
                Tutors
              </h2>
              <p className="text-lg text-muted-foreground">
                Hand-picked experts with proven track records in helping students succeed.
              </p>
            </div>
            <Link
              href="/tutors"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background border border-border hover:border-primary hover:text-primary transition-all font-semibold group"
            >
              View All Tutors
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loadingTutors ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : featuredTutors.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredTutors.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-background rounded-3xl border border-dashed border-border text-muted-foreground">
              No tutors available at the moment.
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section - NEW */}
      <section className="py-32 bg-background overflow-hidden">
        <div className="container px-4 mx-auto">
            <div className="text-center mb-20 space-y-4">
                <h3 className="text-primary font-bold tracking-widest uppercase text-sm">Success Stories</h3>
                <h2 className="text-4xl md:text-6xl font-black text-foreground">Loved by Thousands</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Join a community of passionate learners achieving their dreams with SkillBridge.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { name: "Alex Johnson", role: "CS Student at Stanford", text: "SkillBridge helped me master React and Node.js in weeks. My tutor was incredibly patient and knowledgeable. Highly recommended!", avatar: "AJ" },
                    { name: "Sarah Williams", role: "Language Learner", text: "The flexible scheduling is a lifesaver. I can book Spanish lessons around my full-time job without any hassle.", avatar: "SW" },
                    { name: "Michael Chen", role: "Professional Designer", text: "I needed to level up my UI/UX skills. Finding a professional mentor here was the best decision for my career growth.", avatar: "MC" }
                ].map((t, i) => (
                    <motion.div 
                        key={i} 
                        className="p-8 rounded-3xl bg-card border border-border shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-300"
                        whileInView={{ opacity: 1, scale: 1 }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div>
                            <div className="flex gap-1 text-yellow-500 mb-6">
                                {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                            </div>
                            <p className="text-foreground text-lg leading-relaxed mb-8 italic">"{t.text}"</p>
                        </div>
                        <div className="flex items-center gap-4 border-t border-border pt-6">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                                {t.avatar}
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground">{t.name}</h4>
                                <p className="text-sm text-muted-foreground">{t.role}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-primary font-bold tracking-widest uppercase text-sm">Why SkillBridge</h3>
                <h2 className="text-4xl md:text-6xl font-black leading-tight">
                    Education Built <br />
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Around You</span>
                </h2>
                <p className="text-xl text-muted-foreground">
                    We've reimagined the learning experience to be more personal, flexible, and effective than ever before.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8 pt-4">
                {[
                  { icon: ShieldCheck, title: "Verified Experts", desc: "Top 1% talent only" },
                  { icon: Clock, title: "Flexible", desc: "Learn on your schedule" },
                  { icon: Zap, title: "Interactive", desc: "Real-time collaboration" },
                  { icon: GraduationCap, title: "Certified", desc: "Earn proof of learning" },
                ].map((f, i) => (
                    <div key={i} className="flex flex-col gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <f.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h4 className="font-bold text-lg">{f.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                    </div>
                ))}
              </div>
            </div>

            <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-[3rem] blur-3xl -z-10"></div>
              <div className="bg-card border border-border rounded-[3rem] p-10 md:p-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 text-8xl opacity-10 group-hover:rotate-12 transition-transform select-none">🎓</div>
                <div className="space-y-8 relative z-10">
                    <div className="p-8 bg-background/50 backdrop-blur-sm rounded-3xl border border-border shadow-inner">
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-bold">Student Success Rate</span>
                            <span className="text-2xl font-black text-green-500">98.4%</span>
                        </div>
                        <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                            <motion.div 
                                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                                initial={{ width: 0 }}
                                whileInView={{ width: "98.4%" }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                        </div>
                    </div>
                    
                    <div className="p-8 bg-background/50 backdrop-blur-sm rounded-3xl border border-border shadow-inner">
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-bold">Avg. Tutor Rating</span>
                            <span className="text-2xl font-black text-blue-500">4.9/5</span>
                        </div>
                        <div className="flex gap-2">
                            {[1,2,3,4,5].map(i => <Star key={i} className="w-8 h-8 text-yellow-500 fill-yellow-500" />)}
                        </div>
                    </div>

                    <Button className="w-full h-16 rounded-2xl text-lg font-bold bg-foreground text-background hover:bg-foreground/90 transition-all">
                        Join & Experience Excellence
                    </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-32 bg-background">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h3 className="text-primary font-bold tracking-widest uppercase text-sm">Explore Subjects</h3>
            <h2 className="text-4xl md:text-6xl font-black">Find Your Passion</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Our tutors cover everything from core academic subjects to professional skills.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Code2, label: "Programming", count: "1,200+ Tutors", color: "blue" },
              { icon: Globe2, label: "Languages", count: "800+ Tutors", color: "green" },
              { icon: Music, label: "Arts & Music", count: "450+ Tutors", color: "pink" },
              { icon: GraduationCap, label: "Academics", count: "2,500+ Tutors", color: "orange" },
            ].map((cat, i) => (
              <Link href="/tutors" key={i} className="group">
                <div className="h-full bg-card p-8 rounded-[2rem] border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-2xl flex flex-col items-center text-center space-y-6">
                  <div className={`w-20 h-20 rounded-3xl bg-${cat.color}-500/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <cat.icon className={`w-10 h-10 text-${cat.color}-500`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">{cat.label}</h3>
                    <p className="text-sm text-muted-foreground font-medium">{cat.count}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - NEW */}
      <section className="py-32 bg-muted/30">
        <div className="container px-4 mx-auto">
            <div className="text-center mb-20 space-y-4">
                <h3 className="text-primary font-bold tracking-widest uppercase text-sm">Flexible Pricing</h3>
                <h2 className="text-4xl md:text-6xl font-black">Membership Plans</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Unlock more benefits with our exclusive membership tiers, designed for serious learners.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[
                    { name: "Free Tier", price: "0", desc: "For casual learners exploring the platform.", features: ["Access to search tutors", "Public study groups", "Profile dashboard", "Mobile app access"] },
                    { name: "Pro Plan", price: "19", desc: "Best for dedicated students who want more focus.", features: ["Everything in Free", "1 Private session included", "Priority tutor support", "Premium learning tools"], popular: true },
                    { name: "Mastery", price: "49", desc: "For those aiming for absolute subject mastery.", features: ["Everything in Pro", "Unlimited study groups", "No booking fees", "Advanced progress analytics"] }
                ].map((p, i) => (
                    <div key={i} className={`p-10 rounded-[2.5rem] bg-card border ${p.popular ? 'border-primary ring-2 ring-primary/20 shadow-2xl relative' : 'border-border'} flex flex-col`}>
                        {p.popular && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">Most Popular</div>}
                        <div className="mb-8">
                            <h3 className="text-2xl font-black mb-2">{p.name}</h3>
                            <p className="text-sm text-muted-foreground">{p.desc}</p>
                        </div>
                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-5xl font-black tracking-tighter">${p.price}</span>
                            <span className="text-muted-foreground font-medium">/month</span>
                        </div>
                        <div className="space-y-4 mb-12 flex-1">
                            {p.features.map(f => (
                                <div key={f} className="flex items-center gap-3 text-sm font-medium">
                                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                                        <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                                    </div>
                                    <span>{f}</span>
                                </div>
                            ))}
                        </div>
                        <Button className={`w-full h-14 rounded-2xl font-bold text-lg ${p.popular ? 'bg-primary text-primary-foreground hover:opacity-90' : 'bg-muted text-foreground hover:bg-muted/80'} transition-all`}>
                            Choose {p.name}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Newsletter Section - UPDATED/SEPARATED */}
      <section className="py-24 bg-primary overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
                <Mail className="w-[500px] h-[500px] rotate-12" />
          </div>
        <div className="container px-4 mx-auto relative z-10 text-center text-primary-foreground">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Never Miss a Step</h2>
            <p className="text-xl opacity-80 max-w-2xl mx-auto mb-12">Get expert tips, new tutor alerts, and exclusive discounts delivered straight to your inbox.</p>
            <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 p-2 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20">
                <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="flex-1 bg-transparent px-6 py-4 outline-none text-white placeholder:text-white/60 font-medium"
                />
                <Button className="h-auto py-4 px-8 bg-white text-primary hover:bg-white/90 rounded-2xl font-black">
                    Subscribe Now
                </Button>
            </div>
            <p className="mt-6 text-sm opacity-60">Join 10,000+ others already on the list. No spam, ever.</p>
        </div>
      </section>

      {/* FAQ Section - UPDATED/SEPARATED */}
      <section className="py-32 bg-background">
          <div className="container px-4 mx-auto max-w-4xl">
              <div className="text-center mb-20 space-y-4">
                  <h3 className="text-primary font-bold tracking-widest uppercase text-sm">FAQ</h3>
                  <h2 className="text-4xl md:text-5xl font-black">Questions? Answers.</h2>
              </div>
              <Accordion type="solid" className="w-full space-y-4">
                {[
                  { q: "How are tutors verified?", a: "Each tutor undergoes a multi-stage vetting process including identity verification, background checks, and subject matter testing to ensure the highest quality of education." },
                  { q: "What if I'm not happy with my lesson?", a: "We offer a 100% Satisfaction Guarantee. If you're not satisfied with your first session, we'll help you find a new tutor and your first lesson with them is on us." },
                  { q: "Can I book recurring sessions?", a: "Absolutely! Our calendar system allows you to schedule one-off lessons or set up a recurring weekly schedule with your favorite tutors." },
                  { q: "Are the sessions recorded?", a: "Yes, all video sessions are recorded and made available in your dashboard so you can review the material as many times as you need." },
                  { q: "How do payments work?", a: "Payments are processed securely through our platform. Tutors are paid 24 hours after long sessions are completed, ensuring both security for you and fair pay for them." }
                ].map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-border px-8 rounded-3xl">
                        <AccordionTrigger className="text-lg font-bold hover:no-underline py-6">
                            {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed">
                            {faq.a}
                        </AccordionContent>
                    </AccordionItem>
                ))}
              </Accordion>
          </div>
      </section>

      {/* Contact Section - UPDATED/SEPARATED */}
      <section className="py-32 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
                <div className="space-y-4">
                    <h3 className="text-primary font-bold tracking-widest uppercase text-sm">Get in Touch</h3>
                    <h2 className="text-4xl md:text-6xl font-black">We're Here to Help</h2>
                    <p className="text-xl text-muted-foreground">Have questions about the platform? Our support team is available 24/7 to assist you with anything you need.</p>
                </div>
                
                <div className="space-y-6">
                    {[
                        { icon: Mail, label: "Email Support", value: "hello@skillbridge.com" },
                        { icon: Phone, label: "Phone Support", value: "+1 (555) 000-0000" },
                        { icon: Clock, label: "Office Hours", value: "Mon-Fri: 9AM - 8PM EST" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-6 p-6 rounded-[2rem] bg-card border border-border group hover:border-primary/30 transition-all">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <item.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{item.label}</p>
                                <p className="text-xl font-bold">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-card p-10 md:p-12 rounded-[3.5rem] border border-border shadow-2xl space-y-8">
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold ml-2">First Name</label>
                        <input className="w-full bg-muted/50 border border-border rounded-2xl px-6 py-4 focus:ring-2 ring-primary/20 outline-none transition-all" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold ml-2">Last Name</label>
                        <input className="w-full bg-muted/50 border border-border rounded-2xl px-6 py-4 focus:ring-2 ring-primary/20 outline-none transition-all" placeholder="Doe" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold ml-2">Email Address</label>
                    <input className="w-full bg-muted/50 border border-border rounded-2xl px-6 py-4 focus:ring-2 ring-primary/20 outline-none transition-all" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold ml-2">Your Message</label>
                    <textarea className="w-full bg-muted/50 border border-border rounded-2xl px-6 py-4 min-h-[150px] focus:ring-2 ring-primary/20 outline-none transition-all" placeholder="How can we help you?" />
                </div>
                <Button className="w-full h-16 rounded-2xl text-lg font-bold bg-primary text-primary-foreground hover:scale-[1.02] transition-all shadow-xl shadow-primary/20">
                    Send Message
                </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 -z-10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none select-none overflow-hidden">
            <div className="text-[20rem] font-black absolute -top-40 -left-40">LEARN</div>
            <div className="text-[20rem] font-black absolute -bottom-40 -right-40">GROW</div>
        </div>
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-5xl md:text-8xl font-black text-white leading-tight">
            Start Your Journey <br /> Today.
          </h2>
          <p className="text-2xl text-white/80 font-medium">
            Join thousands of students already learning with SkillBridge. 
            No credit card required to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Link href="/register">
              <Button className="h-20 px-12 bg-white text-blue-600 rounded-[2.5rem] font-black text-2xl hover:scale-110 transition-all shadow-2xl hover:bg-white/90">
                Join for Free
              </Button>
            </Link>
            <Link href="/tutors">
              <Button className="h-20 px-12 bg-transparent border-4 border-white text-white rounded-[2.5rem] font-black text-2xl hover:bg-white hover:text-blue-600 transition-all">
                Browse Tutors
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
            {children}
        </span>
    );
}
