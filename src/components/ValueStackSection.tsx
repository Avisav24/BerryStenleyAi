import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Gift } from "lucide-react";

interface ValueStackSectionProps {
  onRegisterClick?: () => void;
}

const mainBenefits = [
  "3 hrs Fast-Track Professional AI Course",
  "250-400 AI tools mastery training",
  "Assignments & real project implementation",
  "AI Exam & Study automation tools",
  "Gold Expert Certification (For resume, LinkedIn, interviews)",
  "Lifetime Resource Hub + AI Library",
  "AI Internship Support",
  "AI Freelancing & Income Blueprint",
  "Career roadmaps",
  "VIP AI Mastermind Community",
  "Business Collaboration Platform Access",
  "Priority Alumni Status",
  "Productivity Tools & Study Booster Package",
];

const bonuses = [
  "Connect with founders, CEOs, recruiters",
  "Collaboration & freelancing marketplace",
  "AI Business Proposals",
  "AI Study & Exam Preparation Prompts",
  "AI Sales Script Pack",
  "AI Email Templates Pack",
  "AI YouTube Scripts",
  "AI Ad Scripts",
  "Time Management AI Templates",
  "Student Study Automation Templates",
  "Competitive Exams AI Smart-learning Tools",
];

const ValueStackSection = ({ onRegisterClick }: ValueStackSectionProps) => {
  return (
    <section className="py-20 bg-secondary/30 border-b border-border">
      <div className="container mx-auto px-6 max-w-[1366px]">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[4px] bg-white border border-border mb-6">
              <Gift className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Exclusive Offer</span>
            </div>
            <h2 className="text-page-title mb-4 tracking-tight text-foreground">
              Get ₹3,49,000 Worth of Value
            </h2>
            <p className="text-subheading text-muted-foreground">
              Included Today Only at <strong className="text-primary font-semibold">₹99</strong>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Main Benefits */}
            <div className="enterprise-card p-8 bg-white text-left shadow-sm">
              <h3 className="text-body font-semibold mb-6 text-foreground border-b border-border pb-4">
                What's Included
              </h3>
              <div className="space-y-4">
                {mainBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bonuses */}
            <div className="enterprise-card p-8 bg-secondary text-left shadow-sm">
              <h3 className="text-body font-semibold mb-6 text-foreground border-b border-border pb-4">
                11 Exclusive Bonuses
              </h3>
              <div className="space-y-4">
                {bonuses.map((bonus, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-[4px] bg-white text-primary text-xs font-semibold flex items-center justify-center">
                      B{index + 1}
                    </span>
                    <span className="text-sm text-foreground mt-1">{bonus}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="text-center p-8 rounded-[16px] bg-white border border-border max-w-2xl mx-auto shadow-sm">
            <div className="mb-6 flex items-baseline justify-center gap-4">
              <span className="text-2xl text-muted-foreground line-through">₹2,999</span>
              <span className="text-6xl font-display font-bold text-primary tabular-nums tracking-tight">₹99</span>
            </div>
            
            <Button 
              size="lg" 
              className="w-full sm:w-auto px-12 rounded-[4px] mb-4" 
              onClick={onRegisterClick}
            >
              <span className="text-base font-semibold">
                Secure Your Spot Now
              </span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <p className="text-sm text-muted-foreground font-medium mt-4">
              Money Back Guarantee: Full refund if not satisfied.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueStackSection;
