import { Link } from "react-router-dom";
import CommitRevealDiagram from "../CommitRevealDiagram";

export default function Hero() {
  return (
    <section className="bg-reveal-glow">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
        <h1 className="font-display text-4xl leading-tight text-parchment sm:text-5xl">
          Seal a transfer before anyone can see it.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-parchment-dim">
          VeilSwap locks your transfer intent on-chain as a hash. The
          recipient and the amount stay hidden until you reveal them
          yourself — by which point there's nothing left to front-run.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/app" className="btn-primary">
            Launch app
          </Link>
          <Link to="/how-it-works" className="btn-secondary">
            See how it works
          </Link>
        </div>
        <CommitRevealDiagram />
      </div>
    </section>
  );
}