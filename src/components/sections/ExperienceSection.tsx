import { X, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExperienceSectionProps {
  onClose: () => void;
}

const experiences = [
  {
    company: 'Bitsilica',
    role: 'Software Engineer',
    period: '2024 - Present',
    description: 'Working on full-stack development and DevOps practices. Building scalable applications and CI/CD pipelines.',
    color: 'border-destructive',
    ghost: '👻',
  },
  {
    company: 'Aubergine Design Works',
    role: 'Software Developer',
    period: '2024',
    description: 'Developed modern web applications using React and Node.js. Collaborated with design teams for UI/UX implementation.',
    color: 'border-pink-400',
    ghost: '👻',
  },
  {
    company: 'Rejolt EdTech',
    role: 'Full Stack Intern',
    period: '2022',
    description: 'Built educational platform features. Gained experience in agile development and code reviews.',
    color: 'border-accent',
    ghost: '👻',
  },
];

export const ExperienceSection = ({ onClose }: ExperienceSectionProps) => {
  return (
    <div className="fixed inset-0 glass-overlay z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-auto border-4 border-pink-400 shadow-[0_0_30px_rgba(244,114,182,0.3)]">
        <div className="sticky top-0 glass p-4 border-b border-border/30 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-pink-400">💼 Work Experience</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-6 h-6 text-muted-foreground" />
          </Button>
        </div>
        
        <div className="p-6">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
            
            <div className="space-y-8">
              {experiences.map((exp, idx) => (
                <div 
                  key={exp.company}
                  className="relative pl-12 animate-fade-in"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-2 w-5 h-5 rounded-full glass border-2 ${exp.color} flex items-center justify-center text-xs`}>
                    {exp.ghost}
                  </div>
                  
                  <div className={`glass-panel p-4 border-l-4 ${exp.color} hover:bg-card/60 transition-colors`}>
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{exp.company}</h3>
                        <p className="text-muted-foreground flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {exp.role}
                        </p>
                      </div>
                      <span className="text-sm text-muted-foreground glass-button px-2 py-1 rounded">
                        {exp.period}
                      </span>
                    </div>
                    <p className="mt-3 text-foreground/80 text-sm">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};