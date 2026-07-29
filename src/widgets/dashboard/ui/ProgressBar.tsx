import type { FC } from 'react';

type ProgressBarProps = {
  isOverBudget: boolean;
  percentage: number;
};

const ProgressBar: FC<ProgressBarProps> = ({ percentage, isOverBudget }) => {
  let barColor = 'var(--success)';
  if (isOverBudget) {
    barColor = 'var(--destructive)';
  } else if (percentage >= 80) {
    barColor = 'var(--warning)';
  }

  return (
    <div className="mt-4 space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Progress</span>
        <span className="font-medium">{percentage.toFixed(0)}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${Math.min(percentage, 100)}%`,
            backgroundColor: barColor,
          }}
        />
      </div>
      {isOverBudget && <p className="text-xs text-destructive">You have exceeded your budget!</p>}
    </div>
  );
};

export { ProgressBar };
