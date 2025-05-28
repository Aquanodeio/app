import React from "react";
import Image from "next/image";

function HorizontalDivider() {
  return (
    <div
      className="h-px w-full"
      style={{
        background:
          "radial-gradient(circle at 50% 100%, rgba(169, 163, 194, 0.24) 0%, rgba(169, 163, 194, 0) 100%)",
      }}
    />
  );
}

const Footer = () => {
  return (
    <div className="w-full px-40 py-10">
      <div className=" mx-auto relative">
      <HorizontalDivider />

        <div className=" grid grid-cols-4 pt-20 pb-40 gap-2 ">
          <div>
            <div className="flex items-center gap-[6px]">
              {/* Logo Icon */}
              <div className="w-[31px] h-[29px] flex flex-col gap-[1.3px]">
                <div className="w-full h-[6px] bg-white rounded-sm" />
                <div className="w-full h-[6px] bg-white rounded-sm" />
                <div className="w-full h-[6px] bg-white rounded-sm" />
                <div className="w-full h-[6px] bg-white rounded-sm" />
              </div>

              {/* Logo Overlay Design */}
              <div className="absolute left-[2px] top-[3px] w-[27px] h-[25.5px]">
                <svg width="27" height="26" viewBox="0 0 27 26" fill="none">
                  <path
                    d="M0.177 22.211h16.85v3.296H0.177v-3.296z"
                    fill="#0B021A"
                  />
                  <path
                    d="M10.115 14.593h16.85v3.296h-16.85v-3.296z"
                    fill="#0B021A"
                  />
                  <path d="M10.115 0h16.85v3.09h-16.85V0z" fill="#0B021A" />
                  <path d="M0 6.834h16.854v3.966H0V6.834z" fill="#0B021A" />
                </svg>
              </div>

              {/* Logo Text */}
              <div
                className="text-white text-[21.7px] font-bold leading-[25px] tracking-[-0.02em]"
                style={{ fontFamily: "ES Rebond Grotesque" }}
              >
                Aquanode
              </div>
            </div>

            <div
              className="h-12 text-base font-normal leading-6 tracking-[-0.01em]"
              style={{
                background:
                  "linear-gradient(180deg, #FFFFFF 22.5%, rgba(255, 255, 255, 0.7) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              The World's Largest Compute Ecosystem
            </div>
          </div>

          <div className="">
            <h3 className="text-[#D2D0DD] text-sm font-medium leading-6 tracking-[-0.01em] mb-10">
              Platform
            </h3>
            <div className="flex flex-col gap-4">
              <a
                href="#"
                className="text-[#9B96B0] text-sm font-normal leading-6 tracking-[-0.01em] hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#"
                className="text-[#9B96B0] text-sm font-normal leading-6 tracking-[-0.01em] hover:text-white transition-colors"
              >
                Pricing
              </a>
              <a
                href="#"
                className="text-[#9B96B0] text-sm font-normal leading-6 tracking-[-0.01em] hover:text-white transition-colors"
              >
                Community
              </a>
              <a
                href="#"
                className="text-[#9B96B0] text-sm font-normal leading-6 tracking-[-0.01em] hover:text-white transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>

          <div></div>

          <div className="relative">
            <div
              className="w-[264px] h-[192px] rounded-2xl"
              style={{
                background:
                  "linear-gradient(180deg, rgba(169, 163, 194, 0.2) 0%, rgba(169, 163, 194, 0.047) 100%)",
              }}
            >
              <div className="absolute inset-[1px] bg-[#0A0118] rounded-2xl overflow-hidden">
                {/* Grid Background */}

                <div
                  className="absolute inset-0 rounded-2xl "
                  style={{
                    background:
                      "radial-gradient(67.49% 100% at 50% 0%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, 0.02)",
                  }}
                />

                <div className="absolute left-1 top-[10px] w-[248px] h-[109.55px] flex justify-center items-center">
                  <div className="w-[248px] h-[109.55px] relative opacity-100">
                    <Image
                      src="/icons/grid-bg.svg"
                      alt="Grid background"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="relative z-10">
                  <h3
                    className="absolute left-7 top-7 text-white text-[18.9px] font-bold leading-[32px] w-[113px] h-8"
                    style={{ fontFamily: "ES Rebond Grotesque" }}
                  >
                    Get in touch
                  </h3>
                  <p className="absolute left-7 top-[72px] text-[#9B96B0] text-sm font-normal leading-6 tracking-[-0.01em] w-[194px] h-12">
                    999 Some Sample Office Address, Delhi NCR, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <HorizontalDivider />

        <div className="flex justify-between mt-10">
          <div className=" text-[#9B96B0] text-sm font-normal leading-[24px] tracking-[-0.01em]">
            ©2025 Aquanode. All rights reserved.
          </div>

          <div className="flex gap-10">
            <a href="#" className="w-6 h-6 flex items-center justify-center">
              <Image
                src="/icons/instagram.svg"
                alt="Instagram"
                width={16}
                height={16}
              />
            </a>
            <a href="#" className="w-6 h-6 flex items-center justify-center">
              <Image
                src="/icons/youtube.svg"
                alt="YouTube"
                width={18}
                height={12}
              />
            </a>
            <a href="#" className="w-6 h-6 flex items-center justify-center">
              <Image
                src="/icons/linkedin.svg"
                alt="LinkedIn"
                width={14}
                height={14}
              />
            </a>
            <a href="#" className="w-6 h-6 flex items-center justify-center">
              <Image
                src="/icons/twitter.svg"
                alt="Twitter"
                width={18}
                height={14}
              />
            </a>
            <a href="#" className="w-6 h-6 flex items-center justify-center">
              <Image
                src="/icons/discord.svg"
                alt="Discord"
                width={18}
                height={14}
              />
            </a>
          </div>
        </div>

        {/* Contact Card */}
      </div>
    </div>
  );
};

export default Footer;
