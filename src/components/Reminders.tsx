
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Bell, Calendar as CalendarIcon, Trash, Plus, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Job } from '../types';

interface Reminder {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  date: string;
  note: string;
  completed: boolean;
}

const Reminders = () => {
  const { user } = useAuth();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [filteredReminders, setFilteredReminders] = useState<Reminder[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [reminderNote, setReminderNote] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

  // Load reminders and jobs from localStorage
  useEffect(() => {
    if (user?.email) {
      const savedReminders = localStorage.getItem(`reminders_${user.email}`);
      if (savedReminders) {
        setReminders(JSON.parse(savedReminders));
      }
      
      const savedJobs = localStorage.getItem(`jobs_${user.email}`);
      if (savedJobs) {
        setJobs(JSON.parse(savedJobs));
      }
    }
  }, [user]);

  // Filter reminders
  useEffect(() => {
    let filtered = [...reminders];
    
    if (!showCompleted) {
      filtered = filtered.filter(reminder => !reminder.completed);
    }
    
    // Sort by date (most recent first)
    filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    setFilteredReminders(filtered);
  }, [reminders, showCompleted]);

  // Save reminders to localStorage
  const saveReminders = (updatedReminders: Reminder[]) => {
    if (user?.email) {
      localStorage.setItem(`reminders_${user.email}`, JSON.stringify(updatedReminders));
      setReminders(updatedReminders);
    }
  };

  const handleAddReminder = () => {
    if (!selectedJob || !selectedDate || !reminderNote.trim()) return;
    
    const selectedJobData = jobs.find(job => job.id === selectedJob);
    if (!selectedJobData) return;
    
    const newReminder: Reminder = {
      id: `reminder-${Date.now()}`,
      jobId: selectedJob,
      jobTitle: selectedJobData.title,
      company: selectedJobData.company,
      date: selectedDate.toISOString(),
      note: reminderNote,
      completed: false
    };
    
    const updatedReminders = [...reminders, newReminder];
    saveReminders(updatedReminders);
    
    // Reset form
    setSelectedJob('');
    setReminderNote('');
  };

  const handleToggleComplete = (id: string) => {
    const updatedReminders = reminders.map(reminder => 
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    );
    
    saveReminders(updatedReminders);
  };

  const handleDeleteReminder = (id: string) => {
    const updatedReminders = reminders.filter(reminder => reminder.id !== id);
    saveReminders(updatedReminders);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Reminders</h3>
        <Button variant="outline" size="sm" onClick={() => setShowCompleted(!showCompleted)}>
          {showCompleted ? 'Hide Completed' : 'Show Completed'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-4">Add New Reminder</h4>
          <Card>
            <CardContent className="pt-6 pb-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="job" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Job
                  </label>
                  <select
                    id="job"
                    value={selectedJob}
                    onChange={(e) => setSelectedJob(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select a job application</option>
                    {jobs.map(job => (
                      <option key={job.id} value={job.id}>
                        {job.title} at {job.company}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reminder Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                    Reminder Note
                  </label>
                  <Input
                    id="note"
                    value={reminderNote}
                    onChange={(e) => setReminderNote(e.target.value)}
                    placeholder="E.g., Follow up on application, prepare for interview, etc."
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleAddReminder} disabled={!selectedJob || !selectedDate || !reminderNote.trim()}>
                <Plus size={14} className="mr-1" /> Add Reminder
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <h4 className="font-medium mb-4">Upcoming Reminders</h4>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {filteredReminders.length > 0 ? (
              filteredReminders.map(reminder => (
                <Card key={reminder.id} className={cn(reminder.completed && "opacity-60")}>
                  <CardHeader className="py-3 px-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">{reminder.jobTitle}</CardTitle>
                      <Badge variant={reminder.completed ? "outline" : "default"} className="ml-2">
                        {format(new Date(reminder.date), "MMM d")}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-0">{reminder.company}</p>
                  </CardHeader>
                  <CardContent className="py-0 px-4">
                    <p className="text-sm">{reminder.note}</p>
                  </CardContent>
                  <CardFooter className="py-2 px-4 flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(reminder.completed && "bg-green-50")}
                      onClick={() => handleToggleComplete(reminder.id)}
                    >
                      <CheckCircle2 size={14} className={cn("mr-1", reminder.completed && "text-green-500")} />
                      {reminder.completed ? "Completed" : "Mark Complete"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600"
                      onClick={() => handleDeleteReminder(reminder.id)}
                    >
                      <Trash size={14} className="mr-1" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Bell className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <p className="mb-2">No reminders</p>
                <p className="text-sm">
                  {showCompleted 
                    ? "You don't have any reminders yet" 
                    : "You don't have any active reminders"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminders;
