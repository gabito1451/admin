'use client';

import { useInviteFlowStore } from '@/features/instructor/store/instructor-store';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';

const InviteSuccessModal = () => {
  const { showSuccess, inviteeFirstName, inviteeLastName, inviteId, closeModals } =
    useInviteFlowStore();

  return (
    <Dialog open={showSuccess} onOpenChange={closeModals}>
      <DialogContent
        className="
        fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] gap-4 
        border border-gray-200/50 bg-white/95 backdrop-blur-md shadow-2xl 
        rounded-2xl text-center
        
        // Modern entrance animations
        animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-300
        data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom-4
        
        // Modern exit animations
        data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-bottom-4
        
        // Responsive sizing - improved for small screens
        w-[90vw] sm:w-full max-w-[400px]
        max-h-[90vh] overflow-y-auto
        mx-4 sm:mx-0
        p-4 sm:p-6
      "
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Invitation Success</DialogTitle>
        </DialogHeader>

        <div className="flex justify-center animate-in fade-in-0 zoom-in-95 duration-500 delay-100">
          <div className="relative">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse"></div>
            <Image
              src="/assets/icons/success-icon.svg"
              alt="success"
              width={50}
              height={50}
              className="relative z-10"
            />
          </div>
        </div>

        <h2 className="text-lg sm:text-[20px] font-semibold text-[#181d27] animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-200 px-2">
          Invitation sent successfully!
        </h2>

        <p className="text-sm text-[#201f30] animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-300">
          <strong>ID: {inviteId}</strong>
        </p>

        <p className="text-sm font-normal text-gray-700 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-400 px-2 break-words">
          You have sent an invitation to{' '}
          <strong className="font-bold">
            `{inviteeFirstName}
            {inviteeLastName}`
          </strong>
          .
        </p>

        <button
          onClick={closeModals}
          className=" mt-6 px-6 py-2 bg-[#FF8000] hover:bg-[#e67300] text-white rounded
            transition-all duration-200 hover:scale-105 hover:shadow-lg
            animate-in fade-in-0 slide-in-from-bottom-2 delay-500
            active:scale-95
            w-full sm:w-auto
            min-h-[44px]
          "
        >
          Close
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default InviteSuccessModal;
