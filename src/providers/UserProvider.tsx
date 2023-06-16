import { createContext, FC, useState } from "react";
import { IUser } from "../types/IBookItem";

export interface IUserContext {
    isLogin: boolean;
    setIsLogin: (active: boolean) => void;
    user: IUser;
    setUser: (user: IUser) => void;
    openDropdownName: IOpenDropdownName
    setOpenDropdownName: (active: IOpenDropdownName) => void
}

type IOpenDropdownName = null | 'searchDropdown' | 'favoritesDropdown'

export const UserContext = createContext<IUserContext>({
    isLogin: false,
    setIsLogin: (active: boolean) => { return null },
    user: {} as IUser,
    setUser: (user: IUser) => { return null },
    openDropdownName: null,
    setOpenDropdownName: (_active: IOpenDropdownName) => { return null }
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<IUser>(JSON.parse(localStorage.getItem('user') ?? '{}'))
    const [isLogin, setIsLogin] = useState<boolean>(Boolean(localStorage.getItem('user')))
    const [openDropdownName, setOpenDropdownName] = useState<IOpenDropdownName>(null)

    return (
        <UserContext.Provider value={{ isLogin, setIsLogin, user, setUser, openDropdownName, setOpenDropdownName }}>
            {children}
        </UserContext.Provider >
    )
}