
# CareerFlow FAQ

## General Questions

### What is CareerFlow?

CareerFlow is a comprehensive job application tracking system that helps job seekers organize and optimize their job search process. It provides tools for tracking applications, managing interviews, setting reminders, and visualizing job search progress.

### Is CareerFlow free to use?

Yes, the core features of CareerFlow are free to use. The application is currently in demo mode, which means all features are available without any restrictions.

### Do I need to create an account?

Yes, you need to create an account to use CareerFlow. However, in demo mode, you can use any email and password to create an account or log in.

### How is my data stored?

In the current implementation, all data is stored locally in your browser's localStorage. This means:
- Your data stays on your device
- Data persists between sessions on the same browser
- Clearing browser data will remove your saved information
- Your data is not shared between different devices

### Can I use CareerFlow on multiple devices?

Since data is stored locally in your browser, your data won't automatically sync between devices. In a future version, cloud synchronization may be added.

## Features and Usage

### How do I add a new job application?

1. Navigate to the dashboard
2. Click the "Add Job" button
3. Fill in the job details form
4. Click "Save"

### How do I track my application status?

Each job application has a status that you can update:
1. Open the job details
2. Change the status dropdown to the appropriate value (Applied, Interview, Offer, Rejected)
3. Save the changes

### Can I set reminders for follow-ups?

Yes, you can create reminders for follow-ups:
1. Navigate to the Reminders section
2. Click "Add Reminder"
3. Set the date, time, and details for the reminder
4. Click "Save"

### How do I prepare for interviews?

CareerFlow includes an Interview Q&A feature:
1. Navigate to the Interview Q&A section
2. Browse common interview questions
3. Add your own questions and answers
4. Practice your responses

### How do I view my job search analytics?

The Analytics Dashboard on the main page provides:
- Status distribution chart
- Monthly application trends
- Success metrics like interview rate and offer rate
- Detailed statistics

### Can I export my data?

Yes, you can export your job application data:
1. Go to your profile
2. Click "Export Data"
3. Choose the download location

### How do I change the theme?

1. Click on the theme button in the navigation bar
2. Select from available themes:
   - Light (default)
   - Dark
   - Purple
   - Green
   - Blue

## Troubleshooting

### I lost all my data. Can I recover it?

If you cleared your browser data or localStorage, unfortunately, data cannot be recovered in the current implementation. This is why we recommend periodically exporting your data as a backup.

### Why can't I see my changes reflected immediately?

All changes should be reflected immediately. If you're experiencing issues:
1. Refresh the page
2. Check if you're logged in
3. Ensure your browser supports localStorage
4. Verify you haven't reached localStorage limits (typically 5-10MB)

### The application is not working correctly. What should I do?

If you encounter issues:
1. Clear your browser cache and reload
2. Try using a different browser
3. Check your browser's console for any error messages
4. Contact support through the contact form if issues persist

### How can I delete my account?

In the current demo version, there is no need to delete accounts as all data is stored locally. Simply clearing your browser data will effectively "delete" your account.

## Technical Questions

### What technologies does CareerFlow use?

CareerFlow is built with:
- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- React Router
- Recharts for data visualization

### Can I contribute to the project?

CareerFlow is currently a demo project. If it becomes open-source in the future, contribution guidelines will be provided.

### Is the application secure?

The current implementation uses localStorage which is:
- Accessible only to scripts from the same origin
- Not transmitted to any servers
- Private to your specific browser profile

However, it's not encrypted, so sensitive information should be handled with care.

### Does CareerFlow work offline?

Yes, once loaded, the application can function offline as it uses local browser storage for data management.

## Contact and Support

### How do I get help if I have questions?

You can:
1. Check this FAQ for common questions
2. Visit the Help Center for detailed guides
3. Contact support through the contact form

### Can I request new features?

Yes, feature requests can be submitted through the contact form. While we can't guarantee implementation, we value user feedback for future development.

### How do I report a bug?

Bugs can be reported through the contact form. Please include:
1. A description of the issue
2. Steps to reproduce the problem
3. Your browser and device information
4. Screenshots if available
