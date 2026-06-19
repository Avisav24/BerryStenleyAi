import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stories = [
  {
    category: "Entrepreneurs Scaling",
    quote: "We replaced our entire legacy CRM workflow with AI agents. It didn't just save money—it completely changed how fast we can scale.",
    author: "Elena R.",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
  },
  {
    category: "Corporate AI Usage",
    quote: "I saved 15 hours a week using the exact automations taught here. My promotion came two months later.",
    author: "Sarah J.",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop"
  }
];

const SuccessStoriesGrid = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const storyBlocks = gsap.utils.toArray('.story-block');
    storyBlocks.forEach((block: any) => {
      const img = block.querySelector('.story-img');
      const content = block.querySelector('.story-content');

      // Image reveal & scale
      gsap.fromTo(img,
        { scale: 1.15, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 1.5, ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 75%",
          }
        }
      );

      // Content fade up
      gsap.fromTo(content,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.2,
          scrollTrigger: {
            trigger: block,
            start: "top 75%",
          }
        }
      );
    });
  }, { scope: container });

  return (
    <section ref={container} className="enterprise-section bg-background border-b border-border">
      <div className="enterprise-container">
        
        <div className="mb-20 max-w-3xl">
          <h2 className="text-page-title text-white mb-6">
            Real outcomes, not just theory.
          </h2>
          <p className="text-2xl text-muted-foreground font-light">
            See how professionals are actually applying these skills to accelerate their careers and businesses.
          </p>
        </div>

        <div className="flex flex-col gap-24 md:gap-32">
          {stories.map((story, index) => (
            <div key={index} className="story-block grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              
              {/* Image side - Alternate order based on index */}
              <div className={`lg:col-span-5 h-[500px] bg-card border border-border overflow-hidden relative ${index % 2 === 1 ? 'lg:order-2 lg:col-start-8' : ''}`}>
                <img 
                  src={story.image} 
                  alt={story.author} 
                  className="story-img w-full h-full object-cover filter grayscale opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>

              {/* Content side */}
              <div className={`story-content lg:col-span-6 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : 'lg:col-start-7'}`}>
                <div className="mb-8">
                  <span className="text-xs uppercase tracking-widest text-[#1C69D4] font-semibold">{story.category}</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-light text-white leading-[1.3] mb-12">
                  "{story.quote}"
                </h3>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-border" />
                  <div>
                    <p className="text-white text-lg font-medium">{story.author}</p>
                    <p className="text-muted-foreground">{story.role}</p>
                  </div>
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
