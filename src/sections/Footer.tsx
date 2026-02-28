import { ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Studio', href: '#studio' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-12 lg:py-16 bg-dark border-t border-white/5">
      <div className="section-padding">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Logo & Tagline */}
          <div className="text-center lg:text-left">
            <h3 className="font-display font-bold text-xl lg:text-2xl text-white mb-2">
              DesignOrbit
            </h3>
            <p className="text-sm text-muted-foreground">
              Built to Impress. Designed to Convert.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6 lg:gap-8">
            {footerLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="text-sm text-muted-foreground hover:text-white transition-colors 
                         flex items-center gap-1 group"
              >
                {link.label}
                <ArrowUpRight
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </button>
            ))}
          </nav>

          {/* Copyright */}
          <div className="text-center lg:text-right">
            <p className="text-xs text-muted-foreground">
              © {currentYear} DesignOrbit Studio.
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
