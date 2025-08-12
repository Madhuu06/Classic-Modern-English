import React from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Translation } from '../App';
import './TranslationResult.css';

interface TranslationResultProps {
  translation: Translation;
  onNewTranslation: () => void;
}

const TranslationResult: React.FC<TranslationResultProps> = ({ 
  translation, 
  onNewTranslation 
}) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <motion.div 
      className="translation-result"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="result-header">
        <h2>Classical Transformation Complete</h2>
      </div>

      {/* Original Input */}
      <motion.div 
        className="original-input"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="box-icon">✨</div>
        <h3>Original Text: "{translation.original}"</h3>
        <button 
          onClick={() => copyToClipboard(translation.original)}
          className="copy-btn-box"
          title="Copy original text"
        >
          📋 Copy
        </button>
      </motion.div>

      {/* Translation Steps */}
      <div className="translation-steps">
        
        {/* Simple transformation display */}
        <div className="simple-translations">
          {translation.journey.slice(1, -1).map((step: any, index: number) => (
            <motion.div
              key={step.step}
              className="simple-translation"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <p>
                <span className="language-label">{step.language}:</span> {step.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Journey steps with copy buttons */}
        <div className="journey-steps">
          {translation.journey.slice(1, -1).map((step: any, index: number) => (
            <motion.div
              key={step.step}
              className="journey-step middle"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="step-header">
                <span className="step-number">{step.step}.</span>
                <span className="step-language">{step.language}</span>
              </div>
              <div className="step-text">
                <p>{step.text}</p>
                <button 
                  onClick={() => copyToClipboard(step.text)}
                  className="copy-btn-small"
                  title="Copy this step"
                >
                  📋
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Final Result */}
      <motion.div
        className="final-result"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="box-icon">🎯</div>
        <h3>Final Result: "{translation.final}"</h3>
        <button 
          onClick={() => copyToClipboard(translation.final)}
          className="copy-btn-box"
          title="Copy final result"
        >
          📋 Copy
        </button>
      </motion.div>

      {/* Action Buttons */}
      <div className="result-actions">
        <motion.button
          onClick={onNewTranslation}
          className="new-translation-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          New Classical Translation
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TranslationResult;
