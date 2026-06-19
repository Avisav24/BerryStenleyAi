import { Play } from "lucide-react";
import { useState, useRef } from "react";

interface VideoSectionProps {
  isMobile?: boolean;
}

const VideoSection = ({ isMobile = false }: VideoSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  const title = isMobile ? "Welcome Video" : "Program Promotional Video";

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-6 max-w-[1366px]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-section-title text-foreground">
              {title}
            </h2>
            <p className="text-muted-foreground mt-2">See what you will learn and achieve.</p>
          </div>
          
          <div className="enterprise-card p-4">
            <div className="relative aspect-video rounded-[8px] overflow-hidden bg-muted border border-border">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                onEnded={handleVideoEnd}
                onClick={handlePlayClick}
                playsInline
                controls={isPlaying}
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
              >
                <source src="/videos/promo-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Play button overlay */}
              {!isPlaying && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-ink/10 cursor-pointer transition-colors hover:bg-ink/20"
                  onClick={handlePlayClick}
                >
                  <div className="w-16 h-16 rounded-[8px] bg-white flex items-center justify-center shadow-md hover:scale-105 transition-transform">
                    <Play className="h-6 w-6 text-primary ml-1" fill="currentColor" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
