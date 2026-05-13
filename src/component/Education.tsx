import { MapPin } from "lucide-react";

interface EducationItem {
  location: string;
  duration: string;
  degree: string;
  university: string;
  description: string[];
}

const educationData: EducationItem[] = [
  {
    location: "Greater Noida",
    duration: "2022 – 2026",
    degree: "B.Tech in Computer Science",
    university: "Sharda University",
    description: [
      "Data Structures & Algorithms: Proficient in optimizing code complexity and solving complex computational problems.",
      "Database Management Systems: Experienced in relational database design, SQL, and data modeling.",
      "Operating Systems: Understanding of process management, memory allocation, and file systems.",
      "Computer Networks: Knowledge of TCP/IP protocols, network layers, and data communication.",
    ],
  },
];

export default function Education() {
  return (
    <>
      <div className="py-8">
        <p className="text-lg sm:text-xl font-medium leading-[24px]">
          Education
        </p>
        <div className="mt-8 space-y-12">
          {educationData.map((edu, index) => (
            <div key={index} className="border-l border-[#242424] pl-5 relative">
              <div className="flex justify-between items-center textColor">
                <p className="text-sm">
                  <MapPin size={14} className="inline-block mr-1.5 -mt-0.5" />
                  {edu.location}
                </p>
                <p className="text-sm">{edu.duration}</p>
              </div>
              <p className="font-medium text-base sm:text-lg mt-3 text-[#fafafa]">{edu.degree}</p>
              <p className="textColor text-sm mt-1">{edu.university}</p>
              <ul className="mt-6 text-sm sm:text-base textColor leading-relaxed list-disc pl-4 space-y-2">
                {edu.description.map((desc, i) => {
                  const [title, ...rest] = desc.split(":");
                  return (
                    <li key={i} className="pl-1">
                      <span className="font-medium text-[#e0e0e0]">{title}:</span>
                      {rest.length > 0 && rest.join(":")}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
