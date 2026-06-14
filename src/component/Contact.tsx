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
    <div className="py-16 border-t border-white/5 relative">
      <span className="font-mono text-emerald-400 text-sm mb-2 block">&gt; ping -c 4 contact</span>
      <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 tracking-tight mb-10">
        Initiate Handshake
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 px-2 relative z-10">
        <div className="md:col-span-2 h-full">
          <div className="border-l border-white/10 pl-6 py-4 space-y-8 font-mono h-full flex flex-col justify-center">
            <div>
              <span className="text-slate-500 text-xs uppercase tracking-wider mb-2 block">System Log // Email</span>
              <Link
                href="mailto:itsankitkumar07@gmail.com"
                className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm break-all"
              >
                itsankitkumar07@gmail.com
              </Link>
            </div>
            <div>
              <span className="text-slate-500 text-xs uppercase tracking-wider mb-2 block">System Log // Phone</span>
              <Link
                href="tel:+917759816393"
                className="text-slate-300 hover:text-white transition-colors text-sm"
              >
                +91 7759816393
              </Link>
            </div>
            <div>
              <span className="text-slate-500 text-xs uppercase tracking-wider mb-3 block">Network Nodes</span>
              <div className="flex flex-col space-y-3">
                <Link href="" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center text-sm w-max">
                  <Twitter size={16} className="mr-3" />
                  @itsankitkumar07
                </Link>
                <Link href="" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center text-sm w-max">
                  <Instagram size={16} className="mr-3" />
                  Instagram
                </Link>
                <Link href="" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center text-sm w-max">
                  <Linkedin size={16} className="mr-3" />
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <span className="ml-2 font-mono text-xs text-slate-500">~/contact/send.sh</span>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="&gt; Your Name"
                  required
                  className="w-full rounded-xl px-4 py-3 bg-[#030305]/50 border border-white/10 text-slate-200 placeholder-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all font-mono text-sm"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="&gt; Your Email Address"
                  required
                  className="w-full rounded-xl px-4 py-3 bg-[#030305]/50 border border-white/10 text-slate-200 placeholder-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all font-mono text-sm"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="&gt; Message Payload..."
                  required
                  className="w-full rounded-xl px-4 py-3 bg-[#030305]/50 border border-white/10 text-slate-200 placeholder-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all font-mono text-sm h-32 resize-none"
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "sending" || status === "sent"}
                  className={`w-full rounded-xl py-3 font-mono text-sm cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 ${
                    status === "sent"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                      : status === "error"
                        ? "bg-red-500/20 text-red-400 border border-red-500/50"
                        : "bg-emerald-600 text-white hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] border border-emerald-500"
                  } disabled:cursor-not-allowed`}
                >
                  {buttonContent()}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
