import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Instagram, Facebook, ArrowDown, ExternalLink } from 'lucide-react';
import { personalInfo, rotatingTitles } from '../data/portfolioData';
import { useMousePosition } from '../hooks/useMousePosition';

export default function Hero() {
  const { mouse } = useMousePosition();
  const [titleIndex, setTitleIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleAvatarMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;
    setTilt({
      x: normalizedY * -25, // tilt up/down
      y: normalizedX * 25,  // tilt left/right
    });
    setIsHovered(true);
  };

  const handleAvatarMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Rotating text logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % rotatingTitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      const offset = 80;
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

  const handleScrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
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

  // Convert normalized mouse coords (-1 to 1) into slight pixel offsets for Parallax
  const parallaxX = mouse.x * 15;
  const parallaxY = mouse.y * 15;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Biography and Call-To-Actions */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ x: parallaxX * 0.4, y: parallaxY * 0.4 }}
          className="lg:col-span-7 flex flex-col items-start text-left"
          id="hero-intro-container"
        >
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6" id="hero-tagline-tag">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-xs text-cyan-400 font-medium tracking-wider uppercase">
              BSc. CSIT Undergraduate
            </span>
          </div>

          {/* Full Name */}
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-3" id="hero-name-heading">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
          </h1>

          {/* Rotating Text wheel */}
          <div className="h-8 md:h-10 overflow-hidden mb-6" id="hero-rotating-container">
            <motion.div
              key={titleIndex}
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="font-mono text-lg md:text-xl text-blue-400 font-semibold tracking-wide"
            >
              {rotatingTitles[titleIndex]}
            </motion.div>
          </div>

          {/* Main Headline */}
          <h2 className="font-sans font-bold text-xl md:text-2xl text-gray-200 mb-4" id="hero-headline-sub">
            {personalInfo.headline}
          </h2>

          {/* Intro description */}
          <p className="font-sans text-base text-gray-400 max-w-xl leading-relaxed mb-8" id="hero-bio-para">
            {personalInfo.bio}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 mb-8" id="hero-actions-container">
            <button
              onClick={handleScrollToProjects}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-sans font-semibold text-sm hover:opacity-90 shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 group cursor-pointer"
              id="hero-btn-projects"
            >
              View My Projects
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
            <button
              onClick={handleScrollToContact}
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 text-white font-sans font-semibold text-sm transition-all flex items-center gap-2 hover:bg-white/10 cursor-pointer"
              id="hero-btn-contact"
            >
              Contact Me
            </button>
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-cyan-400 font-sans font-semibold text-sm transition-all flex items-center gap-2 hover:bg-cyan-950/10"
              id="hero-btn-github"
            >
              GitHub Profile <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Social Links Bar */}
          <div className="flex items-center gap-4" id="hero-socials-bar">
            <span className="font-mono text-xs text-gray-500 tracking-wider">CONNECT:</span>
            <div className="flex items-center gap-3">
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/5 border border-white/5 hover:border-blue-500/30 text-gray-400 hover:text-blue-400 hover:bg-blue-500/5 transition-all duration-300"
                aria-label="LinkedIn Profile"
                id="social-hero-linkedin"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300"
                aria-label="GitHub Profile"
                id="social-hero-github"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/5 border border-white/5 hover:border-pink-500/30 text-gray-400 hover:text-pink-400 hover:bg-pink-500/5 transition-all duration-300"
                aria-label="Instagram Profile"
                id="social-hero-instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/5 border border-white/5 hover:border-blue-600/30 text-gray-400 hover:text-blue-500 hover:bg-blue-600/5 transition-all duration-300"
                aria-label="Facebook Profile"
                id="social-hero-facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Profile Photo with 3D Tilt and Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: isHovered ? 0 : [0, -10, 0] 
          }}
          transition={{ 
            opacity: { duration: 0.8, delay: 0.15 },
            scale: { duration: 0.8, delay: 0.15 },
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } 
          }}
          style={{ x: -parallaxX * 0.6, y: -parallaxY * 0.6 }}
          className="lg:col-span-5 flex justify-center lg:justify-end relative"
          id="hero-avatar-wrapper"
        >
          {/* Subtle geometric background glow moving based on tilt (parallax) */}
          <div 
            className="absolute -inset-6 bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-indigo-500/20 rounded-full blur-3xl -z-10 transition-transform duration-200"
            style={{
              transform: `translate(${tilt.y * 0.8}px, ${tilt.x * -0.8}px) scale(1.1)`,
            }}
          />

          {/* Interactive Tilt Portrait Container - High quality round frame */}
          <div
            onMouseMove={handleAvatarMouseMove}
            onMouseLeave={handleAvatarMouseLeave}
            className="relative w-72 h-72 md:w-85 md:h-85 rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-blue-500 to-violet-500 shadow-2xl shadow-cyan-500/35 group cursor-pointer overflow-visible"
            id="hero-avatar-card"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.05 : 1})`,
              transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Pulsing neon circular ring overlay */}
            <div className="absolute inset-0 rounded-full border border-cyan-400/40 animate-ping opacity-20 pointer-events-none group-hover:scale-105 transition-transform" />

            {/* Inner Content Container - Circular crop */}
            <div 
              className="w-full h-full rounded-full overflow-hidden bg-[#030308] border border-white/10 flex items-center justify-center relative shadow-inner"
              style={{ transform: 'translateZ(20px)' }} // 3D depth pop-out
            >
              <img
                src={`/profile.JPG`}
                alt="Shrawan Kumar Gupta"
                className="w-full h-full object-cover select-none transition-transform duration-700 ease-out"
                style={{
                  transform: isHovered 
                    ? `scale(1.08) translate(${tilt.y * 0.15}px, ${tilt.x * -0.15}px)` 
                    : 'scale(1.02) translate(0px, 0px)',
                  transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
                }}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  console.error("Profile image failed to load:", e.currentTarget.src);
                }}
              />
              
              {/* Scanlines visual texture overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
              
              {/* Sci-Fi circular reticle overlay (hologram look) */}
              <div className="absolute inset-4 rounded-full border border-dashed border-cyan-500/20 animate-[spin_20s_linear_infinite] pointer-events-none" />
            </div>

            {/* Floating tech status tag popping forward in 3D */}
            <div 
              className="absolute -bottom-2 right-4 bg-slate-950/95 border border-cyan-400/50 px-4 py-1.5 rounded-full shadow-xl flex items-center gap-2 backdrop-blur-md transition-all duration-300"
              style={{ transform: 'translateZ(40px)' }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[10px] text-cyan-400 font-bold tracking-wider uppercase">
                PORTFOLIO ACTIVE
              </span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Animated scroll down mouse indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">SCROLL</span>
        <div className="w-5 h-8 rounded-full border-2 border-gray-600 flex justify-center p-1.5">
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-1 h-1.5 rounded-full bg-cyan-400"
          />
        </div>
      </div>
    </section>
  );
}
