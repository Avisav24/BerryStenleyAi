import { X, Clock, Award, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

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

interface CourseComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCourses: Course[];
  onRemoveCourse: (courseId: string) => void;
  onEnrollClick: (course: Course) => void;
}

const CourseComparisonModal = ({ 
  isOpen, 
  onClose, 
  selectedCourses, 
  onRemoveCourse,
  onEnrollClick 
}: CourseComparisonModalProps) => {
  if (!isOpen) return null;

  const comparisonFeatures = [
    { label: "Duration", key: "duration", icon: Clock },
    { label: "Key Benefit", key: "benefit", icon: CheckCircle },
    { label: "Original Fee", key: "originalFee", icon: null },
    { label: "Discounted Fee", key: "discountedFee", icon: null },
    { label: "Certification", key: "certification", icon: Award },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-[8px] shadow-xl border border-border flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border bg-white flex-shrink-0">
          <div>
            <h3 className="font-display text-xl md:text-2xl font-bold">Compare Courses</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {selectedCourses.length} course{selectedCourses.length !== 1 ? 's' : ''} selected
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content - Scrollable Area */}
        <ScrollArea className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 100px)' }}>
          {selectedCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <Award className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium text-muted-foreground text-center">
                No courses selected for comparison
              </p>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Click "Compare" on course cards to add them here
              </p>
            </div>
          ) : (
            <div className="p-4 md:p-6">
              {/* Mobile View - Stacked Cards */}
              <div className="block lg:hidden space-y-6">
                {selectedCourses.map((course) => (
                  <div 
                    key={course.id} 
                    className="relative bg-white rounded-[4px] p-4 border border-border shadow-sm"
                  >
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={() => onRemoveCourse(course.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    
                    <Badge className={`${course.certificationColor} text-white text-xs mb-3`}>
                      {course.certification}
                    </Badge>
                    
                    <h4 className="font-display font-bold text-lg mb-4 pr-8">{course.title}</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{course.duration}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{course.benefit}</span>
                      </div>
                      <div className="pt-2 border-t border-border">
                        <span className="text-sm text-muted-foreground line-through">{course.originalFee}</span>
                        <span className="text-xl font-bold text-primary ml-2">{course.discountedFee}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-4 bg-primary hover:bg-primary/90"
                      onClick={() => {
                        onClose();
                        onEnrollClick(course);
                      }}
                    >
                      Enroll Now <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Desktop View - Table Comparison */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left p-4 bg-secondary/5 border-b border-border font-semibold text-sm">
                        Feature
                      </th>
                      {selectedCourses.map((course) => (
                        <th 
                          key={course.id} 
                          className="p-4 bg-secondary/5 border-b border-border text-center min-w-[220px]"
                        >
                          <div className="relative">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive/10 hover:bg-destructive/20"
                              onClick={() => onRemoveCourse(course.id)}
                            >
                              <X className="w-3 h-3 text-destructive" />
                            </Button>
                            <Badge className={`${course.certificationColor} text-white text-xs mb-2`}>
                              {course.certification}
                            </Badge>
                            <h4 className="font-display font-bold text-sm leading-tight px-4">
                              {course.title}
                            </h4>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((feature, index) => (
                      <tr key={feature.key} className={index % 2 === 0 ? 'bg-secondary/5' : 'bg-white'}>
                        <td className="p-4 font-medium text-sm">
                          <div className="flex items-center gap-2">
                            {feature.icon && <feature.icon className="w-4 h-4 text-primary" />}
                            {feature.label}
                          </div>
                        </td>
                        {selectedCourses.map((course) => (
                          <td key={course.id} className="p-4 text-center">
                            {feature.key === 'originalFee' ? (
                              <span className="text-muted-foreground line-through">
                                {course[feature.key as keyof Course]}
                              </span>
                            ) : feature.key === 'discountedFee' ? (
                              <span className="font-bold text-primary text-lg">
                                {course[feature.key as keyof Course]}
                              </span>
                            ) : feature.key === 'certification' ? (
                              <Badge className={`${course.certificationColor} text-white text-xs`}>
                                {course[feature.key as keyof Course]}
                              </Badge>
                            ) : (
                              <span className="text-sm">
                                {course[feature.key as keyof Course]}
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                    {/* Enroll Row */}
                    <tr className="bg-white border-t border-border">
                      <td className="p-4 font-semibold">Action</td>
                      {selectedCourses.map((course) => (
                        <td key={course.id} className="p-4 text-center">
                          <Button 
                            className="bg-primary hover:bg-primary/90 font-semibold"
                            onClick={() => {
                              onClose();
                              onEnrollClick(course);
                            }}
                          >
                            Enroll Now <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default CourseComparisonModal;
