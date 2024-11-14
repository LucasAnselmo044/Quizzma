'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCategories } from '../../services/quizApi';
import Image from 'next/image';

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
    <div className="relative min-h-screen bg-black bg-opacity-70 p-8 flex flex-col items-center justify-center text-white">
      {/* Imagem de fundo com desfoque */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center filter blur-lg -z-10"
        style={{ backgroundImage: "url('/images/fundo-dashboard.jpg')" }}
      />

      {/* Filtro azul sobre a imagem */}
      <div className="absolute top-0 left-0 w-full h-full bg-blue-900 opacity-70 -z-10" />

      {/* Logo do Quizzma no topo */}
      <div className="z-10 mb-12">
        <Image
          src="/images/logo.png"
          alt="Logo do Quizzma"
          width={250}
          height={250}
          className="object-contain"
        />
      </div>

      {/* Título da página */}
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-200 z-10">
        Categorias de hoje:
      </h1>

      {/* Lembrete sobre o uso dos dados */}
      <p className="text-center text-blue-100 mb-8 max-w-lg z-10">
        <strong>Lembrete:</strong> Usamos as respostas dos quizzes para criar relatórios de desempenho geral. Estes relatórios poderão ser compartilhados com organizações parceiras e ONGs que atuam na promoção da igualdade de gênero.
      </p>

      {/* Grid de categorias */}
      <div className="flex flex-col items-center w-full max-w-5xl z-10">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => router.push(`/quiz/${category.quizId}`)}
            className="bg-blue-600 hover:bg-blue-700 py-6 px-6 rounded-lg shadow-lg shadow-blue-900 transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 mb-6 w-full"
          >
            <span className="text-lg font-semibold text-white">
              {category.name}
            </span>
          </button>
        ))}
      </div>

      {/* Botão de Voltar */}
      <button
        onClick={() => router.push('/dashboard')}
        className="mt-8 py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg shadow-blue-900 transition-all duration-200 z-10"
      >
        Voltar
      </button>
    </div>
  );
}
