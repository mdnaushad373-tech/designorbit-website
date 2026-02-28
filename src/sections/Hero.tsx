import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ExternalLink, BarChart3, ShoppingCart, TrendingUp, Lock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const connectorRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Headline animation
      tl.fromTo(
        headlineRef.current?.querySelectorAll('.headline-word') || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.8 },
        0.2
      );

      // Subheadline
      tl.fromTo(
        subheadlineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.5
      );

      // CTAs
      tl.fromTo(
        ctaRef.current?.children || [],
        { y: 15, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.6 },
        0.7
      );

      // Dashboard group
      tl.fromTo(
        dashboardRef.current,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 },
        0.5
      );

      // Top panel
      tl.fromTo(
        topPanelRef.current,
        { x: 60, y: -20, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 0.8 },
        0.7
      );

      // Bottom panel
      tl.fromTo(
        bottomPanelRef.current,
        { x: 40, y: 20, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 0.8 },
        0.9
      );

      // Connector lines
      tl.fromTo(
        connectorRef.current?.querySelectorAll('line') || [],
        { strokeDashoffset: 200 },
        { strokeDashoffset: 0, duration: 0.8, stagger: 0.1 },
        1
      );

      // Scroll-driven exit animation (pinned)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current], {
              opacity: 1,
              y: 0,
            });
            gsap.set(dashboardRef.current, { opacity: 1, x: 0 });
            gsap.set(topPanelRef.current, { opacity: 1, x: 0, y: 0 });
            gsap.set(bottomPanelRef.current, { opacity: 1, x: 0, y: 0 });
          },
        },
      });

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        subheadlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(
        dashboardRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        topPanelRef.current,
        { x: 0, opacity: 1 },
        { x: '15vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        bottomPanelRef.current,
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(
        connectorRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-dark"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 spotlight" />
      <div className="absolute left-1/2 top-[18%] -translate-x-1/2 w-[70vw] h-[40vh] violet-glow-bg pointer-events-none" />

      {/* Ambient Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-drift"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
              opacity: 0.2 + Math.random() * 0.3,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center section-padding pt-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Side - Text Content */}
          <div className="max-w-2xl">
            {/* Micro Label */}
            <p className="label-mono mb-6 opacity-70">DesignOrbit Studio</p>

            {/* Headline */}
            <div ref={headlineRef} className="mb-8">
              <h1 className="heading-xl uppercase font-bold">
                <span className="headline-word inline-block">Built</span>{' '}
                <span className="headline-word inline-block">to</span>{' '}
                <span className="headline-word inline-block text-violet-accent">Impress</span>
              </h1>
              <h1 className="heading-xl uppercase mt-1 font-bold">
                <span className="headline-word inline-block">Designed</span>{' '}
                <span className="headline-word inline-block">to</span>{' '}
                <span className="headline-word inline-block text-golden">Convert</span>
              </h1>
            </div>

            {/* Subheadline - Updated copy with more spacing */}
            <p
              ref={subheadlineRef}
              className="text-lg lg:text-xl text-white/80 max-w-xl mb-10 leading-relaxed"
            >
              We engineer high-performance websites with full admin control — built to scale restaurants, boutiques, and modern brands.
            </p>

            {/* CTAs - Enhanced primary button */}
            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('#contact')}
                className="px-8 py-4 bg-gradient-to-r from-violet-accent to-violet-600 text-white font-semibold rounded-xl
                         transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-[1.02]
                         active:scale-[0.98] flex items-center gap-2 group"
              >
                Start Your Project
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
              <button
                onClick={() => scrollToSection('#work')}
                className="px-6 py-4 bg-white/5 text-white font-medium rounded-xl border border-white/10
                         transition-all duration-300 hover:bg-white/10 hover:border-white/20
                         active:scale-[0.98] flex items-center gap-2 group"
              >
                View Work
                <ExternalLink
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </div>
          </div>

          {/* Right Side - Glass Dashboard Mockup */}
          <div className="relative hidden lg:block h-[600px]">
            {/* Connector SVG */}
            <svg
              ref={connectorRef}
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              style={{ overflow: 'visible' }}
            >
              <line
                x1="25%"
                y1="20%"
                x2="45%"
                y2="30%"
                stroke="rgba(168,85,247,0.55)"
                strokeWidth="1"
                strokeDasharray="200"
                strokeDashoffset="0"
                className="animate-pulse-glow"
              />
              <line
                x1="30%"
                y1="75%"
                x2="45%"
                y2="60%"
                stroke="rgba(168,85,247,0.55)"
                strokeWidth="1"
                strokeDasharray="200"
                strokeDashoffset="0"
                className="animate-pulse-glow animation-delay-300"
              />
            </svg>

            {/* Top Floating Panel - Analytics */}
            <div
              ref={topPanelRef}
              className="absolute right-[34vw] top-[14%] w-[18vw] max-w-[240px] glass-card-strong p-4 animate-float"
            >
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 size={16} className="text-violet-accent" />
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Analytics
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Visitors</span>
                  <span className="text-sm font-semibold text-white">12.4K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Conversion</span>
                  <span className="text-sm font-semibold text-golden">+24%</span>
                </div>
              </div>
              {/* Mini chart */}
              <div className="mt-3 flex items-end gap-1 h-8">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-violet-accent/40 rounded-t"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Main Dashboard Card */}
            <div
              ref={dashboardRef}
              className="absolute right-[6vw] top-[18%] w-[34vw] max-w-[460px] h-auto glass-card p-5"
            >
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  Admin Dashboard
                </span>
              </div>

              {/* Sidebar + Content */}
              <div className="flex gap-4">
                {/* Mini Sidebar */}
                <div className="w-12 space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-violet-accent/20 flex items-center justify-center">
                    <BarChart3 size={18} className="text-violet-accent" />
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <ShoppingCart size={18} className="text-muted-foreground" />
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <TrendingUp size={18} className="text-muted-foreground" />
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="flex-1 grid grid-cols-3 gap-3">
                  {/* Orders Card */}
                  <div className="bg-white/[0.04] rounded-xl p-3">
                    <ShoppingCart size={16} className="text-violet-accent mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">Orders</p>
                    <p className="text-lg font-semibold text-white">1,284</p>
                  </div>
                  {/* Revenue Card */}
                  <div className="bg-white/[0.04] rounded-xl p-3">
                    <TrendingUp size={16} className="text-golden mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">Revenue</p>
                    <p className="text-lg font-semibold text-white">$48.2K</p>
                  </div>
                  {/* Conversion Card */}
                  <div className="bg-white/[0.04] rounded-xl p-3">
                    <BarChart3 size={16} className="text-green-400 mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">Conversion</p>
                    <p className="text-lg font-semibold text-white">3.2%</p>
                  </div>
                </div>
              </div>

              {/* Chart Area */}
              <div className="mt-4 bg-white/[0.03] rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-muted-foreground">Weekly Performance</span>
                  <span className="text-xs text-golden">+18%</span>
                </div>
                <div className="flex items-end gap-2 h-16">
                  {[35, 55, 40, 70, 50, 85, 65, 90, 75, 95, 80, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-violet-accent/60 to-violet-accent/20 rounded-t"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Floating Panel - CMS */}
            <div
              ref={bottomPanelRef}
              className="absolute right-[30vw] top-[62%] w-[20vw] max-w-[260px] glass-card-strong p-4 animate-float animation-delay-500"
            >
              <div className="flex items-center gap-2 mb-3">
                <Lock size={16} className="text-golden" />
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  CMS Access
                </span>
              </div>
              <div className="bg-dark/50 rounded-lg p-3 font-mono text-xs">
                <div className="flex gap-2 mb-2">
                  <span className="text-violet-accent">const</span>
                  <span className="text-white">cms</span>
                  <span className="text-muted-foreground">=</span>
                </div>
                <div className="pl-4 text-muted-foreground">
                  <div>admin: true,</div>
                  <div>editor: true,</div>
                  <div>analytics: true</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
