import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

interface Toy {
  id: number;
  name: string;
  price: number;
  age: string;
  category: string;
  image: string;
  emoji: string;
  inStock: boolean;
}

const TOYS_DATA: Toy[] = [
  { id: 1, name: 'Плюшевый мишка', price: 1299, age: '0-3', category: 'Мягкие игрушки', image: '', emoji: '🧸', inStock: true },
  { id: 2, name: 'Конструктор LEGO', price: 2499, age: '6-12', category: 'Конструкторы', image: '', emoji: '🏗️', inStock: true },
  { id: 3, name: 'Кукла Барби', price: 1599, age: '3-6', category: 'Куклы', image: '', emoji: '👧', inStock: true },
  { id: 4, name: 'Машинка на радиоуправлении', price: 3499, age: '6-12', category: 'Транспорт', image: '', emoji: '🚗', inStock: true },
  { id: 5, name: 'Набор для рисования', price: 899, age: '3-6', category: 'Творчество', image: '', emoji: '🎨', inStock: false },
  { id: 6, name: 'Робот-трансформер', price: 2799, age: '6-12', category: 'Роботы', image: '', emoji: '🤖', inStock: true },
  { id: 7, name: 'Пазл 500 деталей', price: 699, age: '6-12', category: 'Настольные игры', image: '', emoji: '🧩', inStock: true },
  { id: 8, name: 'Музыкальная игрушка', price: 1199, age: '0-3', category: 'Музыкальные', image: '', emoji: '🎵', inStock: true },
  { id: 9, name: 'Футбольный мяч', price: 599, age: '3-6', category: 'Спорт', image: '', emoji: '⚽', inStock: true },
  { id: 10, name: 'Набор доктора', price: 1099, age: '3-6', category: 'Ролевые игры', image: '', emoji: '💉', inStock: true },
  { id: 11, name: 'Железная дорога', price: 4299, age: '6-12', category: 'Транспорт', image: '', emoji: '🚂', inStock: true },
  { id: 12, name: 'Мягкий единорог', price: 1499, age: '0-3', category: 'Мягкие игрушки', image: '', emoji: '🦄', inStock: true },
];

const CATEGORIES = ['Все', 'Мягкие игрушки', 'Конструкторы', 'Куклы', 'Транспорт', 'Творчество', 'Роботы', 'Настольные игры', 'Музыкальные', 'Спорт', 'Ролевые игры'];
const AGE_GROUPS = ['0-3', '3-6', '6-12'];

const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix: number[][] = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
};

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  const suggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    
    const query = searchQuery.toLowerCase();
    const allWords = TOYS_DATA.flatMap(toy => 
      [toy.name, toy.category].map(text => text.toLowerCase())
    );
    
    const uniqueWords = Array.from(new Set(allWords));
    
    return uniqueWords
      .filter(word => {
        const distance = levenshteinDistance(query, word);
        return word.includes(query) || distance <= 2;
      })
      .slice(0, 5);
  }, [searchQuery]);

  const filteredToys = useMemo(() => {
    return TOYS_DATA.filter(toy => {
      const matchesSearch = !searchQuery || 
        toy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        toy.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        suggestions.some(s => toy.name.toLowerCase().includes(s) || toy.category.toLowerCase().includes(s));
      
      const matchesCategory = selectedCategory === 'Все' || toy.category === selectedCategory;
      const matchesAge = selectedAges.length === 0 || selectedAges.includes(toy.age);
      const matchesPrice = toy.price >= priceRange[0] && toy.price <= priceRange[1];
      const matchesStock = !showInStockOnly || toy.inStock;
      
      return matchesSearch && matchesCategory && matchesAge && matchesPrice && matchesStock;
    });
  }, [searchQuery, selectedCategory, selectedAges, priceRange, showInStockOnly, suggestions]);

  const toggleAge = (age: string) => {
    setSelectedAges(prev => 
      prev.includes(age) ? prev.filter(a => a !== age) : [...prev, age]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-blue-50">
      <header className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b-4 border-primary">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in">
              🎪 Магазин Игрушек
            </h1>
            <Button size="lg" className="gap-2 animate-bounce-soft">
              <Icon name="ShoppingCart" size={20} />
              <span className="font-semibold">0</span>
            </Button>
          </div>
          
          <div className="relative">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Найди свою игрушку... 🔍"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-2xl border-2 focus:border-primary transition-all"
              />
            </div>
            
            {suggestions.length > 0 && searchQuery && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border-2 border-primary/20 overflow-hidden animate-scale-in z-50">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSearchQuery(suggestion)}
                    className="w-full px-4 py-3 text-left hover:bg-primary/10 transition-colors flex items-center gap-2"
                  >
                    <Icon name="Sparkles" size={16} className="text-primary" />
                    <span className="font-medium">{suggestion}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <Card className="sticky top-24 rounded-2xl border-2 shadow-xl animate-fade-in">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="Filter" size={20} />
                    Фильтры
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3 text-sm text-muted-foreground">КАТЕГОРИЯ</h4>
                      <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map(cat => (
                          <Badge
                            key={cat}
                            variant={selectedCategory === cat ? "default" : "outline"}
                            className={`cursor-pointer transition-all hover:scale-105 ${
                              selectedCategory === cat ? 'animate-wiggle' : ''
                            }`}
                            onClick={() => setSelectedCategory(cat)}
                          >
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-sm text-muted-foreground">ВОЗРАСТ</h4>
                      <div className="space-y-2">
                        {AGE_GROUPS.map(age => (
                          <div key={age} className="flex items-center gap-2">
                            <Checkbox
                              id={age}
                              checked={selectedAges.includes(age)}
                              onCheckedChange={() => toggleAge(age)}
                            />
                            <label htmlFor={age} className="text-sm font-medium cursor-pointer">
                              {age} лет
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-sm text-muted-foreground">
                        ЦЕНА: {priceRange[0]} - {priceRange[1]} ₽
                      </h4>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        min={0}
                        max={5000}
                        step={100}
                        className="my-4"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <Checkbox
                        id="inStock"
                        checked={showInStockOnly}
                        onCheckedChange={(checked) => setShowInStockOnly(checked as boolean)}
                      />
                      <label htmlFor="inStock" className="text-sm font-medium cursor-pointer">
                        Только в наличии
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          <main className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-lg font-semibold text-muted-foreground">
                Найдено: <span className="text-primary text-2xl font-bold">{filteredToys.length}</span> игрушек
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredToys.map((toy, idx) => (
                <Card 
                  key={toy.id} 
                  className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-2xl border-2 overflow-hidden animate-scale-in"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <CardContent className="p-0">
                    <div className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 h-48 flex items-center justify-center">
                      <span className="text-8xl group-hover:scale-110 transition-transform duration-300">
                        {toy.emoji}
                      </span>
                      {!toy.inStock && (
                        <Badge variant="destructive" className="absolute top-2 right-2">
                          Нет в наличии
                        </Badge>
                      )}
                      {toy.inStock && (
                        <Badge className="absolute top-2 right-2 bg-success text-success-foreground">
                          В наличии
                        </Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                        {toy.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {toy.age} лет
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {toy.category}
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold text-primary">
                        {toy.price} ₽
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button 
                      className="w-full gap-2 group-hover:scale-105 transition-transform" 
                      size="lg"
                      disabled={!toy.inStock}
                    >
                      <Icon name="ShoppingBag" size={18} />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredToys.length === 0 && (
              <div className="text-center py-20 animate-fade-in">
                <span className="text-9xl block mb-4">😢</span>
                <h3 className="text-2xl font-bold mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
              </div>
            )}
          </main>
        </div>
      </div>

      <footer className="bg-gradient-to-r from-primary via-secondary to-accent text-white mt-20 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">🎉 Магазин Игрушек</h2>
          <p className="text-lg opacity-90">Мир развлечений для детей всех возрастов!</p>
          <div className="flex justify-center gap-4 mt-6">
            <Button variant="secondary" size="lg" className="gap-2">
              <Icon name="Phone" size={18} />
              Контакты
            </Button>
            <Button variant="secondary" size="lg" className="gap-2">
              <Icon name="Mail" size={18} />
              Написать нам
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
