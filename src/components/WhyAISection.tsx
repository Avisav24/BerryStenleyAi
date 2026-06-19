import { AlertTriangle, Clock, TrendingUp, AlertCircle } from "lucide-react";

const WhyAISection = () => {
  return (
    <section className="py-20 bg-secondary/30 border-b border-border">
      <div className="container mx-auto px-6 max-w-[1366px]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[4px] bg-[#FEF2F2] border border-[#FECACA] mb-8">
            <AlertTriangle className="h-4 w-4 text-[#DC2626]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[#DC2626]">Market Shift Alert</span>
          </div>

          <h2 className="text-page-title mb-6 text-foreground tracking-tight">
            Why AI Skills are Essential in 2025
          </h2>

          <div className="p-8 rounded-[16px] bg-white border border-border shadow-sm mb-12 text-left">
            <p className="text-lg text-foreground leading-relaxed">
              AI is reshaping the workforce globally. Analysts project that within 3 years, <span className="font-semibold text-primary">80% of enterprise roles</span> will require fundamental AI literacy. Organizations are actively replacing legacy workflows, and professionals lacking AI skills risk reduced competitiveness and earning potential. Adapting now is a strategic career imperative.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="enterprise-card p-8 text-left border-t-4 border-t-[#DC2626]">
              <div className="w-12 h-12 mb-6 rounded-[8px] bg-[#FEF2F2] flex items-center justify-center">
                <Clock className="h-6 w-6 text-[#DC2626]" />
              </div>
              <h3 className="text-body font-semibold text-foreground mb-2">Time Sensitivity</h3>
              <p className="text-sm text-muted-foreground">Every day delayed is an opportunity cost in a rapidly evolving market.</p>
            </div>

            <div className="enterprise-card p-8 text-left border-t-4 border-t-primary">
              <div className="w-12 h-12 mb-6 rounded-[8px] bg-secondary flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-body font-semibold text-foreground mb-2">Role Obsolescence</h3>
              <p className="text-sm text-muted-foreground">Hundreds of traditional job functions are being automated. Upskilling mitigates this risk.</p>
            </div>

            <div className="enterprise-card p-8 text-left border-t-4 border-t-[#059669]">
              <div className="w-12 h-12 mb-6 rounded-[8px] bg-[#ECFDF5] flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-[#059669]" />
              </div>
              <h3 className="text-body font-semibold text-foreground mb-2">Value Appreciation</h3>
              <p className="text-sm text-muted-foreground">AI-proficient personnel report significantly higher salary brackets and leadership opportunities.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAISection;
