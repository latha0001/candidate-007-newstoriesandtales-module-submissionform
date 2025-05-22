import React from 'react';
import { useFormContext } from '../context/FormContext';
import { BookOpen, User, Hash, BookMarked, FileText } from 'lucide-react';

const Preview: React.FC = () => {
  const { formState } = useFormContext();
  
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="space-y-2">
        <h3 className="text-xl font-display text-[#8E24AA]">Review Your Submission</h3>
        <p className="text-sm text-gray-500">
          Please review your story details below before submitting.
        </p>
      </div>
      
      <div className="bg-[#FAFAFA] rounded-lg p-6 border border-gray-200">
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <div>
            <h4 className="flex items-center gap-2 text-gray-500 text-sm mb-1">
              <BookOpen size={16} className="text-[#8E24AA]" />
              Story Title
            </h4>
            <p className="font-display text-xl font-medium">{formState.title}</p>
          </div>
          
          <div>
            <h4 className="flex items-center gap-2 text-gray-500 text-sm mb-1">
              <User size={16} className="text-[#8E24AA]" />
              Author
            </h4>
            <p>{formState.author}</p>
          </div>
          
          <div>
            <h4 className="flex items-center gap-2 text-gray-500 text-sm mb-1">
              <Hash size={16} className="text-[#8E24AA]" />
              Genre
            </h4>
            <p>{formState.genre}</p>
          </div>
          
          <div>
            <h4 className="flex items-center gap-2 text-gray-500 text-sm mb-1">
              <BookMarked size={16} className="text-[#8E24AA]" />
              Submission Type
            </h4>
            <p className="capitalize">{formState.submissionType}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-gray-500 text-sm mb-2">Synopsis</h4>
          <div className="bg-white border border-gray-200 rounded-md p-4">
            <p className="text-gray-700 first-letter:text-3xl first-letter:font-display first-letter:font-bold first-letter:text-[#8E24AA] first-letter:mr-1 first-letter:float-left">
              {formState.synopsis}
            </p>
          </div>
        </div>
        
        <div>
          <h4 className="text-gray-500 text-sm mb-2">Files ({formState.files.length})</h4>
          <ul className="bg-white border border-gray-200 rounded-md divide-y">
            {formState.files.map((file, index) => (
              <li key={index} className="flex items-center gap-3 p-3">
                <FileText size={18} className="text-[#8E24AA]" />
                <span className="text-gray-700">{file.name}</span>
                <span className="text-xs text-gray-500 ml-auto">
                  {file.size < 1024 * 1024
                    ? `${(file.size / 1024).toFixed(1)} KB`
                    : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="bg-[#8E24AA]/5 border border-[#8E24AA]/20 rounded-md p-4">
        <h4 className="font-medium text-[#8E24AA] mb-2">Almost there!</h4>
        <p className="text-sm text-gray-600">
          By submitting, you confirm that this is your original work and agree to our terms and conditions.
        </p>
      </div>
    </div>
  );
};

export default Preview;