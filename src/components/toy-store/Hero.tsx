import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://cdn.poehali.dev/projects/516c6cac-ce66-4c49-8fdc-6a7018251afa/files/726e6a7b-ed55-427c-ac88-f9468e6d383e.jpg')] bg-cover bg-center opacity-10"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-secondary/90 text-secondary-foreground px-4 py-2 rounded-full mb-6 animate-bounce">
            <Icon name="Sparkles" className="h-5 w-5" />
            <span className="font-semibold">Новинки каждую неделю!</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Радость в каждой{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              игрушке!
            </span>
          </h2>
          
          <p className="text-xl text-foreground/80 mb-8 max-w-xl">
            Откройте волшебный мир игр и приключений для вашего малыша. 
            Более 1000 игрушек с доставкой по всей России! 🎈
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:scale-105 transition-all text-lg px-8 py-6"
            >
              <Icon name="Sparkles" className="mr-2 h-5 w-5" />
              Смотреть новинки
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all text-lg px-8 py-6"
            >
              <Icon name="Gift" className="mr-2 h-5 w-5" />
              Подарочные наборы
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute top-20 left-1/2 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero;
