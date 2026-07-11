import { motion } from 'motion/react';
import { Trophy, Medal, Crown, Sparkles, Award } from 'lucide-react';
import { achievementsData } from '../data/portfolioData';

// Map achievement categories to specific icons & styling gradients
const iconMap = {
  hackathon: {
    icon: Trophy,
    gradient: 'from-amber-400 via-yellow-500 to-orange-500',
    bgGlow: 'bg-amber-500/10 border-amber-500/20',
    shadowColor: 'hover:shadow-amber-500/5'
  },
  recognition: {
    icon: Medal,
    gradient: 'from-cyan-400 via-blue-500 to-indigo-500',
    bgGlow: 'bg-cyan-500/10 border-cyan-500/20',
    shadowColor: 'hover:shadow-cyan-500/5'
  },
  academic: {
    icon: Crown,
    gradient: 'from-violet-400 via-purple-500 to-pink-500',
    bgGlow: 'bg-violet-500/10 border-violet-500/20',
    shadowColor: 'hover:shadow-violet-500/5'
  }
};

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20" id="achievements-section-header">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3"
          >
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono text-[10px] text-cyan-400 font-semibold tracking-wider uppercase">
              Milestones
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans font-extrabold text-3xl md:text-4xl text-white tracking-tight"
          >
            Achievements & Honors
          </motion.h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full mt-4" />
        </div>

        {/* Achievements Cards layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="achievements-cards-grid">
          {achievementsData.map((ach, idx) => {
            const style = iconMap[ach.category as 'hackathon' | 'recognition' | 'academic'];
            const IconComponent = style.icon;

            return (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className={`p-8 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-xl relative overflow-hidden flex flex-col items-start transition-all duration-300 shadow-xl ${style.bgGlow} ${style.shadowColor}`}
                id={`achievement-card-${ach.id}`}
              >
                {/* Internal Ambient Radial Lights */}
                <div className={`absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-20 bg-gradient-to-br ${style.gradient} -z-10`} />

                {/* Floating particle symbol */}
                <Sparkles className="absolute top-6 right-6 w-4 h-4 text-white/10" />

                {/* Top Section: Icon / GPA Hero */}
                <div className="w-full flex items-center justify-between mb-6">
                  {/* Achievement Badge Icon with customized coloring */}
                  <div className={`p-3.5 rounded-xl bg-gradient-to-br ${style.gradient} text-slate-950 font-bold shadow-lg shadow-black/20`}>
                    <IconComponent className="w-5.5 h-5.5 text-white" />
                  </div>

                  {/* Prominent GPA Highlight if available */}
                  {ach.gpaHighlight && (
                    <span className="font-mono text-2xl font-black bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(168,85,247,0.3)] border border-violet-500/25 bg-violet-500/5 px-3.5 py-1 rounded-xl">
                      {ach.gpaHighlight}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-sans font-extrabold text-lg text-white mb-3 tracking-tight">
                  {ach.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs text-gray-400 leading-relaxed text-left mb-6 flex-grow">
                  {ach.description}
                </p>

                {/* Custom list of highlights for hackathons or specific projects */}
                {ach.highlights && ach.highlights.length > 0 && (
                  <div className="w-full mt-auto pt-4 border-t border-white/5 flex flex-wrap gap-1.5" id={`achievement-hl-${ach.id}`}>
                    {ach.highlights.map((hl, hlIdx) => (
                      <span
                        key={hlIdx}
                        className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wide"
                      >
                        ✓ {hl}
                      </span>
                    ))}
                  </div>
                )}

                {/* Bottom decorative bar */}
                <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r ${style.gradient}`} />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
