import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FinalCTASectionProps {
  onRegisterClick?: () => void;
}

const FinalCTASection = ({ onRegisterClick }: FinalCTASectionProps) => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      }
    });

    tl.fromTo('.cta-badge',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)" }
    )
    .fromTo('.cta-headline', 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    )
    .fromTo('.cta-copy',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo('.cta-button',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    );

    // Subtle float for background decorative elements
    gsap.to('.deco-1', { y: -20, rotation: 5, duration: 4, yoyo: true, repeat: -1, ease: "sine.inOut" });
    gsap.to('.deco-2', { y: 20, rotation: -10, duration: 5, yoyo: true, repeat: -1, ease: "sine.inOut" });

  }, { scope: container });

  return (
    <section ref={container} className="relative py-32 md:py-48 flex items-center justify-center overflow-hidden bg-white border-b border-border">
      
      {/* Collaborative Background Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="deco-1 absolute top-[10%] left-[10%] w-[200px] h-[200px] bg-[#DCC6FF] rounded-full mix-blend-multiply filter blur-[80px] opacity-60" />
        <div className="deco-2 absolute bottom-[10%] right-[10%] w-[300px] h-[300px] bg-[#B8F2E6] rounded-full mix-blend-multiply filter blur-[100px] opacity-60" />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-[800px] text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-full mb-8 cta-badge shadow-sm">
          <div className="w-2 h-2 rounded-full bg-[#FFB4A2]" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">The Final Step</span>
        </div>

        <h2 className="text-[48px] md:text-[64px] font-semibold tracking-[-0.02em] text-foreground leading-[1.1] mb-8 cta-headline">
          Ready to automate <br className="hidden md:block" /> your workflow?
        </h2>

        <p className="text-xl md:text-2xl text-muted-foreground font-normal mb-12 max-w-xl mx-auto leading-relaxed cta-copy">
          Don't let the AI revolution pass you by. Join thousands of professionals future-proofing their careers today.
        </p>

        <div className="flex flex-col items-center gap-6 cta-button">
          <Button 
            size="xl" 
            className="w-full sm:w-auto px-12 text-lg font-medium shadow-md hover:shadow-xl" 
            onClick={onRegisterClick}
          >
            <span>Join the Workshop — ₹99</span>
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>

          <p className="text-sm font-medium text-muted-foreground">
            100% Money Back Guarantee • No Questions Asked
          </p>
        </div>
        
      </div>
    </section>
  );
};

export default FinalCTASection;
