import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Gift, AlertCircle } from "lucide-react";

interface FinalCTASectionProps {
  onRegisterClick?: () => void;
}

const FinalCTASection = ({ onRegisterClick }: FinalCTASectionProps) => {
  return (
    <section className="py-20 bg-background border-b border-border">
      <div className="container mx-auto px-6 max-w-[1366px]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[4px] bg-[#FEF2F2] border border-[#FECACA] mb-8">
            <AlertCircle className="h-4 w-4 text-[#DC2626]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[#DC2626]">Final Call to Action</span>
          </div>

          <h2 className="text-page-title tracking-tight text-foreground mb-6">
            This is your turn to grow 10X faster
          </h2>

          <p className="text-subheading text-muted-foreground mb-8">
            If you miss it, you might regret it later. Secure your spot now.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="w-full sm:w-auto px-8" onClick={onRegisterClick}>
              <span className="font-semibold">Join The Workshop</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
              <Download className="mr-2 h-4 w-4" />
              <span className="font-medium">Download Brochure</span>
            </Button>
          </div>

          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] border border-border bg-secondary/30">
              <Gift className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Get 11 Bonus AI Tools</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground font-medium">
            Money Back Guarantee with Full Refund of Registration fee, if not satisfied. No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
