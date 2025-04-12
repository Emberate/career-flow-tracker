
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus, Edit, Trash, Save, X, MessageSquare, BookOpen } from 'lucide-react';
import { InterviewQuestion } from '../types';

const commonQuestions = [
  {
    id: 'q1',
    question: 'Tell me about yourself',
    answer: 'Start with your current role, then briefly explain your background and experience relevant to the position. Highlight key achievements and skills, and end with why you're interested in this specific role and company.'
  },
  {
    id: 'q2',
    question: 'What is your greatest strength?',
    answer: 'Choose a strength that aligns with the job requirements. Provide specific examples of how you've demonstrated this strength in past roles, and explain how it would benefit the company in this new position.'
  },
  {
    id: 'q3',
    question: 'What is your greatest weakness?',
    answer: 'Select a genuine but not critical weakness, and focus on the steps you're taking to improve in this area. Show self-awareness and a commitment to professional growth.'
  },
  {
    id: 'q4',
    question: 'Why do you want to work here?',
    answer: 'Research the company beforehand. Mention specific aspects of the company's mission, values, products, or culture that appeal to you, and explain how your skills and goals align with the organization.'
  },
  {
    id: 'q5',
    question: 'Where do you see yourself in five years?',
    answer: 'Discuss your career aspirations related to the role and industry. Show ambition while being realistic, and emphasize your commitment to growing with the company long-term if that's your intention.'
  }
];

const InterviewQA = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userQuestions, setUserQuestions] = useState<InterviewQuestion[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<InterviewQuestion | null>(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [activeTab, setActiveTab] = useState('common');
  
  // Load user questions from localStorage
  React.useEffect(() => {
    const savedQuestions = localStorage.getItem('userInterviewQuestions');
    if (savedQuestions) {
      setUserQuestions(JSON.parse(savedQuestions));
    }
  }, []);
  
  // Save user questions to localStorage
  const saveUserQuestions = (questions: InterviewQuestion[]) => {
    localStorage.setItem('userInterviewQuestions', JSON.stringify(questions));
    setUserQuestions(questions);
  };

  const handleAddQuestion = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) return;
    
    const newQuestionObj = {
      id: `user-${Date.now()}`,
      question: newQuestion,
      answer: newAnswer
    };
    
    const updatedQuestions = [...userQuestions, newQuestionObj];
    saveUserQuestions(updatedQuestions);
    
    setNewQuestion('');
    setNewAnswer('');
  };
  
  const handleEditQuestion = (question: InterviewQuestion) => {
    setEditingQuestion(question);
    setNewQuestion(question.question);
    setNewAnswer(question.answer);
  };
  
  const handleSaveEdit = () => {
    if (!editingQuestion || !newQuestion.trim() || !newAnswer.trim()) return;
    
    const updatedQuestions = userQuestions.map(q => 
      q.id === editingQuestion.id 
        ? { ...q, question: newQuestion, answer: newAnswer } 
        : q
    );
    
    saveUserQuestions(updatedQuestions);
    
    setEditingQuestion(null);
    setNewQuestion('');
    setNewAnswer('');
  };
  
  const handleCancelEdit = () => {
    setEditingQuestion(null);
    setNewQuestion('');
    setNewAnswer('');
  };
  
  const handleDeleteQuestion = (id: string) => {
    const updatedQuestions = userQuestions.filter(q => q.id !== id);
    saveUserQuestions(updatedQuestions);
  };

  const filteredCommonQuestions = commonQuestions.filter(q => 
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredUserQuestions = userQuestions.filter(q => 
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium mb-4">Interview Q&A</h3>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search questions..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="common">
            <BookOpen className="h-4 w-4 mr-2" />
            Common Questions
          </TabsTrigger>
          <TabsTrigger value="my">
            <MessageSquare className="h-4 w-4 mr-2" />
            My Questions
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="common">
          <div className="space-y-4">
            {filteredCommonQuestions.length > 0 ? (
              filteredCommonQuestions.map(q => (
                <Card key={q.id}>
                  <CardHeader>
                    <CardTitle className="text-base">{q.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">{q.answer}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center py-4 text-gray-500">No questions match your search</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="my">
          <div className="mb-6 border p-4 rounded-lg">
            <h4 className="font-medium mb-2">
              {editingQuestion ? 'Edit Question' : 'Add New Question'}
            </h4>
            <div className="space-y-3">
              <div>
                <Input
                  placeholder="Enter your question"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                />
              </div>
              <div>
                <Textarea
                  placeholder="Enter your answer or template"
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2">
                {editingQuestion ? (
                  <>
                    <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                      <X size={14} className="mr-1" /> Cancel
                    </Button>
                    <Button size="sm" onClick={handleSaveEdit}>
                      <Save size={14} className="mr-1" /> Save Changes
                    </Button>
                  </>
                ) : (
                  <Button size="sm" onClick={handleAddQuestion}>
                    <Plus size={14} className="mr-1" /> Add Question
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredUserQuestions.length > 0 ? (
              filteredUserQuestions.map(q => (
                <Card key={q.id}>
                  <CardHeader>
                    <CardTitle className="text-base">{q.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">{q.answer}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditQuestion(q)}>
                      <Edit size={14} className="mr-1" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleDeleteQuestion(q.id)}>
                      <Trash size={14} className="mr-1" /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">
                <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <p className="mb-2">You haven't added any questions yet</p>
                <p className="text-sm">Add your own interview questions and answer templates</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InterviewQA;
