import { Link } from "react-router-dom";

const LINKS = [
  { to: "/how-it-works", label: "How it works" },
  { to: "/faq", label: "FAQ" },
  { to: "/about", label: "About" },
  { to: "/app", label: "Launch app" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg text-parchment">VeilSwap</p>
          <p className="mt-1 text-sm text-parchment-faint">
            A commit-reveal registry for transfers that stay private until
            you reveal them.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-parchment-dim">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-parchment transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-ink-line px-6 py-4 text-center text-xs text-parchment-faint">
        © {new Date().getFullYear()} VeilSwap.
      </div>
    </footer>
  );
}