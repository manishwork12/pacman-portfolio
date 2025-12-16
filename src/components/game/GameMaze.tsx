import { cn } from '@/lib/utils';
import { Direction, GameSection } from '@/hooks/useGameState';

interface Position {
  x: number;
  y: number;
}

interface Ghost {
  id: number;
  position: Position;
  direction: Direction;
  color: string;
}

interface GameMazeProps {
  maze: number[][];
  gridSize: number;
  pacmanPosition: Position;
  direction: Direction;
  pelletsCollected: Set<string>;
  powerPelletsCollected: Set<GameSection>;
  powerPelletPositions: Record<GameSection, Position>;
  ghosts: Ghost[];
}

const GhostSprite = ({ color }: { color: string }) => {
  const colorClasses: Record<string, string> = {
    red: 'bg-red-500',
    pink: 'bg-pink-400',
    cyan: 'bg-cyan-400',
    orange: 'bg-orange-400',
  };

  return (
    <div
      className={cn(
        "absolute w-full h-full rounded-t-full",
        colorClasses[color] || 'bg-red-500'
      )}
    >
      {/* Ghost body wave effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 flex">
        <div className={cn("flex-1 rounded-b-full", colorClasses[color])} />
        <div className="flex-1 bg-gray-900" />
        <div className={cn("flex-1 rounded-b-full", colorClasses[color])} />
        <div className="flex-1 bg-gray-900" />
        <div className={cn("flex-1 rounded-b-full", colorClasses[color])} />
      </div>
      {/* Eyes */}
      <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-white rounded-full">
        <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-blue-900 rounded-full" />
      </div>
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white rounded-full">
        <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-blue-900 rounded-full" />
      </div>
    </div>
  );
};

export const GameMaze = ({
  maze,
  gridSize,
  pacmanPosition,
  direction,
  pelletsCollected,
  powerPelletsCollected,
  powerPelletPositions,
  ghosts,
}: GameMazeProps) => {
  const getRotation = () => {
    switch (direction) {
      case 'up': return 'rotate-[-90deg]';
      case 'down': return 'rotate-90';
      case 'left': return 'rotate-180';
      case 'right': return 'rotate-0';
    }
  };

  const isPowerPellet = (x: number, y: number): GameSection | null => {
    for (const [section, pos] of Object.entries(powerPelletPositions)) {
      if (pos.x === x && pos.y === y) return section as GameSection;
    }
    return null;
  };

  const getGhostAt = (x: number, y: number): Ghost | null => {
    return ghosts.find(g => g.position.x === x && g.position.y === y) || null;
  };

  return (
    <div 
      className="grid gap-0 bg-gray-900 p-2 rounded-lg border-4 border-blue-600 shadow-[0_0_30px_rgba(59,130,246,0.5)]"
      style={{ 
        gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
        aspectRatio: '1/1',
        maxWidth: '100%',
        width: 'min(85vw, 450px)',
      }}
    >
      {maze.map((row, y) =>
        row.map((cell, x) => {
          const isPacman = pacmanPosition.x === x && pacmanPosition.y === y;
          const pelletKey = `${x},${y}`;
          const hasPellet = cell === 0 && !pelletsCollected.has(pelletKey);
          const powerPelletSection = isPowerPellet(x, y);
          const hasPowerPellet = powerPelletSection && !powerPelletsCollected.has(powerPelletSection);
          const ghost = getGhostAt(x, y);

          return (
            <div
              key={`${x}-${y}`}
              className={cn(
                "relative flex items-center justify-center aspect-square",
                cell === 1 ? "bg-blue-800 rounded-sm" : "bg-gray-900"
              )}
            >
              {isPacman && (
                <div className={cn(
                  "w-[80%] h-[80%] bg-yellow-400 rounded-full relative transition-transform duration-100 z-10",
                  getRotation()
                )}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-1/3 bg-gray-900 origin-left animate-[chomp_0.2s_ease-in-out_infinite]" 
                    style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
                  />
                </div>
              )}
              {!isPacman && ghost && (
                <div className="w-[80%] h-[80%] relative animate-bounce z-10" style={{ animationDuration: '0.5s' }}>
                  <GhostSprite color={ghost.color} />
                </div>
              )}
              {!isPacman && !ghost && hasPowerPellet && (
                <div className="w-4 h-4 bg-yellow-300 rounded-full animate-pulse shadow-[0_0_10px_rgba(253,224,71,0.8)]" />
              )}
              {!isPacman && !ghost && !hasPowerPellet && hasPellet && cell === 0 && (
                <div className="w-1.5 h-1.5 bg-yellow-200 rounded-full" />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};
