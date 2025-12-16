import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/contexts/OrderContext';
import { useToast } from '@/hooks/use-toast';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

const PaymentDialog = ({ open, onOpenChange, onClose }: PaymentDialogProps) => {
  const { total, items, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { toast } = useToast();
  const [step, setStep] = useState<'info' | 'payment'>('info');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast({
        title: 'Заполните все поля',
        description: 'Для оформления заказа необходимо указать все данные',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      addOrder({
        items,
        total,
        paymentMethod,
        customerInfo: formData,
      });

      clearCart();
      setIsProcessing(false);
      onClose();
      
      toast({
        title: '🎉 Заказ оформлен!',
        description: `Ваш заказ на ${total.toLocaleString()} ₽ успешно оформлен. Ожидайте звонка курьера!`,
      });

      setStep('info');
      setFormData({ name: '', email: '', phone: '', address: '' });
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Icon name="CreditCard" size={24} className="text-primary" />
            Оформление заказа
          </DialogTitle>
        </DialogHeader>

        {step === 'info' ? (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Итого к оплате:</span>
                <span className="text-2xl font-bold text-primary">
                  {total.toLocaleString()} ₽
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Ваше имя</Label>
                <Input
                  id="name"
                  placeholder="Иван Иванов"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ivan@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="address">Адрес доставки</Label>
                <Input
                  id="address"
                  placeholder="ул. Пушкина, д. 10, кв. 5"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <Button
              size="lg"
              className="w-full"
              onClick={() => setStep('payment')}
            >
              Продолжить к оплате
              <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep('info')}
              className="gap-2"
            >
              <Icon name="ArrowLeft" className="h-4 w-4" />
              Назад
            </Button>

            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="font-semibold">К оплате:</span>
                <span className="text-2xl font-bold text-primary">
                  {total.toLocaleString()} ₽
                </span>
              </div>
            </div>

            <Separator />

            <div>
              <Label className="text-base font-semibold mb-3">Способ оплаты</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-3">
                <div className="flex items-center space-x-3 p-3 border-2 rounded-lg hover:border-primary transition-colors">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Icon name="CreditCard" className="h-5 w-5 text-primary" />
                    Банковская карта
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 border-2 rounded-lg hover:border-primary transition-colors">
                  <RadioGroupItem value="sbp" id="sbp" />
                  <Label htmlFor="sbp" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Icon name="Smartphone" className="h-5 w-5 text-primary" />
                    СБП (Система быстрых платежей)
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 border-2 rounded-lg hover:border-primary transition-colors">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Icon name="Wallet" className="h-5 w-5 text-primary" />
                    Наличными при получении
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              size="lg"
              className="w-full"
              onClick={handleSubmit}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Icon name="Loader2" className="mr-2 h-5 w-5 animate-spin" />
                  Обработка...
                </>
              ) : (
                <>
                  <Icon name="Check" className="mr-2 h-5 w-5" />
                  Оформить заказ
                </>
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;