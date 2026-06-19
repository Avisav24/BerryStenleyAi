import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";

interface FinalCTASectionProps {
  onRegisterClick?: () => void;
}

const FinalCTASection = ({ onRegisterClick }: FinalCTASectionProps) => {
  return (
    <section className="py-32 px-6 bg-brand-cloud">
      <div className="container mx-auto max-w-[1366px]">
        
        <div className="relative bg-primary rounded-[24px] overflow-hidden shadow-2xl">
          {/* Subtle Abstract Shapes */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] rounded-full bg-white/5 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-[60px] pointer-events-none" />

          <div className="relative z-10 px-6 py-24 md:py-32 text-center flex flex-col items-center">
            
            <h2 className="text-[48px] md:text-[64px] lg:text-[80px] font-medium tracking-tight text-white mb-8 leading-[1.1] max-w-4xl">
              Your turn to scale <br className="hidden md:block" />
              10x faster.
            </h2>

            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl font-normal leading-relaxed">
              Don't let the AI revolution pass you by. Join thousands of professionals future-proofing their careers today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
              <Button 
                size="xl" 
                className="w-full sm:w-auto px-10 bg-white text-brand-ink hover:bg-brand-cloud rounded-[8px] text-lg font-medium" 
                onClick={onRegisterClick}
              >
                <span>Join the Workshop — ₹99</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                className="w-full sm:w-auto px-10 rounded-[8px] border-white/20 text-white hover:bg-white/10 hover:text-white text-lg font-medium"
              >
                Download Brochure
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <p className="text-sm text-white/60 font-medium">
              100% Money Back Guarantee. Full refund if not satisfied. No questions asked.
            </p>
            
          </div>
        </div>

      </div>
    </section>
  );
};

export default FinalCTASection;
