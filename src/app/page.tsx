import Image from "next/image";
import GitHub from "next-auth/providers/github";
import Link from "next/link";

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
          <h1 className="mb-5 text-4xl sm:text-6xl text-white">
            Conhecimento nunca é demais!
          </h1>
          <p className="text-gray-400 text-2xl">
            Aprenda mais sobre um dos principais problemas da sociedade:
            <span className="block text-blue-400 font-bold">
              Desigualdade de Gênero
            </span>
          </p>
          <p className="text-gray-400 text-2xl">
            E melhor ainda, aprenda de forma dinâmica e sem enrolação, através dos Quizes interativos!
          </p>
        </div>

        {/* Botão */}
        <div className="flex justify-center w-full">
          <a
            className="mt-6 rounded-full border border-solid border-gray-300 dark:border-[#529DE3] transition-colors flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#529DE3] text-sm sm:text-base h-12 px-8"
            href="/signup"
            target="_blank"
            rel="noopener noreferrer"
          >
            Crie Sua Conta
          </a>
        </div>
        <div className="flex justify-center w-full">
          <p>Ou
          <a href="/signin" className="text-blue-400"> Faça Login </a>
          </p> 
        </div>
      </main>

      <footer className="flex gap-6 items-center justify-end">
        <Link href={"https://github.com/LucasAnselmo044"} >
        <Image src="/images/github-logo-white.png" alt="Github logo" width={50} height={50} className="mr-2"/>
        </Link>
      </footer>
    </div>
  );
}
