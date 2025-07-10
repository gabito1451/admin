'use client';
import { InstructorTabs } from '@/components/instructor/instructor-tabs';
import InviteConfirmationModal from '@/components/instructor/inviteConfirmationModal';
import InviteSuccessModal from '@/components/instructor/inviteSuccessModal';
import InviteModal from '@/components/instructor/send-invite-modal';

export default function InstructorsPage() {
  return (
    <>
      <InstructorTabs />
      <InviteModal />
      <InviteSuccessModal />
      <InviteConfirmationModal />
    </>
  );
}
