import { useState, useRef } from "react";
import { Play } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const compellingReasons = [
  { num: 1, heading: "Unmatched Educational Excellence", text: "Holds PhD, NET, MBA, M.Com, PG Diploma." },
  { num: 2, heading: "20 Years of Professional Experience", text: "Across Academics, Corporate Training, and Administration." },
  { num: 3, heading: "Expert at Top Institutions", text: "Delivered sessions at IIM Lucknow, IIM Indore, and more." },
  { num: 4, heading: "Appointed Jury by IIT-Bombay", text: "For guiding Entrepreneurship at the national level." },
  { num: 5, heading: "Impacted 15,000+ Students", text: "Educated students at leading universities." },
  { num: 6, heading: "Trained 5,70,000+ Professionals", text: "Transforming careers nationwide." },
  { num: 7, heading: "Strong Thought Leadership", text: "60+ International & National research papers published." },
  { num: 8, heading: "Chief Editor of Journals", text: "Editor of two International Refereed Journals." },
  { num: 9, heading: "Administrative Leadership", text: "Served as Dean, Professor, HOD, NAAC Head." },
  { num: 10, heading: "National Exposure", text: "Participated in 450+ international webinars." },
];

const InstructorSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax on the video container
    gsap.to('.instructor-visual', {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Fade in reasons
    const reasons = gsap.utils.toArray('.reason-item');
    reasons.forEach((reason: any) => {
      gsap.fromTo(reason,
        { opacity: 0, x: 20 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: {
            trigger: reason,
            start: "top 90%",
          }
        }
      );
    });

  }, { scope: container });

  const handleVideoPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  return (
    <section ref={container} className="enterprise-section bg-background border-b border-border overflow-hidden">
      <div className="enterprise-container">
        
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Instructor Profile (Left) */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32">
              <p className="text-xs uppercase tracking-widest text-[#0066B1] font-semibold mb-4">Chief AI Instructor</p>
              <h2 className="text-[48px] md:text-[64px] font-normal tracking-tight text-white mb-6 leading-none">
                Prof. (Dr) Brajesh Kumar
              </h2>
              <p className="text-xl text-muted-foreground font-light mb-12">
                Bringing two decades of academic excellence and corporate implementation to this program.
              </p>

              <div className="overflow-hidden bg-card border border-border aspect-[4/5] relative">
                <div className="instructor-visual w-full h-[120%] -top-[10%] relative">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover opacity-60 mix-blend-screen grayscale"
                    playsInline
                    controls={isVideoPlaying}
                    controlsList="nodownload"
                    onContextMenu={(e) => e.preventDefault()}
                    onEnded={() => setIsVideoPlaying(false)}
                  >
                    <source src="/videos/instructor-message.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>
                
                {!isVideoPlaying && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 group hover:bg-black/40 transition-colors">
                    <button
                      onClick={handleVideoPlay}
                      className="w-20 h-20 bg-white flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
                      aria-label="Play video message"
                    >
                      <Play className="h-8 w-8 text-black ml-1" fill="currentColor" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Credentials List (Right) */}
          <div className="lg:col-span-6 lg:col-start-7 pt-8 lg:pt-0">
            <div className="mb-12 border-b border-border pb-6">
              <h3 className="text-3xl font-light text-white">
                Why this matters for your career.
              </h3>
            </div>
            
            <div className="flex flex-col gap-12">
              {compellingReasons.map((reason) => (
                <div key={reason.num} className="reason-item flex gap-6">
                  <div className="text-[#1C69D4] font-mono text-sm tracking-widest pt-1">
                    {reason.num.toString().padStart(2, '0')}
                  </div>
                  <div>
                    <h4 className="text-2xl font-light text-white mb-3">
                      {reason.heading}
                    </h4>
                    <p className="text-lg text-muted-foreground font-light">
                      {reason.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 p-10 border border-border bg-card">
              <p className="text-xl text-white font-light leading-relaxed">
                "Learning AI from a generic instructor means learning how to use software tools. Learning AI from <strong className="font-normal text-[#1C69D4]">Dr. Kumar</strong> means transforming your methodology and career trajectory."
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InstructorSection;
