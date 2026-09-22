const STEPS = [
  {
    n: "01",
    title: "Seal it",
    body: "Your wallet hashes the recipient, amount, and a random salt, then submits only that hash on-chain. Nobody watching the mempool can see what you're sending or to whom.",
  },
  {
    n: "02",
    title: "Wait out the delay",
    body: "The CommitRegistry contract enforces a minimum delay before your commitment can be revealed — long enough that anyone trying to front-run it has nothing to act on.",
  },
  {
    n: "03",
    title: "Reveal it",
    body: "Once the delay has passed, you reveal the original details. The contract recomputes the hash, checks it matches, and executes the transfer in the same transaction.",
  },
];

// compact=true renders a lighter teaser (used on the homepage);
// compact=false renders the full section (used on the How It Works page).
export default function HowItWorks({ compact = false }) {
  return (
    <section className={compact ? "" : "border-t border-ink-line"}>
      <div className={`mx-auto max-w-5xl px-6 ${compact ? "py-12" : "py-20"}`}>
        {!compact && (
          <>
            <h2 className="font-display text-3xl text-parchment">
              The core cycle
            </h2>
            <p className="mt-3 max-w-xl text-parchment-dim">
              Three steps, enforced by a small, unaudited contract you can
              read yourself — not a promise from us.
            </p>
          </>
        )}

        <ol className={`grid gap-10 sm:grid-cols-3 ${compact ? "" : "mt-12"}`}>
          {STEPS.map((step) => (
            <li key={step.n} className="border-t border-ink-line pt-5">
              <span className="font-mono text-sm text-brass">{step.n}</span>
              <h3 className="mt-2 font-display text-xl text-parchment">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-parchment-dim">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}