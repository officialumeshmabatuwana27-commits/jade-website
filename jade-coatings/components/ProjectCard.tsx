import { MapPin } from "lucide-react";

interface Project {
  id: number;
  name: string;
  location: string;
  description: string;
  image_url: string;
  type: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-jade-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Placeholder image area */}
      <div className="relative h-44 bg-jade-gradient flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-jade-700/80 to-charcoal/90" />
        <div className="relative z-10 text-center">
          <span className="font-display text-2xl font-bold text-white/90">
            {project.name.split(" ")[0]}
          </span>
        </div>
        {/* Decorative */}
        <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-jade-400/20" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-charcoal text-base mb-1 group-hover:text-jade-500 transition-colors">
          {project.name}
        </h3>
        <div className="flex items-center gap-1.5 text-jade-500 text-xs mb-3">
          <MapPin className="w-3 h-3" />
          <span>{project.location}</span>
        </div>
        <p className="text-charcoal/60 text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>
    </div>
  );
}
