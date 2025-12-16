import { Product } from "@/types/product";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden border-2 border-primary/10 hover:border-primary/30 transition-all hover:shadow-xl hover:-translate-y-1 duration-300">
      <div className="relative overflow-hidden bg-muted/30">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {!product.inStock && (
          <Badge className="absolute top-3 left-3 bg-destructive/90 backdrop-blur-sm">
            Нет в наличии
          </Badge>
        )}
        
        <Badge className="absolute top-3 right-3 bg-secondary/90 backdrop-blur-sm text-secondary-foreground">
          {product.age} лет
        </Badge>
        
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-3 right-14 bg-white/90 hover:bg-white hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Icon name="Heart" className="h-5 w-5" />
        </Button>
      </div>

      <CardContent className="p-4">
        <Badge variant="outline" className="mb-2 text-xs border-primary/30 text-primary">
          {product.category}
        </Badge>
        
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Icon
              key={i}
              name="Star"
              className={`h-4 w-4 ${
                i < product.rating
                  ? "text-secondary fill-secondary"
                  : "text-muted"
              }`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1">
            ({product.rating})
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">
            {product.price.toLocaleString()} ₽
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-shadow"
          disabled={!product.inStock}
        >
          <Icon name="ShoppingCart" className="mr-2 h-4 w-4" />
          {product.inStock ? "В корзину" : "Нет в наличии"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
