import { useState, useCallback, useEffect, useRef } from 'react';

export type Direction = 'up' | 'down' | 'left' | 'right';
export type GameSection = 'skills' | 'experience' | 'projects' | 'contact';

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

interface GameState {
  pacmanPosition: Position;
  direction: Direction;
  score: number;
  pelletsCollected: Set<string>;
  powerPelletsCollected: Set<GameSection>;
  isPlaying: boolean;
  gameCompleted: boolean;
  currentSection: GameSection | null;
  ghosts: Ghost[];
  ghostsEaten: number;
}

const GRID_SIZE = 15;
// Fixed positions - all on valid paths (0 cells)
const POWER_PELLET_POSITIONS: Record<GameSection, Position> = {
  skills: { x: 1, y: 1 },
  experience: { x: 13, y: 1 },
  projects: { x: 1, y: 13 },
  contact: { x: 13, y: 13 },
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

const INITIAL_GHOSTS: Ghost[] = [
  { id: 0, position: { x: 5, y: 5 }, direction: 'right', color: 'red' },
  { id: 1, position: { x: 9, y: 5 }, direction: 'left', color: 'pink' },
  { id: 2, position: { x: 5, y: 9 }, direction: 'up', color: 'cyan' },
  { id: 3, position: { x: 9, y: 9 }, direction: 'down', color: 'orange' },
];

// Sound effects using Web Audio API
const createSoundContext = () => {
  let audioContext: AudioContext | null = null;
  
  const getContext = () => {
    if (!audioContext) {
      audioContext = new AudioContext();
    }
    return audioContext;
  };
  
  return {
    playChomp: () => {
      try {
        const ctx = getContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        oscillator.frequency.setValueAtTime(400, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.05);
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.05);
      } catch (e) { /* ignore audio errors */ }
    },
    playPowerPellet: () => {
      try {
        const ctx = getContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        oscillator.frequency.setValueAtTime(523, ctx.currentTime);
        oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.3);
      } catch (e) { /* ignore audio errors */ }
    },
    playEatGhost: () => {
      try {
        const ctx = getContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(200, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.2);
      } catch (e) { /* ignore audio errors */ }
    },
    playGameComplete: () => {
      try {
        const ctx = getContext();
        const notes = [523, 659, 784, 1047];
        notes.forEach((freq, i) => {
          const oscillator = ctx.createOscillator();
          const gainNode = ctx.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(ctx.destination);
          oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15);
          gainNode.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.15);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.15 + 0.15);
          oscillator.start(ctx.currentTime + i * 0.15);
          oscillator.stop(ctx.currentTime + i * 0.15 + 0.15);
        });
      } catch (e) { /* ignore audio errors */ }
    },
  };
};

export const useGameState = () => {
  const soundsRef = useRef(createSoundContext());
  
  const [gameState, setGameState] = useState<GameState>({
    pacmanPosition: { x: 7, y: 7 },
    direction: 'right',
    score: 0,
    pelletsCollected: new Set(),
    powerPelletsCollected: new Set(),
    isPlaying: false,
    gameCompleted: false,
    currentSection: null,
    ghosts: INITIAL_GHOSTS,
    ghostsEaten: 0,
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

  const checkGhostCollision = useCallback((pos: Position, ghosts: Ghost[]): number | null => {
    for (const ghost of ghosts) {
      if (ghost.position.x === pos.x && ghost.position.y === pos.y) {
        return ghost.id;
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
      let newGhosts = [...prev.ghosts];
      let ghostsEaten = prev.ghostsEaten;

      // Collect regular pellet
      if (!newPelletsCollected.has(pelletKey)) {
        newPelletsCollected.add(pelletKey);
        newScore += 10;
        soundsRef.current.playChomp();
      }

      // Check for power pellet
      const powerPellet = checkPowerPellet(newPosition);
      if (powerPellet && !newPowerPelletsCollected.has(powerPellet)) {
        newPowerPelletsCollected.add(powerPellet);
        newScore += 100;
        currentSection = powerPellet;
        soundsRef.current.playPowerPellet();
      }

      // Check for ghost collision (eat ghost)
      const ghostId = checkGhostCollision(newPosition, newGhosts);
      if (ghostId !== null) {
        newGhosts = newGhosts.filter(g => g.id !== ghostId);
        newScore += 200;
        ghostsEaten += 1;
        soundsRef.current.playEatGhost();
      }

      // Check if game is completed (all 4 power pellets collected)
      const gameCompleted = newPowerPelletsCollected.size === 4;
      if (gameCompleted && !prev.gameCompleted) {
        soundsRef.current.playGameComplete();
      }

      return {
        ...prev,
        pacmanPosition: newPosition,
        direction,
        score: newScore,
        pelletsCollected: newPelletsCollected,
        powerPelletsCollected: newPowerPelletsCollected,
        currentSection,
        gameCompleted,
        ghosts: newGhosts,
        ghostsEaten,
      };
    });
  }, [checkPowerPellet, checkGhostCollision]);

  // Ghost AI movement
  useEffect(() => {
    if (!gameState.isPlaying || gameState.gameCompleted) return;

    const moveGhosts = () => {
      setGameState(prev => {
        const newGhosts = prev.ghosts.map(ghost => {
          const directions: Direction[] = ['up', 'down', 'left', 'right'];
          const validMoves: Direction[] = [];
          
          // Calculate direction towards Pac-Man
          const dx = prev.pacmanPosition.x - ghost.position.x;
          const dy = prev.pacmanPosition.y - ghost.position.y;
          
          // Prioritize moving towards Pac-Man
          const preferredDirections: Direction[] = [];
          if (dx > 0) preferredDirections.push('right');
          if (dx < 0) preferredDirections.push('left');
          if (dy > 0) preferredDirections.push('down');
          if (dy < 0) preferredDirections.push('up');
          
          // Check which moves are valid
          for (const dir of directions) {
            let newX = ghost.position.x;
            let newY = ghost.position.y;
            switch (dir) {
              case 'up': newY -= 1; break;
              case 'down': newY += 1; break;
              case 'left': newX -= 1; break;
              case 'right': newX += 1; break;
            }
            if (isValidMove(newX, newY)) {
              validMoves.push(dir);
            }
          }
          
          if (validMoves.length === 0) return ghost;
          
          // 70% chance to move towards Pac-Man, 30% random
          let chosenDirection: Direction;
          const preferredValid = preferredDirections.filter(d => validMoves.includes(d));
          
          if (preferredValid.length > 0 && Math.random() < 0.7) {
            chosenDirection = preferredValid[Math.floor(Math.random() * preferredValid.length)];
          } else {
            chosenDirection = validMoves[Math.floor(Math.random() * validMoves.length)];
          }
          
          let newX = ghost.position.x;
          let newY = ghost.position.y;
          switch (chosenDirection) {
            case 'up': newY -= 1; break;
            case 'down': newY += 1; break;
            case 'left': newX -= 1; break;
            case 'right': newX += 1; break;
          }
          
          return {
            ...ghost,
            position: { x: newX, y: newY },
            direction: chosenDirection,
          };
        });
        
        // Check if any ghost caught Pac-Man (they respawn)
        const caughtGhost = newGhosts.find(g => 
          g.position.x === prev.pacmanPosition.x && 
          g.position.y === prev.pacmanPosition.y
        );
        
        if (caughtGhost) {
          soundsRef.current.playEatGhost();
          return {
            ...prev,
            ghosts: newGhosts.filter(g => g.id !== caughtGhost.id),
            score: prev.score + 200,
            ghostsEaten: prev.ghostsEaten + 1,
          };
        }
        
        return { ...prev, ghosts: newGhosts };
      });
    };

    const interval = setInterval(moveGhosts, 500);
    return () => clearInterval(interval);
  }, [gameState.isPlaying, gameState.gameCompleted]);

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
      ghosts: INITIAL_GHOSTS,
      ghostsEaten: 0,
    });
  }, []);

  const closeSection = useCallback(() => {
    setGameState(prev => ({ ...prev, currentSection: null }));
  }, []);

  const openSection = useCallback((section: GameSection) => {
    setGameState(prev => ({ ...prev, currentSection: section }));
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip game controls if user is typing in an input field
      const target = e.target as HTMLElement;
      const isTyping = target.tagName === 'INPUT' || 
                       target.tagName === 'TEXTAREA' || 
                       target.tagName === 'SELECT' ||
                       target.isContentEditable;
      
      if (isTyping) {
        return; // Allow normal typing in form fields
      }

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
    openSection,
    maze: MAZE,
    gridSize: GRID_SIZE,
    powerPelletPositions: POWER_PELLET_POSITIONS,
  };
};
