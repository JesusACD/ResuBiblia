import axios from 'axios';
import { BibleVerse } from '../types/bible';
import { bookTranslations } from '../data/bookTranslations';

const API_KEY = import.meta.env.VITE_BIBLE_API_KEY;

if (!API_KEY) {
  throw new Error('VITE_BIBLE_API_KEY is not defined in environment variables');
}

const BASE_URL = 'https://api.scripture.api.bible/v1';

export type BibleLanguage = 'en' | 'es' | 'pt' | 'ar' | 'zh';

const BIBLE_IDS = {
  en: 'de4e12af7f28f599-01', // King James Version
  es: '592420522e16049f-01', // Reina Valera 1909
  pt: 'bb71c3264c762f01-01', // Portuguese Bible
  ar: '57fd92d90c6d92c1-01', // Arabic Bible
  zh: 'c1f5079c6d894297-01'  // Chinese Union Version
};

const headers = {
  'api-key': API_KEY,
  'Content-Type': 'application/json'
};

export function getBookName(book: string, language: BibleLanguage): string {
  if (language === 'en') return book;
  
  const translations = bookTranslations[language];
  // Si no hay traducción disponible, usar el nombre en inglés
  if (!translations) return book;
  
  return translations[book] || book;
}

export async function fetchVerse(book: string, chapter: number, verse: number, language: BibleLanguage = 'en'): Promise<BibleVerse> {
  try {
    const bibleId = BIBLE_IDS[language];
    const translatedBook = getBookName(book, language);
    
    // Primero obtenemos el ID del libro
    const booksResponse = await axios.get(`${BASE_URL}/bibles/${bibleId}/books`, { headers });
    const bookData = booksResponse.data.data.find((b: any) => 
      b.name.toLowerCase() === translatedBook.toLowerCase() || 
      b.nameLocal?.toLowerCase() === translatedBook.toLowerCase()
    );

    if (!bookData) {
      throw new Error(`Book "${translatedBook}" not found`);
    }

    // Luego obtenemos el versículo específico
    const verseResponse = await axios.get(
      `${BASE_URL}/bibles/${bibleId}/verses/${bookData.id}.${chapter}.${verse}`,
      { headers }
    );

    const verseData = verseResponse.data.data;

    return {
      book,
      chapter,
      verse,
      text: verseData.content.replace(/<[^>]*>/g, ''), // Removemos etiquetas HTML
      language
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error('Verse not found. Please check the reference.');
    }
    console.error('Error fetching verse:', error);
    throw new Error('Failed to fetch Bible verse. Please try again.');
  }
}