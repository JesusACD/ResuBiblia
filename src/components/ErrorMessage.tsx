import React from 'react';
import { XCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="w-full max-w-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mt-4" dir="auto">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircle className="h-5 w-5 text-red-400 dark:text-red-500" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700 dark:text-red-200">{message}</p>
        </div>
      </div>
    </div>
  );
}