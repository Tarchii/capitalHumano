import React, { createContext } from 'react';

export interface AppData {
  isAuthed: boolean;
  username: string;
}

type AppContext = [
  user: AppData,
  setUser: React.Dispatch<React.SetStateAction<AppData>>
];

export default createContext(null! as AppContext);
