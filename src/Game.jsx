import { useState, useEffect } from "react";
import OptionButton from "./components/OptionButton/OptionButton";
const options = [
  { id: 0, name: "Piedra", emoji: "🪨", beats: [2, 3] },
  { id: 1, name: "Papel", emoji: "📄", beats: [0] },
  { id: 2, name: "Tijera", emoji: "✂️", beats: [1, 3] },
  { id: 3, name: "Lagarto", emoji: "🦎", beats: [1] },
  { id: 4, name: "Spock", emoji: "🖖", beats: [3, 0] },
];

const getResult = (userChoice, computerChoice) => {
  if (userChoice === computerChoice) {
    return 0;
  }

  if (options[userChoice].beats.includes(computerChoice)) {
    return 1;
  }

  return 2;
};



function useChoices() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [userMessage, setUserMessage] = useState(null);
  const [computerMessage, setComputerMessage] = useState(null);
  const [result, setResult] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (userChoice !== null) {
      setUserMessage(
        `Has elegido ${options[userChoice]?.emoji} - ${options[userChoice]?.name}`
      );
    }
  }, [userChoice]);

  useEffect(() => {
    if (computerChoice !== null) {
      setComputerMessage(
        `El ordenador ha elegido ${options[computerChoice]?.emoji} - ${options[computerChoice]?.name}`
      );
    }
  }, [computerChoice]);

  const handlePlay = (choice) => {
    setUserChoice(choice);
    setDisabled(true);
    const randomChoice = Math.floor(Math.random() * 5);

    setTimeout(() => {
      setComputerChoice(randomChoice);
    }, 1500);

    setTimeout(() => {
      setResult(getResult(choice, randomChoice));
    }, 3000);

    clearTimeout();
  };

  const reset = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setUserMessage(null);
    setComputerMessage(null);
    setResult(null);
    setDisabled(false);
  };

  return {
    userChoice,
    computerChoice,
    userMessage,
    computerMessage,
    result,
    disabled,
    handlePlay,
    reset,
  };
}

export default function Game() {
  const {
    userChoice,
    computerChoice,
    userMessage,
    computerMessage,
    result,
    disabled,
    handlePlay,
    reset,
  } = useChoices();

  return (
    <div class="container mt-5">
  <div class="card text-center">
    <div class="card-header">
      <h1>¡A jugar!</h1>
    </div>
    <div class="card-body">
      <div class="btn-group" role="group" aria-label="Opciones">
        {options.map((option) => (
          <OptionButton
            key={option.id}
            option={option}
            handlePlay={handlePlay}
            disabled={disabled}
            className="btn btn-primary"
          />
        ))}
      </div>
      {userChoice !== null && <p class="mt-3">{userMessage}</p>}
      {computerChoice !== null && <p class="mt-3">{computerMessage}</p>}
      {result !== null && (
        <div class="mt-5">
          {result === 0 && <p class="mt-3">🤷🏽‍♀️ Empate</p>}
          {result === 1 && (
            <p class="mt-3">
              ✅ Has ganado con {options[userChoice]?.name} contra{" "}
              {options[computerChoice]?.name}
            </p>
          )}
          {result === 2 && (
            <p class="mt-3">
              ❌ Has perdido con {options[userChoice]?.name} contra{" "}
              {options[computerChoice]?.name}
            </p>
          )}
          <button onClick={reset} class="btn btn-secondary mt-3">
            Jugar de nuevo
          </button>
        </div>
      )}
    </div>
  </div>
</div>

  );
}