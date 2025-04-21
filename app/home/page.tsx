import Image from "next/image";

// Note: Some exact styling details like specific gradient parameters, blur effects,
// and font families ('ES Rebond Grotesque', 'Inter V') might need custom configuration
// in your tailwind.config.js or global CSS if not directly supported by default Tailwind.
// Placeholder styles are used where direct mapping is complex.

import Spline from "@splinetool/react-spline/next";

const HomePage = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-[#0B021A]">
      {/* Background elements - These often require absolute positioning and careful layering */}
      {/* Background Frame (Image Fill) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/background.png"
          alt="Background texture"
          layout="fill"
          objectFit="cover" // Changed from STRETCH as 'cover' is usually better
          quality={100}
        />
      </div>
      {/* Gradient overlays and masks */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#B7A4FB]/0 via-[#B7A4FB]/100 to-[#8562FF]/0 opacity-50"></div>{" "}
      {/* Example gradient */}
      {/* Tiled Image */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: "url(/images/image_tile.png)",
          backgroundSize: "auto",
          backgroundRepeat: "repeat",
        }}
      ></div>
      {/* Header */}
      <header className="relative z-10 mt-4 flex w-full max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          {/* Simplified logo representation */}
          <div className="flex flex-col space-y-0.5">
            <div className="h-1 w-9 bg-white"></div>
            <div className="h-1 w-9 bg-white"></div>
            <div className="h-1 w-9 bg-white"></div>
            <div className="h-1 w-9 bg-white"></div>
          </div>
          <span
            className="font-bold text-2xl text-white"
            style={{ fontFamily: "'ES Rebond Grotesque', sans-serif" }}
          >
            Aquanode
          </span>
        </div>

        {/* Navigation / Auth Buttons */}
        <div className="flex items-center space-x-6">
          <button className="text-sm font-medium text-white hover:text-gray-300">
            Log in
          </button>
          {/* Sign Up Button with Blur Effect Container */}
          <div
            className="relative rounded-full p-px backdrop-blur-[8px]"
            style={{ background: "rgba(255, 255, 255, 0.1)" }}
          >
            {" "}
            {/* Simplified blur background */}
            <button
              className="rounded-full bg-gradient-radial from-white/25 to-white/0 px-4 py-1.5 text-sm font-medium text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white/30 to-white border border-white/10 hover:opacity-90"
              style={{
                background:
                  "radial-gradient(circle at 50% 315%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 100%)",
              }}
            >
              Sign up
            </button>
          </div>
        </div>
      </header>
      {/* Horizontal Divider */}
      <div className="relative z-10 my-4 h-px w-full max-w-7xl bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
      {/* Main Content Section */}
      <main className="relative z-10 flex flex-grow flex-col items-center justify-center px-4 text-center">
        {/* Radial Gradients */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-[#713DFF]/20 via-[#713DFF]/5 to-transparent blur-3xl z-[-1]"></div>
        <div className="absolute -top-60 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-gradient-radial from-[#713DFF]/10 via-[#713DFF]/0 to-transparent blur-3xl z-[-1]"></div>

        {/* Heading */}
        <h1
          className="mt-16 text-6xl font-bold tracking-tighter text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 leading-tight max-w-3xl mx-auto"
          style={{
            fontFamily: "'ES Rebond Grotesque', sans-serif",
            letterSpacing: "-2.25%",
          }}
        >
          The World&apos;s Largest
          <br />
          Compute Ecosystem
        </h1>

        {/* Subheading */}
        <p
          className="mt-6 max-w-xl text-xl text-[#D2D0DD]/90 leading-normal"
          style={{ fontFamily: "'Inter V', sans-serif", letterSpacing: "-1%" }}
        >
          Affordable, decentralized compute infrastructure for developers and
          businesses. Deploy customizable Aqua services through our unified
          layer.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Try Demo Button */}
          <div
            className="rounded-full p-px backdrop-blur-[4px]"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <button
              className="flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 px-6 py-2 text-sm font-medium text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white/30 to-white transition-colors"
              style={{
                background:
                  "radial-gradient(circle at 50% 315%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 100%), rgba(255, 255, 255, 0.04)",
              }}
            >
              Try Demo
            </button>
          </div>
        </div>

        {/* Image/Video Section */}
        <div className=" relative mt-16 mb-10 w-full max-w-5xl">
          <Spline scene="https://prod.spline.design/ib3drelRqGhoCMPq/scene.splinecode" />
          <div className="absolute -top-20 right-0 z-10 rounded-[40px] bg-[#09090B]/7 backdrop-blur-[39.5px] p-8 m-8">
            <div className="flex flex-col items-center">
              <h3
                className="mb-6 text-center text-base font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
                style={{
                  fontFamily: "'ES Rebond Grotesque', sans-serif",
                }}
              >
                Our Computing costs vs our competitors
              </h3>

              {/* GPU Models and Pricing Grid */}
              <div className="grid grid-cols-4 gap-6 w-full max-w-xl">
                {/* Headers */}
                <div className="col-span-1"></div>
                <div
                  className="col-span-1 text-center text-xs font-medium text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
                  style={{ fontFamily: "'Inter V', sans-serif" }}
                >
                  H100
                </div>
                <div
                  className="col-span-1 text-center text-xs font-medium text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
                  style={{ fontFamily: "'Inter V', sans-serif" }}
                >
                  A100
                </div>
                <div
                  className="col-span-1 text-center text-xs font-medium text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
                  style={{ fontFamily: "'Inter V', sans-serif" }}
                >
                  V100
                </div>

                {/* Aquanode (Our) Pricing */}
                <div className="col-span-1 flex items-center justify-end">
                  <Image
                    src="/images/dashboard_image3.png"
                    width={40}
                    height={40}
                    alt="Aquanode"
                  />
                </div>
                <div
                  className="col-span-1 text-center text-xs font-medium text-[#41B66B]"
                  style={{ fontFamily: "'Inter V', sans-serif" }}
                >
                  $1.13/hr
                </div>
                <div
                  className="col-span-1 text-center text-xs font-medium text-[#41B66B]"
                  style={{ fontFamily: "'Inter V', sans-serif" }}
                >
                  $0.76/hr
                </div>
                <div
                  className="col-span-1 text-center text-xs font-medium text-[#41B66B]"
                  style={{ fontFamily: "'Inter V', sans-serif" }}
                >
                  $0.20/hr
                </div>

                {/* Competitor 1 Pricing */}
                <div className="col-span-1 flex items-center justify-end">
                  <Image
                    src="/images/dashboard_image4.png"
                    width={40}
                    height={40}
                    alt="Competitor 1"
                  />
                </div>
                <div
                  className="col-span-1 text-center text-xs text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
                  style={{ fontFamily: "'Inter V', sans-serif" }}
                >
                  $12.29/hr
                </div>
                <div
                  className="col-span-1 text-center text-xs text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
                  style={{ fontFamily: "'Inter V', sans-serif" }}
                >
                  $0.96/hr
                </div>
                <div
                  className="col-span-1 text-center text-xs text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
                  style={{ fontFamily: "'Inter V', sans-serif" }}
                >
                  $3.06/hr
                </div>

                {/* Competitor 2 Pricing */}
                <div className="col-span-1"></div>
                <div
                  className="col-span-1 text-center text-xs text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
                  style={{ fontFamily: "'Inter V', sans-serif" }}
                >
                  $14.29/hr
                </div>
                <div
                  className="col-span-1 text-center text-xs text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
                  style={{ fontFamily: "'Inter V', sans-serif" }}
                >
                  $8.10/hr
                </div>
                <div
                  className="col-span-1 text-center text-xs text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
                  style={{ fontFamily: "'Inter V', sans-serif" }}
                >
                  $7.97/hr
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* --- Start of New Section --- */}
      <section className="relative z-10 mt-24 mb-20 flex w-full max-w-7xl flex-col items-center px-4">
        {/* Background Tile Image */}
        <div
          className="absolute -top-40 -bottom-40 left-0 right-0 z-[-2] opacity-5"
          style={{
            backgroundImage: "url(/images/section2_mask1.png)", // Tiled image from node 6:451
            backgroundSize: "auto",
            backgroundRepeat: "repeat",
          }}
        ></div>

        {/* Decorative Images/Masks for this section */}
        <div className="absolute top-0 left-0 w-[300px] h-[300px] opacity-40 z-[-1]">
          <Image
            src="/images/section2_mask2.png"
            layout="fill"
            objectFit="contain"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white opacity-10"></div>
        </div>
        <div className="absolute -bottom-20 right-0 w-[400px] h-[400px] opacity-30 z-[-1]">
          <Image
            src="/images/section2_mask3.png"
            layout="fill"
            objectFit="contain"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white opacity-10"></div>
        </div>
        {/* Add other masks (6:468, 6:471) similarly if needed */}

        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-4 rounded-full border border-white/5 bg-white/5 px-4 py-1">
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-white">
              Aqua USERS
            </span>
          </div>
          <h2
            className="mb-4 max-w-2xl text-5xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 leading-tight"
            style={{ fontFamily: "'ES Rebond Grotesque', sans-serif" }}
          >
            Who we serve for
          </h2>
          <p
            className="max-w-lg text-lg text-[#9B96B0] leading-normal"
            style={{ fontFamily: "'Roboto', sans-serif", letterSpacing: "-1%" }}
          >
            We serve to some of the industries top teams and individuals who
            require compute systems tailored to their needs
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: For Builders */}
          <div className="relative overflow-hidden rounded-2xl p-px bg-gradient-to-b from-[#A9A3C2]/20 to-[#A9A3C2]/5">
            <div
              className="relative h-full rounded-[15px] bg-[#0A0118] p-6 flex flex-col justify-between"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 100%), #0A0118",
              }}
            >
              {/* Top Content */}
              <div>
                <div
                  className="mb-4 h-[56px] w-[56px] rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(ellipse at 100% 0%, rgba(133, 102, 255, 0.32) 0%, rgba(133, 102, 255, 0) 100%), linear-gradient(135deg, rgba(186, 179, 255, 0) 26%, rgba(186, 179, 255, 0.32) 89%)",
                  }}
                >
                  {/* Placeholder for auction icon SVGs */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3.75"
                      y="3.75"
                      width="16.5"
                      height="16.5"
                      rx="1.25"
                      stroke="url(#paint0_linear_6_487)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8 15.5V8.5L12 12L16 8.5V15.5"
                      stroke="url(#paint1_linear_6_487)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_6_487"
                        x1="11.8405"
                        y1="3.28261"
                        x2="11.8405"
                        y2="20.7174"
                        gradientUnits="userSpaceOnUse"
                      >
                        {" "}
                        <stop stopColor="white" />{" "}
                        <stop
                          offset="1"
                          stopColor="white"
                          stopOpacity="0.2"
                        />{" "}
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_6_487"
                        x1="11.8405"
                        y1="8.02174"
                        x2="11.8405"
                        y2="15.9783"
                        gradientUnits="userSpaceOnUse"
                      >
                        {" "}
                        <stop stopColor="white" />{" "}
                        <stop
                          offset="1"
                          stopColor="white"
                          stopOpacity="0.2"
                        />{" "}
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3
                  className="mb-2 text-lg font-medium text-white"
                  style={{
                    fontFamily: "'Inter V', sans-serif",
                    letterSpacing: "-2%",
                  }}
                >
                  For Builders
                </h3>
                <p
                  className="mb-4 text-base text-[#9B96B0]"
                  style={{
                    fontFamily: "'Inter V', sans-serif",
                    letterSpacing: "-1%",
                  }}
                >
                  Deploy your workloads at 90% less cost without the complexity
                  of managing infrastructure
                </p>
              </div>
              {/* Bottom Content */}
              <div className="mt-auto">
                <div className="mb-4 h-px w-full bg-white/10 rounded-full"></div>
                {/* Placeholder Image */}
                <Image
                  src="/images/card_image.png"
                  width={300}
                  height={100}
                  alt="Card visual"
                  className="w-full h-auto rounded"
                />
              </div>
            </div>
            {/* Radial Backgrounds */}
            <div
              className="absolute inset-0 rounded-2xl z-[-1]"
              style={{
                background:
                  "radial-gradient(ellipse at bottom, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%), radial-gradient(ellipse at bottom, rgba(133, 102, 255, 0.05) 0%, rgba(133, 102, 255, 0) 100%)",
              }}
            ></div>
          </div>

          {/* Card 2: For Developers */}
          <div className="relative overflow-hidden rounded-2xl p-px bg-gradient-to-b from-[#A9A3C2]/20 to-[#A9A3C2]/5">
            <div
              className="relative h-full rounded-[15px] bg-[#0A0118] p-6 flex flex-col justify-between"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 100%), #0A0118",
              }}
            >
              {/* Top Content */}
              <div>
                <div
                  className="mb-4 h-[56px] w-[56px] rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(ellipse at 100% 0%, rgba(133, 102, 255, 0.32) 0%, rgba(133, 102, 255, 0) 100%), linear-gradient(135deg, rgba(186, 179, 255, 0) 26%, rgba(186, 179, 255, 0.32) 89%)",
                  }}
                >
                  {/* Placeholder for source-code-square icon SVGs */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 9.5L6 12.5L9 15.5M15 9.5L18 12.5L15 15.5"
                      stroke="url(#paint0_linear_6_508)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.75 3.75H17.25C18.9069 3.75 20.25 5.09315 20.25 6.75V17.25C20.25 18.9069 18.9069 20.25 17.25 20.25H6.75C5.09315 20.25 3.75 18.9069 3.75 17.25V6.75C3.75 5.09315 5.09315 3.75 6.75 3.75Z"
                      stroke="url(#paint1_linear_6_508)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_6_508"
                        x1="11.8405"
                        y1="9.02174"
                        x2="11.8405"
                        y2="15.9783"
                        gradientUnits="userSpaceOnUse"
                      >
                        {" "}
                        <stop stopColor="white" />{" "}
                        <stop
                          offset="1"
                          stopColor="white"
                          stopOpacity="0.2"
                        />{" "}
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_6_508"
                        x1="11.8405"
                        y1="3.28261"
                        x2="11.8405"
                        y2="20.7174"
                        gradientUnits="userSpaceOnUse"
                      >
                        {" "}
                        <stop stopColor="white" />{" "}
                        <stop
                          offset="1"
                          stopColor="white"
                          stopOpacity="0.2"
                        />{" "}
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3
                  className="mb-2 text-lg font-medium text-white"
                  style={{
                    fontFamily: "'Inter V', sans-serif",
                    letterSpacing: "-2%",
                  }}
                >
                  For Developers
                </h3>
                <p
                  className="mb-4 text-base text-[#9B96B0]"
                  style={{
                    fontFamily: "'Inter V', sans-serif",
                    letterSpacing: "-1%",
                  }}
                >
                  Create and monetize Aqua Services with our SDK, focusing on
                  your application, not infrastructure
                </p>
              </div>
              {/* Bottom Content */}
              <div className="mt-auto">
                <div className="mb-4 h-px w-full bg-white/10 rounded-full"></div>
                {/* Placeholder Image */}
                <Image
                  src="/images/card_image.png"
                  width={300}
                  height={100}
                  alt="Card visual"
                  className="w-full h-auto rounded"
                />
              </div>
            </div>
            {/* Radial Backgrounds */}
            <div
              className="absolute inset-0 rounded-2xl z-[-1]"
              style={{
                background:
                  "radial-gradient(ellipse at bottom, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%), radial-gradient(ellipse at bottom, rgba(133, 102, 255, 0.05) 0%, rgba(133, 102, 255, 0) 100%)",
              }}
            ></div>
          </div>

          {/* Card 3: For Enterprises */}
          <div className="relative overflow-hidden rounded-2xl p-px bg-gradient-to-b from-[#A9A3C2]/20 to-[#A9A3C2]/5">
            <div
              className="relative h-full rounded-[15px] bg-[#0A0118] p-6 flex flex-col justify-between"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 100%), #0A0118",
              }}
            >
              {/* Top Content */}
              <div>
                <div
                  className="mb-4 h-[56px] w-[56px] rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(ellipse at 100% 0%, rgba(133, 102, 255, 0.32) 0%, rgba(133, 102, 255, 0) 100%), linear-gradient(135deg, rgba(186, 179, 255, 0) 26%, rgba(186, 179, 255, 0.32) 89%)",
                  }}
                >
                  {/* Placeholder for web-protection icon SVGs */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 6.7168L4.11914 3.1582L12 19.5002L19.8809 3.1582L12 6.7168Z"
                      stroke="url(#paint0_linear_6_526)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.11914 3.1582L12 19.5002L19.8809 3.1582"
                      stroke="url(#paint1_linear_6_526)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x="4"
                      y="3.25"
                      width="16"
                      height="17.5"
                      rx="2"
                      stroke="url(#paint2_linear_6_526)"
                      strokeWidth="2"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_6_526"
                        x1="11.8405"
                        y1="2.7099"
                        x2="11.8405"
                        y2="19.9485"
                        gradientUnits="userSpaceOnUse"
                      >
                        {" "}
                        <stop stopColor="white" />{" "}
                        <stop
                          offset="1"
                          stopColor="white"
                          stopOpacity="0.2"
                        />{" "}
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_6_526"
                        x1="11.8405"
                        y1="2.7099"
                        x2="11.8405"
                        y2="19.9485"
                        gradientUnits="userSpaceOnUse"
                      >
                        {" "}
                        <stop stopColor="white" />{" "}
                        <stop
                          offset="1"
                          stopColor="white"
                          stopOpacity="0.2"
                        />{" "}
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_6_526"
                        x1="11.8405"
                        y1="2.78261"
                        x2="11.8405"
                        y2="21.2174"
                        gradientUnits="userSpaceOnUse"
                      >
                        {" "}
                        <stop stopColor="white" />{" "}
                        <stop
                          offset="1"
                          stopColor="white"
                          stopOpacity="0.2"
                        />{" "}
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3
                  className="mb-2 text-lg font-medium text-white"
                  style={{
                    fontFamily: "'Inter V', sans-serif",
                    letterSpacing: "-2%",
                  }}
                >
                  For Enterprises
                </h3>
                <p
                  className="mb-4 text-base text-[#9B96B0]"
                  style={{
                    fontFamily: "'Inter V', sans-serif",
                    letterSpacing: "-1%",
                  }}
                >
                  Reduce cloud costs significantly while maintaining
                  performance, security, and reliability.
                </p>
              </div>
              {/* Bottom Content */}
              <div className="mt-auto">
                <div className="mb-4 h-px w-full bg-white/10 rounded-full"></div>
                {/* Placeholder Image */}
                <Image
                  src="/images/card_image.png"
                  width={300}
                  height={100}
                  alt="Card visual"
                  className="w-full h-auto rounded"
                />
              </div>
            </div>
            {/* Radial Backgrounds */}
            <div
              className="absolute inset-0 rounded-2xl z-[-1]"
              style={{
                background:
                  "radial-gradient(ellipse at bottom, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%), radial-gradient(ellipse at bottom, rgba(133, 102, 255, 0.05) 0%, rgba(133, 102, 255, 0) 100%)",
              }}
            ></div>
          </div>
        </div>
      </section>
      {/* --- End of New Section --- */}
      {/* --- Start of Aqua Services Section --- */}
      <section className="relative z-10 mt-24 mb-20 flex w-full max-w-7xl flex-col items-center px-4">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-4 rounded-full border border-white/5 bg-white/5 px-4 py-1">
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-white">
              Aqua Services
            </span>
          </div>
          <h2
            className="mb-6 max-w-3xl text-5xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 leading-tight"
            style={{ fontFamily: "'ES Rebond Grotesque', sans-serif" }}
          >
            Our Modular Aqua Services
          </h2>
          <p
            className="max-w-2xl text-xl text-[#D2D0DD]/80 leading-normal"
            style={{
              fontFamily: "'Inter V', sans-serif",
              letterSpacing: "-1%",
            }}
          >
            Applications and workloads built on top of the Aqua Layer,
            benefiting from orchestration and decentralized compute sourcing.
          </p>
        </div>

        {/* Video/Image Placeholder */}
        <div className="mb-16 w-full max-w-4xl aspect-video overflow-hidden rounded-lg border border-white/10 shadow-lg">
          <Image
            src="/images/section3_video_placeholder.png" // Placeholder image for video
            alt="Aqua Services demonstration video"
            width={1000} // Adjust based on actual aspect ratio
            height={563}
            className="w-full h-auto"
          />
        </div>

        {/* Services Cards Grid (3x2 layout) */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Seamless Web Hosting */}
          <div className="relative overflow-hidden rounded-2xl p-px bg-gradient-to-b from-[#A9A3C2]/20 to-[#A9A3C2]/5">
            <div
              className="relative h-full rounded-[15px] bg-[#0A0118] p-6 flex flex-col"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 100%), #0A0118",
              }}
            >
              <h3
                className="mb-2 text-lg font-medium text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
                style={{
                  fontFamily: "'Inter V', sans-serif",
                  letterSpacing: "-2%",
                }}
              >
                Seamless Web Hosting
              </h3>
              <p
                className="mb-4 text-base text-[#9B96B0]"
                style={{
                  fontFamily: "'Inter V', sans-serif",
                  letterSpacing: "-1%",
                }}
              >
                Deploy websites easily. Public hosting with monetization or
                private custom frontends.
              </p>
              {/* Placeholder for card visual */}
              <div className="mt-auto h-[150px] w-full overflow-hidden rounded-lg relative bg-black/20">
                <Image
                  src="/images/card1_alt13.png"
                  layout="fill"
                  objectFit="cover"
                  alt=""
                  className="opacity-50"
                />
                {/* Add other card images (alt14, dot, alt15) with absolute positioning if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0118] via-transparent to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Card 2: Interactive Jupyter Notebooks */}
          <div className="relative overflow-hidden rounded-2xl p-px bg-gradient-to-b from-[#A9A3C2]/20 to-[#A9A3C2]/5">
            <div
              className="relative h-full rounded-[15px] bg-[#0A0118] p-6 flex flex-col"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 100%), #0A0118",
              }}
            >
              <h3
                className="mb-2 text-lg font-medium text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
                style={{
                  fontFamily: "'Inter V', sans-serif",
                  letterSpacing: "-2%",
                }}
              >
                Interactive Jupyter Notebooks
              </h3>
              <p
                className="mb-4 text-base text-[#9B96B0]"
                style={{
                  fontFamily: "'Inter V', sans-serif",
                  letterSpacing: "-1%",
                }}
              >
                Run data science/ML in hosted Jupyter Notebooks. Public,
                zero-setup access.
              </p>
              {/* Placeholder for card visual */}
              <div className="mt-auto h-[150px] w-full overflow-hidden rounded-lg relative bg-black/20">
                <Image
                  src="/images/card2_alt10.png"
                  layout="fill"
                  objectFit="cover"
                  alt=""
                  className="opacity-50"
                />
                {/* Add card2_lights.png absolutely positioned? */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0118] via-transparent to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Card 3: Scalable ML Models */}
          <div className="relative overflow-hidden rounded-2xl p-px bg-gradient-to-b from-[#A9A3C2]/20 to-[#A9A3C2]/5">
            <div
              className="relative h-full rounded-[15px] bg-[#0A0118] p-6 flex flex-col"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 100%), #0A0118",
              }}
            >
              <h3
                className="mb-2 text-lg font-medium text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
                style={{
                  fontFamily: "'Inter V', sans-serif",
                  letterSpacing: "-2%",
                }}
              >
                Scalable ML Models
              </h3>
              <p
                className="mb-4 text-base text-[#9B96B0]"
                style={{
                  fontFamily: "'Inter V', sans-serif",
                  letterSpacing: "-1%",
                }}
              >
                Deploy ML models with scalable inference. Public or private
                setups.
              </p>
              {/* Placeholder for card visual */}
              <div className="mt-auto h-[150px] w-full overflow-hidden rounded-lg relative bg-black/20">
                <Image
                  src="/images/card3_alt16.png"
                  layout="fill"
                  objectFit="cover"
                  alt=""
                  className="opacity-50"
                />
                {/* Add complex grid background from 6:577-6:594 if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0118] via-transparent to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Card 4: Flexible Virtual Machines */}
          <div className="relative overflow-hidden rounded-2xl p-px bg-gradient-to-b from-[#A9A3C2]/20 to-[#A9A3C2]/5">
            <div
              className="relative h-full rounded-[15px] bg-[#0A0118] p-6 flex flex-col"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 100%), #0A0118",
              }}
            >
              <h3
                className="mb-2 text-lg font-medium text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
                style={{
                  fontFamily: "'Inter V', sans-serif",
                  letterSpacing: "-2%",
                }}
              >
                Flexible Virtual Machines
              </h3>
              <p
                className="mb-4 text-base text-[#9B96B0]"
                style={{
                  fontFamily: "'Inter V', sans-serif",
                  letterSpacing: "-1%",
                }}
              >
                Launch GPU/CPU VMs. Public access or private dedicated
                resources.
              </p>
              {/* Placeholder for card visual */}
              <div className="mt-auto h-[150px] w-full overflow-hidden rounded-lg relative bg-black/20">
                <Image
                  src="/images/card4_alt4.png"
                  layout="fill"
                  objectFit="cover"
                  alt=""
                  className="opacity-50"
                />
                {/* Add card4_alt6.png and other elements absolutely positioned if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0118] via-transparent to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Card 5: Dedicated GPU Resources */}
          <div className="relative overflow-hidden rounded-2xl p-px bg-gradient-to-b from-[#A9A3C2]/20 to-[#A9A3C2]/5">
            <div
              className="relative h-full rounded-[15px] bg-[#0A0118] p-6 flex flex-col"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 100%), #0A0118",
              }}
            >
              <h3
                className="mb-2 text-lg font-medium text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
                style={{
                  fontFamily: "'Inter V', sans-serif",
                  letterSpacing: "-2%",
                }}
              >
                Dedicated GPU Resources
              </h3>
              <p
                className="mb-4 text-base text-[#9B96B0]"
                style={{
                  fontFamily: "'Inter V', sans-serif",
                  letterSpacing: "-1%",
                }}
              >
                Buy GPU credits for private workloads. Full control for AI
                tasks.
              </p>
              {/* Placeholder for card visual */}
              <div className="mt-auto h-[150px] w-full overflow-hidden rounded-lg relative bg-black/20">
                <Image
                  src="/images/card5_alt7.png"
                  layout="fill"
                  objectFit="cover"
                  alt=""
                  className="opacity-50"
                />
                {/* Add card5_alt9.png and complex border/overlay elements absolutely positioned if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0118] via-transparent to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Card 6: Enterprise-Grade Solutions */}
          <div className="relative overflow-hidden rounded-2xl p-px bg-gradient-to-b from-[#A9A3C2]/20 to-[#A9A3C2]/5">
            <div
              className="relative h-full rounded-[15px] bg-[#0A0118] p-6 flex flex-col"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 100%), #0A0118",
              }}
            >
              <h3
                className="mb-2 text-lg font-medium text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
                style={{
                  fontFamily: "'Inter V', sans-serif",
                  letterSpacing: "-2%",
                }}
              >
                Enterprise-Grade Solutions
              </h3>
              <p
                className="mb-4 text-base text-[#9B96B0]"
                style={{
                  fontFamily: "'Inter V', sans-serif",
                  letterSpacing: "-1%",
                }}
              >
                Private tools with security, support, and custom SLAs for teams.
              </p>
              {/* Placeholder for card visual */}
              <div className="mt-auto h-[150px] w-full overflow-hidden rounded-lg relative bg-black/20">
                <Image
                  src="/images/card6_alt11.png"
                  layout="fill"
                  objectFit="cover"
                  alt=""
                  className="opacity-50"
                />
                {/* Add card6_alt12.png and other complex mask/gradient elements absolutely positioned if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0118] via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* --- End of Aqua Services Section --- */}
      {/* --- Start of Unified Compute Section --- */}
      <section className="relative z-10 mt-24 mb-20 flex w-full max-w-7xl flex-col items-center px-4">
        {/* Decorative Image */}
        <div className="absolute -top-60 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-10 z-[-1]">
          <Image
            src="/images/section4_alt_text_20.png"
            layout="fill"
            objectFit="contain"
            alt=""
          />
        </div>

        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-4 rounded-full border border-white/5 bg-white/5 px-4 py-1">
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-white">
              aqua features
            </span>
          </div>
          <h2
            className="mb-6 max-w-3xl text-5xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 leading-tight"
            style={{ fontFamily: "'ES Rebond Grotesque', sans-serif" }}
          >
            Unified Compute from Decentralized Providers
          </h2>
          <p
            className="max-w-xl text-lg text-[#9B96B0] leading-normal"
            style={{
              fontFamily: "'Inter V', sans-serif",
              letterSpacing: "-1%",
            }}
          >
            Our orchestration layer aggregates decentralized compute providers
            including Spheron, Akash, and others into a unified, powerful
            backend.
          </p>
        </div>

        {/* Feature Cards Grid (arranged differently, maybe 2x2 + 1?) */}
        {/* This layout needs careful grid/flex setup based on Figma visual */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          {" "}
          {/* Approximate grid */}
          {/* Card 1: Flexibility (Spanning more columns potentially) */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-2xl p-px bg-gradient-to-b from-[#A9A3C2]/20 to-[#A9A3C2]/5">
            <div
              className="relative h-full rounded-[15px] bg-[#0A0118] p-6 flex flex-col justify-between"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 100%), #0A0118",
              }}
            >
              <div>
                <div
                  className="mb-4 h-[56px] w-[56px] rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(ellipse at 100% 0%, rgba(133, 102, 255, 0.32) 0%, rgba(133, 102, 255, 0) 100%), linear-gradient(135deg, rgba(186, 179, 255, 0) 26%, rgba(186, 179, 255, 0.32) 89%)",
                  }}
                >
                  {/* Placeholder icon: database-02 */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <ellipse
                      cx="12"
                      cy="7.5"
                      rx="7"
                      ry="2.5"
                      stroke="url(#paint0_linear_6_310)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M19 7.5C19 9.15685 15.866 10.5 12 10.5C8.13401 10.5 5 9.15685 5 7.5M19 12C19 13.6569 15.866 15 12 15C8.13401 15 5 13.6569 5 12M19 16.5C19 18.1569 15.866 19.5 12 19.5C8.13401 19.5 5 18.1569 5 16.5"
                      stroke="url(#paint1_linear_6_310)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M5 7.5V16.5"
                      stroke="url(#paint2_linear_6_310)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M19 7.5V16.5"
                      stroke="url(#paint3_linear_6_310)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_6_310"
                        x1="11.8405"
                        y1="4.52174"
                        x2="11.8405"
                        y2="10.4783"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0.2" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_6_310"
                        x1="11.8405"
                        y1="6.97826"
                        x2="11.8405"
                        y2="19.9783"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0.8" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_6_310"
                        x1="8.09051"
                        y1="7.02174"
                        x2="8.09051"
                        y2="16.9783"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0.6" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_6_310"
                        x1="18.8405"
                        y1="7.02174"
                        x2="18.8405"
                        y2="16.9783"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0.6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3
                  className="mb-2 text-lg font-medium text-white"
                  style={{
                    fontFamily: "'Inter V', sans-serif",
                    letterSpacing: "-2%",
                  }}
                >
                  Flexibility
                </h3>
                <p
                  className="mb-4 text-base text-[#9B96B0]"
                  style={{
                    fontFamily: "'Inter V', sans-serif",
                    letterSpacing: "-1%",
                  }}
                >
                  Use GPU credits across any service deployed on Aqua
                </p>
              </div>
              <div className="mt-auto">
                <div className="mb-4 h-px w-full bg-white/10 rounded-full"></div>
                <Image
                  src="/images/card_image.png"
                  width={300}
                  height={100}
                  alt="Card visual"
                  className="w-full h-auto rounded"
                />
              </div>
            </div>
            <div
              className="absolute inset-0 rounded-2xl z-[-1]"
              style={{
                background:
                  "radial-gradient(ellipse at bottom, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%), radial-gradient(ellipse at bottom, rgba(133, 102, 255, 0.05) 0%, rgba(133, 102, 255, 0) 100%)",
              }}
            ></div>
          </div>
          {/* Card 2: Aggregation */}
          <div className="lg:col-span-1 relative overflow-hidden rounded-2xl p-px bg-gradient-to-b from-[#A9A3C2]/20 to-[#A9A3C2]/5">
            <div
              className="relative h-full rounded-[15px] bg-[#0A0118] p-6 flex flex-col justify-between"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 100%), #0A0118",
              }}
            >
              <div>
                <div
                  className="mb-4 h-[56px] w-[56px] rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(ellipse at 100% 0%, rgba(133, 102, 255, 0.32) 0%, rgba(133, 102, 255, 0) 100%), linear-gradient(135deg, rgba(186, 179, 255, 0) 26%, rgba(186, 179, 255, 0.32) 89%)",
                  }}
                >
                  {/* Placeholder icon: pyramid-structure-01 */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4.25L19.5 18.25H4.5L12 4.25Z"
                      stroke="url(#paint0_linear_6_332)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 18.25V12.25L16.5 18.25"
                      stroke="url(#paint1_linear_6_332)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.5 18.25L12 12.25"
                      stroke="url(#paint2_linear_6_332)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_6_332"
                        x1="11.8405"
                        y1="3.78261"
                        x2="11.8405"
                        y2="18.7174"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0.2" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_6_332"
                        x1="14.1905"
                        y1="11.7826"
                        x2="14.1905"
                        y2="18.7174"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0.8" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_6_332"
                        x1="8.09051"
                        y1="11.7826"
                        x2="8.09051"
                        y2="18.7174"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3
                  className="mb-2 text-lg font-medium text-white"
                  style={{
                    fontFamily: "'Inter V', sans-serif",
                    letterSpacing: "-2%",
                  }}
                >
                  Aggregation
                </h3>
                <p
                  className="mb-4 text-base text-[#9B96B0]"
                  style={{
                    fontFamily: "'Inter V', sans-serif",
                    letterSpacing: "-1%",
                  }}
                >
                  Multiple providers combined into a single, consistent API
                </p>
              </div>
              <div className="mt-auto">
                <div className="mb-4 h-px w-full bg-white/10 rounded-full"></div>
                <Image
                  src="/images/card_image.png"
                  width={300}
                  height={100}
                  alt="Card visual"
                  className="w-full h-auto rounded"
                />
              </div>
            </div>
            <div
              className="absolute inset-0 rounded-2xl z-[-1]"
              style={{
                background:
                  "radial-gradient(ellipse at bottom, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%), radial-gradient(ellipse at bottom, rgba(133, 102, 255, 0.05) 0%, rgba(133, 102, 255, 0) 100%)",
              }}
            ></div>
          </div>
          {/* Card 3: Orchestration */}
          <div className="lg:col-span-1 relative overflow-hidden rounded-2xl p-px bg-gradient-to-b from-[#A9A3C2]/20 to-[#A9A3C2]/5">
            <div
              className="relative h-full rounded-[15px] bg-[#0A0118] p-6 flex flex-col justify-between"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 100%), #0A0118",
              }}
            >
              <div>
                <div
                  className="mb-4 h-[56px] w-[56px] rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(ellipse at 100% 0%, rgba(133, 102, 255, 0.32) 0%, rgba(133, 102, 255, 0) 100%), linear-gradient(135deg, rgba(186, 179, 255, 0) 26%, rgba(186, 179, 255, 0.32) 89%)",
                  }}
                >
                  {/* Placeholder icon: workflow-square-06 */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.75 3.75H17.25C18.9069 3.75 20.25 5.09315 20.25 6.75V17.25C20.25 18.9069 18.9069 20.25 17.25 20.25H6.75C5.09315 20.25 3.75 18.9069 3.75 17.25V6.75C3.75 5.09315 5.09315 3.75 6.75 3.75Z"
                      stroke="url(#paint0_linear_6_350)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x="7.75"
                      y="7.75"
                      width="3.5"
                      height="3.5"
                      rx="1.25"
                      stroke="url(#paint1_linear_6_350)"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="7.75"
                      y="15.75"
                      width="3.5"
                      height="3.5"
                      rx="1.25"
                      stroke="url(#paint2_linear_6_350)"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="15.75"
                      y="7.75"
                      width="3.5"
                      height="3.5"
                      rx="1.25"
                      stroke="url(#paint3_linear_6_350)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M11.25 9.5H15.75M9.5 12.5V9.5M9.5 12.5H17.5M9.5 12.5V15.75"
                      stroke="url(#paint4_linear_6_350)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_6_350"
                        x1="11.8405"
                        y1="3.28261"
                        x2="11.8405"
                        y2="20.7174"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0.2" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_6_350"
                        x1="9.41551"
                        y1="7.28261"
                        x2="9.41551"
                        y2="11.7174"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0.2" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_6_350"
                        x1="9.41551"
                        y1="15.2826"
                        x2="9.41551"
                        y2="19.7174"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0.2" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_6_350"
                        x1="17.4155"
                        y1="7.28261"
                        x2="17.4155"
                        y2="11.7174"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0.2" />
                      </linearGradient>
                      <linearGradient
                        id="paint4_linear_6_350"
                        x1="13.4905"
                        y1="9.02174"
                        x2="13.4905"
                        y2="16.2174"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3
                  className="mb-2 text-lg font-medium text-white"
                  style={{
                    fontFamily: "'Inter V', sans-serif",
                    letterSpacing: "-2%",
                  }}
                >
                  Orchestration
                </h3>
                <p
                  className="mb-4 text-base text-[#9B96B0]"
                  style={{
                    fontFamily: "'Inter V', sans-serif",
                    letterSpacing: "-1%",
                  }}
                >
                  Deployment, scaling, and monitoring made simple
                </p>
              </div>
              <div className="mt-auto">
                <div className="mb-4 h-px w-full bg-white/10 rounded-full"></div>
                <Image
                  src="/images/card_image.png"
                  width={300}
                  height={100}
                  alt="Card visual"
                  className="w-full h-auto rounded"
                />
              </div>
            </div>
            <div
              className="absolute inset-0 rounded-2xl z-[-1]"
              style={{
                background:
                  "radial-gradient(ellipse at bottom, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%), radial-gradient(ellipse at bottom, rgba(133, 102, 255, 0.05) 0%, rgba(133, 102, 255, 0) 100%)",
              }}
            ></div>
          </div>
          {/* Card 4: Payments */}
          <div className="lg:col-span-1 relative overflow-hidden rounded-2xl p-px bg-gradient-to-b from-[#A9A3C2]/20 to-[#A9A3C2]/5">
            <div
              className="relative h-full rounded-[15px] bg-[#0A0118] p-6 flex flex-col justify-between"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 100%), #0A0118",
              }}
            >
              <div>
                <div
                  className="mb-4 h-[56px] w-[56px] rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(ellipse at 100% 0%, rgba(133, 102, 255, 0.32) 0%, rgba(133, 102, 255, 0) 100%), linear-gradient(135deg, rgba(186, 179, 255, 0) 26%, rgba(186, 179, 255, 0.32) 89%)",
                  }}
                >
                  {/* Placeholder icon: dollar-02 */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 3.75C16.0041 3.75 19.25 6.99594 19.25 11M12 3.75C7.99594 3.75 4.75 6.99594 4.75 11M12 3.75V20.25M19.25 11C19.25 15.0041 16.0041 18.25 12 18.25C7.99594 18.25 4.75 15.0041 4.75 11M19.25 11H4.75M14.25 11C14.25 12.2426 13.2426 13.25 12 13.25C10.7574 13.25 9.75 12.2426 9.75 11C9.75 9.75736 10.7574 8.75 12 8.75C13.2426 8.75 14.25 9.75736 14.25 11Z"
                      stroke="url(#paint0_linear_6_371)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_6_371"
                        x1="11.8405"
                        y1="3.28261"
                        x2="11.8405"
                        y2="20.7174"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3
                  className="mb-2 text-lg font-medium text-white"
                  style={{
                    fontFamily: "'Inter V', sans-serif",
                    letterSpacing: "-2%",
                  }}
                >
                  Payments
                </h3>
                <p
                  className="mb-4 text-base text-[#9B96B0]"
                  style={{
                    fontFamily: "'Inter V', sans-serif",
                    letterSpacing: "-1%",
                  }}
                >
                  Support for both crypto and fiat, converted to GPU credits
                </p>
              </div>
              <div className="mt-auto">
                <div className="mb-4 h-px w-full bg-white/10 rounded-full"></div>
                <Image
                  src="/images/card_image.png"
                  width={300}
                  height={100}
                  alt="Card visual"
                  className="w-full h-auto rounded"
                />
              </div>
            </div>
            <div
              className="absolute inset-0 rounded-2xl z-[-1]"
              style={{
                background:
                  "radial-gradient(ellipse at bottom, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%), radial-gradient(ellipse at bottom, rgba(133, 102, 255, 0.05) 0%, rgba(133, 102, 255, 0) 100%)",
              }}
            ></div>
          </div>
          {/* Card 5: Organize Data & Export */}
          <div className="lg:col-span-1 relative overflow-hidden rounded-2xl p-px bg-gradient-to-b from-[#A9A3C2]/20 to-[#A9A3C2]/5">
            <div
              className="relative h-full rounded-[15px] bg-[#0A0118] p-6 flex flex-col justify-between"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 100%), #0A0118",
              }}
            >
              <div>
                <div
                  className="mb-4 h-[56px] w-[56px] rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(ellipse at 100% 0%, rgba(133, 102, 255, 0.32) 0%, rgba(133, 102, 255, 0) 100%), linear-gradient(135deg, rgba(186, 179, 255, 0) 26%, rgba(186, 179, 255, 0.32) 89%)",
                  }}
                >
                  {/* Placeholder icon: Component 1 from card 5 */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.75 11.75H8.25M15.75 15.75H8.25M10.5 7.75H8.25M15.75 7.75H13.5M4.5 19.5V4.5C4.5 4.08579 4.83579 3.75 5.25 3.75H18.75C19.1642 3.75 19.5 4.08579 19.5 4.5V19.5C19.5 19.9142 19.1642 20.25 18.75 20.25H5.25C4.83579 20.25 4.5 19.9142 4.5 19.5Z"
                      stroke="rgba(129, 123, 142, 0.16)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3
                  className="mb-2 text-lg font-medium text-white"
                  style={{
                    fontFamily: "'Roboto', sans-serif",
                    letterSpacing: "-2%",
                  }}
                >
                  {" "}
                  {/* Font differs here */}
                  Organize Data & Export
                </h3>
                {/* No description text in Figma for this card */}
              </div>
              {/* No bottom content/image placeholder in Figma for this card */}
            </div>
            <div
              className="absolute inset-0 rounded-2xl z-[-1] opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse at bottom, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%), radial-gradient(ellipse at bottom, rgba(133, 102, 255, 0.05) 0%, rgba(133, 102, 255, 0) 100%)",
              }}
            ></div>
          </div>
        </div>
      </section>
      {/* --- End of Unified Compute Section --- */}
      {/* --- Start of Magical Features Section --- */}
      <section className="relative z-10 mt-24 mb-20 flex w-full max-w-7xl flex-col items-center px-4">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-4 rounded-full border border-white/5 bg-white/5 px-4 py-1">
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-white">
              aqua usps
            </span>
          </div>
          <h2
            className="mb-6 max-w-xl text-5xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 leading-tight"
            style={{ fontFamily: "'ES Rebond Grotesque', sans-serif" }}
          >
            Magical features to help you deploy faster
          </h2>
        </div>

        {/* Feature Cards Grid (complex layout - needs precise grid/flex setup) */}
        {/* Approximating with a 3-column grid */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Cost Efficiency */}
          <div className="lg:col-span-1 relative overflow-hidden rounded-xl p-px bg-gradient-to-br from-[#A9A3C2]/30 to-[#A9A3C2]/5">
            <div className="relative h-full rounded-[11px] bg-[#0A0118] p-6 flex flex-col items-center text-center">
              {/* Placeholder visual - needs complex image layering */}
              <div className="mb-4 h-[150px] w-[150px] relative">
                <Image
                  src="/images/feature1_alt36.png"
                  layout="fill"
                  objectFit="contain"
                  alt=""
                />
                <Image
                  src="/images/feature1_alt35.png"
                  layout="fill"
                  objectFit="contain"
                  alt=""
                  className="opacity-80"
                />
              </div>
              <h3
                className="text-xl font-medium text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
                style={{
                  fontFamily: "'Inter V', sans-serif",
                  letterSpacing: "-2%",
                }}
              >
                Upto 90% Cost Efficiency
              </h3>
            </div>
          </div>

          {/* Card 2: GPU Credits? (Placeholder visual) */}
          <div className="lg:col-span-1 relative overflow-hidden rounded-xl p-px bg-gradient-to-tl from-[#A9A3C2]/30 to-[#A9A3C2]/5">
            <div className="relative h-full rounded-[11px] bg-[#0A0118] p-6 flex flex-col items-center text-center">
              {/* Placeholder visual - needs complex image layering */}
              <div className="mb-4 h-[150px] w-[150px] relative">
                <Image
                  src="/images/feature2_alt39.png"
                  layout="fill"
                  objectFit="contain"
                  alt=""
                />
                <Image
                  src="/images/feature2_alt40.png"
                  layout="fill"
                  objectFit="contain"
                  alt=""
                  className="opacity-80"
                />
                {/* Tiled gradient overlay - complex */}
              </div>
              {/* No Title Text? */}
            </div>
          </div>

          {/* Card 3: Global Unified Infrastructure */}
          <div className="lg:col-span-1 relative overflow-hidden rounded-xl p-px bg-gradient-to-b from-[#A9A3C2]/20 to-[#A9A3C2]/5">
            <div
              className="relative h-full rounded-[11px] bg-[#0A0118] overflow-hidden p-6 flex flex-col items-start text-left"
              style={{
                background:
                  "linear-gradient(180deg, rgba(11, 2, 23, 0) 22.69%, rgba(22, 9, 42, 0.5) 100%), #0A0118",
              }}
            >
              {/* Placeholder visual - very complex layering */}
              <div className="absolute inset-0 z-0 opacity-50">
                <Image
                  src="/images/feature3_image.png"
                  layout="fill"
                  objectFit="cover"
                  alt=""
                />
                {/* Add many concentric circles, gradients, blurs */}
              </div>
              <div className="relative z-10 mt-auto">
                <h3
                  className="text-2xl font-normal text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 leading-tight mb-0"
                  style={{
                    fontFamily: "'Inter V', sans-serif",
                    letterSpacing: "-1.6%",
                  }}
                >
                  Global Unified
                  <br />
                  Infrastructure
                </h3>
              </div>
            </div>
          </div>

          {/* Card 4: Flexible Payment Options */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-xl p-px bg-gradient-to-b from-[#A9A3C2]/20 to-[#A9A3C2]/5">
            <div className="relative h-full rounded-[11px] bg-[#0A0118] p-6 flex flex-col items-center text-center">
              {/* Placeholder visual - complex image layering */}
              <div className="mb-4 h-[150px] w-full relative">
                <Image
                  src="/images/feature4_alt31.png"
                  layout="fill"
                  objectFit="contain"
                  alt=""
                />
                <Image
                  src="/images/feature4_alt32.png"
                  layout="fill"
                  objectFit="contain"
                  alt=""
                  className="opacity-50"
                />
                {/* Multiple masks needed here */}
              </div>
              <h3
                className="text-2xl font-normal text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
                style={{
                  fontFamily: "'Inter V', sans-serif",
                  letterSpacing: "-2%",
                }}
              >
                Flexible Payment Options of Crypto & Fiat
              </h3>
            </div>
          </div>

          {/* Card 5: Aggregation/Orchestration (Placeholder visual) */}
          <div className="lg:col-span-1 relative overflow-hidden rounded-xl p-px bg-gradient-to-bl from-[#A9A3C2]/30 to-[#A9A3C2]/5">
            <div
              className="relative h-full rounded-[11px] bg-[#0A0118] p-6 flex flex-col items-center text-center"
              style={{
                background:
                  "linear-gradient(180deg, rgba(11, 2, 23, 0) 22.69%, rgba(22, 9, 42, 0.5) 100%), #0A0118",
              }}
            >
              {/* Placeholder visual - complex layering and floating elements */}
              <div className="mb-4 h-[150px] w-[150px] relative">
                <Image
                  src="/images/feature5_alt41.png"
                  layout="fill"
                  objectFit="contain"
                  alt=""
                  className="blur-sm"
                />
                <Image
                  src="/images/feature5_alt42.png"
                  layout="fill"
                  objectFit="contain"
                  alt=""
                  className="blur-sm"
                />
                {/* Needs floating text boxes: Aggregation & Orchestration */}
              </div>
              {/* No Title Text? */}
            </div>
          </div>
        </div>
      </section>
      {/* --- End of Magical Features Section --- */}
      {/* --- Start of CTA Section --- */}
      <section className="relative z-10 my-20 w-full flex justify-center px-4">
        <div
          className="relative w-full max-w-5xl rounded-3xl overflow-hidden p-16 text-center"
          style={{
            backgroundImage: "url(/images/cta_background_tile.png)",
            backgroundSize: "auto",
            backgroundRepeat: "repeat",
          }}
        >
          {/* Background Masks from Section 1 - Reuse with adjusted positioning/opacity */}
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute top-0 left-0 w-1/2 h-1/2">
              <Image
                src="/images/mask2.png"
                layout="fill"
                objectFit="contain"
                alt=""
              />
            </div>
            <div className="absolute bottom-0 right-0 w-1/3 h-1/3">
              <Image
                src="/images/mask3.png"
                layout="fill"
                objectFit="contain"
                alt=""
              />
            </div>
            {/* Add more masks (mask4, mask5, mask6) similarly */}
          </div>

          {/* Central Image */}
          <div className="absolute -bottom-1/4 left-1/2 -translate-x-1/2 w-3/4 h-3/4 z-10 opacity-80">
            <Image
              src="/images/cta_image.png"
              layout="fill"
              objectFit="contain"
              alt=""
            />
          </div>

          {/* Content */}
          <div className="relative z-20 flex flex-col items-center">
            <h2
              className="mb-4 max-w-xl text-5xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 leading-tight"
              style={{ fontFamily: "'ES Rebond Grotesque', sans-serif" }}
            >
              Take Control of Your Compute
            </h2>
            <p className="mb-8 max-w-lg text-lg text-[#9B96B0] leading-normal">
              Get started with Aquanode and get the best computation rates in
              the industry
            </p>

            {/* Email Form */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative rounded-full p-px backdrop-blur-[4px] bg-white/5">
                <div className="relative rounded-full border border-white/10 overflow-hidden">
                  <input
                    type="email"
                    placeholder="Enter your Email"
                    className="bg-transparent text-white placeholder:text-white/30 px-6 py-3 w-full sm:w-80 focus:outline-none text-sm"
                  />
                </div>
              </div>
              <div className="relative rounded-full p-px backdrop-blur-[4px]">
                <button
                  className="rounded-full bg-gradient-radial from-white/25 to-white/0 px-6 py-3 text-sm font-medium text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white/30 to-white border border-white/10 hover:opacity-90 transition-opacity"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 315%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 100%), rgba(255, 255, 255, 0.04)",
                  }}
                >
                  Try Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* --- End of CTA Section --- */}
      {/* Decorative Mask Images (Absolute positioned) - Keep these at the end */}
      <div className="absolute top-10 right-20 w-40 h-40 opacity-30 z-[-1]">
        <Image
          src="/images/mask1.png"
          layout="fill"
          objectFit="contain"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#B7A4FB]/0 via-[#B7A4FB]/80 to-[#8562FF]/0 opacity-50"></div>
      </div>
      <div className="absolute bottom-20 left-10 w-60 h-60 opacity-20 z-[-1]">
        <Image
          src="/images/mask2.png"
          layout="fill"
          objectFit="contain"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#B7A4FB]/0 via-[#B7A4FB]/50 to-[#8562FF]/0 opacity-50"></div>
      </div>
      {/* Add other mask images similarly with appropriate positions */}
      {/* --- Start Footer --- */}
      <footer className="relative z-10 w-full bg-gradient-radial from-[#8566FF]/5 to-[#8566FF]/0 pt-16 pb-8">
        <div className="w-full max-w-7xl mx-auto px-4">
          {/* Top Part: Logo, Links, Get in Touch */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
            {/* Logo & Description (Col 1-2) */}
            <div className="md:col-span-2 lg:col-span-2">
              {/* Logo */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex flex-col space-y-0.5">
                  <div className="h-1 w-9 bg-white"></div>
                  <div className="h-1 w-9 bg-white"></div>
                  <div className="h-1 w-9 bg-white"></div>
                  <div className="h-1 w-9 bg-white"></div>
                </div>
                <span
                  className="font-bold text-2xl text-white"
                  style={{ fontFamily: "'ES Rebond Grotesque', sans-serif" }}
                >
                  Aquanode
                </span>
              </div>
              <p
                className="text-base text-[#9B96B0]/80 pr-8"
                style={{ fontFamily: "'Inter V', sans-serif" }}
              >
                The World's Largest Compute Ecosystem
              </p>
            </div>

            {/* Platform Links (Col 3) */}
            <div className="md:col-span-1 lg:col-span-1">
              <h4
                className="text-sm font-medium text-[#D2D0DD] mb-4"
                style={{ fontFamily: "'Inter V', sans-serif" }}
              >
                Platform
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm text-[#9B96B0] hover:text-white transition-colors"
                    style={{ fontFamily: "'Inter V', sans-serif" }}
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-[#9B96B0] hover:text-white transition-colors"
                    style={{ fontFamily: "'Inter V', sans-serif" }}
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-[#9B96B0] hover:text-white transition-colors"
                    style={{ fontFamily: "'Inter V', sans-serif" }}
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-[#9B96B0] hover:text-white transition-colors"
                    style={{ fontFamily: "'Inter V', sans-serif" }}
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Placeholder Links (Col 4) - Add more columns if needed */}
            {/* <div className="md:col-span-1 lg:col-span-1">
                     <h4 className="text-sm font-medium text-[#D2D0DD] mb-4">Column 2</h4> 
                     <ul className="space-y-3"> 
                         <li><a href="#" className="text-sm text-[#9B96B0] hover:text-white">Link 5</a></li> 
                     </ul> 
                 </div> */}

            {/* Get in Touch Card (Col 5-6) */}
            <div className="md:col-span-4 lg:col-span-2">
              <div className="relative overflow-hidden rounded-2xl p-px bg-gradient-to-b from-[#A9A3C2]/20 to-[#A9A3C2]/5">
                <div
                  className="relative rounded-[15px] bg-[#0A0118] p-6"
                  style={{
                    background:
                      "radial-gradient(ellipse at top, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%), #0A0118",
                  }}
                >
                  {/* Background Grid Visual */}
                  <div className="absolute inset-0 opacity-10 z-0">
                    {/* Simplified Grid SVG - Replace with actual multi-part SVG */}
                    <svg
                      width="100%"
                      height="100%"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <pattern
                          id="smallGrid"
                          width="10"
                          height="10"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M 10 0 L 0 0 0 10"
                            fill="none"
                            stroke="rgba(255,255,255,0.5)"
                            strokeWidth="0.5"
                          />
                        </pattern>
                        <pattern
                          id="grid"
                          width="50"
                          height="50"
                          patternUnits="userSpaceOnUse"
                        >
                          <rect width="50" height="50" fill="url(#smallGrid)" />
                          <path
                            d="M 50 0 L 0 0 0 50"
                            fill="none"
                            stroke="rgba(255,255,255,0.7)"
                            strokeWidth="1"
                          />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>
                  <div className="relative z-10">
                    <h4
                      className="text-lg font-bold text-white mb-2"
                      style={{
                        fontFamily: "'ES Rebond Grotesque', sans-serif",
                      }}
                    >
                      Get in touch
                    </h4>
                    <p
                      className="text-sm text-[#9B96B0]"
                      style={{ fontFamily: "'Inter V', sans-serif" }}
                    >
                      999 Some Sample Office Address, Delhi NCR, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Part: Copyright and Social Links */}
          <div className="border-t border-[#A9A3C2]/25 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p
              className="text-sm text-[#9B96B0] mb-4 md:mb-0"
              style={{ fontFamily: "'Inter V', sans-serif" }}
            >
              ©2025 Aquanode. All rights reserved.
            </p>
            <div className="flex space-x-4">
              {/* Replace with actual icons using Image or SVG component */}
              <a href="#" className="text-[#9B96B0] hover:text-white">
                <Image
                  src="/images/icon_instagram.svg"
                  width={20}
                  height={20}
                  alt="Instagram"
                />
              </a>
              <a href="#" className="text-[#9B96B0] hover:text-white">
                <Image
                  src="/images/icon_youtube.svg"
                  width={20}
                  height={20}
                  alt="YouTube"
                />
              </a>
              <a href="#" className="text-[#9B96B0] hover:text-white">
                <Image
                  src="/images/icon_linkedin_fg.svg"
                  width={20}
                  height={20}
                  alt="LinkedIn"
                />
              </a>{" "}
              {/* Simplified LinkedIn */}
              <a href="#" className="text-[#9B96B0] hover:text-white">
                <Image
                  src="/images/icon_twitter.svg"
                  width={20}
                  height={20}
                  alt="Twitter"
                />
              </a>
              <a href="#" className="text-[#9B96B0] hover:text-white">
                <Image
                  src="/images/icon_discord_fg.svg"
                  width={20}
                  height={20}
                  alt="Discord"
                />
              </a>{" "}
              {/* Simplified Discord */}
            </div>
          </div>
        </div>
      </footer>
      {/* --- End Footer --- */}
    </div>
  );
};

export default HomePage;
