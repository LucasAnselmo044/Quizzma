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

          {/* Link para Sobre Nós */}
          <p className="mt-4 text-sm">
            <Link href="/about-us" className="text-white hover:underline">
              Sobre Nós
            </Link>
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

        {/* Nosso Impacto e Objetivo */}
        <div className="w-full max-w-2xl mx-auto text-center text-white mt-12 opacity-0 animate-slideIn delay-600">
          <h2 className="text-2xl font-bold mb-4">Nosso Impacto e Objetivo</h2>
          <p className="text-lg mb-4">
            O Quizzma foi criado com uma visão de futuro: estabelecer uma parceria com o governo 
            para apoiar campanhas de conscientização sobre a desigualdade de gênero. Nosso objetivo é que, a cada cem quizzes completados, uma doação possa ser feita para iniciativas que promovam igualdade.
          </p>
          <p className="text-lg">
            Junte-se a nós e ajude a tornar essa visão realidade. Com o seu apoio, podemos mostrar ao governo o impacto que nossa comunidade é capaz de criar!
          </p>
        </div>

        {/* Texto Informativo sobre Denúncias */}
        <div className="w-full max-w-2xl mx-auto text-center text-white mt-12 opacity-0 animate-slideIn delay-800">
          <h2 className="text-2xl font-bold mb-4">Atenção!</h2>
          <p className="text-lg mb-4">
            Se você ou alguém que você conhece está enfrentando situações de violência ou assédio,
            não hesite em buscar ajuda. <span className="block text-xl font-bold">DENUNCIE!</span> A denúncia é um ato de coragem e pode salvar vidas.
          </p>
          <p className="text-lg font-semibold mb-2">
            Ligue para o Disque 180
          </p>
          <p className="text-lg">
            Este serviço é gratuito, sigiloso e funciona 24 horas por dia. Sua voz é importante!
          </p>
        </div>

        {/* Footer com Logo do GitHub */}
        <footer className="flex gap-6 items-center justify-center opacity-0 animate-fadeIn delay-600 mt-12">
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
      </main>
    </div>
  );
}
