import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stories = [
  {
    category: "Software Engineer",
    quote: "This AI workshop completely transformed my career. I got promoted within 3 months of completing the course!",
    author: "Rahul Sharma",
    role: "Software Engineer",
    color: "bg-[#F7F7F7]"
  },
  {
    category: "Business Owner",
    quote: "My business revenue increased by 300% after implementing AI tools I learned here. Best investment ever!",
    author: "Priya Patel",
    role: "Business Owner",
    color: "bg-[#FFB4A2]/10"
  },
  {
    category: "Student",
    quote: "Cleared my competitive exams with AI-powered study techniques. This course is a game-changer!",
    author: "Amit Kumar",
    role: "Student",
    color: "bg-[#B8F2E6]/10"
  }
];

const SuccessStoriesGrid = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.story-card');
    cards.forEach((card: any, index) => {
      gsap.fromTo(card,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: index * 0.15,
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
          }
        }
      );
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-24 bg-background border-b border-border">
      <div className="enterprise-container">
        
        <div className="mb-16">
          <h2 className="text-section-title text-foreground mb-4">
            Real outcomes.
          </h2>
          <p className="text-subheading text-muted-foreground">
            See how professionals are actually applying these skills.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <div key={index} className={`story-card ${story.color} rounded-[16px] p-8 border border-border flex flex-col justify-between`}>
              
              <div>
                <Quote className="h-8 w-8 text-foreground/20 mb-6" />
                <p className="text-body text-foreground font-medium leading-relaxed mb-8">
                  "{story.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                <div className="w-10 h-10 rounded-full bg-white border border-border shadow-sm flex items-center justify-center font-bold text-foreground">
                  {story.author[0]}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{story.author}</p>
                  <p className="text-xs text-muted-foreground">{story.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SuccessStoriesGrid;
