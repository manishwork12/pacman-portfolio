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
    color: 'bg-destructive',
  },
  {
    name: 'Management Portal',
    description: 'Full-stack web application for resource management with role-based access control.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'JWT'],
    color: 'bg-accent',
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
    <div className="fixed inset-0 glass-overlay z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="glass-card max-w-3xl w-full max-h-[90vh] overflow-auto border-4 border-accent shadow-[0_0_30px_hsl(var(--accent)/0.3)]">
        <div className="sticky top-0 glass p-4 border-b border-border/30 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-accent">🚀 Projects</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-6 h-6 text-muted-foreground" />
          </Button>
        </div>
        
        <div className="p-6 grid gap-4 md:grid-cols-2">
          {projects.map((project, idx) => (
            <div
              key={project.name}
              className="glass-panel p-4 border border-border/30 hover:border-accent/50 transition-all hover:scale-[1.02] animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${project.color} flex items-center justify-center text-2xl`}>
                  🎮
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 glass-button">
                    <Github className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 glass-button">
                    <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </Button>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-foreground mb-2">{project.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 glass-button rounded text-foreground/80">
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