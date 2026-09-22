import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import Hero from "../components/sections/Hero";
import HowItWorks from "../components/sections/HowItWorks";

const EXPLORE = [
  {
    to: "/how-it-works",
    title: "See the full process",
    body: "All three ways to run a commit-reveal transfer, step by step.",
  },
  {
    to: "/about",
    title: "Why it's built this way",
    body: "The reasoning behind self-custody by default and an on-chain delay.",
  },
  {
    to: "/faq",
    title: "Read the FAQ",
    body: "Including the rough edges — what doesn't work yet, and why.",
  },
];

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <HowItWorks compact />

      <section className="border-t border-ink-line">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="grid gap-px overflow-hidden rounded-sm border border-ink-line bg-ink-line sm:grid-cols-3">
            {EXPLORE.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="bg-ink px-6 py-6 transition-colors hover:bg-ink-soft"
              >
                <h3 className="font-display text-lg text-parchment">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-parchment-dim">{item.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}