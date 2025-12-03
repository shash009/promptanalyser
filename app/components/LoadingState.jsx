'use client';

import { useEffect, useState } from 'react';

export default function LoadingState() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: 'Validating brand...', icon: '🔍' },
    { label: 'Querying ChatGPT...', icon: '🤖' },
    { label: 'Querying Gemini...', icon: '💎' },
    { label: 'Querying Perplexity...', icon: '🔮' },
    { label: 'Calculating scores...', icon: '📊' }
  ];

  useEffect(() => {
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 150);

    // Update steps
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
    }, 3500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6">
      <div className="bg-gray-900/50 border border-purple-500/30 rounded-2xl p-10 backdrop-blur-sm shadow-xl">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Analyzing Brand Visibility
          </h2>
          <p className="text-gray-400">
            This may take a minute...
          </p>
        </div>

        {/* Animated spinner */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-700 rounded-full"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-cyan-500 border-r-purple-500 rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            >
              <div className="h-full w-full bg-gradient-to-r from-transparent to-white/30 animate-pulse"></div>
            </div>
          </div>
          <div className="text-center mt-2 text-sm text-gray-400">
            {progress}%
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                index === currentStep
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50'
                  : index < currentStep
                  ? 'bg-gray-800/50 border border-gray-700'
                  : 'bg-gray-800/30 border border-gray-800'
              }`}
            >
              <span className="text-2xl">{step.icon}</span>
              <span
                className={`flex-1 font-medium ${
                  index === currentStep
                    ? 'text-cyan-300'
                    : index < currentStep
                    ? 'text-gray-400'
                    : 'text-gray-600'
                }`}
              >
                {step.label}
              </span>
              {index < currentStep && (
                <span className="text-emerald-400">✓</span>
              )}
              {index === currentStep && (
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
