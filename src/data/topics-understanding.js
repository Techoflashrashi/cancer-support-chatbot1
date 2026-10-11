(function (root) {
  "use strict";
  var CSC = root.CSC;

  CSC.addTopics([
    {
      id: "first-days",
      category: "understanding",
      title: "The first days after a diagnosis",
      summary: "What many families feel, and a few steps that can make the first weeks more manageable.",
      patterns: [
        "my child was just diagnosed with cancer",
        "we just found out our child has cancer",
        "what do we do now after diagnosis",
        "where do i start",
        "i am overwhelmed by everything the doctors said",
        "newly diagnosed what should we do first",
        "we got the diagnosis today"
      ],
      keywords: ["diagnosed", "diagnosis", "just found out", "newly diagnosed", "first days", "shock", "just told"],
      short: [
        "Hearing that your child has cancer is a shock. Many parents describe feeling numb, frightened, or unable to take in what the doctors said. These reactions are common, and nobody expects you to understand everything in the first few days.",
        "Childhood cancer is treated by specialist teams who explain things step by step. You do not need to learn it all at once."
      ],
      more: [
        {
          h: "A few things that can help this week",
          list: [
            "**Ask for the name of the cancer, written down.** The exact name matters, because different childhood cancers are treated very differently.",
            "**Find out who to contact, and how.** Ask which number to call during the day, at night, and in an emergency. Save it in your phone and write it on paper.",
            "**Start one folder or notebook.** Keep reports, prescriptions and your questions together. The Appointment checklist in this app can help you collect questions.",
            "**Bring another adult to important meetings** if you can, so one person can listen and the other can take notes.",
            "**Ask about the hospital's support services**, such as social workers, counsellors, child life or play specialists, and dietitians. Many children's cancer centres have them."
          ]
        },
        {
          h: "It is fine to ask the same question again",
          p: [
            "Doctors and nurses expect families to ask questions more than once. Saying \"Can you explain that again, more simply?\" is a normal and useful thing to do."
          ]
        }
      ],
      askTeam: [
        "What is the exact name of my child's cancer? Can you write it down for me?",
        "What happens in the next two weeks?",
        "Who should we call if we have a question or a problem, during the day and at night?",
        "Is there a social worker or counsellor we can speak to?"
      ],
      followUps: ["What should I ask the doctor tomorrow?", "What if I don't understand what the doctor told me?", "How do I explain cancer to my child?"],
      related: ["what-is-cancer", "not-understanding", "preparing-questions", "caring-for-yourself"],
      sources: ["nci-families", "acs-children", "stjude-together"]
    },
    {
      id: "what-is-cancer",
      category: "understanding",
      title: "What cancer is, in plain words",
      summary: "A simple explanation of what cancer is and how childhood cancer differs from adult cancer.",
      patterns: [
        "what is cancer",
        "what exactly is cancer",
        "explain cancer simply",
        "how does cancer start",
        "is cancer contagious",
        "can other children catch it",
        "how is childhood cancer different from adult cancer"
      ],
      keywords: ["cancer", "what is cancer", "cells", "contagious", "catch", "spread to others", "adult", "start"],
      short: [
        "Our bodies are made of tiny building blocks called **cells**. Normally, cells grow, divide and are replaced in an orderly way. Cancer happens when some cells start growing and dividing in a way the body cannot control.",
        "These cells can form a lump called a **tumor**, or, in blood cancers like leukemia, they can build up in the blood and bone marrow. **Cancer is not contagious.** Brothers, sisters, friends and classmates cannot catch it."
      ],
      more: [
        {
          h: "How childhood cancer is different",
          p: [
            "Cancers in children are usually different types from the cancers adults get, and they are treated with plans designed for children. They are often treated at specialist children's cancer centres or by pediatric oncologists (children's cancer doctors).",
            "Many childhood cancers respond well to treatment, but outcomes vary a lot from one type of cancer to another and from one child to another. Your child's team is the right source for what to expect in your child's case."
          ]
        },
        {
          h: "A simple way to picture it",
          p: [
            "Some families find this comparison useful: imagine a garden where a few plants start growing out of control and crowd the others. Treatment is aimed at removing or stopping those plants so the rest of the garden can grow normally again."
          ]
        }
      ],
      askTeam: [
        "Where in the body did my child's cancer start?",
        "Has it spread anywhere else?",
        "How is this type of cancer usually treated in children?"
      ],
      followUps: ["What are the most common childhood cancers?", "Why did this happen to my child?", "What does stage mean?"],
      related: ["why-did-this-happen", "childhood-cancers-overview", "common-terms"],
      sources: ["nci-childhood", "acs-children"]
    },
    {
      id: "why-did-this-happen",
      category: "understanding",
      title: "Why did this happen? Is it our fault?",
      summary: "What is known about causes of childhood cancer, and why parents are not to blame.",
      patterns: [
        "why did my child get cancer",
        "is it my fault",
        "did we cause this",
        "what causes childhood cancer",
        "could i have prevented it",
        "is it something we fed him",
        "is it genetic",
        "will my other children get cancer"
      ],
      keywords: ["cause", "causes", "other children", "get cancer too", "fault", "blame", "prevent", "prevented", "genetic", "inherited", "hereditary", "food", "mobile phone", "guilt", "guilty"],
      short: [
        "Many parents ask whether something they did, or did not do, caused their child's cancer. For most childhood cancers, **the cause is not known, and it is not something parents caused or could have prevented.**",
        "Most childhood cancers are thought to start from changes in a cell's genes that happen early in life, sometimes even before birth. These changes usually happen by chance."
      ],
      more: [
        {
          h: "Is it inherited?",
          p: [
            "A small share of childhood cancers are linked to gene changes passed down in families. If the doctors think this is possible, they may suggest a meeting with a **genetic counselor**, who can explain whether any testing would be useful for your child or other family members."
          ]
        },
        {
          h: "Living with the question",
          p: [
            "Feeling guilty is very common, even when there is nothing to feel guilty about. If these thoughts keep returning, it can help to talk them through with the team, a hospital counselor, or someone you trust."
          ]
        }
      ],
      askTeam: [
        "Is anything known about why this type of cancer happens?",
        "Should our family see a genetic counselor?",
        "Do our other children need any checks?"
      ],
      followUps: ["How do I explain cancer to my younger child?", "How do I look after myself?"],
      related: ["what-is-cancer", "siblings", "caring-for-yourself"],
      sources: ["acs-children", "nci-childhood"]
    },
    {
      id: "common-terms",
      category: "understanding",
      title: "Words you will hear often",
      summary: "Short explanations of the terms that come up in the first conversations.",
      patterns: [
        "what do the medical words mean",
        "common cancer terms",
        "i don't understand the medical terms",
        "what is the difference between benign and malignant",
        "what does malignant mean",
        "what does metastasis mean",
        "what is oncology"
      ],
      keywords: ["terms", "words", "vocabulary", "jargon", "benign", "malignant", "metastasis", "metastatic", "oncology", "oncologist", "terminology", "medical words"],
      short: [
        "Hospitals use many unfamiliar words. Here are some of the most common ones in plain language. The Glossary in this app has many more."
      ],
      more: [
        {
          h: "The basics",
          list: [
            "**Oncology:** the area of medicine that treats cancer. A **pediatric oncologist** is a children's cancer doctor.",
            "**Tumor:** a lump of cells. It can be **benign** (not cancer, does not spread) or **malignant** (cancer).",
            "**Metastasis:** when cancer has spread from where it started to another part of the body.",
            "**Primary site:** the place where the cancer first started.",
            "**Stage:** how much cancer there is and whether, or how far, it has spread.",
            "**Risk group:** many childhood cancers are sorted into groups such as low, standard or high risk. This helps doctors choose how intensive the treatment should be.",
            "**Protocol:** the detailed plan that sets out which treatments are given, and when.",
            "**Remission:** signs of cancer have reduced or are no longer found on tests."
          ]
        }
      ],
      askTeam: [
        "What stage or risk group is my child in, and what does that mean for treatment?",
        "Can you write down the key words you used today?"
      ],
      followUps: ["What does remission mean?", "What does stage mean?", "Open the glossary"],
      related: ["remission-relapse", "staging-risk", "not-understanding"],
      sources: ["nci-dictionary", "nci-staging"]
    },
    {
      id: "remission-relapse",
      category: "understanding",
      title: "Remission, relapse and being \"in treatment\"",
      summary: "What remission and relapse mean, and why treatment can continue after remission.",
      patterns: [
        "what does remission mean",
        "what is remission",
        "what is relapse",
        "what does relapse mean",
        "if she is in remission why is she still getting chemo",
        "does remission mean cured",
        "what is minimal residual disease",
        "what does refractory mean"
      ],
      keywords: ["remission", "relapse", "relapsed", "recurrence", "recur", "come back", "cured", "cure", "mrd", "minimal residual disease", "refractory", "complete remission"],
      short: [
        "**Remission** means the signs and symptoms of cancer have reduced, or that tests can no longer find cancer. **Complete remission** means no signs of cancer are found on the tests used.",
        "**Relapse** (also called **recurrence**) means cancer has come back after a period of remission."
      ],
      more: [
        {
          h: "Why treatment often continues after remission",
          p: [
            "Tests can only find cancer cells above a certain amount. A small number of cells may still be present even when tests look clear. For this reason, many treatment plans, for example for some leukemias, continue for months or longer after remission is reached. This is planned, and does not mean something has gone wrong.",
            "Remission is not always the same as \"cured\". Doctors often use the word cure only after a long time has passed without the cancer returning. Ask your child's team how they use these words for your child."
          ]
        },
        {
          h: "Other words you might hear",
          list: [
            "**Minimal residual disease (MRD):** a very sensitive test, often used in leukemia, that looks for tiny numbers of cancer cells left after treatment.",
            "**Refractory:** cancer that has not responded well to treatment.",
            "**Progression:** the cancer has grown or spread."
          ]
        }
      ],
      askTeam: [
        "Is my child in remission? How was that measured?",
        "Why does treatment continue, and for how long?",
        "What follow-up tests will check for relapse?"
      ],
      followUps: ["What happens during chemotherapy?", "What are follow-up appointments for?", "What are late effects?"],
      related: ["chemotherapy", "follow-up-appointments", "leukemia"],
      sources: ["nci-dictionary", "nci-child-all"]
    },
    {
      id: "not-understanding",
      category: "understanding",
      title: "When you don't understand what the doctor said",
      summary: "Practical ways to get information explained again, more clearly.",
      patterns: [
        "what if i don't understand what the doctor told me",
        "i did not understand the doctor",
        "the doctor used words i don't know",
        "the doctor speaks too fast",
        "i am too scared to ask questions",
        "the doctor only speaks english",
        "how do i ask the doctor to explain again"
      ],
      keywords: ["understand", "understood", "confused", "confusing", "explain", "explained", "again", "language", "interpreter", "translator", "hindi", "marathi", "fast", "scared to ask"],
      short: [
        "It is very common to leave an appointment unsure of what was said. Stress makes it hard to take in information, and medical language is difficult for everyone. **It is always okay to ask again.**"
      ],
      more: [
        {
          h: "Things you can say",
          list: [
            "\"Can you explain that again in simpler words?\"",
            "\"Can you write down the name of the cancer and the treatment?\"",
            "\"Let me repeat it back to you, so you can tell me if I understood.\"",
            "\"What is the one most important thing for us to do before the next visit?\"",
            "\"Can someone explain this in Hindi, Marathi, or another language we speak?\""
          ]
        },
        {
          h: "Other ways to get help",
          list: [
            "Ask a nurse after the doctor leaves. Nurses are often very good at explaining.",
            "Ask whether the hospital has written leaflets for families, or a social worker or patient counselor.",
            "Write questions down before the visit, and tick them off as they are answered.",
            "Ask if you can record the explanation on your phone, or bring another adult to take notes."
          ]
        },
        {
          h: "Using this app",
          p: [
            "You can type a word you heard into this chat, or look it up in the Glossary. This app can explain general terms, but only your child's team can explain what they mean for your child."
          ]
        }
      ],
      askTeam: [
        "Can you explain that again in simpler words?",
        "What is the most important thing for us to remember from today?",
        "Is there written information we can take home?"
      ],
      followUps: ["What should I ask the doctor tomorrow?", "How can I keep track of everything?", "Open the glossary"],
      related: ["preparing-questions", "during-appointment", "care-notebook"],
      sources: ["nci-families", "stjude-together"]
    }
  ]);
})(typeof window !== "undefined" ? window : globalThis);
