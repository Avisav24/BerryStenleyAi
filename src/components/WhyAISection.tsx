import { AlertTriangle, Clock, TrendingUp, AlertCircle } from "lucide-react";

const WhyAISection = () => {
  return (
    <section className="enterprise-section bg-white border-b border-border">
      <div className="enterprise-container">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Sticky Left Content */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 mb-8">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span className="text-xs font-semibold uppercase tracking-wider text-red-600">Market Shift Alert</span>
              </div>
              
              <h2 className="text-page-title text-brand-ink mb-6">
                Why AI skills are essential in 2025.
              </h2>
              
              <p className="text-subheading text-muted-foreground mb-8">
                AI is reshaping the workforce globally. Analysts project that within 3 years, 80% of enterprise roles will require fundamental AI literacy.
              </p>
            </div>
          </div>

          {/* Scrolling Right Content: Editorial Blocks */}
          <div className="lg:col-span-7 flex flex-col gap-12">
            
            <div className="bg-brand-cloud rounded-[16px] p-8 md:p-12 border border-border/50 transition-colors hover:border-primary/30 group">
              <div className="mb-12">
                <Clock className="h-8 w-8 text-brand-ink mb-6 group-hover:text-primary transition-colors" />
                <h3 className="text-[28px] font-medium tracking-tight text-brand-ink mb-4">Time Sensitivity</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Every day delayed is an opportunity cost in a rapidly evolving market. Organizations are actively replacing legacy workflows, and professionals lacking AI skills risk reduced competitiveness.
                </p>
              </div>
              <div className="h-48 w-full bg-white rounded-[8px] border border-border/60 flex items-center justify-center overflow-hidden">
                <div className="w-full max-w-sm h-32 bg-secondary rounded flex flex-col gap-3 p-4">
                  <div className="h-4 w-1/3 bg-brand-charcoal/20 rounded" />
                  <div className="h-2 w-full bg-brand-charcoal/10 rounded" />
                  <div className="h-2 w-5/6 bg-brand-charcoal/10 rounded" />
                  <div className="h-2 w-4/6 bg-brand-charcoal/10 rounded" />
                </div>
              </div>
            </div>

            <div className="bg-brand-ink rounded-[16px] p-8 md:p-12 border border-brand-ink transition-colors hover:border-primary/50 group">
              <div className="mb-12">
                <AlertCircle className="h-8 w-8 text-white mb-6 group-hover:text-primary transition-colors" />
                <h3 className="text-[28px] font-medium tracking-tight text-white mb-4">Role Obsolescence</h3>
                <p className="text-lg text-white/70 leading-relaxed">
                  Hundreds of traditional job functions are being automated. Upskilling mitigates this risk by elevating you from a task-executor to an AI-manager.
                </p>
              </div>
              <div className="h-48 w-full bg-brand-charcoal/30 rounded-[8px] border border-white/10 flex items-center justify-center overflow-hidden">
                <div className="w-full max-w-sm flex items-end justify-center gap-4 h-32">
                  <div className="w-12 bg-red-500/80 rounded-t h-1/4" />
                  <div className="w-12 bg-orange-400/80 rounded-t h-2/4" />
                  <div className="w-12 bg-primary rounded-t h-full" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyAISection;
