import React from 'react';
import { useFormContext } from '../context/FormContext';
import { BookText, Hash, User, AlignJustify, BookMarked } from 'lucide-react';

const StoryMetadata: React.FC = () => {
  const { formState, updateFormField, errors, touched, setTouched } = useFormContext();
  
  const genres = [
    'Fantasy', 'Science Fiction', 'Mystery', 'Thriller', 'Romance', 
    'Historical Fiction', 'Young Adult', 'Children\'s', 'Horror', 'Poetry'
  ];
  
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium" htmlFor="title">
            <span className="flex items-center gap-2">
              <BookText size={16} className="text-[#8E24AA]" />
              Story Title
              <span className="text-red-500">*</span>
            </span>
          </label>
          <input
            type="text"
            id="title"
            value={formState.title}
            onChange={(e) => updateFormField('title', e.target.value)}
            onBlur={() => setTouched('title')}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E24AA]/50 transition-all duration-200 ${
              errors.title && touched.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your story title"
          />
          {errors.title && touched.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium" htmlFor="author">
            <span className="flex items-center gap-2">
              <User size={16} className="text-[#8E24AA]" />
              Author Name
              <span className="text-red-500">*</span>
            </span>
          </label>
          <input
            type="text"
            id="author"
            value={formState.author}
            onChange={(e) => updateFormField('author', e.target.value)}
            onBlur={() => setTouched('author')}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E24AA]/50 transition-all duration-200 ${
              errors.author && touched.author ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Your pen name or real name"
          />
          {errors.author && touched.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="block text-gray-700 font-medium" htmlFor="genre">
          <span className="flex items-center gap-2">
            <Hash size={16} className="text-[#8E24AA]" />
            Genre
            <span className="text-red-500">*</span>
          </span>
        </label>
        <select
          id="genre"
          value={formState.genre}
          onChange={(e) => updateFormField('genre', e.target.value)}
          onBlur={() => setTouched('genre')}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E24AA]/50 transition-all duration-200 ${
            errors.genre && touched.genre ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select a genre</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
        {errors.genre && touched.genre && (
          <p className="text-red-500 text-sm mt-1">{errors.genre}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label className="block text-gray-700 font-medium" htmlFor="submissionType">
          <span className="flex items-center gap-2">
            <BookMarked size={16} className="text-[#8E24AA]" />
            Submission Type
            <span className="text-red-500">*</span>
          </span>
        </label>
        <div className="flex gap-6 mt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="submissionType"
              value="story"
              checked={formState.submissionType === 'story'}
              onChange={() => updateFormField('submissionType', 'story')}
              className="w-4 h-4 text-[#8E24AA] focus:ring-[#8E24AA]"
            />
            <span>Complete Story</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="submissionType"
              value="chapter"
              checked={formState.submissionType === 'chapter'}
              onChange={() => updateFormField('submissionType', 'chapter')}
              className="w-4 h-4 text-[#8E24AA] focus:ring-[#8E24AA]"
            />
            <span>Book Chapter</span>
          </label>
        </div>
        {errors.submissionType && touched.submissionType && (
          <p className="text-red-500 text-sm mt-1">{errors.submissionType}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label className="block text-gray-700 font-medium" htmlFor="synopsis">
          <span className="flex items-center gap-2">
            <AlignJustify size={16} className="text-[#8E24AA]" />
            Synopsis
            <span className="text-red-500">*</span>
          </span>
        </label>
        <textarea
          id="synopsis"
          value={formState.synopsis}
          onChange={(e) => updateFormField('synopsis', e.target.value)}
          onBlur={() => setTouched('synopsis')}
          rows={4}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E24AA]/50 transition-all duration-200 ${
            errors.synopsis && touched.synopsis ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Briefly describe your story (max 500 characters)"
        ></textarea>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{formState.synopsis.length} / 500 characters</span>
          {errors.synopsis && touched.synopsis ? (
            <span className="text-red-500">{errors.synopsis}</span>
          ) : (
            <span>Be concise but descriptive</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryMetadata;