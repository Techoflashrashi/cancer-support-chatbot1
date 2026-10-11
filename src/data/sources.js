/*
 * Source registry.
 *
 * Every URL here was opened and checked on 11 October 2026 to confirm it
 * loads and covers the topic it is attached to. Content in this app is
 * summarised in our own words; no source endorses this prototype.
 *
 * To add a source: add an entry here, then reference its id from a topic's
 * `sources` array in topics.js. Set `verified` to false (and leave a note) if
 * you add a link you could not open, so the UI labels it honestly.
 */
(function (root) {
  "use strict";
  var CSC = (root.CSC = root.CSC || {});

  CSC.SOURCES_CHECKED_ON = "11 October 2026";

  CSC.sources = {
    "nci-childhood": {
      org: "National Cancer Institute",
      title: "Childhood Cancers",
      url: "https://www.cancer.gov/types/childhood-cancers",
      verified: true
    },
    "who-childhood": {
      org: "World Health Organization",
      title: "Childhood cancer (fact sheet)",
      url: "https://www.who.int/news-room/fact-sheets/detail/cancer-in-children",
      verified: true
    },
    "acs-children": {
      org: "American Cancer Society",
      title: "Childhood Cancer",
      url: "https://www.cancer.org/cancer/types/cancer-in-children.html",
      verified: true
    },
    "stjude-together": {
      org: "St. Jude Children's Research Hospital",
      title: "Together by St. Jude",
      url: "https://together.stjude.org/en-us/",
      verified: true
    },
    "tmc-home": {
      org: "Tata Memorial Centre",
      title: "Tata Memorial Centre (patient services and information booklet)",
      url: "https://tmc.gov.in/",
      verified: true
    },
    "nci-diagnosis": {
      org: "National Cancer Institute",
      title: "How Cancer Is Diagnosed",
      url: "https://www.cancer.gov/about-cancer/diagnosis-staging/diagnosis",
      verified: true
    },
    "nci-pathology": {
      org: "National Cancer Institute",
      title: "Pathology Reports",
      url: "https://www.cancer.gov/about-cancer/diagnosis-staging/diagnosis/pathology-reports-fact-sheet",
      verified: true
    },
    "nci-staging": {
      org: "National Cancer Institute",
      title: "Cancer Staging",
      url: "https://www.cancer.gov/about-cancer/diagnosis-staging/staging",
      verified: true
    },
    "nci-chemo": {
      org: "National Cancer Institute",
      title: "Chemotherapy to Treat Cancer",
      url: "https://www.cancer.gov/about-cancer/treatment/types/chemotherapy",
      verified: true
    },
    "nci-radiation": {
      org: "National Cancer Institute",
      title: "Radiation Therapy to Treat Cancer",
      url: "https://www.cancer.gov/about-cancer/treatment/types/radiation-therapy",
      verified: true
    },
    "nci-immuno": {
      org: "National Cancer Institute",
      title: "Immunotherapy to Treat Cancer",
      url: "https://www.cancer.gov/about-cancer/treatment/types/immunotherapy",
      verified: true
    },
    "nci-targeted": {
      org: "National Cancer Institute",
      title: "Targeted Therapy to Treat Cancer",
      url: "https://www.cancer.gov/about-cancer/treatment/types/targeted-therapies",
      verified: true
    },
    "nci-surgery": {
      org: "National Cancer Institute",
      title: "Surgery to Treat Cancer",
      url: "https://www.cancer.gov/about-cancer/treatment/types/surgery",
      verified: true
    },
    "nci-transplant": {
      org: "National Cancer Institute",
      title: "Stem Cell and Bone Marrow Transplants for Cancer",
      url: "https://www.cancer.gov/about-cancer/treatment/types/stem-cell-transplant",
      verified: true
    },
    "nci-trials": {
      org: "National Cancer Institute",
      title: "What Are Clinical Trials?",
      url: "https://www.cancer.gov/about-cancer/treatment/clinical-trials/what-are-trials",
      verified: true
    },
    "nci-side-effects": {
      org: "National Cancer Institute",
      title: "Side Effects of Cancer Treatment",
      url: "https://www.cancer.gov/about-cancer/treatment/side-effects",
      verified: true
    },
    "nci-infection": {
      org: "National Cancer Institute",
      title: "Infection and Neutropenia during Cancer Treatment",
      url: "https://www.cancer.gov/about-cancer/treatment/side-effects/infection",
      verified: true
    },
    "nci-hair": {
      org: "National Cancer Institute",
      title: "Hair Loss (Alopecia) and Cancer Treatment",
      url: "https://www.cancer.gov/about-cancer/treatment/side-effects/hair-loss",
      verified: true
    },
    "nci-nausea": {
      org: "National Cancer Institute",
      title: "Nausea and Vomiting and Cancer Treatment",
      url: "https://www.cancer.gov/about-cancer/treatment/side-effects/nausea",
      verified: true
    },
    "nci-fatigue": {
      org: "National Cancer Institute",
      title: "Fatigue and Cancer Treatment",
      url: "https://www.cancer.gov/about-cancer/treatment/side-effects/fatigue",
      verified: true
    },
    "nci-mouth": {
      org: "National Cancer Institute",
      title: "Mouth and Throat Problems during Cancer Treatment",
      url: "https://www.cancer.gov/about-cancer/treatment/side-effects/mouth-throat",
      verified: true
    },
    "nci-nutrition": {
      org: "National Cancer Institute",
      title: "Nutrition During Cancer Treatment",
      url: "https://www.cancer.gov/about-cancer/treatment/side-effects/appetite-loss/nutrition-pdq",
      verified: true
    },
    "nci-late-effects": {
      org: "National Cancer Institute",
      title: "Late Effects of Treatment for Childhood Cancer (PDQ), Patient Version",
      url: "https://www.cancer.gov/types/childhood-cancers/late-effects-pdq",
      verified: true
    },
    "nci-families": {
      org: "National Cancer Institute",
      title: "Support for Families: Childhood Cancer",
      url: "https://www.cancer.gov/about-cancer/coping/caregiver-support/parents",
      verified: true
    },
    "nci-feelings": {
      org: "National Cancer Institute",
      title: "Emotions and Cancer",
      url: "https://www.cancer.gov/about-cancer/coping/feelings",
      verified: true
    },
    "nci-dictionary": {
      org: "National Cancer Institute",
      title: "NCI Dictionary of Cancer Terms",
      url: "https://www.cancer.gov/publications/dictionaries/cancer-terms",
      verified: true
    },
    "nci-child-all": {
      org: "National Cancer Institute",
      title: "Childhood Acute Lymphoblastic Leukemia",
      url: "https://www.cancer.gov/types/leukemia/patient/child-all-treatment-pdq",
      verified: true
    },
    "nci-wilms": {
      org: "National Cancer Institute",
      title: "Wilms Tumor and Other Childhood Kidney Tumors",
      url: "https://www.cancer.gov/types/kidney/patient/wilms-treatment-pdq",
      verified: true
    },
    "nci-neuroblastoma": {
      org: "National Cancer Institute",
      title: "Neuroblastoma Treatment (PDQ), Patient Version",
      url: "https://www.cancer.gov/types/neuroblastoma/patient/neuroblastoma-treatment-pdq",
      verified: true
    }
  };

  if (typeof module !== "undefined" && module.exports) module.exports = CSC.sources;
})(typeof window !== "undefined" ? window : globalThis);
