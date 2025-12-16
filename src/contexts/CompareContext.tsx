import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CompareItem {
  id: number;
  name: string;
  price: number;
  emoji: string;
  category: string;
  age: string;
  inStock: boolean;
}

interface CompareContextType {
  items: CompareItem[];
  addToCompare: (item: CompareItem) => void;
  removeFromCompare: (id: number) => void;
  isInCompare: (id: number) => boolean;
  toggleCompare: (item: CompareItem) => void;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CompareItem[]>(() => {
    const saved = localStorage.getItem('toy-compare');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('toy-compare', JSON.stringify(items));
  }, [items]);

  const addToCompare = (item: CompareItem) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      if (prev.length >= 4) return prev;
      return [...prev, item];
    });
  };

  const removeFromCompare = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const isInCompare = (id: number) => {
    return items.some((i) => i.id === id);
  };

  const toggleCompare = (item: CompareItem) => {
    if (isInCompare(item.id)) {
      removeFromCompare(item.id);
    } else {
      if (items.length >= 4) return;
      addToCompare(item);
    }
  };

  const clearCompare = () => {
    setItems([]);
  };

  return (
    <CompareContext.Provider
      value={{
        items,
        addToCompare,
        removeFromCompare,
        isInCompare,
        toggleCompare,
        clearCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within CompareProvider');
  }
  return context;
};
