import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, Check } from "lucide-react";
import { workshopRegistrationSchema } from "@/lib/validations";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface RegistrationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

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

const addOns = [
  { id: 1, name: "E-book on AI Mastery Fundamentals by Prof. Brajesh Kumar", originalPrice: 28999, offerPrice: 249 },
  { id: 2, name: "E-book on Prompt Engineering", originalPrice: 35450, offerPrice: 199 },
  { id: 3, name: "Pack of 60 Best AI Toolkits", originalPrice: 10990, offerPrice: 99 },
  { id: 4, name: "200 Ready AI Prompts + 200 Project Blueprints", originalPrice: 79999, offerPrice: 299 },
  { id: 5, name: "Gold-Level Workshop Certificate (Industry Certification)", originalPrice: 15990, offerPrice: 149 },
  { id: 6, name: "E-book on AI Monetization Mastery", originalPrice: 150000, offerPrice: 249 },
  { id: 7, name: "Internship Support + Certification", originalPrice: 19990, offerPrice: 199 },
  { id: 8, name: "AI Startup Launch Package", originalPrice: 99990, offerPrice: 399 },
  { id: 9, name: "Personal AI Career Roadmap & Salary Growth Consultation", originalPrice: 49990, offerPrice: 299 },
  { id: 10, name: "AI Business Automation Package (for Entrepreneurs)", originalPrice: 149990, offerPrice: 499 },
  { id: 11, name: "Competitive Exam AI Tools", originalPrice: 599, offerPrice: 99 },
  { id: 12, name: "Lifetime VIP membership in Hi-Tech AI community", originalPrice: 45899, offerPrice: 1999 },
  { id: 13, name: "AI Video Creation Suite", originalPrice: 58999, offerPrice: 899 },
];

const RegistrationPopup = ({ isOpen, onClose }: RegistrationPopupProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    state: "",
    country: "India",
    status: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedAddOns, setSelectedAddOns] = useState<number[]>([]);
  const [step, setStep] = useState(1);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleAddOn = (id: number) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const validateForm = (): boolean => {
    const result = workshopRegistrationSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    if (step === 1) {
      if (validateForm()) {
        setIsSubmitting(true);
        try {
          // Insert registration to Supabase with status "form_filled"
          const { data, error } = await supabase
            .from('workshop_registrations')
            .insert({
              name: formData.name,
              mobile: formData.mobile,
              email: formData.email,
              city: formData.city,
              state: formData.state,
              country: formData.country,
              status: formData.status,
              registration_status: 'form_filled',
              registration_date: new Date().toISOString()
            })
            .select('id')
            .single();
          
          if (error) throw error;
          setRegistrationId(data.id);
          setStep(2);
        } catch (error) {
          console.error('Registration error:', error);
          toast.error("Failed to save registration. Please try again.");
        } finally {
          setIsSubmitting(false);
        }
      }
    } else {
      // Update with selected add-ons and navigate to payment
      await handleCompleteWithAddOns();
    }
  };

  const handleCompleteWithAddOns = async () => {
    if (!registrationId || isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      const selectedAddOnsList = addOns.filter(a => selectedAddOns.includes(a.id));
      const totalPrice = selectedAddOnsList.reduce((sum, a) => sum + a.offerPrice, 0);
      
      // Update registration with add-ons
      const { error } = await supabase
        .from('workshop_registrations')
        .update({
          addons_selected: selectedAddOnsList.map(a => ({ name: a.name, price: a.offerPrice })),
          addons_total_price: totalPrice,
          addons_selected_date: new Date().toISOString(),
          registration_status: 'addons_selected'
        })
        .eq('id', registrationId);
      
      if (error) throw error;
      
      // Store registration ID and navigate to payment
      localStorage.setItem('workshopRegistration', JSON.stringify({
        id: registrationId,
        type: 'workshop',
        addonsTotal: totalPrice,
        workshopFee: 99
      }));
      onClose();
      navigate('/payment?type=workshop');
    } catch (error) {
      console.error('Update error:', error);
      toast.error("Failed to update registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkipAddOns = async () => {
    if (!registrationId || isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      // Update with no add-ons
      const { error } = await supabase
        .from('workshop_registrations')
        .update({
          addons_selected: [],
          addons_total_price: 0,
          addons_selected_date: new Date().toISOString(),
          registration_status: 'addons_selected'
        })
        .eq('id', registrationId);
      
      if (error) throw error;
      
      localStorage.setItem('workshopRegistration', JSON.stringify({
        id: registrationId,
        type: 'workshop',
        addonsTotal: 0,
        workshopFee: 99
      }));
      onClose();
      navigate('/payment?type=workshop');
    } catch (error) {
      console.error('Update error:', error);
      toast.error("Failed to update registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", mobile: "", email: "", city: "", state: "", country: "India", status: "" });
    setSelectedAddOns([]);
    setStep(1);
    setErrors({});
    setRegistrationId(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg my-8 p-6 md:p-8 rounded-[8px] bg-white border border-border shadow-xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        <div className="text-center mb-6 border-b border-border pb-4">
          <h3 className="text-xl md:text-2xl font-bold text-foreground">
            {step === 1 ? "Register for Workshop" : "Optional Add-Ons"}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {step === 1 ? "Fill in your details to secure your seat" : "Enhance your learning (optional)"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-[4px] bg-white border ${errors.name ? 'border-destructive' : 'border-border'} focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors text-foreground text-sm`}
                  placeholder="Enter your full name"
                  maxLength={100}
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-[4px] bg-white border ${errors.mobile ? 'border-destructive' : 'border-border'} focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors text-foreground text-sm`}
                  placeholder="Enter your mobile number"
                  maxLength={15}
                />
                {errors.mobile && <p className="text-xs text-destructive mt-1">{errors.mobile}</p>}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-[4px] bg-white border ${errors.email ? 'border-destructive' : 'border-border'} focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors text-foreground text-sm`}
                  placeholder="Enter your email"
                  maxLength={255}
                />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-foreground mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-[4px] bg-white border ${errors.city ? 'border-destructive' : 'border-border'} focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors text-foreground text-sm`}
                    placeholder="City"
                    maxLength={100}
                  />
                  {errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-foreground mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-[4px] bg-white border ${errors.state ? 'border-destructive' : 'border-border'} focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors text-foreground text-sm`}
                    placeholder="State"
                    maxLength={100}
                  />
                  {errors.state && <p className="text-xs text-destructive mt-1">{errors.state}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground mb-1">
                  Current Status *
                </label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-[4px] bg-white border ${errors.status ? 'border-destructive' : 'border-border'} focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors text-foreground text-sm`}
                >
                  <option value="">Select your status</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                {errors.status && <p className="text-xs text-destructive mt-1">{errors.status}</p>}
              </div>
            </div>
          ) : (
            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2 -mx-2 px-2">
              {addOns.map((addon) => (
                <label
                  key={addon.id}
                  className={`flex items-start sm:items-center gap-3 p-4 rounded-[4px] cursor-pointer transition-all ${
                    selectedAddOns.includes(addon.id)
                      ? "bg-secondary/5 border border-primary ring-1 ring-primary/20"
                      : "bg-white border border-border hover:border-primary/50"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-[4px] border flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0 ${
                      selectedAddOns.includes(addon.id)
                        ? "bg-primary border-primary"
                        : "border-border bg-white"
                    }`}
                  >
                    {selectedAddOns.includes(addon.id) && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedAddOns.includes(addon.id)}
                    onChange={() => toggleAddOn(addon.id)}
                    className="hidden"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold text-foreground leading-tight block">{addon.name}</span>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <span className="text-xs text-muted-foreground line-through block">₹{addon.originalPrice.toLocaleString()}</span>
                    <span className="text-base font-bold text-foreground tabular-nums">₹{addon.offerPrice.toLocaleString()}</span>
                  </div>
                </label>
              ))}
              
              {selectedAddOns.length > 0 && (
                <div className="mt-4 p-4 rounded-[4px] bg-secondary/10 border border-primary/30 sticky bottom-0">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-sm text-muted-foreground font-medium">{selectedAddOns.length} add-on(s)</span>
                    <span className="text-lg font-bold text-foreground tabular-nums">
                      Total: ₹{selectedAddOns.reduce((sum, id) => {
                        const addon = addOns.find((a) => a.id === id);
                        return sum + (addon?.offerPrice || 0);
                      }, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 space-y-3">
            <Button type="submit" size="lg" className="w-full text-sm py-3 font-semibold rounded-[4px]" disabled={isSubmitting}>
              <span>{isSubmitting ? "Processing..." : (step === 1 ? "Continue to Add-Ons" : "Complete Registration")}</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            {step === 2 && (
              <button
                type="button"
                onClick={handleSkipAddOns}
                className="w-full text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                Skip add-ons & complete registration
              </button>
            )}
          </div>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6 pt-4 border-t border-border">
          Workshop: ₹99 + GST | Add-ons priced separately
        </p>
      </div>
    </div>
  );
};

export default RegistrationPopup;
