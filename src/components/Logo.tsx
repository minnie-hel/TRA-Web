export function Logo() {
  return (
    <span className="flex items-center gap-3">
      <svg viewBox="0 0 40 40" className="h-10 w-10 shrink-0" aria-hidden="true">
        <rect width="40" height="40" fill="#0A1C30" />
        <path d="M7 29h26" stroke="#D5AD55" strokeWidth="1.4" />
        <path d="M8 26.5c5.5-9 9-9 15.5 0" fill="none" stroke="#228B58" strokeWidth="1.7" />
        <path d="M15 24.5 22.5 11.5l1.8 3.4" fill="none" stroke="#D5AD55" strokeWidth="1.7" />
        <circle cx="22.5" cy="11.5" r="1.35" fill="#D5AD55" />
      </svg>
      <span className="leading-none">
        <span className="block font-display text-[1.35rem] tracking-wide text-white">Envision</span>
        <span className="mt-1 block text-[10px] font-medium tracking-[0.22em] text-gold uppercase">
          Strategies
        </span>
      </span>
    </span>
  );
}
