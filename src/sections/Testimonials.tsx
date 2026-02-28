import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "They turned our brief into a site we're proud to share. The attention to detail and understanding of our brand was exceptional.",
    name: 'Alex R.',
    role: 'Owner, Lumière Dining',
    avatar: 'AR',
  },
  {
    quote: "Fast, clear, and the CMS is actually simple. Our team can update content without any technical knowledge.",
    name: 'Priya M.',
    role: 'Marketing Lead, Maison Noir',
    avatar: 'PM',
  },
  {
    quote: "Our bookings doubled after the redesign. The new site loads faster and converts visitors better than ever.",
    name: 'Sam T.',
    role: 'Manager, Northside Gym',
    avatar: 'ST',
  },
];

const Testimonials = () => {
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
        { y: -20, opacity: 0 },
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
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark"
    >
      {/* Warm Spotlight */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[70vw] h-[40vh] spotlight pointer-events-none opacity-50" />

      <div className="relative z-10 section-padding">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-20">
          <p className="label-mono mb-4 text-violet-accent">Testimonials</p>
          <h2 className="heading-lg mb-4">What Clients Say</h2>
          <p className="body-text max-w-md mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="glass-card p-6 lg:p-8 group hover:border-violet-accent/30 transition-all duration-500"
            >
              {/* Quote Icon */}
              <div className="w-10 h-10 rounded-full bg-violet-accent/20 flex items-center justify-center mb-6">
                <Quote size={18} className="text-violet-accent" />
              </div>

              {/* Quote Text */}
              <p className="text-white/90 leading-relaxed mb-8 text-sm lg:text-base">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-accent/40 to-violet-accent/20 
                              flex items-center justify-center border border-violet-accent/30">
                  <span className="text-sm font-semibold text-white">
                    {testimonial.avatar}
                  </span>
                </div>

                {/* Info */}
                <div>
                  <p className="font-medium text-white">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
