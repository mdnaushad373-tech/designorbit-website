import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FinalCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark"
    >
      {/* Violet Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] violet-glow-bg pointer-events-none opacity-40" />

      <div className="relative z-10 section-padding">
        <div
          ref={contentRef}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="heading-lg mb-6">
            Ready to Elevate Your{' '}
            <span className="text-violet-accent">Digital Presence</span>?
          </h2>
          
          <p className="body-text max-w-lg mx-auto mb-10">
            Let's build something that works as hard as you do. Your next high-performing website starts here.
          </p>

          <button
            onClick={scrollToContact}
            className="px-10 py-5 bg-gradient-to-r from-violet-accent to-violet-600 text-white font-semibold text-lg rounded-xl
                     transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:scale-[1.03]
                     active:scale-[0.98] flex items-center gap-3 group mx-auto"
          >
            Start Your Project
            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
