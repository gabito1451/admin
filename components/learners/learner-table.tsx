import { Learner } from '@/components/learners/types/learner';
import Pagination from './pagination';

interface Props {
  data: Learner[];
  onView: (learner: Learner) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function LearnerTable({
  data,
  onView,
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div className="overflow-x-auto w-full shadow-md rounded-lg border border-gray-100 space-y-6 px-2 py-4">
      {/* Table */}
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50 text-xs md:text-sm">
          <tr className="bg-white-2">
            <th className="px-2 py-2 text-left font-medium whitespace-nowrap">ID</th>
            <th className="px-2 py-2 text-left font-medium whitespace-nowrap">Learner’s Name</th>
            <th className="px-2 py-2 text-left font-medium whitespace-nowrap">Email Address</th>
            <th className="px-2 py-2 text-left font-medium whitespace-nowrap">Department</th>
            <th className="px-2 py-2 text-left font-medium whitespace-nowrap">
              Role/Specialisation
            </th>
            <th className="px-2 py-2 text-left font-medium whitespace-nowrap">Assigned Courses</th>
            <th className="px-2 py-2 text-left font-medium whitespace-nowrap">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-xs md:text-sm">
          {data.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-8 text-gray-400">
                No learners found.
              </td>
            </tr>
          ) : (
            data.map((learner) => (
              <tr key={learner.id} className="text-sm">
                <td className="px-2 py-2">{learner.id}</td>
                <td className="px-2 py-2">{learner.name}</td>
                <td className="px-2 py-2">{learner.email}</td>
                <td className="px-2 py-2">{learner.department}</td>
                <td className="px-2 py-2">{learner.role}</td>
                <td className="px-2 py-2">{learner.assignedCourses}</td>
                <td className="px-2 py-2 text-academy-orange underline cursor-pointer">
                  <button
                    className="px-2 py-2 text-academy-orange underline underline-offset-8 decoration-academy-orange whitespace-nowrap"
                    onClick={() => onView(learner)}
                  >
                    View learner
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Positioned Under Table */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onChange={onPageChange} />
    </div>
  );
}
