import React, { useState } from 'react';
import { characters } from '../data/characters';
import '../styles/game.css';

export default function CharacterSelect({ onSelectCharacter }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (character) => {
    setSelectedId(character.id);
    onSelectCharacter(character);
  };

  return (
    <div className="character-select-container">
      <h1>⚔️ Elige tu Personaje</h1>
      <p>Tu grupo se enfrentará a los retos del Derecho Intelectual</p>
      
      <div className="characters-grid">
        {characters.map((char) => (
          <div
            key={char.id}
            className={`character-card ${selectedId === char.id ? 'selected' : ''}`}
            style={{ borderColor: char.color }}
            onClick={() => handleSelect(char)}
          >
            <img src={char.image} alt={char.name} className="character-image" />
            <h2>{char.name}</h2>
            <p>{char.description}</p>
            
            <div className="stats">
              <div className="stat">
                <span>❤️ HP</span>
                <span>{char.baseHP}</span>
              </div>
              <div className="stat">
                <span>⚔️ ATK</span>
                <span>{char.baseAttack}</span>
              </div>
            </div>
            
            {selectedId === char.id && (
              <button className="btn-start">
                ✓ Seleccionado
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedId && (
        <button className="btn-begin">
          Comenzar Aventura →
        </button>
      )}
    </div>
  );
}
