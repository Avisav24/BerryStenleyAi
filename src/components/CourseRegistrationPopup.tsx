import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Award, Sparkles, Zap, Crown } from "lucide-react";
import logoBerryStenley from "@/assets/logo-berry-stenley.png";
import { courseRegistrationSchema } from "@/lib/validations";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Helper function to parse Indian currency format to number
const parseFee = (fee: string): number => {
  return parseInt(fee.replace(/[₹,]/g, ''));
};

// Helper function to format number to Indian currency format
const formatFee = (amount: number): string => {
  return '₹' + amount.toLocaleString('en-IN');
};

// Calculate percentage of the discounted fee
const calculatePercentage = (discountedFee: string, percent: number): string => {
  const amount = parseFee(discountedFee);
  return formatFee(Math.round(amount * percent / 100));
};

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

interface CourseRegistrationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCourse: Course | null;
}

const allCourses: Course[] = [
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
  },
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
  },
  {
    id: "fast-track",
    title: "Fast-Track Professional AI Mastery",
    duration: "1 Month (Fast-Paced)",
    benefit: "Intensive AI upskilling for working professionals",
    originalFee: "₹4,87,500",
    discountedFee: "₹3,49,999",
    certification: "Diamond Crown Certification",
    certificationColor: "bg-gradient-to-r from-cyan-400 to-amber-500"
  }
];

const statusOptions = [
  "Student (School)",
  "Student (College/University)",
  "Student (Competitive Exam Preparation)",
  "Working Professional (IT/Tech)",
  "Working Professional (Non-IT)",
  "Business Owner/Entrepreneur",
  "Freelancer",
  "Teacher/Educator",
  "Government Employee",
  "Homemaker",
  "Job Seeker",
  "Other",
];

type PaymentOption = '20' | '50' | '100';

const CourseRegistrationPopup = ({ isOpen, onClose, selectedCourse }: CourseRegistrationPopupProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    city: "",
    state: "",
    country: "",
    status: "",
    courseId: selectedCourse?.id || ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paymentOption, setPaymentOption] = useState<PaymentOption>('20');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update course selection when selectedCourse prop changes
  useEffect(() => {
    if (selectedCourse) {
      setFormData(prev => ({ ...prev, courseId: selectedCourse.id }));
    }
  }, [selectedCourse]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error on change
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const result = courseRegistrationSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Please fix the form errors before proceeding");
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    if (!validateForm()) {
      return;
    }

    const course = allCourses.find(c => c.id === formData.courseId);
    if (course) {
      setIsSubmitting(true);
      try {
        const paymentAmount = calculatePercentage(course.discountedFee, parseInt(paymentOption));
        const courseFee = parseFee(course.discountedFee);
        const payNow = parseFee(paymentAmount);
        
        // Insert enrollment to Supabase
        const { data, error } = await supabase
          .from('course_enrollments')
          .insert({
            name: formData.fullName,
            mobile: formData.mobile,
            email: formData.email,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            status: formData.status,
            course_name: course.title,
            course_fee: courseFee,
            registration_status: 'form_filled',
            registration_date: new Date().toISOString(),
            due_amount: courseFee - payNow
          })
          .select('id')
          .single();
        
        if (error) throw error;
        
        // Store for payment page
        localStorage.setItem('courseRegistration', JSON.stringify({ 
          ...formData,
          enrollmentId: data.id,
          course,
          paymentOption,
          paymentAmount
        }));
        onClose();
        navigate('/payment?type=course');
      } catch (error) {
        console.error('Enrollment error:', error);
        toast.error("Failed to save enrollment. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const getSelectedCourse = () => {
    return allCourses.find(c => c.id === formData.courseId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-white border border-border shadow-xl rounded-[8px]">
        <DialogHeader className="text-center pb-4 border-b border-border/30">
          {/* Berry Stenley Logo */}
          <div className="flex justify-center mb-3">
            <img 
              src={logoBerryStenley} 
              alt="Berry Stenley" 
              className="h-12 sm:h-14 md:h-16 w-auto object-contain"
            />
          </div>
          <DialogTitle className="font-display text-lg sm:text-xl md:text-2xl font-bold">
            Secure Your AI Certification Seat
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 pt-4">
          {/* Full Name */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="fullName" className="text-xs sm:text-sm font-medium">Full Name *</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="Enter your full name"
              required
              maxLength={100}
              className={`w-full px-4 py-2.5 rounded-[4px] bg-white border ${errors.fullName ? 'border-destructive' : 'border-border'} focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors text-foreground text-sm`}
            />
            {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
          </div>

          {/* Mobile Number */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="mobile" className="text-xs sm:text-sm font-medium">Mobile Number *</Label>
            <Input
              id="mobile"
              type="tel"
              value={formData.mobile}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
              placeholder="Enter your mobile number"
              required
              maxLength={15}
              className={`w-full px-4 py-2.5 rounded-[4px] bg-white border ${errors.mobile ? 'border-destructive' : 'border-border'} focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors text-foreground text-sm`}
            />
            {errors.mobile && <p className="text-xs text-destructive">{errors.mobile}</p>}
          </div>

          {/* Email ID */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="email" className="text-xs sm:text-sm font-medium">Email ID *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email address"
              required
              maxLength={255}
              className={`w-full px-4 py-2.5 rounded-[4px] bg-white border ${errors.email ? 'border-destructive' : 'border-border'} focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors text-foreground text-sm`}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          {/* City & State Row */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="city" className="text-xs sm:text-sm font-medium">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="Your city"
                required
                maxLength={100}
                className={`w-full px-4 py-2.5 rounded-[4px] bg-white border ${errors.city ? 'border-destructive' : 'border-border'} focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors text-foreground text-sm`}
              />
              {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="state" className="text-xs sm:text-sm font-medium">State *</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                placeholder="Your state"
                required
                maxLength={100}
                className={`w-full px-4 py-2.5 rounded-[4px] bg-white border ${errors.state ? 'border-destructive' : 'border-border'} focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors text-foreground text-sm`}
              />
              {errors.state && <p className="text-xs text-destructive">{errors.state}</p>}
            </div>
          </div>

          {/* Country - Text Input */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="country" className="text-xs sm:text-sm font-medium">Country *</Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              placeholder="Enter your country"
              required
              maxLength={100}
              className={`w-full px-4 py-2.5 rounded-[4px] bg-white border ${errors.country ? 'border-destructive' : 'border-border'} focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors text-foreground text-sm`}
            />
            {errors.country && <p className="text-xs text-destructive">{errors.country}</p>}
          </div>

          {/* Current Status */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="status" className="text-xs sm:text-sm font-medium">Current Status *</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)} required>
              <SelectTrigger className={`w-full px-4 py-2.5 rounded-[4px] bg-white border ${errors.status ? 'border-destructive' : 'border-border'} focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors text-foreground text-sm h-auto`}>
                <SelectValue placeholder="Select your current status" />
              </SelectTrigger>
              <SelectContent className="bg-white border-border z-50">
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status} className="text-sm sm:text-base">
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Course Selection */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="course" className="text-xs sm:text-sm font-medium">Select Course *</Label>
            <Select 
              value={formData.courseId} 
              onValueChange={(value) => handleInputChange('courseId', value)} 
              required
            >
              <SelectTrigger className="w-full px-4 py-2.5 rounded-[4px] bg-white border border-border focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors text-foreground text-sm h-auto">
                <SelectValue placeholder="Choose your AI certification course">
                  {getSelectedCourse() && (
                    <span className="text-left text-xs sm:text-sm">
                      {getSelectedCourse()?.title}
                    </span>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-card border-border z-50 max-h-80">
                {allCourses.map((course) => (
                  <SelectItem 
                    key={course.id} 
                    value={course.id} 
                    className="py-2.5 sm:py-3 cursor-pointer data-[state=checked]:bg-primary/20 data-[state=checked]:text-foreground"
                  >
                    <div className="text-left">
                      <div className="font-medium text-xs sm:text-sm">{course.title}</div>
                      <div className="text-[10px] sm:text-xs mt-1 flex flex-wrap items-center gap-1 sm:gap-2">
                        <span className="text-muted-foreground">{course.duration}</span>
                        <span className="text-muted-foreground">|</span>
                        <span className="line-through text-muted-foreground">{course.originalFee}</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="font-bold text-primary">{course.discountedFee}</span>
                        <span className="text-muted-foreground">|</span>
                        <span className="text-muted-foreground">{course.certification}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selected Course Summary Card with Payment Options */}
          {getSelectedCourse() && (
            <div className="bg-secondary/5 border border-border rounded-[8px] p-4">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <span className="font-semibold text-xs sm:text-sm leading-tight">{getSelectedCourse()?.title}</span>
              </div>
              
              {/* Course Details Grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm mb-3">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{getSelectedCourse()?.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground truncate">{getSelectedCourse()?.certification}</span>
                </div>
              </div>
              
              {/* Pricing */}
              <div className="flex items-center justify-between py-2 border-t border-border/30">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm text-muted-foreground">Course Fee:</span>
                  <span className="line-through text-muted-foreground text-xs sm:text-sm">{getSelectedCourse()?.originalFee}</span>
                </div>
                <span className="font-bold text-primary text-base sm:text-lg">{getSelectedCourse()?.discountedFee}</span>
              </div>

              {/* Payment Options */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm font-semibold text-foreground mb-3">
                  Choose your payment option:
                </p>
                
                <div className="space-y-2">
                  {/* 20% Option */}
                  <button
                    type="button"
                    onClick={() => setPaymentOption('20')}
                    className={`w-full p-3 rounded-[4px] border transition-all duration-200 text-left ${
                      paymentOption === '20' 
                        ? 'bg-primary/5 border-primary ring-1 ring-primary/20' 
                        : 'bg-white border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className={`w-4 h-4 ${paymentOption === '20' ? 'text-green-500' : 'text-muted-foreground'}`} />
                        <div>
                          <p className={`text-xs sm:text-sm font-bold ${paymentOption === '20' ? 'text-green-600 dark:text-green-400' : 'text-foreground'}`}>
                            🎯 Book with 20% – Grab Your Seat NOW!
                          </p>
                          <p className="text-[10px] sm:text-xs text-muted-foreground">
                            ⚡ Most Popular • Limited Seats Available
                          </p>
                        </div>
                      </div>
                      <span className={`font-display font-bold text-sm sm:text-base ${paymentOption === '20' ? 'text-green-600 dark:text-green-400' : 'text-primary'}`}>
                        {calculatePercentage(getSelectedCourse()!.discountedFee, 20)}
                      </span>
                    </div>
                  </button>

                  {/* 50% Option */}
                  <button
                    type="button"
                    onClick={() => setPaymentOption('50')}
                    className={`w-full p-3 rounded-[4px] border transition-all duration-200 text-left ${
                      paymentOption === '50' 
                        ? 'bg-primary/5 border-primary ring-1 ring-primary/20' 
                        : 'bg-white border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className={`w-4 h-4 ${paymentOption === '50' ? 'text-blue-500' : 'text-muted-foreground'}`} />
                        <div>
                          <p className={`text-xs sm:text-sm font-bold ${paymentOption === '50' ? 'text-blue-600 dark:text-blue-400' : 'text-foreground'}`}>
                            💎 Secure with 50% – Smart Choice!
                          </p>
                          <p className="text-[10px] sm:text-xs text-muted-foreground">
                            ✨ Priority Access • Fast-Track Confirmation
                          </p>
                        </div>
                      </div>
                      <span className={`font-display font-bold text-sm sm:text-base ${paymentOption === '50' ? 'text-blue-600 dark:text-blue-400' : 'text-primary'}`}>
                        {calculatePercentage(getSelectedCourse()!.discountedFee, 50)}
                      </span>
                    </div>
                  </button>

                  {/* Full Payment Option */}
                  <button
                    type="button"
                    onClick={() => setPaymentOption('100')}
                    className={`w-full p-3 rounded-[4px] border transition-all duration-200 text-left ${
                      paymentOption === '100' 
                        ? 'bg-primary/5 border-primary ring-1 ring-primary/20' 
                        : 'bg-white border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Crown className={`w-4 h-4 ${paymentOption === '100' ? 'text-amber-500' : 'text-muted-foreground'}`} />
                        <div>
                          <p className={`text-xs sm:text-sm font-bold ${paymentOption === '100' ? 'text-amber-600 dark:text-amber-400' : 'text-foreground'}`}>
                            👑 Full Payment – VIP Experience!
                          </p>
                          <p className="text-[10px] sm:text-xs text-muted-foreground">
                            🌟 Instant Confirmation • Exclusive Benefits
                          </p>
                        </div>
                      </div>
                      <span className={`font-display font-bold text-sm sm:text-base ${paymentOption === '100' ? 'text-amber-600 dark:text-amber-400' : 'text-primary'}`}>
                        {getSelectedCourse()!.discountedFee}
                      </span>
                    </div>
                  </button>
                </div>

                {/* Selected Payment Summary */}
                <div className="mt-4 p-4 bg-secondary/5 rounded-[4px] border border-border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs sm:text-sm font-medium text-muted-foreground">Amount to Pay Now:</span>
                    <span className="font-display font-bold text-lg sm:text-xl text-primary">
                      {paymentOption === '100' 
                        ? getSelectedCourse()!.discountedFee 
                        : calculatePercentage(getSelectedCourse()!.discountedFee, parseInt(paymentOption))
                      }
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-center text-muted-foreground mt-1">
                    {paymentOption !== '100' && `Remaining: ${calculatePercentage(getSelectedCourse()!.discountedFee, 100 - parseInt(paymentOption))} to be paid later`}
                    {paymentOption === '100' && '✅ Full payment - No remaining balance'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            size="lg"
            className="w-full py-6 font-semibold rounded-[4px]"
            disabled={!formData.courseId || !formData.fullName || !formData.mobile || !formData.email || !formData.city || !formData.state || !formData.country || !formData.status}
          >
            Proceed to Payment
          </Button>

          <p className="text-[10px] sm:text-xs text-center text-muted-foreground">
            🔒 Your information is secure and will never be shared
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CourseRegistrationPopup;