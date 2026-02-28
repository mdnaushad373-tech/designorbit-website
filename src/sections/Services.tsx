import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Code2, Settings, TrendingUp, Zap, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Palette,
    title: 'Web Design',
    description: 'Strategic design that drives engagement and converts visitors into customers. Built for performance from day one.',
    benefits: [
      { icon: TrendingUp, text: 'Higher conversion rates' },
      { icon: Zap, text: 'Lightning-fast load times' },
      { icon: Shield, text: 'Mobile-first responsive' },
    ],
    image: '/service-design.jpg',
  },
  {
    icon: Code2,
    title: 'Development',
    description: 'Clean, scalable code that performs. SEO-optimized architecture to help your business rank and grow.',
    benefits: [
      { icon: TrendingUp, text: 'SEO-ready structure' },
      { icon: Zap, text: '99.9% uptime guarantee' },
      { icon: Shield, text: 'Enterprise security' },
    ],
    image: '/service-dev.jpg',
  },
  {
    icon: Settings,
    title: 'CMS & Support',
    description: 'Full control over your content. Easy updates, real-time analytics, and dedicated support when you need it.',
    benefits: [
      { icon: TrendingUp, text: 'Real-time analytics' },
      { icon: Zap, text: 'One-click updates' },
      { icon: Shield, text: '24/7 support access' },
    ],
    image: '/service-cms.jpg',
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { y: 100, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Image parallax
        const img = card.querySelector('img');
        if (img) {
          gsap.fromTo(
            img,
            { y: '-8%' },
            {
              y: '8%',
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark"
    >
      {/* Violet Glow Background */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[80vw] h-[50vh] violet-glow-bg pointer-events-none opacity-50" />

      <div className="relative z-10 section-padding">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-20">
          <p className="label-mono mb-4 text-violet-accent">What We Do</p>
          <h2 className="heading-lg mb-4">Services</h2>
          <p className="body-text max-w-md mx-auto">
            End-to-end solutions designed to grow your business. From first impression to lasting conversion.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group glass-card overflow-hidden hover:border-violet-accent/30 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-[120%] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent" />
                
                {/* Icon */}
                <div className="absolute bottom-4 left-6 w-12 h-12 rounded-xl bg-violet-accent/20 flex items-center justify-center
                              group-hover:bg-violet-accent/30 transition-colors duration-300">
                  <service.icon size={24} className="text-violet-accent" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Benefits */}
                <div className="space-y-3">
                  {service.benefits.map((benefit) => (
                    <div key={benefit.text} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-violet-accent/20 flex items-center justify-center flex-shrink-0">
                        <benefit.icon size={12} className="text-violet-accent" />
                      </div>
                      <span className="text-sm text-white/80">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(168,85,247,0.1)]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
