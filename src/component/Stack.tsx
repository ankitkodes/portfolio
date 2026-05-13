import { ArrowUpRight, Terminal, Layout, Server, Database, Wrench } from "lucide-react";

const stackData = [
  {
    category: "Languages",
    description: "JavaScript (ES6+), TypeScript, HTML5, CSS3",
    icon: Terminal,
    color: "text-blue-400",
  },
  {
    category: "Frontend",
    description:
      "React.js, Next.js, Tailwind CSS, Zustand, Recoil, TanStack Query, Responsive Design",
    icon: Layout,
    color: "text-purple-400",
  },
  {
    category: "Backend",
    description:
      "Node.js, Express.js, Nest.js, Hono, RESTful APIs, Prisma ORM, JWT/OAuth, NextAuth",
    icon: Server,
    color: "text-emerald-400",
  },
  {
    category: "Databases",
    description: "PostgreSQL, MongoDB",
    icon: Database,
    color: "text-orange-400",
  },
  {
    category: "Tools",
    description:
      "Git, GitHub, Docker, Vercel, Cloudflare Workers, Postman, CI/CD",
    icon: Wrench,
    color: "text-zinc-400",
  },
];

export default function Stack() {
  return (
    <>
      <div className="py-8">
        <p className="text-lg sm:text-xl font-medium leading-[24px] mb-8">
          Technical Skills
        </p>
        <div className="flex flex-col space-y-8">
          {stackData.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 cursor-pointer group"
            >
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-[#242424] rounded-xl bg-transparent transition-colors group-hover:border-[#444]">
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div>
                <h3 className="font-medium text-[#fafafa] flex items-center gap-1.5">
                  {item.category}
                  <ArrowUpRight className="w-3.5 h-3.5 textColor transition-colors group-hover:text-white" />
                </h3>
                <p className="textColor text-sm mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
