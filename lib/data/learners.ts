export type OngoingCourse = {
  id: string;
  title: string;
  startDate: string;
  instructor: string;
  instructorImage: string;
  progress: number;
  thumbnail: string;
};
export type CompletedCourse = {
  id: string;
  title: string;
  grade: string;
  completeDate: string;
  instructor: string;
  instructorImage: string;
  thumbnail: string;
};

export type Learner = {
  id: string;
  name: string;
  title: string;
  email: string;
  avatar: string;
  department?: string;
  role?: string;
  assignedCourses?: string;
  totalLearningTime: string;
  ongoingCourses: OngoingCourse[];
  completedCourses: CompletedCourse[];
  assessments: any[];
};

export const learners: Learner[] = [
  {
    id: '23453454',
    name: 'Segun Gbajabimila',
    title: 'Digital Transformation · Product Manager',
    email: 'segunlaw@gmail.com',
    avatar: '/assets/images/learner-image.png',
    department: 'Digital Transformation',
    role: 'Product Manager',
    assignedCourses: '15',
    totalLearningTime: '73h 14m',
    ongoingCourses: [
      {
        id: 'ongoingCourse1',
        title: 'Beginner Guide To Becoming A Frontend Developer',
        startDate: 'April 24, 2025',
        instructor: 'Adebowale Adekola',
        instructorImage: '/assets/images/tutor-image.png',
        progress: 30,
        thumbnail: '/assets/images/course-image.png',
      },
      {
        id: 'ongoingCourse2',
        title: 'Beginner Guide To Becoming A Frontend Developer',
        startDate: 'April 24, 2025',
        instructor: 'Adebowale Adekola',
        instructorImage: '/assets/images/tutor-image.png',
        progress: 50,
        thumbnail: '/assets/images/course-image.png',
      },
      {
        id: 'ongoingCourse3',
        title: 'Beginner Guide To Becoming A Frontend Developer',
        startDate: 'April 24, 2025',
        instructor: 'Adebowale Adekola',
        instructorImage: '/assets/images/tutor-image.png',
        progress: 10,
        thumbnail: '/assets/images/course-image.png',
      },
    ],
    completedCourses: [
      {
        id: 'completedCourse1',
        title: 'Beginner Guide To Becoming A Frontend Developer',
        grade: '97%',
        completeDate: 'April 3, 2025',
        instructor: 'Adebowale Adekola',
        instructorImage: '/assets/images/tutor-image.png',
        thumbnail: '/assets/images/course-image.png',
      },
      {
        id: 'completedCourse4',
        title: 'Beginner Guide To Becoming A Frontend Developer',
        grade: '97%',
        completeDate: 'April 3, 2025',
        instructor: 'Adebowale Adekola',
        instructorImage: '/assets/images/tutor-image.png',
        thumbnail: '/assets/images/course-image.png',
      },
      {
        id: 'completedCourse2',
        title: 'Beginner Guide To Becoming A Frontend Developer',
        grade: '97%',
        completeDate: 'April 3, 2025',
        instructor: 'Adebowale Adekola',
        instructorImage: '/assets/images/tutor-image.png',
        thumbnail: '/assets/images/course-image.png',
      },
      {
        id: 'completedCourse3',
        title: 'Beginner Guide To Becoming A Frontend Developer',
        grade: '97%',
        completeDate: 'April 3, 2025',
        instructor: 'Adebowale Adekola',
        instructorImage: '/assets/images/tutor-image.png',
        thumbnail: '/assets/images/course-image.png',
      },
    ],
    assessments: [
      {
        id: 'assessment1',
        title: 'Graded Quiz: Common Security Threats and Risks',
        points: '9/10',
        grade: '90%',
        status: 'Passed',
        date: '12/08/2025',
      },
      {
        id: 'assessment2',
        title: 'Graded Quiz: Common Security Threats and Risks',
        points: '9/10',
        grade: '90%',
        status: 'Passed',
        date: '12/08/2025',
      },
      {
        id: 'assessment3',
        title: 'Graded Quiz: Common Security Threats and Risks',
        points: '9/10',
        grade: '90%',
        status: 'Passed',
        date: '12/08/2025',
      },
      {
        id: 'assessment4',
        title: 'Graded Quiz: Common Security Threats and Risks',
        points: '9/10',
        grade: '90%',
        status: 'Passed',
        date: '12/08/2025',
      },
      {
        id: 'assessment5',
        title: 'Graded Quiz: Common Security Threats and Risks',
        points: '9/10',
        grade: '90%',
        status: 'Passed',
        date: '12/08/2025',
      },
      {
        id: 'assessment6',
        title: 'Graded Quiz: Common Security Threats and Risks',
        points: '9/10',
        grade: '90%',
        status: 'Passed',
        date: '12/08/2025',
      },
      {
        id: 'assessment7',
        title: 'Graded Quiz: Common Security Threats and Risks',
        points: '9/10',
        grade: '90%',
        status: 'Passed',
        date: '12/08/2025',
      },
      {
        id: 'assessment8',
        title: 'Graded Quiz: Common Security Threats and Risks',
        points: '9/10',
        grade: '90%',
        status: 'Passed',
        date: '12/08/2025',
      },
    ],
  },
];
