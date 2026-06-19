import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is the duration of the workshop?",
    answer: "The workshop is a 3-hour live online session conducted on Sunday. It's an intensive, fast-paced program designed to give you maximum value in minimum time.",
  },
  {
    question: "Do I need any prior AI knowledge?",
    answer: "No! This workshop is designed for complete beginners as well as professionals who want to upgrade their AI skills. We start from basics and take you to advanced levels.",
  },
  {
    question: "Will I get a certificate?",
    answer: "Yes! Upon successful completion, you'll receive a Gold Expert Certification that you can add to your resume, LinkedIn profile, and share during interviews.",
  },
  {
    question: "Is this workshop live or recorded?",
    answer: "This is a LIVE online workshop. We don't provide recordings to ensure exclusivity and encourage active participation during the session.",
  },
  {
    question: "What is the refund policy?",
    answer: "Money Back Guarantee with Full Refund of Registration fee, if not satisfied. No question asked. For Add-ons, payments are non-refundable. We're confident you'll love the workshop!",
  },
  {
    question: "How do I join the workshop?",
    answer: "After registration, you'll receive a confirmation email with the workshop link and instructions. Simply click the link at the scheduled time to join.",
  },
  {
    question: "Can I access the bonuses after the workshop?",
    answer: "Yes! All the bonuses worth ₹3,49,000 are yours to keep forever. You'll get lifetime access to the resource hub, AI library, and community.",
  },
  {
    question: "Is this workshop suitable for students?",
    answer: "Absolutely! Students can greatly benefit from AI skills for competitive exams, study automation, and building a strong foundation for their careers.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-background border-b border-border">
      <div className="container mx-auto px-6 max-w-[1366px]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-section-title tracking-tight text-foreground">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="enterprise-card border border-border px-6 bg-white"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-6 text-[15px]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Refund Policy Highlight */}
          <div className="mt-8 p-6 rounded-[8px] bg-secondary/30 border border-border text-center">
            <h3 className="text-body font-semibold mb-2 text-foreground">
              Refund Policy
            </h3>
            <p className="text-sm text-foreground/90 leading-relaxed">
              Money Back Guarantee with Full Refund of Registration fee, if not satisfied. No questions asked. 
              <span className="text-muted-foreground block mt-1">For Add-ons, payments are non-refundable.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
