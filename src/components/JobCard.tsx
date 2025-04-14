
import React from 'react';
import { Job } from '../types';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Edit, 
  Trash2,
  Briefcase,
  Building,
  ExternalLink
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (jobId: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'applied':
      return 'bg-blue-100 text-blue-800';
    case 'interview':
      return 'bg-yellow-100 text-yellow-800';
    case 'offer':
      return 'bg-green-100 text-green-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const JobCard: React.FC<JobCardProps> = ({ job, onEdit, onDelete }) => {
  const { toast } = useToast();
  const statusClass = getStatusColor(job.status);
  const applied = new Date(job.dateApplied);
  const timeAgo = formatDistanceToNow(applied, { addSuffix: true });

  const handleDelete = () => {
    try {
      if (!job.id) {
        toast({
          title: "Error",
          description: "Job ID is missing. Cannot delete.",
          variant: "destructive",
        });
        return;
      }
      onDelete(job.id);
    } catch (error) {
      console.error("Error in delete handler:", error);
      toast({
        title: "Error",
        description: "Failed to process delete request.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{job.title}</h3>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
            {job.status}
          </span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <Building size={16} className="mr-2" />
          <span>{job.company}</span>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <Calendar size={14} className="mr-2" />
          <span>Applied {timeAgo}</span>
        </div>
        
        {job.notes && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.notes}</p>
        )}
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEdit(job)}
              className="text-gray-600"
            >
              <Edit size={16} className="mr-1" />
              Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDelete}
              className="text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 size={16} className="mr-1" />
              Delete
            </Button>
          </div>
          
          {job.jobLink && (
            <a 
              href={job.jobLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary hover:text-primary-dark hover:underline text-sm"
            >
              <ExternalLink size={14} className="mr-1" />
              View Job
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
