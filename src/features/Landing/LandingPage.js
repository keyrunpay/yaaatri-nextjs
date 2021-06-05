import React from "react";
import AdventureSection from "./ui/AdventureSection";
import DestinationSection from "./ui/DestinationSection";
import TravelExpertSection from "./ui/TravelExpertSection";
import HeroSection from "./ui/HeroSection";
import HotStoriesSection from "./ui/HotStoriesSection";
import CounterSection from "./ui/CounterSection";
import useLanding from "../../core/hooks/useLanding";

export default function LandingPage() {
  const { landing, fetchLanding } = useLanding();

  React.useState(() => {
    if (landing.status !== "data") fetchLanding();
  }, []);

  return (
    <div>
      <HeroSection />
      <DestinationSection landing={landing} />
      <HotStoriesSection landing={landing} />
      <AdventureSection />
      <TravelExpertSection />
      <CounterSection />
    </div>
  );
}
