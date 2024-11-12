'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import NavBar from '../components/Navbar';
import { motion } from 'framer-motion';
import MobileNav from '../components/MobileNav';
import DailyChallenge from '../components/DailyChallenge'; // Importa o componente

export default function DashBoard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userLevel, setUserLevel] = useState<string>('');

  // Buscando o nível do usuário da API
  useEffect(() => {
    const fetchUserLevel = async () => {
      if (session?.user?.id) {
        const response = await fetch('/api/user/quizzes'); // Chama a API que retorna o nível
        const data = await response.json();
        
        if (!data.error) {
          setUserLevel(data.level); // Define o nível do usuário
        }
      }
    };

    fetchUserLevel();
  }, [session]);

  if (status === 'unauthenticated') {
    router.push('/signin');
    return null;
  }

  if (status === 'loading') {
    return <p className="text-center text-white">Carregando...</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600 flex flex-col items-center justify-center"
    >
      <div className="xl:block hidden">
        <NavBar />
      </div>
      <div className="xl:hidden text-white text-3xl p-4 absolute top-4 left-4 z-10">
        <MobileNav />
      </div>

      <main className="text-center p-6 sm:p-10">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-white text-4xl font-extrabold mb-4 animate-pulse shadow-lg"
        >
          Bem-Vindo ao <span className="text-blue-300">Quizzma!</span>
        </motion.h1>
        <p className="text-gray-300 text-lg font-light max-w-lg mx-auto mb-8">
          Desafie-se em quizzes interativos sobre Desigualdade de Gênero e aprenda enquanto joga!
        </p>

        {/* Adiciona o componente DailyChallenge aqui */}
        <div className="mb-8">
          <DailyChallenge />
        </div>

        <div className='flex flex-col justify-center items-center'>
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
    </motion.div>
  );
}
