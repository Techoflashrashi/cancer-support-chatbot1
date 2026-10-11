(function (root) {
  "use strict";
  var CSC = root.CSC;

  CSC.addTopics([
    /* ---------- Questions for the care team ---------- */
    {
      id: "preparing-questions",
      category: "ask-team",
      title: "What to ask the doctor",
      summary: "How to prepare for an appointment, with example questions.",
      patterns: [
        "what should i ask the doctor tomorrow",
        "what questions should i ask the oncologist",
        "questions to ask the care team",
        "how do i prepare for the appointment",
        "what should i ask at the next visit",
        "i have a meeting with the doctor"
      ],
      keywords: ["ask", "questions", "question", "doctor", "oncologist", "appointment", "tomorrow", "prepare", "next visit", "meeting", "consultation"],
      short: [
        "Writing questions down before an appointment helps you remember what matters most, even when you are tired or worried. **Put your two or three most important questions at the top**, in case time is short."
      ],
      more: [
        {
          h: "Questions many families find useful",
          list: [
            "What is the exact name of my child's cancer, and its stage or risk group?",
            "What is the treatment plan, and how long will it last?",
            "What are the most likely side effects, and how will they be managed?",
            "Which symptoms mean we should call you straight away? Which number do we call?",
            "What can we do at home to help?",
            "What happens next, and when is the next appointment?"
          ]
        },
        {
          h: "Use the Appointment checklist",
          p: [
            "The Appointment checklist in this app has more questions grouped by topic. You can tick the ones you want, add your own, and copy the list to your phone notes or a message."
          ]
        }
      ],
      askTeam: [
        "What is the most important thing for us to understand today?",
        "What happens next, and when?",
        "Which symptoms mean we should call you straight away?"
      ],
      followUps: ["Open the appointment checklist", "What if I don't understand what the doctor told me?", "How do I make the most of an appointment?"],
      related: ["during-appointment", "not-understanding", "care-notebook"],
      sources: ["nci-families", "stjude-together"]
    },
    {
      id: "second-opinion",
      category: "ask-team",
      title: "Second opinions",
      summary: "Asking for another specialist's view, and how to do it without delaying care.",
      patterns: [
        "can we get a second opinion",
        "should we see another doctor",
        "is it rude to ask for a second opinion",
        "how do we get a second opinion"
      ],
      keywords: ["second opinion", "opinion", "different hospital", "switch hospital", "specialist review"],
      short: [
        "Asking for a **second opinion** means asking another specialist to review the diagnosis or treatment plan. Many families do this, and doctors are generally used to it. It is a normal request, not an insult.",
        "Some childhood cancers need treatment to start quickly. **Ask your team how a second opinion can be arranged without delaying important treatment.**"
      ],
      more: [
        {
          h: "Practical steps",
          list: [
            "Ask your current team for copies of reports, scan images and pathology slides or blocks if needed.",
            "Ask whether the second opinion can be done by reviewing records, without the child needing to travel.",
            "Keep your current team informed so care continues safely."
          ]
        }
      ],
      askTeam: [
        "Would a second opinion delay treatment?",
        "Can you share copies of the reports and slides?"
      ],
      followUps: ["How is treatment planned?", "How can I keep my child's medical records organised?"],
      related: ["treatment-overview", "medical-records"],
      sources: ["acs-children"]
    },

    /* ---------- Prescriptions and paperwork ---------- */
    {
      id: "prescriptions",
      category: "paperwork",
      title: "Understanding prescriptions",
      summary: "How to read a prescription, give medicines safely, and what to ask the pharmacist.",
      patterns: [
        "how do i read a prescription",
        "what does od bd tds mean",
        "my child missed a dose",
        "the pharmacy gave a different brand",
        "how do i give medicines at home",
        "what does sos mean on a prescription"
      ],
      keywords: ["prescription", "prescriptions", "medicine", "medicines", "medication", "tablet", "tablets", "syrup", "dose", "doses", "missed dose", "od", "bd", "tds", "qid", "sos", "brand", "generic", "pharmacy", "pharmacist", "chemist"],
      short: [
        "A prescription lists each medicine, how much to give, how often, and for how long. Prescriptions in hospitals often use short forms. For example, **OD** usually means once a day, **BD** twice a day, **TDS** three times a day, and **SOS** only when needed.",
        "**Give every medicine exactly as written**, and ask before changing anything. If something is unclear, ask the doctor, nurse or pharmacist to explain it before you leave."
      ],
      more: [
        {
          h: "Check each medicine",
          list: [
            "The name of the medicine (brand and generic name)",
            "What it is for",
            "How much to give, and how (tablet, syrup, injection)",
            "What time, and whether with or without food",
            "How long to continue",
            "How to store it, especially chemotherapy at home"
          ]
        },
        {
          h: "Missed doses and different brands",
          p: [
            "If a dose is missed or vomited, **do not double the next dose**. Ask the team what to do. Pharmacies sometimes give a different brand of the same medicine. Ask the pharmacist to confirm it is the same medicine and the same strength.",
            "A simple medicine chart with times and tick boxes can help everyone in the family give medicines correctly."
          ]
        }
      ],
      askTeam: [
        "What is each medicine for, and when should it be given?",
        "What should we do if a dose is missed or vomited?",
        "Can this medicine be given with food, or crushed or mixed?",
        "How should chemotherapy medicines be stored and handled at home?"
      ],
      followUps: ["What is a discharge summary?", "How can I keep track of everything?", "Are herbal remedies or supplements safe?"],
      related: ["discharge-summary", "care-notebook", "herbal-remedies"],
      sources: ["nci-chemo", "stjude-together"]
    },
    {
      id: "discharge-summary",
      category: "paperwork",
      title: "Discharge summaries and instructions",
      summary: "What a discharge summary contains and what to check before going home.",
      patterns: [
        "what is a discharge summary",
        "what do the discharge instructions mean",
        "what should we check before leaving hospital",
        "what is a discharge card",
        "we are going home tomorrow"
      ],
      keywords: ["discharge", "discharged", "discharge summary", "discharge card", "going home", "leaving hospital", "instructions", "advice on discharge"],
      short: [
        "A **discharge summary** is a document you receive when your child leaves hospital. It usually lists the diagnosis, what was done during the stay, the medicines to continue at home, and follow-up plans.",
        "**Keep every discharge summary.** Other doctors may need them later."
      ],
      more: [
        {
          h: "Before you leave, make sure you know",
          list: [
            "Which medicines to give, at what times, and for how long",
            "Which medicines have stopped",
            "What symptoms to watch for, and who to call, day and night",
            "When the next appointment or blood test is",
            "Any rules about food, activity, bathing or school"
          ]
        }
      ],
      askTeam: [
        "Can you go through the discharge summary with me?",
        "Which medicines have changed?",
        "Who should we call if there is a problem at home?"
      ],
      followUps: ["How do I read a prescription?", "What are follow-up appointments for?", "When should I call the care team urgently?"],
      related: ["prescriptions", "follow-up-appointments", "when-to-call"],
      sources: ["stjude-together"]
    },
    {
      id: "follow-up-appointments",
      category: "paperwork",
      title: "Follow-up appointments",
      summary: "Why follow-up continues during and after treatment.",
      patterns: [
        "what are follow-up appointments for",
        "why do we need follow up after treatment",
        "how often will we have check ups",
        "what happens after treatment ends",
        "do we still need to come to hospital after treatment"
      ],
      keywords: ["follow up", "follow-up", "followup", "check up", "checkup", "check-up", "after treatment", "end of treatment", "review", "surveillance"],
      short: [
        "Follow-up appointments let the team check how your child is doing, look for signs that cancer has come back, and watch for late effects of treatment. Check-ups usually become less frequent over time, but often continue for years."
      ],
      more: [
        {
          h: "Getting the most from follow-up",
          list: [
            "Keep a list of upcoming appointments and tests.",
            "Write down any new symptoms or concerns to mention.",
            "Ask for a written summary of all the treatment your child received. It is useful for any doctor in future."
          ]
        },
        {
          h: "Feelings at the end of treatment",
          p: [
            "Families often expect to feel only relief when treatment ends, and many are surprised to feel anxious too, because visits become less frequent. This is common. Talk to the team about it."
          ]
        }
      ],
      askTeam: [
        "How often will follow-up visits be, and what tests will they include?",
        "Can we have a written summary of my child's treatment?",
        "Who should we contact between visits?"
      ],
      followUps: ["What are late effects?", "How can I keep my child's medical records organised?"],
      related: ["late-effects", "medical-records"],
      sources: ["nci-late-effects", "acs-children"]
    },
    {
      id: "medical-records",
      category: "paperwork",
      title: "Keeping medical records organised",
      summary: "A simple system for reports, scans and bills.",
      patterns: [
        "how can i keep my child's medical records organised",
        "how do i organise reports",
        "what documents should i keep",
        "i keep losing reports",
        "how to store scan reports and films"
      ],
      keywords: ["records", "reports", "report", "documents", "paperwork", "file", "folder", "papers", "organise", "organize", "bills", "films", "cd", "copies"],
      short: [
        "Childhood cancer care creates a lot of paperwork. One well-organised folder makes appointments, second opinions, schemes and future care much easier."
      ],
      more: [
        {
          h: "A simple system",
          list: [
            "One folder or file, with sections: diagnosis and pathology, scans, blood reports, discharge summaries, prescriptions, bills and receipts.",
            "Put the newest papers at the front of each section.",
            "Keep scan CDs or films and reports together.",
            "Photograph important pages as a backup, and keep the photos private and secure.",
            "Keep a one-page summary at the front: diagnosis, treatment plan, main doctor, hospital ID number and emergency contact numbers."
          ]
        },
        {
          h: "Privacy",
          p: [
            "Medical records contain sensitive information. Share copies only with people who need them."
          ]
        }
      ],
      askTeam: ["Can we have copies of all reports for our records?", "Which reports are most important to keep with us?"],
      followUps: ["How can I keep track of everything?", "What is a discharge summary?", "Is there help with costs and practical problems?"],
      related: ["care-notebook", "discharge-summary", "practical-support"],
      sources: ["stjude-together"]
    },

    /* ---------- Staying organised ---------- */
    {
      id: "care-notebook",
      category: "organising",
      title: "Keeping track of appointments, medicines and symptoms",
      summary: "A care notebook or phone note that helps the whole family.",
      patterns: [
        "how can i keep track of everything",
        "how do i organise appointments",
        "how do i track symptoms",
        "too much information to remember",
        "how do i track medicines at home",
        "how to stay organised during treatment"
      ],
      keywords: ["track", "tracking", "organise", "organize", "organised", "organized", "notebook", "diary", "calendar", "remember", "schedule", "appointments", "log", "chart", "symptoms"],
      short: [
        "During treatment, families receive a lot of information. A single **care notebook**, or a note on your phone, helps you remember and share what matters, especially when different family members take turns at the hospital."
      ],
      more: [
        {
          h: "What to include",
          list: [
            "**Contacts:** the team's numbers for daytime, night and emergencies.",
            "**Calendar:** appointments, blood tests and treatment days.",
            "**Medicines chart:** each medicine, the times, and a tick when given.",
            "**Symptom log:** date, time, what you noticed (for example temperature, vomiting, pain, eating), and what you did.",
            "**Questions:** write them as they come up, and bring them to the next visit.",
            "**Notes from appointments:** what was decided and what happens next."
          ]
        }
      ],
      askTeam: ["Is there a treatment calendar you can give us?", "What should we record at home for you?"],
      followUps: ["Open the appointment checklist", "How do I make the most of an appointment?", "How can I keep my child's medical records organised?"],
      related: ["during-appointment", "medical-records", "preparing-questions"],
      sources: ["stjude-together", "nci-families"]
    },
    {
      id: "during-appointment",
      category: "organising",
      title: "Making the most of an appointment",
      summary: "Simple habits for remembering what was said and agreed.",
      patterns: [
        "how do i make the most of an appointment",
        "how do i remember what the doctor says",
        "can i record the doctor",
        "should i bring someone to the appointment",
        "i forget everything after the appointment"
      ],
      keywords: ["remember", "forget", "forgot", "notes", "note", "record", "recording", "bring someone", "appointment", "during", "teach back"],
      short: [
        "It is normal to forget much of what is said in a medical appointment, especially when stressed. A few habits help you leave with what you need."
      ],
      more: [
        {
          h: "Before",
          list: ["Write your questions down, most important first.", "Bring your folder and your list of medicines.", "Bring another adult if you can."]
        },
        {
          h: "During",
          list: [
            "Take notes, or ask the other adult to.",
            "Ask permission if you would like to record the conversation on your phone.",
            "Repeat back the main points: \"So, the plan is...\". This is sometimes called **teach-back**, and it helps catch misunderstandings.",
            "Ask for spellings of new words and medicines."
          ]
        },
        {
          h: "Before you leave",
          list: ["Check what happens next, and when.", "Check who to call with problems.", "Make sure all your top questions were answered."]
        }
      ],
      askTeam: ["Can I repeat back what I understood, to check I have it right?", "Is it all right if I record this conversation?"],
      followUps: ["What should I ask the doctor tomorrow?", "How can I keep track of everything?"],
      related: ["preparing-questions", "care-notebook", "not-understanding"],
      sources: ["nci-families"]
    }
  ]);
})(typeof window !== "undefined" ? window : globalThis);
