import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { TranslationForm, TranslationResult } from './components';
import './App.css';

export interface Translation {
  original: string;
  final: string;
  journey: Array<{
    step: number;
    language: string;
    text: string;
  }>;
  timestamp: string;
}

function App() {
  const [currentTranslation, setCurrentTranslation] = useState<Translation | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslationComplete = (translation: Translation) => {
    setCurrentTranslation(translation);
  };

  const handleNewTranslation = () => {
    setCurrentTranslation(null);
  };

  return (
    <div className="App">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="app-header">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="header-content"
        >
          <h1 className="app-title">
            Classical English Translator
          </h1>
          <p className="app-subtitle">
            Transform your modern text into elegant, sophisticated classical English prose
          </p>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <AnimatePresence mode="wait">
          {!currentTranslation ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="form-container"
            >
              <TranslationForm 
                onTranslationComplete={handleTranslationComplete}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="result-container"
            >
              <TranslationResult 
                translation={currentTranslation}
                onNewTranslation={handleNewTranslation}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Made with ❤️ for lovers of elegant language</p>
      </footer>
    </div>
  );
}

export default App;
