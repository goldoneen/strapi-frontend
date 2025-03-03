// import { Button } from "@/components/ui/button"
import { getHomePageData } from "@/data/loaders";

import { HeroSection } from "@/components/custom/hero-section";
import { FeatureSection } from "@/components/custom/features-section";

export default async function Home() {

  const blockComponents = {
    "layout.hero-section": HeroSection,
    "layout.features-section": FeatureSection,
  };

  function blockRenderer(block: any) {
    const Component = blockComponents[block.__component as keyof typeof blockComponents];
    return Component ? <Component key={block.id} data={block} /> : null;
  }

  const strapiData = await getHomePageData()

  // console.dir(strapiData, { depth: null });

  const { blocks } = strapiData?.data || [];

  return (
    <main className="container mx-auto py-6">
      {blocks.map(blockRenderer)}
    </main>
  );
}
