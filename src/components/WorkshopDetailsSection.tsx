import { Button } from "@/components/ui/button";
import { Mic, Calendar, Clock, Monitor, FileText, ArrowRight, Download } from "lucide-react";

interface WorkshopDetailsSectionProps {
  onRegisterClick?: () => void;
}

const WorkshopDetailsSection = ({ onRegisterClick }: WorkshopDetailsSectionProps) => {
  return (
    <section className="py-20 bg-background border-b border-border">
      <div className="container mx-auto px-6 max-w-[1366px]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-section-title tracking-tight text-foreground">
              Workshop Details
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            <div className="enterprise-card p-6 text-center bg-white border border-border">
              <Mic className="h-8 w-8 mx-auto mb-4 text-primary" />
              <div className="text-sm font-semibold text-foreground mb-1">Live Online</div>
              <div className="text-xs text-muted-foreground">Workshop</div>
            </div>
            <div className="enterprise-card p-6 text-center bg-white border border-border">
              <Calendar className="h-8 w-8 mx-auto mb-4 text-primary" />
              <div className="text-sm font-semibold text-foreground mb-1">This Sunday</div>
              <div className="text-xs text-muted-foreground">Date</div>
            </div>
            <div className="enterprise-card p-6 text-center bg-white border border-border">
              <Clock className="h-8 w-8 mx-auto mb-4 text-primary" />
              <div className="text-sm font-semibold text-foreground mb-1">3 Hours</div>
              <div className="text-xs text-muted-foreground">Duration</div>
            </div>
            <div className="enterprise-card p-6 text-center bg-white border border-border">
              <Monitor className="h-8 w-8 mx-auto mb-4 text-primary" />
              <div className="text-sm font-semibold text-foreground mb-1">Online Live</div>
              <div className="text-xs text-muted-foreground">No Recordings</div>
            </div>
            <div className="enterprise-card p-6 text-center bg-white border border-border">
              <FileText className="h-8 w-8 mx-auto mb-4 text-primary" />
              <div className="text-xl font-bold text-foreground mb-1 tracking-tight">₹99</div>
              <div className="text-xs text-muted-foreground">Only</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="w-full sm:w-auto px-8" onClick={onRegisterClick}>
              <span className="font-semibold">Join Now</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
              <Download className="mr-2 h-4 w-4" />
              <span className="font-medium">Download Brochure</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkshopDetailsSection;
