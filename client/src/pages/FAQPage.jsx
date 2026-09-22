import PageShell from "../components/PageShell";
import PageHeader from "../components/PageHeader";
import FAQAccordion from "../components/FAQAccordion";

const GENERAL = [
  {
    question: "What is a commit-reveal transfer?",
    answer:
      "Instead of broadcasting a transfer directly, you first submit a hash of its details (recipient, amount, a random salt). Nobody can reverse that hash to learn what it commits to. Later, once a minimum delay has passed, you reveal the original details, the contract checks they hash to the same value, and the transfer executes.",
  },
  {
    question: "Why hide a transfer before it happens?",
    answer:
      "Anything sitting in a public mempool can be seen — and acted on — before it confirms. A commit-reveal step means there's nothing readable to front-run: onlookers see a hash, not a recipient or an amount, until you choose to reveal it.",
  },
  {
    question: "What chain does VeilSwap run on?",
    answer:
      "Whichever chain the CommitRegistry contract is deployed to for a given deployment — check the app's connected network in the wallet button. The contract itself is small enough to redeploy anywhere the EVM runs.",
  },
];

const MODES = [
  {
    question: "What's the difference between self-custody, managed, and agent mode?",
    answer:
      "Self-custody: your wallet commits and reveals directly, and the salt/nonce never leave your browser. Managed: you hand the recipient and amount to a relayer, which commits and reveals on your behalf. Agent: you describe the transfer in plain language and an LLM turns it into the same managed flow.",
  },
  {
    question: "Who can reveal my commitment?",
    answer:
      "Only the address that originally called commit() — the contract checks msg.sender against the stored committer. In self-custody mode that's your own wallet. In managed and agent mode, the relayer's wallet is the committer, so only the relayer can complete the reveal, not you.",
  },
  {
    question: "Who pays gas in managed mode?",
    answer:
      "The relayer wallet pays for both the commit and the reveal transactions. Your wallet address is only attached to the request as the transfer's record.",
  },
  {
    question: "What happens if I clear my browser or switch devices in self-custody mode?",
    answer:
      "The nonce and salt behind your commitment are stored only in that browser's local storage. If they're gone, there's no way to reconstruct the reveal from anywhere else — the commitment stays on-chain, sealed, indefinitely.",
  },
  {
    question: "Can I cancel a commitment once it's sealed?",
    answer:
      "No. The contract has no cancel or withdraw function — a commitment, once submitted, is permanent. Reveal is the only state change available, and it's optional: you can leave a commitment unrevealed forever if you change your mind.",
  },
];

const LIMITS = [
  {
    question: "What happens if I try to reveal before the delay ends?",
    answer:
      "The transaction reverts with CommitRegistry__RevealTooEarly. The contract enforces MIN_DELAY on-chain, so there's no way around it from the client — the UI's countdown is just a courtesy, not the actual gate.",
  },
  {
    question: "Is the CommitRegistry contract audited?",
    answer:
      "No — it's a small, unaudited two-function registry. Read the source yourself before relying on it for anything of real value. One limitation worth knowing: commit() rejects any ETH sent to it and the contract has no receive or fallback function, so it currently has no way to hold funds — which means reveal() can only succeed for a zero-amount commitment until that's addressed.",
  },
];

export default function FAQPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="FAQ"
        title="Questions worth asking before you trust this"
        lede="Straight answers, including the parts that are still rough edges."
      />
      <div className="mx-auto max-w-3xl space-y-14 px-6 py-16">
        <div>
          <h2 className="font-display text-2xl text-parchment">General</h2>
          <FAQAccordion items={GENERAL} />
        </div>
        <div>
          <h2 className="font-display text-2xl text-parchment">
            Self-custody, managed &amp; agent
          </h2>
          <FAQAccordion items={MODES} />
        </div>
        <div>
          <h2 className="font-display text-2xl text-parchment">
            Security &amp; limitations
          </h2>
          <FAQAccordion items={LIMITS} />
        </div>
      </div>
    </PageShell>
  );
}