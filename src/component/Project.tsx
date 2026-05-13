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
      <div className="py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-lg sm:text-xl font-medium leading-[24px]">
            Some of my projects
          </p>
          <div className="textColor">
            <Link href="" className="hover:text-white flex items-center text-sm transition-colors">
              View all
              <MoveUpRight size={14} className="ml-1" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <Link
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-[#242424] overflow-hidden bg-[#121212] transition-colors hover:border-[#444] flex flex-col"
            >
              {/* Image / Placeholder */}
              <div
                className={`w-full aspect-[4/3] ${project.imagePlaceholderColor || "bg-[#1a1a1a]"} relative overflow-hidden flex items-center justify-center`}
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <p className="textColor text-sm opacity-50">Image Placeholder</p>
                )}
              </div>

              {/* Card Footer */}
              <div className="p-4 flex justify-between items-center bg-[#1a1a1a]">
                <div>
                  <h3 className="font-medium text-[#fafafa] text-base mb-1 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm textColor">
                    {project.category}
                  </p>
                </div>
                <ArrowRight
                  size={18}
                  className="textColor transition-all duration-300 group-hover:text-white group-hover:-rotate-45"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
