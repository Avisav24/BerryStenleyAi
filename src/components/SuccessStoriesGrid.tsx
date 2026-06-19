import { Briefcase, GraduationCap, TrendingUp } from "lucide-react";

const stories = [
  {
    icon: Briefcase,
    title: "Corporate AI Usage",
    description: "Professionals using AI to automate workflows",
    quote: "I saved 15 hours a week using the exact automations taught here.",
    author: "Sarah J., Product Manager"
  },
  {
    icon: GraduationCap,
    title: "Student Exam Success",
    description: "Students excelling in competitive exams with AI",
    quote: "Helped me synthesize 100s of research papers in hours.",
    author: "David K., PhD Candidate"
  },
  {
    icon: TrendingUp,
    title: "Entrepreneurs Scaling",
    description: "Business owners growing 10x with AI tools",
    quote: "We replaced our entire legacy CRM workflow with AI agents.",
    author: "Elena R., Founder"
  }
];

const SuccessStoriesGrid = () => {
  return (
    <section className="enterprise-section bg-white border-b border-border">
      <div className="enterprise-container">
        
        <div className="mb-16 max-w-2xl">
          <h2 className="text-section-title text-brand-ink mb-4">
            Real outcomes, not just theory.
          </h2>
          <p className="text-subheading text-muted-foreground">
            See how professionals are actually applying these skills to accelerate their careers and businesses.
          </p>
        </div>

        {/* Featured / Masonry Layout */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Featured Large Card */}
          <div className="lg:col-span-7 bg-brand-cloud rounded-[16px] p-8 md:p-12 flex flex-col justify-between">
            <div className="mb-12">
              <TrendingUp className="h-8 w-8 text-primary mb-8" />
              <p className="text-[24px] md:text-[32px] font-medium leading-[1.3] text-brand-ink mb-8">
                "We replaced our entire legacy CRM workflow with AI agents. It didn't just save money—it completely changed how fast we can scale."
              </p>
              <div>
                <p className="font-semibold text-brand-ink">Elena R.</p>
                <p className="text-muted-foreground text-sm">Founder & CEO</p>
              </div>
            </div>
            <div className="pt-8 border-t border-border flex justify-between items-center text-sm font-medium text-muted-foreground">
              <span>Entrepreneurs Scaling</span>
              <span>10x Growth</span>
            </div>
          </div>

          {/* Secondary Stacked Cards */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            <div className="flex-1 bg-white border border-border/60 rounded-[16px] p-8 flex flex-col justify-between shadow-sm">
              <div>
                <Briefcase className="h-6 w-6 text-brand-charcoal mb-6" />
                <p className="text-[18px] leading-relaxed text-brand-ink mb-6">
                  "I saved 15 hours a week using the exact automations taught here."
                </p>
                <div>
                  <p className="font-semibold text-brand-ink text-sm">Sarah J.</p>
                  <p className="text-muted-foreground text-xs">Product Manager</p>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-brand-ink text-white rounded-[16px] p-8 flex flex-col justify-between shadow-sm">
              <div>
                <GraduationCap className="h-6 w-6 text-white/60 mb-6" />
                <p className="text-[18px] leading-relaxed text-white mb-6">
                  "Helped me synthesize 100s of research papers in hours instead of weeks."
                </p>
                <div>
                  <p className="font-semibold text-white text-sm">David K.</p>
                  <p className="text-white/60 text-xs">PhD Candidate</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesGrid;
