import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";

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

const AddOnsSection = () => {
  const [selectedAddOns, setSelectedAddOns] = useState<number[]>([]);

  const toggleAddOn = (id: number) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const totalSelected = selectedAddOns.reduce((sum, id) => {
    const addon = addOns.find((a) => a.id === id);
    return sum + (addon?.offerPrice || 0);
  }, 0);

  return (
    <section className="py-20 bg-background border-b border-border">
      <div className="container mx-auto px-6 max-w-[1366px]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-section-title tracking-tight text-foreground mb-4">
              Optional Add-Ons
            </h2>
            <p className="text-subheading text-muted-foreground">
              Enhance your learning with these premium packages
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {addOns.map((addon) => (
              <div
                key={addon.id}
                className={`enterprise-card p-6 transition-all duration-200 cursor-pointer bg-white border ${
                  selectedAddOns.includes(addon.id)
                    ? "border-primary ring-1 ring-primary/20 shadow-md bg-secondary/5"
                    : "border-border hover:border-primary/50 hover:shadow-sm"
                }`}
                onClick={() => toggleAddOn(addon.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-5 h-5 rounded-[4px] border flex items-center justify-center transition-colors ${
                      selectedAddOns.includes(addon.id)
                        ? "bg-primary border-primary"
                        : "border-border bg-white"
                    }`}
                  >
                    {selectedAddOns.includes(addon.id) && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                </div>
                <h3 className="text-sm font-semibold mb-4 text-foreground leading-tight min-h-[40px]">
                  {addon.name}
                </h3>
                <div className="space-y-1 border-t border-border pt-4">
                  <div className="text-xs text-muted-foreground line-through">
                    ₹{addon.originalPrice.toLocaleString()}
                  </div>
                  <div className="text-2xl font-bold text-foreground tabular-nums tracking-tight">
                    ₹{addon.offerPrice.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedAddOns.length > 0 && (
            <div className="p-6 enterprise-card border border-primary bg-secondary/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="text-sm text-muted-foreground font-medium mb-1">
                  {selectedAddOns.length} add-on(s) selected
                </div>
                <div className="text-2xl font-bold text-foreground tabular-nums tracking-tight">
                  Total: ₹{totalSelected.toLocaleString()}
                </div>
              </div>
              <Button size="lg" className="w-full sm:w-auto font-semibold px-8 rounded-[4px]">
                <ShoppingCart className="mr-2 h-5 w-5" />
                <span>Add to Cart</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AddOnsSection;
