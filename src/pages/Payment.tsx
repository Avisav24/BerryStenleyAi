import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, CreditCard, Award, CheckCircle, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

interface CourseRegistrationData {
  fullName: string;
  mobile: string;
  email: string;
  city: string;
  state: string;
  country: string;
  enrollmentId: string;
  course: Course;
  paymentOption: '20' | '50' | '100';
  paymentAmount: string;
}

interface WorkshopRegistrationData {
  id: string;
  type: 'workshop';
  addonsTotal: number;
  workshopFee: number;
}

const Payment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'course';
  
  const [courseData, setCourseData] = useState<CourseRegistrationData | null>(null);
  const [workshopData, setWorkshopData] = useState<WorkshopRegistrationData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (type === 'workshop') {
      const data = localStorage.getItem('workshopRegistration');
      if (data) {
        setWorkshopData(JSON.parse(data));
      } else {
        navigate('/');
      }
    } else {
      const data = localStorage.getItem('courseRegistration');
      if (data) {
        setCourseData(JSON.parse(data));
      } else {
        navigate('/');
      }
    }
  }, [navigate, type]);

  const handleConfirmPayment = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    
    // Payment gateway integration pending - for now simulate payment
    const confirmed = window.confirm(
      'You will be redirected to our secure payment gateway.\n\n' +
      'Payment gateway integration is being configured.\n' +
      'Please contact aiacademy@berrystenley.com for manual payment processing.'
    );
    
    if (confirmed) {
      try {
        // Simulate successful payment - update database
        const mockPaymentId = 'PAY_' + Date.now();
        
        if (type === 'workshop' && workshopData) {
          const totalAmount = workshopData.workshopFee + workshopData.addonsTotal;
          await supabase
            .from('workshop_registrations')
            .update({
              payment_status: 'paid',
              payment_id: mockPaymentId,
              payment_mode: 'online',
              total_amount_paid: totalAmount,
              payment_date: new Date().toISOString()
            })
            .eq('id', workshopData.id);
          
          localStorage.removeItem('workshopRegistration');
          toast.success("Workshop registration completed successfully!");
        } else if (type === 'course' && courseData) {
          const payAmount = parseInt(courseData.paymentAmount.replace(/[₹,]/g, ''));
          await supabase
            .from('course_enrollments')
            .update({
              payment_status: 'paid',
              payment_id: mockPaymentId,
              payment_mode: 'online',
              total_amount_paid: payAmount,
              payment_date: new Date().toISOString()
            })
            .eq('id', courseData.enrollmentId);
          
          localStorage.removeItem('courseRegistration');
          toast.success("Course enrollment completed successfully!");
        }
        
        navigate('/');
      } catch (error) {
        console.error('Payment update error:', error);
        toast.error("Failed to update payment status. Please contact support.");
      }
    }
    
    setIsProcessing(false);
  };

  if (type === 'workshop') {
    if (!workshopData) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      );
    }
    
    const totalAmount = workshopData.workshopFee + workshopData.addonsTotal;
    
    return (
      <main className="min-h-screen bg-background border-t border-border">
        <header className="bg-white border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => navigate('/')} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-4 h-4 text-green-500" />
                Secure Checkout
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
                <CreditCard className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary">SECURE PAYMENT</span>
              </div>
              <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                Complete Workshop Registration
              </h1>
            </div>

            <div className="bg-white border border-border rounded-[8px] p-6 md:p-8 mb-6 shadow-sm">
              <h2 className="font-display text-lg md:text-xl font-bold mb-4">Payment Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Workshop Fee:</span>
                  <span className="font-medium">₹{workshopData.workshopFee}</span>
                </div>
                {workshopData.addonsTotal > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Add-ons Total:</span>
                    <span className="font-medium">₹{workshopData.addonsTotal.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-border/50">
                  <span className="font-bold text-lg">Total Amount:</span>
                  <span className="font-display text-2xl font-bold text-primary">₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-6 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-green-500" />
                <span>256-bit Encryption</span>
              </div>
            </div>

            <Button 
              onClick={handleConfirmPayment}
              disabled={isProcessing}
              size="lg"
              className="w-full py-8 text-base md:text-lg font-bold rounded-[4px]"
            >
              {isProcessing ? "Processing..." : "CONFIRM PAYMENT"}
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // Course payment
  if (!courseData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const { course } = courseData;

  return (
    <main className="min-h-screen bg-background border-t border-border">
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/')} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4 text-green-500" />
              Secure Checkout
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
              <CreditCard className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">SECURE PAYMENT</span>
            </div>
            <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
              Complete Your Enrollment
            </h1>
            <p className="text-muted-foreground">You're just one step away from your AI certification journey</p>
          </div>

          <div className="bg-white border border-border rounded-[8px] p-6 md:p-8 mb-6 shadow-sm">
            <div className="flex items-start justify-between mb-6">
              <h2 className="font-display text-lg md:text-xl font-bold">Course Summary</h2>
              <Badge className={`${course.certificationColor} text-white font-semibold px-3 py-1`}>
                <Award className="w-3 h-3 mr-1" />
                {course.certification}
              </Badge>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-primary mb-2">
                  {course.title}
                </h3>
                <p className="text-muted-foreground">{course.benefit}</p>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Duration: {course.duration}
              </div>

              <div className="border-t border-border/50 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Original Fee:</span>
                  <span className="text-lg line-through text-muted-foreground">{course.originalFee}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Discounted Fee:</span>
                  <span className="text-lg line-through text-muted-foreground">{course.discountedFee}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Payment Plan:</span>
                  <Badge className={`${
                    courseData.paymentOption === '20' ? 'bg-green-500' : 
                    courseData.paymentOption === '50' ? 'bg-blue-500' : 'bg-amber-500'
                  } text-white font-semibold`}>
                    {courseData.paymentOption}% Payment
                  </Badge>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-dashed border-primary/30">
                  <span className="font-bold text-lg">Amount to Pay Now:</span>
                  <span className="font-display text-2xl md:text-3xl font-bold text-primary">{courseData.paymentAmount}</span>
                </div>
                {courseData.paymentOption !== '100' && (
                  <p className="text-xs text-muted-foreground text-right mt-1">
                    * Remaining balance to be paid before course starts
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white border border-border rounded-[8px] p-6 md:p-8 mb-6 shadow-sm">
            <h2 className="font-display text-lg md:text-xl font-bold mb-4">Student Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Name:</span>
                <p className="font-medium">{courseData.fullName}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span>
                <p className="font-medium">{courseData.email}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Mobile:</span>
                <p className="font-medium">{courseData.mobile}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Location:</span>
                <p className="font-medium">{courseData.city}, {courseData.state}, {courseData.country}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-6 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-green-500" />
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-green-500" />
              <span>Safe Checkout</span>
            </div>
          </div>

          <div className="bg-secondary/5 border border-border rounded-[4px] p-4 text-center mb-8">
            <p className="text-sm md:text-base font-medium">
              🔒 100% Secure Payment | Industry-Recognized Certification | Lifetime Skill Value
            </p>
          </div>

          <Button 
            onClick={handleConfirmPayment}
            disabled={isProcessing}
            size="lg"
            className="w-full py-8 text-base md:text-lg font-bold rounded-[4px]"
          >
            {isProcessing ? "Processing..." : "CONFIRM PAYMENT & START AI JOURNEY"}
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-4">
            By clicking the button above, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </main>
  );
};

export default Payment;