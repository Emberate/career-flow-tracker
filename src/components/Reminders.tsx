
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Bell, Calendar as CalendarIcon, Trash, Plus, CheckCircle2, Clock } from 'lucide-react';
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
    <div className="dashboard-card bg-gray-900/70 backdrop-blur-md rounded-lg shadow-lg p-6 border border-white/10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Bell className="h-5 w-5 text-yellow-400 mr-2" />
          <h3 className="text-lg font-medium dashboard-text">Reminders & Follow-ups</h3>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 text-gray-200"
          onClick={() => setShowCompleted(!showCompleted)}
        >
          {showCompleted ? (
            <span className="flex items-center">
              <CheckCircle2 size={14} className="mr-1 text-green-400" />
              Hide Completed
            </span>
          ) : (
            <span className="flex items-center">
              <Clock size={14} className="mr-1 text-yellow-400" />
              Show All
            </span>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-4 dashboard-text text-blue-300 flex items-center">
            <Plus size={16} className="mr-2" />
            Add New Reminder
          </h4>
          <Card className="dashboard-card bg-gray-800/50 border-gray-700 shadow-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-purple-900/5 pointer-events-none"></div>
            <CardContent className="pt-6 pb-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="job" className="block text-sm font-medium dashboard-text mb-1 text-gray-300">
                    Select Job
                  </label>
                  <select
                    id="job"
                    value={selectedJob}
                    onChange={(e) => setSelectedJob(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-gray-200 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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
                  <label className="block text-sm font-medium dashboard-text mb-1 text-gray-300">
                    Reminder Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-gray-700 bg-gray-800/50 text-gray-200 hover:bg-gray-700/50",
                          !selectedDate && "text-gray-500"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700 calendar-container">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        className="calendar-dark"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <label htmlFor="note" className="block text-sm font-medium dashboard-text mb-1 text-gray-300">
                    Reminder Note
                  </label>
                  <Input
                    id="note"
                    value={reminderNote}
                    onChange={(e) => setReminderNote(e.target.value)}
                    placeholder="E.g., Follow up on application, prepare for interview, etc."
                    className="bg-gray-800/50 text-gray-200 border-gray-700 focus:ring-blue-500"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t border-gray-700/50 py-3">
              <Button 
                onClick={handleAddReminder} 
                disabled={!selectedJob || !selectedDate || !reminderNote.trim()}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 border-0 transition-all duration-300"
              >
                <Plus size={14} className="mr-1" /> Add Reminder
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <h4 className="font-medium mb-4 dashboard-text text-yellow-300 flex items-center">
            <Clock size={16} className="mr-2" />
            Upcoming Reminders
          </h4>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredReminders.length > 0 ? (
              filteredReminders.map(reminder => (
                <Card 
                  key={reminder.id} 
                  className={cn(
                    "dashboard-card bg-gray-800/50 border-gray-700 shadow-md overflow-hidden relative", 
                    reminder.completed && "opacity-60"
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-purple-900/5 pointer-events-none"></div>
                  <CardHeader className="py-3 px-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base dashboard-text text-white">{reminder.jobTitle}</CardTitle>
                      <Badge 
                        variant={reminder.completed ? "outline" : "default"} 
                        className={cn(
                          "ml-2", 
                          !reminder.completed && "bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30",
                          reminder.completed && "border-green-500/50 text-green-400"
                        )}
                      >
                        {format(new Date(reminder.date), "MMM d")}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 mt-0">{reminder.company}</p>
                  </CardHeader>
                  <CardContent className="py-0 px-4">
                    <p className="text-sm dashboard-text text-gray-300">{reminder.note}</p>
                  </CardContent>
                  <CardFooter className="py-2 px-4 flex justify-end gap-2 border-t border-gray-700/50">
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "border-gray-700 text-gray-300 hover:bg-gray-700/50",
                        reminder.completed && "bg-green-900/30 border-green-700/50"
                      )}
                      onClick={() => handleToggleComplete(reminder.id)}
                    >
                      <CheckCircle2 size={14} className={cn("mr-1", reminder.completed && "text-green-500")} />
                      {reminder.completed ? "Completed" : "Mark Complete"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-red-400 hover:bg-red-900/20 hover:border-red-700/50"
                      onClick={() => handleDeleteReminder(reminder.id)}
                    >
                      <Trash size={14} className="mr-1" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-10 rounded-lg border border-gray-700/50 bg-gray-800/30">
                <div className="rounded-full bg-yellow-500/10 w-16 h-16 mx-auto flex items-center justify-center mb-3">
                  <Bell className="h-8 w-8 text-yellow-400/70" />
                </div>
                <p className="text-gray-300 mb-2 font-medium">No reminders</p>
                <p className="text-sm text-gray-400 max-w-xs mx-auto">
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
