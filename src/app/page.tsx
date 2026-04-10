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
  CreditCard,
  UserCheck,
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

export default function Home() {
  const [featuredTutors, setFeaturedTutors] = useState<TutorProfile[]>([]);
  const [loadingTutors, setLoadingTutors] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const tutors = await tutorService.getAllTutors();
        tutors.sort((a, b) => b.averageRating - a.averageRating);
        setFeaturedTutors(tutors.slice(0, 3));
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
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-background to-background opacity-40 dark:from-indigo-900/40"></div>
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Connect with Expert, <br /> Tutor
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl leading-relaxed">
                Find your perfect tutor from thousands of experts. Book sessions
                instantly and start learning today.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex gap-4">
              <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl shadow-2xl p-3 flex flex-col md:flex-row gap-3">
                <div className="flex-1 flex items-center px-4 py-2 bg-muted/50 rounded-xl">
                  <Search className="h-5 w-5 text-muted-foreground mr-3" />
                  <input
                    type="text"
                    placeholder="What do you want to learn?"
                    className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground"
                  />
                </div>
                <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-0.5 transition">
                  Search Tutors
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              How{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SkillBridge
              </span>{" "}
              Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Get started in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Find Your Tutor",
                description:
                  "Browse through our extensive list of expert tutors. Filter by subject, price, rating, and availability to find your perfect match.",
                icon: Search,
                color: "from-blue-500 to-cyan-500",
              },
              {
                step: "2",
                title: "Book a Session",
                description:
                  "View tutor availability and book a session that fits your schedule. Instant confirmation with flexible timing options.",
                icon: BookOpen,
                color: "from-purple-500 to-pink-500",
              },
              {
                step: "3",
                title: "Start Learning",
                description:
                  "Join your session and start learning! After completion, leave a review to help other students find great tutors.",
                icon: TrendingUp,
                color: "from-orange-500 to-red-500",
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 h-full border border-border">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6`}
                  >
                    <item.icon className="h-8 w-8 text-white" />
                  </div>

                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                    {item.step}
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tutors Section */}
      <section className="py-24 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Meet{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Our Top
              </span>{" "}
              Tutors
            </h2>

            <p className="max-w-[500px] text-muted-foreground md:text-lg">
              Learn from the very best.
            </p>
            <Link
              href="/tutors"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center group"
            >
              View All Tutors{" "}
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>

          {loadingTutors ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : featuredTutors.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {featuredTutors.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No tutors available at the moment.
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section (New) */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-950 dark:to-slate-900 border-y border-border">
        <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">What Students Say</h2>
                <p className="text-xl text-muted-foreground">Join thousands of satisfied students world-wide</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { name: "Alex J.", role: "Web Dev Student", text: "SkillBridge has completely changed how I learn. The tutors are amazing!" },
                    { name: "Sarah W.", role: "Language Learner", text: "I found the perfect Spanish tutor within minutes. Very flexible scheduling." },
                    { name: "Michael C.", role: "Exams Prep", text: "Helped me ace my board exams. The 1-on-1 attention is exactly what I needed." }
                ].map((t, i) => (
                    <div key={i} className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
                        <div className="flex text-yellow-500 mb-4">
                            {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                        </div>
                        <p className="text-foreground italic mb-6">"{t.text}"</p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">{t.name[0]}</div>
                            <div>
                                <p className="font-bold text-sm">{t.name}</p>
                                <p className="text-xs text-muted-foreground">{t.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Why Choose{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SkillBridge?
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                We connect you with the world's best tutors, making quality
                education accessible to everyone, everywhere.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: CheckCircle,
                    title: "Verified Expert Tutors",
                    description:
                      "All tutors are thoroughly vetted and certified in their subjects",
                  },
                  {
                    icon: Star,
                    title: "Highly Rated Platform",
                    description:
                      "Join thousands of satisfied students with 4.9/5 average rating",
                  },
                  {
                    icon: MessageSquare,
                    title: "Instant Communication",
                    description:
                      "Real-time chat and video sessions for seamless learning",
                  },
                ].map((feature, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-slate-900 dark:to-slate-800 rounded-xl flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
                <div className="text-8xl text-center mb-6">📚</div>
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg mb-4 text-gray-900 dark:text-white">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-muted-foreground">Success Rate</span>
                    <span className="text-2xl font-bold text-green-600">
                      95%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                      style={{ width: "95%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section (New) */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-950 dark:to-slate-900">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Simple Pricing</h2>
                    <p className="text-xl text-muted-foreground">No hidden fees, choose your plan</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {[
                        { name: "Starter", price: "0", desc: "Best for exploring the platform", icon: UserCheck },
                        { name: "Professional", price: "19", desc: "Unlock priority features", icon: CreditCard, recommend: true }
                    ].map((p, i) => (
                        <div key={i} className={`p-8 rounded-2xl border ${p.recommend ? 'border-primary ring-1 ring-primary' : 'border-border'} bg-card shadow-lg relative`}>
                            {p.recommend && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full font-bold">RECOMMENDED</span>}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-muted rounded-xl"><p.icon className="w-6 h-6 text-primary" /></div>
                                <h3 className="text-2xl font-bold">{p.name}</h3>
                            </div>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-bold text-foreground">${p.price}</span>
                                <span className="text-muted-foreground">/month</span>
                            </div>
                            <p className="text-muted-foreground mb-8">{p.desc}</p>
                            <button className={`w-full py-3 rounded-xl font-bold transition ${p.recommend ? 'bg-primary text-white' : 'bg-muted text-foreground'}`}>Get Started</button>
                        </div>
                    ))}
                </div>
            </div>
      </section>

      {/* Popular Categories */}
      <section className="py-24 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Explore {""}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Categories
              </span>{" "}
            </h2>
            <p className="max-w-[500px] text-muted-foreground md:text-lg">
              Upgrade your skills in diverse areas.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Code2, label: "Programming", color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/20" },
              { icon: Globe2, label: "Languages", color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/20" },
              { icon: Music, label: "Music", color: "text-pink-500", bg: "bg-pink-100 dark:bg-pink-900/20" },
              { icon: GraduationCap, label: "Academics", color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/20" },
            ].map((cat, i) => (
              <Link href="/" key={i} className="group">
                <div className="bg-card p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-border flex flex-col items-center text-center space-y-4 h-full">
                  <div className={`p-4 rounded-full ${cat.bg}`}>
                    <cat.icon className={`w-8 h-8 ${cat.color}`} />
                  </div>
                  <span className="font-semibold text-lg text-foreground">{cat.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Newsletter (New Separate Sections but Matching) */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6 text-foreground">Stay Informed</h2>
            <p className="text-muted-foreground mb-8 text-lg">Subscribe for latest tutor updates and platform news.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input className="flex-1 px-5 py-3 rounded-xl border border-border bg-card outline-none" placeholder="Enter your email" />
                <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold">Subscribe</button>
            </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background px-4">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-4">
                {[
                  { q: "How can I book a tutor?", a: "Search tutors, view availability, and book a session directly from the tutor profile." },
                  { q: "Can I access in dark mode?", a: "Yes, dark mode is supported across the site. Use the theme toggle in the header." },
                  { q: "Do you offer a demo login?", a: "Yes — use the demo admin and tutor credentials shown on the login page." },
                ].map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-border">
                    <AccordionTrigger className="text-left font-semibold">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Ready to Start Your <br /> Learning Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students already learning with SkillBridge
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl transition">
                Get Started Free
              </button>
            </Link>
            <Link href="/tutors">
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition">
                Browse Tutors
              </button>
            </Link>
          </div>
        </div>
      </section>

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
