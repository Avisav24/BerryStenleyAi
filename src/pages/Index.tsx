import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import SuccessStoriesGrid from "@/components/SuccessStoriesGrid";
import WhyAISection from "@/components/WhyAISection";
import AboutSection from "@/components/AboutSection";
import WhatYouLearnSection from "@/components/WhatYouLearnSection";
import ValueStackSection from "@/components/ValueStackSection";
import SocialProofSection from "@/components/SocialProofSection";
import FOMOSection from "@/components/FOMOSection";
import InstructorSection from "@/components/InstructorSection";
import WorkshopDetailsSection from "@/components/WorkshopDetailsSection";
import WhoShouldAttendSection from "@/components/WhoShouldAttendSection";
import AddOnsSection from "@/components/AddOnsSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";
import RegistrationPopup from "@/components/RegistrationPopup";
import AICoursesSection from "@/components/AICoursesSection";
import CourseRegistrationPopup from "@/components/CourseRegistrationPopup";
interface Course {
  id: string;
  title: string;
  duration: string;
  benefit: string;
  originalFee: string;
  discountedFee: string;
  certification: string;
  certificationColor: string;
}

const Index = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isCoursePopupOpen, setIsCoursePopupOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleCourseEnroll = (course: Course) => {
    setSelectedCourse(course);
    setIsCoursePopupOpen(true);
  };

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <HeroSection onRegisterClick={() => setIsRegistrationOpen(true)} />
      {/* VideoSection for desktop/tablet - hidden on mobile */}
      <div className="hidden sm:block">
        <VideoSection />
      </div>
      <SuccessStoriesGrid />
      <WhyAISection />
      <AboutSection />
      <WhatYouLearnSection />
      <ValueStackSection onRegisterClick={() => setIsRegistrationOpen(true)} />
      <SocialProofSection />
      <FOMOSection onRegisterClick={() => setIsRegistrationOpen(true)} />
      <InstructorSection />
      <WorkshopDetailsSection onRegisterClick={() => setIsRegistrationOpen(true)} />
      <WhoShouldAttendSection />
      <AddOnsSection />
      <FAQSection />
      {/* VideoSection for mobile only - shown above AICoursesSection */}
      <div className="block sm:hidden">
        <VideoSection isMobile={true} />
      </div>
      <AICoursesSection onEnrollClick={handleCourseEnroll} />
      <FinalCTASection onRegisterClick={() => setIsRegistrationOpen(true)} />
      <Footer />
      <FloatingElements onRegisterClick={() => setIsRegistrationOpen(true)} />
      <RegistrationPopup 
        isOpen={isRegistrationOpen} 
        onClose={() => setIsRegistrationOpen(false)} 
      />
      <CourseRegistrationPopup 
        isOpen={isCoursePopupOpen}
        onClose={() => setIsCoursePopupOpen(false)}
        selectedCourse={selectedCourse}
      />
    </main>
  );
};

export default Index;
