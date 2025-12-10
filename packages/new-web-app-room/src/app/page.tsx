'use client';

import { useEffect, useState } from 'react';
import ShimmerText from '@/components/ShimmerText';
import ThinkingComponent from '@/components/ThinkingComponent';

const slogans = [
  "Turn chats into apps",
  "Prompt. Ship. Repeat.",
  "Build anything from a chat",
  "Ideas → Apps, instantly",
  "From zero to MVP in minutes",
  "Your cofounder in the command line",
  "Draft, iterate, deploy",
  "Ship faster than you can type",
  "Design in text, deliver in code",
  "Dream it. Prompt it. Run it.",
  "Chat-native app building",
  "From prompt to product",
  "One prompt, infinite apps",
  "Stop scaffolding. Start shipping.",
  "Prototype at the speed of thought",
  "Make conversations executable"
];

export default function Landing() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showThinking, setShowThinking] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % slogans.length);
        setIsVisible(true);
      }, 400);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const handleStartThinking = () => {
    setShowThinking(true);
    setShowResult(false);
  };

  const handleThinkingComplete = () => {
    setShowThinking(false);
    setShowResult(true);
  };

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-black text-white">
      {/* Enhanced animated aurora background layers */}
      <div className="absolute inset-0 bg-aurora-layer-1" />
      <div className="absolute inset-0 bg-aurora-layer-2" />
      <div className="absolute inset-0 bg-aurora-layer-3" />
      
      {/* Floating particles overlay */}
      <div className="absolute inset-0 bg-particles" />
      
      {/* Main content - centered */}
      <main className="relative z-10 h-full flex flex-col items-center justify-center px-6 gap-8">
        <div className="text-center">
          <h1 className="text-center text-[clamp(28px,6vw,64px)] font-medium tracking-tight mb-4">
            Turn Chats into Apps
          </h1>
          
          {/* Rotating slogans */}
          <div className="mt-4 h-8 md:h-10 overflow-hidden flex items-center justify-center">
            <span
              className={`inline-block text-center text-[clamp(18px,3vw,32px)] font-light transition-all duration-[400ms] ease-in-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
              }`}
            >
              {slogans[currentIndex]}
            </span>
          </div>
        </div>

        {/* Demo Section */}
        <div className="w-full max-w-2xl space-y-6">
          {/* Shimmer Text Demo */}
          <div className="text-center">
            <ShimmerText 
              text="✨ Grok-like Shimmer Effect ✨" 
              className="text-2xl md:text-4xl font-bold"
            />
          </div>

          {/* Button to trigger thinking */}
          {!showThinking && !showResult && (
            <div className="flex justify-center">
              <button
                onClick={handleStartThinking}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Start Thinking Demo
              </button>
            </div>
          )}

          {/* Thinking Component */}
          {showThinking && (
            <ThinkingComponent 
              onComplete={handleThinkingComplete}
              className="w-full"
            />
          )}

          {/* Result after thinking */}
          {showResult && (
            <div className="text-center space-y-4 animate-fade-in">
              <div className="p-6 rounded-2xl border border-green-500/30 bg-green-500/10">
                <p className="text-lg text-green-400 font-medium">
                  ✓ Thinking complete! Ready to build amazing things.
                </p>
              </div>
              <button
                onClick={handleStartThinking}
                className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                Run again
              </button>
            </div>
          )}
        </div>
      </main>
      
      {/* Start Prompting arrow pointing left - bottom left */}
      <div className="absolute left-6 md:left-8 bottom-[5%] z-20 flex items-center gap-3 arrow-point-left">
        <div className="flex items-center gap-2 text-white/80 font-medium text-sm md:text-base">
          <svg 
            className="w-5 h-5 md:w-6 md:h-6 animate-bounce-horizontal" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Start prompting</span>
        </div>
      </div>
    </div>
  );
}

