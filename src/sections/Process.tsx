import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, PenTool, Code, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discover',
    description: 'Goals, audience, content. We dive deep to understand your business and objectives.',
    deliverables: ['Sitemap', 'Content plan'],
  },
  {
    number: '02',
    icon: PenTool,
    title: 'Design',
    description: 'Wireframes + high-fidelity UI. Every pixel crafted for impact and usability.',
    deliverables: ['Figma files', 'Prototype'],
  },
  {
    number: '03',
    icon: Code,
    title: 'Build',
    description: 'Clean code + CMS setup. Performance-optimized and ready to scale.',
    deliverables: ['Staging site', 'CMS config'],
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch',
    description: 'Testing, training, handoff. We ensure everything works perfectly.',
    deliverables: ['Live site', 'Documentation'],
  },
];

const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Rail line draw
      const railLine = railRef.current?.querySelector('.rail-line');
      if (railLine) {
        gsap.fromTo(
          railLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: 'power2.out',
            transformOrigin: 'top',
            scrollTrigger: {
              trigger: railRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Steps animation
      stepsRef.current.forEach((step, index) => {
        if (!step) return;

        gsap.fromTo(
          step,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Circle pop
        const circle = step.querySelector('.step-circle');
        if (circle) {
          gsap.fromTo(
            circle,
            { scale: 0.6, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              delay: index * 0.15 + 0.3,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: step,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
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
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark"
    >
      <div className="section-padding">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-20">
          <p className="label-mono mb-4 text-violet-accent">How We Work</p>
          <h2 className="heading-lg mb-4">Our Process</h2>
          <p className="body-text max-w-md mx-auto">
            A proven approach that delivers results. From discovery to launch, we've got you covered.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Rail */}
          <div ref={railRef} className="absolute left-0 lg:left-8 top-0 bottom-0 w-px hidden md:block">
            <div className="rail-line absolute inset-0 bg-gradient-to-b from-violet-accent/50 via-violet-accent/30 to-transparent" />
          </div>

          {/* Steps */}
          <div className="space-y-8 lg:space-y-12">
            {steps.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => { stepsRef.current[index] = el; }}
                className="relative md:pl-20 lg:pl-24"
              >
                {/* Step Circle */}
                <div className="step-circle absolute left-0 lg:left-4 top-0 w-10 h-10 lg:w-12 lg:h-12 
                              rounded-full bg-violet-accent/20 border border-violet-accent/40
                              flex items-center justify-center hidden md:flex">
                  <span className="text-xs lg:text-sm font-mono font-semibold text-violet-accent">
                    {step.number}
                  </span>
                </div>

                {/* Content Card */}
                <div className="glass-card p-6 lg:p-8 group hover:border-violet-accent/30 transition-all duration-500">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                    {/* Left - Title & Icon */}
                    <div className="flex items-center gap-4 lg:w-1/3">
                      <div className="w-10 h-10 rounded-xl bg-violet-accent/20 flex items-center justify-center
                                    group-hover:bg-violet-accent/30 transition-colors duration-300">
                        <step.icon size={20} className="text-violet-accent" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-muted-foreground md:hidden">
                          Step {step.number}
                        </span>
                        <h3 className="text-lg lg:text-xl font-display font-semibold text-white">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    {/* Middle - Description */}
                    <div className="lg:w-1/3">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Right - Deliverables */}
                    <div className="lg:w-1/3">
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                        Deliverables
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {step.deliverables.map((item) => (
                          <span
                            key={item}
                            className="text-xs px-3 py-1.5 bg-white/5 rounded-full text-white/80
                                     border border-white/10"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
