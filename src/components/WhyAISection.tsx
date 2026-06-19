import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhyAISection = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax background
    gsap.to('.parallax-bg', {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Reveal text elements
    const revealElements = gsap.utils.toArray('.reveal-up');
    revealElements.forEach((el: any) => {
      gsap.fromTo(el, 
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          }
        }
      );
    });

    // Reveal panels
    const panels = gsap.utils.toArray('.feature-panel');
    panels.forEach((panel: any) => {
      gsap.fromTo(panel,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 1.2, ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 80%",
          }
        }
      );
    });

  }, { scope: container });

  return (
    <section ref={container} className="relative py-32 bg-background border-b border-border overflow-hidden">
      
      {/* Parallax Background Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-20 parallax-bg" style={{ 
        backgroundImage: 'radial-gradient(circle at 2px 2px, #333 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />

      <div className="enterprise-container relative z-10">
        
        <div className="max-w-4xl mb-24">
          <div className="inline-flex items-center gap-3 border border-[#E22718]/30 px-4 py-2 bg-[#E22718]/5 mb-8 reveal-up">
            <div className="w-2 h-2 bg-[#E22718] animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-white">Market Shift Alert</span>
          </div>
          
          <h2 className="text-page-title text-white mb-8 reveal-up">
            Why AI skills are the only true career moat in 2025.
          </h2>
          
          <p className="text-[24px] text-muted-foreground font-light leading-relaxed reveal-up max-w-3xl">
            Analysts project that within 3 years, 80% of enterprise roles will require fundamental AI literacy. Adapt now, or risk obsolescence.
          </p>
        </div>

        {/* Feature Panels */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          <div className="feature-panel p-10 md:p-16 border border-border bg-card flex flex-col justify-between min-h-[400px]">
            <div>
              <h3 className="text-3xl font-light text-white mb-6">Time Sensitivity</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every day delayed is an opportunity cost. Organizations are actively replacing legacy workflows, and professionals lacking AI skills risk reduced competitiveness.
              </p>
            </div>
            
            <div className="mt-12 h-1 w-full bg-border relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-[#1C69D4] w-1/3" />
            </div>
          </div>

          <div className="feature-panel p-10 md:p-16 border border-border bg-card flex flex-col justify-between min-h-[400px]">
            <div>
              <h3 className="text-3xl font-light text-white mb-6">Role Obsolescence</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hundreds of traditional job functions are being automated. Upskilling mitigates this risk by elevating you from a task-executor to an AI-manager.
              </p>
            </div>
            
            <div className="mt-12 flex items-end gap-2 h-8">
              <div className="w-1/3 bg-border h-1/3" />
              <div className="w-1/3 bg-border h-2/3" />
              <div className="w-1/3 bg-[#0066B1] h-full" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default WhyAISection;
