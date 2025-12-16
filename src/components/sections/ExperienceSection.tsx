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
    color: 'border-red-500',
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
    color: 'border-cyan-400',
    ghost: '👻',
  },
];

export const ExperienceSection = ({ onClose }: ExperienceSectionProps) => {
  return (
    <div className="fixed inset-0 bg-gray-900/95 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto border-4 border-pink-400 shadow-[0_0_30px_rgba(244,114,182,0.3)]">
        <div className="sticky top-0 bg-gray-800 p-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-pink-400">💼 Work Experience</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-6 h-6 text-gray-400" />
          </Button>
        </div>
        
        <div className="p-6">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700" />
            
            <div className="space-y-8">
              {experiences.map((exp, idx) => (
                <div 
                  key={exp.company}
                  className="relative pl-12 animate-fade-in"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-2 w-5 h-5 rounded-full bg-gray-800 border-2 ${exp.color} flex items-center justify-center text-xs`}>
                    {exp.ghost}
                  </div>
                  
                  <div className={`bg-gray-700/50 rounded-xl p-4 border-l-4 ${exp.color} hover:bg-gray-700/70 transition-colors`}>
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-white">{exp.company}</h3>
                        <p className="text-gray-400 flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {exp.role}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-800 px-2 py-1 rounded">
                        {exp.period}
                      </span>
                    </div>
                    <p className="mt-3 text-gray-300 text-sm">{exp.description}</p>
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
