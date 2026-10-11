/*
 * Topic categories and the shared registry that topic files add to.
 *
 * Content files (topics-*.js) call CSC.addTopics([...]). Keeping content in
 * plain data files means a writer can add or edit a topic without touching
 * any matching or interface code. See README "Extending the knowledge base".
 */
(function (root) {
  "use strict";
  var CSC = (root.CSC = root.CSC || {});

  CSC.categories = [
    { id: "understanding", title: "Understanding the diagnosis", blurb: "The first days, what cancer is, and common words." },
    { id: "diagnosis", title: "Tests and diagnosis", blurb: "Biopsies, blood tests, scans and reports." },
    { id: "cancer-types", title: "Childhood cancers", blurb: "The main types and how they differ." },
    { id: "treatment", title: "Treatments", blurb: "Chemotherapy, surgery, radiation and newer treatments." },
    { id: "hospital", title: "Hospital visits", blurb: "Appointments, day care, procedures and staying in." },
    { id: "side-effects", title: "Side effects and supportive care", blurb: "What can happen and how teams help." },
    { id: "ask-team", title: "Questions for the care team", blurb: "What to ask, and how to ask it." },
    { id: "daily-life", title: "Daily life during treatment", blurb: "Food, rest, school, feelings and caring for yourself." },
    { id: "paperwork", title: "Prescriptions and paperwork", blurb: "Prescriptions, discharge papers and follow-up." },
    { id: "organising", title: "Staying organised", blurb: "Keeping track of visits, medicines and information." },
    { id: "family", title: "Family and siblings", blurb: "Talking to children, brothers and sisters, and teens." },
    { id: "urgent", title: "When to get help", blurb: "Contacting the team urgently and emergencies." }
  ];

  CSC.topics = CSC.topics || [];

  CSC.addTopics = function (list) {
    for (var i = 0; i < list.length; i++) CSC.topics.push(list[i]);
  };

  CSC.getTopic = function (id) {
    for (var i = 0; i < CSC.topics.length; i++) if (CSC.topics[i].id === id) return CSC.topics[i];
    return null;
  };

  CSC.getCategory = function (id) {
    for (var i = 0; i < CSC.categories.length; i++) if (CSC.categories[i].id === id) return CSC.categories[i];
    return null;
  };
})(typeof window !== "undefined" ? window : globalThis);
