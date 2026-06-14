"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkContainerClasses = `flex items-center transition-all duration-300 ease-in-out overflow-x-auto no-scrollbar ${
    isOpen 
      ? "opacity-100 max-w-[800px] visible px-2" 
      : "opacity-0 max-w-0 invisible px-0"
  }`;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex justify-center w-max max-w-[95vw]">
      <div className="border border-[#242424] rounded-full flex justify-between items-center bg-[#242424]/90 backdrop-blur-md p-1.5 shadow-lg">
        
        <div className={linkContainerClasses}>
          <Link href="#about" className="px-3 py-1.5 text-sm text-[#fafafa] hover:text-white hover:bg-white/10 rounded-full transition-colors whitespace-nowrap">
            About
          </Link>
          <Link href="#work" className="px-3 py-1.5 text-sm text-[#fafafa] hover:text-white hover:bg-white/10 rounded-full transition-colors whitespace-nowrap">
            Work
          </Link>
          <Link href="#experience" className="px-3 py-1.5 text-sm text-[#fafafa] hover:text-white hover:bg-white/10 rounded-full transition-colors whitespace-nowrap">
            Experience
          </Link>
          <Link href="#education" className="px-3 py-1.5 text-sm text-[#fafafa] hover:text-white hover:bg-white/10 rounded-full transition-colors whitespace-nowrap">
            Education
          </Link>
          <Link href="#skills" className="px-3 py-1.5 text-sm text-[#fafafa] hover:text-white hover:bg-white/10 rounded-full transition-colors whitespace-nowrap">
            Skills
          </Link>
          <Link href="#articles" className="px-3 py-1.5 text-sm text-[#fafafa] hover:text-white hover:bg-white/10 rounded-full transition-colors whitespace-nowrap">
            Blog
          </Link>
          <Link href="#contact" className="px-3 py-1.5 text-sm text-[#fafafa] hover:text-white hover:bg-white/10 rounded-full transition-colors whitespace-nowrap">
            Contact
          </Link>
        </div>

        <div className="flex-shrink-0 z-10">
          <button
            className="cursor-pointer bg-white text-black rounded-full p-2 hover:scale-105 transition-transform flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <Plus
              size={20}
              className={`transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}
            />
          </button>
        </div>

      </div>
    </div>
  );
}
