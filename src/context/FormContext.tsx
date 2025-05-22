import React, { createContext, useContext, useState } from 'react';

interface FormState {
  title: string;
  author: string;
  genre: string;
  submissionType: 'story' | 'chapter' | '';
  synopsis: string;
  files: File[];
}

interface Touched {
  title: boolean;
  author: boolean;
  genre: boolean;
  submissionType: boolean;
  synopsis: boolean;
  files: boolean;
}

interface Errors {
  [key: string]: string;
}

interface FormContextType {
  formState: FormState;
  updateFormField: (field: keyof FormState, value: any) => void;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  errors: Errors;
  touched: Touched;
  setTouched: (field: keyof Touched) => void;
  isValid: (step?: number) => boolean;
  submitForm: () => void;
  isSubmitting: boolean;
  submitSuccess: boolean;
  resetForm: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formState, setFormState] = useState<FormState>({
    title: '',
    author: '',
    genre: '',
    submissionType: '',
    synopsis: '',
    files: []
  });
  
  const [touched, setTouchedFields] = useState<Touched>({
    title: false,
    author: false,
    genre: false,
    submissionType: false,
    synopsis: false,
    files: false
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const updateFormField = (field: keyof FormState, value: any) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };
  
  const setTouched = (field: keyof Touched) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
  };
  
  const validateStep = (step: number): Errors => {
    const errors: Errors = {};
    
    if (step === 1) {
      if (!formState.title.trim()) {
        errors.title = 'Title is required';
      }
      
      if (!formState.author.trim()) {
        errors.author = 'Author name is required';
      }
      
      if (!formState.genre) {
        errors.genre = 'Please select a genre';
      }
      
      if (!formState.submissionType) {
        errors.submissionType = 'Please select a submission type';
      }
      
      if (!formState.synopsis.trim()) {
        errors.synopsis = 'Synopsis is required';
      } else if (formState.synopsis.length > 500) {
        errors.synopsis = 'Synopsis must be less than 500 characters';
      }
    }
    
    if (step === 2) {
      if (formState.files.length === 0) {
        errors.files = 'Please upload at least one file';
      }
    }
    
    return errors;
  };
  
  const validateAll = (): Errors => {
    const step1Errors = validateStep(1);
    const step2Errors = validateStep(2);
    
    return { ...step1Errors, ...step2Errors };
  };
  
  const isValid = (step?: number): boolean => {
    const errorsToCheck = step ? validateStep(step) : validateAll();
    return Object.keys(errorsToCheck).length === 0;
  };
  
  const nextStep = () => {
    const errors = validateStep(currentStep);
    
    if (Object.keys(errors).length === 0) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };
  
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const submitForm = () => {
    const errors = validateAll();
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
      }, 1500);
    }
  };
  
  const resetForm = () => {
    setFormState({
      title: '',
      author: '',
      genre: '',
      submissionType: '',
      synopsis: '',
      files: []
    });
    setTouchedFields({
      title: false,
      author: false,
      genre: false,
      submissionType: false,
      synopsis: false,
      files: false
    });
    setCurrentStep(1);
    setSubmitSuccess(false);
  };
  
  return (
    <FormContext.Provider value={{
      formState,
      updateFormField,
      currentStep,
      nextStep,
      prevStep,
      errors: touched.title || touched.author || touched.genre || touched.submissionType || touched.synopsis || touched.files
        ? validateAll()
        : {},
      touched,
      setTouched,
      isValid,
      submitForm,
      isSubmitting,
      submitSuccess,
      resetForm
    }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};