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
              <h1 className="mb-5 xl:text-5xl text-4xl text-white font-extrabold">
                A sua diversão contribui para a diminuição da Desigualdade de Gênero
              </h1>
              <p className="text-gray-200 text-xl sm:text-2xl mb-6">
                Descubra mais sobre o impacto desse problema na nossa sociedade e aprenda de forma dinâmica
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex flex-col items-center w-full gap-4"
            >
              <Link href="/signin">
                <Button className="px-8 py-4 xl:text-3xl text-2xl text-blue-900 bg-white hover:bg-blue-900 hover:text-white transition-all transform">
                  Comece Agora
                </Button>
              </Link>

              <div className="flex flex-col items-center mt-4 text-sm text-white">
                <Link href="/about-us" className="hover:underline mb-1">
                  Sobre Nós
                </Link>
                <Link href="/terms" className="hover:underline">
                  Termos e Condições
                </Link>
              </div>
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
