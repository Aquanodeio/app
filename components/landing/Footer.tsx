import React from "react";
import Image from "next/image";
import HorizontalDivider from "./HorizontalDivider";
import AquaNodeLogo from "@/assets/aquanode-logo.png";


const Footer = () => {
  return (
    <div className="w-full px-4 sm:px-20 lg:px-40 py-6 sm:py-10">
      <div className="mx-auto relative">
      <HorizontalDivider />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pt-10 sm:pt-20 pb-20 sm:pb-40 gap-6 sm:gap-2">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-[6px]">
              <Image src={AquaNodeLogo} alt="AquaNode Logo" width={32} height={32} />

              {/* Logo Text */}
              <div
                className="text-white text-[18px] sm:text-[21.7px] font-bold leading-[22px] sm:leading-[25px] tracking-[-0.02em]"
                style={{ fontFamily: "ES Rebond Grotesque" }}
              >
                Aquanode
              </div>
            </div>

            <div
              className="text-sm sm:text-base font-normal leading-6 tracking-[-0.01em] mt-4"
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
            <h3 className="text-[#D2D0DD] text-sm font-medium leading-6 tracking-[-0.01em] mb-4 sm:mb-6">
              Platform
            </h3>
            <div className="flex flex-col gap-3 sm:gap-4">
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

          <div className="hidden lg:block"></div>

          <div className="relative sm:col-span-2 lg:col-span-1">
            <div
              className="w-full max-w-[264px] h-[150px] sm:h-[192px] rounded-2xl mx-auto lg:mx-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(169, 163, 194, 0.2) 0%, rgba(169, 163, 194, 0.047) 100%)",
              }}
            >
              <div className="absolute inset-[1px] bg-[#0A0118] rounded-2xl overflow-hidden">
                {/* Grid Background */}

                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      "radial-gradient(67.49% 100% at 50% 0%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, 0.02)",
                  }}
                />

                <div className="absolute left-1 top-[10px] w-[calc(100%-8px)] h-[60px] sm:h-[109.55px] flex justify-center items-center">
                  <div className="w-full h-full relative opacity-100">
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
                    className="absolute left-4 sm:left-7 top-4 sm:top-7 text-white text-[16px] sm:text-[18.9px] font-bold leading-[24px] sm:leading-[32px] w-[113px] h-6 sm:h-8"
                    style={{ fontFamily: "ES Rebond Grotesque" }}
                  >
                    Get in touch
                  </h3>
                  <p className="absolute left-4 sm:left-7 top-[56px] sm:top-[72px] text-[#9B96B0] text-xs sm:text-sm font-normal leading-5 sm:leading-6 tracking-[-0.01em] w-[calc(100%-32px)] sm:w-[194px] h-8 sm:h-12">
                    999 Some Sample Office Address, Delhi NCR, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <HorizontalDivider />

        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6 sm:gap-0 mt-6 sm:mt-10">
          <div className="text-[#9B96B0] text-sm font-normal leading-[24px] tracking-[-0.01em] text-center sm:text-left">
            ©2025 Aquanode. All rights reserved.
          </div>

          <div className="flex gap-6 sm:gap-10">
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
