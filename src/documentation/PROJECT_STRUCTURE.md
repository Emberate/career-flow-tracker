
# CareerFlow Project Structure Documentation

## Overview

CareerFlow is a comprehensive job application tracking system built with React, TypeScript, and modern UI components. The application helps users manage their job search process by tracking applications, interviews, and analytics.

## Project Structure

The project follows a standard React application structure with organized folders for different purposes. Below is the breakdown of the main directories and their contents:

```
src/
├── components/        # Reusable UI components
├── context/           # React context providers
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and libraries
├── pages/             # Top-level page components
├── types.ts           # TypeScript type definitions
└── documentation/     # Project documentation files
```

## Key Directories and Files

### `/src/components`

Contains reusable UI components that are used across multiple pages.

- **UI Components (`/components/ui/`)**: Shadcn UI components and custom UI elements
  - Button, Input, Card, Dialog, etc.
  - These are low-level UI components used to build more complex components

- **Feature Components**: 
  - `AuthForm.tsx`: Authentication form for login and signup
  - `JobCard.tsx`: Card component for displaying job application information
  - `JobForm.tsx`: Form for adding and editing job applications
  - `Navbar.tsx`: Top navigation bar component
  - `Footer.tsx`: Site footer component
  - `PageLayout.tsx`: Layout wrapper for consistent page structure
  - `PageHeader.tsx`: Header component used at the top of pages

- **Dashboard Components**:
  - `JobAnalytics.tsx`: Charts and metrics for job applications
  - `SuccessMetrics.tsx`: Success tracking and analytics
  - `InterviewCalendar.tsx`: Calendar view for interviews
  - `InterviewQA.tsx`: Interview questions and answers component
  - `Reminders.tsx`: Reminder management component
  - `CompanyResearch.tsx`: Company information component
  - `ThemeSwitcher.tsx`: Theme selection and customization component

### `/src/context`

Contains React context providers that provide state management across the application.

- `AuthContext.tsx`: Authentication context for user login/signup and session management

### `/src/hooks`

Contains custom React hooks used throughout the application.

- `use-toast.ts`: Hook for displaying toast notifications
- `use-mobile.tsx`: Hook for detecting mobile devices

### `/src/lib`

Contains utility functions and helper libraries.

- `utils.ts`: General utility functions used across the application

### `/src/pages`

Contains top-level page components that are directly rendered by routes in App.tsx.

- `Index.tsx`: Landing page
- `Dashboard.tsx`: Main dashboard page showing job applications and analytics
- `Login.tsx`: Login page
- `Signup.tsx`: Signup page
- `Profile.tsx`: User profile management page
- `Product.tsx`: Product information page
- `Features.tsx`: Features listing page
- `HowItWorks.tsx`: Page explaining how the application works
- `Pricing.tsx`: Subscription plans and pricing information
- `Support.tsx`: Support information and resources
- `HelpCenter.tsx`: Help resources and guides
- `Contact.tsx`: Contact form and information
- `FAQ.tsx`: Frequently asked questions
- `Documentation.tsx`: Documentation page
- `NotFound.tsx`: 404 page for handling unknown routes

### `/src/types.ts`

Contains TypeScript type definitions used throughout the application:

- `Job`: Interface for job application data
- `InterviewQuestion`: Interface for interview question data
- `JobState`: Interface for job-related state management

## Key Application Features

1. **Authentication System**
   - Login and signup functionality
   - Demo mode with simulated authentication
   - Protected routes that require authentication

2. **Job Application Tracking**
   - Add, edit, and delete job applications
   - Filter by status (Applied, Interview, Offer, Rejected)
   - Search functionality

3. **Dashboard Analytics**
   - Visual charts of application statuses
   - Success metrics and statistics
   - Monthly application trends

4. **Interview Management**
   - Calendar for scheduling interviews
   - Question and answer preparation
   - Interview notes

5. **Reminders System**
   - Set reminders for follow-ups
   - Mark reminders as completed
   - Notification system

6. **Data Persistence**
   - LocalStorage is used for data persistence
   - Each user's data is stored separately based on email

## State Management

- React Context API is used for global state management
- Local component state is used for UI-specific state
- The application doesn't use any external state management libraries

## Styling

- Tailwind CSS is used for styling components
- Shadcn UI provides pre-styled components
- Responsive design implemented across all pages

## Routing

React Router is used for navigation with the following main routes:

```jsx
<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/product" element={<Product />} />
  <Route path="/features" element={<Features />} />
  <Route path="/how-it-works" element={<HowItWorksSection />} />
  <Route path="/pricing" element={<Pricing />} />
  <Route path="/support" element={<Support />} />
  <Route path="/help" element={<HelpCenter />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/faq" element={<FAQ />} />
  <Route path="/documentation" element={<Documentation />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

## Best Practices

- Components are modular and reusable
- TypeScript is used for type safety
- Consistent naming conventions throughout the codebase
- Responsive design principles applied
