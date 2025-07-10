'use client';

import { useInviteFlowStore } from '@/features/instructor/store/instructor-store';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Image from 'next/image';
import { DialogTitle } from '@radix-ui/react-dialog';

const InviteConfirmationModal = () => {
  const { showConfirmation, inviteeFirstName, inviteeLastName, confirmInvite, closeModals } =
    useInviteFlowStore();

  return (
    <Dialog open={showConfirmation} onOpenChange={closeModals}>
      <DialogContent className="rounded-xl text-center pt-8 pb-6 px-4 sm:px-6 max-w-[400px]  w-full">
        <div className="flex justify-center mb-2">
          <Image src="/assets/icons/send-invite.svg" alt="warning" width={60} height={60} />
        </div>
        <DialogTitle className="text-xl sm:text-[22px] font-bold text-academy-orange">
          Send invitation
        </DialogTitle>
        <p className="text-sm sm:text-base text-[#14151a] mt-2">
          Send this invitation to{' '}
          <strong className="text-neutrals-10 font-bold">
            {inviteeFirstName} {inviteeLastName}
          </strong>
        </p>
        <div className="flex flex-col mt-5 sm:flex-row justify-center w-full gap-3 sm:gap-4 animate-in slide-in-from-bottom-4 fade-in-0 duration-600 delay-900">
          <button
            onClick={closeModals}
            className="px-4 sm:px-6 py-2.5 sm:py-2 w-full sm:w-[155px] text-sm font-medium border border-academy-orange rounded-lg text-academy-orange transition-all duration-300 hover:bg-academy-orange/5 hover:shadow-lg hover:shadow-academy-orange/10 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-academy-orange focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            onClick={confirmInvite}
            className="w-full sm:w-[155px] px-4 sm:px-6 py-2.5 sm:py-2 text-sm font-medium bg-academy-orange hover:bg-[#e67300] text-white rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-academy-orange/25 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-academy-orange focus:ring-offset-2"
          >
            Send
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteConfirmationModal;
