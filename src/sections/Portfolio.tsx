import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Smartphone, LayoutDashboard, Settings } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: 'Lumière Dining',
    category: 'Restaurant',
    tags: ['Web Design', 'Development', 'CMS'],
    image: '/project-lumiere.jpg',
    performanceLabels: [
      { icon: Settings, text: 'CMS Enabled' },
      { icon: Smartphone, text: 'Mobile Optimized' },
    ],
  },
  {
    name: 'Maison Noir',
    category: 'Boutique',
    tags: ['Web Design', 'Development', 'CMS'],
    image: '/project-maison.jpg',
    performanceLabels: [
      { icon: LayoutDashboard, text: 'Admin Dashboard' },
      { icon: Smartphone, text: 'Mobile Optimized' },
    ],
  },
  {
    name: 'Northside Gym',
    category: 'Fitness',
    tags: ['Web Design', 'Development', 'CMS'],
    image: '/project-northside.jpg',
    performanceLabels: [
      { icon: Settings, text: 'CMS Enabled' },
      { icon: LayoutDashboard, text: 'Admin Dashboard' },
    ],
  },
  {
    name: 'Cedar & Sage',
    category: 'Wellness',
    tags: ['Web Design', 'Development', 'CMS'],
    image: '/project-cedar.jpg',
    performanceLabels: [
      { icon: Smartphone, text: 'Mobile Optimized' },
      { icon: Settings, text: 'CMS Enabled' },
    ],
  },
];

const Portfolio = () => {
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
        { x: -60, opacity: 0 },
        {
          x: 0,
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

      // Cards animation with stagger
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            y: index % 2 === 0 ? 80 : 120,
            opacity: 0,
            scale: 0.98,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Parallax on image
        const img = card.querySelector('img');
        if (img) {
          gsap.fromTo(
            img,
            { y: '-5%' },
            {
              y: '5%',
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
      id="work"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark"
    >
      <div className="section-padding">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <p className="label-mono mb-4 text-violet-accent">Portfolio</p>
          <h2 className="heading-lg mb-4">Selected Work</h2>
          <p className="body-text max-w-md">
            A few launches we're proud of. Each project is crafted with attention to detail and built for performance.
          </p>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Column A */}
          <div className="space-y-6 lg:space-y-8">
            {projects.slice(0, 2).map((project, index) => (
              <div
                key={project.name}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                        {project.category}
                      </p>
                      <h3 className="text-xl lg:text-2xl font-display font-semibold text-white mb-3">
                        {project.name}
                      </h3>
                      
                      {/* Performance Labels */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.performanceLabels.map((label) => (
                          <span
                            key={label.text}
                            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-white/10 rounded-full text-white/80"
                          >
                            <label.icon size={10} />
                            {label.text}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-white/5 rounded-full text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* External Link Icon */}
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center 
                                  group-hover:bg-violet-accent transition-all duration-300
                                  group-hover:rotate-12">
                      <ExternalLink size={18} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(168,85,247,0.15)]" />
                </div>
              </div>
            ))}
          </div>

          {/* Column B - Offset */}
          <div className="space-y-6 lg:space-y-8 lg:mt-24">
            {projects.slice(2, 4).map((project, index) => (
              <div
                key={project.name}
                ref={(el) => { cardsRef.current[index + 2] = el; }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                        {project.category}
                      </p>
                      <h3 className="text-xl lg:text-2xl font-display font-semibold text-white mb-3">
                        {project.name}
                      </h3>
                      
                      {/* Performance Labels */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.performanceLabels.map((label) => (
                          <span
                            key={label.text}
                            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-white/10 rounded-full text-white/80"
                          >
                            <label.icon size={10} />
                            {label.text}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-white/5 rounded-full text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* External Link Icon */}
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center 
                                  group-hover:bg-violet-accent transition-all duration-300
                                  group-hover:rotate-12">
                      <ExternalLink size={18} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(168,85,247,0.15)]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
