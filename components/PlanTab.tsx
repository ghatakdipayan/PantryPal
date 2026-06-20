import React from 'react';
import type { WeeklyPlan, Recipe } from '../types';

interface PlanTabProps {
  weeklyPlan: WeeklyPlan;
  recipes: Recipe[];
  onSelectSlot: (day: string, slot: 'Lunch' | 'Dinner') => void;
  onSelectRecipe: (recipeName: string) => void;
}

export const PlanTab: React.FC<PlanTabProps> = ({
  weeklyPlan,
  recipes,
  onSelectSlot,
  onSelectRecipe,
}) => {
  const dows = [
    { dow: 'Mon', date: '17' },
    { dow: 'Tue', date: '18' },
    { dow: 'Wed', date: '19' },
    { dow: 'Thu', date: '20' }, // Thursday is marked as Today in the design
    { dow: 'Fri', date: '21' },
    { dow: 'Sat', date: '22' },
    { dow: 'Sun', date: '23' },
  ];

  const todayKey = 'Thu';

  return (
    <div className="p-[6px_22px_120px] animate-fade-in flex flex-col min-h-0">
      {/* Header */}
      <div className="pt-2">
        <h1 className="font-head text-[28px] font-bold tracking-[-0.4px] text-[var(--text,#15201a)]">
          This week
        </h1>
        <p className="text-[14.5px] text-[var(--muted,#717c75)] mt-[3px]">
          Tap a slot to plan from what you have
        </p>
      </div>

      {/* Week Grid */}
      <div className="mt-5 flex flex-col gap-[13px]">
        {dows.map(({ dow, date }) => {
          const isToday = dow === todayKey;
          const dayPlan = weeklyPlan[dow] || { Lunch: null, Dinner: null };

          return (
            <div
              key={dow}
              style={{
                borderColor: isToday ? 'var(--accent,#15a85b)' : 'var(--line,#eceeea)',
                backgroundColor: isToday ? 'var(--accent-soft,#e6f4ec)' : 'var(--surface,#fff)',
              }}
              className="border border-solid rounded-[var(--r,22px)] p-[15px_16px] flex flex-col shadow-sm"
            >
              {/* Day info */}
              <div className="flex items-center gap-[9px] mb-[11px]">
                <div
                  style={{
                    backgroundColor: isToday ? 'var(--accent,#15a85b)' : 'var(--surface-2,#f5f8f4)',
                    color: isToday ? '#fff' : 'var(--text,#15201a)',
                  }}
                  className="w-[42px] h-[42px] flex-none rounded-[12px] flex flex-col items-center justify-center"
                >
                  <span className="text-[10.5px] font-bold tracking-[0.5px] uppercase leading-none mb-0.5">
                    {dow}
                  </span>
                  <span className="text-[18px] font-extrabold leading-tight">{date}</span>
                </div>
                {isToday && (
                  <span className="text-[12px] font-bold text-[var(--accent,#15a85b)] bg-[var(--accent-soft,#e6f4ec)] px-2.5 py-1 rounded-full border border-[var(--accent,#15a85b)]/20 shadow-sm">
                    Today
                  </span>
                )}
              </div>

              {/* Slots */}
              <div className="flex flex-col gap-2">
                {(['Lunch', 'Dinner'] as const).map((slot) => {
                  const recipeName = dayPlan[slot];
                  const recipe = recipeName && recipes.find(r => r.recipeName === recipeName);

                  return (
                    <button
                      key={slot}
                      onClick={() => {
                        if (recipe) {
                          onSelectRecipe(recipeName);
                        } else {
                          onSelectSlot(dow, slot);
                        }
                      }}
                      style={{
                        borderColor: recipe ? 'var(--line,#eceeea)' : 'transparent',
                        backgroundColor: recipe ? 'var(--surface,#fff)' : 'var(--surface-2,#f5f8f4)',
                      }}
                      className="text-left cursor-pointer w-full flex items-center gap-[11px] p-[9px_11px] rounded-[13px] border border-solid hover:opacity-90 active:scale-[0.99] transition-all"
                    >
                      <span className="text-[11px] font-bold tracking-[0.5px] uppercase text-[var(--muted,#717c75)] w-[42px] flex-none">
                        {slot}
                      </span>
                      {recipe ? (
                        <>
                          <span className="flex-1 text-[15px] font-bold text-[var(--text,#15201a)] truncate">
                            {recipeName}
                          </span>
                          <span className="material-symbols-outlined text-[18px] text-[var(--accent,#15a85b)] flex-none">
                            restaurant
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="flex-1 text-[14.5px] text-[var(--muted,#717c75)]">Add a meal</span>
                          <span className="material-symbols-outlined text-[19px] text-[var(--muted,#717c75)] flex-none">
                            add
                          </span>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
