
import React from 'react';
import { Button } from '@/components/ui/button';

const ContactForm = () => {
  return (
    <form className="space-y-6 max-w-2xl mx-auto bg-gray-900/50 p-8 rounded-xl border border-gray-800 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-white">Name</label>
          <input
            id="name"
            type="text"
            className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            placeholder="Your name"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-white">Email</label>
          <input
            id="email"
            type="email"
            className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            placeholder="Your email"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="text-white">Subject</label>
        <input
          id="subject"
          type="text"
          className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          placeholder="How can we help you?"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-white">Message</label>
        <textarea
          id="message"
          rows={6}
          className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          placeholder="Please describe your question or issue in detail..."
        ></textarea>
      </div>
      <Button type="submit" className="w-full py-6 text-lg">Send Message</Button>
    </form>
  );
};

export default ContactForm;
