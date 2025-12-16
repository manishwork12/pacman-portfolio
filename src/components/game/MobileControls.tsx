import { useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Direction } from '@/hooks/useGameState';
import { cn } from '@/lib/utils';

interface MobileControlsProps {
  onMove: (direction: Direction) => void;
}

export const MobileControls = ({ onMove }: MobileControlsProps) => {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      const minSwipeDistance = 30;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > minSwipeDistance) {
          onMove(deltaX > 0 ? 'right' : 'left');
        }
      } else {
        if (Math.abs(deltaY) > minSwipeDistance) {
          onMove(deltaY > 0 ? 'down' : 'up');
        }
      }
      
      touchStartRef.current = null;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onMove]);

  const buttonClass = cn(
    "w-14 h-14 rounded-xl flex items-center justify-center",
    "bg-blue-600/80 hover:bg-blue-500 active:bg-blue-400",
    "text-white shadow-lg active:scale-95 transition-all",
    "border-2 border-blue-400/50"
  );

  return (
    <div className="md:hidden mt-6 select-none">
      <p className="text-center text-gray-500 text-xs mb-3">Tap buttons or swipe to move</p>
      <div className="grid grid-cols-3 gap-2 w-fit mx-auto">
        {/* Top row - Up button */}
        <div />
        <button
          className={buttonClass}
          onClick={() => onMove('up')}
          aria-label="Move up"
        >
          <ChevronUp className="w-8 h-8" />
        </button>
        <div />
        
        {/* Middle row - Left and Right */}
        <button
          className={buttonClass}
          onClick={() => onMove('left')}
          aria-label="Move left"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <div />
        <button
          className={buttonClass}
          onClick={() => onMove('right')}
          aria-label="Move right"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
        
        {/* Bottom row - Down button */}
        <div />
        <button
          className={buttonClass}
          onClick={() => onMove('down')}
          aria-label="Move down"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
        <div />
      </div>
    </div>
  );
};
