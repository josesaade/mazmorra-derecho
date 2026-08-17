import React, { useState } from 'react';
import CharacterSelect from './components/CharacterSelect';
import IntroScene from './components/IntroScene';
import './styles/game.css';

export default function App() {
  const [gameState, setGameState] = useState('SELECT');
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
    setGameState('INTRO');
  };

  const handleContinueFromIntro = () => {
    setGameState('COMBAT');
  };

  return (
    <div className="app">
      {gameState === 'SELECT' && (
        <CharacterSelect onSelectCharacter={handleSelectCharacter} />
      )}
      {gameState === 'INTRO' && selectedCharacter && (
        <IntroScene 
          character={selectedCharacter} 
          onContinue={handleContinueFromIntro}
        />
      )}
      {gameState === 'COMBAT' && (
        <div className="placeholder">
          <h1>🐛 Sistema de Combate en construcción...</h1>
          <p>Personaje: {selectedCharacter?.name}</p>
        </div>
      )}
    </div>
  );
}
