/*
 * Question bank for the Appointment checklist.
 * Grouped so families can pick what matters for the visit in front of them.
 */
(function (root) {
  "use strict";
  var CSC = (root.CSC = root.CSC || {});

  CSC.checklistGroups = [
    {
      id: "diagnosis",
      title: "About the diagnosis",
      questions: [
        "What is the exact name of my child's cancer? Can you write it down?",
        "What stage or risk group is it, and what does that mean for treatment?",
        "Are any test results still pending?",
        "Can we have copies of the reports?"
      ]
    },
    {
      id: "treatment",
      title: "About treatment",
      questions: [
        "What is the treatment plan, and how long will it last?",
        "What are the goals of this treatment?",
        "Can we have a written calendar of the treatment?",
        "Is there a clinical trial my child could join?",
        "How will we know whether treatment is working?"
      ]
    },
    {
      id: "side-effects",
      title: "Side effects and safety at home",
      questions: [
        "Which side effects are most likely, and how will you help with them?",
        "Which symptoms mean we should call you straight away?",
        "Which number do we call during the day, at night and at weekends?",
        "What temperature counts as a fever for my child, and what should we do?",
        "Can we give any medicine for fever or pain at home?",
        "Are there foods, herbs or vitamins my child should avoid?"
      ]
    },
    {
      id: "daily-life",
      title: "Daily life",
      questions: [
        "When can my child go back to school?",
        "What activities are safe right now?",
        "Can we see a dietitian, social worker or counselor?",
        "Is there support for brothers and sisters?",
        "Is there help with costs, travel or accommodation?"
      ]
    },
    {
      id: "after",
      title: "Follow-up and the future",
      questions: [
        "What happens after this phase of treatment?",
        "What follow-up tests will be needed, and for how long?",
        "Which late effects should we watch for?",
        "Can we have a written summary of all the treatment given?"
      ]
    }
  ];
})(typeof window !== "undefined" ? window : globalThis);
