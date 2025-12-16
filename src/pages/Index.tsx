import { useState, useEffect } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { StartScreen } from '@/components/game/StartScreen';
import { GameMaze } from '@/components/game/GameMaze';
import { GameUI } from '@/components/game/GameUI';
import { MobileControls } from '@/components/game/MobileControls';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { CompletionPopup } from '@/components/game/CompletionPopup';

const Index = () => {
  // Visitor count - stored in localStorage for now, will connect to FastAPI later
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // Simulate visitor count - replace with FastAPI call later
    const stored = localStorage.getItem('visitorCount');
    const count = stored ? parseInt(stored) + 1 : 1247; // Start with a nice number
    localStorage.setItem('visitorCount', count.toString());
    setVisitorCount(count);
  }, []);

  const {
    pacmanPosition,
    direction,
    score,
    pelletsCollected,
    powerPelletsCollected,
    isPlaying,
    gameCompleted,
    currentSection,
    ghosts,
    move,
    startGame,
    resetGame,
    closeSection,
    openSection,
    maze,
    gridSize,
    powerPelletPositions,
  } = useGameState();

  // Show start screen if not playing
  if (!isPlaying) {
    return <StartScreen onStart={startGame} visitorCount={visitorCount} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      {/* Game UI */}
      <GameUI 
        score={score} 
        powerPelletsCollected={powerPelletsCollected} 
        onOpenSection={openSection}
      />

      {/* Game Maze */}
      <GameMaze
        maze={maze}
        gridSize={gridSize}
        pacmanPosition={pacmanPosition}
        direction={direction}
        pelletsCollected={pelletsCollected}
        powerPelletsCollected={powerPelletsCollected}
        powerPelletPositions={powerPelletPositions}
        ghosts={ghosts}
      />

      {/* Mobile Controls */}
      <MobileControls onMove={move} />

      {/* Instructions */}
      <p className="mt-4 text-gray-500 text-xs text-center max-w-xs">
        Collect glowing power pellets in corners to unlock sections, or click buttons above!
      </p>

      {/* Section Modals */}
      {currentSection === 'skills' && <SkillsSection onClose={closeSection} />}
      {currentSection === 'experience' && <ExperienceSection onClose={closeSection} />}
      {currentSection === 'projects' && <ProjectsSection onClose={closeSection} />}
      {currentSection === 'contact' && <ContactSection onClose={closeSection} />}

      {/* Completion Popup */}
      {gameCompleted && !currentSection && (
        <CompletionPopup score={score} onPlayAgain={resetGame} />
      )}
    </div>
  );
};

export default Index;
