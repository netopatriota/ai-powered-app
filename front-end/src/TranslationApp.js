import './TranslationStyles.css';
import { useEffect, useState } from 'react';

function TranslationInterface() {
  const [sourceText, setSourceText] = useState('');
  const [resultText, setResultText] = useState('');

  const updateSourceText = (event) => setSourceText(event.target.value);

  const performTranslation = async () => {
    const apiUrl = `http://localhost:${process.env.REACT_APP_API_PORT || '8001'}/translate`;
    
    try {
      const fetchResult = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: sourceText }),
      });

      if (!fetchResult.ok) throw new Error('Response error.');

      const translationResult = await fetchResult.json();
      setResultText(translationResult.translated);
    } catch (error) {
      console.log('API call failed:', error.message);
    }
  };

  return (
    <div className="TranslationApp">
      <main className="container">
        <h1>LangChain Translation 🦜</h1>
        <div className="translation-section">
          <div className="input-area">
            <input
              type="text"
              aria-label="Enter text for translation"
              placeholder="Enter text"
              value={sourceText}
              onChange={updateSourceText}
            />
            <button onClick={performTranslation}>Translate</button>
          </div>
          <div className="output-area">
            <textarea
              aria-label="Translation result"
              placeholder="Translation will be shown here"
              value={resultText}
              readOnly
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default TranslationInterface;