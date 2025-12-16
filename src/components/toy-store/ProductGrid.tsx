import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import Icon from "@/components/ui/icon";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-muted/50 p-8 rounded-full mb-6">
          <Icon name="PackageSearch" className="h-16 w-16 text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Игрушки не найдены</h3>
        <p className="text-muted-foreground max-w-md">
          Попробуйте изменить параметры поиска или фильтры
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-lg text-muted-foreground">
          Найдено игрушек: <span className="font-bold text-primary">{products.length}</span>
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
