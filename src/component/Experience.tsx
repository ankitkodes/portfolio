import { MapPin } from "lucide-react";

interface ExperienceItem {
  location: string;
  duration: string;
  role: string;
  company: string;
  description: string[];
}

const experienceData: ExperienceItem[] = [
  {
    location: "Remote",
    duration: "Oct 2025 – Mar 2026",
    role: "Full Stack Developer",
    company: "noDevBuild",
    description: [
      "Implemented end-to-end Razorpay payment gateway integration including webhook handling, order verification, and payment failure reconciliation, enabling live transactions in production.",
      "Built an OCR-based document verification frontend from scratch with fully responsive design, allowing users to review and correct extracted data in real-time with zero backend dependency on initial load.",
      "Improved web performance by refactoring core React components with lazy loading, memoization, and list virtualization — measurably reducing page load time across multiple high-traffic modules.",
      "Collaborated with 6–7 engineers to define RESTful API contracts, deliver production features on schedule, and maintain quality through Agile sprints and CI/CD pipelines via Vercel.",
    ],
  },
];

export default function Experience() {
  return (
    <>
      <div className="py-8">
        <p className="text-lg sm:text-xl font-medium leading-[24px]">
          Experience
        </p>
        <div className="mt-8 space-y-12">
          {experienceData.map((exp, index) => (
            <div key={index} className="border-l border-[#242424] pl-5 relative">
              <div className="flex justify-between items-center textColor">
                <p className="text-sm">
                  <MapPin size={14} className="inline-block mr-1.5 -mt-0.5" />
                  {exp.location}
                </p>
                <p className="text-sm">{exp.duration}</p>
              </div>
              <p className="font-medium text-base sm:text-lg mt-3 text-[#fafafa]">{exp.role}</p>
              <p className="textColor text-sm mt-1">{exp.company}</p>
              <ul className="mt-6 text-sm sm:text-base textColor leading-relaxed list-disc pl-4 space-y-2">
                {exp.description.map((desc, i) => (
                  <li key={i} className="pl-1">
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
