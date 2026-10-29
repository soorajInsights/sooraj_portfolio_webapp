import React, { createContext, useContext, useState } from 'react';
import { PortfolioData } from '../types/portfolio';
import { defaultPortfolioData } from '../data/portfolioData';

interface PortfolioContextType {
  data: PortfolioData;
  isResumeModalOpen: boolean;
  setIsResumeModalOpen: (open: boolean) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data] = useState<PortfolioData>(defaultPortfolioData);

  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isResumeModalOpen,
        setIsResumeModalOpen,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
