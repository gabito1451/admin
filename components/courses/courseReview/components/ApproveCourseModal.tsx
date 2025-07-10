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

interface ApproveCourseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function ApproveCourseModal({ open, onOpenChange, onConfirm }: ApproveCourseModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="text-center pt-8 pb-6 px-4 sm:px-6 w-[486px] h-[344px] rounded-[11.16px] max-w-full mx-auto">
        <DialogHeader className="flex flex-col items-center gap-2">
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-leadway-orange-light">
              <Image src="/assets/icons/warning-icon.svg" alt="Warning" width={32} height={32} />
            </div>
          </div>
          <DialogTitle className="text-xl sm:text-[22px] font-bold text-academy-orange">
            Approve Course
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-neutrals-11 mt-2">
            Approving this course will make it live.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center items-center gap-4 mt-8 mx-auto w-fit">
          <Button
            onClick={() => onOpenChange(false)}
            className="w-[140px] h-[40px] text-sm font-normal border border-academy-orange rounded-[5.58px] text-academy-orange bg-white hover:bg-gray-100"
            variant="outline"
          >
            No, Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="w-[140px] h-[40px] text-sm font-normal bg-academy-orange hover:bg-academy-orange-light text-white rounded-[5.58px]"
          >
            Yes, Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
