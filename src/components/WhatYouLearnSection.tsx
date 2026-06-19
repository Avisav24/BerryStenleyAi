import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const categories = gsap.utils.toArray('.learn-category');
    categories.forEach((cat: any) => {
      gsap.fromTo(cat,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: cat,
            start: "top 85%",
          }
        }
      );
    });
  }, { scope: container });

  return (
    <section ref={container} className="enterprise-section bg-background border-b border-border">
      <div className="enterprise-container">
        
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8">
          
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32">
              <h2 className="text-[40px] md:text-[56px] text-white tracking-tight mb-8 font-normal leading-[1.1]">
                A curriculum built for real-world impact.
              </h2>
              <p className="text-xl text-muted-foreground font-light max-w-md">
                We've distilled thousands of hours of AI experimentation into a practical, actionable framework that you can apply immediately.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-16">
            {learningCategories.map((category, idx) => (
              <div key={idx} className="border-t border-border pt-10 learn-category">
                <div className="flex items-baseline gap-6 mb-10">
                  <span className="text-[#0066B1] font-mono text-sm tracking-widest">0{idx + 1}</span>
                  <h3 className="text-3xl font-light text-white tracking-tight">{category.title}</h3>
                </div>
                <ul className="flex flex-col gap-8">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-6 group cursor-default">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-border group-hover:bg-[#1C69D4] transition-colors shrink-0" />
                      <span className="text-xl text-muted-foreground group-hover:text-white transition-colors font-light leading-relaxed">
                        {item}
                      </span>
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
