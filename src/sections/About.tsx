import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 120, suffix: '+', label: 'Projects shipped' },
  { value: 6, suffix: ' yrs', label: 'In business' },
  { value: 48, suffix: 'h', label: 'Typical first draft' },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const statsCardRef = useRef<HTMLDivElement>(null);
  const paragraphCardRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Background parallax
      const bgImage = section.querySelector('.bg-image');
      if (bgImage) {
        gsap.fromTo(
          bgImage,
          { y: 0 },
          {
            y: '-8%',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          }
        );
      }

      // Headline
      gsap.fromTo(
        headlineRef.current,
        { y: -40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats card
      gsap.fromTo(
        statsCardRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsCardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            onEnter: () => {
              // Animate counters
              stats.forEach((stat, index) => {
                gsap.to(
                  { val: 0 },
                  {
                    val: stat.value,
                    duration: 1.5,
                    ease: 'power2.out',
                    delay: index * 0.15,
                    onUpdate: function () {
                      setCounters((prev) => {
                        const newCounters = [...prev];
                        newCounters[index] = Math.round(this.targets()[0].val);
                        return newCounters;
                      });
                    },
                  }
                );
              });
            },
          },
        }
      );

      // Paragraph card
      gsap.fromTo(
        paragraphCardRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: paragraphCardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="studio"
      ref={sectionRef}
      className="relative min-h-screen py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/workspace-scene.jpg"
          alt="Studio workspace"
          className="bg-image w-full h-[120%] object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/80 to-dark" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="heading-lg text-center max-w-3xl mx-auto mb-20 lg:mb-32"
        >
          We're a small team with{' '}
          <span className="text-violet-accent">big craft</span>.
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Stats Card */}
          <div
            ref={statsCardRef}
            className="glass-card p-8 lg:p-10"
          >
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl lg:text-4xl font-display font-bold text-white mb-2">
                    {counters[index]}
                    <span className="text-violet-accent">{stat.suffix}</span>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Paragraph Card */}
          <div
            ref={paragraphCardRef}
            className="glass-card p-8 lg:p-10"
          >
            <p className="body-text mb-6">
              Strategy-first design, clean code, and a CMS you can actually use. 
              We build sites that load fast, rank well, and stay easy to update.
            </p>
            <p className="body-text mb-8">
              From restaurants to boutiques, we partner with businesses that value 
              quality and want a digital presence that truly represents their brand.
            </p>
            <button className="inline-flex items-center gap-2 text-violet-accent hover:text-white transition-colors group">
              <span className="text-sm font-medium">More about us</span>
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
