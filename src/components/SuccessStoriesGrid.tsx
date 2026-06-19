import { Briefcase, GraduationCap, TrendingUp, Laptop, BookOpen } from "lucide-react";

const stories = [
  {
    icon: Briefcase,
    title: "Corporate AI Usage",
    description: "Professionals using AI to automate workflows",
  },
  {
    icon: GraduationCap,
    title: "Student Exam Success",
    description: "Students excelling in competitive exams with AI",
  },
  {
    icon: TrendingUp,
    title: "Entrepreneurs Scaling",
    description: "Business owners growing 10x with AI tools",
  },
  {
    icon: Laptop,
    title: "Freelancers Earning",
    description: "Freelancers earning more via AI services",
  },
  {
    icon: BookOpen,
    title: "Teachers & Professionals",
    description: "Educators transforming learning with AI",
  },
];

const SuccessStoriesGrid = () => {
  return (
    <section className="py-20 bg-background border-b border-border">
      <div className="container mx-auto px-6 max-w-[1366px]">
        <div className="text-center mb-12">
          <h2 className="text-section-title text-foreground mb-4">
            Real Success Stories
          </h2>
          <p className="text-subheading text-muted-foreground max-w-2xl mx-auto">
            Join thousands who have transformed their careers and lives with practical AI skills.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {stories.map((story, index) => (
            <div
              key={index}
              className="enterprise-card p-6 flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-[8px] bg-secondary flex items-center justify-center mb-4">
                <story.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-base mb-2 text-foreground">
                {story.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {story.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesGrid;
