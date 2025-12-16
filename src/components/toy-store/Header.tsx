import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b-4 border-primary shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
              <Icon name="Toy" className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Игрушки.ру
              </h1>
              <p className="text-xs text-muted-foreground">Мир детских мечтаний</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
              <Icon name="Heart" className="h-6 w-6 text-primary" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent">
                3
              </Badge>
            </Button>
            
            <Button variant="default" size="icon" className="relative bg-gradient-to-r from-primary to-accent hover:shadow-xl transition-shadow">
              <Icon name="ShoppingCart" className="h-6 w-6" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-secondary text-secondary-foreground">
                5
              </Badge>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
