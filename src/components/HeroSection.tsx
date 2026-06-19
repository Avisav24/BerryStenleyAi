import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame, Clock, Users, ChevronRight, PlayCircle } from "lucide-react";

interface HeroSectionProps {
  onRegisterClick?: () => void;
}

const HeroSection = ({ onRegisterClick }: HeroSectionProps) => {
  const [seatsLeft, setSeatsLeft] = useState(180);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeatsLeft(prev => prev > 50 ? prev - 1 : prev);
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-brand-cloud overflow-hidden border-b border-border">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] rounded-full bg-blue-400/5 blur-[100px] pointer-events-none" />

      <div className="enterprise-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTA */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-border/60 shadow-sm mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Live Online Workshop • Enroll Today
              </span>
            </div>

            {/* Massive Headline */}
            <h1 className="text-hero text-brand-ink mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Master Practical AI. <br className="hidden lg:block" />
              <span className="text-muted-foreground">Future-Proof Your Career.</span>
            </h1>
            
            {/* Supporting Copy */}
            <p className="text-subheading text-muted-foreground mb-10 max-w-xl animate-slide-up" style={{ animationDelay: '0.3s' }}>
              The definitive AI certification program. Automate workflows, multiply productivity, and unlock new career opportunities without writing code.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Button 
                size="xl" 
                className="w-full sm:w-auto px-8 shadow-modal bg-brand-ink text-white hover:bg-brand-charcoal rounded-[8px]" 
                onClick={onRegisterClick}
              >
                <span>Join the Workshop — ₹99</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                className="w-full sm:w-auto px-8 rounded-[8px] bg-white border-border"
              >
                View Curriculum
                <ChevronRight className="ml-2 h-4 w-4 text-muted-foreground" />
              </Button>
            </div>

            {/* Social Proof Row */}
            <div className="flex items-center gap-4 animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-secondary overflow-hidden shrink-0">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Student" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-sm text-brand-graphite font-medium">
                Join <strong className="text-brand-ink">10,000+</strong> professionals <br className="hidden sm:block" />
                transitioning to AI-first roles.
              </div>
            </div>
            
          </div>

          {/* Right Column: Premium Visual Composition */}
          <div className="lg:col-span-6 relative animate-slide-up" style={{ animationDelay: '0.4s' }}>
            
            {/* Main Visual Frame */}
            <div className="relative rounded-[16px] bg-white border border-border/50 p-2 shadow-modal">
              <div className="relative rounded-[12px] overflow-hidden bg-brand-charcoal aspect-[4/3] sm:aspect-video lg:aspect-[4/3] group">
                {/* Video Player Placeholder */}
                <video 
                  className="w-full h-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
                  poster="/videos/promo-video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/videos/promo-video.mp4" type="video/mp4" />
                </video>
                
                {/* Overlay Play Button */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-transparent">
                  <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 cursor-pointer">
                    <PlayCircle className="w-8 h-8 text-brand-ink ml-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Element 1: Seats Alert */}
            <div className="absolute -bottom-6 -left-6 sm:-left-12 bg-white rounded-[12px] p-4 shadow-card border border-border/50 flex items-center gap-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Capacity</p>
                <p className="text-sm font-medium text-brand-ink"><strong className="text-red-600">{seatsLeft}</strong> Seats Remaining</p>
              </div>
            </div>

            {/* Floating Element 2: Value Prop */}
            <div className="absolute -top-6 -right-6 sm:-right-8 bg-white rounded-[12px] p-4 shadow-card border border-border/50 flex items-center gap-4 animate-fade-in" style={{ animationDelay: '1s' }}>
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Fast-Track</p>
                <p className="text-sm font-medium text-brand-ink">3-Hour Mastery</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
