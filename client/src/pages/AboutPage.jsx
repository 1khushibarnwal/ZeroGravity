import PageShell from "../components/PageShell";
import PageHeader from "../components/PageHeader";
import WhyUs from "../components/sections/WhyUs";
import WhoWeAre from "../components/sections/WhoWeAre";

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="About"
        title="Small on purpose"
        lede="Why VeilSwap is built the way it is, and who built it."
      />
      <WhyUs />
      <WhoWeAre />
    </PageShell>
  );
}