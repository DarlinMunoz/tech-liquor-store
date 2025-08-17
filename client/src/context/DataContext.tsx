"use client";

import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

interface DataContextType {
  user: string | null;
  setUser: Dispatch<SetStateAction<string | null>>;
}

export const DataContext = createContext<DataContextType>({} as DataContextType);

// Provider
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  return (
    <DataContext.Provider value={{ user, setUser }}>
      {children}
    </DataContext.Provider>
  );
}
