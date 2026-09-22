const POINTS = [
  {
    title: "Self-custodial by default",
    body: "In self-custody mode, the salt and nonce behind your commitment never leave your browser. We can't reveal your trade for you, and we can't see it before you do either.",
  },
  {
    title: "The delay is on-chain, not a promise",
    body: "MIN_DELAY is a constant in the contract itself, not a setting we control server-side. Anyone can verify it directly against CommitRegistry.",
  },
  {
    title: "Pick your trust model",
    body: "Run it fully self-custodied, hand it to our relayer to submit and reveal for you, or just describe the transfer in plain language and let the agent build the commitment.",
  },
];

export default function WhyUs() {
  return (
    <section className="border-t border-ink-line">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="font-display text-3xl text-parchment">Why us</h2>
        <p className="mt-3 max-w-xl text-parchment-dim">
          Reasons that come from how the contract is built, not a features
          list.
        </p>

        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-ink-line bg-ink-line sm:grid-cols-3">
          {POINTS.map((p) => (
            <div key={p.title} className="bg-ink px-6 py-6">
              <h3 className="font-display text-lg text-parchment">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-parchment-dim">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}