"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [navbar, Hidenavbar] = useState(false);

  const linkClasses = (hidden: boolean) =>
    `flex items-center transition-all duration-300 overflow-hidden ${hidden
      ? "opacity-0 invisible max-w-0 pointer-events-none"
      : "opacity-100 visible max-w-[500px] pointer-events-auto"
    }`;

  return (
    <>
      <div className="my-4 flex justify-center">
        <div className="border-1 w-min border-[#242424] rounded flex justify-center items-center bg-[#242424]">
          <div className={linkClasses(navbar)}>
            <Link href="#about" className="px-2 text-[#fafafa] whitespace-nowrap">
              About
            </Link>
            <Link href="#work" className="px-2 text-[#fafafa] whitespace-nowrap">
              Work
            </Link>
            <Link href="#experience" className="px-2 text-[#fafafa] whitespace-nowrap">
              Experience
            </Link>
          </div>

          <div className="flex-shrink-0">
            <button
              className="cursor-pointer bg-black border-1 border-black rounded p-1"
              onClick={() => Hidenavbar(!navbar)}
            >
              <Plus
                className={`inline-block transition-transform duration-300 ${navbar ? "rotate-0" : "rotate-45"
                  }`}
              />
            </button>
          </div>

          <div className={linkClasses(navbar)}>
            <Link href="#education" className="px-2 text-[#fafafa] whitespace-nowrap">
              Education
            </Link>
            <Link href="#skills" className="px-2 text-[#fafafa] whitespace-nowrap">
              Skills
            </Link>

            <Link href="#contact" className="px-2 text-[#fafafa] whitespace-nowrap">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
