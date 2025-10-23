import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, Heart, Globe, LogOut } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Logo from "@/components/Logo";

interface User {
  name: string;
  email: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [rewrites, setRewrites] = useState<any[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/auth");
      return;
    }
    setUser(JSON.parse(storedUser));
    
    const savedRewrites = JSON.parse(localStorage.getItem("rewrites") || "[]");
    setRewrites(savedRewrites);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen px-6 py-8">
      <AnimatedBackground />
      
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Logo />
          <Button variant="ghost" onClick={handleLogout} className="glass">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Welcome */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-display font-bold">
            Welcome back, <span className="gradient-text">{user.name}</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Ready to rewrite your story?
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Plus, label: "New Rewrite", action: () => navigate("/create"), gradient: "from-primary to-secondary" },
            { icon: BookOpen, label: "My Rewrites", count: rewrites.length, gradient: "from-secondary to-accent" },
            { icon: Heart, label: "Favorites", count: 0, gradient: "from-accent to-primary" },
            { icon: Globe, label: "Explore", action: () => navigate("/explore"), gradient: "from-primary via-secondary to-accent" }
          ].map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              className="glass-heavy p-6 rounded-2xl hover:scale-105 transition-all duration-300 text-left group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display font-semibold text-lg">{item.label}</h3>
              {item.count !== undefined && (
                <p className="text-2xl font-bold text-primary mt-2">{item.count}</p>
              )}
            </button>
          ))}
        </div>

        {/* Recent Rewrites */}
        {rewrites.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-display font-bold">Your Recent Rewrites</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {rewrites.slice(0, 4).map((rewrite) => (
                <button
                  key={rewrite.id}
                  onClick={() => navigate(`/timeline/${rewrite.id}`)}
                  className="glass-heavy p-6 rounded-xl hover:scale-105 transition-all duration-300 text-left"
                >
                  <h3 className="font-display font-semibold text-lg mb-2 gradient-text">
                    {rewrite.input.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {rewrite.input.decision}
                  </p>
                  <div className="mt-4 flex gap-2">
                    {rewrite.timelines.map((t: any, i: number) => (
                      <div
                        key={i}
                        className={`px-3 py-1 rounded-full text-xs bg-gradient-to-r ${t.gradient} text-white`}
                      >
                        {t.type}
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="glass-heavy p-12 rounded-3xl text-center space-y-4">
            <h3 className="text-2xl font-display font-semibold gradient-text">
              No rewrites yet
            </h3>
            <p className="text-muted-foreground">
              Start exploring alternate timelines of your life
            </p>
            <Button
              onClick={() => navigate("/create")}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Rewrite
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;