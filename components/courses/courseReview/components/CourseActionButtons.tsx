import { Button } from '@/components/ui/button';

interface CourseActionButtonsProps {
  onApprove?: () => void;
  onReject?: () => void;
}

export function CourseActionButtons({ onApprove, onReject }: CourseActionButtonsProps) {
  return (
    <div className="flex justify-end gap-3 mt-8">
      <Button variant="destructive" onClick={onReject}>
        Reject Course
      </Button>
      <Button className="bg-green-500 hover:bg-green-600" onClick={onApprove}>
        Approve Course
      </Button>
    </div>
  );
}
