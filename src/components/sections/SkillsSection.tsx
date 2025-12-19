import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SkillsSectionProps {
  onClose: () => void;
}

const skillCategories = [
  {
    name: 'Languages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'SQL'],
    color: 'bg-primary',
  },
  {
    name: 'Frameworks',
    skills: ['React', 'Node.js', 'FastAPI', 'Django', 'Express'],
    color: 'bg-accent',
  },
  {
    name: 'DevOps',
    skills: ['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Terraform'],
    color: 'bg-destructive',
  },
  {
    name: 'Databases',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL'],
    color: 'bg-pink-400',
  },
  {
    name: 'Cloud',
    skills: ['AWS', 'Azure', 'GCP', 'Vercel', 'Netlify'],
    color: 'bg-orange-400',
  },
];

export const SkillsSection = ({ onClose }: SkillsSectionProps) => {
  return (
    <div className="fixed inset-0 glass-overlay z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-auto border-4 border-primary shadow-[0_0_30px_hsl(var(--primary)/0.3)]">
        <div className="sticky top-0 glass p-4 border-b border-border/30 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary">🎯 Skills & Tech Stack</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-6 h-6 text-muted-foreground" />
          </Button>
        </div>
        
        <div className="p-6 space-y-6">
          {skillCategories.map((category, idx) => (
            <div 
              key={category.name}
              className="animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${category.color}`} />
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={skill}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium text-primary-foreground ${category.color} hover:scale-105 transition-transform cursor-default`}
                    style={{ animationDelay: `${(idx * 100) + (i * 50)}ms` }}
                  >
                    {skill}
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