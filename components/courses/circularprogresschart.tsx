import clsx from 'clsx';

interface CircularProgressProps {
  progress: number; // 0 to 100
  size?: number; // Width and height in px
  strokeWidth?: number;
  className?: string;
  color?: string;
  backgroundColor?: string;
}

export const CircularProgress = ({
  progress,
  size = 60,
  strokeWidth = 4,
  className,
  color,
  backgroundColor,
}: CircularProgressProps) => {
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={clsx('inline-block', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform rotate-90">
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
    </div>
  );
};
