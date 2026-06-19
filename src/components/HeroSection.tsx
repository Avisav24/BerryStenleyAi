import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface HeroSectionProps {
  onRegisterClick?: () => void;
}

const HeroSection = ({ onRegisterClick }: HeroSectionProps) => {
  const container = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // We split the text manually with spans for the stagger effect, 
    // since we don't have SplitText plugin.
    const headlineLines = gsap.utils.toArray('.headline-line');
    
    gsap.fromTo(headlineLines, 
      { y: 120, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.1 }
    );

    gsap.fromTo('.subheadline',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
    );

    gsap.fromTo('.hero-buttons',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" }
    );

    gsap.fromTo('.hero-proof',
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 0.7, ease: "power2.out" }
    );

    if (visualRef.current) {
      gsap.fromTo(visualRef.current,
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.8, ease: "power4.out" }
      );
    }
  }, { scope: container });

  return (
    <section ref={container} className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-background overflow-hidden border-b border-border">
      <div className="enterprise-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            <div className="mb-6 overflow-hidden pt-2 pb-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border bg-card headline-line">
                <div className="w-2 h-2 bg-[#0066B1] animate-pulse" />
                <span className="text-[11px] font-semibold uppercase tracking-[2px] text-muted-foreground">
                  Live Online Workshop
                </span>
              </div>
            </div>

            <h1 ref={headlineRef} className="text-hero text-foreground mb-8">
              <div className="overflow-hidden pt-4 pb-2 -mt-4 -mb-2"><div className="headline-line">Future-Proof</div></div>
              <div className="overflow-hidden pt-4 pb-2 -mt-4 -mb-2"><div className="headline-line">Your Career.</div></div>
              <div className="overflow-hidden pt-4 pb-2 -mt-4 -mb-2"><div className="headline-line text-muted-foreground">Become Irreplaceable</div></div>
              <div className="overflow-hidden pt-4 pb-2 -mt-4 -mb-2"><div className="headline-line text-muted-foreground">In The AI Era.</div></div>
            </h1>
            
            <p className="text-subheading text-muted-foreground mb-12 max-w-xl subheadline">
              The definitive AI certification program. Automate workflows, multiply productivity, and unlock new career opportunities without writing code.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto mb-16 hero-buttons">
              <Button 
                size="xl" 
                className="w-full sm:w-auto bg-white text-black hover:bg-[#E8E8E8]" 
                onClick={onRegisterClick}
              >
                <span>Join the Workshop — ₹99</span>
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                className="w-full sm:w-auto border-border text-white hover:bg-white hover:text-black"
              >
                View Curriculum
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 hero-proof">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 border-2 border-background bg-secondary overflow-hidden shrink-0 filter grayscale">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Student" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground font-light tracking-wide">
                Join <strong className="text-white font-medium">10,000+</strong> professionals <br className="hidden sm:block" />
                transitioning to AI-first roles.
              </div>
            </div>
            
          </div>

          {/* Right Column: Cinematic Visual */}
          <div className="lg:col-span-6 relative h-full min-h-[500px]">
            <div ref={visualRef} className="relative w-full h-full aspect-[4/5] lg:aspect-auto lg:absolute lg:inset-0 overflow-hidden bg-card border border-border">
              {/* Image/Video Container */}
              <div className="absolute inset-0">
                <video 
                  className="w-full h-full object-cover opacity-60 mix-blend-screen"
                  poster="/videos/promo-video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/videos/promo-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>

              {/* Technical / UI Overlays for Cinematic Feel */}
              <div className="absolute top-0 right-0 border border-border bg-background/80 backdrop-blur-md p-4 mt-8 mr-8">
                <p className="text-[10px] uppercase tracking-widest text-[#0066B1] mb-1">System Status</p>
                <p className="text-sm font-mono text-white">AI_WORKFLOW_ACTIVE</p>
              </div>

              <div className="absolute bottom-0 left-0 border border-border bg-background/80 backdrop-blur-md p-6 max-w-[280px] mb-8 ml-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 bg-[#E22718] animate-pulse" />
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Live Data</p>
                </div>
                <div className="h-[2px] w-full bg-border mb-4 relative">
                  <div className="absolute top-0 left-0 h-full bg-white w-[65%]" />
                </div>
                <p className="text-sm text-white font-light">Processing 10,000+ career trajectories across global enterprise systems.</p>
              </div>

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-24 h-24 border border-white/20 bg-black/40 backdrop-blur-xl flex items-center justify-center transition-transform hover:scale-110 cursor-pointer pointer-events-auto group">
                  <PlayCircle className="w-10 h-10 text-white opacity-80 group-hover:opacity-100 group-hover:text-[#1C69D4] transition-all ml-1" strokeWidth={1} />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
