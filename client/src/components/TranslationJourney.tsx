import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Translation } from '../App';
import './TranslationJourney.css';

interface TranslationJourneyProps {
  translation: Translation;
}

const TranslationJourney: React.FC<TranslationJourneyProps> = ({ translation }) => {
  const [showJourney, setShowJourney] = useState(false);

  const getStepType = (index: number, total: number) => {
    if (index === 0) return 'start';
    if (index === total - 1) return 'end';
    return 'middle';
  };

  return (
    <div className="translation-journey">
      <button 
        className="journey-toggle"
        onClick={() => setShowJourney(!showJourney)}
      >
        <span>� {showJourney ? 'Hide' : 'Show'} Classical Evolution</span>
        <span className="journey-badge">{translation.journey.length} Steps</span>
      </button>

      <AnimatePresence>
        {showJourney && (
          <motion.div
            className="journey-container"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="journey-header">
              <h3>📜 Complete Classical Evolution</h3>
              <p>Follow your text as it transforms through classical stages</p>
            </div>

            <div className="journey-steps">
              {translation.journey.map((step, index) => (
                <React.Fragment key={step.step}>
                  <motion.div
                    className={`journey-step ${getStepType(index, translation.journey.length)}`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="step-header">
                      <div className="step-number">{step.step}</div>
                      <div className="step-language">{step.language}</div>
                    </div>
                    <div className="step-text">
                      <p>"{step.text}"</p>
                    </div>
                  </motion.div>
                  
                  {index < translation.journey.length - 1 && (
                    <div className="step-arrow">⬇️</div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="journey-summary">
              <h4>🎯 Journey Summary</h4>
              <div className="summary-stats">
                <div className="summary-stat">
                  <span className="stat-icon">🌍</span>
                  <span>Visited {translation.journey.length} languages</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-icon">📝</span>
                  <span>
                    Characters: {translation.original.length} → {translation.final.length}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TranslationJourney;