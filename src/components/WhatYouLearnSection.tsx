import { CheckCircle2 } from "lucide-react";

const learningCategories = [
  {
    title: "Core AI Tooling",
    items: [
      "Master 40+ Productivity Tools (ChatGPT, Gemini, Claude, Copilot)",
      "Prompt Engineering Mastery",
      "AI automation & workflow building"
    ]
  },
  {
    title: "Applied Creativity",
    items: [
      "Website building without coding",
      "AI design & branding",
      "AI video creation",
      "Create Ads for multiple industries"
    ]
  },
  {
    title: "Business & Career",
    items: [
      "AI for business growth & marketing",
      "AI for finance, HR, sales, operations",
      "AI tools for study & competitive exams",
      "Freelancing & AI income growth"
    ]
  }
];

const WhatYouLearnSection = () => {
  return (
    <section className="enterprise-section bg-brand-ink text-white">
      <div className="enterprise-container">
        
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8">
          
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32">
              <h2 className="text-section-title mb-6 text-white tracking-tight">
                A curriculum built for real-world impact.
              </h2>
              <p className="text-subheading text-white/70 mb-8 max-w-md">
                We've distilled thousands of hours of AI experimentation into a practical, actionable framework that you can apply immediately.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-12">
            {learningCategories.map((category, idx) => (
              <div key={idx} className="border-t border-white/20 pt-8">
                <div className="flex items-baseline gap-4 mb-8">
                  <span className="text-primary font-mono text-sm tracking-widest">0{idx + 1}</span>
                  <h3 className="text-2xl md:text-[32px] font-medium tracking-tight">{category.title}</h3>
                </div>
                <ul className="flex flex-col gap-6">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-4 group">
                      <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-lg text-white/80 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhatYouLearnSection;
