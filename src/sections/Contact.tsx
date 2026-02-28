import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MessageCircle, Send, ArrowUp } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Card animation
      gsap.fromTo(
        cardRef.current,
        { y: 80, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', message: '' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark"
    >
      <div className="section-padding">
        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-12 lg:mb-16">
          <p className="label-mono mb-4 text-violet-accent">Get In Touch</p>
          <h2 className="heading-lg mb-4">Ready when you are.</h2>
          <p className="body-text max-w-md mx-auto">
            Tell us what you're building. We'll reply within 24 hours.
          </p>
        </div>

        {/* Contact Card */}
        <div
          ref={cardRef}
          className="max-w-2xl mx-auto glass-card p-8 lg:p-10"
        >
          {/* Contact Methods */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <a
              href="mailto:hello@designorbit.studio"
              className="flex items-center gap-3 p-4 bg-white/[0.04] rounded-xl hover:bg-white/[0.08] transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-violet-accent/20 flex items-center justify-center">
                <Mail size={18} className="text-violet-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                <p className="text-sm text-white group-hover:text-violet-accent transition-colors">
                  hello@designorbit.studio
                </p>
              </div>
            </a>

            <a
              href="tel:+15550132480"
              className="flex items-center gap-3 p-4 bg-white/[0.04] rounded-xl hover:bg-white/[0.08] transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-violet-accent/20 flex items-center justify-center">
                <Phone size={18} className="text-violet-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Call</p>
                <p className="text-sm text-white group-hover:text-violet-accent transition-colors">
                  +1 (555) 013-2480
                </p>
              </div>
            </a>

            <a
              href="https://wa.me/15550132480"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-white/[0.04] rounded-xl hover:bg-white/[0.08] transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <MessageCircle size={18} className="text-green-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">WhatsApp</p>
                <p className="text-sm text-white group-hover:text-green-400 transition-colors">
                  Chat Now
                </p>
              </div>
            </a>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white 
                           placeholder:text-muted-foreground/50 focus:outline-none focus:border-violet-accent/50 
                           transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white 
                           placeholder:text-muted-foreground/50 focus:outline-none focus:border-violet-accent/50 
                           transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your project..."
                rows={4}
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white 
                         placeholder:text-muted-foreground/50 focus:outline-none focus:border-violet-accent/50 
                         transition-colors resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary flex items-center justify-center gap-2 group"
            >
              Send Message
              <Send
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </form>
        </div>

        {/* Back to Top */}
        <div className="flex justify-center mt-16">
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center
                     hover:bg-violet-accent/20 hover:border-violet-accent/40 transition-all duration-300
                     group"
          >
            <ArrowUp
              size={20}
              className="text-muted-foreground group-hover:text-violet-accent transition-colors"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
