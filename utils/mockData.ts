import { Course, Department, Learner, Specialization, User } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const mockUsers: User[] = [
  {
    id: 'admin-1',
    name: 'Essa Von',
    email: 'essa.von@leadway.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 'instructor-1',
    name: 'Segun Lawal',
    email: 'segun.lawal@leadway.com',
    role: 'instructor',
    avatar: '/assets/icons/creator.svg',
  },
  {
    id: 'instructor-2',
    name: 'Adebowale Adekola',
    email: 'adebowale.adekola@leadway.com',
    role: 'instructor',
    department: 'Talent Acquisition Department',
    avatar: '/assets/icons/creator.svg',
  },
];

export const mockDepartments: Department[] = [
  { id: 'dept-1', name: 'Digital Transformation', memberCount: 45 },
  { id: 'dept-2', name: 'Claims', memberCount: 32 },
  { id: 'dept-3', name: 'Finance', memberCount: 28 },
  { id: 'dept-4', name: 'HR', memberCount: 18 },
  { id: 'dept-5', name: 'IT Security', memberCount: 24 },
  { id: 'dept-6', name: 'Sales', memberCount: 53 },
];

export const mockSpecializations: Specialization[] = [
  { id: 'spec-1', name: 'Risk Management', memberCount: 38 },
  { id: 'spec-2', name: 'Cybersecurity', memberCount: 15 },
  { id: 'spec-3', name: 'Data Analytics', memberCount: 22 },
  { id: 'spec-4', name: 'Project Management', memberCount: 41 },
  { id: 'spec-5', name: 'Stakeholder Management', memberCount: 29 },
];

export const mockLearners: Learner[] = [
  {
    id: 'learner-1',
    name: 'Essa Von',
    email: 'essa.von@leadway.com',
    role: 'learner',
    department: 'Digital Transformation',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 'learner-2',
    name: 'Tunde Eddie',
    email: 'tunde.eddie@leadway.com',
    role: 'learner',
    department: 'Claims',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 'learner-3',
    name: 'Aisha Mohammed',
    email: 'aisha.m@leadway.com',
    role: 'learner',
    department: 'Finance',
    specialization: 'Risk Management',
    avatar: 'https://i.pravatar.cc/150?img=6',
  },
  {
    id: 'learner-4',
    name: 'Chidi Okonkwo',
    email: 'chidi.o@leadway.com',
    role: 'learner',
    department: 'IT Security',
    specialization: 'Cybersecurity',
    avatar: 'https://i.pravatar.cc/150?img=7',
  },
  {
    id: 'learner-5',
    name: 'Folake Adeyemi',
    email: 'folake.a@leadway.com',
    role: 'learner',
    department: 'Digital Transformation',
    specialization: 'Data Analytics',
    avatar: 'https://i.pravatar.cc/150?img=8',
  },
  {
    id: 'learner-6',
    name: 'John Doe',
    email: 'john.d@leadway.com',
    role: 'learner',
    department: 'Claims',
    avatar: 'https://i.pravatar.cc/150?img=9',
  },
];

export const mockCourses: Course[] = [
  {
    id: '87667898',
    title: 'Cybersecurity And Artificial Intelligence',
    description:
      'This course is meticulously crafted to provide you with a foundational understanding of the principles, methodologies, and tools that drive exceptional for beginners or advanced professionals seeking to expand their cybersecurity knowledge and improve their security posture.',
    category: 'Security',
    instructor: mockUsers.find((u) => u.name === 'Segun Lawal') as User,
    createdAt: '2023-07-12T00:00:00Z',
    updatedAt: '2023-08-12T00:00:00Z',
    totalHours: 22,
    lessons: 15,
    level: 'Beginners and intermediate levels',
    learnersEnrolled: 46,
    learnersCompleted: 23,
    rating: 1.6,
    tags: ['Risk Management', 'Cybersecurity', 'Intermediate'],
    learningObjectives: [
      'Understand the foundational principles of cybersecurity and AI integration',
      'Identify potential vulnerabilities in systems and implement appropriate security measures',
      'Apply machine learning techniques to detect and prevent security threats',
      'Develop strategies for responding to cybersecurity incidents',
      'Create comprehensive security architectures for various organizational needs',
      'Understand the ethical implications of AI in cybersecurity contexts',
      'Implement best practices for data protection and privacy',
      'Stay updated with the latest trends and developments in cybersecurity and AI',
    ],
    modules: [
      {
        id: 'module-1',
        title: 'Introduction to Cybersecurity and AI Fundamentals',
        totalLessons: 4,
        duration: '2 hours',
        lessons: [
          {
            id: '1-1',
            title: 'Cybersecurity Landscape Overview',
            duration: '30min',
            type: 'video',
          },
          {
            id: '1-2',
            title: 'AI and Machine Learning Basics',
            duration: '45min',
            type: 'video',
          },
          {
            id: '1-3',
            title: 'Convergence of AI and Cybersecurity',
            duration: '25min',
            type: 'text',
          },
          {
            id: '1-4',
            title: 'Module 1 Assessment',
            duration: '20min',
            type: 'quiz',
          },
        ],
      },
      {
        id: 'module-2',
        title: 'AI-Powered Threat Detection',
        totalLessons: 4,
        duration: '2.5 hours',
        lessons: [
          {
            id: '2-1',
            title: 'Machine Learning for Threat Detection',
            duration: '40min',
            type: 'video',
          },
          {
            id: '2-2',
            title: 'Behavioral Analytics and Anomaly Detection',
            duration: '50min',
            type: 'video',
          },
          {
            id: '2-3',
            title: 'Implementation Strategies',
            duration: '30min',
            type: 'text',
          },
          {
            id: '2-4',
            title: 'Module 2 Assessment',
            duration: '20min',
            type: 'quiz',
          },
        ],
      },
      {
        id: 'module-3',
        title: 'AI-Enhanced Security Operations',
        totalLessons: 5,
        duration: '3 hours',
        lessons: [
          {
            id: '3-1',
            title: 'Automated Incident Response with AI',
            duration: '45min',
            type: 'video',
          },
          {
            id: '3-2',
            title: 'Security Orchestration and Automation',
            duration: '50min',
            type: 'video',
          },
          {
            id: '3-3',
            title: 'AI in Vulnerability Management',
            duration: '40min',
            type: 'video',
          },
          {
            id: '3-4',
            title: 'Case Studies and Best Practices',
            duration: '25min',
            type: 'text',
          },
          {
            id: '3-5',
            title: 'Module 3 Assessment',
            duration: '20min',
            type: 'quiz',
          },
        ],
      },
      {
        id: 'module-4',
        title: 'Ethics and Future of AI in Cybersecurity',
        totalLessons: 4,
        duration: '2 hours',
        lessons: [
          {
            id: '4-1',
            title: 'Ethical Considerations in AI Security',
            duration: '35min',
            type: 'video',
          },
          {
            id: '4-2',
            title: 'Privacy and AI Security Systems',
            duration: '30min',
            type: 'video',
          },
          {
            id: '4-3',
            title: 'Future Trends and Emerging Technologies',
            duration: '35min',
            type: 'text',
          },
          {
            id: '4-4',
            title: 'Final Assessment',
            duration: '20min',
            type: 'quiz',
          },
        ],
      },
    ],
    changeLog: [
      {
        id: 'change-1',
        date: '2023-08-15T14:30:00Z',
        author: 'Segun Lawal',
        changeType: 'Course Description',
        previousContent: 'This course provides basic cybersecurity knowledge for beginners.',
        updatedContent:
          'This course is meticulously crafted to provide you with a foundational understanding of the principles, methodologies, and tools that drive exceptional cybersecurity practices for beginners or advanced professionals seeking to expand their cybersecurity knowledge and improve their security posture.',
      },
      {
        id: 'change-2',
        date: '2023-09-02T10:15:00Z',
        author: 'Adebowale Adekola',
        changeType: 'Learning Objectives',
        previousContent: 'Learn basic cybersecurity concepts and AI fundamentals.',
        updatedContent:
          'Understand the foundational principles of cybersecurity and AI integration, identify potential vulnerabilities in systems and implement appropriate security measures.',
      },
      {
        id: 'change-3',
        date: '2023-09-20T16:45:00Z',
        author: 'Segun Lawal',
        changeType: 'Module Content',
        previousContent: 'Module 2 included basic threat detection methods.',
        updatedContent:
          'Module 2 now covers advanced AI-powered threat detection with machine learning techniques, behavioral analytics, and real-world implementation strategies.',
      },
    ],
  },
  {
    id: '87667899',
    title: 'Organisational Communication & Persuasion',
    description:
      'Master the art of effective communication within organizations. Learn strategies for persuasive communication that drives results and fosters collaboration across teams and departments.',
    category: 'Security',
    instructor: mockUsers.find((u) => u.name === 'Segun Lawal') as User,
    createdAt: '2023-07-12T00:00:00Z',
    updatedAt: '2023-08-12T00:00:00Z',
    totalHours: 18,
    lessons: 12,
    level: 'All levels',
    learnersEnrolled: 37,
    learnersCompleted: 19,
    rating: 4.6,
    tags: ['Stakeholder Management', 'Communication', 'Intermediate'],
    learningObjectives: [
      'Understand Core Security Architecture Concepts: Grasp the fundamental principles that underpin effective cybersecurity architectures, including confidentiality, integrity, and availability (CIA triad).',
      'Develop persuasive communication strategies for different audiences and contexts',
      'Learn to structure and deliver compelling presentations and proposals',
      'Understand the psychology of influence and persuasion in workplace settings',
      'Build skills in active listening and empathetic communication',
      'Navigate difficult conversations and conflict resolution effectively',
      'Create communication plans that align with organizational goals',
      'Leverage digital tools and platforms for enhanced organizational communication',
    ],
    modules: [
      {
        id: 'module-1',
        title: 'Foundations of Organizational Communication',
        totalLessons: 4,
        duration: '1.5 hours',
        lessons: [
          {
            id: '1-1',
            title: 'Communication Theory and Principles',
            duration: '25min',
            type: 'video',
          },
          {
            id: '1-2',
            title: 'Organizational Communication Models',
            duration: '30min',
            type: 'video',
          },
          {
            id: '1-3',
            title: 'Communication Channels and Mediums',
            duration: '20min',
            type: 'text',
          },
          {
            id: '1-4',
            title: 'Module 1 Assessment',
            duration: '15min',
            type: 'quiz',
          },
        ],
      },
      {
        id: 'module-2',
        title: 'Persuasion and Influence Techniques',
        totalLessons: 4,
        duration: '2 hours',
        lessons: [
          {
            id: '2-1',
            title: 'Psychology of Persuasion',
            duration: '35min',
            type: 'video',
          },
          {
            id: '2-2',
            title: 'Building Compelling Arguments',
            duration: '40min',
            type: 'video',
          },
          {
            id: '2-3',
            title: 'Influence Strategies in Practice',
            duration: '25min',
            type: 'text',
          },
          {
            id: '2-4',
            title: 'Module 2 Assessment',
            duration: '20min',
            type: 'quiz',
          },
        ],
      },
      {
        id: 'module-3',
        title: 'Cross-Cultural Communication and Conflict Resolution',
        totalLessons: 5,
        duration: '2.5 hours',
        lessons: [
          {
            id: '3-1',
            title: 'Understanding Cultural Communication Styles',
            duration: '40min',
            type: 'video',
          },
          {
            id: '3-2',
            title: 'Managing Conflict in Diverse Teams',
            duration: '35min',
            type: 'video',
          },
          {
            id: '3-3',
            title: 'Negotiation and Mediation Techniques',
            duration: '45min',
            type: 'video',
          },
          {
            id: '3-4',
            title: 'Cultural Sensitivity in Communication',
            duration: '20min',
            type: 'text',
          },
          {
            id: '3-5',
            title: 'Module 3 Assessment',
            duration: '15min',
            type: 'quiz',
          },
        ],
      },
      {
        id: 'module-4',
        title: 'Digital Communication and Leadership',
        totalLessons: 4,
        duration: '2 hours',
        lessons: [
          {
            id: '4-1',
            title: 'Leading Virtual Teams Effectively',
            duration: '35min',
            type: 'video',
          },
          {
            id: '4-2',
            title: 'Digital Communication Tools and Platforms',
            duration: '30min',
            type: 'video',
          },
          {
            id: '4-3',
            title: 'Building Trust in Remote Communications',
            duration: '35min',
            type: 'text',
          },
          {
            id: '4-4',
            title: 'Final Assessment',
            duration: '20min',
            type: 'quiz',
          },
        ],
      },
    ],
  },
  {
    id: '87667900',
    title: 'Designing For My Father',
    description:
      'A unique approach to user-centered design focusing on designing products and services that are accessible and usable by older generations. Learn empathy-driven design principles.',
    category: 'Security',
    instructor: mockUsers.find((u) => u.name === 'Segun Lawal') as User,
    createdAt: '2023-07-12T00:00:00Z',
    updatedAt: '2023-08-12T00:00:00Z',
    totalHours: 16,
    lessons: 10,
    level: 'Beginners',
    learnersEnrolled: 15,
    learnersCompleted: 8,
    rating: 4.6,
    tags: ['Design', 'UX', 'Accessibility', 'Beginner'],
    learningObjectives: [
      'Understand the unique needs and challenges of designing for older adults',
      'Apply empathy-driven design methodologies in product development',
      'Learn accessibility principles and guidelines for inclusive design',
      'Develop user personas and journey maps for diverse age groups',
      'Create intuitive interfaces that accommodate cognitive and physical changes',
      'Conduct usability testing with older adult participants effectively',
      'Implement design solutions that bridge generational technology gaps',
      'Foster intergenerational understanding through thoughtful design practices',
    ],
    modules: [
      {
        id: 'module-1',
        title: 'Understanding Aging and Design',
        totalLessons: 3,
        duration: '1 hour',
        lessons: [
          {
            id: '1-1',
            title: 'Aging and Cognitive Changes',
            duration: '20min',
            type: 'video',
          },
          {
            id: '1-2',
            title: 'Physical Limitations and Design',
            duration: '25min',
            type: 'video',
          },
          {
            id: '1-3',
            title: 'Module 1 Assessment',
            duration: '15min',
            type: 'quiz',
          },
        ],
      },
      {
        id: 'module-2',
        title: 'Inclusive Design Principles',
        totalLessons: 4,
        duration: '1.5 hours',
        lessons: [
          {
            id: '2-1',
            title: 'Accessibility Guidelines',
            duration: '25min',
            type: 'video',
          },
          {
            id: '2-2',
            title: 'Designing for Visual Impairments',
            duration: '30min',
            type: 'video',
          },
          {
            id: '2-3',
            title: 'Interface Design Best Practices',
            duration: '20min',
            type: 'text',
          },
          {
            id: '2-4',
            title: 'Module 2 Assessment',
            duration: '15min',
            type: 'quiz',
          },
        ],
      },
      {
        id: 'module-3',
        title: 'User Research and Testing with Older Adults',
        totalLessons: 5,
        duration: '2 hours',
        lessons: [
          {
            id: '3-1',
            title: 'Conducting Interviews with Senior Users',
            duration: '30min',
            type: 'video',
          },
          {
            id: '3-2',
            title: 'Usability Testing Methodologies',
            duration: '35min',
            type: 'video',
          },
          {
            id: '3-3',
            title: 'Creating Age-Friendly Personas',
            duration: '25min',
            type: 'video',
          },
          {
            id: '3-4',
            title: 'Analyzing User Feedback and Insights',
            duration: '20min',
            type: 'text',
          },
          {
            id: '3-5',
            title: 'Module 3 Assessment',
            duration: '10min',
            type: 'quiz',
          },
        ],
      },
      {
        id: 'module-4',
        title: 'Implementation and Technology Considerations',
        totalLessons: 4,
        duration: '1.5 hours',
        lessons: [
          {
            id: '4-1',
            title: 'Technology Adoption Patterns in Aging',
            duration: '25min',
            type: 'video',
          },
          {
            id: '4-2',
            title: 'Designing for Multiple Devices',
            duration: '30min',
            type: 'video',
          },
          {
            id: '4-3',
            title: 'Implementation Strategies and Rollout',
            duration: '20min',
            type: 'text',
          },
          {
            id: '4-4',
            title: 'Final Project Presentation',
            duration: '15min',
            type: 'quiz',
          },
        ],
      },
    ],
  },
];

// Generate some random assignments
export const generateMockAssignments = () => {
  const assignments = [];
  const courseIds = mockCourses.map((c) => c.id);
  const admin = mockUsers.find((u) => u.role === 'admin');

  if (!admin) return [];

  // Assign to some learners
  for (let i = 0; i < 5; i++) {
    const learner = mockLearners[Math.floor(Math.random() * mockLearners.length)];
    const courseId = courseIds[Math.floor(Math.random() * courseIds.length)];

    assignments.push({
      id: uuidv4(),
      courseId,
      assignedTo: {
        type: 'learner',
        id: learner.id,
        name: learner.name,
      },
      assignedBy: admin,
      assignedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString(),
      status: 'active',
    });
  }

  // Assign to some departments
  for (let i = 0; i < 2; i++) {
    const department = mockDepartments[Math.floor(Math.random() * mockDepartments.length)];
    const courseId = courseIds[Math.floor(Math.random() * courseIds.length)];

    assignments.push({
      id: uuidv4(),
      courseId,
      assignedTo: {
        type: 'department',
        id: department.id,
        name: department.name,
      },
      assignedBy: admin,
      assignedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString(),
      status: 'active',
    });
  }

  // Assign to a specialization
  const specialization =
    mockSpecializations[Math.floor(Math.random() * mockSpecializations.length)];
  const courseId = courseIds[Math.floor(Math.random() * courseIds.length)];

  assignments.push({
    id: uuidv4(),
    courseId,
    assignedTo: {
      type: 'specialization',
      id: specialization.id,
      name: specialization.name,
    },
    assignedBy: admin,
    assignedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString(),
    status: 'active',
  });

  return assignments;
};
