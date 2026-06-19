import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, ArrowRight } from "lucide-react";

interface FloatingElementsProps {
  onRegisterClick?: () => void;
}

const FloatingElements = ({ onRegisterClick }: FloatingElementsProps) => {
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownPopup) {
        setShowExitPopup(true);
        setHasShownPopup(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShownPopup]);

  const handleExitRegister = () => {
    setShowExitPopup(false);
    onRegisterClick?.();
  };

  return (
    <>
      {/* Floating Sticky CTA Button */}
      <div className="fixed bottom-24 right-6 z-40">
        <Button size="lg" className="shadow-lg rounded-[4px] px-6" onClick={onRegisterClick}>
          <span>Register ₹99</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919599731412"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-[4px] bg-[#25D366] flex items-center justify-center shadow-lg hover:bg-[#128C7E] transition-colors"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </a>

      {/* Exit Intent Popup */}
      {showExitPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={() => setShowExitPopup(false)}
          />
          <div className="relative max-w-md w-full p-8 rounded-[16px] bg-white border border-border shadow-modal animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowExitPopup(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center">
              <h3 className="font-display text-2xl font-semibold mb-2 text-foreground">
                Before You Go
              </h3>
              <p className="text-muted-foreground mb-6">
                Don't Miss This <span className="text-primary font-semibold">₹99 Offer</span>
              </p>
              
              <div className="bg-secondary/50 rounded-lg p-4 mb-6">
                 <p className="text-sm font-medium text-foreground">
                   Standard Price: <span className="line-through text-muted-foreground ml-1">₹2,999</span>
                 </p>
              </div>
              
              <Button size="lg" className="w-full mb-4 rounded-[4px]" onClick={handleExitRegister}>
                <span>Claim My Seat Now</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <button
                onClick={() => setShowExitPopup(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                No thanks, I'll pay full price later
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingElements;
