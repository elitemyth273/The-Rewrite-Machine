import { Sparkles } from "lucide-react";

const Logo = ({ size = "default" }: { size?: "small" | "default" | "large" }) => {
  const sizes = {
    small: "text-xl",
    default: "text-2xl",
    large: "text-4xl"
  };
  
  return (
    <div className="flex items-center gap-2">
      <Sparkles className={`${size === "small" ? "w-5 h-5" : size === "large" ? "w-8 h-8" : "w-6 h-6"} text-primary`} />
      <span className={`${sizes[size]} font-display font-bold gradient-text`}>
        The Rewrite Machine
      </span>
    </div>
  );
};

export default Logo;