import React from 'react';

interface OnboardingProps {
  onFinish: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onFinish }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const slides = [
    {
      kicker: 'Cook smarter',
      icon: 'skillet',
      title: 'Dinner from what you already have',
      body: 'Mise turns the food in your kitchen into recipes you can actually make tonight.',
      cta: 'Next',
    },
    {
      kicker: 'No more typing',
      icon: 'add_a_photo',
      title: 'Stock your pantry in seconds',
      body: 'Scan a receipt, connect Instamart, Blinkit or Zepto, or just snap your fridge — we add everything for you.',
      cta: 'Next',
    },
    {
      kicker: 'Waste nothing',
      icon: 'eco',
      title: 'Plan the week, use it all up',
      body: 'Smart suggestions nudge you toward what’s about to expire, so good food never goes to waste.',
      cta: 'Get cooking',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onFinish();
    }
  };

  const slide = slides[currentSlide];

  return (
    <div className="ppl-scroll flex flex-col h-full overflow-hidden justify-between animate-fade-in">
      {/* Skip button header */}
      <div className="px-[26px] pb-3.5 flex justify-end">
        <button
          onClick={onFinish}
          className="bg-none border-none text-[var(--muted,#717c75)] font-semibold text-[15px] cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* Main Slide Illustration and Texts */}
      <div className="flex-1 flex flex-col px-[30px] pt-2 overflow-hidden justify-center">
        <div className="flex-1 min-h-0 flex items-center justify-center">
          <div className="w-full aspect-square max-h-[300px] rounded-[30px] bg-[var(--accent-soft,#e6f4ec)] relative overflow-hidden flex items-center justify-center">
            {/* Grid background */}
            <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 22px, rgba(21,168,91,0.05) 22px 23px)' }} />
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: '118px',
                color: 'var(--accent,#15a85b)',
                fontVariationSettings: "'wght' 300, 'opsz' 48",
              }}
            >
              {slide.icon}
            </span>
            <div className="absolute bottom-[18px] right-5 font-mono text-[10px] tracking-[0.5px] text-[var(--accent-ink,#0d7a41)] opacity-50">
              illustration
            </div>
          </div>
        </div>

        {/* Text descriptions */}
        <div className="pt-8">
          <div className="text-[13px] font-bold tracking-[1.5px] uppercase text-[var(--accent,#15a85b)] mb-3.5">
            {slide.kicker}
          </div>
          <h1 className="font-head text-[33px] leading-[1.08] font-bold tracking-[-0.5px] mb-3.5 text-[var(--text,#15201a)]">
            {slide.title}
          </h1>
          <p className="text-[16.5px] leading-[1.5] text-[var(--muted,#717c75)] max-w-[300px]">
            {slide.body}
          </p>
        </div>
      </div>

      {/* Actions footer */}
      <div className="p-[28px_30px_38px]">
        {/* Pagination Dots */}
        <div className="flex gap-[7px] justify-center mb-[26px]">
          {slides.map((_, i) => (
            <div
              key={i}
              className="h-[7px] rounded-full transition-all duration-300"
              style={{
                width: i === currentSlide ? '22px' : '7px',
                backgroundColor: i === currentSlide ? 'var(--accent,#15a85b)' : 'var(--line,#eceeea)',
              }}
            />
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={handleNext}
          className="w-full h-[58px] border-none rounded-full bg-[var(--accent,#15a85b)] text-white font-bold text-[17px] cursor-pointer flex items-center justify-center gap-2 shadow-[0_10px_24px_-8px_var(--accent,#15a85b)] hover:opacity-90 active:scale-[0.98] transition-all"
        >
          {slide.cta}
          <span className="material-symbols-outlined" style={{ fontSize: '21px' }}>
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
};
