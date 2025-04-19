# ProspectPath Development Documentation

This guide provides information for developers who want to understand, modify, or extend the ProspectPath application.

## Development Setup

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher) or yarn (v1.22.0 or higher)

### Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd prospectpath
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

The project follows a standard React application structure:

```
src/
├── components/        # Reusable UI components
├── context/          # React context providers
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and libraries
├── pages/            # Top-level page components
├── types.ts          # TypeScript type definitions
└── documentation/    # Project documentation
```

## Tech Stack

- **React**: Frontend library for building user interfaces
- **TypeScript**: Static type checking
- **Vite**: Build tool and development server
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: Component library built on Radix UI
- **Recharts**: Charting library for visualizations
- **localStorage**: Browser storage for data persistence

## Extending the Application

### Adding a New Component

1. Create a new file in the appropriate directory under `/src/components/`
2. Define the component with TypeScript typing
3. Export the component
4. Import and use it in the relevant pages

Example:

```typescript
// src/components/NewComponent.tsx
import React from 'react';

interface NewComponentProps {
  title: string;
  description?: string;
}

const NewComponent: React.FC<NewComponentProps> = ({ title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-medium">{title}</h3>
      {description && <p className="text-gray-500">{description}</p>}
    </div>
  );
};

export default NewComponent;
```

### Adding a New Page

1. Create a new file in `/src/pages/`
2. Import PageLayout and other necessary components
3. Define the page component
4. Export the component
5. Add the route in `App.tsx`

Example:

```typescript
// src/pages/NewPage.tsx
import React from 'react';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';

const NewPage = () => {
  return (
    <PageLayout title="New Page" className="px-4 py-8">
      <PageHeader 
        title="New Page Title" 
        subtitle="This is a description of the new page" 
      />
      <div className="max-w-4xl mx-auto">
        {/* Page content */}
      </div>
    </PageLayout>
  );
};

export default NewPage;

// In App.tsx, add:
<Route path="/new-page" element={<NewPage />} />
```

### Adding a New Feature

To add a significant new feature:

1. Plan the feature and its components
2. Create necessary types in `types.ts`
3. Implement UI components
4. Add data management logic
5. Integrate with existing code
6. Test thoroughly

### Modifying Existing Features

When modifying existing features:

1. Locate the relevant components and files
2. Understand the current implementation
3. Make necessary changes
4. Test to ensure no regression issues

## State Management

The application uses React Context API for global state management:

- `AuthContext`: Manages user authentication state
- Component-level state: Used for UI-specific state with `useState` and `useReducer`

To add a new context:

1. Create a new file in `/src/context/`
2. Define the context, provider, and hook
3. Wrap relevant components with the provider

Example:

```typescript
// src/context/NewContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface NewContextType {
  value: string;
  setValue: (value: string) => void;
}

const NewContext = createContext<NewContextType | undefined>(undefined);

export const NewProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [value, setValue] = useState('');
  
  return (
    <NewContext.Provider value={{ value, setValue }}>
      {children}
    </NewContext.Provider>
  );
};

export const useNew = () => {
  const context = useContext(NewContext);
  if (context === undefined) {
    throw new Error('useNew must be used within a NewProvider');
  }
  return context;
};
```

## Data Management

The application uses localStorage for data persistence:

- Data is stored with user-specific keys
- TypeScript interfaces ensure data consistency

To modify the data structure:

1. Update relevant interfaces in `types.ts`
2. Update components that use the data
3. Consider backward compatibility for existing data

## Testing

For implementing tests:

1. Use Jest and React Testing Library
2. Create test files with `.test.tsx` extension alongside components
3. Use mock data for tests
4. Test UI rendering and user interactions

## Best Practices

- Follow the established project patterns and conventions
- Keep components small and focused on a single responsibility
- Use TypeScript for all new code
- Maintain responsive design across all new features
- Document complex logic and components
- Use descriptive variable and function names
- Follow the Tailwind CSS utility-first approach
- Make use of existing UI components from Shadcn UI
- Keep accessibility in mind when developing new features
