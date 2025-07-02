import { Button } from "@/components/ui/button";

interface SocialLoginButtonProps {
  Icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export default function SocialLoginButton({
  Icon,
  label,
  onClick,
}: SocialLoginButtonProps) {
  return (
    <Button
      type="button"
      variant={"outline"}
      size={"xl"}
      className="btn-secondary btn-lg w-full flex items-center justify-center gap-2"
      onClick={onClick}
    >
      {Icon}
      {label}
    </Button>
  );
}
