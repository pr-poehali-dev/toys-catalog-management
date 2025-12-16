import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: '',
      emoji: item.emoji,
    });
    toast({
      title: 'Добавлено в корзину! 🎉',
      description: `${item.name} добавлен в вашу корзину`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-blue-50">
      <header className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b-4 border-primary">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <Icon name="ArrowLeft" size={24} />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Список желаний
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Ваши любимые игрушки
                </p>
              </div>
            </div>
            <Link to="/">
              <Button size="lg" className="gap-2">
                <Icon name="Store" size={20} />
                В магазин
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-muted/50 p-12 rounded-full mb-6">
              <Icon name="Heart" size={64} className="text-muted-foreground" />
            </div>
            <h2 className="text-3xl font-bold mb-3">Список желаний пуст</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              Добавляйте понравившиеся игрушки в избранное
            </p>
            <Link to="/">
              <Button size="lg" className="gap-2">
                <Icon name="Search" className="h-5 w-5" />
                Найти игрушки
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-lg text-muted-foreground">
                Сохранено игрушек:{' '}
                <span className="font-bold text-primary text-2xl">
                  {items.length}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <Card
                  key={item.id}
                  className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-2xl border-2 overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 h-48 flex items-center justify-center">
                      <span className="text-8xl group-hover:scale-110 transition-transform duration-300">
                        {item.emoji}
                      </span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white text-red-500"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <Icon name="X" className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {item.age} лет
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {item.category}
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold text-primary">
                        {item.price} ₽
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 gap-2">
                    <Button
                      className="flex-1 gap-2"
                      size="lg"
                      onClick={() => handleAddToCart(item)}
                    >
                      <Icon name="ShoppingBag" size={18} />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Wishlist;
