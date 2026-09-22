import { Link, useLocation } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const MARKETING_LINKS = [
  { to: "/how-it-works", label: "How it works" },
  { to: "/faq", label: "FAQ" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const onApp = pathname.startsWith("/app");

  return (
    <header className="sticky top-0 z-20 border-b border-ink-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-xl text-parchment">
          VeilSwap
        </Link>

        {!onApp && (
          <nav className="hidden items-center gap-8 md:flex">
            {MARKETING_LINKS.map((link) => {
              const active = pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm transition-colors ${
                    active
                      ? "text-brass"
                      : "text-parchment-dim hover:text-parchment"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}

        <div className="flex items-center gap-4">
          {onApp ? (
            <Link
              to="/"
              className="text-sm text-parchment-dim hover:text-parchment transition-colors"
            >
              Back to site
            </Link>
          ) : (
            <Link to="/app" className="btn-primary">
              Launch app
            </Link>
          )}
          <ConnectButton
            showBalance={false}
            chainStatus="icon"
            accountStatus={{ smallScreen: "avatar", largeScreen: "full" }}
          />
        </div>
      </div>
    </header>
  );
}