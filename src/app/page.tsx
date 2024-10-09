import Image from "next/image";

export default function Home() {
  return (
    <div className="grid min-h-screen p-8 sm:p-20 gap-16 items-center justify-items-center">
      <main className="flex flex-col gap-12 items-center">
        {/* Logo */}
        <div className="flex justify-center w-full">
          <Image
            src="/images/logo.png"
            alt="Quizzma logo"
            width={580}
            height={38}
            priority
          />
        </div>

        {/* Textos */}
        <div className="text-center">
          <h1 className="mb-2 text-4xl sm:text-6xl text-white">
            Conhecimento nunca é demais!
          </h1>
          <p className="text-gray-400 text-lg">
            Aprenda mais sobre um dos principais problemas da sociedade:
            <span className="block text-blue-400 font-bold">
              Desigualdade de Gênero
            </span>
          </p>
        </div>

        {/* Botão */}
        <div className="flex justify-center w-full">
          <a
            className="mt-6 rounded-full border border-solid border-gray-300 dark:border-[#529DE3] transition-colors flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#529DE3] text-sm sm:text-base h-12 px-8"
            href="/registro"
            target="_blank"
            rel="noopener noreferrer"
          >
            Continuar
          </a>
        </div>
      </main>

      <footer className="flex gap-6 items-center justify-end">
        <a href="https://github.com/LucasAnselmo044">
          Sobre nós
        </a>
      </footer>
    </div>
  );
}
