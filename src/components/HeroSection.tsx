import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Clock, Flame, MapPin, Users } from "lucide-react";

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
    <section className="pt-32 pb-20 bg-background border-b border-border">
      <div className="container mx-auto px-6 max-w-[1366px]">
        <div className="max-w-4xl mx-auto text-center">
          {/* Urgency Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[8px] bg-secondary border border-border mb-8">
            <Flame className="h-4 w-4 text-destructive" />
            <span className="text-sm font-medium text-foreground tracking-tight">
              Limited Seats • Live + Online AI Workshop • Enroll Today
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-page-title mb-6 tracking-tight text-foreground">
            Master Practical AI Skills.<br/>
            Future-Proof Your Career.
          </h1>
          
          <p className="text-subheading text-muted-foreground mb-12 max-w-2xl mx-auto">
            The most comprehensive AI certification program for students and professionals. Automate workflows, boost productivity, and unlock new opportunities.
          </p>

          {/* Three Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="enterprise-card p-6 text-left">
              <div className="w-12 h-12 mb-4 rounded-[8px] bg-secondary flex items-center justify-center">
                <Flame className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-body font-semibold text-foreground mb-2">
                Become an AI Champion
              </h3>
              <p className="text-sm text-muted-foreground">
                Secure your future in the evolving job market.
              </p>
            </div>

            <div className="enterprise-card p-6 text-left">
              <div className="w-12 h-12 mb-4 rounded-[8px] bg-secondary flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-body font-semibold text-foreground mb-2">
                Career Transformation
              </h3>
              <p className="text-sm text-muted-foreground">
                The fastest certification for professionals.
              </p>
            </div>

            <div className="enterprise-card p-6 text-left">
              <div className="w-12 h-12 mb-4 rounded-[8px] bg-secondary flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-body font-semibold text-foreground mb-2">
                Master 400+ Skills
              </h3>
              <p className="text-sm text-muted-foreground">
                Multiply your productivity and earn a higher salary.
              </p>
            </div>
          </div>

          {/* Welcome Video Card */}
          <div className="mb-12">
            <div className="enterprise-card p-6 md:p-8 max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-body font-semibold text-foreground">
                  Program Overview
                </h4>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Video</span>
              </div>
              <div className="relative aspect-video rounded-[8px] overflow-hidden bg-muted border border-border">
                <video 
                  className="w-full h-full object-cover"
                  controls
                  poster="/videos/promo-video.mp4"
                >
                  <source src="/videos/promo-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="w-full sm:w-auto rounded-[4px] px-8 shadow-sm" 
              onClick={onRegisterClick}
            >
              <span>Register Now — ₹99</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-[4px] px-8">
              <Download className="mr-2 h-4 w-4" />
              <span>Download Brochure</span>
            </Button>
          </div>

          {/* Guarantee */}
          <p className="text-sm text-muted-foreground font-medium mb-8">
            Money Back Guarantee: Full refund if not satisfied. No questions asked.
          </p>

          {/* FOMO Proof */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span><strong className="text-primary">{seatsLeft}</strong> seats remaining</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <Flame className="h-4 w-4 text-muted-foreground" />
              <span>Price increases soon</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>Early-bird bonuses available</span>
            </div>
          </div>

          {/* Seat Counter */}
          <div className="inline-block p-6 rounded-[16px] bg-secondary border border-border max-w-md w-full">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[8px] bg-white flex items-center justify-center border border-border shrink-0">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left w-full">
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  <span>Capacity</span>
                  <span>{seatsLeft} Left</span>
                </div>
                <div className="w-full h-2 bg-white border border-border rounded-[4px] overflow-hidden">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${(1000 - seatsLeft) / 1000 * 100}%` }} 
                  />
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
