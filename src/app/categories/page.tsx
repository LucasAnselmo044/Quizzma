'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCategories } from '../../services/quizApi';

interface Category {
  id: number;
  name: string;
  quizId: number;
}

export default function CategoriasPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function loadCategories() {
      const data = await fetchCategories();
      setCategories(data);
    }
    loadCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 p-8 flex flex-col items-center text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-200 shadow-lg">
        Escolha uma Categoria
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => router.push(`/quiz/${category.quizId}`)}
            className="bg-blue-500 hover:bg-blue-600 py-3 px-5 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
          >
            <span className="text-lg font-semibold text-white">{category.name}</span>
          </button>
        ))}
      </div>
      {/* Botão de Voltar */}
      <button
        onClick={() => router.push('/dashboard')} // Ajuste o caminho conforme necessário
        className="mt-8 py-2 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
      >
        Voltar
      </button>
    </div>
  );
}
