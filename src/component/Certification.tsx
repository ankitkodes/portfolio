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
      <div className="py-8">
        <p className="text-lg sm:text-xl font-medium leading-[24px] mb-8">
          Certifications
        </p>
        <div className="flex flex-col">
          {certificationData.map((cert, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-5"
            >
              <div>
                <p className="font-medium text-sm sm:text-base text-[#fafafa]">
                  {cert.title}
                </p>
                <p className="textColor text-xs sm:text-sm mt-1">
                  {cert.provider}, {cert.year}
                </p>
              </div>
              <Link
                href={cert.link}
                target="_blank"
                className="text-sm text-[#b0b0b0] hover:text-white flex items-center gap-1 ml-4 shrink-0 transition-colors"
              >
                View <ArrowUpRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
