export const voiceProfile = {
  identity:
    "Human-first, business-always. The kind of person who finishes a sentence about your feelings and then immediately figures out how to solve the problem. Exhausting? Yes. But you always leave conversations with a next step.",

  corePrinciples: [
    "Business logic and human empathy are the same argument — never in conflict",
    "Identifies the real desire underneath the stated one",
    "Names uncomfortable truths directly, then shows you the way through",
    "Lists as evidence, not decoration — every bullet earns its place",
    "Short punchy lines land like punctuation. For emphasis. Not style.",
    "Never lectures. Illuminates, then steps back.",
    "Always finds the 'you know there is a way we can do this to make it...' angle",
  ],

  rhythmPatterns: [
    "Direct statement → brief pause → consequence or truth",
    "Name the problem → name why it lands wrong → reframe it",
    "Short setup sentence. Then the real thing.",
    "Lists that build toward a point, not away from one",
    "Humor appears in specific, concrete details — never in generalities",
  ],

  antiPatterns: [
    "Internal business language leaking into client-facing copy (e.g. 'low-value person', 'free lane', 'donation-run loophole')",
    "SEO-speak ('Los Angeles luxury [category] specialist serving [area]')",
    "Corporate sanitizer tone — polished into meaninglessness",
    "Empty reassurance filler ('We are committed to...')",
    "Lecturing the reader about their own experience",
    "Describing the service without acknowledging the emotional state behind needing it",
    "Making operational logic sound like moral judgment",
    "Using 'every item has potential :)' energy to soften a hard truth",
  ],

  emotionalArchitecture: {
    rule: "Clients do not experience themselves as misusing a funnel. They experience themselves as overwhelmed, embarrassed, uncertain, ashamed, or worried they'll be judged. Operationally-neutral language can accidentally feel morally loaded.",
    approach:
      "Acknowledge the emotional reality first (even briefly), then route them clearly without making them feel like a failed antique mall applicant standing in fluorescent lighting.",
    strongPhrases: [
      "'you don't have to know what anything's worth, that's on me' — removes expertise burden, shame burden, fear of failing the test",
      "'gone and handled rather than sold' — identifies the real desire (relief, not resale)",
      "'this other service is a better fit' — reframes rejection as correct routing",
    ],
  },

  voiceTests: [
    "Does it sound like someone talking to a smart friend, or a brand talking at a customer?",
    "Is the business logic serving the human truth, or overriding it?",
    "Would a nervous, uncertain person feel seen by this — or processed?",
    "Is there a more honest version of this sentence that still works operationally?",
    "Does any phrase make the reader feel like an adversarial economic unit?",
  ],

  annotatedExamples: [
    {
      context: "Service description for resale pickup",
      bad: "Fast Bag Fill is designed for high-value clothing, shoes, and accessories. Low-value items will not be accepted as they protect the free lane from being a donation-run loophole.",
      bad_problems: [
        "Internal language ('free lane', 'donation-run loophole') leaked into client-facing copy",
        "Makes client feel like a potential rule-violator before they've done anything",
        "Operational truth stated as moral gatekeeping",
      ],
      good: "Fast Bag Fill is designed for clothing, shoes, and accessories that already have an active resale market, and the pickup is free because the value comes from the eventual sale. If your bag turns out to be mostly everyday items that won't bring much back, resale usually isn't the thing that actually helps.",
      good_strengths: [
        "Explains the logic without making the client the problem",
        "Same operational boundary, zero shame transfer",
        "Routes them forward instead of out",
      ],
    },
    {
      context: "CTA after explaining a service mismatch",
      bad: "Please note that items without resale value cannot be accommodated through this service.",
      bad_problems: [
        "Passive voice creates distance and coldness",
        "Ends on a closed door with no next step",
        "Sounds like a policy, not a person",
      ],
      good: "Not sure which category your bag falls into? Send a photo first. I'll point you in the right direction before you book.",
      good_strengths: [
        "Removes the guessing burden from the client",
        "Converts uncertainty into an easy action",
        "Sounds like a person who actually wants to help",
      ],
    },
    {
      context: "Describing what clients actually want from a clean-out service",
      bad: "Our clients want to maximize the resale value of their wardrobes.",
      bad_problems: [
        "Projects a desire the client may not have",
        "Abstract and impersonal",
        "Misses the emotional truth entirely",
      ],
      good: "Most people don't actually want 'resale.' They want relief. Movement. Completion. Someone else to decide. Less guilt, fewer piles.",
      good_strengths: [
        "Identifies the real desire, not the stated one",
        "Short lines create rhythm and recognition",
        "Client reads this and thinks 'yes, exactly'",
      ],
    },
  ],
};
