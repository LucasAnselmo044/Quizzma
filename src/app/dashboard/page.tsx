'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/button';

export default function DashBoard() {
    const {data: session, status} = useSession();
    const router = useRouter();

    if (status === "unauthenticated") router.push("/login")
        
    return (
        <div className="grid min-h-screen p-8 sm:p-20 gap-16 items-center justify-items-center">
            <main>                  
                <Button>
                    Teste
                </Button>
            </main>
        </div>
    );
}