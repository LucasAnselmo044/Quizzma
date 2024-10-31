'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/button';
import Image from 'next/image';

export default function DashBoard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redireciona para a página de login se o usuário não estiver autenticado
  if (status === 'unauthenticated') {
    router.push('/signin');
    return null;
  }

  // Exibe uma mensagem de carregamento enquanto o estado da sessão é verificado
  if (status === 'loading') {
    return <p className="text-center text-white">Carregando...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-700 animate-gradient">
      <main className="grid p-8 sm:p-20 gap-16 items-center justify-items-center">
        <h1 className="text-white text-4xl font-extrabold mb-4 animate-pulse shadow-lg">
          Bem-Vindo ao <span className="text-blue-300">Quizzma!</span>
        </h1>
        <p className="text-gray-300 text-lg font-light max-w-lg mx-auto">
          Desafie-se em quizzes interativos sobre Desigualdade de Gênero e aprenda enquanto joga!
        </p>

        <div className="flex flex-col items-center space-y-6">
          <div className="p-2 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full border-4 border-transparent shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
            {session?.user?.image ? (
              <a href="/profile">
                <Image
                  src={session.user.image}
                  alt="Imagem do Usuário"
                  width={120}
                  height={120}
                  className="rounded-full"
                />
              </a>
            ) : (
              <div className="bg-gray-200 p-4 rounded-full">
                <svg
                  className="w-20 h-20 text-gray-400"
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

          {/* Link de Logout com integração do signOut */}
          <p className="text-blue-300 hover:underline cursor-pointer" onClick={() => signOut()}>
            Sair
          </p>

          <div className="space-y-4">
            <Button
              className="w-64 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => router.push('/categories')}
            >
              Escolher Categoria
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
