import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function QuizPage() {
  const [quiz, setQuiz] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      async function fetchQuiz() {
        const res = await fetch(`/api/quizzes/${id}`);
        const data = await res.json();
        setQuiz(data);
      }
      fetchQuiz();
    }
  }, [id]);

  if (!quiz) return <p>Carregando...</p>;

  return (
    <div>
      <h1>{quiz.title}</h1>
      <p>{quiz.description}</p>
      <ul>
        {quiz.questions.map((question) => (
          <li key={question.id}>
            <p>{question.text}</p>
            <ul>
              {question.options.map((option) => (
                <li key={option.id}>{option.text}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
