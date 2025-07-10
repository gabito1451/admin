'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInstructorModalStore } from '@/features/instructor/store/instructor-store';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useInviteFlowStore } from '@/features/instructor/store/instructor-store';
import Image from 'next/image';

interface InviteFormValues {
  firstname: string;
  lastname: string;
  email: string;
  department: string;
}

const inviteSchema = yup
  .object({
    firstname: yup.string().required('First name is required'),
    lastname: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    department: yup.string().required('department is required'),
  })
  .required();

const InviteModal: FC = () => {
  const { isInviteModalOpen, closeInviteModal } = useInstructorModalStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InviteFormValues>({
    resolver: yupResolver(inviteSchema),
    mode: 'onSubmit',
  });

  const onSubmit = (data: InviteFormValues) => {
    useInviteFlowStore
      .getState()
      .openConfirmation(data.firstname, data.lastname, data.email, data.department);
    closeInviteModal();
    reset();
  };

  return (
    <Dialog
      open={isInviteModalOpen}
      onOpenChange={(open: boolean) => {
        if (!open) closeInviteModal();
      }}
    >
      <DialogContent className="max-w-[652px] m-auto flex flex-col rounded-[20px] px-6 py-6 sm:px-[50px] sm:py-[50px] max-h-screen scrollbar-hide overflow-y-auto animate-in slide-in-from-bottom-4 fade-in-0 duration-600 delay-900">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-[28px] sm:text-[36px] text-[#181d27] font-bold pt-4">
            Invite instructor
          </DialogTitle>
          <p className="text-[16px] sm:text-[18px] text-[#535862] font-normal">
            Fill in new instructor’s details to send them an invite.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="firstname" className="text-[#414651] text-[14px] font-medium">
                  First name
                </Label>
                <Input
                  id="firstname"
                  className="h-[48px] border border-[#d5d7da] outline-none"
                  placeholder="Joshua"
                  {...register('firstname')}
                />
                {errors.firstname && (
                  <p className="text-sm text-red-600 mt-1">{errors.firstname.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastname" className="text-[#414651] text-[14px] font-medium">
                  Last name
                </Label>
                <Input
                  id="lastname"
                  className="h-[48px] border border-[#d5d7da] outline-none"
                  placeholder="Abidoshaker"
                  {...register('lastname')}
                />
                {errors.lastname && (
                  <p className="text-sm text-red-600 mt-1">{errors.lastname.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-[#414651] text-[14px] font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  className="h-[48px] border border-[#d5d7da] outline-none"
                  placeholder="joshshaker@gmail.com"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="department" className="text-[#414651] text-[14px] font-medium">
                  department/Department
                </Label>
                <select
                  id="department"
                  className="h-[48px] border  border-[#d5d7da] text-[#414651] outline-none w-full px-2 pr-3 rounded-md"
                  {...register('department')}
                >
                  <option value="human resource">human resource</option>
                  <option value="information technology">information technology</option>
                  <option value="legal and compliance">legal and compliance</option>
                  <option value="maintainance">maintainance</option>
                  <option value="marketting">marketting</option>
                  <option value="sales">sales</option>
                  <option value="engineering">engineering</option>
                </select>
                {errors.department && (
                  <p className="text-sm text-red-600 mt-1">{errors.department.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 mt-8">
            <Image src="/assets/icons/warning-icon.svg" width={20} height={20} alt="warning-icon" />
            <p className="text-sm text-orange-warning font-normal">
              This invite expires in 24 hours.
            </p>
          </div>

          <button
            type="submit"
            className="mt-12 w-full bg-academy-orange hover:bg-[#e67300] text-white py-3 rounded-[8px] text-[16px] font-semibold"
          >
            Send message
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default InviteModal;
