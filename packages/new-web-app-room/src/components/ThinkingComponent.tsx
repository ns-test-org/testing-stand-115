'use client';

import { useEffect, useState } from 'react';

interface ThinkingStep {
  id: number;
  text: string;
  duration: number;
}

const thinkingSteps: ThinkingStep[] = [
  { id: 1, text: 'Analyzing your request...', duration: 1200 },
  { id: 2, text: 'Processing context and patterns...', duration: 1500 },
  { id: 3, text: 'Evaluating multiple approaches...', duration: 1800 },
  { id: 4, text: 'Synthesizing optimal solution...', duration: 1400 },
  { id: 5, text: 'Finalizing response...', duration: 1000 },
];

interface ThinkingComponentProps {
  onComplete?: () => void;
  className?: string;
}

export default function ThinkingComponent({ onComplete, className = '' }: ThinkingComponentProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [dots, setDots] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  // Animate dots
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);

    return () => clearInterval(dotsInterval);
  }, []);

  // Progress through thinking steps
  useEffect(() => {
    if (currentStep >= thinkingSteps.length) {
      setIsComplete(true);
      if (onComplete) {
        setTimeout(onComplete, 500);
      }
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, thinkingSteps[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  if (isComplete) {
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      {/* Container with grok-like styling */}
      <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/90 to-black/90 p-6 backdrop-blur-xl shadow-2xl">
        {/* Animated border shimmer */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-shimmer bg-[length:200%_100%] opacity-50" />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              {/* Pulsing orb */}
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse" />
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-ping opacity-75" />
            </div>
            <span className="text-sm font-medium text-white/90">Thinking</span>
          </div>

          {/* Thinking steps */}
          <div className="space-y-3">
            {thinkingSteps.slice(0, currentStep + 1).map((step, index) => (
              <div
                key={step.id}
                className={`flex items-start gap-3 transition-all duration-500 ${
                  index === currentStep
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-60 translate-x-0'
                }`}
              >
                {/* Step indicator */}
                <div className="mt-1.5">
                  {index === currentStep ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  )}
                </div>

                {/* Step text */}
                <div className="flex-1">
                  <p className="text-sm text-white/80">
                    {step.text}
                    {index === currentStep && (
                      <span className="inline-block w-8 text-left">{dots}</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out"
              style={{
                width: `${((currentStep + 1) / thinkingSteps.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse" />
      </div>
    </div>
  );
}

