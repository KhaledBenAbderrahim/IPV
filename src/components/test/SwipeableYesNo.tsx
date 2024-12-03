import React, { useState } from 'react';
import { motion, useAnimation, PanInfo } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';
import { useKeyboardSwipe } from '../../hooks/useKeyboardSwipe';

interface SwipeableYesNoProps {
  question: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function SwipeableYesNo({ question, value, onChange }: SwipeableYesNoProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const controls = useAnimation();

  const animateSwipe = async (direction: 'left' | 'right') => {
    const isRight = direction === 'right';
    await controls.start({
      x: isRight ? 500 : -500,
      rotate: isRight ? 45 : -45,
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] }
    });

    onChange(isRight);

    await controls.set({ x: 0, rotate: 0, scale: 1, opacity: 0 });
    await controls.start({ 
      opacity: 1,
      transition: { duration: 0.3 }
    });
  };

  const handleDrag = (event: any, info: PanInfo) => {
    setDragX(info.offset.x);
  };

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    const velocity = Math.abs(info.velocity.x);
    const offset = Math.abs(info.offset.x);

    if (offset > threshold || velocity > 500) {
      const direction = info.offset.x > 0 ? 'right' : 'left';
      await animateSwipe(direction);
    } else {
      controls.start({ 
        x: 0, 
        rotate: 0,
        scale: 1,
        transition: { 
          type: "spring",
          stiffness: 400,
          damping: 30
        }
      });
    }

    setIsDragging(false);
    setDragX(0);
  };

  useKeyboardSwipe({
    onSwipeLeft: () => animateSwipe('left'),
    onSwipeRight: () => animateSwipe('right')
  });

  const rotateValue = (dragX / 500) * 30;
  const scaleValue = 1 - Math.abs(dragX) / 2000;
  const yesOpacity = Math.min(dragX / 100, 1);
  const noOpacity = Math.min(-dragX / 100, 1);

  return (
    <div className="relative w-full max-w-md mx-auto h-[400px] select-none">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-green-100/30 to-transparent rounded-3xl"
          animate={{ 
            opacity: isDragging && dragX > 0 ? 0.6 : 0,
            scale: isDragging && dragX > 0 ? 1.1 : 1
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-tl from-red-100/30 to-transparent rounded-3xl"
          animate={{ 
            opacity: isDragging && dragX < 0 ? 0.6 : 0,
            scale: isDragging && dragX < 0 ? 1.1 : 1
          }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Floating indicators */}
      <motion.div
        className="absolute left-6 top-1/2 -translate-y-1/2"
        animate={{ 
          x: dragX < 0 ? -20 : 0,
          scale: noOpacity + 1,
          opacity: noOpacity 
        }}
      >
        <div className="flex flex-col items-center space-y-2">
          <div className="p-3 bg-red-100 rounded-full">
            <ThumbsDown className="h-8 w-8 text-red-500" />
          </div>
          <span className="text-red-500 font-medium">No</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute right-6 top-1/2 -translate-y-1/2"
        animate={{ 
          x: dragX > 0 ? 20 : 0,
          scale: yesOpacity + 1,
          opacity: yesOpacity 
        }}
      >
        <div className="flex flex-col items-center space-y-2">
          <div className="p-3 bg-green-100 rounded-full">
            <ThumbsUp className="h-8 w-8 text-green-500" />
          </div>
          <span className="text-green-500 font-medium">Yes</span>
        </div>
      </motion.div>

      {/* Card */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDrag={handleDrag}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ 
          rotate: rotateValue,
          scale: scaleValue
        }}
        className="absolute inset-0 bg-white rounded-3xl shadow-lg cursor-grab active:cursor-grabbing overflow-hidden"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-50" />
        
        {/* Card content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-sm text-center space-y-6">
            <motion.div 
              className="inline-flex items-center space-x-2 mb-6"
              animate={{ scale: isDragging ? 1.1 : 1 }}
            >
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium text-gray-500">Swipe to answer</span>
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </motion.div>

            <h3 className="text-2xl font-bold text-gray-800 leading-relaxed">
              {question}
            </h3>
            
            <div className="text-xl font-semibold text-primary/80">
              {value ? 'Yes' : 'No'}
            </div>

            <motion.div 
              className="pt-6 flex justify-center space-x-8 text-gray-400"
              animate={{ opacity: isDragging ? 0.5 : 1 }}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="p-2 bg-gray-100 rounded-full">
                  <ThumbsDown className="w-4 h-4" />
                </div>
                <span className="text-xs">Swipe left</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="p-2 bg-gray-100 rounded-full">
                  <ThumbsUp className="w-4 h-4" />
                </div>
                <span className="text-xs">Swipe right</span>
              </div>
            </motion.div>

            <div className="text-sm text-gray-400 mt-4">
              Or use arrow keys ← →
            </div>
          </div>
        </div>

        {/* Interactive borders */}
        <motion.div
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-400 to-green-500"
          animate={{ opacity: dragX > 0 ? yesOpacity : 0 }}
        />
        <motion.div
          className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-400 to-red-500"
          animate={{ opacity: dragX < 0 ? noOpacity : 0 }}
        />
      </motion.div>
    </div>
  );
}