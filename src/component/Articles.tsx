import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Articles() {
  const articles = [
    {
      title: "Why your Node.js app leaks memory",
      date: "Jan 15, 2025",
      link: "#"
    },
    {
      title: "Migration Patterns for Event-Driven Architectures",
      date: "Dec 02, 2024",
      link: "#"
    }
  ];

  return (
    <div className="py-12 border-t border-white/5">
      <span className="font-mono text-emerald-400 text-sm mb-2 block">&gt; cat blog.md</span>
      <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 tracking-tight mb-8">
        Articles & Publications
      </h2>
      <div className="flex flex-col gap-4">
        {articles.map((article, idx) => (
          <Link href={article.link} key={idx} className="group flex flex-col sm:flex-row justify-between sm:items-center gap-3 p-4 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-all duration-300">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-slate-300 group-hover:text-emerald-400 transition-colors font-medium text-base flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 group-hover:shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all"></span>
                {article.title}
              </h3>
              <p className="text-xs font-mono text-slate-500 pl-3.5">{article.date}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50 transition-all duration-300 sm:self-auto self-start ml-3.5 sm:ml-0">
              <ArrowUpRight size={16} className="text-slate-400 group-hover:text-emerald-400 transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
