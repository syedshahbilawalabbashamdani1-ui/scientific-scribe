import { HomeHero } from "@/components/HomeHero";
import { HomeServices } from "@/components/HomeServices";
import { PeerReviewStepper } from "@/components/animations/PeerReviewStepper";
import { HomeCta } from "@/components/HomeCta";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeServices />
      <PeerReviewStepper />
      <HomeCta />
    </>
  );
}
