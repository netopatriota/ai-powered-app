import './App.css';
import React, { useState } from 'react';

const TranslatorApp = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleInputChange = (e) => setInputText(e.target.value);

  const translateText = async () => {
    const serverPort = process.env.REACT_APP_PORT || '8001';

    try {
      const response = await fetch(`http://localhost:${serverPort}/translate/invoke`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: { sentence: inputText } }),
      });

      if (!response.ok) throw new Error('Network response was not ok.');

      const data = await response.json();
      setTranslatedText(data.output);
    } catch (error) {
      console.error('Error calling the API:', error);
    }
  };

  return (
    <div className="App">
      <main id="general-container">
        <h1 id="page-title">Translator using LangChain 🦜</h1>

        <section id="content-container">
          <div id="input-container">
            <input
              type="text"
              id="input"
              aria-label="Text to translate"
              placeholder="Digite o texto a ser traduzido"
              value={inputText}
              onChange={handleInputChange}
            />
            <button id="translate-btn" onClick={translateText}>Translate</button>
          </div>
          <div id="translated-container">
            <textarea
              id="translated"
              aria-label="Translated text"
              placeholder="O texto traduzido aparecerá aqui "
              value={translatedText}
              readOnly
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default TranslatorApp;
