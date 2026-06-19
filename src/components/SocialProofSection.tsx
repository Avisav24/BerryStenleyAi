import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 75000, suffix: "+", label: "Students Trained" },
  { value: 45000, suffix: "+", label: "Successful Professionals" },
  { value: 22, suffix: "+", label: "Countries" },
  { value: 4.9, suffix: "/5", label: "Google Rating", isFloat: true },
];

const SocialProofSection = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal text
    gsap.fromTo('.proof-text',
      { y: 50, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out",
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
          start: "top 75%",
        },
        snap: { innerHTML: isFloat ? 0.1 : 1 },
        onUpdate: function() {
          if (isFloat) {
            counter.innerHTML = Number(this.targets()[0].innerHTML).toFixed(1);
          } else {
            // Add commas for large numbers
            counter.innerHTML = Math.round(Number(this.targets()[0].innerHTML)).toLocaleString();
          }
        }
      });
    });

  }, { scope: container });

  return (
    <section ref={container} className="enterprise-section bg-background border-b border-border relative overflow-hidden">
      
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0066B1]/5 blur-[100px] pointer-events-none rounded-full translate-x-1/2 -translate-y-1/2" />
      
      <div className="enterprise-container relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 border-t border-border pt-16">
          
          <div className="lg:col-span-4 flex flex-col justify-start">
            <h2 className="text-[32px] md:text-[40px] text-white tracking-tight mb-6 font-normal proof-text">
              Proven results at a global scale.
            </h2>
            <p className="text-subheading text-muted-foreground proof-text">
              We're building the largest community of AI-first professionals. Trusted by teams at top companies worldwide.
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col relative proof-text">
                  <div className="text-[40px] md:text-[48px] font-light tracking-tight text-white mb-2 leading-none tabular-nums flex items-baseline">
                    <span 
                      className="stat-number" 
                      data-target={stat.value} 
                      data-float={stat.isFloat}
                    >
                      0
                    </span>
                    <span className="text-[#1C69D4]">{stat.suffix}</span>
                  </div>
                  <div className="text-caption">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
