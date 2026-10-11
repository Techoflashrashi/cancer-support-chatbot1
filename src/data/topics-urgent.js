(function (root) {
  "use strict";
  var CSC = root.CSC;

  CSC.addTopics([
    {
      id: "when-to-call",
      category: "urgent",
      title: "When to contact the care team urgently",
      summary: "Making a plan with your team before a problem happens.",
      patterns: [
        "when should i call the care team urgently",
        "when should i call the doctor",
        "which symptoms are an emergency",
        "when do we go to the hospital",
        "who do we call at night",
        "what is an emergency during chemo"
      ],
      keywords: ["call", "contact", "urgent", "urgently", "emergency", "when to call", "night", "phone", "helpline", "hospital", "symptoms", "warning signs", "go to hospital"],
      short: [
        "During cancer treatment, some problems can become serious quickly. **Ask your child's team, before you need it, exactly which symptoms need an urgent call and which number to use, day and night.** Save the number in your phone and write it in your notebook.",
        "**Trust your instincts.** If you are worried about your child for any reason, contact the team, even if the problem is not on any list you were given."
      ],
      more: [
        {
          h: "Problems teams commonly ask families to call about",
          p: [
            "This is not a complete list, and your team's advice comes first. Problems often include: fever, chills or shivering; trouble breathing; bleeding that does not stop or unusual bruising; vomiting or diarrhea that prevents drinking or taking medicines; severe or new pain; a child who is unusually drowsy, confused or hard to wake; redness, swelling, leaking or damage around a central line; and not passing urine.",
            "Not having any of these problems does not mean a child is well. If your child seems unwell to you, call."
          ]
        },
        {
          h: "What to have ready when you call",
          list: [
            "Your child's name, hospital ID number, diagnosis and when they last had treatment",
            "What you have noticed and when it started",
            "Any temperature readings, and any medicines given",
            "Your notebook or symptom log"
          ]
        },
        {
          h: "When to call emergency services",
          p: [
            "If your child is not breathing, is unconscious or cannot be woken, is having a seizure, has severe breathing difficulty, or has heavy bleeding, **call local emergency services immediately (112 in India)** or go to the nearest emergency department."
          ]
        }
      ],
      askTeam: [
        "Which symptoms should we call you about straight away?",
        "Which number do we call during the day, at night and at weekends?",
        "If we cannot reach you, where should we go?",
        "What temperature counts as a fever for my child, and what should we do?"
      ],
      followUps: ["Why is fever dangerous during chemotherapy?", "How can I keep track of everything?"],
      related: ["low-counts-infection", "care-notebook", "central-lines"],
      sources: ["nci-infection", "stjude-together"],
      flags: { urgentBanner: true }
    }
  ]);
})(typeof window !== "undefined" ? window : globalThis);
