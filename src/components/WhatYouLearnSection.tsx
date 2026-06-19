import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bot, Globe, Megaphone, BookOpen, Workflow, TrendingUp, DollarSign, Sparkles, Video, Palette, Briefcase } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const learningItems = [
  { icon: Bot, text: "40 AI Productivity tools (ChatGPT, Gemini, Claude, Copilot etc.)", color: "sticky-yellow" },
  { icon: Globe, text: "Website building without coding", color: "sticky-mint" },
  { icon: Megaphone, text: "Create Ads for multiple industries", color: "sticky-pink" },
  { icon: BookOpen, text: "AI tools for study & competitive exams", color: "sticky-purple" },
  { icon: Workflow, text: "AI automation & workflow building", color: "bg-white border border-border" },
  { icon: TrendingUp, text: "AI for business growth & marketing", color: "sticky-peach" },
  { icon: DollarSign, text: "AI for finance, HR, sales, operations", color: "bg-white border border-border" },
  { icon: Sparkles, text: "Prompt Engineering Mastery", color: "sticky-yellow" },
  { icon: Video, text: "AI video creation", color: "sticky-mint" },
  { icon: Palette, text: "AI design & branding", color: "sticky-purple" },
  { icon: Briefcase, text: "Freelancing & AI income growth", color: "sticky-pink" },
];

const WhatYouLearnSection = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.learn-card');
    cards.forEach((card: any, index) => {
      // Create a slight alternating rotation for the sticky note effect
      const rotation = index % 2 === 0 ? 1 : -1;
      
      gsap.fromTo(card,
        { y: 50, opacity: 0, rotation: 0 },
        {
          y: 0, opacity: 1, rotation: rotation, duration: 0.8, ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        }
      );
    });
  }, { scope: container });

  return (
    <section ref={container} className="enterprise-section bg-secondary border-b border-border">
      <div className="enterprise-container">
        
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-border rounded-full mb-6">
            <div className="w-2 h-2 rounded-full bg-[#FFD02F]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Curriculum</span>
          </div>
          <h2 className="text-page-title text-foreground mb-6">
            What You Will Learn
          </h2>
          <p className="text-subheading text-muted-foreground">
            Comprehensive AI curriculum designed to transform you into an industry-ready professional.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {learningItems.map((item, index) => (
            <div
              key={index}
              className={`learn-card sticky-note rounded-lg p-6 flex flex-col items-start gap-4 h-full ${item.color} ${item.color.includes('bg-white') ? 'shadow-sm' : ''}`}
            >
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center mb-2">
                <item.icon className="h-5 w-5 text-foreground" />
              </div>
              <span className="text-base font-semibold text-foreground leading-relaxed">{item.text}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhatYouLearnSection;
