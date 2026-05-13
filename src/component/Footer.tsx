export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 mb-8 border-t border-[#1a1a1a] pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="textColor text-sm text-center md:text-left">
          © {year} Ankit Kumar. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-sm textColor">
          <a href="https://twitter.com/ankitkodes" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            Twitter
          </a>
          <a href="https://github.com/ankitkodes" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com/in/ankitkodes" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
