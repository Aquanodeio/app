export const GradientText = ({ children }: { children: React.ReactNode }) => {
  return (
    <span
      className="text-[14] font-medium leading-[24px] tracking-[-0.14px]"
      style={{
        fontFamily: "var(--font-roboto)",
        background: `linear-gradient(180deg, rgba(255, 255, 255, 0.3) 8.85%, rgba(255, 255, 255, 1) 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
};
