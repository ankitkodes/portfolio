// External Import
import { MapPin, Twitter, Linkedin, Download, Copy } from "lucide-react";
import Image from "next/image";

// internal import
import profile from "../../public/images/profile.jpg";
import Link from "next/link";

export default function Profile() {
  return (
    <>
      <div className="pt-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="flex items-center gap-5">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 overflow-hidden rounded-2xl flex-shrink-0">
              <Image
                src={profile}
                alt="Ankit Kumar"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <h1 className="text-2xl sm:text-3xl font-medium text-[#fafafa]">
                Ankit Kumar
              </h1>
              <p className="text-base text-[#a0a0a0]">
                Web Developer
              </p>
              <p className="text-sm text-[#808080] flex items-center">
                <MapPin size={14} className="mr-1" /> New Delhi, India
              </p>
              <div className="flex items-center mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                <span className="text-sm text-[#a0a0a0]">Available for work</span>
              </div>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end gap-3">
            <Link 
              href="" 
              className="text-sm text-[#b0b0b0] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Download size={14} /> Download CV
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-5 border-t border-[#1a1a1a] mb-8 text-sm text-[#808080]">
          <div className="flex items-center gap-2 mb-3 sm:mb-0 hover:text-white transition-colors cursor-pointer group">
            <Copy size={14} className="group-hover:text-white transition-colors" /> itsankitkumar07@gmail.com
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="https://x.com/itsankitkumar07"
              target="_blank"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Twitter size={14} /> Twitter
            </Link>
            <Link
              href="https://www.linkedin.com/in/ankitkumar"
              target="_blank"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Linkedin size={14} /> LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
