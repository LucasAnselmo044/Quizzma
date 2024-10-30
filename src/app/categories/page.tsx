// app/categorias/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCategories } from '../../services/quizApi';

// Defina o tipo de categoria, incluindo quizId
interface Category {
  id: number;
  name: string;
  quizId: number; // Certifique-se de que esse campo existe na resposta
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
    <div className="p-8 text-white">
      <h1 className="text-3xl mb-6">Escolha uma Categoria</h1>
      <div className="grid gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => router.push(`/quiz/${category.quizId}`)} // Agora usando o quizId
            className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg"
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
