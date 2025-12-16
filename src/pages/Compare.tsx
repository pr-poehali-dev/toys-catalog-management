import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useCompare } from '@/contexts/CompareContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const Compare = () => {
  const { items, removeFromCompare, clearCompare } = useCompare();
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
                  Сравнение товаров
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Сравните до 4 игрушек
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {items.length > 0 && (
                <Button variant="outline" onClick={clearCompare}>
                  <Icon name="Trash2" className="mr-2 h-4 w-4" />
                  Очистить
                </Button>
              )}
              <Link to="/">
                <Button size="lg" className="gap-2">
                  <Icon name="Store" size={20} />
                  В магазин
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-muted/50 p-12 rounded-full mb-6">
              <Icon name="GitCompare" size={64} className="text-muted-foreground" />
            </div>
            <h2 className="text-3xl font-bold mb-3">Нет товаров для сравнения</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              Добавьте игрушки для сравнения характеристик
            </p>
            <Link to="/">
              <Button size="lg" className="gap-2">
                <Icon name="Plus" className="h-5 w-5" />
                Добавить товары
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-max">
              <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(280px, 1fr))` }}>
                {items.map((item) => (
                  <Card
                    key={item.id}
                    className="relative border-2 hover:shadow-xl transition-shadow"
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-white"
                      onClick={() => removeFromCompare(item.id)}
                    >
                      <Icon name="X" className="h-5 w-5" />
                    </Button>

                    <CardContent className="p-6">
                      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 h-40 flex items-center justify-center rounded-xl mb-4">
                        <span className="text-7xl">{item.emoji}</span>
                      </div>

                      <h3 className="font-bold text-xl mb-4 min-h-[3rem]">
                        {item.name}
                      </h3>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between py-2 border-b">
                          <span className="text-sm text-muted-foreground">Цена</span>
                          <span className="font-bold text-primary text-xl">
                            {item.price} ₽
                          </span>
                        </div>

                        <div className="flex items-center justify-between py-2 border-b">
                          <span className="text-sm text-muted-foreground">Категория</span>
                          <Badge variant="secondary">{item.category}</Badge>
                        </div>

                        <div className="flex items-center justify-between py-2 border-b">
                          <span className="text-sm text-muted-foreground">Возраст</span>
                          <Badge variant="outline">{item.age} лет</Badge>
                        </div>

                        <div className="flex items-center justify-between py-2 border-b">
                          <span className="text-sm text-muted-foreground">Наличие</span>
                          <Badge className={item.inStock ? 'bg-green-500' : 'bg-red-500'}>
                            {item.inStock ? 'В наличии' : 'Нет в наличии'}
                          </Badge>
                        </div>
                      </div>

                      <Button
                        className="w-full gap-2"
                        size="lg"
                        disabled={!item.inStock}
                        onClick={() => handleAddToCart(item)}
                      >
                        <Icon name="ShoppingBag" size={18} />
                        В корзину
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Compare;
