import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Review {
  id: string;
  productId: number;
  author: string;
  rating: number;
  text: string;
  date: string;
  helpful: number;
}

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'helpful'>) => void;
  getProductReviews: (productId: number) => Review[];
  getProductRating: (productId: number) => { average: number; count: number };
  markHelpful: (reviewId: string) => void;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

const INITIAL_REVIEWS: Review[] = [
  {
    id: '1',
    productId: 1,
    author: 'Мария К.',
    rating: 5,
    text: 'Отличный мишка! Мягкий, качественный, ребёнок в восторге!',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    helpful: 12,
  },
  {
    id: '2',
    productId: 1,
    author: 'Алексей П.',
    rating: 5,
    text: 'Подарили на день рождения дочке, она не выпускает из рук. Очень довольны покупкой!',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    helpful: 8,
  },
  {
    id: '3',
    productId: 2,
    author: 'Елена С.',
    rating: 4,
    text: 'Конструктор хороший, но детали мелковаты для малышей. Подходит от 4 лет.',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    helpful: 15,
  },
  {
    id: '4',
    productId: 6,
    author: 'Дмитрий В.',
    rating: 5,
    text: 'Робот просто космос! Трансформируется легко, качество на высоте. Сын счастлив!',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    helpful: 20,
  },
];

export const ReviewProvider = ({ children }: { children: ReactNode }) => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('toy-reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  useEffect(() => {
    localStorage.setItem('toy-reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (review: Omit<Review, 'id' | 'date' | 'helpful'>) => {
    const newReview: Review = {
      ...review,
      id: `review-${Date.now()}`,
      date: new Date().toISOString(),
      helpful: 0,
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  const getProductReviews = (productId: number) => {
    return reviews.filter((r) => r.productId === productId);
  };

  const getProductRating = (productId: number) => {
    const productReviews = getProductReviews(productId);
    if (productReviews.length === 0) return { average: 0, count: 0 };
    
    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
    return {
      average: Math.round((sum / productReviews.length) * 10) / 10,
      count: productReviews.length,
    };
  };

  const markHelpful = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r))
    );
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReview,
        getProductReviews,
        getProductRating,
        markHelpful,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within ReviewProvider');
  }
  return context;
};
