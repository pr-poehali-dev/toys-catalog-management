import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Order {
  id: string;
  date: string;
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    emoji: string;
  }[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('toy-orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('toy-orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order: Omit<Order, 'id' | 'date' | 'status'>) => {
    const newOrder: Order = {
      ...order,
      id: `ORDER-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'processing',
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order))
    );
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within OrderProvider');
  }
  return context;
};
