export const Logo = () => {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: "var(--primary)" }}
      >
        <span
          className="font-display text-sm font-bold leading-none"
          style={{ color: "white", letterSpacing: "-0.01em" }}
        >
          MB
        </span>
      </div>
      <div className="flex flex-col leading-none gap-0.5">
        <span
          className="font-display text-base font-bold tracking-tight"
          style={{ color: "var(--foreground)" }}
        >
          Marilyn
        </span>
        <span
          className="text-[10px] uppercase font-medium"
          style={{ color: "var(--primary)", letterSpacing: "0.18em" }}
        >
          Boutique
        </span>
      </div>
    </div>
  );
};
