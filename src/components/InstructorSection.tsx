import { useState, useRef } from "react";
import { Play, Award, GraduationCap } from "lucide-react";
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
  { num: 6, heading: "Trained 5,70,000+ Professionals", text: "Students and working professionals in AI Mastery workshops, transforming careers nationwide." },
  { num: 7, heading: "Strong Research & Thought Leadership", text: "60+ International & National research papers published and 150 research paper presentations worldwide." },
  { num: 8, heading: "Chief Editor of International Journals", text: "Editor of two International Refereed Journals, ensuring deep academic evaluation expertise." },
  { num: 9, heading: "Administrative Leadership Excellence", text: "Served as Dean, Professor, HOD, NAAC Head, and Incubation Centre Head at top Universities." },
  { num: 10, heading: "National & International Exposure", text: "Participated in 450+ international & national webinars and 110 prestigious FDPs." },
  { num: 11, heading: "Real Industry Expertise", text: "Expert in Artificial Intelligence, Digital Marketing, AI-driven Social Media Systems, and Branding." },
  { num: 12, heading: "Mentor for Entrepreneurs", text: "Guiding innovative startups through the IIT-Bombay network and incubation ecosystems." },
  { num: 13, heading: "Best Paper Award Winner", text: "Recognized at multiple International Conferences for academic excellence." },
  { num: 14, heading: "Motivational Speaker", text: "Inspiring teaching style, trained in personality development and communication excellence." },
  { num: 15, heading: "Implementation Mastery", text: "Bridging real-world corporate practices with academic rigor." },
  { num: 16, heading: "Strong Global Network", text: "Partnering with Universities & Industries through International MOUs & collaborations." },
  { num: 17, heading: "Institutional Leadership", text: "Transforming institutions through AI Innovation, Academic Planning, and Corporate connections." },
  { num: 18, heading: "Transformational Teaching", text: "Helping thousands overcome fear and outdated methods to achieve success quickly." },
  { num: 19, heading: "Advanced Practical Learning", text: "Focusing on real tools, real business problems & real implementation over theoretical lectures." },
  { num: 20, heading: "Complete Life-Changing System", text: "Integrating AI, Business, Personal Success, and Career Transformation into one cohesive methodology." },
];

const InstructorSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.instructor-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        }
      }
    );

    const reasons = gsap.utils.toArray('.reason-item');
    reasons.forEach((reason: any, i) => {
      gsap.fromTo(reason,
        { opacity: 0, x: 20 },
        {
          opacity: 1, x: 0, duration: 0.5, ease: "power2.out",
          scrollTrigger: {
            trigger: reason,
            start: "top 95%",
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
    <section ref={container} className="py-24 bg-[#F9F9F9] border-b border-border">
      <div className="enterprise-container">
        
        <div className="text-center mb-16">
          <h2 className="text-section-title tracking-tight text-foreground mb-4">
            Learn From The Expert
          </h2>
          <p className="text-subheading text-muted-foreground">
            Prof. (Dr) Brajesh Kumar
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Fixed Profile Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 instructor-card">
            
            <div className="bg-white rounded-[24px] border border-border shadow-[0_8px_32px_rgba(0,0,0,0.03)] overflow-hidden">
              
              {/* Profile Header */}
              <div className="p-8 flex flex-col items-center justify-center text-center bg-[#F7F7F7] border-b border-border relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD02F]/10 rounded-full translate-x-1/2 -translate-y-1/2" />
                
                <div className="w-24 h-24 rounded-full bg-white border border-border shadow-sm flex items-center justify-center mb-6 relative z-10">
                  <GraduationCap className="h-10 w-10 text-foreground" />
                </div>
                <h3 className="font-semibold text-2xl text-foreground mb-1">Prof. (Dr) Brajesh Kumar</h3>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">Chief AI Instructor</p>
                <p className="text-xs text-muted-foreground bg-white px-3 py-1 rounded-full border border-border">PhD, NET, MBA, M.Com, PG Diploma</p>
              </div>

              {/* Video Message */}
              <div className="p-6">
                <div className="aspect-video rounded-[12px] bg-secondary border border-border overflow-hidden relative shadow-sm">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    playsInline
                    controls={isVideoPlaying}
                    controlsList="nodownload"
                    onContextMenu={(e) => e.preventDefault()}
                    onEnded={() => setIsVideoPlaying(false)}
                  >
                    <source src="/videos/instructor-message.mp4" type="video/mp4" />
                  </video>
                  
                  {!isVideoPlaying && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/5 group hover:bg-black/10 transition-colors">
                      <button
                        onClick={handleVideoPlay}
                        className="w-16 h-16 bg-white rounded-full flex items-center justify-center transition-transform hover:scale-105 shadow-md"
                        aria-label="Play video message"
                      >
                        <Play className="h-6 w-6 text-black ml-1" fill="currentColor" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Scrolling Credentials */}
          <div className="lg:col-span-7 pt-4">
            <div className="bg-white rounded-[24px] border border-border p-8 md:p-10 shadow-sm">
              
              <div className="flex items-center gap-3 mb-10 pb-6 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-[#B8F2E6]/20 flex items-center justify-center">
                  <Award className="h-5 w-5 text-[#00A380]" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">
                  20 Reasons To Learn From Dr. Kumar
                </h3>
              </div>
              
              <div className="flex flex-col gap-6">
                {compellingReasons.map((reason) => (
                  <div key={reason.num} className="reason-item flex gap-6 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F7F7F7] border border-border flex items-center justify-center mt-1">
                      <span className="text-xs font-bold text-muted-foreground">{reason.num}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-1">
                        {reason.heading}
                      </h4>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {reason.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            <div className="mt-8 p-8 rounded-[16px] bg-[#FFD02F]/10 border border-[#FFD02F]/20">
              <p className="text-lg text-foreground font-medium leading-relaxed">
                "Learning AI from a generic instructor means learning how to use software tools. Learning AI from Prof. (Dr) Brajesh Kumar means transforming your methodology and professional future."
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default InstructorSection;
