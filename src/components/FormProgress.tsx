import React from 'react';
import { useFormContext } from '../context/FormContext';
import { PenSquare, Upload, Eye, CheckCircle } from 'lucide-react';

const FormProgress: React.FC = () => {
  const { currentStep } = useFormContext();
  
  const steps = [
    { id: 1, name: 'Story Details', icon: PenSquare },
    { id: 2, name: 'Upload Files', icon: Upload },
    { id: 3, name: 'Review & Submit', icon: Eye }
  ];
  
  return (
    <div className="mb-10">
      <div className="hidden sm:flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Circle */}
            <div className="relative flex flex-col items-center group">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 
                ${currentStep > step.id ? 'bg-[#8E24AA] border-[#8E24AA]' : 
                  currentStep === step.id ? 'border-[#8E24AA] text-[#8E24AA]' : 
                  'border-gray-300 text-gray-400'}`}>
                {currentStep > step.id ? (
                  <CheckCircle className="w-5 h-5 text-white" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              <p className={`mt-2 text-sm font-medium 
                ${currentStep >= step.id ? 'text-[#8E24AA]' : 'text-gray-500'}`}>
                {step.name}
              </p>
            </div>
            
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4">
                <div className={`h-1 ${
                  currentStep > step.id + 1 ? 'bg-[#8E24AA]' : 
                  currentStep > step.id ? 'bg-gradient-to-r from-[#8E24AA] to-gray-200' : 
                  'bg-gray-200'
                }`}></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Mobile Steps */}
      <div className="flex sm:hidden items-center justify-between">
        <div className="w-full">
          <div className="flex items-center">
            <p className="text-sm font-medium text-[#8E24AA]">
              Step {currentStep} of {steps.length}: {steps[currentStep - 1].name}
            </p>
          </div>
          <div className="mt-2 w-full bg-gray-200 h-1 rounded">
            <div 
              className="bg-[#8E24AA] h-1 rounded transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormProgress;