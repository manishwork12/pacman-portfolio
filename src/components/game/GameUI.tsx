import { GameSection } from '@/hooks/useGameState';

interface GameUIProps {
  score: number;
  powerPelletsCollected: Set<GameSection>;
}

const sectionLabels: Record<GameSection, { label: string; color: string }> = {
  skills: { label: '🎯 Skills', color: 'bg-yellow-400' },
  experience: { label: '💼 Experience', color: 'bg-pink-400' },
  projects: { label: '🚀 Projects', color: 'bg-cyan-400' },
  contact: { label: '📬 Contact', color: 'bg-orange-400' },
};

export const GameUI = ({ score, powerPelletsCollected }: GameUIProps) => {
  return (
    <div className="w-full max-w-[500px] mx-auto mb-4">
      {/* Score */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="text-lg font-bold text-yellow-400">
          SCORE: <span className="text-white">{score.toLocaleString()}</span>
        </div>
        <div className="text-sm text-gray-400">
          {powerPelletsCollected.size}/4 Sections
        </div>
      </div>

      {/* Progress indicators */}
      <div className="flex flex-wrap gap-2 justify-center">
        {(Object.keys(sectionLabels) as GameSection[]).map((section) => {
          const { label, color } = sectionLabels[section];
          const collected = powerPelletsCollected.has(section);
          
          return (
            <div
              key={section}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                collected
                  ? `${color} text-gray-900`
                  : 'bg-gray-700 text-gray-500'
              }`}
            >
              {collected ? '✓ ' : ''}{label}
            </div>
          );
        })}
      </div>
    </div>
  );
};
