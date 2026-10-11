(function (root) {
  "use strict";
  var CSC = root.CSC;

  CSC.addTopics([
    {
      id: "clinic-visits",
      category: "hospital",
      title: "What to expect at clinic and day care visits",
      summary: "A typical outpatient or day care visit, and what to bring.",
      patterns: [
        "what happens at a hospital visit",
        "what to expect at the oncology clinic",
        "what should we bring to the hospital",
        "why do we wait so long at the hospital",
        "what is day care chemo",
        "what happens on a treatment day"
      ],
      keywords: ["visit", "visits", "clinic", "opd", "outpatient", "day care", "daycare", "appointment", "bring", "wait", "waiting", "treatment day", "hospital"],
      short: [
        "Many children have much of their treatment as **outpatients**, coming in for the day and going home the same evening. Visits often involve several steps, which can take a long time."
      ],
      more: [
        {
          h: "A visit often includes",
          list: [
            "Registration, and checking height, weight and temperature",
            "Blood tests, then waiting for results",
            "Seeing the doctor or nurse, who checks how your child is and decides whether treatment can go ahead",
            "Waiting for medicines to be prepared, then treatment in a day care area",
            "Collecting prescriptions and the next appointment date"
          ]
        },
        {
          h: "Useful things to bring",
          list: [
            "Your folder with reports, prescriptions and your list of questions",
            "Your child's current medicines, or a written list",
            "Water, snacks your child can eat (check with the team if there are food rules), and something to do: books, colouring, or a charged phone or tablet",
            "A change of clothes and a blanket or comfort item",
            "A notebook or phone to write down what is said"
          ]
        }
      ],
      askTeam: [
        "Roughly how long should we plan for each visit?",
        "Can my child eat before the visit, or do they need to fast?",
        "Who do we tell if we cannot come on the planned day?"
      ],
      followUps: ["How do I prepare my child for a procedure?", "How can I keep track of everything?", "What is a port or central line?"],
      related: ["preparing-for-procedures", "care-notebook", "central-lines"],
      sources: ["stjude-together", "tmc-home"]
    },
    {
      id: "preparing-for-procedures",
      category: "hospital",
      title: "Preparing a child for procedures",
      summary: "Honest, age-appropriate ways to help children through needles, scans and operations.",
      patterns: [
        "how do i prepare my child for a procedure",
        "my child is scared of needles",
        "how do i explain a procedure to my child",
        "my child cries every time at the hospital",
        "how to make injections easier for my child",
        "what is sedation"
      ],
      keywords: ["prepare", "preparing", "needle", "needles", "injection", "injections", "poke", "scared", "fear", "afraid", "crying", "cries", "procedure", "procedures", "sedation", "numbing", "child life", "play specialist"],
      short: [
        "Children usually cope better when they know what is going to happen, explained honestly and in words they understand. Surprises and promises that turn out to be untrue can make fear worse next time."
      ],
      more: [
        {
          h: "Ideas that often help",
          list: [
            "**Tell the truth, simply.** For example: \"The nurse will clean your arm. You will feel a quick pinch, then it will be over.\" Avoid saying \"it won't hurt\" if it might.",
            "**Choose the timing.** Younger children may do best with short notice. Older children and teens often want to know earlier.",
            "**Give a choice where there is one,** such as which arm, or whether to watch or look away.",
            "**Bring comfort:** a favourite toy, music, a story, or holding your hand.",
            "**Use distraction:** counting, blowing bubbles, a video, or a game.",
            "**Ask about numbing cream** or other comfort measures before needles. Many hospitals offer them.",
            "**Praise effort,** not just being brave. Crying is allowed."
          ]
        },
        {
          h: "Ask for specialist help",
          p: [
            "Many children's hospitals have play specialists, child life specialists or psychologists who prepare children for procedures using play and simple pictures. Ask whether your hospital has this support."
          ]
        }
      ],
      askTeam: [
        "Can my child have numbing cream or other comfort measures before needles?",
        "Is there a play or child life specialist who can help prepare my child?",
        "Can I stay with my child during the procedure?"
      ],
      followUps: ["How do I explain cancer to my younger child?", "What is a port or central line?", "What is a bone marrow test?"],
      related: ["talking-to-child", "central-lines", "emotional-wellbeing-child"],
      sources: ["stjude-together", "nci-families"]
    },
    {
      id: "inpatient-stay",
      category: "hospital",
      title: "Staying in hospital",
      summary: "What admissions are like, and how to make long stays easier.",
      patterns: [
        "what happens when my child is admitted",
        "how long will my child stay in hospital",
        "what is isolation",
        "can i stay with my child in the ward",
        "what should we pack for hospital"
      ],
      keywords: ["admitted", "admission", "ward", "inpatient", "stay", "isolation", "pack", "overnight", "bed", "night"],
      short: [
        "Some treatments, complications such as infections, and operations mean your child may need to stay in hospital. Stays can last from one night to several weeks."
      ],
      more: [
        {
          h: "Making a stay easier",
          list: [
            "Bring familiar things: a pillowcase, photos, toys, books or school work.",
            "Keep some routine, such as regular wake-up and bedtimes, where the ward allows.",
            "Ask about visiting rules, and whether a parent can stay overnight.",
            "Take turns with other adults if you can, so you get rest too.",
            "Ask about infection rules, such as hand washing, visitors who are unwell, and outside food."
          ]
        },
        {
          h: "Isolation",
          p: [
            "Sometimes children are cared for in a single room to reduce the risk of infection, for example when their immune system is very weak. The team will explain the rules, which may include masks and limits on visitors."
          ]
        }
      ],
      askTeam: [
        "How long do you expect my child to stay?",
        "What are the rules for visitors, food and overnight stays?",
        "What needs to happen before my child can go home?"
      ],
      followUps: ["What is a discharge summary?", "How do I look after myself?", "How can I support my other children?"],
      related: ["discharge-summary", "caring-for-yourself", "siblings"],
      sources: ["stjude-together"]
    },
    {
      id: "central-lines",
      category: "hospital",
      title: "Ports and central lines",
      summary: "Devices that let teams give medicine and take blood with fewer needles.",
      patterns: [
        "what is a port",
        "what is a central line",
        "what is a picc line",
        "what is a hickman line",
        "how do i care for the central line at home",
        "what is a chemoport"
      ],
      keywords: ["port", "chemoport", "central line", "line", "picc", "hickman", "broviac", "cvc", "catheter", "portacath", "dressing", "flush"],
      short: [
        "A **central line** is a thin, soft tube placed into a large vein, usually in the chest. It lets the team give chemotherapy, fluids and other medicines, and take blood, without a new needle each time.",
        "A **port** (or chemoport) is a type of central line that sits completely under the skin. A special needle is used to access it. A **PICC line** is a thinner line placed through a vein in the arm."
      ],
      more: [
        {
          h: "Caring for a line at home",
          p: [
            "The team will teach you how to care for the line, such as keeping the dressing clean and dry and protecting it during bathing. Every hospital has its own routine, so follow the instructions you are given."
          ]
        },
        {
          h: "When to call",
          p: [
            "A line can sometimes become infected, blocked or damaged. **Contact your child's team straight away** if you notice fever, redness, swelling, pain or leaking around the line, or if the line is damaged or comes out. If the line is broken or bleeding, follow the emergency steps your team taught you and get urgent help."
          ]
        }
      ],
      askTeam: [
        "What type of line will my child have, and how is it put in?",
        "How do we care for it at home?",
        "What should we do if the line breaks, leaks or falls out?"
      ],
      followUps: ["Why is fever dangerous during chemotherapy?", "When should I call the care team urgently?", "What happens during chemotherapy?"],
      related: ["low-counts-infection", "when-to-call", "chemotherapy"],
      sources: ["nci-chemo", "stjude-together"]
    },
    {
      id: "transfusions",
      category: "hospital",
      title: "Blood and platelet transfusions",
      summary: "Why some children need blood or platelets during treatment.",
      patterns: [
        "what is a blood transfusion",
        "why does my child need blood",
        "why does my child need a platelet transfusion",
        "is a transfusion safe",
        "can we donate blood for our child"
      ],
      keywords: ["transfusion", "transfusions", "platelet transfusion", "blood transfusion", "need blood", "prbc", "donate", "donor", "blood bank", "sdp"],
      short: [
        "Cancer and its treatment can lower the numbers of red blood cells and platelets. A **transfusion** gives your child donated red blood cells (to help with anemia and tiredness) or platelets (to help prevent or stop bleeding).",
        "Transfusions are a common, routine part of childhood cancer care."
      ],
      more: [
        {
          h: "What happens",
          p: [
            "Blood is tested to make sure it matches your child. It is then given slowly through a drip or central line while nurses watch for reactions. Hospitals often ask families to help find blood donors. The blood bank will explain the rules for donors."
          ]
        }
      ],
      askTeam: [
        "Why does my child need a transfusion now?",
        "What signs of a reaction should we look for?",
        "Do you need us to arrange donors?"
      ],
      followUps: ["What are blood counts?", "Why is fever dangerous during chemotherapy?"],
      related: ["blood-tests", "low-counts-infection"],
      sources: ["nci-side-effects"]
    }
  ]);
})(typeof window !== "undefined" ? window : globalThis);
