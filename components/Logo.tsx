export const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-0">
      {/* MB Letters - Elegant serif style */}
      <div className="font-display text-5xl font-bold text-primary leading-none">
        <div className="relative">
          MB
          {/* Decorative line under letters */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/30"></div>
        </div>
      </div>
      {/* Boutique text */}
      <div className="text-xs tracking-widest font-display mt-2 text-primary uppercase">
        Marilyn Boutique
      </div>
    </div>
  );
};
