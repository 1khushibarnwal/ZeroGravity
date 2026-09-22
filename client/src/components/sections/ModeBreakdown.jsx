const MODES = [
  {
    title: "Self-custody",
    steps: [
      "Your wallet generates a random nonce and salt, and hashes them with the recipient and amount.",
      "Your wallet calls commit() directly — you pay the gas, and the hash is all that's on-chain.",
      "After the delay, your wallet calls reveal() with the original details to execute the transfer.",
    ],
  },
  {
    title: "Managed",
    steps: [
      "You send the recipient and amount to the relayer.",
      "The relayer's wallet builds the hash, calls commit(), and pays the gas.",
      "The relayer reveals on a timer once the delay has passed — you don't sign anything further.",
    ],
  },
  {
    title: "Agent",
    steps: [
      "You describe the transfer in plain language.",
      "An LLM parses it into a recipient and amount, then hands off to the same relayer flow as managed mode.",
      "You can look up the stored reveal data for transparency, even though only the relayer can execute it.",
    ],
  },
];

export default function ModeBreakdown() {
  return (
    <section className="border-t border-ink-line">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="font-display text-3xl text-parchment">
          Three ways to run it
        </h2>
        <p className="mt-3 max-w-xl text-parchment-dim">
          Same contract, same two-step cycle underneath — the difference is
          who holds the preimage and who signs.
        </p>

        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {MODES.map((mode) => (
            <div key={mode.title}>
              <h3 className="font-display text-xl text-parchment">
                {mode.title}
              </h3>
              <ol className="mt-4 space-y-3">
                {mode.steps.map((step, i) => (
                  <li key={step} className="flex gap-3 text-sm text-parchment-dim">
                    <span className="font-mono text-brass">{i + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}