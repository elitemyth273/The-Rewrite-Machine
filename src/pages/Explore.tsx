import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Logo from "@/components/Logo";

const Explore = () => {
  const navigate = useNavigate();

  const sampleStories = [
    {
      id: "sample-1",
      title: "Took the startup job instead of corporate",
      author: "Alex M.",
      likes: 247,
      timelines: ["optimistic", "neutral", "dark"]
    },
    {
      id: "sample-2",
      title: "Said yes to studying abroad",
      author: "Jordan K.",
      likes: 189,
      timelines: ["optimistic", "neutral", "dark"]
    },
    {
      id: "sample-3",
      title: "Pursued music full-time after graduation",
      author: "Sam R.",
      likes: 156,
      timelines: ["optimistic", "neutral", "dark"]
    }
  ];

  return (
    <div className="min-h-screen px-6 py-8">
      <AnimatedBackground />
      
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="glass">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Logo />
        </div>

        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text">
            Explore Public Rewrites
          </h1>
          <p className="text-muted-foreground">
            Discover alternate timelines from the community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleStories.map((story, i) => (
            <div
              key={story.id}
              className="glass-heavy p-6 rounded-2xl space-y-4 hover:scale-105 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <h3 className="font-display font-semibold text-lg gradient-text">
                {story.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                by {story.author}
              </p>
              <div className="flex gap-2">
                {story.timelines.map((type, i) => (
                  <div
                    key={i}
                    className={`px-3 py-1 rounded-full text-xs ${
                      type === "optimistic"
                        ? "bg-gradient-to-r from-primary to-secondary"
                        : type === "neutral"
                        ? "bg-muted"
                        : "bg-gradient-to-r from-accent to-destructive"
                    } text-white`}
                  >
                    {type}
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                ❤️ {story.likes} likes
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;