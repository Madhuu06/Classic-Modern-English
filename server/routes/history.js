const express = require('express');
const router = express.Router();

// In-memory storage for demo (replace with MongoDB in production)
let translationHistory = [];

// GET /api/history - Get translation history
router.get('/', (req, res) => {
  try {
    // Return last 50 translations
    const recentHistory = translationHistory.slice(-50).reverse();
    res.json(recentHistory);
  } catch (error) {
    console.error('History fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// POST /api/history - Save translation to history
router.post('/', (req, res) => {
  try {
    const translation = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };

    translationHistory.push(translation);
    
    // Keep only last 1000 translations in memory
    if (translationHistory.length > 1000) {
      translationHistory = translationHistory.slice(-1000);
    }

    res.json({ success: true, id: translation.id });
  } catch (error) {
    console.error('History save error:', error);
    res.status(500).json({ error: 'Failed to save translation' });
  }
});

// GET /api/history/top - Get most hilarious translations
router.get('/top', (req, res) => {
  try {
    // Simple algorithm to find "funny" translations
    // (ones where the result is very different from original)
    const funnyTranslations = translationHistory
      .filter(t => {
        const originalWords = t.original.toLowerCase().split(' ');
        const finalWords = t.final.toLowerCase().split(' ');
        const commonWords = originalWords.filter(word => 
          finalWords.some(fWord => fWord.includes(word) || word.includes(fWord))
        );
        return commonWords.length < originalWords.length * 0.3; // Less than 30% similarity
      })
      .slice(-20)
      .reverse();

    res.json(funnyTranslations);
  } catch (error) {
    console.error('Top translations fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch top translations' });
  }
});

module.exports = router;
