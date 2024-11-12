'use client';

import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';


export default function SignIn() {
  const router = useRouter();
  const { status } = useSession();
  const [isBlack] = useState(false);

  if (status === "authenticated") router.push("/dashboard");

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`h-screen flex justify-center items-center px-5 transition-all duration-500 ${isBlack ? 'bg-black' : 'bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600'}`}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center space-y-6 w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Image
            src="/images/logo.png"
            alt="Logo do Quizzma"
            width={530}
            height={150}
            priority
          />
        </motion.div>

        {/* Formulário de Login */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white shadow-lg rounded-3xl w-full p-8 space-y-6"
        >
          <h1 className="text-center text-black text-3xl font-bold mb-4">Bem-vindo ao Quizzma!</h1>

          {/* Botão Login com Google */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="flex items-center justify-center w-full bg-blue-600 text-white py-3 rounded-lg mt-2 hover:bg-blue-700 transition duration-300"
            onClick={() => signIn('google')}
          >
            <Image
              src="/images/google-logo.png"
              alt="Google Logo"
              width={20}
              height={20}
              className="mr-2"
            />
            Fazer login com o Google
          </motion.button>

          {/* Botão Login com GitHub */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="flex items-center justify-center w-full bg-gray-800 text-white py-3 rounded-lg mt-2 hover:bg-gray-700 transition duration-300"
            onClick={() => signIn('github')}
          >
            <Image
              src="/images/github-logo.png"
              alt="GitHub Logo"
              width={20}
              height={20}
              className="mr-2"
            />
            Fazer login com o GitHub
          </motion.button>
            <div className='flex flex-col justify-center items-center'>
              <Link href="/" className="hover:underline mb-1 text-black">
                 Voltar
              </Link>
            </div>
        </motion.div>
      </motion.div>
    </motion.main>
  );
}
