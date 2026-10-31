// User Context custom React hook
// Context is wrapped around the entire application so that user info is accessible everywhere
// Avoids prop drilling this ID value through components
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react'

interface UserType {
    userID: number,
    updateUserID: (newID: number) => void
}

interface UserProviderProps {
    children: ReactNode;
}

const UserContext = createContext<UserType | null>(null)

export function UserContextProvider({children}: UserProviderProps ) {
    const [userID, setUserID] = useState(localStorage.getItem('userID') ? parseInt(localStorage.getItem('userID')!) : 3);
    const updateUserID = (newID: number) => {
        setUserID(newID);
        localStorage.setItem('userID', String(newID))
    }
    return (
        <UserContext value={{ userID, updateUserID }}>
            {children}
        </UserContext>
    )
}

export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserContext provider")
    }
    return context
}
