import Image from "next/image";
import UnifiedComponentCard from "./UnifiedComponentCard";
import FlexibilityImage from "@/assets/unified-carousel/flexibility.png";
import AggregationImage from "@/assets/unified-carousel/aggregation.png";
import OrchestrationImage from "@/assets/unified-carousel/orchestration.png";
import PaymentsImage from "@/assets/unified-carousel/payments.png";
import UnifiedBgImage from "@/assets/unified-bg-image.png";
const unifiedCards = [
  {
    title: "Aggregation",
    description: "Multiple providers combined into a single, consistent API",
    icon: AggregationImage,
  },
  {
    title: "Orchestration",
    description: "Deployment, scaling, and monitoring made simple",
    icon: OrchestrationImage,
  },
  {
    title: "Payments",
    description: "Support for both crypto and fiat, converted to GPU credits",
    icon: PaymentsImage,
  },
  {
    title: "Flexibility",
    description: "Use GPU credits across any service deployed on Aqua",
    icon: FlexibilityImage,
  },
];

export default function UnifiedComputeSection() {
  return (
    <section className="relative w-full pb-4">
      <div className="absolute left-0 top-[1143px] w-[1440px] h-[1px] bg-gradient-to-r from-transparent via-[#3D354E] to-transparent"></div>

      <div className="relative">
        <div className="max-w-[1040px] mx-auto">
          <Image
            src={UnifiedBgImage}
            alt=""
            width={1440} // <- This is the original image file size
            height={800} // <- This is the original image file size
            sizes="100vw"
            className="w-full h-auto" // <- This makes it responsive
          />
        </div>

        {/* Content Container */}
        <div className="relative flex flex-col items-center gap-[24px] -top-[175px]">
          <div className="flex flex-col items-center gap-[24px] max-w-[800px]">
            <div className="bg-white/[0.04] border border-white/[0.04] rounded-full px-[15px] py-[5px]">
              <span className="text-white font-roboto font-medium text-[14px] leading-[24px] tracking-[0.08em] uppercase">
                aqua features
              </span>
            </div>

            <h2 className="font-esrebond font-bold text-[53.8px] leading-[64px] text-center bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
              Unified Compute from Decentralized Providers
            </h2>

            <p className="text-[#9B96B0] font-inter text-[20px] leading-[28px] text-center -tracking-[0.01em]">
              Our orchestration layer aggregates decentralized compute providers
              including Spheron, Akash, and others into a unified, powerful
              backend.
            </p>
          </div>

          <div className="w-full overflow-x-auto mt-8 px-20" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex flex-row gap-[24px] min-w-max">
              {unifiedCards.map((card) => (
                <UnifiedComponentCard key={card.title} {...card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
