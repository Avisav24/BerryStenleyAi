import { useState, useEffect } from "react";
import Logo from "./Logo";

const Header = () => {
  const [timeLeft, setTimeLeft] = useState(3600);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 3600);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor(seconds % 3600 / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
      {/* Mobile Layout */}
      <div className="container mx-auto px-4 py-2 sm:hidden flex flex-col gap-2">
        <h1 className="font-display font-semibold text-center text-sm text-foreground tracking-tight">
          Berry Stenley AI Academy
        </h1>
        <div className="flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Ends In</span>
            <div className="font-display font-semibold text-sm text-primary">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </div>

      {/* Tablet/Desktop Layout */}
      <div className="hidden sm:block container mx-auto px-6 py-3 max-w-[1366px]">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <Logo size="md" />
            <div className="h-6 w-px bg-border hidden md:block"></div>
            <h1 className="font-display font-semibold text-lg tracking-tight text-foreground hidden md:block">
              Berry Stenley AI Academy
            </h1>
          </div>
          
          {/* Timer Section */}
          <div className="flex items-center gap-3 bg-secondary px-5 py-2 rounded-full border border-border">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-muted-foreground">Offer Ends In</span>
            <div className="font-display font-bold text-lg text-primary tabular-nums">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;