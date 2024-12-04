import { BibleLanguage } from './bibleApi';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

if (!GROQ_API_KEY) {
  throw new Error('GROQ_API_KEY is not defined in environment variables');
}

interface VerseAnalysis {
  summary: string;
  explanation: {
    historical: string;
    cultural: string;
    practical: string;
  };
}

const systemPromptTemplates: Record<BibleLanguage, string> = {
  es: `Eres un experto en teología y estudios bíblicos. Analiza el versículo proporcionado siguiendo exactamente esta estructura:

1. RESUMEN (máximo 2 oraciones)
[Escribe aquí un resumen breve y conciso del versículo]

2. CONTEXTO HISTÓRICO
[Describe el contexto histórico relevante, incluyendo época, eventos importantes y su significado]

3. ASPECTOS CULTURALES
[Explica los aspectos culturales significativos de la época y su relevancia para entender el versículo]

4. APLICACIONES PRÁCTICAS
[Proporciona aplicaciones prácticas concretas para la vida moderna]

Mantén cada sección claramente separada y etiquetada. Responde en español.`,
  
  en: `You are an expert in theology and biblical studies. Analyze the provided verse following exactly this structure:

1. SUMMARY (maximum 2 sentences)
[Write here a brief and concise summary of the verse]

2. HISTORICAL CONTEXT
[Describe the relevant historical context, including era, important events, and their significance]

3. CULTURAL ASPECTS
[Explain significant cultural aspects of the time and their relevance to understanding the verse]

4. PRACTICAL APPLICATIONS
[Provide concrete practical applications for modern life]

Keep each section clearly separated and labeled. Respond in English.`,
  
  pt: `Você é um especialista em teologia e estudos bíblicos. Analise o versículo fornecido seguindo exatamente esta estrutura:

1. RESUMO (máximo 2 frases)
[Escreva aqui um resumo breve e conciso do versículo]

2. CONTEXTO HISTÓRICO
[Descreva o contexto histórico relevante, incluindo época, eventos importantes e seu significado]

3. ASPECTOS CULTURAIS
[Explique os aspectos culturais significativos da época e sua relevância para entender o versículo]

4. APLICAÇÕES PRÁTICAS
[Forneça aplicações práticas concretas para a vida moderna]

Mantenha cada seção claramente separada e rotulada. Responda em português.`,
  
  ar: `أنت خبير في اللاهوت والدراسات الكتابية. حلل الآية المقدمة باتباع هذه البنية بالضبط:

1. ملخص (جملتان كحد أقصى)
[اكتب هنا ملخصًا موجزًا ودقيقًا للآية]

2. السياق التاريخي
[صف السياق التاريخي ذو الصلة، بما في ذلك العصر والأحداث المهمة وأهميتها]

3. الجوانب الثقافية
[اشرح الجوانب الثقافية المهمة في ذلك الوقت وأهميتها لفهم الآية]

4. التطبيقات العملية
[قدم تطبيقات عملية ملموسة للحياة الحديثة]

احتفظ بكل قسم منفصلاً ومعنونًا بوضوح. أجب باللغة العربية.`,
  
  zh: `您是神学和圣经研究专家。请按照以下结构准确分析所提供的经文：

1. 摘要（最多2句话）
[在此写出经文的简明扼要的摘要]

2. 历史背景
[描述相关的历史背景，包括时代、重要事件及其意义]

3. 文化层面
[解释当时重要的文化层面及其对理解经文的重要性]

4. 实际应用
[提供具体的现代生活应用]

保持每个部分清晰分开并标记。用中文回答。`
};

const userPromptTemplates: Record<BibleLanguage, string> = {
  es: 'Analiza el siguiente versículo bíblico:\n{book} {chapter}:{verse}\n"{text}"',
  en: 'Analyze the following Bible verse:\n{book} {chapter}:{verse}\n"{text}"',
  pt: 'Analise o seguinte versículo bíblico:\n{book} {chapter}:{verse}\n"{text}"',
  ar: 'حلل الآية الكتابية التالية:\n{book} {chapter}:{verse}\n"{text}"',
  zh: '分析以下圣经经文：\n{book} {chapter}:{verse}\n"{text}"'
};

export async function getVerseAnalysis(
  book: string,
  chapter: number,
  verse: number,
  text: string,
  language: BibleLanguage
): Promise<VerseAnalysis> {
  try {
    const userPrompt = userPromptTemplates[language]
      .replace('{book}', book)
      .replace('{chapter}', chapter.toString())
      .replace('{verse}', verse.toString())
      .replace('{text}', text);

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [
          { role: 'system', content: systemPromptTemplates[language] },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get verse analysis');
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;

    // Procesamos la respuesta para estructurarla
    const sections = analysis.split(/\d\.\s+/);
    // Removemos el primer elemento vacío si existe
    if (sections[0].trim() === '') sections.shift();

    return {
      summary: sections[0].replace(/SUMMARY:|RESUMEN:|RESUMO:|ملخص:|摘要：?/i, '').trim(),
      explanation: {
        historical: sections[1].replace(/HISTORICAL CONTEXT:|CONTEXTO HISTÓRICO:|CONTEXTO HISTÓRICO:|السياق التاريخي:|历史背景：?/i, '').trim(),
        cultural: sections[2].replace(/CULTURAL ASPECTS:|ASPECTOS CULTURALES:|ASPECTOS CULTURAIS:|الجوانب الثقافية:|文化层面：?/i, '').trim(),
        practical: sections[3].replace(/PRACTICAL APPLICATIONS:|APLICACIONES PRÁCTICAS:|APLICAÇÕES PRÁTICAS:|التطبيقات العملية:|实际应用：?/i, '').trim()
      }
    };
  } catch (error) {
    console.error('Error getting verse analysis:', error);
    throw new Error('Failed to get verse analysis');
  }
}
