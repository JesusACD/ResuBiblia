/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GROQ_API_KEY: string;
  readonly VITE_BIBLE_API_KEY: string;
  // Add other environment variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
