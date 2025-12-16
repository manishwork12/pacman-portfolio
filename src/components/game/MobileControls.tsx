import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Direction } from '@/hooks/useGameState';

interface MobileControlsProps {
  onMove: (direction: Direction) => void;
}

export const MobileControls = ({ onMove }: MobileControlsProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 w-40 mx-auto mt-4 md:hidden">
      <div />
      <button
        className="bg-blue-600 hover:bg-blue-500 active:bg-blue-400 p-4 rounded-lg touch-manipulation"
        onClick={() => onMove('up')}
      >
        <ChevronUp className="w-6 h-6 mx-auto text-white" />
      </button>
      <div />
      <button
        className="bg-blue-600 hover:bg-blue-500 active:bg-blue-400 p-4 rounded-lg touch-manipulation"
        onClick={() => onMove('left')}
      >
        <ChevronLeft className="w-6 h-6 mx-auto text-white" />
      </button>
      <div className="bg-gray-700 rounded-lg" />
      <button
        className="bg-blue-600 hover:bg-blue-500 active:bg-blue-400 p-4 rounded-lg touch-manipulation"
        onClick={() => onMove('right')}
      >
        <ChevronRight className="w-6 h-6 mx-auto text-white" />
      </button>
      <div />
      <button
        className="bg-blue-600 hover:bg-blue-500 active:bg-blue-400 p-4 rounded-lg touch-manipulation"
        onClick={() => onMove('down')}
      >
        <ChevronDown className="w-6 h-6 mx-auto text-white" />
      </button>
      <div />
    </div>
  );
};
