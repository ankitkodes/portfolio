import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { MoveUpRight, ArrowRight } from "lucide-react";
import bugtrace from "../../public/images/bugtrace.png"
import medium from "../../public/images/medium.png"

interface ProjectItem {
  title: string;
  category: string;
  link: string;
  image?: StaticImageData;
  imagePlaceholderColor?: string;
}

const projects: ProjectItem[] = [
  {
    title: "BugTrace",
    category: "Error Tracking Platform",
    link: "https://github.com/ankitkodes/Error-Tracker",
    image: bugtrace,
  },
  {
    title: "Pronto",
    category: "Real-time Messaging",
    link: "https://github.com/ankitkodes/pronto",
    imagePlaceholderColor: "bg-sky-900/40",
  },
  {
    title: "Codelave",
    category: "Code Execution Platform",
    link: "https://github.com/ankitkodes/codelave",
    imagePlaceholderColor: "bg-fuchsia-900/40",
  },
  {
    title: "Medium Clone",
    category: "Blogging Platform",
    link: "https://github.com/ankitkodes/Medium",
    image: medium,
  },
];

export default function Project() {
  return (
    <>
      <div className="py-12 border-t border-white/5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8">
          <div>
            <span className="font-mono text-emerald-400 text-sm mb-2 block">&gt; ls ./projects</span>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 tracking-tight">
              Featured Work
            </h2>
          </div>
          <div className="mt-4 sm:mt-0 text-slate-400">
            <Link href="" className="hover:text-emerald-400 flex items-center text-sm font-mono transition-colors">
              [ view_all_repos ]
              <MoveUpRight size={14} className="ml-1.5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Link
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-white/10 overflow-hidden bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col"
            >
              {/* Image / Placeholder */}
              <div
                className={`w-full aspect-[4/3] ${project.imagePlaceholderColor || "bg-[#1a1a1a]"} relative overflow-hidden flex items-center justify-center`}
              >
                {project.image ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030305] to-transparent z-10 opacity-60"></div>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </>
                ) : (
                  <p className="text-slate-500 text-sm font-mono opacity-50">&lt;ImagePlaceholder /&gt;</p>
                )}
              </div>

              {/* Card Footer */}
              <div className="p-5 flex justify-between items-center bg-[#030305]/80 backdrop-blur-md relative z-20 -mt-2">
                <div>
                  <h3 className="font-semibold text-slate-100 text-lg mb-1 group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-400 font-mono">
                    {project.category}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50 transition-all duration-300">
                  <ArrowRight
                    size={18}
                    className="text-slate-400 transition-all duration-300 group-hover:text-emerald-400 group-hover:-rotate-45"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
