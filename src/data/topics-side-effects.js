(function (root) {
  "use strict";
  var CSC = root.CSC;

  CSC.addTopics([
    {
      id: "side-effects-overview",
      category: "side-effects",
      title: "Side effects: an overview",
      summary: "Why side effects happen, which are common, and how teams help.",
      patterns: [
        "what are the side effects of treatment",
        "what side effects will my child have",
        "common side effects of chemo",
        "what is supportive care",
        "how are side effects managed"
      ],
      keywords: ["side effects", "side effect", "adverse", "supportive care", "manage", "managed", "effects", "reactions"],
      short: [
        "Side effects happen because cancer treatment can also affect healthy cells. Which side effects a child has depends on the treatment, the dose, and the child. **Not every child gets every side effect.**",
        "**Supportive care** means the care given to prevent and manage side effects, such as anti-sickness medicines, pain relief, nutrition support, transfusions and treating infections."
      ],
      more: [
        {
          h: "Common side effects",
          list: [
            "Tiredness (fatigue)",
            "Nausea and vomiting",
            "Hair loss",
            "Mouth sores",
            "Low blood counts, which raise the risk of infection, bleeding and anemia",
            "Changes in appetite and weight",
            "Mood or behavior changes, for example with steroid medicines"
          ]
        },
        {
          h: "Keep the team informed",
          p: [
            "Tell the team about side effects, even ones that seem small. Many can be eased, and some need prompt attention. Ask the team which problems need an urgent call and which can wait for the next visit. Writing side effects down in a notebook, with dates and times, helps the team understand what is happening."
          ]
        }
      ],
      askTeam: [
        "Which side effects are most likely with my child's treatment?",
        "Which ones need an urgent call, and which can wait?",
        "What can we do at home to help?"
      ],
      followUps: ["Will my child lose their hair?", "How is nausea managed?", "Why is fever dangerous during chemotherapy?", "What are late effects?"],
      related: ["hair-loss", "nausea-vomiting", "low-counts-infection", "mouth-sores", "fatigue", "late-effects"],
      sources: ["nci-side-effects", "nci-chemo"]
    },
    {
      id: "hair-loss",
      category: "side-effects",
      title: "Hair loss",
      summary: "Why hair falls out, when it usually grows back, and how children cope.",
      patterns: [
        "will my child lose their hair",
        "will my child go bald",
        "when will her hair grow back",
        "does all chemo cause hair loss",
        "how do i help my child with hair loss",
        "should we shave his head"
      ],
      keywords: ["hair", "hair loss", "hair fall", "bald", "baldness", "alopecia", "shave", "eyebrows", "grow back", "wig", "cap"],
      short: [
        "Many, but not all, chemotherapy medicines cause hair loss. Radiation can cause hair loss in the area being treated. Hair usually starts to fall out a few weeks after treatment begins and may include eyebrows and eyelashes.",
        "After chemotherapy ends, hair often begins to grow back within a few months. It may come back a different texture or colour at first. After radiation, regrowth can take longer, and with high doses, hair in that area may grow back thinner or not at all."
      ],
      more: [
        {
          h: "Helping your child cope",
          list: [
            "Tell your child before it happens, so it is not a surprise.",
            "Some children prefer to cut their hair short before it falls out. Let them choose if possible.",
            "Offer caps, scarves or hats, and protect the scalp from sun and cold.",
            "Use a gentle shampoo and a soft brush.",
            "For teens, hair loss can be especially hard. Let them talk about it, and ask the team about support."
          ]
        }
      ],
      askTeam: [
        "Is my child's treatment likely to cause hair loss?",
        "When might it start, and when might it grow back?",
        "Is there anything we should avoid using on the scalp?"
      ],
      followUps: ["What are other side effects?", "How do I support my child's feelings?", "How can teens cope with treatment?"],
      related: ["side-effects-overview", "emotional-wellbeing-child", "for-teens"],
      sources: ["nci-hair", "nci-chemo"]
    },
    {
      id: "nausea-vomiting",
      category: "side-effects",
      title: "Nausea and vomiting",
      summary: "How teams prevent sickness, and what can help at home.",
      patterns: [
        "how is nausea managed",
        "my child keeps vomiting",
        "how to stop vomiting after chemo",
        "what helps with nausea",
        "anti sickness medicine",
        "my child feels sick after chemo"
      ],
      keywords: ["nausea", "nauseous", "vomiting", "vomit", "vomits", "throwing up", "sick", "ulti", "anti sickness", "antiemetic", "ondansetron"],
      short: [
        "Nausea (feeling sick) and vomiting can happen with chemotherapy, radiation and other treatments. **Teams usually give anti-sickness medicines (antiemetics) to help prevent it**, often before treatment starts.",
        "Give anti-sickness medicine exactly as prescribed. If it is not working, tell the team, because there are often other options."
      ],
      more: [
        {
          h: "Things that may help at home",
          list: [
            "Small, frequent meals and snacks rather than large meals",
            "Plain, dry foods, and cool foods with less smell",
            "Sipping fluids slowly through the day",
            "Fresh air and a calm space",
            "Distraction, such as music, stories or games"
          ]
        },
        {
          h: "When to call the team",
          p: [
            "**Contact the team promptly** if your child cannot keep fluids or medicines down, seems dehydrated (for example very dry mouth, passing much less urine, or unusually sleepy), vomits blood, or if vomiting continues despite medicine. Ask the team in advance what they want you to do if vomiting happens at home."
          ]
        }
      ],
      askTeam: [
        "Which anti-sickness medicine should my child take, and when?",
        "What should we do if my child vomits soon after taking a medicine?",
        "When should we call you about vomiting?"
      ],
      followUps: ["What should my child eat during treatment?", "When should I call the care team urgently?", "What are other side effects?"],
      related: ["nutrition", "when-to-call", "side-effects-overview"],
      sources: ["nci-nausea"],
      flags: { symptomTopic: true }
    },
    {
      id: "low-counts-infection",
      category: "side-effects",
      title: "Low blood counts, infection and fever",
      summary: "Why infection risk rises during treatment, and why fever needs prompt attention.",
      patterns: [
        "why is fever dangerous during chemotherapy",
        "what is neutropenia",
        "what does a low neutrophil count mean",
        "what is febrile neutropenia",
        "how do we prevent infection",
        "what is low immunity",
        "can my child be around other people"
      ],
      keywords: ["neutropenia", "neutropenic", "febrile", "infection", "infections", "immunity", "immune", "low counts", "neutrophil", "germs", "hygiene", "fever", "temperature"],
      short: [
        "Chemotherapy can lower the number of **neutrophils**, the white blood cells that fight infection. This is called **neutropenia**. When neutrophils are low, an infection can become serious quickly.",
        "**This is why a fever during cancer treatment is treated as urgent.** Your child's team will tell you what temperature counts as a fever for your child and exactly what to do. If your child has a fever now, contact the team or seek urgent care without waiting."
      ],
      more: [
        {
          h: "Before giving any fever medicine",
          p: [
            "Ask the team before giving medicines for fever or pain, such as paracetamol or ibuprofen. These can hide a fever, and some are not suitable during treatment. Your team may give you specific instructions."
          ]
        },
        {
          h: "Reducing the risk of infection",
          list: [
            "Wash hands well, especially before eating and after using the toilet.",
            "Keep your child away from people who are unwell where possible.",
            "Follow food safety advice (see \"Food safety and hygiene at home\").",
            "Care for the central line exactly as taught.",
            "Ask the team before any vaccinations for your child or the family."
          ]
        },
        {
          h: "Other low counts",
          p: [
            "Low **platelets** can lead to easy bruising, nosebleeds or bleeding gums. Low **hemoglobin** (anemia) can cause tiredness and paleness. Tell the team about unusual bleeding or bruising."
          ]
        }
      ],
      askTeam: [
        "What temperature counts as a fever for my child, and what exactly should we do?",
        "Which number do we call, day and night?",
        "Can we give any medicine for fever or pain at home?",
        "What precautions should we take when counts are low?"
      ],
      followUps: ["When should I call the care team urgently?", "What food is safe during treatment?", "What are blood counts?"],
      related: ["when-to-call", "food-safety", "blood-tests", "central-lines"],
      sources: ["nci-infection", "nci-chemo"],
      flags: { urgentBanner: true }
    },
    {
      id: "mouth-sores",
      category: "side-effects",
      title: "Mouth sores and mouth care",
      summary: "Why mouth sores happen and gentle mouth care during treatment.",
      patterns: [
        "my child has mouth sores",
        "what are mouth ulcers from chemo",
        "what is mucositis",
        "how to clean my child's mouth during chemo",
        "my child can't eat because of mouth pain"
      ],
      keywords: ["mouth", "mouth sores", "ulcers", "ulcer", "mucositis", "gums", "teeth", "brushing", "throat", "swallowing", "dental"],
      short: [
        "Some treatments can make the lining of the mouth and throat sore, causing **mouth sores** (sometimes called **mucositis**). This can make eating, drinking and swallowing painful."
      ],
      more: [
        {
          h: "Gentle mouth care",
          list: [
            "Keep the mouth clean with a soft toothbrush, as advised by the team.",
            "Use any mouthwash only if the team recommends it. Some shop mouthwashes contain alcohol and can sting.",
            "Offer soft, cool, non-spicy foods and plenty of fluids.",
            "Tell the team if your child has pain, white patches, or cannot eat or drink. Pain relief and other treatments can help."
          ]
        }
      ],
      askTeam: [
        "How should we clean my child's mouth during treatment?",
        "Can my child see a dentist during treatment?",
        "What can we give for mouth pain?"
      ],
      followUps: ["What should my child eat during treatment?", "How is pain managed?", "What are other side effects?"],
      related: ["nutrition", "pain", "side-effects-overview"],
      sources: ["nci-mouth"],
      flags: { symptomTopic: true }
    },
    {
      id: "fatigue",
      category: "side-effects",
      title: "Tiredness (fatigue)",
      summary: "Why children feel exhausted during treatment, and how to balance rest and activity.",
      patterns: [
        "why is my child always tired",
        "my child has no energy",
        "is it normal to be tired during chemo",
        "what is fatigue",
        "my child sleeps all day"
      ],
      keywords: ["tired", "tiredness", "fatigue", "exhausted", "energy", "weak", "weakness", "sleepy", "sleep all day"],
      short: [
        "**Fatigue** is the most common side effect of cancer treatment. It is a deep tiredness that does not always get better with rest. It can be caused by the cancer, treatment, low hemoglobin, poor sleep, not eating enough, or stress."
      ],
      more: [
        {
          h: "What can help",
          list: [
            "Plan important activities for times when your child usually has more energy.",
            "Balance rest with gentle activity, such as short walks or play, if the team agrees.",
            "Keep a regular sleep routine.",
            "Encourage regular meals and fluids."
          ]
        },
        {
          h: "Tell the team",
          p: [
            "Let the team know if tiredness is getting worse, or if your child is unusually hard to wake, confused, or breathless. Those signs need **prompt medical attention**."
          ]
        }
      ],
      askTeam: [
        "Could my child's tiredness be caused by low blood counts?",
        "How much activity is safe right now?"
      ],
      followUps: ["How much rest and activity is right during treatment?", "What are blood counts?", "When should I call the care team urgently?"],
      related: ["rest-activity", "blood-tests", "when-to-call"],
      sources: ["nci-fatigue"],
      flags: { symptomTopic: true }
    },
    {
      id: "pain",
      category: "side-effects",
      title: "Pain and pain relief",
      summary: "Why pain should always be reported, and how teams manage it.",
      patterns: [
        "how is pain managed",
        "my child is in pain",
        "can i give painkillers",
        "how do i know if my young child is in pain",
        "is it safe to give paracetamol"
      ],
      keywords: ["pain", "painful", "hurts", "hurting", "ache", "aches", "painkiller", "painkillers", "pain relief", "morphine"],
      short: [
        "Children with cancer can have pain from the cancer itself, from procedures, or from side effects such as mouth sores. **Pain can almost always be eased, and children should not be expected to put up with it.** Tell the team about any pain."
      ],
      more: [
        {
          h: "Spotting pain in younger children",
          p: [
            "Young children may not say they are in pain. Signs can include crying, being unusually quiet or irritable, not wanting to move, guarding a part of the body, or changes in eating and sleeping. Hospitals often use simple face scales to help children show how much it hurts."
          ]
        },
        {
          h: "About medicines",
          p: [
            "**Check with the team before giving any pain medicine at home**, including common ones from a chemist. Some can hide a fever or affect bleeding during treatment. The team will advise what is safe and how much. This app cannot advise on doses."
          ]
        },
        {
          h: "Other comfort measures",
          list: ["Distraction, stories and music", "Comfortable positioning, warmth or cool packs if the team agrees", "Calm breathing and holding a parent's hand"]
        }
      ],
      askTeam: [
        "What pain medicine can we give at home, and how much?",
        "What kind of pain should we call you about straight away?",
        "Is there a pain or palliative care team who can help?"
      ],
      followUps: ["When should I call the care team urgently?", "How do I prepare my child for a procedure?", "What are mouth sores?"],
      related: ["when-to-call", "preparing-for-procedures", "mouth-sores"],
      sources: ["nci-side-effects"],
      flags: { symptomTopic: true }
    },
    {
      id: "steroids-mood",
      category: "side-effects",
      title: "Steroids, mood and behavior changes",
      summary: "Why some medicines change appetite, mood and sleep.",
      patterns: [
        "why is my child so angry on steroids",
        "my child is always hungry on steroids",
        "what are steroids for in cancer treatment",
        "why has my child's behaviour changed",
        "my child has mood swings during treatment"
      ],
      keywords: ["steroid", "steroids", "dexamethasone", "prednisolone", "prednisone", "mood", "mood swings", "angry", "irritable", "behaviour", "behavior", "hungry", "appetite increase"],
      short: [
        "**Steroids** (such as dexamethasone or prednisolone) are used in some childhood cancer treatments, especially leukemia, and to reduce swelling or sickness. They can cause **big changes in appetite, mood, sleep and behavior**, such as irritability, tearfulness or constant hunger.",
        "These changes are usually linked to the medicine and tend to settle after the steroid course ends. They are not a sign of bad parenting."
      ],
      more: [
        {
          h: "Coping during a steroid course",
          list: [
            "Keep routines simple and predictable.",
            "Have healthy snacks available if your child is very hungry, and ask the dietitian for ideas.",
            "Be patient with outbursts, and explain to siblings that the medicine is making their brother or sister feel this way.",
            "Never stop or reduce steroids without the team's advice. Stopping suddenly can be harmful."
          ]
        }
      ],
      askTeam: [
        "How long is this steroid course?",
        "What side effects should we expect, and which should we report?",
        "Is there support if behavior becomes very difficult?"
      ],
      followUps: ["How do I support my child's feelings?", "How do I support my other children?", "What should my child eat during treatment?"],
      related: ["emotional-wellbeing-child", "siblings", "nutrition"],
      sources: ["nci-child-all", "stjude-together"]
    },
    {
      id: "late-effects",
      category: "side-effects",
      title: "Late effects and long-term follow-up",
      summary: "Health effects that can appear months or years after treatment, and why follow-up matters.",
      patterns: [
        "what are late effects",
        "will treatment affect my child later in life",
        "long term side effects of childhood cancer treatment",
        "can my child have children later",
        "fertility after childhood cancer",
        "what is survivorship"
      ],
      keywords: ["late effects", "long term", "long-term", "later in life", "survivor", "survivors", "survivorship", "fertility", "growth", "heart", "hearing", "learning", "second cancer"],
      short: [
        "**Late effects** are health problems caused by cancer treatment that can appear months or years after treatment ends. They depend on the type of cancer, the treatments given, the doses, and the child's age at treatment. Many survivors have few or no serious late effects, but it is important to monitor for them.",
        "This is why **long-term follow-up** with regular check-ups continues after treatment is finished."
      ],
      more: [
        {
          h: "Areas that may be monitored",
          p: [
            "Depending on treatment, check-ups may look at growth and development, heart and lung health, hearing, hormones, learning and memory, fertility, emotional wellbeing, and the small chance of a second cancer later on."
          ]
        },
        {
          h: "Fertility",
          p: [
            "Some treatments can affect fertility. If this is a concern, ask the team before treatment starts, because options to protect fertility may be available for some children and teenagers."
          ]
        }
      ],
      askTeam: [
        "Which late effects is my child at risk of, based on their treatment?",
        "What follow-up tests will they need, and for how long?",
        "Could treatment affect fertility, and are there options to protect it?",
        "Can we have a written summary of all the treatment my child received?"
      ],
      followUps: ["What are follow-up appointments for?", "How can I keep my child's medical records organised?", "What does remission mean?"],
      related: ["follow-up-appointments", "medical-records", "remission-relapse"],
      sources: ["nci-late-effects", "acs-children"]
    }
  ]);
})(typeof window !== "undefined" ? window : globalThis);
