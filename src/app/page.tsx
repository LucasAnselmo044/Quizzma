'use client'

import Image from "next/image";
import Link from "next/link";
import { Button } from "./components/button";

export default function Home() {
  return (
    <div className="grid min-h-screen p-8 sm:p-20 gap-16 items-center justify-items-center bg-gradient-to-b from-blue-800 via-blue-700 to-blue-600">
      <main className="flex flex-col gap-12 items-center animate-fadeIn">
        
        {/* Logo */}
        <div className="flex justify-center w-full opacity-0 animate-slideIn">
          <Image
            src="/images/logo.png"
            alt="Quizzma logo"
            width={580}
            height={38}
            priority
            className="filter brightness-110"
          />
        </div>

        {/* Textos */}
        <div className="text-center opacity-0 animate-slideIn delay-200">
          <h1 className="mb-5 text-4xl sm:text-6xl text-white font-extrabold">
            Conhecimento nunca é demais!
          </h1>
          <p className="text-gray-200 text-xl sm:text-2xl mb-6">
            Descubra mais sobre o impacto da{" "}
            <span className="block text-white font-semibold text-2xl sm:text-3xl">
              Desigualdade de Gênero
            </span>
            e aprenda de forma dinâmica e divertida através de quizzes interativos!
          </p>
        </div>

        {/* Botão de Ação */}
        <div className="flex justify-center w-full opacity-0 animate-slideIn delay-400">
          <Link href="/signin">
            <Button className="px-8 py-4 text-2xl sm:text-3xl text-blue-900 bg-white hover:bg-gray-100 transition-all transform hover:scale-105">
              Comece Agora
            </Button>
          </Link>
        </div>
      </main>

      <footer className="flex gap-6 items-center justify-end opacity-0 animate-fadeIn delay-600">
        <Link href="https://github.com/LucasAnselmo044">
          <Image
            src="/images/github-logo-white.png"
            alt="Github logo"
            width={50}
            height={50}
            className="hover:opacity-80 transition-opacity"
          />
        </Link>
      </footer>
      
      {/* Animações de Entrada */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out forwards;
        }
        .animate-slideIn {
          animation: slideIn 1s ease-in-out forwards;
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes slideIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
