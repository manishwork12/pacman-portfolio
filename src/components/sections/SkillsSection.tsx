import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SkillsSectionProps {
  onClose: () => void;
}

const skillCategories = [
  {
    name: 'Languages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'SQL'],
    color: 'bg-yellow-400',
  },
  {
    name: 'Frameworks',
    skills: ['React', 'Node.js', 'FastAPI', 'Django', 'Express'],
    color: 'bg-cyan-400',
  },
  {
    name: 'DevOps',
    skills: ['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Terraform'],
    color: 'bg-red-400',
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
    <div className="fixed inset-0 bg-gray-900/95 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto border-4 border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.3)]">
        <div className="sticky top-0 bg-gray-800 p-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-yellow-400">🎯 Skills & Tech Stack</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-6 h-6 text-gray-400" />
          </Button>
        </div>
        
        <div className="p-6 space-y-6">
          {skillCategories.map((category, idx) => (
            <div 
              key={category.name}
              className="animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <h3 className="text-lg font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${category.color}`} />
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={skill}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium text-gray-900 ${category.color} hover:scale-105 transition-transform cursor-default`}
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
