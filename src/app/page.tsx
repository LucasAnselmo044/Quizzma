'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./components/button";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Mostrar o conteúdo após a animação da logo
    const timer = setTimeout(() => setShowContent(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
      <AnimatePresence>
        {!showContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 flex items-center justify-center"
          >
            <Image
              src="/images/logo.png"
              alt="Quizzma logo"
              width={580}
              height={38}
              priority
              className="filter brightness-110"
            />
          </motion.div>
        )}

        {showContent && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-full grid gap-16 justify-items-center items-center bg-gradient-to-b from-blue-800 via-blue-700 to-blue-600 p-8 sm:p-20"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex justify-center w-full"
            >
              <Image
                src="/images/logo.png"
                alt="Quizzma logo"
                width={580}
                height={38}
                priority
                className="filter brightness-110"
              />
            </motion.div>

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-center"
            >
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
              <p className="mt-4 text-sm">
                <Link href="/about-us" className="text-white hover:underline">
                  Sobre Nós
                </Link>
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex justify-center w-full"
            >
              <Link href="/signin">
                <Button className="px-8 py-4 text-2xl sm:text-3xl text-blue-900 bg-white hover:bg-gray-100 transition-all transform hover:scale-105">
                  Comece Agora
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="w-full max-w-2xl mx-auto text-center text-white mt-12"
            >
              <h2 className="text-2xl font-bold mb-4">Nosso Impacto e Objetivo</h2>
              <p className="text-lg mb-4">
                O Quizzma foi criado com uma visão de futuro: estabelecer uma parceria com o governo 
                para apoiar campanhas de conscientização sobre a desigualdade de gênero. Nosso objetivo é que, a cada cem quizzes completados, uma doação possa ser feita para iniciativas que promovam igualdade.
              </p>
              <p className="text-lg">
                Junte-se a nós e ajude a tornar essa visão realidade. Com o seu apoio, podemos mostrar ao governo o impacto que nossa comunidade é capaz de criar!
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="w-full max-w-2xl mx-auto text-center text-white mt-12"
            >
              <h2 className="text-2xl font-bold mb-4">Atenção!</h2>
              <p className="text-lg mb-4">
                Se você ou alguém que você conhece está enfrentando situações de violência ou assédio,
                não hesite em buscar ajuda. <span className="block text-xl font-bold">DENUNCIE!</span> A denúncia é um ato de coragem e pode salvar vidas.
              </p>
              <p className="text-lg font-semibold mb-2">Ligue para o Disque 180</p>
              <p className="text-lg">
                Este serviço é gratuito, sigiloso e funciona 24 horas por dia. Sua voz é importante!
              </p>
            </motion.div>

            <motion.footer
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="flex gap-6 items-center justify-center mt-12"
            >
              <Link href="https://github.com/LucasAnselmo044">
                <Image
                  src="/images/github-logo-white.png"
                  alt="Github logo"
                  width={50}
                  height={50}
                  className="hover:opacity-80 transition-opacity"
                />
              </Link>
            </motion.footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
