'use client';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

const Code: React.FC<CodeBlockProps> = ({ code, language = 'ts', className = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative group my-4 ${className}`}>
      <div className="flex items-center absolute top-3 left-0 px-4 justify-between w-full">
        <p className="font-bold text-sm text-white">{language.toLocaleUpperCase()}</p>

        <button
          onClick={handleCopy}
          className="top-3 right-2 p-2 rounded-md bg-neutral-800 hover:bg-neutral-700 transition-colors"
          aria-label="Copy code">
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-300 group-hover:text-white" />
          )}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          borderRadius: '0.5rem',
          padding: '1rem',
          paddingTop: '4rem',
          fontSize: '0.875rem',
        }}
        wrapLines
        showLineNumbers>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
export default Code;
