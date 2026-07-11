import { motion } from 'motion/react';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Sparkles } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="relative py-16 px-6 md:px-12 overflow-hidden bg-gradient-to-b from-transparent via-[#030308]/40 to-transparent">
      <div className="max-w-5xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10" id="education-section-header">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3"
          >
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono text-[10px] text-cyan-400 font-semibold tracking-wider uppercase">
              Academic Path
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans font-extrabold text-2xl md:text-3xl text-white tracking-tight uppercase"
          >
            Education
          </motion.h2>
          <div className="w-10 h-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full mt-3" />
        </div>

        {/* Compact Side-by-Side Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="education-cards-grid">
          
          {/* Card 1: BSc. CSIT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-5 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl relative overflow-hidden hover:border-cyan-500/30 transition-all shadow-lg group flex flex-col justify-between"
            id="education-card-csit"
          >
            <div>
              {/* Status Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 font-bold tracking-wide uppercase">
                  <Sparkles className="w-3 h-3 animate-pulse" />
                  Currently Studying
                </span>
                <span className="font-mono text-[10px] text-cyan-400 font-semibold flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> 2081 B.S. – Present
                </span>
              </div>

              {/* Main Qualification Highlight */}
              <h3 className="font-sans font-extrabold text-lg text-white tracking-tight mb-1">
                BSc. CSIT
              </h3>
              <p className="font-sans text-xs text-gray-300 font-medium leading-relaxed mb-4">
                Bachelor of Science in Computer Science and Information Technology
              </p>

              {/* Secondary Details - Small Typography */}
              <div className="space-y-1.5 border-t border-white/5 pt-3 mb-4">
                <div className="flex items-center gap-1.5 text-xs text-gray-400 font-sans">
                  <GraduationCap className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <span className="text-gray-300">Tribhuvan University Affiliated College</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-sans">
                  <MapPin className="w-3.5 h-3.5 text-gray-600 shrink-0" />
                  <span>Nepal</span>
                </div>
              </div>
            </div>

            {/* Compact Coursework */}
            <div className="border-t border-white/5 pt-3">
              <h4 className="font-mono text-[9px] text-gray-500 font-bold tracking-wider uppercase mb-1.5 flex items-center gap-1">
                <BookOpen className="w-3 h-3" /> Core Coursework
              </h4>
              <div className="flex flex-wrap gap-1">
                {['DSA', 'C/C++', 'Digital Logic', 'Computer Architecture', 'Math'].map((course, idx) => (
                  <span key={idx} className="text-[9px] font-sans px-2 py-0.5 rounded-md bg-slate-900/60 border border-white/5 text-gray-400">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2: +2 Computer Science */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-5 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl relative overflow-hidden hover:border-cyan-500/30 transition-all shadow-lg group flex flex-col justify-between"
            id="education-card-highschool"
          >
            <div>
              {/* Highlight Header GPA Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono text-amber-400 font-black tracking-wide uppercase">
                  <Award className="w-3 h-3 text-amber-400" />
                  GPA: 3.82
                </span>
                <span className="font-mono text-[10px] text-cyan-400 font-semibold flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> 2079–2080 B.S.
                </span>
              </div>

              {/* Main Qualification Highlight */}
              <h3 className="font-sans font-extrabold text-lg text-white tracking-tight mb-1">
                +2 Computer Science
              </h3>
              <p className="font-sans text-xs text-gray-300 font-medium leading-relaxed mb-4">
                Higher Secondary Education (+2)
              </p>

              {/* Secondary Details - Small Typography */}
              <div className="space-y-1.5 border-t border-white/5 pt-3 mb-4">
                <div className="flex items-center gap-1.5 text-xs text-gray-400 font-sans">
                  <GraduationCap className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <span className="text-gray-300">Hetauda School of Management and Social Sciences</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-sans">
                  <MapPin className="w-3.5 h-3.5 text-gray-600 shrink-0" />
                  <span>Hetauda, Makawanpur</span>
                </div>
              </div>
            </div>

            {/* Compact Coursework */}
            <div className="border-t border-white/5 pt-3">
              <h4 className="font-mono text-[9px] text-gray-500 font-bold tracking-wider uppercase mb-1.5 flex items-center gap-1">
                <BookOpen className="w-3 h-3" /> Core Coursework
              </h4>
              <div className="flex flex-wrap gap-1">
                {['Computer Science', 'Mathematics', 'Physics', 'Chemistry'].map((course, idx) => (
                  <span key={idx} className="text-[9px] font-sans px-2 py-0.5 rounded-md bg-slate-900/60 border border-white/5 text-gray-400">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
