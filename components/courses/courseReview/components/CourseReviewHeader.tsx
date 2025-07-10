import { CircularProgress } from "../../circularprogresschart"

interface CourseReviewHeaderProps {
  title: string
  progress: number
  status: string
  statusColor?: string
  creator: string
  date: string
}

export function CourseReviewHeader({
  title,
  progress,
  status,
  statusColor = "text-orange-600",
  creator,
  date,
}: CourseReviewHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4">
      <h1 className="text-[32px] text-gray-900 mb-3 font-normal">{title}</h1>
      <div className="flex items-center gap-2 mb-4">
        <CircularProgress
          progress={progress}
          size={20}
          strokeWidth={3}
          color="#FF8000"
          backgroundColor="rgba(255, 149, 0, 0.5)"
        />
        <span className={`${statusColor} text-base font-medium`}>{status}</span>
      </div>
      <p className="text-gray-600 text-base font-bold">
        Created by {creator} on {date}
      </p>
    </div>
  )
}