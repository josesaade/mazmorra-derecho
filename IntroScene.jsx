import React, { useState, useEffect } from 'react';
import '../styles/game.css';

export default function IntroScene({ character, onContinue }) {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  const introTexts = [
    `¡Bienvenidos, ${character.name}!`,
    "El reino del Derecho Intelectual está bajo amenaza del Dragón del Acabarropismo.",
    "Un escuadrón de esqueletos guardia cada rincón de la mazmorra.",
    "Solo reuniendo las 4 Gemas del Conocimiento podrán derrotar al dragón.",
    "Primer reto: Vencer al Guardián Esqueleto de la Primera Sala.",
    "¿Están listos para comenzar? 💀"
  ];

  useEffect(() => {
    if (textIndex < introTexts.length) {
      const timer = setTimeout(() => {
        setDisplayedText(introTexts[textIndex]);
        setTextIndex(textIndex + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [textIndex]);

  const handleSkip = () => {
    setTextIndex(introTexts.length);
    setDisplayedText(introTexts[introTexts.length - 1]);
  };

  return (
    <div className="intro-scene">
      <div className="intro-background">
        <img src={character.image} alt={character.name} className="intro-character" />
      </div>

      <div className="intro-text-box">
        <p className="intro-text">{displayedText}</p>
        
        <div className="intro-controls">
          {textIndex < introTexts.length ? (
            <button className="btn-skip" onClick={handleSkip}>
              Saltar ⏭️
            </button>
          ) : (
            <button className="btn-continue" onClick={onContinue}>
              Entrar a la Mazmorra →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
