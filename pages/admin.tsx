import { useEffect, useState } from "react";
import Admin from "../template/admin";
import { useRouter } from 'next/router'


export default function LoginPage() {
    const [user, setUser] = useState<any>()
    const router = useRouter()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const currentUser: any | string = JSON.parse(window.localStorage.getItem('cliente') || '{}')
            if (currentUser.tipoDeUsuario) {
                setUser(currentUser.tipoDeUsuario)
            }
        }
    }, [])


    return <Admin />
}