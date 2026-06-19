import { useState } from "react";
import { GraduationCap, Briefcase, Zap, Clock, Award, CheckCircle, AlertTriangle, Flame, GitCompare, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CourseComparisonModal from "./CourseComparisonModal";

// Helper function to parse Indian currency format to number
const parseFee = (fee: string): number => {
  return parseInt(fee.replace(/[₹,]/g, ''));
};

// Helper function to format number to Indian currency format
const formatFee = (amount: number): string => {
  return '₹' + amount.toLocaleString('en-IN');
};

// Calculate 20% of the discounted fee
export const calculate20Percent = (discountedFee: string): string => {
  const amount = parseFee(discountedFee);
  return formatFee(Math.round(amount * 0.2));
};

export interface Course {
  id: string;
  title: string;
  duration: string;
  benefit: string;
  originalFee: string;
  discountedFee: string;
  certification: string;
  certificationColor: string;
}

interface AICourseSectionProps {
  onEnrollClick: (course: Course) => void;
}

const studentCourses: Course[] = [
  {
    id: "student-1",
    title: "AI for Smart Study & Exam Preparation",
    duration: "1 Week",
    benefit: "Smart AI tools for study & exam preparation",
    originalFee: "₹55,500",
    discountedFee: "₹19,999",
    certification: "Silver Certification",
    certificationColor: "bg-gray-400"
  },
  {
    id: "student-2",
    title: "AI for Productivity, Research & Learning Excellence",
    duration: "1 Month",
    benefit: "Use AI for productivity, skill-focused research & learning",
    originalFee: "₹1,35,500",
    discountedFee: "₹98,999",
    certification: "Gold Certification",
    certificationColor: "bg-yellow-500"
  },
  {
    id: "student-3",
    title: "Future-Proof AI Mastery for Competitive Exams",
    duration: "6 Months",
    benefit: "Future-proof AI knowledge & competitive exam mastery",
    originalFee: "₹2,63,500",
    discountedFee: "₹1,90,999",
    certification: "Platinum Certification",
    certificationColor: "bg-purple-500"
  }
];

const professionalCourses: Course[] = [
  {
    id: "pro-1",
    title: "AI for Professional Tasks",
    duration: "1 Week",
    benefit: "Use AI for daily professional tasks",
    originalFee: "₹86,500",
    discountedFee: "₹29,999",
    certification: "Silver Certification",
    certificationColor: "bg-gray-400"
  },
  {
    id: "pro-2",
    title: "AI Implementation Expert",
    duration: "1 Month",
    benefit: "Become an AI implementation expert for real-world tasks",
    originalFee: "₹1,35,999",
    discountedFee: "₹98,999",
    certification: "Gold Certification",
    certificationColor: "bg-yellow-500"
  },
  {
    id: "pro-3",
    title: "Full-Stack AI Professional",
    duration: "6 Months",
    benefit: "Master AI tools, workflows & automation",
    originalFee: "₹2,63,500",
    discountedFee: "₹1,90,999",
    certification: "Platinum Certification",
    certificationColor: "bg-purple-500"
  },
  {
    id: "pro-4",
    title: "AI Expertise with Machine Learning",
    duration: "1 Year",
    benefit: "Advanced AI & ML applied expertise",
    originalFee: "₹4,85,999",
    discountedFee: "₹3,85,999",
    certification: "Diamond Certification",
    certificationColor: "bg-cyan-400"
  },
  {
    id: "pro-5",
    title: "Complete AI + Industry Leadership Program",
    duration: "2 Years",
    benefit: "Complete AI mastery with industry training",
    originalFee: "₹7,52,999",
    discountedFee: "₹6,49,999",
    certification: "Crown Certification",
    certificationColor: "bg-amber-600"
  }
];

const fastTrackCourse: Course = {
  id: "fast-track",
  title: "Fast-Track Professional AI Mastery",
  duration: "1 Month (Fast-Paced)",
  benefit: "Intensive AI upskilling for working professionals",
  originalFee: "₹4,87,500",
  discountedFee: "₹3,49,999",
  certification: "Diamond Crown Certification",
  certificationColor: "bg-gradient-to-r from-cyan-400 to-amber-500"
};

const CourseCard = ({ 
  course, 
  onEnroll, 
  featured = false,
  isSelected = false,
  onToggleCompare
}: { 
  course: Course; 
  onEnroll: () => void; 
  featured?: boolean;
  isSelected?: boolean;
  onToggleCompare?: () => void;
}) => (
  <div className={`enterprise-card relative group p-8 transition-colors ${
    isSelected 
      ? 'border-2 border-primary bg-secondary/10' 
      : featured 
        ? 'border-t-4 border-t-primary bg-white' 
        : 'border border-border bg-white'
  }`}>
    {/* Compare Checkbox */}
    {onToggleCompare && (
      <button
        onClick={onToggleCompare}
        className={`absolute top-4 left-4 w-6 h-6 rounded-[4px] border flex items-center justify-center transition-colors ${
          isSelected 
            ? 'bg-primary border-primary text-primary-foreground' 
            : 'bg-white border-border hover:border-primary'
        }`}
      >
        {isSelected && <Check className="w-4 h-4" />}
      </button>
    )}

    {/* Certification Badge */}
    <div className="absolute -top-3 right-4">
      <Badge className="bg-white text-primary border border-border font-semibold px-3 py-1 text-xs shadow-sm">
        <Award className="w-3 h-3 mr-1" />
        {course.certification}
      </Badge>
    </div>

    {/* Course Title */}
    <h4 className={`text-body font-semibold mb-4 mt-2 text-foreground leading-snug ${onToggleCompare ? 'ml-8' : ''}`}>
      {course.title}
    </h4>

    {/* Duration */}
    <div className="flex items-center gap-2 text-muted-foreground mb-4">
      <Clock className="w-4 h-4 text-primary" />
      <span className="text-sm font-medium">{course.duration}</span>
    </div>

    {/* Key Benefit */}
    <div className="flex items-start gap-3 mb-6">
      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
      <p className="text-sm text-foreground leading-relaxed">{course.benefit}</p>
    </div>

    {featured && (
      <div className="space-y-3 mb-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-sm text-foreground leading-relaxed">Designed for working professionals who need immediate upskilling</p>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-sm text-foreground leading-relaxed">Learn industry-ready 250–400 AI skills demanded by top companies</p>
        </div>
      </div>
    )}

    {/* Pricing */}
    <div className="flex items-baseline gap-3 mb-6 border-t border-border pt-6">
      <span className="text-lg text-muted-foreground line-through">{course.originalFee}</span>
      <span className="text-3xl font-display font-bold text-foreground tabular-nums tracking-tight">
        {course.discountedFee}
      </span>
    </div>

    {/* 20% Seat Booking FOMO - Compact */}
    <div className="mb-6 p-4 rounded-[4px] bg-[#FEF2F2] border border-[#FECACA]">
      <p className="text-sm font-semibold text-[#DC2626] mb-2 flex items-center justify-between">
        <span>Reserve Seat for 20%</span>
        <Flame className="h-4 w-4" />
      </p>
      <p className="text-xl font-bold text-[#DC2626] tabular-nums mb-1">
        Only {calculate20Percent(course.discountedFee)}
      </p>
      <p className="text-xs font-medium text-[#DC2626]/80 uppercase tracking-wider mt-2">
        Pay the rest later
      </p>
    </div>

    {/* CTA Button */}
    <Button 
      onClick={onEnroll}
      size="lg"
      className="w-full font-semibold rounded-[4px]"
    >
      <span>
        {featured ? 'Enroll Fast-Track' : 'Enroll Now'}
      </span>
    </Button>
  </div>
);

const AICoursesSection = ({ onEnrollClick }: AICourseSectionProps) => {
  const [selectedForComparison, setSelectedForComparison] = useState<Course[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  const allCourses = [...studentCourses, ...professionalCourses, fastTrackCourse];

  const toggleCourseComparison = (course: Course) => {
    setSelectedForComparison(prev => {
      const isSelected = prev.some(c => c.id === course.id);
      if (isSelected) {
        return prev.filter(c => c.id !== course.id);
      }
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, course];
    });
  };

  const removeCourseFromComparison = (courseId: string) => {
    setSelectedForComparison(prev => prev.filter(c => c.id !== courseId));
  };

  const isCourseSelected = (courseId: string) => {
    return selectedForComparison.some(c => c.id === courseId);
  };

  return (
    <section className="py-20 bg-secondary/10 border-b border-border">
      <div className="container mx-auto px-6 max-w-[1366px]">
        
        {/* Main Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-white text-primary border-primary/30 mb-6 px-4 py-2 text-sm uppercase tracking-wider font-semibold shadow-sm">
            Limited Time Offer
          </Badge>
          <h2 className="text-page-title tracking-tight text-foreground mb-4">
            Enroll In Our AI Certification Courses
          </h2>
          <p className="text-subheading text-muted-foreground">
            Get instant discount and secure your spot today.
          </p>
        </div>

        {/* Compare Button - Floating */}
        {selectedForComparison.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
            <Button
              size="lg"
              onClick={() => setShowComparisonModal(true)}
              className="font-semibold px-8 rounded-full shadow-lg flex items-center gap-2"
            >
              <GitCompare className="w-5 h-5" />
              <span>Compare {selectedForComparison.length} Course{selectedForComparison.length !== 1 ? 's' : ''}</span>
            </Button>
          </div>
        )}

        {/* SECTION A: Student-Focused AI Courses */}
        <div className="mb-24">
          <div className="mb-12 border-b border-border pb-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-[4px] bg-white border border-border flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-body font-semibold text-foreground">
                For Students
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Learn faster, smarter & future-ready. Designed for school, college & competitive exams.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studentCourses.map((course) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onEnroll={() => onEnrollClick(course)}
                isSelected={isCourseSelected(course.id)}
                onToggleCompare={() => toggleCourseComparison(course)}
              />
            ))}
          </div>
        </div>

        {/* SECTION B: Professional AI Courses */}
        <div className="mb-24">
          <div className="mb-12 border-b border-border pb-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-[4px] bg-white border border-border flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-body font-semibold text-foreground">
                For Professionals
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Upgrade skills, salary & career. Built for job seekers & working professionals.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {professionalCourses.map((course) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onEnroll={() => onEnrollClick(course)}
                isSelected={isCourseSelected(course.id)}
                onToggleCompare={() => toggleCourseComparison(course)}
              />
            ))}
          </div>
        </div>

        {/* SECTION C: Fast-Track Professional AI Course */}
        <div>
          <div className="mb-12 border-b border-border pb-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-[4px] bg-white border border-border flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-body font-semibold text-foreground">
                Fast-Track Program
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Intensive upskilling for ambitious professionals who must upgrade NOW.
              </p>
            </div>
          </div>

          <div className="max-w-3xl">
            <CourseCard 
              course={fastTrackCourse} 
              onEnroll={() => onEnrollClick(fastTrackCourse)} 
              featured={true}
              isSelected={isCourseSelected(fastTrackCourse.id)}
              onToggleCompare={() => toggleCourseComparison(fastTrackCourse)}
            />
          </div>
        </div>

      </div>

      {/* Comparison Modal */}
      <CourseComparisonModal
        isOpen={showComparisonModal}
        onClose={() => setShowComparisonModal(false)}
        selectedCourses={selectedForComparison}
        onRemoveCourse={removeCourseFromComparison}
        onEnrollClick={onEnrollClick}
      />
    </section>
  );
};

export default AICoursesSection;
