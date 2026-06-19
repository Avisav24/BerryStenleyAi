import { useState } from "react";
import { Phone, Mail, Globe, MapPin, Clock, Linkedin, MessageCircle, Shield, FileText } from "lucide-react";
import Logo from "./Logo";
import AdminLoginPopup from "./AdminLoginPopup";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  
  return (
    <footer className="py-12 sm:py-16 bg-white border-t border-border">
      <div className="container mx-auto px-6 max-w-[1366px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & Brand */}
          <div className="text-left">
            <Logo size="lg" className="mb-4" />
            <h3 className="font-display font-semibold text-base sm:text-lg text-foreground mb-2">
              Berry Stenley AI Academy
            </h3>
            <p className="text-sm text-muted-foreground">
              Subsidiary of Berry Stenley Pvt. Ltd.
            </p>
          </div>

          {/* About Us */}
          <div className="text-left">
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wider text-muted-foreground">About Us</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Berry Stenley AI Academy is a world-class AI learning institute empowering students & professionals to master practical, industry-relevant AI skills. We don't teach theory — We make you job-ready.
            </p>
          </div>

          {/* Contact Us */}
          <div className="text-left">
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wider text-muted-foreground">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <a href="tel:9599731412" className="hover:text-primary transition-colors">
                  9599731412
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <a href="mailto:aiacademy.berrystenley@gmail.com" className="hover:text-primary transition-colors block break-all">
                    aiacademy.berrystenley@gmail.com
                  </a>
                  <a href="mailto:contact@berrystenley.com" className="hover:text-primary transition-colors block mt-1">
                    contact@berrystenley.com
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <a href="https://ai-academy.berrystenley.com" className="hover:text-primary transition-colors">
                  ai-academy.berrystenley.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span>Rectangle 1, Commercial Complex D4, Saket, New Delhi – 17</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span>24/7 Support</span>
              </li>
            </ul>
          </div>

          {/* Pricing & Social */}
          <div className="text-left">
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wider text-muted-foreground">Pricing</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Workshop: <span className="text-primary font-semibold">₹99 + GST</span>
              <br />
              Add-ons priced separately
            </p>

            <a
              href="https://drive.google.com/drive/folders/1lPFbj0lk-sWwnyCJJAUeZv_lNa6X25hY?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <FileText className="h-4 w-4 flex-shrink-0" />
              Brochure / Syllabus
            </a>

            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wider text-muted-foreground">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="https://wa.me/919599731412"
                className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors group"
              >
                <MessageCircle className="h-5 w-5 text-foreground group-hover:text-primary transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors group"
              >
                <Linkedin className="h-5 w-5 text-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Refund Policy */}
        <div className="p-6 rounded-[16px] bg-secondary border border-border mb-8">
          <h4 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
            <span role="img" aria-label="money">💰</span> Refund Policy
          </h4>
          <p className="text-sm text-muted-foreground">
            Money Back Guarantee with Full Refund of Registration fee, if not satisfied. No question asked. For Add-ons, payments are non-refundable.
          </p>
        </div>

        {/* Copyright & Admin */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground pt-6 border-t border-border">
          <p>© {new Date().getFullYear()} Berry Stenley AI Academy. All rights reserved.</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAdminLoginOpen(true)}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            <Shield className="h-4 w-4 mr-2" />
            Admin Login
          </Button>
        </div>
      </div>

      <AdminLoginPopup 
        isOpen={isAdminLoginOpen} 
        onClose={() => setIsAdminLoginOpen(false)} 
      />
    </footer>
  );
};

export default Footer;
