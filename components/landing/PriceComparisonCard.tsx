import Image from "next/image";
import GpuIcon from "@/assets/gpu-icon.png";
import DatabaseIcon from "@/assets/database-icon.svg";

interface CardData {
  gpuType: string;
  aquanodePrice: string;
  competitorPrice: string;
  position: {
    left: string;
  };
}

interface PriceComparisonCardProps {
  cards: CardData[];
}

export default function PriceComparisonCard({ cards }: PriceComparisonCardProps) {
  return (
    <div className="flex gap-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="w-[228px] h-[88px] rounded-[16px] border border-[#2C2539] backdrop-blur-[30.62px]"
          style={{
            left: card.position.left,
            background: `radial-gradient(circle at 50% 0%, rgba(133, 102, 255, 0.04) 0%, rgba(133, 102, 255, 0) 100%)`,
          }}
        >
          <div className="absolute left-[50px] top-[14px] w-[31px] h-[15px]">
            <span
              className="text-[12px] font-medium leading-[14.52px] text-center"
              style={{
                background: `linear-gradient(180deg, rgba(255, 255, 255, 1) 22.5%, rgba(255, 255, 255, 0.7) 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {card.gpuType}
            </span>
          </div>

          {/* Logo and price */}
          <div className="absolute left-[26.19px] bottom-[18.24px] flex items-center gap-[8px]">
            <div className="w-[21.93px] h-[20.19px] relative">
              <div className="w-full h-full bg-gradient-to-b from-white to-white/20 rounded-sm"></div>
            </div>
            <span className="text-[#41B66B] text-[10px] font-medium leading-[12.1px]">
              {card.aquanodePrice}
            </span>
          </div>

          {/* GPU icon and comparison price */}
          <div className="absolute right-[26.19px] bottom-[18px] flex items-center gap-[8px]">
            <div className="w-[24.36px] h-[14.52px] relative">
              <Image
                src={GpuIcon}
                alt="GPU"
                fill
                className="object-fill"
              />
            </div>
            <span
              className="text-[10px] font-normal leading-[12.1px]"
              style={{
                background: `linear-gradient(180deg, rgba(255, 255, 255, 1) 22.5%, rgba(255, 255, 255, 0.7) 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {card.competitorPrice}
            </span>
          </div>

          {/* Database icon */}
          <div className="absolute left-[24px] top-[13px] w-[18px] h-[18px]">
            <Image
              src={DatabaseIcon}
              alt="Database"
              width={18}
              height={18}
            />
          </div>
        </div>
      ))}
    </div>
  );
}