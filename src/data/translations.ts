import { BibleLanguage } from '../services/bibleApi';

interface Translations {
  title: string;
  subtitle: string;
  book: string;
  chapter: string;
  verse: string;
  search: string;
  language: string;
  errorNotFound: string;
  errorUnexpected: string;
  summary: string;
  detailedExplanation: string;
  historicalContext: string;
  culturalAspects: string;
  practicalApplications: string;
  loadingAnalysis: string;
}

export const translations: Record<BibleLanguage, Translations> = {
  en: {
    title: 'ResuBiblia',
    subtitle: 'Find and understand Bible verses',
    book: 'Book',
    chapter: 'Chapter',
    verse: 'Verse',
    search: 'Search',
    language: 'Language',
    errorNotFound: 'Verse not found',
    errorUnexpected: 'Unexpected error',
    summary: 'Summary',
    detailedExplanation: 'Detailed Explanation',
    historicalContext: 'Historical Context',
    culturalAspects: 'Cultural Aspects',
    practicalApplications: 'Practical Applications',
    loadingAnalysis: 'Analyzing verse...'
  },
  es: {
    title: 'ResuBiblia',
    subtitle: 'Encuentra y comprende versículos bíblicos',
    book: 'Libro',
    chapter: 'Capítulo',
    verse: 'Versículo',
    search: 'Buscar',
    language: 'Idioma',
    errorNotFound: 'Versículo no encontrado',
    errorUnexpected: 'Error inesperado',
    summary: 'Resumen',
    detailedExplanation: 'Explicación Detallada',
    historicalContext: 'Contexto Histórico',
    culturalAspects: 'Aspectos Culturales',
    practicalApplications: 'Aplicaciones Prácticas',
    loadingAnalysis: 'Analizando el versículo...'
  },
  pt: {
    title: 'ResuBiblia',
    subtitle: 'Encontre e compreenda versículos bíblicos',
    book: 'Livro',
    chapter: 'Capítulo',
    verse: 'Versículo',
    search: 'Buscar',
    language: 'Idioma',
    errorNotFound: 'Versículo não encontrado',
    errorUnexpected: 'Erro inesperado',
    summary: 'Resumo',
    detailedExplanation: 'Explicação Detalhada',
    historicalContext: 'Contexto Histórico',
    culturalAspects: 'Aspectos Culturais',
    practicalApplications: 'Aplicações Práticas',
    loadingAnalysis: 'Analisando versículo...'
  },
  ar: {
    title: 'ريسوبيبليا',
    subtitle: 'ابحث وافهم آيات الكتاب المقدس',
    book: 'الكتاب',
    chapter: 'الإصحاح',
    verse: 'الآية',
    search: 'بحث',
    language: 'اللغة',
    errorNotFound: 'الآية غير موجودة',
    errorUnexpected: 'خطأ غير متوقع',
    summary: 'ملخص',
    detailedExplanation: 'شرح مفصل',
    historicalContext: 'السياق التاريخي',
    culturalAspects: 'الجوانب الثقافية',
    practicalApplications: 'التطبيقات العملية',
    loadingAnalysis: 'جاري تحليل الآية...'
  },
  zh: {
    title: 'ResuBiblia',
    subtitle: '查找和理解圣经经文',
    book: '书卷',
    chapter: '章',
    verse: '节',
    search: '搜索',
    language: '语言',
    errorNotFound: '未找到经文',
    errorUnexpected: '意外错误',
    summary: '摘要',
    detailedExplanation: '详细解释',
    historicalContext: '历史背景',
    culturalAspects: '文化层面',
    practicalApplications: '实际应用',
    loadingAnalysis: '正在分析经文...'
  }
};
