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
      <div className="py-12 border-t border-white/5">
        <span className="font-mono text-emerald-400 text-sm mb-2 block">&gt; cat skills.json</span>
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 tracking-tight mb-8">
          Technical Arsenal
        </h2>
        <div className="flex flex-col space-y-6">
          {stackData.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-5 cursor-pointer group p-4 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:border-emerald-500/50 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <item.icon className={`w-6 h-6 ${item.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
              </div>
              <div className="flex-1 mt-1">
                <h3 className="font-medium text-slate-100 flex items-center gap-2 text-lg group-hover:text-emerald-300 transition-colors">
                  {item.category}
                  <ArrowUpRight className="w-4 h-4 text-slate-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-400" />
                </h3>
                <p className="text-slate-400 text-sm mt-1.5 leading-relaxed font-mono">
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
