'use client'

import { useState } from 'react';
import Image from 'next/image';
import { EyeIcon, EyeSlashIcon, UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function Registro() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <main className="h-screen flex flex-col justify-center items-center bg-blue-400 px-5">
            {/* Logo */}
            <div className="mb-4">
                <Image
                    src="/images/logo.png"
                    alt="Logo Quizzma"
                    width={530} // Ajuste o tamanho conforme necessário
                    height={150}
                />
            </div>

            <div className="bg-black p-8 rounded-3xl w-full max-w-md space-y-4 relative">
                {/* Formulário de Registro */}
                <div className="space-y-4">
                    <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Nome"
                            className="w-full pl-10 pr-4 py-2 bg-white rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Nome de Usuário"
                            className="w-full pl-10 pr-4 py-2 bg-white rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="relative">
                        <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full pl-10 pr-4 py-2 bg-white rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="relative">
                        <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Senha"
                            className="w-full pl-10 pr-10 py-2 bg-white rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                        </button>
                    </div>

                    <div className="relative">
                        <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirme a Senha"
                            className="w-full pl-10 pr-10 py-2 bg-white rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Link e Botão */}
                <div className="text-center mt-6">
                    <p className="text-white text-sm">
                        Já tem uma conta? <a href="/login" className="text-blue-500 underline">Login</a>
                    </p>
                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600">
                        CRIAR CONTA
                    </button>
                </div>
            </div>
        </main>
    );
}
