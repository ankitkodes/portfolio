"use client";

// external import
import { Twitter, Linkedin, Instagram, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, FormEvent } from "react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      access_key: "da84c3b3-a920-4d61-bf5a-9ea19e7e102d",
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      subject: `Portfolio Contact from ${formData.get("name")}`,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const buttonContent = () => {
    switch (status) {
      case "sending":
        return (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
          </>
        );
      case "sent":
        return (
          <>
            <Check size={16} />
            Message Sent
          </>
        );
      case "error":
        return "Failed – Try Again";
      default:
        return "Send Message";
    }
  };

  return (
    <div className="py-8">
      <p className="text-lg sm:text-xl font-medium leading-[24px] mb-8">
        Let&apos;s talk
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2">
        <div>
          <div className="border-l-2 border-[#1a1a1a] pl-4 mb-8">
            <div className="py-2">
              Email:
              <div className="py-2">
                <Link
                  href="mailto:itsankitkumar07@gmail.com"
                  className="textColor hover:text-white"
                >
                  itsankitkumar07@gmail.com
                </Link>
              </div>
            </div>
            <div className="py-2">
              Phone:
              <div className="py-2">
                <Link
                  href="tel:+917759816393"
                  className="textColor hover:text-white"
                >
                  +91 7759816393
                </Link>
              </div>
            </div>
            <div className="py-2">
              Socials:
              <div className="py-2">
                <Link href="" className="textColor hover:text-white">
                  <Twitter size={16} className="inline-block mr-2" />
                  Twitter
                </Link>
              </div>
              <div className="py-2">
                <Link href="" className="textColor hover:text-white">
                  <Instagram size={16} className="inline-block mr-2" />
                  Instagram
                </Link>
              </div>
              <div className="py-2">
                <Link href="" className="textColor hover:text-white">
                  <Linkedin size={16} className="inline-block mr-2" />
                  Linkedin
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>Reach out:</div>
          <form onSubmit={handleSubmit} className="py-2">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                className="w-full border-2 rounded px-4 py-2 mb-4 textColor bg-[#1a1a1a] border-[#1a1a1a] focus:border-white focus:outline-none"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email address"
                required
                className="w-full border-2 rounded px-4 py-2 mb-4 textColor bg-[#1a1a1a] border-[#1a1a1a] focus:border-white focus:outline-none"
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Message"
                required
                className="w-full border-2 rounded px-4 py-2 mb-4 textColor bg-[#1a1a1a] border-[#1a1a1a] focus:border-white focus:outline-none h-32"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className={`w-full rounded-lg py-2 cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 ${
                  status === "sent"
                    ? "bg-emerald-500 text-white"
                    : status === "error"
                      ? "bg-red-500 text-white"
                      : "bg-white text-black hover:bg-gray-200"
                } disabled:cursor-not-allowed`}
              >
                {buttonContent()}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
