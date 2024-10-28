import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Profile () {
    const { data: session, status } = useSession();
    const router = useRouter();
  // Redireciona para a página de login se o usuário não estiver autenticado
    if (status === 'unauthenticated') router.push('/login');

    return (
        <div>
            aaa
        </div>
    )
}