import { GameSection } from '@/hooks/useGameState';
import { Zap, Briefcase, FolderGit2, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface GameUIProps {
  score: number;
  powerPelletsCollected: Set<GameSection>;
  onOpenSection: (section: GameSection) => void;
}

const SECTION_CONFIG: Record<GameSection, { icon: typeof Zap; label: string; color: string }> = {
  skills: { icon: Zap, label: 'Skills', color: 'text-primary' },
  experience: { icon: Briefcase, label: 'Experience', color: 'text-green-400' },
  projects: { icon: FolderGit2, label: 'Projects', color: 'text-purple-400' },
  contact: { icon: Mail, label: 'Contact', color: 'text-accent' },
};

export const GameUI = ({ score, powerPelletsCollected, onOpenSection }: GameUIProps) => {
  return (
    <div className="w-full max-w-md mb-4 px-2">
      {/* Header with score and theme toggle */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1" />
        <div className="glass-panel px-4 py-2">
          <p className="text-primary font-bold text-xl" style={{ fontFamily: "'Press Start 2P', cursive" }}>
            SCORE: {score}
          </p>
        </div>
        <div className="flex-1 flex justify-end">
          <ThemeToggle />
        </div>
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
                  "glass-button",
                  isCollected
                    ? "opacity-100 hover:scale-105"
                    : "opacity-60 hover:opacity-80"
                )}
              >
                <Icon className={cn("w-4 h-4", isCollected ? config.color : "text-muted-foreground")} />
                <span className={isCollected ? config.color : "text-muted-foreground"}>
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