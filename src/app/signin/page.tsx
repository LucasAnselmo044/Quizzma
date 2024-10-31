'use client';

import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();
  const { status } = useSession();

  if (status === "authenticated") router.push("/dashboard");

  return (
    <main className="h-screen flex justify-center items-center bg-blue-500 px-5">
      <div className="flex flex-col items-center space-y-6 w-full max-w-md">
        {/* Logo */}
        <Image
          src="/images/logo.png"
          alt="Logo do Quizzma"
          width={530}
          height={150}
          priority
        />

        {/* Formulário de Login */}
        <div className="bg-white shadow-lg rounded-3xl w-full p-8 space-y-6">
          <h1 className="text-center text-blue-600 text-3xl font-bold mb-4">Bem-vindo ao Quizzma!</h1>

          {/* Botão Login com Google */}
          <button
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
          </button>

          {/* Botão Login com GitHub */}
          <button
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
          </button>
        </div>
      </div>
    </main>
  );
}
