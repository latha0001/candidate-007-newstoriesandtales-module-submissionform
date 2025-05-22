import React, { useCallback, useState } from 'react';
import { useFormContext } from '../context/FormContext';
import { Upload, X, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react';

const FileUploader: React.FC = () => {
  const { formState, updateFormField, errors, touched, setTouched } = useFormContext();
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };
  
  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const acceptedTypes = [
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'text/markdown'
      ];
      return acceptedTypes.includes(file.type);
    });
    
    if (validFiles.length !== fileArray.length) {
      alert('Some files were not accepted. We only accept PDF, DOC, DOCX, TXT and MD files.');
    }
    
    if (validFiles.length > 0) {
      updateFormField('files', [...formState.files, ...validFiles]);
      setTouched('files');
    }
  };
  
  const removeFile = (index: number) => {
    const updatedFiles = [...formState.files];
    updatedFiles.splice(index, 1);
    updateFormField('files', updatedFiles);
  };
  
  const getFileIcon = (file: File) => {
    if (file.type === 'application/pdf') {
      return <FileText className="text-red-500" size={18} />;
    } else if (file.type.includes('word')) {
      return <FileText className="text-blue-500" size={18} />;
    } else {
      return <FileText className="text-gray-500" size={18} />;
    }
  };
  
  const getFileSize = (size: number) => {
    if (size < 1024) {
      return `${size} bytes`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    }
  };
  
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="space-y-2">
        <h4 className="text-gray-700 font-medium">Upload Your Story Files</h4>
        <p className="text-sm text-gray-500">
          Accepted formats: PDF, DOC, DOCX, TXT, MD. Maximum file size: 10MB per file.
        </p>
      </div>
      
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragging
            ? 'border-[#8E24AA] bg-[#8E24AA]/5'
            : errors.files && touched.files
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300 hover:border-[#8E24AA]/50 hover:bg-[#8E24AA]/5'
        }`}
      >
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className={`p-3 rounded-full ${
            isDragging ? 'bg-[#8E24AA]/20' : 'bg-gray-100'
          }`}>
            <Upload size={24} className={isDragging ? 'text-[#8E24AA]' : 'text-gray-400'} />
          </div>
          <div>
            <p className="font-medium text-gray-700">
              Drag and drop your files here, or{' '}
              <label className="text-[#8E24AA] cursor-pointer hover:underline">
                browse
                <input
                  type="file"
                  multiple
                  onChange={handleFileInput}
                  accept=".pdf,.doc,.docx,.txt,.md"
                  className="hidden"
                />
              </label>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              You can upload multiple files
            </p>
          </div>
        </div>
      </div>
      
      {errors.files && touched.files && (
        <div className="flex items-center gap-2 text-red-500 text-sm">
          <AlertTriangle size={16} />
          <span>{errors.files}</span>
        </div>
      )}
      
      {formState.files.length > 0 && (
        <div className="space-y-3 mt-6">
          <h4 className="text-gray-700 font-medium flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-500" />
            Files Ready for Upload ({formState.files.length})
          </h4>
          <ul className="space-y-2">
            {formState.files.map((file, index) => (
              <li 
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-white border rounded-md shadow-sm"
              >
                <div className="flex items-center gap-3">
                  {getFileIcon(file)}
                  <div>
                    <p className="font-medium text-gray-700 truncate max-w-[200px] sm:max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">{getFileSize(file.size)}</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploader;