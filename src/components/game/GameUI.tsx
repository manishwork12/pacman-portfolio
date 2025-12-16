import { GameSection } from '@/hooks/useGameState';
import { Zap, Briefcase, FolderGit2, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GameUIProps {
  score: number;
  powerPelletsCollected: Set<GameSection>;
  onOpenSection: (section: GameSection) => void;
}

const SECTION_CONFIG: Record<GameSection, { icon: typeof Zap; label: string; color: string }> = {
  skills: { icon: Zap, label: 'Skills', color: 'text-yellow-400' },
  experience: { icon: Briefcase, label: 'Experience', color: 'text-green-400' },
  projects: { icon: FolderGit2, label: 'Projects', color: 'text-purple-400' },
  contact: { icon: Mail, label: 'Contact', color: 'text-cyan-400' },
};

export const GameUI = ({ score, powerPelletsCollected, onOpenSection }: GameUIProps) => {
  return (
    <div className="w-full max-w-md mb-4 px-2">
      {/* Score */}
      <div className="text-center mb-3">
        <p className="text-yellow-400 font-bold text-xl" style={{ fontFamily: "'Press Start 2P', cursive" }}>
          SCORE: {score}
        </p>
      </div>

      {/* Section buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        {(Object.entries(SECTION_CONFIG) as [GameSection, typeof SECTION_CONFIG[GameSection]][]).map(
          ([section, config]) => {
            const Icon = config.icon;
            const isCollected = powerPelletsCollected.has(section);
            
            return (
              <button
                key={section}
                onClick={() => onOpenSection(section)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                  "border-2",
                  isCollected
                    ? "bg-gray-800 border-current opacity-100 hover:scale-105"
                    : "bg-gray-800/50 border-gray-600 opacity-60 hover:opacity-80"
                )}
              >
                <Icon className={cn("w-4 h-4", isCollected ? config.color : "text-gray-500")} />
                <span className={isCollected ? config.color : "text-gray-500"}>
                  {config.label}
                </span>
                {isCollected && (
                  <span className="text-green-400 text-[10px]">✓</span>
                )}
              </button>
            );
          }
        )}
      </div>
    </div>
  );
};
