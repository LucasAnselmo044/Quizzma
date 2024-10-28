'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/button';
import Image from 'next/image';

export default function DashBoard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redireciona para a página de login se o usuário não estiver autenticado
  if (status === 'unauthenticated') router.push('/login');

  return (
    <div className="grid min-h-screen p-8 sm:p-20 gap-16 items-center justify-items-center bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 animate-gradient">
      <main className="text-center">
        {/* Boas-vindas ao usuário */}
        <h1 className="text-white text-4xl font-bold mb-2 animate-pulse">Bem-Vindo ao Quizzma!</h1>
        <p className="text-gray-300 text-lg mb-8">Desafie-se em quizzes interativos e aprenda enquanto joga!</p>

        {/* Exibe a imagem do usuário com borda animada mais fina ou um ícone padrão */}
        <div className="flex flex-col items-center space-y-6">
          <div className="p-4 rounded-full border-2 border-blue-500 bg-white shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">

            {session?.user?.image ? (
                          <a href='/profile'>
              <Image
                src={session.user.image}
                alt="Imagem do Usuário"
                width={100}
                height={100}
                className="rounded-full"
              />
                            </a>
            ) : (
              <div className="bg-gray-200 p-4 rounded-full">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 12c2.28 0 4.148-1.868 4.148-4.148S14.28 3.704 12 3.704s-4.148 1.868-4.148 4.148S9.72 12 12 12zM12 14.483c-3.14 0-9.352 1.558-9.352 4.697v1.898h18.704v-1.898c0-3.139-6.211-4.697-9.352-4.697z" />
                </svg>
              </div>

            )}
          </div>
          <p className="text-white text-2xl font-semibold">{session?.user?.name || 'Usuário'}</p>

          {/* Botões de ação */}
          <div className="space-y-4">
            <Button className="w-64 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              Escolher Categoria
            </Button>
            <Button className="w-64 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              Quiz Rápido
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
