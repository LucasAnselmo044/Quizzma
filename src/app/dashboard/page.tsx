'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/button';
import NavBar from '../components/Navbar';
import MobileNav from '../components/MobileNav';
import DailyChallenge from '../components/DailyChallenge';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function DashBoard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Estado para controlar o carregamento da página
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }

    // Simula o carregamento e depois atualiza o estado
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Ajuste o tempo de carregamento conforme necessário

    return () => clearTimeout(timer);
  }, [status, router]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center filter blur-lg"
             style={{ backgroundImage: "url('/images/fundo.png')" }} />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-90" />
        <div className="flex flex-col items-center z-10">
          {/* Logo do Quizzma animada de carregamento */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/images/logo.png"
              alt="Quizzma Logo"
              width={250}  // Logo maior
              height={250} // Logo maior
            />
          </motion.div>
        </div>
      </div>
    );
  }

  // Função para determinar a saudação com base no horário
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return 'Bom Dia';
    } else if (hours < 18) {
      return 'Boa Tarde';
    } else {
      return 'Boa Noite';
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-blue-900"> {/* Azul mais escuro */}
      {/* Imagem de fundo com borrado */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center filter blur-lg"
        style={{ backgroundImage: "url('/images/fundo.png')" }}
      />
      {/* Aumentando a opacidade da camada azul para ficar bem mais escuro */}
      <div className="absolute top-0 left-0 w-full h-full bg-blue-900 opacity-80" />

      {/* Barra de navegação em desktop */}
      <div className="xl:block hidden z-20">
        <NavBar />
      </div>

      {/* Barra de navegação em mobile */}
      <div className="xl:hidden text-white text-3xl p-4 absolute top-4 left-4 z-30">
        <MobileNav />
      </div>

      <main className="text-center p-6 sm:p-10 relative z-10">
        {/* Saudação personalizada com nome do usuário */}
        {session?.user?.name && (
          <h1 className="text-white text-4xl font-extrabold mb-4">
            {`${getGreeting()}, ${session.user.name}!`}
          </h1>
        )}

        <p className="text-gray-300 text-lg font-light max-w-lg mx-auto mb-8">
          Desafie-se em quizzes interativos sobre Desigualdade de Gênero e aprenda enquanto joga!
        </p>

        {/* Componente DailyChallenge centralizado */}
        <div className="mb-8 flex justify-center">
          <DailyChallenge />
        </div>

        <div className="flex flex-col justify-center items-center">
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
