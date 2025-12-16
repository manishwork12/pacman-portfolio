import { useState, useCallback, useEffect } from 'react';

export type Direction = 'up' | 'down' | 'left' | 'right';
export type GameSection = 'skills' | 'experience' | 'projects' | 'contact';

interface Position {
  x: number;
  y: number;
}

interface GameState {
  pacmanPosition: Position;
  direction: Direction;
  score: number;
  pelletsCollected: Set<string>;
  powerPelletsCollected: Set<GameSection>;
  isPlaying: boolean;
  gameCompleted: boolean;
  currentSection: GameSection | null;
}

const GRID_SIZE = 15;
const POWER_PELLET_POSITIONS: Record<GameSection, Position> = {
  skills: { x: 2, y: 2 },
  experience: { x: 12, y: 2 },
  projects: { x: 2, y: 12 },
  contact: { x: 12, y: 12 },
};

// Maze walls (1 = wall, 0 = path)
const MAZE: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
  [1,0,1,0,1,1,0,1,0,1,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,0,1,0,1,1,1,0,1,0,1,0,1],
  [1,0,0,0,1,0,0,1,0,0,1,0,0,0,1],
  [1,1,1,0,1,1,0,1,0,1,1,0,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,0,1,1,0,1,0,1,1,0,1,1,1],
  [1,0,0,0,1,0,0,1,0,0,1,0,0,0,1],
  [1,0,1,0,1,0,1,1,1,0,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,0,1,1,0,1,0,1,1,0,1,0,1],
  [1,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    pacmanPosition: { x: 7, y: 7 },
    direction: 'right',
    score: 0,
    pelletsCollected: new Set(),
    powerPelletsCollected: new Set(),
    isPlaying: false,
    gameCompleted: false,
    currentSection: null,
  });

  const isValidMove = (x: number, y: number): boolean => {
    if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) return false;
    return MAZE[y][x] === 0;
  };

  const checkPowerPellet = useCallback((pos: Position): GameSection | null => {
    for (const [section, pelletPos] of Object.entries(POWER_PELLET_POSITIONS)) {
      if (pos.x === pelletPos.x && pos.y === pelletPos.y) {
        return section as GameSection;
      }
    }
    return null;
  }, []);

  const move = useCallback((direction: Direction) => {
    setGameState(prev => {
      if (!prev.isPlaying || prev.gameCompleted) return prev;

      let newX = prev.pacmanPosition.x;
      let newY = prev.pacmanPosition.y;

      switch (direction) {
        case 'up': newY -= 1; break;
        case 'down': newY += 1; break;
        case 'left': newX -= 1; break;
        case 'right': newX += 1; break;
      }

      if (!isValidMove(newX, newY)) {
        return { ...prev, direction };
      }

      const newPosition = { x: newX, y: newY };
      const pelletKey = `${newX},${newY}`;
      const newPelletsCollected = new Set(prev.pelletsCollected);
      let newScore = prev.score;
      let newPowerPelletsCollected = new Set(prev.powerPelletsCollected);
      let currentSection = prev.currentSection;

      // Collect regular pellet
      if (!newPelletsCollected.has(pelletKey)) {
        newPelletsCollected.add(pelletKey);
        newScore += 10;
      }

      // Check for power pellet
      const powerPellet = checkPowerPellet(newPosition);
      if (powerPellet && !newPowerPelletsCollected.has(powerPellet)) {
        newPowerPelletsCollected.add(powerPellet);
        newScore += 100;
        currentSection = powerPellet;
      }

      // Check if game is completed (all 4 power pellets collected)
      const gameCompleted = newPowerPelletsCollected.size === 4;

      return {
        ...prev,
        pacmanPosition: newPosition,
        direction,
        score: newScore,
        pelletsCollected: newPelletsCollected,
        powerPelletsCollected: newPowerPelletsCollected,
        currentSection,
        gameCompleted,
      };
    });
  }, [checkPowerPellet]);

  const startGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPlaying: true }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      pacmanPosition: { x: 7, y: 7 },
      direction: 'right',
      score: 0,
      pelletsCollected: new Set(),
      powerPelletsCollected: new Set(),
      isPlaying: false,
      gameCompleted: false,
      currentSection: null,
    });
  }, []);

  const closeSection = useCallback(() => {
    setGameState(prev => ({ ...prev, currentSection: null }));
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          move('up');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          move('down');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          move('left');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          move('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  return {
    ...gameState,
    move,
    startGame,
    resetGame,
    closeSection,
    maze: MAZE,
    gridSize: GRID_SIZE,
    powerPelletPositions: POWER_PELLET_POSITIONS,
  };
};
