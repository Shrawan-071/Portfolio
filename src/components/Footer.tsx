import { Github, Linkedin, Instagram, Facebook, ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer id="portfolio-footer" className="relative border-t border-white/5 bg-[#020205] py-12 px-6 md:px-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-20 bg-cyan-500/5 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Left Side: Copyright */}
        <div className="text-center md:text-left" id="footer-copyright-container">
          <p className="font-sans text-xs text-gray-500">
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="font-mono text-[9px] text-gray-600 tracking-wider mt-1.5">
            PLATFORM ENVIRONMENT: CLOUD RUN SECURE CONTAINER
          </p>
        </div>

        {/* Center: Author signature */}
        <div className="text-center" id="footer-signature-container">
          <p className="font-sans text-xs text-gray-400 font-medium">
            Designed &amp; Built by{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent font-bold">
              {personalInfo.name}
            </span>
          </p>
        </div>

        {/* Right Side: Social links & Scroll To Top */}
        <div className="flex items-center gap-6" id="footer-socials-container">
          {/* Social icons */}
          <div className="flex items-center gap-3.5">
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-cyan-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-pink-400 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-500 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>

          {/* Return To Top trigger */}
          <button
            onClick={handleScrollToTop}
            className="p-2 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-500/20 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all cursor-pointer"
            title="Scroll back to top"
            id="footer-back-to-top-btn"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
