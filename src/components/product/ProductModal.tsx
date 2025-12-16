import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useReviews } from '@/contexts/ReviewContext';
import { useToast } from '@/hooks/use-toast';

interface Toy {
  id: number;
  name: string;
  price: number;
  age: string;
  category: string;
  emoji: string;
  inStock: boolean;
}

interface ProductModalProps {
  product: Toy;
  open: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, open, onClose }: ProductModalProps) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { getProductReviews, getProductRating, addReview, markHelpful } = useReviews();
  const { toast } = useToast();

  const [reviewForm, setReviewForm] = useState({
    author: '',
    rating: 5,
    text: '',
  });

  const reviews = getProductReviews(product.id);
  const rating = getProductRating(product.id);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: '',
      emoji: product.emoji,
    });
    toast({
      title: 'Добавлено в корзину! 🎉',
      description: `${product.name} добавлен в вашу корзину`,
    });
  };

  const handleToggleWishlist = () => {
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
      category: product.category,
      age: product.age,
    });
    toast({
      title: isInWishlist(product.id) ? 'Удалено из избранного' : 'Добавлено в избранное! ❤️',
    });
  };

  const handleSubmitReview = () => {
    if (!reviewForm.author || !reviewForm.text) {
      toast({
        title: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }

    addReview({
      productId: product.id,
      author: reviewForm.author,
      rating: reviewForm.rating,
      text: reviewForm.text,
    });

    toast({
      title: 'Отзыв добавлен! 🎉',
      description: 'Спасибо за ваше мнение!',
    });

    setReviewForm({ author: '', rating: 5, text: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 flex items-center justify-center flex-shrink-0 md:w-64">
              <span className="text-9xl">{product.emoji}</span>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="outline">{product.age} лет</Badge>
                <Badge variant="secondary">{product.category}</Badge>
                {product.inStock ? (
                  <Badge className="bg-green-500">В наличии</Badge>
                ) : (
                  <Badge variant="destructive">Нет в наличии</Badge>
                )}
              </div>

              {rating.count > 0 && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        className={`h-5 w-5 ${i < Math.round(rating.average) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{rating.average}</span>
                  <span className="text-muted-foreground">({rating.count} отзывов)</span>
                </div>
              )}

              <p className="text-4xl font-bold text-primary">{product.price} ₽</p>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  <Icon name="ShoppingBag" className="mr-2 h-5 w-5" />
                  В корзину
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleToggleWishlist}
                  className={isInWishlist(product.id) ? 'text-red-500' : ''}
                >
                  <Icon name="Heart" className="h-5 w-5" fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="reviews" className="flex-1">
                Отзывы ({reviews.length})
              </TabsTrigger>
              <TabsTrigger value="write" className="flex-1">
                Написать отзыв
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reviews" className="space-y-4 mt-4">
              {reviews.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Пока нет отзывов. Будьте первым!
                </div>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{review.author}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p>{review.text}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markHelpful(review.id)}
                      className="gap-2"
                    >
                      <Icon name="ThumbsUp" className="h-4 w-4" />
                      Полезно ({review.helpful})
                    </Button>
                  </div>
                ))
              )}
            </TabsContent>

            <TabsContent value="write" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="author">Ваше имя</Label>
                <Input
                  id="author"
                  value={reviewForm.author}
                  onChange={(e) => setReviewForm({ ...reviewForm, author: e.target.value })}
                  placeholder="Иван Иванов"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Оценка</Label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className="focus:outline-none"
                    >
                      <Icon
                        name="Star"
                        className={`h-8 w-8 cursor-pointer transition-colors ${
                          star <= reviewForm.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="review">Ваш отзыв</Label>
                <Textarea
                  id="review"
                  value={reviewForm.text}
                  onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                  placeholder="Расскажите о вашем опыте..."
                  className="mt-1 min-h-[120px]"
                />
              </div>

              <Button size="lg" onClick={handleSubmitReview} className="w-full">
                <Icon name="Send" className="mr-2 h-5 w-5" />
                Отправить отзыв
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
