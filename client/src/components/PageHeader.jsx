export default function PageHeader({ eyebrow, title, lede }) {
  return (
    <div className="border-b border-ink-line bg-reveal-glow">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        {eyebrow && (
          <p className="text-sm text-veil-bright">{eyebrow}</p>
        )}
        <h1 className="mt-2 font-display text-4xl text-parchment">{title}</h1>
        {lede && (
          <p className="mt-4 max-w-xl text-lg text-parchment-dim">{lede}</p>
        )}
      </div>
    </div>
  );
}