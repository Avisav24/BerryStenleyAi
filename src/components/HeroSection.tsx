import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Wand2, Zap, LayoutPanelLeft } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface HeroSectionProps {
  onRegisterClick?: () => void;
}

const HeroSection = ({ onRegisterClick }: HeroSectionProps) => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo('.hero-badge',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
    .fromTo('.headline-line', 
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.1 },
      "-=0.6"
    )
    .fromTo('.subheadline',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo('.hero-buttons',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo('.hero-proof',
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.4"
    );

    gsap.fromTo('.workspace-mockup',
      { scale: 1.08, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.4 }
    );
    
    // Floating animations for workspace cards
    gsap.to('.float-card-1', { y: -10, duration: 2.5, yoyo: true, repeat: -1, ease: "sine.inOut" });
    gsap.to('.float-card-2', { y: 15, duration: 3, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 1 });
    gsap.to('.float-card-3', { y: -8, duration: 2.8, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 0.5 });

  }, { scope: container });

  return (
    <section ref={container} className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-background overflow-hidden border-b border-border">
      {/* Background dot grid for workspace feel */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="enterprise-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            <div className="mb-8 hero-badge">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFD02F] rounded-full shadow-sm">
                <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-widest text-black">
                  Live Online Workshop
                </span>
              </div>
            </div>

            <h1 className="text-hero text-foreground mb-6">
              <div className="overflow-hidden pt-4 pb-2 -mt-4 -mb-2"><div className="headline-line">Future-Proof</div></div>
              <div className="overflow-hidden pt-4 pb-2 -mt-4 -mb-2"><div className="headline-line">Your Career.</div></div>
            </h1>
            
            <p className="text-subheading text-muted-foreground mb-10 max-w-xl subheadline">
              The definitive AI certification program. Automate workflows, multiply productivity, and unlock new career opportunities without writing code.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16 hero-buttons">
              <Button 
                size="lg" 
                className="w-full sm:w-auto" 
                onClick={onRegisterClick}
              >
                <span>Join the Workshop — ₹99</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto"
              >
                View Curriculum
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 hero-proof bg-secondary rounded-2xl p-4 border border-border">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-secondary bg-white overflow-hidden shrink-0 shadow-sm">
                    <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="Student" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Join <strong className="text-foreground">10,000+</strong> professionals worldwide
              </div>
            </div>
            
          </div>

          {/* Right Column: Visual Workspace Mockup */}
          <div className="lg:col-span-6 relative h-[500px] lg:h-[600px] w-full workspace-mockup">
            <div className="absolute inset-0 bg-[#F7F7F7] rounded-[24px] border border-border shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden">
              
              {/* Fake Toolbar */}
              <div className="absolute top-0 left-0 right-0 h-12 border-b border-border bg-white flex items-center px-4 justify-between z-10">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#E5E5E5]" />
                    <div className="w-3 h-3 rounded-full bg-[#E5E5E5]" />
                    <div className="w-3 h-3 rounded-full bg-[#E5E5E5]" />
                  </div>
                  <div className="ml-4 px-3 py-1 bg-secondary rounded-md text-xs font-medium text-muted-foreground">
                    AI_Mastery_Canvas.board
                  </div>
                </div>
                <div className="px-3 py-1 bg-[#B8F2E6] text-[#0066B1] text-[10px] font-bold uppercase tracking-wider rounded-md">
                  Active
                </div>
              </div>

              {/* Canvas Content */}
              <div className="absolute inset-0 pt-12 p-8 relative">
                
                <div className="absolute top-20 left-10 p-5 bg-white rounded-[12px] border border-border shadow-sm w-[240px] float-card-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#DCC6FF] flex items-center justify-center">
                      <Zap className="h-4 w-4 text-[#111111]" />
                    </div>
                    <span className="font-semibold text-sm">Automate Task</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full w-3/4 mb-2" />
                  <div className="h-2 bg-secondary rounded-full w-1/2" />
                </div>

                <div className="absolute top-40 right-8 p-5 bg-[#FFB4A2] rounded-tl-[12px] rounded-tr-[12px] rounded-br-[12px] rounded-bl-[2px] shadow-sm w-[220px] float-card-2 rotate-2">
                  <p className="text-sm font-medium text-black leading-relaxed">
                    "This workflow saved my team 15 hours a week!"
                  </p>
                  <p className="text-xs text-black/60 mt-2 font-medium">— Rahul Sharma</p>
                </div>

                <div className="absolute bottom-16 left-20 p-5 bg-white rounded-[12px] border border-border shadow-sm w-[280px] float-card-3">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#FFD6A5] flex items-center justify-center">
                      <Wand2 className="h-4 w-4 text-[#111111]" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">AI Content Gen</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">Status: Running</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="w-[75%] h-full bg-[#111111]" />
                    </div>
                    <span className="text-xs font-bold">75%</span>
                  </div>
                </div>

                {/* Connecting Lines (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                  <path d="M 130 180 C 130 250, 200 250, 200 320" stroke="#E5E5E5" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                  <path d="M 250 180 C 250 150, 350 150, 350 200" stroke="#E5E5E5" strokeWidth="2" fill="none" />
                </svg>

                {/* Central Play Node */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#111111] rounded-full shadow-lg flex items-center justify-center z-20 cursor-pointer hover:scale-110 transition-transform">
                  <Play className="h-6 w-6 text-white ml-1" fill="currentColor" />
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
