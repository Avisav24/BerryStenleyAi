import { useState, useRef } from "react";
import { Play, Award, GraduationCap } from "lucide-react";

// (Keep the same array, trimmed down for brevity in the component structure)
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
  { num: 10, heading: "National & International Exposure", text: "Participated in 450+ international webinars." },
];

const InstructorSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  return (
    <section className="enterprise-section bg-brand-cloud border-b border-border">
      <div className="enterprise-container">
        
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Instructor Profile (Left) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="sticky top-32">
              <h2 className="text-[32px] md:text-[40px] font-medium tracking-tight text-brand-ink mb-2">
                Learn from the expert.
              </h2>
              <p className="text-subheading text-muted-foreground mb-12">
                Prof. (Dr) Brajesh Kumar brings two decades of academic excellence and corporate implementation to this program.
              </p>

              <div className="rounded-[16px] overflow-hidden bg-brand-ink relative group aspect-[4/5] md:aspect-square lg:aspect-[4/5] shadow-modal border border-border/50">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover opacity-90"
                  playsInline
                  controls={isVideoPlaying}
                  controlsList="nodownload"
                  onContextMenu={(e) => e.preventDefault()}
                  onEnded={() => setIsVideoPlaying(false)}
                >
                  <source src="/videos/instructor-message.mp4" type="video/mp4" />
                </video>
                
                {!isVideoPlaying && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                    <button
                      onClick={handleVideoPlay}
                      className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl transform transition-transform group-hover:scale-105"
                      aria-label="Play video message"
                    >
                      <Play className="h-8 w-8 text-brand-ink ml-1" fill="currentColor" />
                    </button>
                    <div className="absolute bottom-8 left-8 right-8">
                      <p className="text-white font-medium text-lg">Prof. (Dr) Brajesh Kumar</p>
                      <p className="text-white/70 text-sm">Chief AI Instructor</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Credentials List (Right) */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="mb-8 flex items-center gap-3 border-b border-border pb-6">
              <Award className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-medium text-brand-ink">
                Why this matters for your career
              </h3>
            </div>
            
            <div className="flex flex-col gap-10">
              {compellingReasons.map((reason) => (
                <div key={reason.num} className="flex gap-6 group">
                  <div className="text-primary font-mono text-sm tracking-widest pt-1 opacity-50 group-hover:opacity-100 transition-opacity">
                    {reason.num.toString().padStart(2, '0')}
                  </div>
                  <div>
                    <h4 className="text-[20px] font-medium text-brand-ink mb-2 leading-tight">
                      {reason.heading}
                    </h4>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {reason.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 bg-white border border-border/60 rounded-[12px] shadow-sm">
              <p className="text-lg text-brand-ink leading-relaxed">
                "Learning AI from a generic instructor means learning how to use software tools. Learning AI from <strong className="font-semibold text-primary">Dr. Kumar</strong> means transforming your methodology and career trajectory."
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InstructorSection;
