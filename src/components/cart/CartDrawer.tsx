import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useCart } from '@/contexts/CartContext';
import CartItem from './CartItem';
import { useState } from 'react';
import PaymentDialog from './PaymentDialog';

const CartDrawer = () => {
  const { items, total, itemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button size="lg" className="gap-2 relative animate-bounce-soft">
            <Icon name="ShoppingCart" size={20} />
            {itemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 bg-secondary text-secondary-foreground animate-wiggle">
                {itemCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        
        <SheetContent className="w-full sm:max-w-lg flex flex-col">
          <SheetHeader>
            <SheetTitle className="text-2xl flex items-center gap-2">
              <Icon name="ShoppingBag" size={24} className="text-primary" />
              Корзина
            </SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <div className="bg-muted/50 p-8 rounded-full mb-4">
                <Icon name="ShoppingCart" size={48} className="text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Корзина пуста</h3>
              <p className="text-muted-foreground mb-6">
                Добавьте игрушки, чтобы начать покупки
              </p>
              <Button onClick={() => setIsOpen(false)} variant="outline">
                <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
                Вернуться к покупкам
              </Button>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 -mx-6 px-6 my-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </ScrollArea>

              <div className="space-y-4 pt-4 border-t-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Товары ({itemCount})</span>
                    <span className="font-medium">{total.toLocaleString()} ₽</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Доставка</span>
                    <span className="font-medium text-green-600">Бесплатно</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Итого:</span>
                  <span className="text-2xl font-bold text-primary">
                    {total.toLocaleString()} ₽
                  </span>
                </div>

                <Button 
                  size="lg" 
                  className="w-full text-lg py-6"
                  onClick={() => setShowPayment(true)}
                >
                  <Icon name="CreditCard" className="mr-2 h-5 w-5" />
                  Оформить заказ
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <PaymentDialog 
        open={showPayment} 
        onOpenChange={setShowPayment}
        onClose={() => {
          setShowPayment(false);
          setIsOpen(false);
        }}
      />
    </>
  );
};

export default CartDrawer;
