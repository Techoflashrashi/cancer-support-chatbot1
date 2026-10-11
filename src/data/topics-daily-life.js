(function (root) {
  "use strict";
  var CSC = root.CSC;

  CSC.addTopics([
    {
      id: "nutrition",
      category: "daily-life",
      title: "Eating and drinking during treatment",
      summary: "Why nutrition matters, and ideas when appetite is low.",
      patterns: [
        "what should my child eat during treatment",
        "my child is not eating",
        "my child has no appetite",
        "what food is good during chemo",
        "how to help my child gain weight",
        "how much water should my child drink",
        "special diet for cancer"
      ],
      keywords: ["eat", "eating", "food", "foods", "diet", "nutrition", "appetite", "hungry", "weight", "drink", "drinking", "water", "fluids", "hydration", "dietitian", "dietician", "khana", "taste"],
      short: [
        "Good nutrition helps children cope with treatment, heal and keep up their strength. But treatment can change appetite and taste, and cause sickness or mouth sores, so eating well is often hard. **The aim is enough food and fluids, not a perfect diet.**",
        "There is no special food that cures cancer. Ask to see the hospital's dietitian for advice that fits your child."
      ],
      more: [
        {
          h: "When appetite is low",
          list: [
            "Offer small meals and snacks often, rather than three large meals.",
            "Include familiar home foods your child enjoys, made fresh and well cooked.",
            "Add energy and protein where possible, for example dal, paneer, eggs, milk, curd, nut pastes or ghee, if the team agrees.",
            "Keep drinks available through the day. Ask the team how much your child should drink, especially around chemotherapy.",
            "Do not force food or turn meals into a battle. Praise small successes."
          ]
        },
        {
          h: "When to ask for help",
          p: [
            "Tell the team if your child is losing weight, is eating or drinking very little, or cannot swallow. Some children need extra nutrition support, such as special drinks or a feeding tube for a time. This is common and is there to help."
          ]
        }
      ],
      askTeam: [
        "Can we see a dietitian?",
        "Are there any foods or drinks my child should avoid during treatment?",
        "How much should my child drink each day?",
        "What should we do if my child stops eating?"
      ],
      followUps: ["What food is safe during treatment?", "Are herbal remedies or supplements safe?", "How is nausea managed?"],
      related: ["food-safety", "herbal-remedies", "nausea-vomiting", "mouth-sores"],
      sources: ["nci-nutrition"]
    },
    {
      id: "food-safety",
      category: "daily-life",
      title: "Food safety and hygiene at home",
      summary: "Simple habits that lower infection risk when immunity is low.",
      patterns: [
        "what food is safe during treatment",
        "can my child eat outside food",
        "can my child eat street food",
        "is raw fruit safe during chemo",
        "how do we keep the house clean during treatment",
        "can we keep pets during chemo"
      ],
      keywords: ["food safety", "safe food", "outside food", "street food", "raw", "salad", "fruit", "hygiene", "clean", "cleaning", "germs", "boiled water", "pets", "hand washing", "handwashing"],
      short: [
        "When treatment weakens the immune system, germs in food and water can cause serious infections. Simple kitchen and hygiene habits lower this risk. Hospitals give different advice, so **follow your team's specific food rules**."
      ],
      more: [
        {
          h: "Common food safety habits",
          list: [
            "Wash hands before preparing food and before eating.",
            "Use safe drinking water, such as boiled and cooled, or filtered water, as advised.",
            "Cook food thoroughly and serve it fresh and hot. Store leftovers in the fridge and reheat well, or avoid them if advised.",
            "Wash fruit and vegetables well. Your team may suggest fruit that can be peeled.",
            "Avoid street food, unpasteurized milk, and raw or undercooked eggs, meat or fish, unless the team says otherwise."
          ]
        },
        {
          h: "Around the home",
          list: [
            "Ask visitors who are unwell to stay away.",
            "Ask the team about pets, gardening and soil, and crowded places."
          ]
        }
      ],
      askTeam: [
        "What food rules should we follow, and for how long?",
        "Is our drinking water safe, or should we boil or filter it?",
        "Can my child be around pets?"
      ],
      followUps: ["Why is fever dangerous during chemotherapy?", "What should my child eat during treatment?"],
      related: ["low-counts-infection", "nutrition"],
      sources: ["nci-nutrition", "nci-infection"]
    },
    {
      id: "rest-activity",
      category: "daily-life",
      title: "Rest, sleep and activity",
      summary: "Balancing rest with play and movement during treatment.",
      patterns: [
        "how much rest and activity is right during treatment",
        "can my child play outside",
        "can my child play sports during treatment",
        "my child can't sleep",
        "can my child exercise during chemo"
      ],
      keywords: ["rest", "sleep", "sleeping", "activity", "exercise", "play", "playing", "sports", "outside", "routine", "insomnia", "swimming"],
      short: [
        "Children need extra rest during treatment, but gentle activity and play also help energy, mood and sleep. A good balance usually looks like **short periods of activity with rest in between**, adjusted to how your child feels each day."
      ],
      more: [
        {
          h: "Ideas",
          list: [
            "Keep regular bedtimes and wake-up times where you can.",
            "Short naps can help, but long daytime sleeps may affect night sleep.",
            "Choose calm activities on low-energy days: puzzles, drawing, stories, board games.",
            "Ask the team before contact sports, swimming, or crowded places, especially if platelets or white cells are low, or if your child has a central line."
          ]
        }
      ],
      askTeam: [
        "What activities are safe for my child right now?",
        "Can my child go swimming or play sports with a central line?",
        "What can we do if my child is not sleeping well?"
      ],
      followUps: ["Why is my child always tired?", "Can my child go to school during treatment?"],
      related: ["fatigue", "school"],
      sources: ["nci-fatigue", "stjude-together"]
    },
    {
      id: "school",
      category: "daily-life",
      title: "School and studies during treatment",
      summary: "Keeping learning going, talking to the school, and returning to class.",
      patterns: [
        "can my child go to school during treatment",
        "what do i tell my child's school",
        "my child is missing exams",
        "how will my child keep up with studies",
        "going back to school after cancer"
      ],
      keywords: ["school", "class", "classes", "teacher", "teachers", "studies", "study", "exams", "exam", "homework", "college", "board exams", "classmates", "return"],
      short: [
        "School is an important part of normal life for children, and many continue some learning during treatment. Whether and when your child can attend in person depends on their treatment and blood counts, so **ask the team before your child goes back**."
      ],
      more: [
        {
          h: "Working with the school",
          list: [
            "Let the school know about the diagnosis and treatment, sharing only what you and your child are comfortable with.",
            "Ask about flexible attendance, home learning, extra time, or help with exams.",
            "Ask the school to tell you about infections in class, such as chickenpox or measles, because these can be serious during treatment.",
            "Some hospitals have teachers or education programmes for children having long treatment. Ask whether yours does."
          ]
        },
        {
          h: "Returning to class",
          p: [
            "Children may worry about how classmates will react to hair loss or missed time. Planning with the teacher what to say, with your child's agreement, can help. After some treatments, children may have learning or concentration difficulties. Tell the team if you notice these."
          ]
        }
      ],
      askTeam: [
        "When is it safe for my child to go back to school?",
        "Which infections at school should we tell you about?",
        "Can the hospital provide a letter for the school?"
      ],
      followUps: ["How can teens cope with treatment?", "How do I tell family and friends?", "What are late effects?"],
      related: ["for-teens", "telling-others", "late-effects"],
      sources: ["acs-children", "stjude-together"]
    },
    {
      id: "emotional-wellbeing-child",
      category: "daily-life",
      title: "Supporting your child's feelings",
      summary: "Common emotional reactions in children, and ways to help them cope.",
      patterns: [
        "how do i support my child's feelings",
        "my child is sad all the time",
        "my child is angry",
        "my child is scared of dying",
        "my child won't talk about their feelings",
        "how do i help my child cope emotionally"
      ],
      keywords: ["feelings", "emotions", "emotional", "sad", "sadness", "angry", "anger", "scared", "fear", "worried", "anxious", "anxiety", "cope", "coping", "withdrawn", "quiet", "play therapy", "psychologist"],
      short: [
        "Children react to cancer and treatment in many ways. They may feel scared, sad, angry, bored, or act younger than their age for a while. These reactions are common. **Listening, being honest, and keeping some normal routines** can help a lot."
      ],
      more: [
        {
          h: "Ways to help",
          list: [
            "Let your child know all feelings are allowed, and that they can always ask you questions.",
            "Answer questions honestly, in simple words. It is okay to say \"I don't know, but we can ask the doctor together.\"",
            "Use play, drawing or stories, especially with younger children, who may show feelings through play rather than words.",
            "Keep usual rules and routines where possible. They help children feel safe.",
            "Give choices, so your child feels some control: what to wear, which game to play, which arm for a blood test."
          ]
        },
        {
          h: "When to ask for more help",
          p: [
            "Ask the team for a counselor, psychologist or child life specialist if your child seems very withdrawn or anxious for a long time, stops enjoying things they used to like, has trouble sleeping or eating because of worry, or talks about not wanting to live. Children's cancer services often have this support."
          ]
        }
      ],
      askTeam: [
        "Is there a psychologist, counselor or child life specialist we can see?",
        "How can we answer our child's difficult questions?"
      ],
      followUps: ["How do I explain cancer to my younger child?", "How can teens cope with treatment?", "How do I look after myself?"],
      related: ["talking-to-child", "for-teens", "caring-for-yourself"],
      sources: ["nci-families", "nci-feelings", "stjude-together"]
    },
    {
      id: "caring-for-yourself",
      category: "daily-life",
      title: "Looking after yourself as a parent or caregiver",
      summary: "Why your wellbeing matters, and ways to get support.",
      patterns: [
        "how do i look after myself",
        "i am exhausted as a parent",
        "i can't cope",
        "i feel so alone",
        "who supports the parents",
        "i am scared and overwhelmed",
        "i keep crying"
      ],
      keywords: ["myself", "parent", "parents", "caregiver", "carer", "mother", "father", "mom", "mum", "dad", "exhausted", "alone", "lonely", "stress", "stressed", "cope", "coping", "support group", "crying", "depressed"],
      short: [
        "Caring for a child with cancer is exhausting, physically and emotionally. Fear, sadness, anger and tiredness are common. **Looking after yourself is not selfish.** It helps you keep going for your child."
      ],
      more: [
        {
          h: "Small things that help",
          list: [
            "Accept practical help with meals, travel, siblings or hospital shifts. Be specific when people offer.",
            "Take short breaks, even ten minutes outside the ward.",
            "Eat, drink water and sleep when you can.",
            "Talk to someone: a partner, friend, relative, faith leader, or another parent at the hospital.",
            "Ask the hospital about social workers, counselors and parent support groups."
          ]
        },
        {
          h: "If you are struggling",
          p: [
            "If you feel unable to cope, hopeless, or your mood is affecting daily life, please speak to a doctor, counselor or the hospital social worker. In India, the national Tele-MANAS mental health helpline is available on 14416. If you are thinking of harming yourself, contact emergency services (112 in India) or go to the nearest emergency department."
          ]
        }
      ],
      askTeam: [
        "Is there a social worker or counselor for parents?",
        "Are there parent support groups here?",
        "Is there help with travel, accommodation or costs?"
      ],
      followUps: ["Is there help with costs and practical problems?", "How can I support my other children?", "How do I tell family and friends?"],
      related: ["practical-support", "siblings", "telling-others"],
      sources: ["nci-families", "nci-feelings"]
    },
    {
      id: "practical-support",
      category: "daily-life",
      title: "Costs, travel and practical help",
      summary: "Where families can ask about financial and practical support.",
      patterns: [
        "is there help with costs and practical problems",
        "we can't afford treatment",
        "how do we pay for treatment",
        "where can we stay near the hospital",
        "financial help for cancer treatment",
        "we live far from the hospital"
      ],
      keywords: ["cost", "costs", "money", "afford", "pay", "payment", "expensive", "financial", "funds", "charity", "ngo", "insurance", "scheme", "accommodation", "stay", "travel", "dharamshala", "far"],
      short: [
        "Treatment can bring costs for travel, accommodation, food, medicines and time away from work. Many hospitals have **social workers or a patient help desk** who know about financial assistance, government health schemes, charities and accommodation options for families. **Please ask early.** Do not stop or delay treatment because of costs without first speaking to the team."
      ],
      more: [
        {
          h: "Things to ask about",
          list: [
            "Government health schemes or insurance your family may be eligible for",
            "Charities and non-profit organisations that support children with cancer",
            "Low-cost places to stay near the hospital",
            "Travel concessions",
            "Letters for employers or schools"
          ]
        },
        {
          h: "Keep copies",
          p: [
            "Schemes and charities often need copies of reports, bills and prescriptions. Keeping these in one folder makes applications easier."
          ]
        }
      ],
      askTeam: [
        "Who can help us with costs and financial assistance?",
        "Are there places for families to stay near the hospital?",
        "Which documents do we need for schemes or charities?"
      ],
      followUps: ["How can I keep my child's medical records organised?", "How do I look after myself?"],
      related: ["medical-records", "caring-for-yourself"],
      sources: ["tmc-home", "acs-children"]
    },
    {
      id: "herbal-remedies",
      category: "daily-life",
      title: "Herbal remedies, supplements and home remedies",
      summary: "Why to check with the team before using any herbal, Ayurvedic or homeopathic product.",
      patterns: [
        "are herbal remedies or supplements safe",
        "can we give ayurvedic medicine",
        "can we give homeopathy",
        "can my child take vitamins",
        "is turmeric good for cancer",
        "can we give giloy",
        "home remedies for chemo side effects"
      ],
      keywords: ["herbal", "herbs", "ayurveda", "ayurvedic", "homeopathy", "homeopathic", "unani", "siddha", "supplement", "supplements", "vitamin", "vitamins", "turmeric", "haldi", "giloy", "tulsi", "kadha", "natural", "home remedy", "home remedies", "alternative"],
      short: [
        "Many families want to use herbal, Ayurvedic, homeopathic or home remedies alongside treatment. This is understandable. However, **some herbs, supplements and vitamins can interact with cancer medicines**, affect the liver or blood, or be contaminated.",
        "**Tell the team about anything you are giving or thinking of giving**, including teas, powders, oils and vitamins, before you start. No herbal or alternative remedy has been shown to replace proven cancer treatment."
      ],
      more: [
        {
          h: "A respectful conversation",
          p: [
            "You can raise this openly with the team. It helps to bring the product or a photo of its label. The team can tell you whether it is likely to be safe, and if something is not suitable, may suggest safer ways to support your child's comfort."
          ]
        }
      ],
      askTeam: [
        "Is it safe for my child to take this product? (Bring the label.)",
        "Are there any foods, herbs or vitamins we should avoid during treatment?"
      ],
      followUps: ["What should my child eat during treatment?", "How do I read a prescription?"],
      related: ["nutrition", "prescriptions"],
      sources: ["nci-nutrition"]
    }
  ]);
})(typeof window !== "undefined" ? window : globalThis);
