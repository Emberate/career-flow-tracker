
# CareerFlow Components Documentation

This document provides a detailed overview of the key components used throughout the CareerFlow application.

## UI Components

CareerFlow uses the Shadcn UI component library, which provides a set of accessible, reusable, and composable React components. These components are located in the `/src/components/ui/` directory.

### Core UI Components

| Component | Description | Location |
|-----------|-------------|----------|
| Alert | Used for important messages and notifications | `/components/ui/alert.tsx` |
| Avatar | User profile images and placeholders | `/components/ui/avatar.tsx` |
| Badge | Status indicators and labels | `/components/ui/badge.tsx` |
| Button | Interactive buttons with various styles | `/components/ui/button.tsx` |
| Card | Container for related content and actions | `/components/ui/card.tsx` |
| Dialog | Modal dialogs for important actions | `/components/ui/dialog.tsx` |
| Input | Text input fields | `/components/ui/input.tsx` |
| Select | Dropdown selection components | `/components/ui/select.tsx` |
| Tabs | Tab navigation for content organization | `/components/ui/tabs.tsx` |
| Toast | Notification messages | `/components/ui/toast.tsx` |
| Toggle | On/off switches and toggles | `/components/ui/toggle.tsx` |

## Feature Components

These are higher-level components that implement specific features and are composed of multiple UI components.

### AuthForm

**Location**: `/components/AuthForm.tsx`

A versatile authentication form that handles both login and signup flows:

- Props:
  - `type`: 'login' | 'signup' - Determines whether the form is for login or signup
- Features:
  - Email and password authentication
  - Full name input for signup
  - Social login buttons (demo mode)
  - Form validation
  - Loading states

### JobCard

**Location**: `/components/JobCard.tsx`

Displays information about a job application in a card format:

- Props:
  - `job`: Job - The job data to display
  - `onDelete`: (id: string) => void - Callback for deleting the job
  - `onEdit`: (job: Job) => void - Callback for editing the job
- Features:
  - Status badge with appropriate colors
  - Company and job title display
  - Application date
  - Edit and delete actions
  - Interactive elements for additional details

### PageLayout

**Location**: `/components/PageLayout.tsx`

A consistent layout wrapper for all pages:

- Props:
  - `children`: React.ReactNode - Page content
  - `title`: string - Page title
  - `className`: string (optional) - Additional CSS classes
- Features:
  - Consistent header and footer
  - Document title setting
  - Theme application
  - Scroll to top on navigation

### SuccessMetrics

**Location**: `/components/SuccessMetrics.tsx`

Visualizes job application statistics and success metrics:

- Features:
  - Pie chart for status distribution
  - Bar chart for monthly applications
  - Key metrics (interview rate, offer rate, response rate)
  - Detailed statistics view
  - Interactive charts with tooltips

### InterviewCalendar

**Location**: `/components/InterviewCalendar.tsx`

Calendar interface for scheduling and tracking interviews:

- Features:
  - Monthly calendar view
  - Interview event display
  - Date selection and event creation
  - Upcoming interviews list

### Reminders

**Location**: `/components/Reminders.tsx`

Manages reminders for follow-ups and important dates:

- Features:
  - Add, edit, and delete reminders
  - Date and time selection
  - Mark reminders as completed
  - Sort by date and priority

### ThemeSwitcher

**Location**: `/components/ThemeSwitcher.tsx`

Allows users to customize the application theme:

- Features:
  - Light and dark mode
  - Color theme selection
  - Theme persistence

## Page Components

These components represent complete pages in the application.

### Dashboard

**Location**: `/pages/Dashboard.tsx`

The main application dashboard:

- Features:
  - Job applications list with filters
  - Success metrics and analytics
  - Interview calendar
  - Reminders
  - Quick actions

### Login/Signup

**Locations**: `/pages/Login.tsx` and `/pages/Signup.tsx`

Authentication pages:

- Features:
  - AuthForm component with appropriate type
  - Redirect logic for authenticated users
  - Clear navigation between login and signup

### Profile

**Location**: `/pages/Profile.tsx`

User profile management:

- Features:
  - Personal information display and editing
  - Account settings
  - Theme preferences
  - Demo account information

## Context Providers

### AuthContext

**Location**: `/context/AuthContext.tsx`

Provides authentication state and functions throughout the application:

- Values:
  - `user`: User object or null
  - `isAuthenticated`: boolean
  - `login`: (email, password) => Promise
  - `signup`: (email, name, password) => Promise
  - `logout`: () => void
- Features:
  - User authentication state
  - Login and signup methods
  - Token management and persistence
  - Protected route handling
