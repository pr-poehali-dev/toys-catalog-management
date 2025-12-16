import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useOrders, Order } from '@/contexts/OrderContext';

const STATUS_CONFIG = {
  processing: {
    label: 'Обрабатывается',
    icon: 'Clock',
    color: 'bg-blue-500',
  },
  shipped: {
    label: 'Отправлен',
    icon: 'Truck',
    color: 'bg-yellow-500',
  },
  delivered: {
    label: 'Доставлен',
    icon: 'Check',
    color: 'bg-green-500',
  },
  cancelled: {
    label: 'Отменён',
    icon: 'X',
    color: 'bg-red-500',
  },
};

const PAYMENT_LABELS: Record<string, string> = {
  card: 'Банковская карта',
  sbp: 'СБП',
  cash: 'Наличные при получении',
};

const OrderCard = ({ order }: { order: Order }) => {
  const status = STATUS_CONFIG[order.status];
  const orderDate = new Date(order.date);

  return (
    <Card className="border-2 hover:shadow-lg transition-shadow">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Icon name="ShoppingBag" className="h-5 w-5 text-primary" />
              {order.id}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {orderDate.toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          <Badge className={`${status.color} text-white`}>
            <Icon name={status.icon as any} className="h-3 w-3 mr-1" />
            {status.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-3">
              Товары ({order.items.length})
            </h4>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg"
                >
                  <div className="text-3xl">{item.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.quantity} × {item.price.toLocaleString()} ₽
                    </p>
                  </div>
                  <p className="font-bold text-primary">
                    {(item.price * item.quantity).toLocaleString()} ₽
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Получатель</p>
              <p className="font-medium">{order.customerInfo.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Оплата</p>
              <p className="font-medium">{PAYMENT_LABELS[order.paymentMethod]}</p>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground mb-1">Адрес доставки</p>
              <p className="font-medium">{order.customerInfo.address}</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="font-semibold">Итого:</span>
            <span className="text-2xl font-bold text-primary">
              {order.total.toLocaleString()} ₽
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Orders = () => {
  const { orders } = useOrders();

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
                  История заказов
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Отслеживайте свои покупки
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
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-muted/50 p-12 rounded-full mb-6">
              <Icon name="Package" size={64} className="text-muted-foreground" />
            </div>
            <h2 className="text-3xl font-bold mb-3">Заказов пока нет</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              Оформите свой первый заказ и он появится здесь
            </p>
            <Link to="/">
              <Button size="lg" className="gap-2">
                <Icon name="ShoppingBag" className="h-5 w-5" />
                Начать покупки
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-lg text-muted-foreground">
                Всего заказов:{' '}
                <span className="font-bold text-primary text-2xl">
                  {orders.length}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Orders;
