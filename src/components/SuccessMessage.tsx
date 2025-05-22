import React from 'react';
import { CheckCircle2, ArrowRight, Home } from 'lucide-react';
import { useFormContext } from '../context/FormContext';

const SuccessMessage: React.FC = () => {
  const { formState, resetForm } = useFormContext();
  
  return (
    <div className="max-w-2xl mx-auto py-12 px-6 text-center animate-fadeIn">
      <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
        <CheckCircle2 size={32} className="text-green-500" />
      </div>
      
      <h2 className="text-3xl font-display font-bold text-[#8E24AA] mb-4">
        Submission Successful!
      </h2>
      
      <div className="bg-gradient-to-r from-[#8E24AA]/5 to-[#FFB300]/5 rounded-lg p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://images.pexels.com/photos/4119736/pexels-photo-4119736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center"></div>
        <div className="relative">
          <p className="text-lg text-gray-700 first-letter:text-4xl first-letter:font-display first-letter:font-bold first-letter:text-[#8E24AA] first-letter:mr-2 first-letter:float-left">
            Thank you for submitting "{formState.title}"! Your story has been received and is now in our review queue. Our editorial team will carefully review your submission and get back to you within 5-7 business days.
          </p>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-display font-bold text-gray-700 mb-3">Submission Details</h3>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 inline-block">
          <ul className="text-left space-y-2">
            <li className="flex items-center gap-2">
              <span className="font-medium">Submission ID:</span> 
              <span className="text-[#8E24AA]">{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="font-medium">Title:</span> 
              <span>{formState.title}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="font-medium">Author:</span> 
              <span>{formState.author}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="font-medium">Date:</span> 
              <span>{new Date().toLocaleDateString()}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => resetForm()}
          className="px-6 py-3 bg-[#8E24AA] text-white rounded-md hover:bg-[#7B1FA2] transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <span>Submit Another Story</span>
          <ArrowRight size={16} />
        </button>
        
        <button
          onClick={() => window.location.href = '/'}
          className="px-6 py-3 border border-[#8E24AA] text-[#8E24AA] rounded-md hover:bg-[#8E24AA]/5 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Home size={16} />
          <span>Return Home</span>
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;