import { motion } from 'motion/react';
import { BookOpen, Code, Cpu, Award, Users, Terminal, GraduationCap, Laptop, Sparkles } from 'lucide-react';

const highlights = [
  {
    icon: GraduationCap,
    title: 'BSc. CSIT Undergraduate',
    description: 'Pursuing a comprehensive degree in Computer Science & Information Technology in Nepal.',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    icon: Code,
    title: 'Full-Stack Development',
    description: 'Fascinated by building end-to-end web architectures, responsive styles, and secure APIs.',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: Cpu,
    title: 'Artificial Intelligence',
    description: 'Passion for integrating AI and Large Language Models directly into user applications.',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: Award,
    title: 'Hackathon Competitor',
    description: 'Active participator and winner in tech hackathons, translating pressure into innovation.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Laptop,
    title: 'Personal Softwares',
    description: 'Designing and building utility applications to streamline learning and automate tasks.',
    color: 'from-amber-400 to-orange-500',
  },
  {
    icon: Users,
    title: 'Team Collaborator',
    description: 'Enthusiastic about cross-functional group sprints, code reviews, and event organizing.',
    color: 'from-emerald-400 to-teal-500',
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16" id="about-section-header">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-mono text-[10px] text-blue-400 font-semibold tracking-wider uppercase">
              Core Identity
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans font-extrabold text-3xl md:text-4xl text-white tracking-tight"
          >
            About Me
          </motion.h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="about-content-grid">
          
          {/* Left Column: Narrative Biography */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/10 relative overflow-hidden"
            id="about-bio-card"
          >
            {/* Subtle glow circle */}
            <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-blue-500/5 blur-2xl -z-10" />

            <div className="flex items-center gap-2 mb-6" id="about-bio-card-title">
              <Terminal className="w-5 h-5 text-cyan-400" />
              <span className="font-mono text-xs text-cyan-400 font-bold tracking-wider">shrawan_gupta.sh</span>
            </div>

            <p className="font-sans text-gray-300 text-base leading-relaxed mb-6">
              I am Shrawan Kumar Gupta, a BSc. CSIT undergraduate from Nepal with a strong interest in full-stack development, artificial intelligence, and building practical technology solutions.
            </p>
            <p className="font-sans text-gray-400 text-base leading-relaxed mb-6">
              I have experience working on academic projects, personal software projects, and hackathon-based solutions. I enjoy learning new technologies, solving problems, collaborating with teams, and transforming ideas into functional applications.
            </p>
            
            <div className="p-4 rounded-xl bg-cyan-950/10 border border-cyan-500/10 flex items-start gap-3" id="about-bio-callout">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 mt-0.5">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-sans font-semibold text-sm text-cyan-300">Continuous Learner</h4>
                <p className="font-sans text-xs text-cyan-400/80 mt-1 leading-relaxed">
                  Committed to exploring compiler theories, algorithmic complexity, and fine-tuning lightweight neural structures.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Highlights Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6" id="about-highlights-grid">
            {highlights.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.2)' }}
                  className="p-6 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/10 flex flex-col items-start text-left group transition-all"
                  id={`about-highlight-card-${idx}`}
                >
                  {/* Glowing background gradient on card hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

                  {/* Icon with gradient container */}
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} bg-opacity-10 text-white mb-4 shadow-md`}>
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className="font-sans font-bold text-base text-white tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
