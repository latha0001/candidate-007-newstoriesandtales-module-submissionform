import React from 'react';
import SubmissionForm from './components/SubmissionForm';
import Header from './components/Header';
import { FormProvider } from './context/FormContext';

function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-body">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <FormProvider>
          <SubmissionForm />
        </FormProvider>
      </main>
      <footer className="bg-[#8E24AA] text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#FAFAFA] opacity-90">© 2025 NewStories & Tales. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;