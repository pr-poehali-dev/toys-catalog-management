import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";

interface FiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedAge: string;
  onAgeChange: (age: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  inStockOnly: boolean;
  onInStockChange: (inStock: boolean) => void;
}

const CATEGORIES = [
  { value: "all", label: "Все категории", icon: "Grid3x3" },
  { value: "Мягкие игрушки", label: "Мягкие игрушки", icon: "Heart" },
  { value: "Развивающие", label: "Развивающие", icon: "Brain" },
  { value: "Транспорт", label: "Транспорт", icon: "Car" },
  { value: "Куклы", label: "Куклы", icon: "User" },
  { value: "Роботы", label: "Роботы", icon: "Bot" },
  { value: "Творчество", label: "Творчество", icon: "Palette" },
];

const AGE_GROUPS = [
  { value: "all", label: "Все возрасты" },
  { value: "0-3", label: "0-3 года" },
  { value: "3-6", label: "3-6 лет" },
  { value: "6+", label: "6+ лет" },
];

const Filters = ({
  selectedCategory,
  onCategoryChange,
  selectedAge,
  onAgeChange,
  priceRange,
  onPriceRangeChange,
  inStockOnly,
  onInStockChange,
}: FiltersProps) => {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Icon name="SlidersHorizontal" className="h-5 w-5 text-primary" />
            Фильтры
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div>
            <Label className="text-base font-semibold mb-3 flex items-center gap-2">
              <Icon name="Tag" className="h-4 w-4 text-primary" />
              Категория
            </Label>
            <RadioGroup value={selectedCategory} onValueChange={onCategoryChange}>
              {CATEGORIES.map((category) => (
                <div key={category.value} className="flex items-center space-x-3 py-2 hover:bg-accent/10 rounded-lg px-2 transition-colors">
                  <RadioGroupItem value={category.value} id={category.value} />
                  <Label
                    htmlFor={category.value}
                    className="flex items-center gap-2 cursor-pointer flex-1"
                  >
                    <Icon name={category.icon as any} className="h-4 w-4 text-primary" />
                    {category.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label className="text-base font-semibold mb-3 flex items-center gap-2">
              <Icon name="Baby" className="h-4 w-4 text-primary" />
              Возраст
            </Label>
            <RadioGroup value={selectedAge} onValueChange={onAgeChange}>
              {AGE_GROUPS.map((age) => (
                <div key={age.value} className="flex items-center space-x-3 py-2 hover:bg-accent/10 rounded-lg px-2 transition-colors">
                  <RadioGroupItem value={age.value} id={`age-${age.value}`} />
                  <Label
                    htmlFor={`age-${age.value}`}
                    className="cursor-pointer flex-1"
                  >
                    {age.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label className="text-base font-semibold mb-3 flex items-center gap-2">
              <Icon name="Wallet" className="h-4 w-4 text-primary" />
              Цена: {priceRange[0]} - {priceRange[1]} ₽
            </Label>
            <Slider
              min={0}
              max={5000}
              step={100}
              value={priceRange}
              onValueChange={(value) => onPriceRangeChange(value as [number, number])}
              className="mt-4"
            />
          </div>

          <div className="flex items-center space-x-3 py-3 px-3 bg-accent/10 rounded-lg hover:bg-accent/20 transition-colors">
            <Checkbox
              id="inStock"
              checked={inStockOnly}
              onCheckedChange={onInStockChange}
            />
            <Label
              htmlFor="inStock"
              className="cursor-pointer flex items-center gap-2 flex-1"
            >
              <Icon name="Package" className="h-4 w-4 text-primary" />
              Только в наличии
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Filters;
