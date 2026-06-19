import { Bot, Globe, Megaphone, BookOpen, Workflow, TrendingUp, DollarSign, Sparkles, Video, Palette, Briefcase } from "lucide-react";

const learningItems = [
  { icon: Bot, text: "40 AI Productivity tools (ChatGPT, Gemini, Claude, Copilot etc.)" },
  { icon: Globe, text: "Website building without coding" },
  { icon: Megaphone, text: "Create Ads for multiple industries" },
  { icon: BookOpen, text: "AI tools for study & competitive exams" },
  { icon: Workflow, text: "AI automation & workflow building" },
  { icon: TrendingUp, text: "AI for business growth & marketing" },
  { icon: DollarSign, text: "AI for finance, HR, sales, operations" },
  { icon: Sparkles, text: "Prompt Engineering Mastery" },
  { icon: Video, text: "AI video creation" },
  { icon: Palette, text: "AI design & branding" },
  { icon: Briefcase, text: "Freelancing & AI income growth" },
];

const WhatYouLearnSection = () => {
  return (
    <section className="py-20 bg-background border-b border-border">
      <div className="container mx-auto px-6 max-w-[1366px]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-section-title text-foreground tracking-tight">
              What You Will Learn
            </h2>
            <p className="text-subheading text-muted-foreground max-w-2xl mx-auto">
              Comprehensive AI curriculum designed to transform you into an industry-ready professional.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningItems.map((item, index) => (
              <div
                key={index}
                className="enterprise-card p-6 flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-[8px] bg-secondary flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground leading-relaxed mt-2">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatYouLearnSection;
