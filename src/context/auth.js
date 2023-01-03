import { createContext, useState } from 'react';

export const DataContext = createContext({});

export default function DataProvider({ children }) {


    return (
      <DataContext.Provider value={{ }}>
        {children}
      </DataContext.Provider>
    );
  }