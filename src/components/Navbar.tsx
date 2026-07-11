import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const navLinks = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'Education', id: 'education' },
  { name: 'Achievements', id: 'achievements' },
  { name: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track scroll for background glass blur styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers = navLinks.map(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-20% 0px -60% 0px' } // Trigger when section occupies the active mid-viewport
      );

      observer.observe(element);
      return { observer, element };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.element);
      });
    };
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#020205]/75 backdrop-blur-md border-b border-white/5 py-3 shadow-lg shadow-black/20'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Personal Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-2 cursor-pointer font-sans font-bold text-xl text-white tracking-widest relative overflow-hidden"
            id="nav-logo-btn"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              SKG
            </span>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-1 py-1 font-sans text-sm font-medium tracking-wide transition-colors duration-300 cursor-pointer ${
                  activeSection === link.id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                id={`nav-link-${link.id}`}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}

            {/* Quick Resume Link or Contact Callout */}
            <button
              onClick={() => handleNavClick('contact')}
              className="ml-4 px-4 py-1.5 rounded-full border border-cyan-500/30 hover:border-cyan-400 text-xs text-cyan-400 hover:text-white bg-cyan-500/5 hover:bg-cyan-500/10 transition-all duration-300 flex items-center gap-1 font-sans font-medium group cursor-pointer"
              id="nav-contact-callout"
            >
              Get in Touch <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Hamburger Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-gray-400 hover:text-white bg-white/5 border border-white/10 rounded-lg transition-all cursor-pointer"
            id="mobile-nav-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            id="mobile-nav-menu"
            className="fixed inset-x-0 top-[60px] z-40 lg:hidden p-6 mx-4 rounded-2xl bg-[#05050b]/95 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`py-2 text-left font-sans text-base font-semibold tracking-wide border-b border-white/5 last:border-0 cursor-pointer ${
                  activeSection === link.id
                    ? 'text-cyan-400'
                    : 'text-gray-300 hover:text-white'
                }`}
                id={`mobile-nav-link-${link.id}`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('contact')}
              className="mt-2 py-3 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-center font-sans font-medium text-sm text-white shadow-lg shadow-cyan-500/10 cursor-pointer"
              id="mobile-nav-contact-btn"
            >
              Contact Me
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
