# LEADWAYACADEMYADMIN_FRONTEND

![LEADWAYACADEMYADMIN_FRONTEND](public/assets/favicon/android-chrome-192x192.png)

## Overview

Leadway Academy Admin is a modern administrative dashboard for managing the Leadway Academy e-learning platform. Built with Next.js 15 and React 19, this application provides a comprehensive suite of tools for administrators to manage courses, instructors, learners, and content.

## Tech Stack

- **Frontend**: Next.js , React 
- **Styling**: TailwindCSS with custom theming
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **TypeScript**: For type safety and better developer experience

## Project Structure

The application follows a well-organized structure to maintain clean separation of concerns and enable scalability:

```
src/
├── app/             # Next.js App Router pages and layouts
├── components/      # All reusable UI components
├── features/        # Business logic and state management
├── store/           # Global Zustand stores
├── lib/             # Utility libraries
├── styles/          # Global styles
├── tests/           # Unit and integration tests
└── types/           # TypeScript types and interfaces
```

## Components

The `components/` directory contains all reusable UI elements organized by domain:

- **common/** - Generic reusable components (Button, Modal, InputField, etc.)
- **layout/** - Structural components (Navbar, Sidebar, PageLayout)
- **courses/** - Course management components
- **instructors/** - Instructor management components
- **learners/** - Learner management components
- **dashboard/** - Dashboard-specific components

## Features

The `features/` directory follows a domain-driven approach, organizing business logic by feature:

- **courses/** - Course management logic
- **instructors/** - Instructor management logic
- **learners/** - Learner management logic

Each feature directory contains:

- **api/** - API calls related to the feature
- **hooks/** - Custom React hooks
- **utils/** - Helper functions
- **constants.ts** - Feature-specific constants

## State Management

We use Zustand for state management with two levels:

1. **Global state** - Located in `store/` for app-wide state:

   - User authentication
   - App settings (theme, language)

2. **Feature-specific state** - Located in respective feature directories

## Styling

The project uses TailwindCSS with a custom theme that matches the Leadway Academy brand colors. Global styles are defined in `src/styles/globals.css`.

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/LeadwayGroup/LeadwayAcademyAdmin_Frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Development Guidelines

- **Component Creation**: Place new components in the appropriate subdirectory within `components/`
- **Logic**: Keep logic in the respective feature directory
- **State Management**: Create new stores in the appropriate location based on scope
- **TypeScript**: Define types and interfaces in the `types/` directory

## Testing

Run tests using:

```bash
npm test
```

## Building for Production

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Key Features

- **Dashboard**

  - Overview of platform metrics
  - Recent activities
  - Quick access to common tasks

- **Course Management**

  - Create and edit courses
  - Manage course content
  - Review course analytics

- **Instructor Management**

  - Onboard new instructors
  - Review instructor performance
  - Manage instructor profiles

- **Learner Management**
  - View learner profiles
  - Track learner progress
  - Manage learner access

## Contributing

Please follow the project structure outlined in this document when contributing new features or components. Ensure all code passes linting and tests before submitting a pull request.

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.
