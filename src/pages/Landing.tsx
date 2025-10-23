import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Sparkles, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Logo from "@/components/Logo";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-heavy">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Logo />
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate("/auth")}
              className="text-foreground/80 hover:text-foreground"
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-muted-foreground mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            AI-Powered Life Simulation
          </div>
          
          <h1 className="text-6xl md:text-8xl font-display font-bold leading-tight">
            <span className="gradient-text">What if you'd</span>
            <br />
            done it differently?
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Enter a decision. Watch your life rewrite itself.
            <br />
            Explore infinite alternate timelines with AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              size="lg"
              onClick={() => navigate("/create")}
              className="bg-gradient-to-r from-primary via-secondary to-accent text-lg px-8 py-6 glow-primary hover:opacity-90 transition-opacity group"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Your Rewrite
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/explore")}
              className="glass-heavy text-lg px-8 py-6 border-primary/30"
            >
              <Users className="w-5 h-5 mr-2" />
              Explore Stories
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-center mb-16 gradient-text">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Tell Your Story",
                description: "Share a real decision or moment from your life that you've wondered about.",
                gradient: "from-primary to-secondary"
              },
              {
                icon: Sparkles,
                title: "AI Rewrites It",
                description: "Our AI generates three alternate timelines: optimistic, balanced, and dark.",
                gradient: "from-secondary to-accent"
              },
              {
                icon: Users,
                title: "Explore & Share",
                description: "Save your favorites, share publicly, and discover others' alternate lives.",
                gradient: "from-accent to-primary"
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="glass p-8 rounded-2xl space-y-4 hover:scale-105 transition-transform duration-300 animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-display font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto glass-heavy p-12 rounded-3xl text-center space-y-6">
          <h2 className="text-4xl font-display font-bold gradient-text">
            Ready to rewrite your story?
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands exploring their alternate timelines
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/create")}
            className="bg-gradient-to-r from-primary to-secondary text-lg px-8 py-6 glow-primary hover:opacity-90 transition-opacity"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Create Your First Rewrite
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 The Rewrite Machine. Explore infinite possibilities.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;