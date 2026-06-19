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
    // Reveal CTA elements
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 60%",
      }
    });

    tl.fromTo('.cta-headline', 
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
    )
    .fromTo('.cta-copy',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo('.cta-button',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    );

    // Parallax background
    gsap.to('.cta-bg', {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

  }, { scope: container });

  return (
    <section ref={container} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-border">
      
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 bg-[#000000] cta-bg">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0066B1]/20 via-[#000000]/80 to-[#000000] z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1C69D4]/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-[1000px] text-center">
        
        <p className="text-xs uppercase tracking-[3px] text-[#0066B1] font-semibold mb-8 cta-headline">
          The Final Call
        </p>

        <h2 className="text-[64px] md:text-[96px] font-normal tracking-[-0.03em] text-white leading-[1] mb-10 cta-headline">
          Your turn to <br className="hidden md:block" /> scale 10x faster.
        </h2>

        <p className="text-2xl md:text-3xl text-muted-foreground font-light mb-16 max-w-2xl mx-auto leading-relaxed cta-copy">
          Don't let the AI revolution pass you by. Join thousands of professionals future-proofing their careers today.
        </p>

        <div className="flex flex-col items-center gap-8 cta-button">
          <Button 
            size="xl" 
            className="w-full sm:w-auto px-16 bg-white text-black hover:bg-[#E8E8E8] text-lg font-medium" 
            onClick={onRegisterClick}
          >
            <span>Join the Workshop — ₹99</span>
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>

          <p className="text-sm text-muted-foreground font-light tracking-wide uppercase">
            100% Money Back Guarantee • No Questions Asked
          </p>
        </div>
        
      </div>
    </section>
  );
};

export default FinalCTASection;
