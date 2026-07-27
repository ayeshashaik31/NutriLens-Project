import { useLocation, useNavigate } from "react-router-dom";
import {
  Flame,
  Beef,
  Wheat,
  Droplets,
  Brain,
  RefreshCcw,
  Target,
  Heart,
  Dumbbell,
  PersonStanding,
  Info,
} from "lucide-react";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state;

  if (!result) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#0b0f19] px-4 text-white">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 ring-1 ring-slate-800">
            <Info className="h-7 w-7 text-slate-500" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            No result found
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Analyze a meal to see your nutrition breakdown.
          </p>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-6 rounded-xl bg-[#ccff00] px-6 py-3 font-bold text-slate-950 transition hover:bg-[#b3e600]"
          >
            Go Back
          </button>
        </div>
      </main>
    );
  }

  const { nutrition, imageUrl, disclaimer } = result;

  const rawHealthScore = Number(nutrition.healthScore) || 0;

  const healthScore = Math.min(
    100,
    Math.max(
      0,
      rawHealthScore <= 10
        ? Math.round(rawHealthScore * 10)
        : Math.round(rawHealthScore)
    )
  );

  const nutritionCards = [
    {
      label: "Calories",
      value: `${nutrition.estimatedCalories} kcal`,
      icon: Flame,
    },
    {
      label: "Protein",
      value: `${nutrition.protein} g`,
      icon: Beef,
    },
    {
      label: "Carbs",
      value: `${nutrition.carbs} g`,
      icon: Wheat,
    },
    {
      label: "Fat",
      value: `${nutrition.fat} g`,
      icon: Droplets,
    },
  ];

  const bestForIcons = [PersonStanding, Dumbbell, Heart];

  const MealCard = () => (
    <section className="overflow-hidden rounded-lg border border-slate-800 bg-[#121826] shadow-lg shadow-black/30 sm:rounded-2xl">
      <div className="relative">
        <img
          src={imageUrl}
          alt={nutrition.mealName || "Analyzed meal"}
          className="h-24 w-full object-cover sm:h-64"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#121826] via-transparent to-transparent" />
      </div>

      <div className="p-2 sm:p-5">
        <h1 className="text-[11px] font-bold leading-tight tracking-tight text-white sm:text-xl">
          {nutrition.mealName}
        </h1>

      </div>
    </section>
  );

  const BestForCard = () => (
    <section className="rounded-lg border border-slate-800 bg-[#121826] p-2 shadow-lg shadow-black/30 sm:rounded-2xl sm:p-5">
      <h2 className="mb-1.5 text-[8px] font-semibold uppercase tracking-wider text-slate-400 sm:mb-4 sm:text-xs">
        Best For
      </h2>

      <div className="flex flex-col gap-1.5 sm:gap-2.5">
        {nutrition.bestFor?.length > 0 ? (
          nutrition.bestFor.map((item, index) => {
            const Icon = bestForIcons[index % bestForIcons.length];

            return (
              <div
                key={item}
                className="flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900/50 p-1.5 transition hover:border-[#ccff00]/30 hover:bg-slate-900 sm:gap-3 sm:rounded-xl sm:p-3"
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[#ccff00]/10 sm:h-8 sm:w-8 sm:rounded-lg">
                  <Icon className="h-2.5 w-2.5 text-[#ccff00] sm:h-4 sm:w-4" />
                </span>

                <span className="truncate text-[9px] font-semibold text-white sm:text-sm">
                  {item}
                </span>
              </div>
            );
          })
        ) : (
          <p className="text-[9px] text-slate-400 sm:text-xs">
            General balanced nutrition
          </p>
        )}
      </div>
    </section>
  );

  const AnalyzeButton = () => (
    <button
      type="button"
      onClick={() => navigate("/")}
      className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#ccff00] px-2 py-2 text-[9px] font-semibold text-slate-950 transition hover:bg-[#b3e600] hover:shadow-lg hover:shadow-[#ccff00]/20 sm:rounded-xl sm:px-4 sm:py-3.5 sm:text-sm"
    >
      <RefreshCcw className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
      ANALYZE ANOTHER
    </button>
  );

  const HealthScoreCard = () => (
    <section className="rounded-lg border border-slate-800 bg-[#121826] p-2 shadow-lg shadow-black/30 sm:rounded-2xl sm:p-6">
      <div className="mb-1.5 flex items-start justify-between sm:mb-3">
        <span className="text-[8px] uppercase tracking-wider text-slate-400 sm:text-xs">
          Health Score
        </span>

        <span className="flex h-4 w-4 items-center justify-center rounded bg-[#ccff00]/10 sm:h-8 sm:w-8 sm:rounded-lg">
          <Target className="h-2.5 w-2.5 text-[#ccff00] sm:h-4 sm:w-4" />
        </span>
      </div>

      <div className="mb-2 flex items-baseline gap-1 sm:mb-4 sm:gap-2">
        <span className="text-xl font-bold text-[#ccff00] sm:text-5xl">
          {healthScore}
        </span>

        <span className="text-[9px] text-slate-400 sm:text-sm">
          / 100
        </span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800 sm:h-2.5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#ccff00] to-[#a3d900] transition-all duration-700 ease-out"
          style={{ width: `${healthScore}%` }}
        />
      </div>
    </section>
  );

  const NutritionCard = () => (
    <section className="rounded-lg border border-slate-800 bg-[#121826] p-2 shadow-lg shadow-black/30 sm:rounded-2xl sm:p-6">
      <span className="mb-1.5 block text-[8px] uppercase tracking-wider text-slate-400 sm:mb-4 sm:text-xs">
        Estimated Nutrition
      </span>

      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 sm:gap-4">
        {nutritionCards.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.label}
              className="rounded-md border border-slate-800 bg-slate-900/50 p-1.5 text-center transition hover:border-[#ccff00]/30 hover:bg-slate-900 sm:rounded-xl sm:p-4"
            >
              <span className="mx-auto mb-1 flex h-5 w-5 items-center justify-center rounded bg-[#ccff00]/10 sm:h-9 sm:w-9 sm:rounded-lg">
                <Icon className="h-2.5 w-2.5 text-[#ccff00] sm:h-4 sm:w-4" />
              </span>

              <p className="text-[8px] text-slate-400 sm:text-xs">
                {item.label}
              </p>

              <p className="mt-0.5 text-[10px] font-bold leading-tight text-white sm:mt-1 sm:text-base">
                {item.value}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );

  const AICoachCard = () => (
    <article className="h-full rounded-lg border border-slate-800 bg-[#121826] p-2 shadow-lg shadow-black/30 sm:rounded-2xl sm:p-5">
      <div className="mb-1.5 flex items-center gap-1.5 sm:mb-3 sm:gap-2.5">
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[#ccff00]/10 sm:h-8 sm:w-8 sm:rounded-lg">
          <Brain className="h-2.5 w-2.5 text-[#ccff00] sm:h-4 sm:w-4" />
        </span>

        <h2 className="text-[9px] font-semibold text-white sm:text-sm">
          AI Coach
        </h2>
      </div>

      <p className="text-[8px] leading-snug text-slate-400 sm:text-xs sm:leading-relaxed">
        {nutrition.coachAdvice}
      </p>
    </article>
  );

  const HealthySwapCard = () => (
    <article className="rounded-lg border border-slate-800 bg-[#121826] p-2 shadow-lg shadow-black/30 sm:rounded-2xl sm:p-5">
      <div className="mb-1.5 flex items-center gap-1.5 sm:mb-3 sm:gap-2.5">
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[#ccff00]/10 sm:h-8 sm:w-8 sm:rounded-lg">
          <RefreshCcw className="h-2.5 w-2.5 text-[#ccff00] sm:h-4 sm:w-4" />
        </span>

        <h2 className="text-[9px] font-semibold text-white sm:text-sm">
          Healthy Swap
        </h2>
      </div>

      <p className="text-[8px] leading-snug text-slate-400 sm:text-xs sm:leading-relaxed">
        {nutrition.healthySwap}
      </p>
    </article>
  );

  return (
    <main className="w-full overflow-x-hidden bg-[#0b0f19] px-2 py-3 text-white min-h-dvh sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-3 text-center sm:mb-8">
          <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#ccff00] sm:text-xs sm:tracking-[0.3em]">
            ✨ AI Meal Analysis ✨
          </p>

          <div className="mx-auto mt-2 h-px w-16 bg-gradient-to-r from-transparent via-slate-700 to-transparent sm:mt-3 sm:w-24" />
        </header>

        {/* MOBILE + TABLET LAYOUT */}
        <div className="grid grid-cols-2 items-start gap-2 lg:hidden">
          <div className="flex min-w-0 flex-col gap-2">
            <MealCard />
            <BestForCard />
            <AnalyzeButton />
          </div>

          <div className="flex min-w-0 flex-col gap-2">
            <HealthScoreCard />
            <NutritionCard />
          </div>

           <div className="col-span-2">
           <AICoachCard />
           </div>

          <div className="col-span-2">
            <HealthySwapCard />
          </div>
        </div>

        {/* DESKTOP LAYOUT — ORIGINAL DESIGN */}
        <div className="hidden grid-cols-12 items-start gap-6 lg:grid">
          <div className="col-span-5 flex h-fit flex-col gap-6">
            <MealCard />
            <BestForCard />
            <AnalyzeButton />
          </div>

          <div className="col-span-7 flex flex-col gap-6">
            <HealthScoreCard />
            <NutritionCard />

            <div className="grid grid-cols-2 gap-6">
              <AICoachCard />
              <HealthySwapCard />
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center gap-1.5 border-t border-slate-800/50 pt-2 text-center text-[8px] text-slate-500 sm:mt-6 sm:gap-2 sm:pt-5 sm:text-xs">
          <Info className="h-2.5 w-2.5 shrink-0 sm:h-4 sm:w-4" />
          <p className="max-w-2xl">{disclaimer}</p>
        </div>
      </div>
    </main>
  );
}

export default Result;