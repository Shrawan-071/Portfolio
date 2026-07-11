import { motion } from 'motion/react';
import { Layers, Server, Database, Code2, Cpu, Wrench, Shield, CheckCircle, Sparkles, Cloud } from 'lucide-react';
import { skillsData } from '../data/portfolioData';
import { Skill } from '../types';

// Map categories to descriptions, icons, and gradients
const categories = [
  {
    id: 'tools',
    name: 'Development Tools',
    description: 'Workspace environment setup, package managers, and API testing suites.',
    icon: Wrench,
    gradient: 'from-violet-500 via-purple-500 to-pink-500',
    glow: 'shadow-purple-500/10 border-purple-500/20'
  },
  {
    id: 'frontend',
    name: 'Frontend & Web',
    description: 'Creating responsive, polished, and intuitive user experiences with modern frameworks.',
    icon: Layers,
    gradient: 'from-cyan-400 via-blue-500 to-indigo-500',
    glow: 'shadow-cyan-500/10 border-cyan-500/20'
  },
  {
    id: 'backend',
    name: 'Backend',
    description: 'Designing RESTful APIs, routing servers, and core logical processing.',
    icon: Server,
    gradient: 'from-emerald-400 via-teal-500 to-blue-500',
    glow: 'shadow-emerald-500/10 border-emerald-500/20'
  },
  {
    id: 'database',
    name: 'Database',
    description: 'Relational schema design, structured queries, and persistent storage systems.',
    icon: Database,
    gradient: 'from-blue-500 via-indigo-500 to-violet-500',
    glow: 'shadow-blue-500/10 border-blue-500/20'
  },
  {
    id: 'ai',
    name: 'AI & APIs',
    description: 'Integrating LLM endpoints, computer vision systems, and intelligent reasoning engines.',
    icon: Cpu,
    gradient: 'from-amber-400 via-orange-500 to-red-500',
    glow: 'shadow-orange-500/10 border-orange-500/20'
  },
  {
    id: 'deployment',
    name: 'Deployment & Hosting',
    description: 'Cloud hosting platforms, automated deployment flows, and static pages.',
    icon: Cloud,
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    glow: 'shadow-pink-500/10 border-pink-500/20'
  },
  {
    id: 'languages',
    name: 'Programming Languages',
    description: 'Solid foundational languages for computer science and algorithmic engineering.',
    icon: Code2,
    gradient: 'from-teal-400 via-cyan-500 to-emerald-500',
    glow: 'shadow-teal-500/10 border-teal-500/20'
  }
];

export default function Skills() {
  // Group skills by category
  const getSkillsByCategory = (category: string) => {
    return skillsData.filter((skill: Skill) => skill.category === category);
  };

  return (
    <section id="skills" className="relative py-24 px-6 md:px-12 overflow-hidden bg-gradient-to-b from-transparent via-[#030308]/50 to-transparent">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16" id="skills-section-header">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono text-[10px] text-cyan-400 font-semibold tracking-wider uppercase">
              Technical Stack
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans font-extrabold text-3xl md:text-4xl text-white tracking-tight"
          >
            Skills & Expertise
          </motion.h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full mt-4" />
        </div>

        {/* Bento Grid layout for categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="skills-bento-grid">
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon;
            const categorySkills = getSkillsByCategory(cat.id);

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className={`p-7 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl relative overflow-hidden flex flex-col group transition-all shadow-xl ${cat.glow}`}
                id={`skills-category-card-${cat.id}`}
              >
                {/* Visual grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] opacity-20 pointer-events-none" />

                {/* Top bar */}
                <div className="flex items-center gap-4 mb-4" id={`skills-cat-header-${cat.id}`}>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${cat.gradient} text-slate-950 font-bold shadow-lg`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-sans font-extrabold text-lg text-white tracking-tight">
                    {cat.name}
                  </h3>
                </div>

                <p className="font-sans text-xs text-gray-400 mb-6 leading-relaxed">
                  {cat.description}
                </p>

                {/* Skills tags/lists in columns */}
                <div className="flex flex-wrap gap-2.5 mt-auto" id={`skills-cat-list-${cat.id}`}>
                  {categorySkills.map((skill, sIdx) => (
                    <motion.div
                      key={sIdx}
                      whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.2)' }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/40 border border-white/10 text-gray-300 font-sans text-xs font-semibold hover:text-white transition-colors"
                      id={`skills-tag-${cat.id}-${sIdx}`}
                    >
                      <CheckCircle className="w-3 h-3 text-cyan-400" />
                      {skill.name}
                    </motion.div>
                  ))}
                </div>

                {/* Custom glowing bracket corners on active card hover */}
                <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/0 group-hover:border-white/20 transition-all rounded-tr" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/0 group-hover:border-white/20 transition-all rounded-bl" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
