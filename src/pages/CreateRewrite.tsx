import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AnimatedBackground from "@/components/AnimatedBackground";
import Logo from "@/components/Logo";
import { ArrowLeft, Sparkles } from "lucide-react";
import { generateTimelines, type RewriteInput } from "@/lib/aiEngine";

const CreateRewrite = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<RewriteInput>({
    title: "",
    whenItHappened: "",
    decision: "",
    alternateChoice: "",
    emotion: "curious",
    tone: "realistic"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.decision || !formData.alternateChoice) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Generate timelines
    const timelines = generateTimelines(formData);
    
    // Store the rewrite
    const rewrite = {
      id: Math.random().toString(36).substr(2, 9),
      input: formData,
      timelines,
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    const savedRewrites = JSON.parse(localStorage.getItem("rewrites") || "[]");
    savedRewrites.push(rewrite);
    localStorage.setItem("rewrites", JSON.stringify(savedRewrites));
    
    toast({
      title: "Timeline generated!",
      description: "Exploring your alternate realities..."
    });
    
    // Navigate to timeline viewer
    setTimeout(() => navigate(`/timeline/${rewrite.id}`), 1000);
  };

  return (
    <div className="min-h-screen px-6 py-12">
      <AnimatedBackground />
      
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="glass"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Logo />
        </div>

        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text">
            Create Your Rewrite
          </h1>
          <p className="text-muted-foreground">
            Tell us about a decision you've wondered about
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-heavy p-8 rounded-2xl space-y-6 animate-fade-in">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Didn't move to London for college"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="glass"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="when">When did this happen?</Label>
            <Input
              id="when"
              type="text"
              placeholder="e.g., Summer 2018"
              value={formData.whenItHappened}
              onChange={(e) => setFormData({ ...formData, whenItHappened: e.target.value })}
              className="glass"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="decision">Describe what you actually chose *</Label>
            <Textarea
              id="decision"
              placeholder="I chose to stay in my hometown and attend the local university instead of moving abroad..."
              value={formData.decision}
              onChange={(e) => setFormData({ ...formData, decision: e.target.value })}
              required
              className="glass min-h-32"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="alternate">What was the alternate choice? *</Label>
            <Textarea
              id="alternate"
              placeholder="What if I had moved to London for university..."
              value={formData.alternateChoice}
              onChange={(e) => setFormData({ ...formData, alternateChoice: e.target.value })}
              required
              className="glass min-h-32"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emotion">How do you feel about this?</Label>
              <Select value={formData.emotion} onValueChange={(value) => setFormData({ ...formData, emotion: value })}>
                <SelectTrigger className="glass">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="curious">Curious</SelectItem>
                  <SelectItem value="regretful">Regretful</SelectItem>
                  <SelectItem value="proud">Proud</SelectItem>
                  <SelectItem value="sad">Sad</SelectItem>
                  <SelectItem value="excited">Excited</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Preferred tone</Label>
              <Select value={formData.tone} onValueChange={(value) => setFormData({ ...formData, tone: value })}>
                <SelectTrigger className="glass">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realistic">Realistic</SelectItem>
                  <SelectItem value="cinematic">Cinematic</SelectItem>
                  <SelectItem value="reflective">Reflective</SelectItem>
                  <SelectItem value="funny">Funny</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary via-secondary to-accent text-lg py-6 glow-primary hover:opacity-90 transition-opacity"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Rewrite My Life
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateRewrite;