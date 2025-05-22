import React, { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import StoryMetadata from './StoryMetadata';
import FileUploader from './FileUploader';
import Preview from './Preview';
import SuccessMessage from './SuccessMessage';
import FormProgress from './FormProgress';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

const SubmissionForm: React.FC = () => {
  const { 
    currentStep, 
    isValid, 
    submitForm, 
    formState, 
    isSubmitting, 
    submitSuccess, 
    errors,
    nextStep,
    prevStep 
  } = useFormContext();
  
  const [showErrorSummary, setShowErrorSummary] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValid()) {
      setShowErrorSummary(true);
      return;
    }
    
    submitForm();
  };

  const handleNext = () => {
    if (isValid(currentStep)) {
      nextStep();
      setShowErrorSummary(false);
    } else {
      setShowErrorSummary(true);
    }
  };

  if (submitSuccess) {
    return <SuccessMessage />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-[#8E24AA] mb-3">Submit Your Story</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Share your creative stories and book chapters with our community of passionate writers and readers.
        </p>
      </div>
      
      <FormProgress />
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#8E24AA]/5 to-[#FFB300]/5">
          <h3 className="font-display text-xl text-[#8E24AA] mb-1">
            {currentStep === 1 ? 'Story Details' : 
             currentStep === 2 ? 'Upload Files' :
             'Preview & Submit'}
          </h3>
          <p className="text-sm text-gray-500">
            {currentStep === 1 ? 'Tell us about your story' : 
             currentStep === 2 ? 'Upload your story files' :
             'Review your submission before submitting'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {currentStep === 1 && <StoryMetadata />}
          {currentStep === 2 && <FileUploader />}
          {currentStep === 3 && <Preview />}
          
          {showErrorSummary && Object.keys(errors).length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6 animate-fadeIn">
              <div className="flex items-start">
                <AlertTriangle className="text-red-500 mr-3 mt-0.5" size={18} />
                <div>
                  <h4 className="text-red-800 font-medium mb-1">Please fix the following errors:</h4>
                  <ul className="text-red-700 text-sm list-disc pl-5 space-y-1">
                    {Object.entries(errors).map(([field, message]) => (
                      <li key={field}>{message}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-between mt-8">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-[#8E24AA] text-[#8E24AA] rounded-md hover:bg-[#8E24AA]/5 transition-colors duration-200"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-[#8E24AA] text-white rounded-md hover:bg-[#7B1FA2] transition-colors duration-200"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 flex items-center gap-2 bg-[#8E24AA] text-white rounded-md hover:bg-[#7B1FA2] transition-colors duration-200 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Story'}
                {!isSubmitting && <CheckCircle2 size={18} />}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmissionForm;