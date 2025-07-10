import { Button } from '@/components/ui/button';
import { ChevronDown, Video, BookOpen, Mic, Lamp, Square } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';
import { ApproveCourseModal } from './ApproveCourseModal';
import { RejectCourseModal } from './RejectCourseModal';
import { CourseApprovedSuccessModal } from './CourseApprovedSuccessModal';
import { CourseActionButtons } from './CourseActionButtons';
import { useRouter } from 'next/navigation';

interface Lesson {
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'audio' | 'quiz';
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  duration: string;
}

const modules: Module[] = [
  {
    id: 'module1',
    title: 'Module 1: Introduction to Cybersecurity Architecture',
    duration: '1 hour',
    lessons: [
      {
        title: '1. Understanding Security Architecture Fundamentals',
        duration: '20min',
        type: 'video',
      },
      { title: '2. The CIA Triad and Security Principles', duration: '30min', type: 'video' },
      { title: '3. Roles and Responsibilities in Cybersecurity', duration: '20min', type: 'video' },
      { title: '4. Common Threats and Vulnerabilities', duration: '10min', type: 'reading' },
      { title: '5. Endpoint Management and Monitoring Tools', duration: '20min', type: 'audio' },
      { title: '6. Module 1 quiz', duration: '20min', type: 'quiz' },
    ],
  },
  {
    id: 'module2',
    title: 'Module 2: Identity and Access Management (IAM) and Endpoint Security',
    duration: '1 hour',
    lessons: [
      {
        title: '1. Understanding Security Architecture Fundamentals',
        duration: '20min',
        type: 'video',
      },
      { title: '2. The CIA Triad and Security Principles', duration: '30min', type: 'video' },
    ],
  },
  {
    id: 'module3',
    title: 'Module 3: Network, Application, and Data Security',
    duration: '1 hour',
    lessons: [],
  },
  {
    id: 'module4',
    title: 'Module 4: Detection and Response',
    duration: '1 hour',
    lessons: [],
  },
  {
    id: 'module5',
    title: 'Module 5: Final Project and Course Wrap-Up',
    duration: '1 hour',
    lessons: [],
  },
];

interface Props {
  openModules: { [key: string]: boolean };
  toggleModule: (moduleId: string) => void;
}

function getLessonIcon(type: Lesson['type']) {
  switch (type) {
    case 'video':
      return <Video className="w-5 h-5 text-gray-400" />;
    case 'reading':
      return <BookOpen className="w-5 h-5 text-gray-400" />;
    case 'audio':
      return <Mic className="w-5 h-5 text-gray-400" />;
    case 'quiz':
      return <Lamp className="w-5 h-5 text-gray-400" />;
    default:
      return null;
  }
}

export function CourseModulesTabContent({ openModules, toggleModule }: Props) {
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
    console.log('Course approval confirmed from modules tab!');
    setIsApproveModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleConfirmReject = (reason: string) => {
    // TODO: Implement actual course rejection logic here
    console.log('Course rejected from modules tab with reason:', reason);
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
      <h2 className="text-xl font-bold text-gray-900 mb-6">Modules</h2>

      <div className="space-y-0 p-3 border rounded-lg bg-white">
        {modules.map((mod) => (
          <Collapsible key={mod.id} open={!!openModules[mod.id]}>
            <CollapsibleTrigger
              className={`flex items-center justify-between w-full py-4 px-2 hover:bg-gray-50 border-b border-gray-200 transition
          ${openModules[mod.id] ? 'font-semibold bg-gray-50' : 'font-normal'}
              `}
              onClick={() => toggleModule(mod.id)}
              >
                <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 flex-shrink-0 mt-0.5 sm:mt-0 ${openModules[mod.id] ? 'rotate-180' : ''}`}
                  />
                  <span className="font-medium text-gray-900 text-sm sm:text-base leading-tight sm:leading-normal break-words">
                    {mod.title}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-gray-600 flex-shrink-0 ml-2">
                  <span className="whitespace-nowrap">{mod.lessons.length || 5} Lessons</span>
                  <span className="whitespace-nowrap">{mod.duration}</span>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-3 sm:px-6 pb-3 sm:pb-4 bg-gray-50 rounded-b-lg">
                {mod.lessons.length > 0 && (
                  <div className="space-y-2">
                    {mod.lessons.map((lesson, i) => (
                      <div
                        key={i}
                        className="flex items-start sm:items-center justify-between py-2 gap-3"
                      >
                        <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
                          {/* Checkbox icon on the left */}
                          <Square className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 flex-shrink-0 mt-0.5 sm:mt-0" />
                          <span className="text-gray-700 text-sm sm:text-base leading-tight sm:leading-normal break-words">
                            {lesson.title}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2 flex-shrink-0">
                          <div className="flex items-center gap-1 sm:gap-2">
                            {getLessonIcon(lesson.type)}
                            <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                              {lesson.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>
          ))}
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
