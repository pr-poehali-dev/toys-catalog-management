import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SEARCH_SUGGESTIONS = [
  "Плюшевый мишка",
  "Конструктор",
  "Кукла",
  "Машинка",
  "Робот",
  "Пазл",
  "Мягкие игрушки",
  "Развивающие игрушки",
  "Настольные игры",
];

const SearchBar = ({ searchQuery, onSearchChange }: SearchBarProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, onSearchChange]);

  const suggestions = useMemo(() => {
    if (!inputValue) return [];
    
    const query = inputValue.toLowerCase();
    
    const correctedQuery = query
      .replace(/[её]/g, '[её]')
      .replace(/[иы]/g, '[иы]');
    
    return SEARCH_SUGGESTIONS.filter((suggestion) => {
      const lowerSuggestion = suggestion.toLowerCase();
      return lowerSuggestion.includes(query) || 
             lowerSuggestion.match(new RegExp(correctedQuery));
    }).slice(0, 5);
  }, [inputValue]);

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <Icon 
          name="Search" 
          className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" 
        />
        <Input
          type="text"
          placeholder="Поиск игрушек... (например: мишка, конструктор)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="pl-12 pr-4 py-6 text-lg border-2 border-primary/20 focus:border-primary rounded-2xl shadow-lg"
        />
        {inputValue && (
          <button
            onClick={() => {
              setInputValue("");
              onSearchChange("");
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" className="h-5 w-5" />
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full mt-2 w-full z-50">
          <Command className="rounded-2xl border-2 border-primary/20 shadow-xl bg-card">
            <CommandList>
              <CommandEmpty>Ничего не найдено</CommandEmpty>
              <CommandGroup heading="Подсказки">
                {suggestions.map((suggestion) => (
                  <CommandItem
                    key={suggestion}
                    onSelect={() => {
                      setInputValue(suggestion);
                      onSearchChange(suggestion);
                      setShowSuggestions(false);
                    }}
                    className="cursor-pointer"
                  >
                    <Icon name="Search" className="mr-2 h-4 w-4 text-primary" />
                    <span>{suggestion}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
