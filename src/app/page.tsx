import React from "react";
import Hero from "../components/sections/hero";
import ArchitectureGrid from "../components/sections/architecture-grid";
import AgentReveal from "../components/sections/agent-reveal";
import OrchestratorSimulation from "../components/sections/orchestrator-simulation";
import EcosystemSection from "../components/sections/ecosystem-section";
import VisualsSection from "../components/sections/visuals-section";
import Footer from "../components/layout/footer";
import LiquidContainer from "../components/layout/liquid-container";

export default function Page() {
  return (
    <>
      <Hero />

      <ArchitectureGrid />

      <AgentReveal />
      <OrchestratorSimulation />
      <EcosystemSection />
      <LiquidContainer>
        <VisualsSection />
        <Footer />
      </LiquidContainer>
    </>
  );
}
