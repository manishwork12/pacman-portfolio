import { Trophy, RotateCcw, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CompletionPopupProps {
  score: number;
  onPlayAgain: () => void;
}

export const CompletionPopup = ({ score, onPlayAgain }: CompletionPopupProps) => {
  return (
    <div className="fixed inset-0 bg-gray-900/95 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gray-800 rounded-2xl max-w-md w-full border-4 border-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.5)] overflow-hidden">
        {/* Celebration header */}
        <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center animate-bounce">
              <Trophy className="w-10 h-10 text-yellow-500" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            🎉 GAME COMPLETE! 🎉
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <div className="mb-6">
            <p className="text-gray-400 mb-2">Final Score</p>
            <p className="text-5xl font-bold text-yellow-400">{score.toLocaleString()}</p>
          </div>

          {/* Personal message */}
          <div className="bg-gray-700/50 rounded-xl p-4 mb-6 text-left">
            <p className="text-gray-300 leading-relaxed">
              <span className="text-yellow-400 font-bold">Hey there! 👋</span>
              <br /><br />
              Thanks for playing through my portfolio! I'm <span className="text-cyan-400 font-semibold">Sai Manish</span>, a passionate Full Stack Developer & DevOps Engineer.
              <br /><br />
              I love building scalable applications and automating everything. If you're looking for someone who brings both technical skills and creativity to the table, let's connect!
              <br /><br />
              <span className="text-pink-400">Looking forward to hearing from you! 🚀</span>
            </p>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-3 mb-6">
            <a
              href="#"
              className="p-3 bg-gray-700 rounded-full text-gray-400 hover:text-white hover:bg-gray-600 transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-3 bg-gray-700 rounded-full text-gray-400 hover:text-blue-400 hover:bg-gray-600 transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:contact@saimanish.dev"
              className="p-3 bg-gray-700 rounded-full text-gray-400 hover:text-orange-400 hover:bg-gray-600 transition-all"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <Button
            onClick={onPlayAgain}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );
};
