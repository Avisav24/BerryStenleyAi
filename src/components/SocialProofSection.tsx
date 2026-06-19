import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Briefcase, Globe, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Users, value: 75000, suffix: "+", label: "Students Trained", color: "text-[#FFD02F]" },
  { icon: Briefcase, value: 45000, suffix: "+", label: "Successful Professionals", color: "text-[#FFB4A2]" },
  { icon: Globe, value: 22, suffix: "+", label: "Countries", color: "text-[#B8F2E6]" },
  { icon: Star, value: 4.9, suffix: "/5", label: "Google Rating", isFloat: true, color: "text-[#DCC6FF]" },
];

const SocialProofSection = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal text
    gsap.fromTo('.proof-text',
      { y: 30, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        }
      }
    );

    // Number counters
    const counters = gsap.utils.toArray<HTMLElement>('.stat-number');
    counters.forEach((counter) => {
      const targetValue = parseFloat(counter.getAttribute('data-target') || '0');
      const isFloat = counter.getAttribute('data-float') === 'true';

      gsap.to(counter, {
        innerHTML: targetValue,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
        },
        snap: { innerHTML: isFloat ? 0.1 : 1 },
        onUpdate: function() {
          if (isFloat) {
            counter.innerHTML = Number(this.targets()[0].innerHTML).toFixed(1);
          } else {
            counter.innerHTML = Math.round(Number(this.targets()[0].innerHTML)).toLocaleString();
          }
        }
      });
    });

  }, { scope: container });

  return (
    <section ref={container} className="py-24 bg-white border-b border-border relative">
      
      <div className="enterprise-container">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary rounded-full mb-6 proof-text">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Global Impact</span>
          </div>
          <h2 className="text-section-title text-foreground tracking-tight mb-4 proof-text">
            Proven Results & Social Proof
          </h2>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto proof-text">
            Join thousands of successful professionals advancing their careers globally.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-8 bg-white border border-border rounded-[16px] shadow-sm hover:shadow-md transition-shadow proof-text">
              <stat.icon className={`h-8 w-8 mb-4 ${stat.color.replace('text-', 'text-')}`} />
              <div className="text-[40px] md:text-[56px] font-semibold tracking-[-0.03em] text-foreground mb-1 leading-none tabular-nums flex items-baseline">
                <span 
                  className="stat-number" 
                  data-target={stat.value} 
                  data-float={stat.isFloat}
                >
                  0
                </span>
                <span className={stat.color}>{stat.suffix}</span>
              </div>
              <div className="text-sm font-medium text-muted-foreground mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SocialProofSection;
