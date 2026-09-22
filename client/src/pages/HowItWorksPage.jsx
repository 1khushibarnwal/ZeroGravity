import PageShell from "../components/PageShell";
import PageHeader from "../components/PageHeader";
import HowItWorks from "../components/sections/HowItWorks";
import ModeBreakdown from "../components/sections/ModeBreakdown";

export default function HowItWorksPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="How it works"
        title="Commit-reveal, end to end"
        lede="One contract, one two-step cycle, and three different ways to run it depending on how much you want to hold yourself."
      />
      <HowItWorks />
      <ModeBreakdown />
    </PageShell>
  );
}