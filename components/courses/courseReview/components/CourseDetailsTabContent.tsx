import { Badge } from '@/components/ui/badge';
import { CourseActionButtons } from './CourseActionButtons';
import { ApproveCourseModal } from './ApproveCourseModal';
import { CourseApprovedSuccessModal } from './CourseApprovedSuccessModal';
import { RejectCourseModal } from './RejectCourseModal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function CourseDetailsTabContent() {
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
      <h2 className="text-xl font-bold text-gray-900 mb-4">Course Details</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        <Badge
          variant="outline"
          className="border-orange-400 rounded-sm text-orange-500 bg-orange-50 font-normal p-1"
        >
          Stakeholder Management
        </Badge>
        <Badge
          variant="outline"
          className="border-orange-400 rounded-sm text-orange-500 bg-orange-50 font-normal flex items-center gap-1 p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M12 6v6l4 2" />
          </svg>
          6 Weeks
        </Badge>
        <Badge
          variant="outline"
          className="border-orange-400 rounded-sm text-orange-500 bg-orange-50 font-normal p-1"
        >
          Intermediate
        </Badge>
      </div>
      <div className="mb-8">
        <p className="text-gray-700 leading-relaxed mb-6">
          Foundational Guide to Cybersecurity Architecture is designed to provide learners with a
          solid understanding of the principles and practices involved in designing secure
          information systems. This course delves into the role of a security architect, exploring
          key concepts such as threat modeling, risk assessment, and the integration of security
          frameworks within enterprise environments. Through a combination of theoretical knowledge
          and practical applications, participants will learn how to develop and implement robust
          cybersecurity architectures that align with organizational goals and compliance
          requirements.
        </p>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Learning Objectives</h3>
        <div className="space-y-2">
          <p className="text-gray-700">At the end of this course, participants will be able to:</p>
          <ul className="space-y-2 ml-4">
            <li className="text-gray-700">
              • Understand Core Security Architecture Concepts: Grasp the fundamental principles
              that underpin effective cybersecurity architectures, including confidentiality,
              integrity, and availability (CIA triad).
            </li>
            <li className="text-gray-700">
              • Perform Threat Modeling and Risk Assessments: Utilize methodologies like STRIDE,
              DREAD, and OCTAVE to identify potential threats and assess associated risks within
              information systems.
            </li>
            <li className="text-gray-700">
              • Integrate Security Frameworks: Learn how to apply enterprise architecture frameworks
              such as TOGAF, Zachman, and SABSA to align security strategies with business
              objectives.
            </li>
            <li className="text-gray-700">
              • Design Secure Systems: Develop the ability to design security architectures that
              encompass network, application, and data security considerations.
            </li>
            <li className="text-gray-700">
              • Implement Security Controls: Understand how to select and implement appropriate
              security controls to mitigate identified risks effectively.
            </li>
            <li className="text-gray-700">
              • Ensure Compliance and Governance: Gain insights into aligning security architectures
              with regulatory requirements and organizational governance policies.
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Certification</h3>
      </div>

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
