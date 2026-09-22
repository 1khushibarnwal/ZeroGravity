export default function WhoWeAre() {
  return (
    <section className="border-t border-ink-line">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="font-display text-3xl text-parchment">Who we are</h2>
        <p className="mt-6 text-parchment-dim">
          VeilSwap is built by{" "}
          <span className="text-parchment">Khushi Barnwal</span> and{" "}
          <span className="text-parchment">Nayab Khan</span> — the authors
          credited directly in the <code className="hash">CommitRegistry</code>{" "}
          contract this app talks to. It started as a minimal answer to a
          simple question: what does the smallest possible commit-reveal
          registry look like, and how far can it go?
        </p>
      </div>
    </section>
  );
}