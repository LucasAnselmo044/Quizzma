'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/button';

export default function DashBoard() {
    const {data: session, status} = useSession();
    const router = useRouter();

    
    if (status === "unauthenticated") router.push("/login")
        
    return (
        <main>
            <div className='justify-center flex'>
                <Button>
                    Teste
                </Button>
            </div>
        </main>
    );
}