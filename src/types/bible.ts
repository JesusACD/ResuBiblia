import { BibleLanguage } from '../services/bibleApi';

export interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
  language: BibleLanguage;
}

export interface SearchFormData {
  book: string;
  chapter: number;
  verse: number;
  language: BibleLanguage;
}