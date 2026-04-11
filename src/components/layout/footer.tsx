import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-card dark:bg-slate-950 border-t border-border py-16">
      <div className="container px-4 md:px-6 mx-auto grid md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link href="/" className="font-bold text-2xl flex items-center gap-2">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SkillBridge</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Empowering learners and educators worldwide through seamless
            connection and personalized guidance. Our platform bridges the gap between knowledge and curiosity.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-foreground mb-6">Platform</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li>
              <Link href="/tutors" className="hover:text-primary transition-colors">
                Find Tutors
              </Link>
            </li>
            <li>
              <Link href="/register?role=tutor" className="hover:text-primary transition-colors">
                Become a Tutor
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-primary transition-colors">
                Log In
              </Link>
            </li>
            <li>
                <Link href="/dashboard" className="hover:text-primary transition-colors">
                    Dashboard
                </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-foreground mb-6">Categories</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li>
              <Link
                href="/tutors?category=Programming"
                className="hover:text-primary transition-colors"
              >
                Programming
              </Link>
            </li>
            <li>
              <Link
                href="/tutors?category=Languages"
                className="hover:text-primary transition-colors"
              >
                Languages
              </Link>
            </li>
            <li>
              <Link
                href="/tutors?category=Music"
                className="hover:text-primary transition-colors"
              >
                Music
              </Link>
            </li>
            <li>
              <Link
                href="/tutors?category=Academics"
                className="hover:text-primary transition-colors"
              >
                Academics
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-foreground mb-6">Support</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container px-4 md:px-6 mx-auto mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} SkillBridge. All rights reserved.</p>
      </div>
    </footer>
  );
}
