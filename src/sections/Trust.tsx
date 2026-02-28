const Trust = () => {
  // Simple monochrome brand logos using text/initials
  const brands = [
    { name: 'Lumière', initial: 'L' },
    { name: 'Maison', initial: 'M' },
    { name: 'Northside', initial: 'N' },
    { name: 'Cedar', initial: 'C' },
  ];

  return (
    <section className="relative py-16 lg:py-20 bg-dark border-y border-white/5">
      <div className="section-padding">
        {/* Headline */}
        <p className="text-center text-sm font-mono text-muted-foreground uppercase tracking-[0.15em] mb-10">
          Trusted by Growing Brands
        </p>

        {/* Brand Logos */}
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center gap-3 opacity-50 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-lg font-display font-bold text-white/70">
                  {brand.initial}
                </span>
              </div>
              <span className="text-lg font-display font-medium text-white/70">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;
