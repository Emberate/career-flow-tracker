
# Job Tracker Application Documentation

## Overview

This application is a comprehensive job tracking system that helps users manage their job application process. The application offers various features such as job application tracking, interview scheduling, analytics, and more.

## Pages

### 1. Dashboard (`/dashboard`)
The main page of the application where users can:
- View and manage job applications
- Track application statuses
- View analytics
- Access all major features

### 2. Login (`/login`)
Authentication page for existing users to login.

### 3. Signup (`/signup`)
Registration page for new users.

### 4. Profile (`/profile`)
User profile management page.

### 5. Product (`/product`)
Product information page.

### 6. Features (`/features`)
Detailed feature listings page.

### 7. How It Works (`/how-it-works`)
Page explaining the application's workflow.

### 8. Pricing (`/pricing`)
Subscription plans and pricing information.

### 9. Support (`/support`)
Support information and resources.

### 10. Help Center (`/help`)
Comprehensive help resources.

### 11. Contact (`/contact`)
Contact form and information.

### 12. FAQ (`/faq`)
Frequently asked questions.

## Key Features

### 1. Job Tracking
- Add, edit, and delete job applications
- Track status: Applied, Interview, Offer, Rejected
- Add notes, company details, and application dates
- Store resume and cover letter links

### 2. Status Filters
- Filter jobs by status (Applied, Interview, Offer, Rejected)
- Search functionality for job titles, companies, and notes

### 3. Analytics Dashboard
- Visual representation of application status distribution
- Monthly application trends
- Success rate metrics

### 4. Interview Calendar
- Schedule and track interview dates
- View upcoming interviews

### 5. Reminders
- Set reminders for follow-ups and deadlines
- Mark reminders as completed
- Get notifications for upcoming events

### 6. Company Research
- Access company information
- Add notes about company culture and values
- Track key contacts

### 7. Success Metrics
- Track application success rate
- Identify improvement areas
- Visualize progress over time

### 8. Interview Q&A
- Access common interview questions
- Save your own question and answer templates
- Search functionality for quick access

### 9. Theme Customization
- Switch between different color themes:
  - Light (default)
  - Dark
  - Purple
  - Green
  - Blue

## Data Storage

The application uses localStorage for data persistence, which includes:
- Job applications
- User questions
- Reminders
- Theme preferences

## Component Structure

### Main Components
1. `PageLayout.tsx` - Base layout for all pages
2. `Navbar.tsx` - Navigation header
3. `Footer.tsx` - Page footer
4. `JobCard.tsx` - Individual job listing card
5. `JobForm.tsx` - Form for adding/editing jobs

### Dashboard Components
1. `JobAnalytics.tsx` - Charts and metrics
2. `InterviewCalendar.tsx` - Calendar view for interviews
3. `Reminders.tsx` - Reminder management
4. `CompanyResearch.tsx` - Company information
5. `SuccessMetrics.tsx` - Success tracking metrics
6. `InterviewQA.tsx` - Interview questions and answers
7. `ThemeSwitcher.tsx` - Theme selection and customization

## Customization

### Changing Themes
1. Click on the "Theme" button in the dashboard header
2. Select from available themes:
   - Light: Default light theme
   - Dark: Dark mode for reduced eye strain
   - Purple: Purple accent theme
   - Green: Green accent theme
   - Blue: Blue accent theme

The theme selection is remembered between sessions using localStorage.

## Routes

All routes are defined in `App.tsx` using React Router:

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/product" element={<Product />} />
    <Route path="/features" element={<Features />} />
    <Route path="/how-it-works" element={<HowItWorks />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/support" element={<Support />} />
    <Route path="/help" element={<HelpCenter />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```
