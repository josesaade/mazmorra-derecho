import React, { useState, useEffect } from 'react';
import { combatQuestions } from '../data/questions';
import '../styles/game.css';

export default function Combat({ character }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [playerHP, setPlayerHP] = useState(character.baseHP);
  const [skeletonHP, setSkeletonHP] = useState(100);
  const [combatLog, setCombatLog] = useState(['¡La batalla comienza!']);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [boneAnimation, setBoneAnimation] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const question = combatQuestions[currentQuestion];

  const handleAnswer = (optionIndex) => {
    if (answered) return;

    setSelectedOption(optionIndex);
    const isCorrect = question.options[optionIndex].correct;

    if (isCorrect) {
      // Jugador ataca
      const newSkeletonHP = Math.max(0, skeletonHP - 20);
      setSkeletonHP(newSkeletonHP);
      setCombatLog([
        ...combatLog,
        `✓ ¡Correcto! ${character.name} ataca y golpea al esqueleto (-20 HP)`
      ]);

      if (newSkeletonHP <= 0) {
        setGameOver(true);
        setWinner('player');
      }
    } else {
      // Esqueleto ataca
      setBoneAnimation(true);
      setTimeout(() => setBoneAnimation(false), 1000);

      const newPlayerHP = Math.max(0, playerHP - 10);
      setPlayerHP(newPlayerHP);
      setCombatLog([
        ...combatLog,
        `✗ Incorrecto. El esqueleto lanza un hueso y te golpea (-10 HP)`
      ]);

      if (newPlayerHP <= 0) {
        setGameOver(true);
        setWinner('skeleton');
      }
    }

    setAnswered(true);

    setTimeout(() => {
      if (!gameOver && currentQuestion < combatQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setAnswered(false);
      } else if (currentQuestion === combatQuestions.length - 1 && !gameOver) {
        setGameOver(true);
        setWinner('player');
      }
    }, 2000);
  };

  return (
    <div className="combat-container">
      {/* ENCABEZADO */}
      <div className="combat-header">
        <div className="fighter">
          <img src={character.image} alt={character.name} className="fighter-image" />
          <div className="hp-bar">
            <div className="hp-fill" style={{ width: `${(playerHP / character.baseHP) * 100}%` }}></div>
          </div>
          <span className="hp-text">{playerHP} / {character.baseHP}</span>
        </div>

        <div className="vs-text">VS</div>

        <div className="fighter">
          <img src="https://via.placeholder.com/150?text=Skeleton" alt="Esqueleto" className="fighter-image skeleton" />
          <div className="hp-bar">
            <div className="hp-fill skeleton-fill" style={{ width: `${(skeletonHP / 100) * 100}%` }}></div>
          </div>
          <span className="hp-text">{skeletonHP} / 100</span>
        </div>
      </div>

      {/* ÁREA DE COMBATE */}
      <div className="combat-area">
        {/* Animación del hueso */}
        {boneAnimation && <div className="bone-projectile"></div>}

        {/* Registro de combate */}
        <div className="combat-log">
          {combatLog.map((log, idx) => (
            <p key={idx} className="log-entry">{log}</p>
          ))}
        </div>
      </div>

      {/* PREGUNTAS O RESULTADO */}
      {!gameOver ? (
        <div className="question-card">
          <div className="question-counter">Pregunta {currentQuestion + 1}/5</div>
          <p className="question-text">{question.question}</p>

          <div className="options">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                className={`option-btn ${selectedOption === idx ? (option.correct ? 'correct' : 'incorrect') : ''}`}
                onClick={() => handleAnswer(idx)}
                disabled={answered}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="game-over-screen">
          {winner === 'player' ? (
            <>
              <h1 className="victory">¡VICTORIA!</h1>
              <p className="victory-text">¡Has derrotado al esqueleto y ganaste la primera gema!</p>
              <button className="btn-continue-combat">Siguiente Sala →</button>
            </>
          ) : (
            <>
              <h1 className="defeat">DERROTA</h1>
              <p className="defeat-text">El esqueleto te ha vencido. Intenta de nuevo.</p>
              <button className="btn-continue-combat">Volver a Intentar</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
