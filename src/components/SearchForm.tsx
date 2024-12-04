import React from 'react';
import { Search } from 'lucide-react';
import { bibleBooks } from '../data/books';
import { SearchFormData } from '../types/bible';
import { BibleLanguage } from '../services/bibleApi';
import { getBookName } from '../services/bibleApi';
import { translations } from '../data/translations';

interface SearchFormProps {
  onSearch: (data: SearchFormData) => void;
  isLoading: boolean;
  language: BibleLanguage;
}

export function SearchForm({ onSearch, isLoading, language }: SearchFormProps) {
  const [formData, setFormData] = React.useState<SearchFormData>({
    book: bibleBooks[0],
    chapter: 1,
    verse: 1,
    language: language
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(formData);
  };

  // Update form data when language changes
  React.useEffect(() => {
    setFormData(prev => ({ ...prev, language }));
  }, [language]);

  const t = translations[language];

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
      <div className="space-y-4">
        <div>
          <label htmlFor="book" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t.book}
          </label>
          <select
            id="book"
            value={formData.book}
            onChange={(e) => setFormData(prev => ({ ...prev, book: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 sm:text-sm"
          >
            {bibleBooks.map(book => (
              <option key={book} value={book}>{getBookName(book, language)}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="chapter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t.chapter}
            </label>
            <input
              type="number"
              id="chapter"
              min="1"
              value={formData.chapter}
              onChange={(e) => setFormData(prev => ({ ...prev, chapter: parseInt(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="verse" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t.verse}
            </label>
            <input
              type="number"
              id="verse"
              min="1"
              value={formData.verse}
              onChange={(e) => setFormData(prev => ({ ...prev, verse: parseInt(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition-colors duration-200 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              {t.search}
            </>
          )}
        </button>
      </div>
    </form>
  );
}