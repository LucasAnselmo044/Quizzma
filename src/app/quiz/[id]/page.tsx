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
  const [loading, setLoading] = useState(true);
  const [quizFinished, setQuizFinished] = useState(false);
  const router = useRouter();
  const quizId = parseInt(params.id); // Certifique-se de que estamos usando um número

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
    } else {
      setFeedbackMessage('Resposta incorreta! Tente a próxima.');
    }
  }

  function handleNextQuestion() {
    if (selectedOption === null) return; // Impede de avançar sem responder

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setFeedbackMessage('');
    } else {
      setQuizFinished(true);
    }
  }

  function resetQuiz() {
    setCurrentQuestion(0);
    setCorrectAnswers(0);
    setSelectedOption(null);
    setFeedbackMessage('');
    setQuizFinished(false);
  }

  if (loading) return <p>Carregando...</p>;

  if (questions.length === 0) return <p>Sem perguntas disponíveis.</p>;

  return (
    <div className="p-6 text-white">
      {!quizFinished ? (
        <>
          <h1 className="text-2xl mb-4">Pergunta: {questions[currentQuestion].text}</h1>
          <div>
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id, option.isCorrect)}
                className={`block my-2 py-2 px-4 rounded-lg ${
                  selectedOption === option.id
                    ? option.isCorrect
                      ? 'bg-green-500'
                      : 'bg-red-500'
                    : 'bg-blue-500'
                }`}
                disabled={selectedOption !== null} // Desabilita os botões após uma resposta
              >
                {option.text}
              </button>
            ))}
          </div>
          {feedbackMessage && <p className="mt-4">{feedbackMessage}</p>}
          <button
            onClick={handleNextQuestion}
            className="mt-4 py-2 px-4 bg-gray-700 hover:bg-gray-800 rounded"
            disabled={selectedOption === null} // Apenas habilita o botão se uma resposta foi selecionada
          >
            Próxima Pergunta
          </button>
        </>
      ) : (
        <div>
          <h1 className="text-2xl mb-4">Quiz Finalizado!</h1>
          <p>
            Você acertou {correctAnswers} de {questions.length} perguntas.
            <br />
            Sua pontuação: {(correctAnswers / questions.length) * 100}%
          </p>
          <button
            onClick={() => router.push('/categories')}
            className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded"
          >
            Voltar para Categorias
          </button>
          <button
            onClick={resetQuiz}
            className="mt-4 ml-2 py-2 px-4 bg-gray-700 hover:bg-gray-800 rounded"
          >
            Refazer Quiz
          </button>
        </div>
      )}
    </div>
  );
}
