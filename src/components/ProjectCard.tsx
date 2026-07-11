import React from 'react';
import { motion } from 'motion/react';
import { Github, ExternalLink, Star, GitFork, Calendar, Code } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  key?: string | number;
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps): React.JSX.Element {
  // Format the date to look polished (e.g., Nov 2024)
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {
      return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      id={`project-card-${project.id}`}
      className="group relative rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-xl overflow-hidden flex flex-col h-full shadow-xl hover:border-cyan-500/30 hover:shadow-cyan-500/5 transition-all duration-300"
    >
      {/* 1. Project Visual Thumbnail (using pre-mapped Unsplash images or high-tech default) */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950" id={`project-img-container-${project.id}`}>
        <img
          src={project.image || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop'}
          alt={`${project.name} preview`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
          referrerPolicy="no-referrer"
        />
        {/* Glow vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030308] via-transparent to-black/30" />

        {/* Primary Language Tag */}
        <span className="absolute top-4 left-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono text-cyan-400 border border-white/10 font-bold tracking-wider">
          <Code className="w-3 h-3" />
          {project.language}
        </span>

        {/* Date updated indicator */}
        <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono text-gray-400 border border-white/10 font-medium">
          <Calendar className="w-3 h-3" />
          {formatDate(project.updated_at)}
        </span>
      </div>

      {/* 2. Content Details */}
      <div className="p-6 flex flex-col flex-grow text-left" id={`project-details-${project.id}`}>
        {/* Title */}
        <h3 className="font-sans font-extrabold text-lg text-white mb-2 tracking-tight group-hover:text-cyan-400 transition-colors">
          {project.name}
        </h3>

        {/* Description */}
        <p className="font-sans text-xs text-gray-400 leading-relaxed mb-5 flex-grow line-clamp-3">
          {project.description}
        </p>

        {/* Topics / Badges */}
        <div className="flex flex-wrap gap-1.5 mb-6" id={`project-topics-${project.id}`}>
          {project.topics.slice(0, 4).map((topic, tIdx) => (
            <span
              key={tIdx}
              className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-white/5 text-gray-300 border border-white/5 uppercase"
            >
              #{topic}
            </span>
          ))}
          {project.topics.length > 4 && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 font-medium border border-cyan-500/10">
              +{project.topics.length - 4}
            </span>
          )}
        </div>

        {/* 3. Footer Stats & Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto" id={`project-footer-${project.id}`}>
          
          {/* GitHub Stats */}
          <div className="flex items-center gap-3.5" id={`project-stats-${project.id}`}>
            <span className="flex items-center gap-1 text-[11px] font-mono text-gray-400">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/10" />
              {project.stargazers_count}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-mono text-gray-400">
              <GitFork className="w-3.5 h-3.5 text-blue-400" />
              {project.forks_count}
            </span>
          </div>

          {/* Action Callouts */}
          <div className="flex items-center gap-2" id={`project-actions-${project.id}`}>
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all"
              title="View Repository on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:text-white hover:bg-cyan-600 transition-all flex items-center justify-center"
                title="View Live Deployment"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

        </div>
      </div>

      {/* Decorative top-border lighting effect */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-400 transition-all duration-700" />
    </motion.div>
  );
}
