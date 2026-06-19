import { useRef } from "react";
import { AlertTriangle, Clock, TrendingUp, AlertCircle, ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhyAISection = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.flow-card');
    cards.forEach((card: any, index) => {
      gsap.fromTo(card,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: "power2.out", delay: index * 0.2,
          scrollTrigger: {
            trigger: container.current,
            start: "top 75%",
          }
        }
      );
    });

    gsap.fromTo('.flow-line',
      { scaleX: 0, transformOrigin: "left center" },
      {
        scaleX: 1, duration: 1, ease: "power2.inOut", stagger: 0.2,
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        }
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="enterprise-section bg-[#F9F9F9] border-b border-border overflow-hidden">
      <div className="enterprise-container relative">
        
        {/* Background Dot Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }} />

        <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#DC2626]/20 rounded-full mb-6 shadow-sm">
              <AlertTriangle className="h-4 w-4 text-[#DC2626]" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#DC2626]">Market Shift Alert</span>
            </div>
            
            <h2 className="text-page-title text-foreground mb-6">
              Why AI Skills are Essential in 2025
            </h2>
            
            <p className="text-body text-muted-foreground leading-relaxed mb-8">
              AI is reshaping the workforce globally. Analysts project that within 3 years, <strong className="text-foreground">80% of enterprise roles</strong> will require fundamental AI literacy. Organizations are actively replacing legacy workflows, and professionals lacking AI skills risk reduced competitiveness and earning potential. Adapting now is a strategic career imperative.
            </p>
          </div>

          <div className="lg:w-2/3 w-full relative h-auto lg:h-[500px] flex items-center justify-center">
            
            {/* Visual Flow / Roadmap */}
            <div className="relative w-full max-w-[700px] aspect-video">
              
              {/* Connecting Lines */}
              <div className="absolute top-[20%] left-[25%] w-[40%] h-[2px] bg-border flow-line hidden md:block" />
              <div className="absolute top-[50%] left-[60%] w-[25%] h-[2px] bg-border flow-line hidden md:block" />

              {/* Card 1 */}
              <div className="flow-card absolute md:top-[10%] md:left-0 relative md:absolute w-full md:w-[280px] bg-white border border-border rounded-[12px] p-6 shadow-sm mb-6 md:mb-0 z-10">
                <div className="w-10 h-10 rounded-full bg-[#FFD02F]/20 flex items-center justify-center mb-4">
                  <Clock className="h-5 w-5 text-[#B28C00]" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">Time Sensitivity</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Every day delayed is an opportunity cost in a rapidly evolving market.</p>
              </div>

              {/* Card 2 */}
              <div className="flow-card absolute md:top-[40%] md:left-[35%] relative md:absolute w-full md:w-[280px] bg-white border border-border rounded-[12px] p-6 shadow-sm mb-6 md:mb-0 z-20">
                <div className="w-10 h-10 rounded-full bg-[#FFB4A2]/30 flex items-center justify-center mb-4">
                  <AlertCircle className="h-5 w-5 text-[#CC543A]" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">Role Obsolescence</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Hundreds of traditional job functions are being automated. Upskilling mitigates this risk.</p>
              </div>

              {/* Card 3 */}
              <div className="flow-card absolute md:top-[70%] md:right-0 relative md:absolute w-full md:w-[280px] bg-[#111111] border border-[#111111] rounded-[12px] p-6 shadow-lg z-30">
                <div className="w-10 h-10 rounded-full bg-[#B8F2E6]/20 flex items-center justify-center mb-4">
                  <TrendingUp className="h-5 w-5 text-[#B8F2E6]" />
                </div>
                <h3 className="font-semibold text-lg text-white mb-2">Value Appreciation</h3>
                <p className="text-sm text-[#CCCCCC] leading-relaxed">AI-proficient personnel report significantly higher salary brackets and leadership opportunities.</p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default WhyAISection;
