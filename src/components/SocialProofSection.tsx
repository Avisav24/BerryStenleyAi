import { Users, Briefcase, Globe, Star, Quote } from "lucide-react";

const stats = [
  { icon: Users, value: "75,000+", label: "Students Trained" },
  { icon: Briefcase, value: "45,000+", label: "Successful Professionals" },
  { icon: Globe, value: "22+", label: "Countries" },
  { icon: Star, value: "4.9/5", label: "Google Rating" },
];

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    text: "This AI workshop completely transformed my career. I got promoted within 3 months of completing the course!",
  },
  {
    name: "Priya Patel",
    role: "Business Owner",
    text: "My business revenue increased by 300% after implementing AI tools I learned here. Best investment ever!",
  },
  {
    name: "Amit Kumar",
    role: "Student",
    text: "Cleared my competitive exams with AI-powered study techniques. This course is a game-changer!",
  },
];

const SocialProofSection = () => {
  return (
    <section className="py-20 bg-background border-b border-border">
      <div className="container mx-auto px-6 max-w-[1366px]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-section-title text-foreground tracking-tight mb-4">
              Proven Results & Social Proof
            </h2>
            <p className="text-subheading text-muted-foreground max-w-2xl mx-auto">
              Join thousands of successful professionals advancing their careers globally.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="enterprise-card p-6 text-center bg-white shadow-sm"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                <div className="text-3xl md:text-4xl font-display font-bold mb-2 text-foreground tracking-tight tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="enterprise-card p-8 bg-secondary/20 border-border text-left"
              >
                <Quote className="h-8 w-8 text-primary/40 mb-6" />
                <p className="text-foreground text-sm leading-relaxed mb-8">"{testimonial.text}"</p>
                <div className="flex items-center gap-4 border-t border-border/50 pt-6">
                  <div className="w-10 h-10 rounded-[4px] bg-secondary flex items-center justify-center text-primary font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
