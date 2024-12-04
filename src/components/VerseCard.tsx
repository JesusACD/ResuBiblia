import React from 'react';
import { BibleVerse } from '../types/bible';
import { getVerseAnalysis } from '../services/groqApi';
import { translations } from '../data/translations';
import { BibleLanguage } from '../services/bibleApi';
import { Loader2 } from 'lucide-react';

interface VerseCardProps {
  verse: BibleVerse;
  language: BibleLanguage;
}

export function VerseCard({ verse, language }: VerseCardProps) {
  const [analysis, setAnalysis] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const t = translations[language];

  React.useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        const result = await getVerseAnalysis(
          verse.book,
          verse.chapter,
          verse.verse,
          verse.text,
          language
        );
        setAnalysis(result);
      } catch (error) {
        console.error('Error fetching analysis:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [verse, language]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors duration-200">
      {/* Versículo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {verse.book} {verse.chapter}:{verse.verse}
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300">{verse.text}</p>
      </div>

      {/* Análisis */}
      <div className="p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <Loader2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-spin" />
            <p className="text-sm text-gray-500 dark:text-gray-400">{t.loadingAnalysis}</p>
          </div>
        ) : analysis ? (
          <div className="space-y-6">
            {/* Resumen */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t.summary}</h3>
              <p className="text-gray-700 dark:text-gray-300">{analysis.summary}</p>
            </div>

            {/* Explicación Detallada */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t.detailedExplanation}</h3>
              
              {/* Contexto Histórico */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">{t.historicalContext}</h4>
                <p className="text-gray-700 dark:text-gray-300">{analysis.explanation.historical}</p>
              </div>

              {/* Aspectos Culturales */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">{t.culturalAspects}</h4>
                <p className="text-gray-700 dark:text-gray-300">{analysis.explanation.cultural}</p>
              </div>

              {/* Aplicaciones Prácticas */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">{t.practicalApplications}</h4>
                <p className="text-gray-700 dark:text-gray-300">{analysis.explanation.practical}</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}