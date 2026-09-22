export default function FAQAccordion({ items }) {
  return (
    <div className="divide-y divide-ink-line border-t border-ink-line">
      {items.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-parchment marker:content-none">
            {item.question}
            <span className="shrink-0 text-parchment-faint transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 max-w-2xl text-sm text-parchment-dim">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}