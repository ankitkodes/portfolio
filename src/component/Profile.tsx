// External Import
import { MapPin, Twitter, Linkedin, Download, Copy } from "lucide-react";
import Image from "next/image";

// internal import
import profile from "../../public/images/profile.jpg";
import Link from "next/link";

export default function Profile() {
  return (
    <>
      <div className="pt-28 pb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 overflow-hidden rounded-full flex-shrink-0 border-2 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <Image
                src={profile}
                alt="Ankit Kumar"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl sm:text-3xl font-semibold text-slate-100 tracking-tight">
                Ankit Kumar
              </h1>
              <p className="text-base font-mono text-emerald-400">
                &gt; Full Stack Software Engineer
              </p>
              <p className="text-sm text-slate-400 flex items-center mt-1">
                <MapPin size={14} className="mr-1.5" /> New Delhi, India
              </p>
              <div className="flex items-center mt-2 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full w-max">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">System Online / Available</span>
              </div>
            </div>
          </div>
          <div className="mt-6 sm:mt-0 flex flex-col items-start sm:items-end gap-3">
            <Link 
              href="" 
              className="text-sm font-mono text-slate-300 hover:text-white hover:bg-white/10 px-4 py-2 border border-white/10 rounded-lg transition-all flex items-center gap-2 bg-white/5 backdrop-blur-sm"
            >
              <Download size={16} /> [ download_cv.pdf ]
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-5 border-t border-white/10 mb-8 text-sm text-slate-400 font-mono">
          <div className="flex items-center gap-2 mb-3 sm:mb-0 hover:text-emerald-300 transition-colors cursor-pointer group">
            <Copy size={14} className="group-hover:text-emerald-300 transition-colors" /> itsankitkumar07@gmail.com
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="https://x.com/itsankitkumar07"
              target="_blank"
              className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
            >
              <Twitter size={14} /> @itsankitkumar07
            </Link>
            <Link
              href="https://www.linkedin.com/in/ankitkumar"
              target="_blank"
              className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
            >
              <Linkedin size={14} /> /in/ankitkumar
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
