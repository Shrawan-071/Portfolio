import { motion } from 'motion/react';
import { FolderGit2, ArrowUpRight } from 'lucide-react';
import { featuredProjects } from '../data/projects';
import ProjectCard from './ProjectCard';

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16" id="projects-section-header">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono text-[10px] text-cyan-400 font-semibold tracking-wider uppercase">
              Curated Showcase
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans font-extrabold text-3xl md:text-4xl text-white tracking-tight"
          >
            Featured Projects
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-4 font-sans text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed"
          >
            A selection of my strongest projects, built while learning, experimenting, and solving real problems.
          </motion.p>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-6" />
        </div>

        {/* Featured Projects Showcase Grid */}
        <div className="mb-8 animate-fade-in" id="featured-projects-showcase">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center" id="featured-projects-grid">
            {featuredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        </div>

        {/* Global CTA button */}
        <div className="mt-16 flex justify-center" id="all-repos-cta-container">
          <a
            href="https://github.com/Shrawan-071?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full border border-white/10 hover:border-cyan-500/40 text-xs text-gray-300 hover:text-white bg-slate-900/40 hover:bg-cyan-500/5 transition-all duration-300 flex items-center gap-2 font-mono font-bold tracking-wide shadow-md hover:shadow-cyan-500/5 group"
            id="all-repos-cta-btn"
          >
            View All Repositories on GitHub
            <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
