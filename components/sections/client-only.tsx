'use client'
import { useEffect, useState } from "react";

interface Props {
    children: React.ReactNode;
}

export default function ClientOnly({children}: Props) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return <>{children}</>;
}