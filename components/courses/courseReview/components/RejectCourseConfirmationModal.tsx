'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface RejectCourseConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function RejectCourseConfirmationModal({
  open,
  onOpenChange,
  onConfirm,
}: RejectCourseConfirmationModalProps) {
  const router = useRouter();

  const handleConfirm = () => {
    onConfirm();
    router.push('/dashboard/courses?tab=rejected');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="text-center w-full sm:w-[400px] h-auto sm:h-[290px] rounded-[12px] pt-6 sm:pt-[34px] px-4 sm:px-[24px] pb-6 sm:pb-[24px] mx-auto">
        <DialogHeader className="flex flex-col items-center gap-2">
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-green-100">
              <Image src="/assets/icons/success-icon.svg" alt="Success" width={32} height={32} />
            </div>
          </div>
          <DialogTitle className="text-[20px] font-semibold text-neutrals-11">
            Course rejected successfully!
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm text-gray-600">
            You have successfully rejected this course.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          <Button
            onClick={handleConfirm}
            className="w-full sm:w-[352px] h-[44px] rounded-md bg-academy-orange text-white hover:bg-academy-orange-light"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
