import React from 'react';
import { Book } from 'lucide-react';
import { SearchForm } from './components/SearchForm';
import { VerseCard } from './components/VerseCard';
import { ErrorMessage } from './components/ErrorMessage';
import { LanguageSelector } from './components/LanguageSelector';
import { ThemeToggle } from './components/ThemeToggle';
import { fetchVerse } from './services/bibleApi';
import { BibleVerse, SearchFormData } from './types/bible';
import { translations } from './data/translations';
import { BibleLanguage } from './services/bibleApi';

function App() {
  const [verse, setVerse] = React.useState<BibleVerse | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [language, setLanguage] = React.useState<BibleLanguage>('es');

  const handleSearch = async (data: SearchFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await fetchVerse(data.book, data.chapter, data.verse, data.language);
      setVerse(result);
    } catch (err) {
      const t = translations[data.language];
      setError(err instanceof Error ? 
        (err.message.includes('not found') ? t.errorNotFound : t.errorUnexpected) 
        : t.errorUnexpected);
      setVerse(null);
    } finally {
      setIsLoading(false);
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header controls */}
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-4">
        <ThemeToggle />
        <LanguageSelector value={language} onChange={setLanguage} />
      </div>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Book className="mx-auto h-12 w-12 text-indigo-600 dark:text-indigo-400" />
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              ResuBiblia
            </h1>
            <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
              {t.subtitle}
            </p>
          </div>

          <div className="flex flex-col items-center space-y-8">
            <SearchForm 
              onSearch={handleSearch} 
              isLoading={isLoading} 
              language={language}
            />
            
            {error && <ErrorMessage message={error} />}
            
            {verse && <VerseCard verse={verse} language={language} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;