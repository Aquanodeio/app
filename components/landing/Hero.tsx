import Image from "next/image";
import PriceComparisonCard from "./PriceComparisonCard";
import { GradientText } from "./GradientText";
import Spline from "@splinetool/react-spline/next";
import HeroBg from "@/assets/hero-bg-texture.png";

const cardData = [
  {
    gpuType: "H100",
    aquanodePrice: "$1.13/hr",
    competitorPrice: "$14.29/hr",
    position: { left: "87px" },
  },
  {
    gpuType: "A100",
    aquanodePrice: "$0.76/hr",
    competitorPrice: "$8.10/hr",
    position: { left: "335px" },
  },
  {
    gpuType: "V100",
    aquanodePrice: "$0.20/hr",
    competitorPrice: "$7.97/hr",
    position: { left: "583px" },
  },
];

export const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden px-20">
      <div>
        <div className="absolute -left-[211px] -top-[81px] w-[1062px] h-[501px]">
          <Image
            src={HeroBg}
            alt=""
            fill
            className="object-stretch"
          />
        </div>

        <div className="inset-0 w-full h-[591px] relative z-10">
          <header className="h-24 relative z-10">
            <div className="flex items-center justify-between py-8">
              <div className="text-white font-bold text-xl">AquaNode</div>

              <div className="flex items-center gap-6">
                <span
                  className="text-white text-[14px] font-medium leading-[24px] tracking-[-0.14px]"
                  style={{ fontFamily: "var(--font-roboto)" }}
                >
                  Log in
                </span>

                {/* Sign up button */}
                <button
                  className="flex items-center justify-center px-[17px] py-[5px] rounded-full border border-white/10"
                  style={{
                    background: `radial-gradient(circle at 50% 215%, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0) 100%)`,
                  }}
                >
                  <span
                    className="text-[14px] font-bold leading-[24px] tracking-[-0.14px]"
                    style={{
                      fontFamily: "var(--font-roboto)",
                      background: `linear-gradient(180deg, rgba(255, 255, 255, 0.3) 8.85%, rgba(255, 255, 255, 1) 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Sign up
                  </span>
                </button>
              </div>
            </div>

            {/* Login button */}

            {/* Horizontal divider */}
            <div
              className="bottom-0 left-0 w-full h-[1px]"
              style={{
                background: `linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.16) 50%, rgba(255, 255, 255, 0) 100%)`,
              }}
            />
          </header>

          <div className="mt-40">
            <h1
              className=" text-[64px] font-bold leading-[68px] tracking-[-1.44px] text-left"
              style={{
                fontFamily: "ES Rebond Grotesque, sans-serif",
                background: `linear-gradient(180deg, rgba(255, 255, 255, 1) 22.5%, rgba(255, 255, 255, 0.7) 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              The World's Largest
              <br />
              Compute Ecosystem
            </h1>

            <p
              className="text-[#D2D0DD] text-[20px] font-normal leading-[28px] tracking-[-0.2px] text-left mt-6"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Affordable, decentralized compute infrastructure for developers
              and <br />
              businesses. Deploy customizable Aqua services through our unified
              layer.
            </p>
          </div>

          <div className="flex gap-10 mt-10">
            <div
              className="flex items-center justify-center px-[25px] py-[8px] rounded-full backdrop-blur-[4px]"
              style={{
                background: `rgba(0, 0, 0, 0.1), radial-gradient(circle at 50% 215%, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0) 100%)`,
              }}
            >
              <span className="text-white text-[14px] font-medium">
                Get Started
              </span>
            </div>

            <GradientText>Try Demo</GradientText>
          </div>

          <div className="absolute -right-[200px] top-10">
            <div className=" w-[800px] h-[800px] scale-[0.60]">
              <Spline scene="https://prod.spline.design/15txp4eWHSnORrNb/scene.splinecode" />
            </div>
          </div>
        </div>

        <PriceComparisonCard cards={cardData} />
      </div>
    </section>
  );
};

{
  /* <div className="">
<Spline
  className="scale-60"
  scene="https://prod.spline.design/15txp4eWHSnORrNb/scene.splinecode"
/>
</div> */
}
