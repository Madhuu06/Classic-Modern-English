const express = require('express');
const router = express.Router();

// Classical English transformation patterns
const CLASSICAL_TRANSFORMATIONS = {
  // Modern to Classical word replacements
  words: {
    'you': 'thou',
    'your': 'thy',
    'yours': 'thine',
    'yourself': 'thyself',
    'are': 'art',
    'were': 'wert',
    'have': 'hast',
    'has': 'hath',
    'do': 'dost',
    'does': 'doth',
    'will': 'shall',
    'can': 'may',
    'cannot': 'canst not',
    "don't": 'dost not',
    "doesn't": 'doth not',
    "won't": 'shall not',
    "can't": 'cannot',
    "I'm": 'I am',
    "you're": 'thou art',
    "it's": 'it is',
    "that's": 'that is',
    "there's": 'there is',
    "what's": 'what is',
    "where's": 'where is',
    "when's": 'when is',
    "who's": 'who is',
    "how's": 'how is'
  },

  // Sentence starters to make text more elegant
  elegantStarters: [
    'Verily, ',
    'Forsooth, ',
    'In truth, ',
    'Indeed, ',
    'Behold, ',
    'Lo, ',
    'Prithee, ',
    'Methinks ',
    'It would seem that ',
    'One might observe that ',
    'Perchance, '
  ],

  // Classical phrases to insert
  classicalPhrases: [
    'most graciously',
    'with great reverence',
    'in all humility',
    'with utmost respect',
    'most humbly',
    'with sincere devotion',
    'in good faith',
    'with noble intent',
    'most earnestly',
    'with profound regard'
  ],

  // Endings to make sentences more formal
  formalEndings: [
    ', I dare say',
    ', if it please thee',
    ', by thy leave',
    ', with thy permission',
    ', as befits a gentleman',
    ', in all courtesy',
    ', most respectfully',
    ', with great honor',
    ', as duty demands',
    ', with humble submission'
  ]
};

// Transform text to classical English
function transformToClassicalEnglish(text) {
  let transformed = text;

  // Apply word replacements
  for (const [modern, classical] of Object.entries(CLASSICAL_TRANSFORMATIONS.words)) {
    const regex = new RegExp('\\b' + modern + '\\b', 'gi');
    transformed = transformed.replace(regex, classical);
  }

  // Add elegant starter (25% chance)
  if (Math.random() < 0.25) {
    const starter = CLASSICAL_TRANSFORMATIONS.elegantStarters[
      Math.floor(Math.random() * CLASSICAL_TRANSFORMATIONS.elegantStarters.length)
    ];
    transformed = starter + transformed.charAt(0).toLowerCase() + transformed.slice(1);
  }

  // Insert classical phrase (30% chance)
  if (Math.random() < 0.3) {
    const phrase = CLASSICAL_TRANSFORMATIONS.classicalPhrases[
      Math.floor(Math.random() * CLASSICAL_TRANSFORMATIONS.classicalPhrases.length)
    ];
    const words = transformed.split(' ');
    const insertPos = Math.floor(words.length / 2);
    words.splice(insertPos, 0, phrase);
    transformed = words.join(' ');
  }

  // Add formal ending (20% chance)
  if (Math.random() < 0.2) {
    const ending = CLASSICAL_TRANSFORMATIONS.formalEndings[
      Math.floor(Math.random() * CLASSICAL_TRANSFORMATIONS.formalEndings.length)
    ];
    transformed = transformed.replace(/[.!?]?$/, ending + '.');
  }

  // Capitalize first letter
  transformed = transformed.charAt(0).toUpperCase() + transformed.slice(1);

  return transformed;
}

// Generate transformation journey
function generateClassicalJourney(originalText) {
  const stages = [
    { step: 1, language: 'Modern English', text: originalText },
    { step: 2, language: 'Classical English', text: transformToClassicalEnglish(originalText) }
  ];

  return stages;
}

// POST /api/translate
router.post('/', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const classicalText = transformToClassicalEnglish(text.trim());
    const journey = generateClassicalJourney(text.trim());
    
    const result = {
      original: text.trim(),
      result: classicalText,
      journey: journey,
      timestamp: new Date().toISOString()
    };
    
    res.json(result);
    
  } catch (error) {
    console.error('Classical transformation error:', error);
    res.status(500).json({ error: 'Failed to transform text to classical English' });
  }
});

module.exports = router;
