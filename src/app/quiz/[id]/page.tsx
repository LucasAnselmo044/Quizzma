'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Question = {
  id: number;
  text: string;
  options: { id: number; text: string; isCorrect?: boolean }[];
};

export default function QuizPage({ params }: { params: { id: string } }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [quizFinished, setQuizFinished] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('bg-blue-900');
  const router = useRouter();
  const quizId = parseInt(params.id);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(`/api/quiz/${quizId}/questions`);
        
        if (!res.ok) {
          throw new Error('Erro ao buscar as questões');
        }

        const data = await res.json();
        setQuestions(data);
      } catch (error) {
        console.error('Erro ao carregar as questões:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [quizId]);

  function handleAnswer(optionId: number, isCorrect?: boolean) {
    setSelectedOption(optionId);

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
      setFeedbackMessage('Parabéns, resposta correta!');
      setBackgroundColor('bg-green-700');
      setShowCorrectAnswer(null); // Não mostra resposta correta ao acertar
    } else {
      setFeedbackMessage('Resposta incorreta! A resposta correta é:');
      setShowCorrectAnswer(
        questions[currentQuestion].options.find((option) => option.isCorrect)?.text || ''
      );
      setBackgroundColor('bg-red-700');
    }

    setTimeout(() => setBackgroundColor('bg-blue-900'), 1500); // Volta ao fundo original após 1,5s
  }

  function handleNextQuestion() {
    if (selectedOption === null) return;

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setFeedbackMessage('');
      setShowCorrectAnswer(null);
    } else {
      setQuizFinished(true);
    }
  }

  function resetQuiz() {
    setCurrentQuestion(0);
    setCorrectAnswers(0);
    setSelectedOption(null);
    setFeedbackMessage('');
    setShowCorrectAnswer(null);
    setQuizFinished(false);
  }

  if (loading) return <p className="text-center text-white">Carregando...</p>;

  if (questions.length === 0) return <p className="text-center text-white">Sem perguntas disponíveis.</p>;

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${backgroundColor} transition-colors duration-700 text-white p-6`}>
      {!quizFinished ? (
        <>
          <h1 className="text-3xl font-bold mb-6 text-center">
            Pergunta {currentQuestion + 1} de {questions.length}
          </h1>
          <p className="text-xl mb-4 text-center bg-black/50 p-4 rounded-lg shadow-md">
            {questions[currentQuestion].text}
          </p>
          <div className="flex flex-col items-center gap-3 w-full max-w-md">
            {questions[currentQuestion].options.map((option) => (
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
          <button
            onClick={handleNextQuestion}
            className="mt-6 py-2 px-6 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg shadow-lg transition-all duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
            disabled={selectedOption === null}
          >
            Próxima Pergunta
          </button>
        </>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Quiz Finalizado!</h1>
          <p className="text-xl mb-4">
            Você acertou {correctAnswers} de {questions.length} perguntas.
            <br />
            Sua pontuação: <span className="font-bold text-green-400">{((correctAnswers / questions.length) * 100).toFixed(2)}%</span>
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => router.push('/categories')}
              className="py-2 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
            >
              Voltar para Categorias
            </button>
            <button
              onClick={resetQuiz}
              className="py-2 px-6 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
            >
              Refazer Quiz
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => router.push('/dashboard')} // Ajuste o caminho conforme necessário
        className="mt-8 py-2 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
      >
        Voltar
      </button>
    </div>
  );
}
