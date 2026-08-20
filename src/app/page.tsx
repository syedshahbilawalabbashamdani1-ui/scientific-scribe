import { HomeHero } from "@/components/HomeHero";
import { HomeServices } from "@/components/HomeServices";
import { HomeTrust } from "@/components/HomeTrust";
import { HomeCta } from "@/components/HomeCta";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeServices />
      <HomeTrust />
      <HomeCta />
    </>
  );
}
