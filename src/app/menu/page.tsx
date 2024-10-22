'use client';

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Menu () {
    const {data: session, status} = useSession();
    const router = useRouter();

    if (status === "unauthenticated") router.push('/signin')

    return (
        <main>

        </main>
    )
}