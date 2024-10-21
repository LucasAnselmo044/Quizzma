"use client";

import { useSession } from 'next-auth/react';

export default function DashBoard() {
    const {data: session, status} = useSession() 

    if (status === "authenticated") {
        return <p>Bem vindo {session.user?.name}</p>
    }

    return (
        <main>
        
        </main>
    );
}