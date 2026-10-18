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
    const [userID, setUserID] = useState(3);

    const updateUserID = (newID: number) => {
        setUserID(newID)
    }

    return (
        <UserContext.Provider value={{ userID, updateUserID }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUserContext must be used within a UserContext provider")
    }

    return context
}
