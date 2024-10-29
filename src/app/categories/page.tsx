// app/categorias/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCategories } from '../../services/quizApi';

export default function CategoriasPage() {
  const [categories, setCategories] = useState([]);
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
            key={category.id} // Usando o `id` da categoria como chave
            onClick={() => router.push(`/quiz/${category.name}`)} // Usando `category.name` para definir a rota
            className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg"
          >
            {category.name} {/* Renderizando apenas o nome da categoria */}
          </button>
        ))}
      </div>
    </div>
  );
}
