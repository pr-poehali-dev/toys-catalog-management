import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useCart } from '@/contexts/CartContext';

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    emoji: string;
  };
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
      <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg w-20 h-20 flex items-center justify-center text-4xl flex-shrink-0">
        {item.emoji}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm mb-1 truncate">{item.name}</h4>
        <p className="text-lg font-bold text-primary">{item.price.toLocaleString()} ₽</p>
        
        <div className="flex items-center gap-2 mt-2">
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Icon name="Minus" className="h-3 w-3" />
          </Button>
          
          <span className="font-semibold min-w-[2rem] text-center">
            {item.quantity}
          </span>
          
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Icon name="Plus" className="h-3 w-3" />
          </Button>
          
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 ml-auto text-destructive hover:text-destructive"
            onClick={() => removeFromCart(item.id)}
          >
            <Icon name="Trash2" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
