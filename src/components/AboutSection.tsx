import { Globe, Brain, Target, Users, Briefcase } from "lucide-react";

const highlights = [
  { icon: Globe, text: "Global standard learning" },
  { icon: Brain, text: "Learn 250-400 AI skills in 1 month" },
  { icon: Target, text: "100% practical & implementation-based" },
  { icon: Users, text: "Mentoring by Industry Leaders" },
  { icon: Briefcase, text: "Resume + Portfolio + AI Projects + Placement Support" },
];

const AboutSection = () => {
  return (
    <section className="py-20 bg-background border-b border-border">
      <div className="container mx-auto px-6 max-w-[1366px]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-section-title text-foreground tracking-tight">
              About Berry Stenley AI Academy
            </h2>
          </div>

          <div className="enterprise-card p-8 md:p-12">
            <p className="text-lg text-foreground/90 leading-relaxed mb-8 text-center">
              <strong className="font-semibold">Berry Stenley AI Academy</strong> (subsidiary of Berry Stenley Pvt. Ltd., HQ New Delhi) is a world-class AI learning institute empowering students & professionals to master practical, industry-relevant AI skills.
            </p>
            
            <div className="p-6 rounded-[8px] bg-secondary border border-border text-center mb-10">
              <p className="text-xl font-display font-semibold text-primary tracking-tight">
                We don't teach theory — We make you job-ready.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-[8px] border border-border bg-white"
                >
                  <div className="p-3 rounded-[4px] bg-secondary shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
