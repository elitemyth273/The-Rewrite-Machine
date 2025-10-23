import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Share2, RefreshCw, Maximize2 } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Logo from "@/components/Logo";
import { useToast } from "@/hooks/use-toast";

interface Rewrite {
  id: string;
  input: {
    title: string;
    decision: string;
    alternateChoice: string;
  };
  timelines: Array<{
    type: string;
    title: string;
    career: string;
    relationships: string;
    lifestyle: string;
    emotionalImpact: string;
    takeaway: string;
    gradient: string;
  }>;
}

const Timeline = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rewrite, setRewrite] = useState<Rewrite | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [immersiveMode, setImmersiveMode] = useState(false);

  useEffect(() => {
    const savedRewrites = JSON.parse(localStorage.getItem("rewrites") || "[]");
    const found = savedRewrites.find((r: Rewrite) => r.id === id);
    if (found) {
      setRewrite(found);
    } else {
      navigate("/dashboard");
    }
  }, [id, navigate]);

  const handleSave = () => {
    toast({ title: "Saved to your collection!" });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Link copied to clipboard!" });
  };

  if (!rewrite) return null;

  const timeline = rewrite.timelines[activeIndex];
  const typeColors = {
    optimistic: "from-primary to-secondary",
    neutral: "from-muted-foreground/50 to-muted-foreground",
    dark: "from-accent to-destructive"
  };

  return (
    <div className={`min-h-screen ${immersiveMode ? 'bg-black' : ''}`}>
      {!immersiveMode && <AnimatedBackground />}
      
      {!immersiveMode && (
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" onClick={() => navigate("/dashboard")} className="glass">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Logo />
          </div>
        </div>
      )}

      <div className={`${immersiveMode ? 'px-0' : 'max-w-6xl mx-auto px-6 pb-12'}`}>
        {/* Timeline selector */}
        <div className="flex justify-center gap-4 mb-8">
          {rewrite.timelines.map((t, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeIndex === i
                  ? `bg-gradient-to-r ${typeColors[t.type as keyof typeof typeColors]} text-white glow-primary`
                  : 'glass text-muted-foreground hover:text-foreground'
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>

        {/* Timeline content */}
        <div className={`glass-heavy rounded-3xl p-8 md:p-12 space-y-8 ${immersiveMode ? 'max-w-4xl mx-auto my-12' : ''}`}>
          <div className="text-center space-y-4">
            <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${timeline.gradient} text-white text-sm font-medium`}>
              {timeline.type.charAt(0).toUpperCase() + timeline.type.slice(1)} Timeline
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text">
              {timeline.title}
            </h1>
            <p className="text-lg text-muted-foreground italic">
              "{rewrite.input.alternateChoice}"
            </p>
          </div>

          <div className="space-y-6">
            {[
              { label: "Career Path", content: timeline.career },
              { label: "Relationships", content: timeline.relationships },
              { label: "Lifestyle", content: timeline.lifestyle },
              { label: "Emotional Impact", content: timeline.emotionalImpact },
              { label: "Key Takeaway", content: timeline.takeaway }
            ].map((section, i) => (
              <div key={i} className="glass p-6 rounded-xl space-y-2">
                <h3 className="text-xl font-display font-semibold text-primary">
                  {section.label}
                </h3>
                <p className="text-foreground/90 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 justify-center pt-6">
            <Button onClick={handleSave} variant="outline" className="glass">
              <Heart className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button onClick={handleShare} variant="outline" className="glass">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button onClick={() => navigate("/create")} variant="outline" className="glass">
              <RefreshCw className="w-4 h-4 mr-2" />
              Create New
            </Button>
            <Button
              onClick={() => setImmersiveMode(!immersiveMode)}
              variant="outline"
              className="glass"
            >
              <Maximize2 className="w-4 h-4 mr-2" />
              {immersiveMode ? 'Exit' : 'Enter'} Immersive Mode
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;