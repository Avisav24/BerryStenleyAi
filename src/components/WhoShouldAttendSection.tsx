import { Card, CardContent } from "@/components/ui/card";

// Import all attendee images
import schoolStudentsImg from "@/assets/attendee-school-students.jpg";
import collegeStudentsImg from "@/assets/attendee-college-students.jpg";
import jobSeekersImg from "@/assets/attendee-job-seekers.jpg";
import workingProfessionalsImg from "@/assets/attendee-working-professionals.jpg";
import businessOwnersImg from "@/assets/attendee-business-owners.jpg";
import teachersImg from "@/assets/attendee-teachers.jpg";
import researchersImg from "@/assets/attendee-researchers.jpg";
import govtEmployeesImg from "@/assets/attendee-govt-employees.jpg";
import homemakersImg from "@/assets/attendee-homemakers.jpg";
import freelancersImg from "@/assets/attendee-freelancers.jpg";
import examAspirantsImg from "@/assets/attendee-exam-aspirants.jpg";

const attendees = [
  { title: "School Students (VIII to XII)", image: schoolStudentsImg },
  { title: "College Students", image: collegeStudentsImg },
  { title: "Job Seekers", image: jobSeekersImg },
  { title: "Working Professionals", image: workingProfessionalsImg },
  { title: "Business Owners", image: businessOwnersImg },
  { title: "Teachers & Academicians", image: teachersImg },
  { title: "Researchers & Scholars", image: researchersImg },
  { title: "Govt. Employees", image: govtEmployeesImg },
  { title: "Housewives / Home Makers", image: homemakersImg },
  { title: "Freelancers & Founders", image: freelancersImg },
  { title: "Competitive Exam Aspirants", image: examAspirantsImg }
];

const WhoShouldAttendSection = () => {
  return (
    <section className="py-20 bg-secondary/30 border-b border-border">
      <div className="container mx-auto px-6 max-w-[1366px]">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-12">
            <h2 className="text-page-title tracking-tight text-foreground mb-4">
              Who Should Attend?
            </h2>
            <p className="text-subheading text-muted-foreground max-w-2xl mx-auto">
              This AI Mastery Workshop is designed for learners from all backgrounds and professions.
            </p>
          </div>

          <Card className="enterprise-card border-border shadow-sm overflow-hidden bg-white">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {attendees.map((attendee, index) => {
                  return (
                    <div
                      key={index}
                      className="group flex flex-col items-center"
                    >
                      {/* Image Container */}
                      <div className="w-full aspect-video rounded-[4px] overflow-hidden border border-border mb-4 bg-muted">
                        <img 
                          src={attendee.image} 
                          alt={attendee.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-sm font-semibold text-foreground text-center">
                        {attendee.title}
                      </h3>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Text */}
              <div className="mt-12 text-center pt-8 border-t border-border">
                <p className="text-sm font-medium text-foreground">
                  No prior AI knowledge required — Just bring your curiosity.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WhoShouldAttendSection;
