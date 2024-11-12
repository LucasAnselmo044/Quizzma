'use client';

import { useEffect, useState } from 'react';

type Option = {
  id: number;
  text: string;
  isCorrect: boolean;
};

export default function DailyChallenge() {
  const [question, setQuestion] = useState<string>('');
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState('bg-blue-900');

  // Busca a questão do dia e as opções da API
  useEffect(() => {
    const fetchDailyChallenge = async () => {
      try {
        const response = await fetch('/api/daily-challenge');
        const data = await response.json();
        setQuestion(data.question);
        setOptions(data.options);
      } catch (error) {
        console.error("Erro ao buscar o desafio diário:", error);
      }
    };

    fetchDailyChallenge();
  }, []);

  function handleAnswer(optionId: number, isCorrect: boolean) {
    setSelectedOption(optionId);

    if (isCorrect) {
      setFeedbackMessage('Parabéns, resposta correta!');
      setBackgroundColor('bg-green-700');
      setShowCorrectAnswer(null); // Não mostra resposta correta ao acertar
    } else {
      setFeedbackMessage('Resposta incorreta! A resposta correta é:');
      setShowCorrectAnswer(options.find((option) => option.isCorrect)?.text || '');
      setBackgroundColor('bg-red-700');
    }

    setTimeout(() => setBackgroundColor('bg-blue-900'), 1500); // Volta ao fundo original após 1,5s
  }

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${backgroundColor} transition-colors duration-700 text-white p-6`}>
      <h1 className="text-3xl font-bold mb-6 text-center">Desafio do Dia</h1>
      <p className="text-xl mb-4 text-center bg-black/50 p-4 rounded-lg shadow-md">{question}</p>
      <div className="flex flex-col items-center gap-3 w-full max-w-md">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleAnswer(option.id, option.isCorrect)}
            className={`w-full py-2 px-4 rounded-lg shadow-md transition-all duration-300 ${
              selectedOption === option.id
                ? option.isCorrect
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            disabled={selectedOption !== null}
          >
            {option.text}
          </button>
        ))}
      </div>
      {feedbackMessage && (
        <p className="mt-6 text-lg font-semibold text-center text-yellow-300">{feedbackMessage}</p>
      )}
      {showCorrectAnswer && (
        <p className="text-lg font-semibold text-center text-green-300 mt-2">
          {showCorrectAnswer}
        </p>
      )}
    </div>
  );
}
