import Image from "next/image";
import CostEfficiency from "@/assets/cost-efficiency.png";
import GlobalInfrastructure from "@/assets/global-infra.png";
import LighteningFast from "@/assets/lightening-fast.png";
import Orchestration from "@/assets/orchestration.png";
import FlexiblePayments from "@/assets/flexible-payment.png";

export function Features() {
  return (
    <section className="w-full flex justify-center py-20">
      <div className="flex flex-col items-center gap-[36px]">
        {/* Badge */}
        <div
          className="flex items-center justify-center px-[15px] py-[5px] rounded-full border border-white/4"
          style={{
            background: "rgba(255, 255, 255, 0.04)",
          }}
        >
          <span
            className="text-white text-[14px] font-medium leading-[24px] tracking-[8%] uppercase"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            aqua usps
          </span>
        </div>

        {/* Heading */}
        <div className="w-full flex flex-col items-center">
          <h2
            className="text-[53.59px] font-bold leading-[64px] text-center"
            style={{
              fontFamily: "ES Rebond Grotesque, sans-serif",
              background: `linear-gradient(180deg, rgba(255, 255, 255, 1) 22.5%, rgba(255, 255, 255, 0.7) 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Magical features to help you <br />
            deploy faster
          </h2>
        </div>

        {/* Features Grid */}
        <div className="relative container w-[1156px] h-[700px]">
          <div className="grid grid-cols-3 grid-rows-1 gap-8">
            {/* Top Left - Cost Efficiency */}

            <div className="flex flex-col items-center justify-between">
              <Image
                src={CostEfficiency}
                alt="Cost Efficiency"
                className="object-cover"
              />

              <Image
                src={Orchestration}
                alt="Orchestration"
                className="object-cover"
              />
            </div>

            <div>
              <Image
                src={LighteningFast}
                alt="Lightening Fast"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col items-center justify-between">
              <Image
                src={GlobalInfrastructure}
                alt="Global Infrastructure"
                className="object-cover"
              />

              <Image
                src={FlexiblePayments}
                alt="Middle Card"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
