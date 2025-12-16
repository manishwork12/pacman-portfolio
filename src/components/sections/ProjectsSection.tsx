import { X, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectsSectionProps {
  onClose: () => void;
}

const projects = [
  {
    name: 'Trackon',
    description: 'DevOps project featuring CI/CD pipelines, infrastructure as code, and automated deployments.',
    tech: ['Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
    color: 'bg-red-500',
  },
  {
    name: 'Management Portal',
    description: 'Full-stack web application for resource management with role-based access control.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'JWT'],
    color: 'bg-cyan-400',
  },
  {
    name: 'Heart Health Predictor',
    description: 'Machine learning model to predict heart disease risk using patient data.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Flask'],
    color: 'bg-pink-400',
  },
  {
    name: 'Android Security App',
    description: 'Mobile application focused on device security and privacy protection features.',
    tech: ['Java', 'Android SDK', 'SQLite', 'Encryption'],
    color: 'bg-orange-400',
  },
];

export const ProjectsSection = ({ onClose }: ProjectsSectionProps) => {
  return (
    <div className="fixed inset-0 bg-gray-900/95 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto border-4 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
        <div className="sticky top-0 bg-gray-800 p-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-cyan-400">🚀 Projects</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-6 h-6 text-gray-400" />
          </Button>
        </div>
        
        <div className="p-6 grid gap-4 md:grid-cols-2">
          {projects.map((project, idx) => (
            <div
              key={project.name}
              className="bg-gray-700/50 rounded-xl p-4 border border-gray-600 hover:border-cyan-400/50 transition-all hover:scale-[1.02] animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${project.color} flex items-center justify-center text-2xl`}>
                  🎮
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Github className="w-4 h-4 text-gray-400 hover:text-white" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white" />
                  </Button>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">{project.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
