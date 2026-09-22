import { useState } from "react";
import Navbar from "../components/Navbar";
import ModeSelector from "../components/ModeSelector";
import SelfCustodyPanel from "../components/SelfCustodyPanel";
import ManagedPanel from "../components/ManagedPanel";
import AgentPanel from "../components/AgentPanel";

export default function AppPage() {
  const [mode, setMode] = useState("self");

  return (
    <div className="min-h-screen bg-reveal-glow">
      <Navbar />
      <main className="mx-auto max-w-3xl space-y-8 px-6 py-10">
        <ModeSelector mode={mode} onChange={setMode} />
        <div className="rounded-sm border border-ink-line bg-ink-soft/40 p-6 sm:p-8">
          {mode === "self" && <SelfCustodyPanel />}
          {mode === "managed" && <ManagedPanel />}
          {mode === "agent" && <AgentPanel />}
        </div>
      </main>
    </div>
  );
}