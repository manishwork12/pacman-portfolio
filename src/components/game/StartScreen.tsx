import { Github, Linkedin, Twitter, Mail, Users } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
  visitorCount: number;
}

const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
  { icon: Mail, href: 'mailto:your@email.com', label: 'Email' },
];

export const StartScreen = ({ onStart, visitorCount }: StartScreenProps) => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Animated background dots */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/20 rounded-full animate-pulse"
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
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-4 h-4 bg-yellow-200 rounded-full animate-pulse" />
          <div className="w-4 h-4 bg-yellow-200 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
          <div className="w-4 h-4 bg-yellow-200 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-10 h-10 bg-yellow-400 rounded-full relative animate-[bounce_1s_ease-in-out_infinite]">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-1/3 bg-gray-900 origin-left animate-[chomp_0.3s_ease-in-out_infinite]" 
              style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
            />
          </div>
        </div>

        {/* Title */}
        <h1 
          className="text-4xl md:text-5xl text-yellow-400 mb-2"
          style={{ fontFamily: "'Press Start 2P', cursive", textShadow: '0 0 20px rgba(250, 204, 21, 0.5)' }}
        >
          SAI MANISH
        </h1>
        <h2 
          className="text-xl md:text-2xl text-blue-400 mb-6"
          style={{ fontFamily: "'Press Start 2P', cursive" }}
        >
          ANANTHULA
        </h2>
        
        <p className="text-gray-400 mb-2 text-sm md:text-base">
          Full Stack Developer • DevOps Engineer
        </p>
        <p className="text-blue-400 text-xs md:text-sm mb-8 max-w-md">
          Navigate the maze and collect power pellets to unlock my portfolio sections!
        </p>

        {/* Start button */}
        <button
          onClick={onStart}
          className="relative px-8 py-4 text-lg font-bold text-gray-900 bg-yellow-400 rounded-lg 
                     hover:bg-yellow-300 transition-all duration-200 hover:scale-105
                     shadow-[0_0_30px_rgba(250,204,21,0.5)] animate-pulse"
          style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '14px' }}
        >
          PRESS START
        </button>

        {/* Controls info */}
        <div className="mt-8 text-gray-500 text-xs space-y-1">
          <p>🎮 Arrow Keys / WASD to move</p>
          <p>📱 Swipe or tap buttons on mobile</p>
          <p>👻 Eat ghosts for bonus points!</p>
        </div>

        {/* Social links */}
        <div className="mt-8 flex justify-center gap-4">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all hover:scale-110"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Visitor count */}
        <div className="mt-6 flex items-center justify-center gap-2 text-gray-600 text-xs">
          <Users className="w-4 h-4" />
          <span>{visitorCount.toLocaleString()} visitors</span>
        </div>
      </div>

      {/* Ghost characters at bottom */}
      <div className="absolute bottom-8 flex gap-4">
        {['bg-red-500', 'bg-pink-400', 'bg-cyan-400', 'bg-orange-400'].map((color, i) => (
          <div
            key={i}
            className={`w-8 h-8 ${color} rounded-t-full relative animate-bounce`}
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <div className="absolute top-2 left-1 w-1.5 h-1.5 bg-white rounded-full">
              <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-blue-900 rounded-full" />
            </div>
            <div className="absolute top-2 right-1 w-1.5 h-1.5 bg-white rounded-full">
              <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-blue-900 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
