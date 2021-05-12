import React from "react";
import AdventureSection from "./ui/AdventureSection";
import DestinationSection from "./ui/DestinationSection";
import TravelExpertSection from "./ui/TravelExpertSection";
import HeroSection from "./ui/HeroSection";
import HotStoriesSection from "./ui/HotStoriesSection";

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <DestinationSection />
      <AdventureSection />
      <HotStoriesSection />
      <TravelExpertSection />
    </div>
  );
}
