// components/LearnerModal.tsx
import { Learner } from '@/components/learners/types/learner';
import { X } from 'lucide-react';

interface Props {
  learner: Learner | null;
  onClose: () => void;
}

export default function LearnerModal({ learner, onClose }: Props) {
  if (!learner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg relative">
        {/* Close icon */}
        <button className="absolute top-4 right-4 text-gray-400 hover:text-black" onClick={onClose}>
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">Learner Details</h2>

        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <strong>ID:</strong> {learner.id}
          </p>
          <p>
            <strong>Name:</strong> {learner.name}
          </p>
          <p>
            <strong>Email:</strong> {learner.email}
          </p>
          <p>
            <strong>Department:</strong> {learner.department}
          </p>
          <p>
            <strong>Role/Specialisation:</strong> {learner.role}
          </p>
          <p>
            <strong>Assigned Courses:</strong> {learner.assignedCourses}
          </p>
        </div>
      </div>
    </div>
  );
}
