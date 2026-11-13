export function PageHero({ kicker, title, lede }: { kicker: string; title: string; lede: string }) {
  return (
    <section className="border-b border-white/10 bg-navy text-white">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-12">
        <p className="motion-in motion-in--delay-1 text-sm font-medium text-white/70">{kicker}</p>
        <h1 className="motion-in motion-in--delay-2 mt-2 max-w-3xl font-display text-3xl leading-tight text-balance md:text-4xl">{title}</h1>
        <p className="motion-in motion-in--delay-3 mt-3 max-w-2xl leading-relaxed text-white/75">{lede}</p>
      </div>
    </section>
  );
}
