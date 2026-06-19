import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Gift, Clock, ArrowRight } from "lucide-react";

interface FOMOSectionProps {
  onRegisterClick?: () => void;
}

const FOMOSection = ({ onRegisterClick }: FOMOSectionProps) => {
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 3600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return { mins: mins.toString().padStart(2, "0"), secs: secs.toString().padStart(2, "0") };
  };

  const time = formatTime(timeLeft);

  return (
    <section className="py-20 bg-background border-b border-border">
      <div className="container mx-auto px-6 max-w-[1366px]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[4px] bg-[#FEF2F2] border border-[#FECACA] mb-6">
              <AlertTriangle className="h-4 w-4 text-[#DC2626]" />
              <span className="text-sm font-semibold uppercase tracking-wider text-[#DC2626]">Urgent Action Required</span>
            </div>
            <h2 className="text-page-title tracking-tight text-foreground mb-4">
              Why You Should Register Today
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="enterprise-card p-8 bg-white border-t-4 border-t-[#DC2626]">
              <h3 className="text-body font-semibold mb-6 text-[#DC2626] flex items-center gap-2 border-b border-border pb-4">
                <AlertTriangle className="h-5 w-5" />
                Cost of Delay
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="text-[#DC2626] flex-shrink-0 mt-0.5">✕</span>
                  Loss of competitive advantage in the job market
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="text-[#DC2626] flex-shrink-0 mt-0.5">✕</span>
                  Stagnant salary growth
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="text-[#DC2626] flex-shrink-0 mt-0.5">✕</span>
                  Missed business scaling opportunities
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="text-[#DC2626] flex-shrink-0 mt-0.5">✕</span>
                  Forfeiting ₹3,49,000 worth of bonuses
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="text-[#DC2626] flex-shrink-0 mt-0.5">✕</span>
                  Missing expert mentorship access
                </li>
              </ul>
            </div>

            <div className="enterprise-card p-8 bg-white border-t-4 border-t-[#059669]">
              <h3 className="text-body font-semibold mb-6 text-[#059669] flex items-center gap-2 border-b border-border pb-4">
                <Gift className="h-5 w-5" />
                Immediate Benefits
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="text-[#059669] flex-shrink-0 mt-0.5">✓</span>
                  ₹3,49,000 worth of exclusive bonuses included
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="text-[#059669] flex-shrink-0 mt-0.5">✓</span>
                  Master 300+ job-ready AI skills immediately
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="text-[#059669] flex-shrink-0 mt-0.5">✓</span>
                  Gain a definitive edge over competitors
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="text-[#059669] flex-shrink-0 mt-0.5">✓</span>
                  Lifetime access to the alumni community
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="text-[#059669] flex-shrink-0 mt-0.5">✓</span>
                  Certification and placement assistance
                </li>
              </ul>
            </div>
          </div>

          {/* Timer Container */}
          <div className="text-center p-8 rounded-[16px] bg-secondary/30 border border-border">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold uppercase tracking-wider text-foreground">Current Offer Expires In</span>
            </div>
            <div className="flex justify-center gap-6 mb-8">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-[8px] bg-white border border-border flex items-center justify-center shadow-sm">
                  <span className="text-4xl font-display font-bold text-primary tabular-nums">{time.mins}</span>
                </div>
                <span className="text-xs uppercase tracking-widest text-muted-foreground mt-3 font-semibold">Minutes</span>
              </div>
              <div className="text-4xl font-bold text-muted-foreground pt-4">:</div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-[8px] bg-white border border-border flex items-center justify-center shadow-sm">
                  <span className="text-4xl font-display font-bold text-primary tabular-nums">{time.secs}</span>
                </div>
                <span className="text-xs uppercase tracking-widest text-muted-foreground mt-3 font-semibold">Seconds</span>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="w-full sm:w-auto px-12 rounded-[4px] mb-4" 
              onClick={onRegisterClick}
            >
              <span className="text-base font-semibold">
                Enroll Before Deadline
              </span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <p className="text-sm text-muted-foreground font-medium mt-4">
              Money Back Guarantee: Full refund if not satisfied. No questions asked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FOMOSection;
