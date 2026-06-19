import { useState, useRef } from "react";
import { Play, GraduationCap, Star, Award } from "lucide-react";

const compellingReasons = [
  {
    num: 1,
    heading: "Unmatched Educational Excellence",
    text: "Holds PhD, NET, MBA, M.Com, PG Diploma, proving deep academic mastery and expertise in AI, Business Management, & Digital Marketing."
  },
  {
    num: 2,
    heading: "20 Years of Professional Experience",
    text: "Across Academics, Corporate Training, Administration and Industry collaboration — highly rare among AI educators."
  },
  {
    num: 3,
    heading: "Expert at India's Top Institutions",
    text: "Delivered Expert Lecture sessions at IIM Lucknow, IIM Indore, K.J. Somaiya Mumbai, Jain University, and Galgotias University."
  },
  {
    num: 4,
    heading: "Appointed Jury & Expert by IIT-Bombay",
    text: "For guiding Entrepreneurship at the national level."
  },
  {
    num: 5,
    heading: "Impacted 15,000+ Students",
    text: "Educated students at leading universities during his academic leadership journey."
  },
  {
    num: 6,
    heading: "Trained 5,70,000+ Professionals",
    text: "Students and working professionals in AI Mastery workshops, transforming careers nationwide."
  },
  {
    num: 7,
    heading: "Strong Research & Thought Leadership",
    text: "60+ International & National research papers published and 150 research paper presentations worldwide."
  },
  {
    num: 8,
    heading: "Chief Editor of International Journals",
    text: "Editor of two International Refereed Journals, ensuring deep academic evaluation expertise."
  },
  {
    num: 9,
    heading: "Administrative Leadership Excellence",
    text: "Served as Dean, Professor, HOD, NAAC Head, and Incubation Centre Head at top Universities."
  },
  {
    num: 10,
    heading: "National & International Exposure",
    text: "Participated in 450+ international & national webinars and 110 prestigious FDPs."
  },
  {
    num: 11,
    heading: "Real Industry Expertise",
    text: "Expert in Artificial Intelligence, Digital Marketing, AI-driven Social Media Systems, and Branding."
  },
  {
    num: 12,
    heading: "Mentor for Entrepreneurs",
    text: "Guiding innovative startups through the IIT-Bombay network and incubation ecosystems."
  },
  {
    num: 13,
    heading: "Best Paper Award Winner",
    text: "Recognized at multiple International Conferences for academic excellence."
  },
  {
    num: 14,
    heading: "Motivational Speaker",
    text: "Inspiring teaching style, trained in personality development and communication excellence."
  },
  {
    num: 15,
    heading: "Implementation Mastery",
    text: "Bridging real-world corporate practices with academic rigor."
  },
  {
    num: 16,
    heading: "Strong Global Network",
    text: "Partnering with Universities & Industries through International MOUs & collaborations."
  },
  {
    num: 17,
    heading: "Institutional Leadership",
    text: "Transforming institutions through AI Innovation, Academic Planning, and Corporate connections."
  },
  {
    num: 18,
    heading: "Transformational Teaching",
    text: "Helping thousands overcome fear and outdated methods to achieve success quickly."
  },
  {
    num: 19,
    heading: "Advanced Practical Learning",
    text: "Focusing on real tools, real business problems & real implementation over theoretical lectures."
  },
  {
    num: 20,
    heading: "Complete Life-Changing System",
    text: "Integrating AI, Business, Personal Success, and Career Transformation into one cohesive methodology."
  },
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
    <section className="py-20 bg-background border-b border-border">
      <div className="container mx-auto px-6 max-w-[1366px]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-section-title tracking-tight text-foreground mb-2">
              Learn From The Expert
            </h2>
            <p className="text-lg font-semibold text-primary">
              Prof. (Dr) Brajesh Kumar
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              (PhD, NET, MBA, MCom, PG Diploma)
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Image & Video Area */}
            <div className="space-y-6">
              <div className="enterprise-card p-8 flex flex-col items-center justify-center text-center bg-white">
                <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <GraduationCap className="h-16 w-16 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-1">Prof. (Dr) Brajesh Kumar</h3>
                <p className="text-sm text-muted-foreground">Chief AI Instructor & Academic Leader</p>
              </div>
              <div className="enterprise-card p-4 bg-white">
                <div className="aspect-video rounded-[8px] bg-muted border border-border overflow-hidden relative">
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
                    Your browser does not support the video tag.
                  </video>
                  {!isVideoPlaying && (
                    <button
                      onClick={handleVideoPlay}
                      className="absolute inset-0 flex items-center justify-center bg-ink/10 hover:bg-ink/20 transition-colors"
                      aria-label="Play video message"
                    >
                      <div className="w-16 h-16 rounded-[8px] bg-white shadow-md flex items-center justify-center transition-transform hover:scale-105">
                        <Play className="h-6 w-6 text-primary ml-1" fill="currentColor" />
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Compelling Reasons List */}
            <div className="enterprise-card p-8 bg-white flex flex-col h-full max-h-[600px]">
              {/* Header */}
              <div className="text-center mb-6 border-b border-border pb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-xs uppercase tracking-widest text-primary font-semibold">Credentials</span>
                </div>
                <h3 className="text-body font-semibold text-foreground">
                  20 Reasons To Learn From Dr. Kumar
                </h3>
              </div>

              {/* Scrollable Reasons List */}
              <div className="overflow-y-auto custom-scrollbar pr-4 flex-1 space-y-4">
                {compellingReasons.map((reason) => (
                  <div
                    key={reason.num}
                    className="flex gap-4 items-start p-4 rounded-[8px] border border-border hover:border-primary/30 transition-colors"
                  >
                    {/* Number Badge */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-[4px] bg-secondary flex items-center justify-center mt-1">
                      <span className="text-xs font-bold text-primary">{reason.num}</span>
                    </div>
                    {/* Content */}
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-1">
                        {reason.heading}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {reason.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Value Proposition Statement */}
          <div className="p-8 rounded-[8px] bg-secondary/50 border border-border text-center max-w-3xl mx-auto">
            <p className="text-lg text-foreground/90 leading-relaxed">
              Learning AI from a generic instructor means learning how to use software tools. Learning AI from <strong className="font-semibold text-primary">Prof. (Dr) Brajesh Kumar</strong> means transforming your methodology, career trajectory, and professional future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorSection;
