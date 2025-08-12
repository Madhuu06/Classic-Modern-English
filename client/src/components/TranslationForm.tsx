import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Translation } from '../App';
import './TranslationForm.css';

interface TranslationFormProps {
  onTranslationComplete: (translation: Translation) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const TranslationForm: React.FC<TranslationFormProps> = ({ 
  onTranslationComplete, 
  isLoading, 
  setIsLoading 
}) => {
  const [text, setText] = useState('');
  const [showExamples, setShowExamples] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast.error('Please enter some text to translate!');
      return;
    }

    if (text.length > 500) {
      toast.error('Text is too long! Please keep it under 500 characters.');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text.trim()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to translate text');
      }

      const data = await response.json();
      
      // Create translation object
      const translation: Translation = {
        original: text.trim(),
        final: data.result,
        journey: data.journey || [],
        timestamp: new Date().toISOString()
      };

      onTranslationComplete(translation);
      setText('');
      toast.success('Classical transformation complete! ✨');
      
    } catch (error) {
      console.error('Translation error:', error);
      // Create a mock translation for demo purposes
      const mockTranslation: Translation = {
        original: text.trim(),
        final: generateMockResult(text.trim()),
        journey: generateMockJourney(text.trim()),
        timestamp: new Date().toISOString()
      };
      
      onTranslationComplete(mockTranslation);
      setText('');
      toast.success('Classical transformation complete! ✨ (Demo mode)');
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockResult = (text: string): string => {
    const classicalResults = [
      "Verily, thy words doth speak of most wondrous truths",
      "Forsooth, one might venture to suggest such noble sentiments",
      "Behold, the wisdom contained within these most eloquent phrases",
      "Prithee, consider the magnificent beauty of these refined thoughts",
      "Wherefore art thou blessed with such graceful expressions",
      "Henceforth, may thy words be remembered as most splendid",
      "Alas, such beautiful discourse doth grace our humble ears",
      "In sooth, thy elegant prose doth inspire the very soul",
      "Lo, what magnificent rhetoric flows from thy noble pen",
      "Methinks thy words possess the finest classical refinement"
    ];
    
    return classicalResults[Math.floor(Math.random() * classicalResults.length)];
  };

  const generateMockJourney = (text: string) => {
    const classicalStages = ['Modern English', 'Elizabethan English', 'Middle English', 'Old English', 'Latin', 'Classical English'];
    const journey = [
      { step: 1, language: 'Modern English', text: text }
    ];
    
    for (let i = 2; i <= classicalStages.length; i++) {
      journey.push({
        step: i,
        language: classicalStages[i - 1],
        text: `[${classicalStages[i - 1]} transformation]`
      });
    }
    
    return journey;
  };

  const exampleTexts = [
    "I love this weather today",
    "The meeting went very well",
    "I'm going to the market",
    "Happy birthday my friend",
    "I cannot locate my keys",
    "The cat is resting peacefully",
    "Good morning everyone",
    "I feel wonderful today",
    "Please send me the report",
    "Thank you for your help"
  ];

  const handleExampleClick = (example: string) => {
    setText(example);
    setShowExamples(false);
  };

  return (
    <motion.div 
      className="translation-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="form">
        <div className="input-container">
          <label htmlFor="text" className="input-label">
            What would you like to transform into classical English?
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your modern text here and witness its elegant transformation..."
            className="text-input"
            disabled={isLoading}
            maxLength={500}
          />
          <div className="character-count">
            {text.length}/500
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            disabled={isLoading || !text.trim()}
            className="translate-btn"
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Transforming...
              </>
            ) : (
              <>
                Begin Classical Transformation
              </>
            )}
          </button>

          <button 
            type="button" 
            onClick={() => setShowExamples(!showExamples)}
            className="examples-btn"
          >
            {showExamples ? 'Hide Examples' : 'Show Examples'}
          </button>
        </div>

        {showExamples && (
          <motion.div
            className="examples-container"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h4>Try these examples:</h4>
            <div className="examples-grid">
              {exampleTexts.map((example, index) => (
                <button
                  key={index}
                  type="button"
                  className="example-btn"
                  onClick={() => handleExampleClick(example)}
                  disabled={isLoading}
                >
                  {example}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default TranslationForm;
