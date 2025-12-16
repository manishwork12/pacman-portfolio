import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StartScreenProps {
  onStart: () => void;
  visitorCount: number;
}

export const StartScreen = ({ onStart, visitorCount }: StartScreenProps) => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Pac-Man animation */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-16 h-16 bg-yellow-400 rounded-full relative animate-bounce">
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-1/3 bg-gray-900"
              style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
            />
          </div>
          <div className="flex gap-2">
            {['bg-red-500', 'bg-pink-400', 'bg-cyan-400', 'bg-orange-400'].map((color, i) => (
              <div 
                key={i}
                className={`w-4 h-4 ${color} rounded-full animate-bounce`}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-2 tracking-wider"
          style={{ textShadow: '0 0 20px rgba(250, 204, 21, 0.5)' }}>
          SAI MANISH
        </h1>
        <h2 className="text-xl md:text-2xl text-blue-400 mb-8 font-mono">
          ANANTHULA
        </h2>
        <p className="text-gray-400 mb-2 text-sm md:text-base">
          Full Stack Developer • DevOps Engineer
        </p>
        <p className="text-gray-500 mb-8 text-xs md:text-sm">
          Navigate the maze to explore my portfolio!
        </p>

        {/* Start button */}
        <Button
          onClick={onStart}
          size="lg"
          className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-xl px-8 py-6 rounded-full animate-pulse hover:animate-none transition-all shadow-[0_0_30px_rgba(250,204,21,0.5)]"
        >
          <Play className="w-6 h-6 mr-2" />
          PRESS START
        </Button>

        {/* Controls hint */}
        <div className="mt-8 text-gray-500 text-sm">
          <p className="hidden md:block">Use Arrow Keys or WASD to move</p>
          <p className="md:hidden">Use on-screen controls to move</p>
        </div>

        {/* Visitor counter */}
        <div className="mt-8 bg-gray-800/50 px-4 py-2 rounded-full border border-blue-600/30">
          <span className="text-blue-400 font-mono text-sm">
            👁 Visitors: <span className="text-yellow-400">{visitorCount.toLocaleString()}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
