import { Users, Briefcase, Globe, Star } from "lucide-react";

const stats = [
  { icon: Users, value: "75,000+", label: "Students Trained" },
  { icon: Briefcase, value: "45,000+", label: "Successful Professionals" },
  { icon: Globe, value: "22+", label: "Countries Reached" },
  { icon: Star, value: "4.9/5", label: "Google Rating" },
];

const SocialProofSection = () => {
  return (
    <section className="enterprise-section bg-brand-cloud border-b border-border">
      <div className="enterprise-container">
        
        {/* Editorial Layout: Left Text, Right Metrics */}
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8">
          
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="text-section-title text-brand-ink mb-6">
              Proven results at a global scale.
            </h2>
            <p className="text-subheading text-muted-foreground mb-8 max-w-md">
              We're building the largest community of AI-first professionals. Our curriculum is trusted by teams at top companies worldwide.
            </p>
            
            {/* Logos or Trust Markers could go here */}
            <div className="flex items-center gap-6 opacity-60 grayscale">
              {/* Fake Logos for Editorial Feel */}
              <div className="h-8 w-24 bg-brand-charcoal/20 rounded-[4px]" />
              <div className="h-8 w-24 bg-brand-charcoal/20 rounded-[4px]" />
              <div className="h-8 w-24 bg-brand-charcoal/20 rounded-[4px]" />
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-2 gap-x-8 gap-y-16">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col relative">
                  {/* Decorative line */}
                  <div className="absolute top-0 left-0 w-8 h-[2px] bg-primary mb-6" />
                  
                  <div className="pt-6">
                    <div className="text-[48px] md:text-[64px] font-medium tracking-tight text-brand-ink mb-2 leading-none tabular-nums">
                      {stat.value}
                    </div>
                    <div className="text-body text-muted-foreground font-medium flex items-center gap-2">
                      <stat.icon className="h-5 w-5 text-brand-charcoal opacity-50" />
                      {stat.label}
                    </div>
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
