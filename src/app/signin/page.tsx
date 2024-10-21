'use client';

import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { Button } from '../components/button';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter ();

  const {status} = useSession() 

  if (status == "authenticated") router.push("/dashboard")

  return (
    <main className="h-screen flex justify-center items-center bg-blue-400 px-5">
      <div className="flex flex-col items-center space-y-6 w-full max-w-sm">
        {/* Logo */}
        <Image
          src="/images/logo.png"
          alt="Logo do Quizzma"
          width={530}
          height={150}
          priority
        />

        {/* Formulário de Login */}
        <div className="bg-black p-8 rounded-3xl w-full space-y-4">
          <h1 className="text-center text-white text-2xl font-bold mb-6">Login</h1>

          {/* Email Input */}
          <div className="relative">
            <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 bg-white rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Senha Input */}
          <div className="relative">
            <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              className="w-full pl-10 pr-10 py-2 bg-white rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
          </div>

          {/* Botão Fazer Login */}
          <Button className='w-full'>
            Fazer Login
          </Button>

          <p className="text-center text-white mt-4">Ou</p>

          {/* Botão Login com Google */}
          <button
            className="flex items-center justify-center w-full bg-gray-200 text-black py-2 rounded-lg mt-2 hover:bg-gray-300"
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
          </button>

          {/* Botão Login com GitHub */}
          <button
            className="flex items-center justify-center w-full bg-gray-200 text-black py-2 rounded-lg mt-2 hover:bg-gray-300"
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
          </button>

          {/* Link para Cadastro */}
          <div className="text-center mt-6">
            <p className="text-white text-sm">
              Não tem uma conta? <a href="/signup" className="text-blue-500 underline">Criar Conta</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
