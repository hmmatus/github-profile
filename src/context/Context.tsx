import { RepoI } from '@/models/repo.model';
import { UserI } from '@/models/user.model';
import React, { ReactNode, createContext, useContext, useState } from 'react';

interface UserContextType {
  user: UserI;
  updateUser: (user: UserI) => void;
}

const initialState: Partial<UserI> = {
  avatar_url: '', followers : 0, following : 0, location : '', name : '', bio : ''
}
const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState(initialState);

  const updateUser = (user: UserI) => {
    return setUser(user);
  }

  return (
    <UserContext.Provider value={{user, updateUser}}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  return context;
}

