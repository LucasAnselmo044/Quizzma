import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession as nextAuthGetServerSession } from "next-auth/react";

// Configuração do NextAuth
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",  // Define a estratégia para "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
});

// Função getSession para ser usada no lado do servidor (API routes)
export const getSession = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Obtendo a sessão do NextAuth
    const session = await nextAuthGetServerSession({ req, res });
    return session;
  } catch (error) {
    console.error('Erro ao obter a sessão:', error);
    return null; // Caso haja erro, retorna null
  }
};
