
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Search, ExternalLink, Building, Users, DollarSign, Globe, Info } from 'lucide-react';

const CompanyResearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [companyData, setCompanyData] = useState<any>(null);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    
    // This is a mock function. In a real app, you would call an API
    setTimeout(() => {
      // Mock data for demonstration purposes
      if (searchTerm.toLowerCase().includes('apple')) {
        setCompanyData({
          name: 'Apple Inc.',
          industry: 'Technology',
          founded: '1976',
          headquarters: 'Cupertino, California',
          employees: '147,000+',
          revenue: '$365.8 billion (2021)',
          website: 'https://www.apple.com',
          description: 'Apple Inc. is an American multinational technology company that designs, develops, and sells consumer electronics, computer software, and online services.',
          culture: 'Apple is known for its focus on innovation, design, and quality. They have a secretive corporate culture and emphasize collaboration.',
          interviewProcess: 'Apple\'s interview process typically includes multiple rounds, with both technical and behavioral questions.'
        });
      } else if (searchTerm.toLowerCase().includes('google')) {
        setCompanyData({
          name: 'Google LLC',
          industry: 'Technology',
          founded: '1998',
          headquarters: 'Mountain View, California',
          employees: '135,000+',
          revenue: '$257.6 billion (2021)',
          website: 'https://www.google.com',
          description: 'Google is a technology company that specializes in Internet-related services and products, including online advertising technologies, a search engine, cloud computing, software, and hardware.',
          culture: 'Google has an open culture that encourages creativity and collaboration. They offer numerous perks and focus on work-life balance.',
          interviewProcess: 'Google\'s hiring process includes multiple interviews focusing on problem-solving abilities and cultural fit.'
        });
      } else {
        setCompanyData({
          name: searchTerm,
          industry: 'Information not available',
          founded: 'Information not available',
          headquarters: 'Information not available',
          employees: 'Information not available',
          revenue: 'Information not available',
          website: 'Information not available',
          description: 'No detailed information available for this company.',
          culture: 'Information not available',
          interviewProcess: 'Information not available'
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium mb-4">Company Research</h3>
      
      <div className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search for a company..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Research'}
          </Button>
        </div>
      </div>
      
      {companyData && (
        <Card>
          <CardHeader>
            <CardTitle>{companyData.name}</CardTitle>
            <CardDescription>Company information and research</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Building className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Industry</p>
                    <p>{companyData.industry}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Founded</p>
                    <p>{companyData.founded}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Globe className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Headquarters</p>
                    <p>{companyData.headquarters}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Users className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Employees</p>
                    <p>{companyData.employees}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <DollarSign className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Revenue</p>
                    <p>{companyData.revenue}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <ExternalLink className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Website</p>
                    <p>
                      {companyData.website !== 'Information not available' ? (
                        <a href={companyData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {companyData.website}
                        </a>
                      ) : (
                        companyData.website
                      )}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Company Description</h4>
                  <p className="text-sm text-gray-700">{companyData.description}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1">Company Culture</h4>
                  <p className="text-sm text-gray-700">{companyData.culture}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1">Interview Process</h4>
                  <p className="text-sm text-gray-700">{companyData.interviewProcess}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CompanyResearch;
