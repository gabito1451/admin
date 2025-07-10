import { CourseActionButtons } from './CourseActionButtons';
import { ApproveCourseModal } from './ApproveCourseModal';
import { CourseApprovedSuccessModal } from './CourseApprovedSuccessModal';
import { RejectCourseModal } from './RejectCourseModal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export function CourseAuthorTabContent() {
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const router = useRouter();

  const handleApprove = () => {
    setIsApproveModalOpen(true);
  };

  const handleReject = () => {
    setIsRejectModalOpen(true);
  };

  const handleConfirmApprove = () => {
    // TODO: Implement actual course approval logic here
    console.log('Course approval confirmed!');
    setIsApproveModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleConfirmReject = (reason: string) => {
    // TODO: Implement actual course rejection logic here
    console.log('Course rejected with reason:', reason);
    setIsRejectModalOpen(false);
    // Optionally, navigate to rejected courses table or show a success message
  };

  const handleSuccessModalRedirect = () => {
    setIsSuccessModalOpen(false);
    router.push('/dashboard/courses'); // Navigate to live courses table
  };

  const courseTitle = 'Cybersecurity And Artificial Intelligence'; // This should be fetched dynamically

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Instructor</h2>
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
          <Image
            src="/assets/icons/creator.svg"
            alt="Adebowale Adekola"
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-orange-500 mb-1">Adebowale Adekola</h3>
          <p className="text-gray-600 text-sm mb-1">Talent Acquisition Expert</p>
          <p className="text-gray-600 text-sm">adekola@gmail.com</p>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed mb-8">
        Adekola has over a decade of industry experience in the creation of courses to gain
        practical knowledge. He has worked with renowned industry influencers, tech companies, and
        start-ups, ensuring seamless and engaging user-centered courses.
      </p>
      <CourseActionButtons onApprove={handleApprove} onReject={handleReject} />

      <ApproveCourseModal
        open={isApproveModalOpen}
        onOpenChange={setIsApproveModalOpen}
        onConfirm={handleConfirmApprove}
      />

      <CourseApprovedSuccessModal
        open={isSuccessModalOpen}
        onOpenChange={setIsSuccessModalOpen}
        onRedirectAndClose={handleSuccessModalRedirect}
      />

      <RejectCourseModal
        open={isRejectModalOpen}
        onOpenChange={setIsRejectModalOpen}
        onConfirm={handleConfirmReject}
        courseTitle={courseTitle}
      />
    </div>
  );
}
