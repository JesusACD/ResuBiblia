import React from 'react';
import { Globe2, ChevronDown } from 'lucide-react';
import { BibleLanguage } from '../services/bibleApi';
import { translations } from '../data/translations';

interface LanguageSelectorProps {
  value: BibleLanguage;
  onChange: (language: BibleLanguage) => void;
}

const languages: { [key in BibleLanguage]: { name: string; shortName: string } } = {
  es: { name: 'Español', shortName: 'ES' },
  en: { name: 'English', shortName: 'EN' },
  pt: { name: 'Português', shortName: 'PT' },
  ar: { name: 'العربية', shortName: 'AR' },
  zh: { name: '中文', shortName: 'ZH' }
};

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  const t = translations[value];

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="language-menu"
          aria-haspopup="true"
        >
          <Globe2 className="h-5 w-5 mr-2 text-gray-500" aria-hidden="true" />
          <span className="mr-1">{languages[value].shortName}</span>
          <ChevronDown className="h-4 w-4 text-gray-500" aria-hidden="true" />
        </button>
      </div>

      <select
        id="language"
        value={value}
        onChange={(e) => onChange(e.target.value as BibleLanguage)}
        className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none py-1"
        style={{
          opacity: 0,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          cursor: 'pointer'
        }}
      >
        {Object.entries(languages).map(([code, { name }]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}
