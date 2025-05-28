import Image from "next/image";
import BackgroundImage from "@/assets/star-background.png";

export default function NewsletterSection() {
  return (
    <section className="relative w-full flex flex-col items-center px-40 py-20">
      <div className="relative w-full h-[591px]">
        <div className="absolute inset-0">
          <Image
            src={BackgroundImage}
            alt="Newsletter Background"
            fill
            className="object-stretch"
            priority
          />
        </div>

        <div className="relative z-1 w-full h-full flex flex-col items-center justify-center gap-5">
          <h2 className="font-esrebond font-bold text-[54px] leading-[64px] text-center bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
            Take Control of Your Compute
          </h2>

          <p className="text-[#9B96B0] font-inter text-[20px] leading-[28px] text-center -tracking-[0.01em]">
            Get started with Aquanode and get the best computation rates in the
            industry
          </p>

          <div className="flex items-center gap-[24px]">
            {/* Email Input */}
            <div className="bg-white/[0.04] backdrop-blur-[4px] rounded-full flex justify-center">
              <div className="border border-white/10 rounded-full p-[1px]">
                <div className="w-[352px] h-[46px] flex items-stretch justify-stretch px-[21px] py-[15px] pr-[131px]">
                  <div className="flex flex-col w-full">
                    <input
                      type="email"
                      placeholder="Enter your Email"
                      className="bg-transparent text-white/32 placeholder-white/32 font-inter text-[14px] leading-[17px] text-left w-full outline-none"
                    />
                  </div>

                  <div className="backdrop-blur-[4px] rounded-full flex flex-col items-center absolute right-1.5 top-1">
                    <button className="bg-white/[0.04] border border-white/10 rounded-full px-[25px] py-[8px] bg-gradient-radial from-white/24 to-white/0">
                      <span className="text-white font-inter font-medium text-[14px] leading-[24px] text-center -tracking-[0.01em] bg-gradient-to-b from-white/30 to-white bg-clip-text text-transparent">
                        Try Demo
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
