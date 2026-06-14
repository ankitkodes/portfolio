import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface CertificationItem {
  title: string;
  provider: string;
  year: string;
  link: string;
}

const certificationData: CertificationItem[] = [
  {
    title: "The Complete Full Stack Web Development Bootcamp",
    provider: "Udemy",
    year: "2024",
    link: "https://www.udemy.com/certificate/UC-f20c4dea-cfb1-42f0-a8de-61c41f016873/",
  },
];

export default function Certification() {
  return (
    <>
      <div className="py-12 border-t border-white/5">
        <span className="font-mono text-emerald-400 text-sm mb-2 block">&gt; ls ./certs</span>
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 tracking-tight mb-8">
          Certifications
        </h2>
        <div className="flex flex-col gap-4">
          {certificationData.map((cert, index) => (
            <div
              key={index}
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-all duration-300"
            >
              <div>
                <p className="font-medium text-base text-slate-200 group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 group-hover:shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all"></span>
                  {cert.title}
                </p>
                <p className="text-slate-500 font-mono text-xs sm:text-sm mt-1.5 pl-3.5">
                  {cert.provider} <span className="opacity-50">|</span> {cert.year}
                </p>
              </div>
              <Link
                href={cert.link}
                target="_blank"
                className="mt-4 sm:mt-0 ml-3.5 sm:ml-4 flex items-center gap-2 text-sm font-mono text-emerald-400/80 hover:text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded border border-emerald-500/20 hover:border-emerald-500/50 transition-all shrink-0"
              >
                [ Verify ] <ArrowUpRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
