
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
  buttonLink?: string;
}

const PricingCard = ({
  name,
  price,
  description,
  features,
  isPopular = false,
  buttonText = "Get Started",
  buttonLink = "/signup"
}: PricingCardProps) => {
  return (
    <div 
      className={`rounded-xl border overflow-hidden transition-all duration-500 hover:scale-105 animate-fade-in ${
        isPopular 
          ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
          : 'border-gray-800 hover:border-gray-700'
      }`}
    >
      {isPopular && (
        <div className="bg-blue-500 text-white text-center py-1 text-sm font-semibold">
          Most Popular
        </div>
      )}
      <div className="p-6 bg-gray-900/30">
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold text-white">{price}</span>
          {price !== "Free" && <span className="text-gray-400 ml-2">/month</span>}
        </div>
        <p className="text-gray-300 mb-6">{description}</p>
        <Link to={buttonLink}>
          <Button 
            className={`w-full ${
              isPopular ? 'bg-blue-500 hover:bg-blue-600' : ''
            }`}
          >
            {buttonText}
          </Button>
        </Link>
      </div>
      <div className="p-6 bg-gray-900/10">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="text-green-400 h-5 w-5 mr-2 mt-0.5" />
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingCard;
