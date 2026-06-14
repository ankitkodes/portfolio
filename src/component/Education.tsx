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
      <div className="py-12 border-t border-white/5 relative">
        <span className="font-mono text-emerald-400 text-sm mb-2 block">&gt; history | grep education</span>
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 tracking-tight mb-10">
          Education
        </h2>
        <div className="space-y-12 relative">
          {educationData.map((edu, index) => (
            <div key={index} className="relative pl-8 sm:pl-10 group">
              {/* Timeline Track & Node */}
              <div className="absolute left-0 top-1.5 bottom-[-3rem] w-[1px] bg-white/10 group-last:bottom-0"></div>
              <div className="absolute left-[-4px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] ring-4 ring-[#030305] group-hover:scale-125 transition-transform duration-300"></div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-slate-400 font-mono mb-2">
                <p className="text-xs sm:text-sm flex items-center text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <MapPin size={12} className="mr-1.5" />
                  {edu.location}
                </p>
                <p className="text-xs sm:text-sm mt-2 sm:mt-0 opacity-80">{edu.duration}</p>
              </div>
              <h3 className="font-semibold text-lg sm:text-xl mt-3 text-slate-100 group-hover:text-emerald-400 transition-colors">{edu.degree}</h3>
              <p className="text-emerald-400/80 text-sm mt-1 font-mono">&gt; {edu.university}</p>
              <ul className="mt-5 text-sm sm:text-base text-slate-400 leading-relaxed space-y-3">
                {edu.description.map((desc, i) => {
                  const [title, ...rest] = desc.split(":");
                  return (
                    <li key={i} className="flex items-start">
                      <span className="text-emerald-500 mr-3 mt-1.5 opacity-50">&gt;&gt;</span>
                      <span className="flex-1">
                        <strong className="text-slate-300 font-medium">{title}:</strong>
                        {rest.length > 0 && rest.join(":")}
                      </span>
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
