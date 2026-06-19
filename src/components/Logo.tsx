import logoImage from "@/assets/logo-berry-stenley.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-10 sm:h-12",
    md: "h-12 sm:h-14 md:h-16 lg:h-20",
    lg: "h-14 sm:h-16 md:h-20 lg:h-24",
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src={logoImage}
        alt="Berry Stenley Logo"
        className={`${sizeClasses[size]} w-auto object-contain bg-white rounded-md p-1 shadow-sm`}
      />
    </div>
  );
};

export default Logo;
