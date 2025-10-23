export interface RewriteInput {
  title: string;
  whenItHappened: string;
  decision: string;
  alternateChoice: string;
  emotion: string;
  tone: string;
}

export interface Timeline {
  type: "optimistic" | "neutral" | "dark";
  title: string;
  career: string;
  relationships: string;
  lifestyle: string;
  emotionalImpact: string;
  takeaway: string;
  gradient: string;
}

// Mock AI engine that generates rich, contextual alternate timelines
export const generateTimelines = (input: RewriteInput): Timeline[] => {
  const { title, alternateChoice, decision } = input;
  
  // Extract key themes from the input
  const isCareerRelated = /job|work|career|college|university|study/i.test(decision);
  const isLocationRelated = /move|city|country|relocate|travel/i.test(decision);
  const isRelationshipRelated = /relationship|love|partner|marriage|friend/i.test(decision);
  
  const optimisticTimeline: Timeline = {
    type: "optimistic",
    title: "The Golden Path",
    career: isCareerRelated 
      ? `Taking ${alternateChoice} led you to unexpected opportunities. Within two years, you became a recognized expert in your field, speaking at international conferences and mentoring others who followed a similar path.`
      : `Your career flourished in ways you never imagined. The confidence from ${alternateChoice} opened doors to leadership roles and creative projects that perfectly aligned with your passions.`,
    relationships: isRelationshipRelated
      ? `This choice brought profound connections into your life. You met people who truly understood and supported your journey, forming lifelong bonds that enriched every aspect of your existence.`
      : `Your social circle expanded naturally. The authenticity of living ${alternateChoice} attracted like-minded souls who became your closest confidants and collaborators.`,
    lifestyle: isLocationRelated
      ? `Living in your new location, you discovered a lifestyle that felt like coming home. Weekend explorations became adventures, and you built a community that celebrated your unique perspective.`
      : `Your daily routine transformed into something vibrant and fulfilling. Mornings felt purposeful, evenings creative, and you finally had the time and energy for pursuits that brought you joy.`,
    emotionalImpact: `Looking back, you feel a deep sense of peace and gratitude. The challenges along the way taught you resilience, and the victories felt earned. You sleep well knowing you followed your heart.`,
    takeaway: `Sometimes the path less traveled becomes the road home. Your alternate choice would have taught you that calculated risks, when aligned with your values, often yield the richest rewards.`,
    gradient: "from-primary to-secondary"
  };

  const neutralTimeline: Timeline = {
    type: "neutral",
    title: "The Balanced Reality",
    career: isCareerRelated
      ? `Choosing ${alternateChoice} brought both breakthroughs and setbacks. You advanced professionally but faced fierce competition. Some opportunities materialized while others slipped away, teaching you that success is rarely linear.`
      : `Your career path had its ups and downs. The decision led to interesting projects but also unexpected stress. You learned valuable skills while questioning if this was truly your calling.`,
    relationships: isRelationshipRelated
      ? `This choice deepened some relationships while straining others. You discovered who your true supporters were, but also lost touch with people you cared about. Connection required more intentional effort.`
      : `Your relationships evolved in complex ways. New friendships formed around shared experiences, but maintaining work-life balance became challenging. Quality often came at the expense of quantity.`,
    lifestyle: isLocationRelated
      ? `Life in your new setting had both charm and frustration. You found hidden gems and favorite spots, but also dealt with practical challenges like higher costs or longer commutes. Adaptation took longer than expected.`
      : `Your daily life improved in some ways but complicated others. More freedom in one area meant less in another. You learned to appreciate small wins while managing persistent frustrations.`,
    emotionalImpact: `You experience moments of satisfaction mixed with periods of doubt. Some days you feel proud of your choice; others you wonder "what if?" The ambiguity is uncomfortable but teaches you to sit with uncertainty.`,
    takeaway: `Most decisions are neither purely good nor bad—they're trade-offs. This alternate path would have shown you that every choice opens some doors while closing others, and growth often happens in the gray areas.`,
    gradient: "from-muted to-muted-foreground"
  };

  const darkTimeline: Timeline = {
    type: "dark",
    title: "The Shadow Path",
    career: isCareerRelated
      ? `The alternate choice led to a toxic work environment that slowly eroded your confidence. Promises made during hiring weren't kept. You found yourself trapped between financial necessity and mental health, eventually burning out.`
      : `What seemed like an exciting opportunity became a source of chronic stress. The mismatch between expectations and reality led to disillusionment. You stayed too long, sacrificing your well-being for sunk costs.`,
    relationships: isRelationshipRelated
      ? `This path brought people into your life who weren't right for you. Unhealthy dynamics drained your energy. You learned painful lessons about boundaries, often too late to prevent lasting damage.`
      : `The time and energy demands left little room for meaningful connections. Friendships faded, family relationships strained. Loneliness became a constant companion, even in crowded rooms.`,
    lifestyle: isLocationRelated
      ? `The new location never felt like home. You battled isolation, practical hardships, and a persistent sense of not belonging. The grass wasn't greener—just different shades of brown.`
      : `Your lifestyle became unsustainable. Compromises you thought were temporary became permanent. The gap between how you wanted to live and your actual reality created a constant, low-grade depression.`,
    emotionalImpact: `Regret became a familiar weight. You second-guessed yourself constantly, trapped in cycles of "if only." The experience left scars that took years to heal, fundamentally changing how you approach major decisions.`,
    takeaway: `Not all risks pay off, and some wrong turns take years to undo. This darker timeline would have taught you that intuition matters, that warning signs deserve attention, and that admitting a mistake early is better than persisting in misery.`,
    gradient: "from-accent to-destructive"
  };

  return [optimisticTimeline, neutralTimeline, darkTimeline];
};