# ProspectPath Data Management Documentation

This document explains how data is managed, stored, and processed within the ProspectPath application.

## Data Storage

ProspectPath uses browser localStorage for data persistence. This approach was chosen for simplicity and to enable the application to function without requiring a backend server.

### Key Data Entities

1. **User Data**
   - Storage Key: `user_<email>`
   - Contains user profile information and authentication status
   - Example structure:
     ```typescript
     {
       email: string;
       name: string;
       createdAt: string; // ISO date string
     }
     ```

2. **Job Applications**
   - Storage Key: `jobs_<email>`
   - Contains all job applications for a specific user
   - Array of Job objects with the following structure:
     ```typescript
     {
       id: string;
       title: string;
       company: string;
       dateApplied: string;
       status: string;
       notes: string;
       jobLink: string;
       resumeLink?: string;
       coverLetterLink?: string;
       companyNotes?: string;
       interviewDate?: string;
       interviewNotes?: string;
       reminderDate?: string;
       reminderNote?: string;
       tags: string[];
       questions?: InterviewQuestion[];
     }
     ```

3. **Reminders**
   - Storage Key: `reminders_<email>`
   - Contains user reminders
   - Array of reminder objects

4. **Theme Preferences**
   - Storage Key: `theme_preference`
   - Contains user's theme selection
   - Simple string value

5. **Authentication Token**
   - Storage Key: `auth_token`
   - Contains the authentication token for the current session
   - Simple string value (in a real app, this would be a JWT)

## Data Flow

### Authentication Flow

1. User enters credentials on the login page
2. AuthContext's `login` function is called
3. In demo mode, credentials are always accepted
4. User information is stored in localStorage
5. AuthContext updates the authentication state
6. User is redirected to the dashboard

### Job Application Management Flow

1. User adds a new job application through the JobForm
2. Job data is validated and a unique ID is generated
3. New job is added to the user's jobs array in localStorage
4. Dashboard component re-renders to display the updated data

### Data Filtering and Search

1. User enters search terms or selects status filters
2. Filter logic is applied to the jobs array
3. Filtered results are displayed without modifying the original data

## Demo Mode Data

In demo mode, the application generates sample data to demonstrate functionality without requiring actual API calls:

1. **Sample Job Applications**
   - Generated on first login
   - Provides realistic examples of different job statuses and details

2. **Sample Reminders**
   - Pre-populated reminder data
   - Shows different reminder states (completed, upcoming)

3. **Sample Analytics**
   - Based on the sample job applications
   - Demonstrates charts and success metrics

## Type Safety

TypeScript interfaces ensure data consistency throughout the application:

```typescript
export interface Job {
  id: string;
  title: string;
  company: string;
  dateApplied: string;
  status: string;
  notes: string;
  jobLink: string;
  resumeLink?: string;
  coverLetterLink?: string;
  companyNotes?: string;
  interviewDate?: string;
  interviewNotes?: string;
  reminderDate?: string;
  reminderNote?: string;
  tags: string[];
  questions?: InterviewQuestion[];
}

export interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
}

export interface JobState {
  jobs: Job[];
  filteredJobs: Job[];
  filters: {
    status: string | null;
    search: string;
  };
}
```

## Data Import/Export

The application supports exporting job application data to CSV format, allowing users to:

1. Download their job application data
2. Process it in spreadsheet applications
3. Backup their information

## Data Privacy and Security

Since all data is stored locally in the user's browser:

1. No data is sent to any servers
2. Data persists between sessions on the same device
3. Clearing browser storage will remove all application data
4. Multiple users on the same device should use different browsers or profiles to keep their data separate

## Future Enhancements

In a production environment, the localStorage approach would be replaced with:

1. A secure backend API for data storage and retrieval
2. Real authentication with JWT tokens
3. Database persistence for user data
4. Data encryption for sensitive information
5. Backup and recovery options
