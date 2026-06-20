import React, { useState } from 'react';
import type { Recipe } from '../types';

interface CookModeProps {
  recipe: Recipe;
  onClose: () => void;
  toast: (msg: string) => void;
}

export const CookMode: React.FC<CookModeProps> = ({ recipe, onClose, toast }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = recipe.instructions;
  const total = steps.length;
  const rawStep = steps[currentStep] || '';
  
  // Parse instructions and timers (split on '|')
  const parts = rawStep.split('|');
  const stepText = parts[0];
  const hasTimer = parts.length > 1;
  const timerText = parts[1] || '';

  const pct = Math.round(((currentStep + 1) / total) * 100) + '%';
  const bigStepNum = String(currentStep + 1).padStart(2, '0');

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < total - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
      toast('Nice work — enjoy your meal! 🍳');
    }
  };

  return (
    <div
      onClick={onClose}
      className="absolute inset-0 z-30 bg-transparent lg:bg-black/40 flex items-center justify-center animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-full lg:max-w-xl lg:h-[85%] lg:rounded-[26px] lg:shadow-2xl bg-[var(--bg,#fff)] flex flex-col justify-between"
      >
        {/* Top Header */}
        <div className="p-[14px_22px_0] flex items-center justify-between flex-none">
          <button
            onClick={onClose}
            className="w-[42px] h-[42px] rounded-full border border-[var(--line,#eceeea)] bg-[var(--surface,#fff)] cursor-pointer flex items-center justify-center active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '22px', color: 'var(--text,#15201a)' }}>
              close
            </span>
          </button>
          <span className="text-[14.5px] font-bold truncate max-w-[200px] text-[var(--text,#15201a)]">
            {recipe.recipeName}
          </span>
          <div className="w-[42px]" />
        </div>

        {/* Progress Section */}
        <div className="p-[18px_22px_0] flex-none">
          <div className="flex justify-between text-[13px] font-bold text-[var(--muted,#717c75)] mb-2">
            <span>Step {currentStep + 1} of {total}</span>
            <span>{pct}</span>
          </div>
          <div className="h-[6px] rounded-full bg-[var(--surface-2,#f5f8f4)] overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--accent,#15a85b)] transition-all duration-350"
              style={{ width: pct }}
            />
          </div>
        </div>

        {/* Big Step Number and Content Area */}
        <div className="flex-1 min-h-0 flex flex-col justify-center px-[30px] py-[18px] animate-pop-in">
          <div className="font-head text-[64px] font-extrabold text-[var(--accent-soft,#e6f4ec)] leading-none mb-4">
            {bigStepNum}
          </div>

          {/* Timer UI if applicable */}
          {hasTimer && (
            <div className="mb-4 inline-flex align-self-start items-center gap-[8px] bg-[var(--accent-soft,#e6f4ec)] text-[var(--accent-ink,#0d7a41)] p-[9px_16px] rounded-full font-bold text-[15px] self-start">
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                timer
              </span>
              {timerText}
            </div>
          )}

          <p className="text-[24px] leading-[1.42] font-semibold text-[var(--text,#15201a)] tracking-[-0.2px]">
            {stepText}
          </p>
        </div>

        {/* Navigation Footer */}
        <div className="p-[16px_22px_30px] flex gap-3 flex-none bg-[var(--bg,#fff)]">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            style={{ opacity: currentStep === 0 ? 0.4 : 1 }}
            className="w-[58px] h-[58px] flex-none rounded-full border border-[var(--line,#eceeea)] bg-[var(--surface,#fff)] cursor-pointer flex items-center justify-center active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--text,#15201a)' }}>
              arrow_back
            </span>
          </button>

          {/* Next/Finish Button */}
          <button
            onClick={handleNext}
            className="flex-1 h-[58px] border-none rounded-full bg-[var(--accent,#15a85b)] text-white font-bold text-[17px] cursor-pointer flex items-center justify-center gap-[8px] hover:opacity-90 active:scale-[0.98] transition-all shadow-[0_4px_14px_rgba(21,168,91,0.2)]"
          >
            {currentStep === total - 1 ? 'Finish' : 'Next step'}
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
              {currentStep === total - 1 ? 'check' : 'arrow_forward'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
