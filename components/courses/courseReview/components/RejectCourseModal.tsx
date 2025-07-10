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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { RejectCourseConfirmationModal } from './RejectCourseConfirmationModal';

interface RejectCourseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (reason: string) => void;
  courseTitle: string;
}

export function RejectCourseModal({
  open,
  onOpenChange,
  onConfirm,
  courseTitle,
}: RejectCourseModalProps) {
  const [rejectionReason, setRejectionReason] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirm = () => {
    onOpenChange(false); // Close the reject course modal first
    setShowConfirmation(true); // Then show the confirmation modal
  };

  const handleRejectConfirm = () => {
    onConfirm(rejectionReason);
    setRejectionReason(''); // Clear reason after confirmation
    setShowConfirmation(false); // Close confirmation modal
    onOpenChange(false); // Close reject course modal
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:w-[90vw] lg:w-[762px] h-auto lg:h-[633px] max-h-[90vh] rounded-[12px] sm:rounded-[16px] lg:rounded-[20px] pt-6 sm:pt-8 pb-4 sm:pb-6 px-4 sm:px-6 max-w-none overflow-y-auto">
        <DialogHeader className=" mt-4">
          <DialogTitle className="text-[32px] leading-[4rem] font-semibold text-gray-900 ">
            Reject course
          </DialogTitle>
          <DialogDescription className="text-[16px] leading-[30px] font-normal text-gray-600">
            Add a reason for rejecting this course.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mb-4">
          <div>
            <Label htmlFor="course-title" className="text-neutrals-9 font-medium">
              Course
            </Label>
            <Input
              id="course-title"
              value={courseTitle}
              disabled
              className="mt-1 w-full h-[40px] sm:h-[48px] rounded-[6px] sm:rounded-[8px] border border-gray-300 bg-gray-100 px-[12px] sm:px-[16px] py-[8px] sm:py-[12px] focus:ring-academy-orange focus:border-academy-orange text-sm sm:text-base"
              style={{ gap: '8px' }}
            />
          </div>
          <div>
            <Label htmlFor="rejection-reason" className="text-neutrals-9 font-medium">
              Rejection Reason
            </Label>
            <Textarea
              id="rejection-reason"
              placeholder="Course isn't granular enough. Add more lessons."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="mt-2 w-full h-[128px] rounded-[8px] border border-gray-300 px-[14px] py-[10px] resize-none focus:outline-none focus:ring-0 focus:border-gray-300"
            />
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row justify-start w-full gap-3 sm:gap-4 mt-6 sm:mt-8">
          <Button
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto sm:min-w-[160px] lg:w-[340px] h-[44px] sm:h-[52px] text-sm font-normal border border-academy-orange text-academy-orange bg-white hover:bg-gray-100 rounded-[6px] sm:rounded-[8px] order-2 sm:order-1"
            variant="outline"
          >
            No, Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="w-full sm:w-auto sm:min-w-[160px] lg:w-[340px] h-[44px] sm:h-[52px] text-sm font-normal bg-academy-orange hover:bg-academy-orange-light text-white rounded-[6px] sm:rounded-[8px] order-1 sm:order-2"
          >
            Yes, Reject
          </Button>
        </DialogFooter>
      </DialogContent>
      <RejectCourseConfirmationModal
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        onConfirm={handleRejectConfirm}
      />
    </Dialog>
  );
}
