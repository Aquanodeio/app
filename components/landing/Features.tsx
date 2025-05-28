import Image from "next/image";
import CostEfficiency from "@/assets/cost-efficiency.png";
import GlobalInfrastructure from "@/assets/global-infra.png";
import LighteningFast from "@/assets/lightening-fast.png";
import Orchestration from "@/assets/orchestration.png";
import FlexiblePayments from "@/assets/flexible-payment.png";

export function Features() {
  return (
    <section className="w-full pt-40">
      <div className="flex flex-col items-center gap-[36px]">
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

        <div className="relative container w-full ">
          <div className="grid grid-cols-3 grid-rows-1 gap-8 h-full">
            <div className="flex flex-col items-center justify-between gap-8">
              <Image
                src={CostEfficiency}
                alt="Cost Efficiency"
                className="object-cover w-full h-auto"
              />

              <Image
                src={Orchestration}
                alt="Orchestration"
                className="object-cover w-full h-auto"
              />
            </div>

            <div>
              <Image
                src={LighteningFast}
                alt="Lightening Fast"
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex flex-col items-center justify-between gap-8">
              <Image
                src={GlobalInfrastructure}
                alt="Global Infrastructure"
                className="object-contain w-full h-full"
              />

              <Image
                src={FlexiblePayments}
                alt="Middle Card"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
