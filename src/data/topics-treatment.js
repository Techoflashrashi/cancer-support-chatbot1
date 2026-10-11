(function (root) {
  "use strict";
  var CSC = root.CSC;

  CSC.addTopics([
    {
      id: "treatment-overview",
      category: "treatment",
      title: "How treatment is planned",
      summary: "Care teams, treatment protocols and why every child's plan is different.",
      patterns: [
        "how is treatment decided",
        "what is a treatment protocol",
        "what is a treatment plan",
        "who is in the care team",
        "why is my child's treatment different from other children",
        "what are the treatment options",
        "what treatments might my child have"
      ],
      keywords: ["treatment", "treatments", "treatment plan", "protocol", "options", "team", "multidisciplinary", "tumor board", "plan", "decide", "decided"],
      short: [
        "Childhood cancer treatment is usually planned by a team of specialists, and is often based on a written **protocol**: a detailed plan of which treatments are given, in what order and for how long.",
        "The main treatments are **chemotherapy**, **surgery** and **radiation therapy**. Some children also receive **immunotherapy**, **targeted therapy** or a **stem cell transplant**. Many children have a combination. **No two children's plans are exactly the same**, even with the same diagnosis."
      ],
      more: [
        {
          h: "Who is in the team",
          p: [
            "A team may include pediatric oncologists, surgeons, radiation oncologists, nurses, pathologists, radiologists, dietitians, social workers, psychologists or counselors, and play or child life specialists. Many hospitals discuss complex cases at a joint meeting, sometimes called a tumor board."
          ]
        },
        {
          h: "What shapes the plan",
          list: [
            "The exact type and subtype of cancer",
            "The stage or risk group",
            "The child's age and general health",
            "How the cancer responds to the first part of treatment"
          ]
        },
        {
          h: "Changes along the way",
          p: [
            "Plans can change, for example if blood counts are low or if the cancer responds differently than expected. Only the treating team should make these changes. If you have concerns about the plan, raise them with the team rather than changing anything yourself."
          ]
        }
      ],
      askTeam: [
        "What is the overall treatment plan, and how long will it take?",
        "Can we have a written copy or calendar of the plan?",
        "Who is the main doctor responsible for my child's care?",
        "What are the goals of this treatment?"
      ],
      followUps: ["What happens during chemotherapy?", "What is radiation therapy?", "What is a clinical trial?", "Can we get a second opinion?"],
      related: ["chemotherapy", "surgery", "radiation", "clinical-trials", "second-opinion"],
      sources: ["nci-childhood", "acs-children"]
    },
    {
      id: "chemotherapy",
      category: "treatment",
      title: "Chemotherapy",
      summary: "What chemotherapy is, how it is given, and what families can expect.",
      patterns: [
        "what happens during chemotherapy",
        "what is chemotherapy",
        "what is chemo",
        "how does chemo work",
        "how is chemo given",
        "what to expect during chemo",
        "my child is starting chemo"
      ],
      keywords: ["chemotherapy", "chemo", "cycle", "cycles", "course", "drip", "iv", "infusion", "drugs", "medicines", "cytotoxic"],
      short: [
        "**Chemotherapy** (often called **chemo**) uses medicines to destroy cancer cells or stop them from growing. It is one of the most common treatments for childhood cancer.",
        "It can be given as a drip into a vein (IV), as tablets or liquid by mouth, as an injection, or into the spinal fluid. It is often given in **cycles**: a period of treatment followed by a rest period so the body can recover."
      ],
      more: [
        {
          h: "What a chemo day may look like",
          p: [
            "Your child may have a check-up and blood tests first, to make sure it is safe to go ahead. Chemo may be given in a day care unit or during a hospital stay, depending on the drugs and the plan. Many children have a **central line** or **port** so medicines can be given without repeated needles."
          ]
        },
        {
          h: "Why side effects happen",
          p: [
            "Chemo affects cells that divide quickly. Cancer cells divide quickly, but so do some healthy cells, such as those in hair, the lining of the mouth and gut, and the bone marrow. This is why side effects such as hair loss, mouth sores, nausea and low blood counts can happen. Side effects depend on the specific medicines and often improve after treatment ends.",
            "How strong the side effects are does **not** show how well the chemo is working."
          ]
        },
        {
          h: "Safety at home",
          p: [
            "Some chemo medicines are taken at home. Give them exactly as prescribed, and ask the team how to store and handle them safely. Never stop, skip or change a dose without speaking to the team."
          ]
        }
      ],
      faqs: [
        {
          id: "chemo-hurt",
          q: "Does chemotherapy hurt?",
          patterns: ["does chemo hurt", "is chemotherapy painful", "will chemo hurt my child", "does it hurt"],
          keywords: ["hurt", "pain", "painful"],
          a: [
            "Chemo itself is usually not painful as it goes in, although placing a needle or accessing a port can sting briefly. Some side effects, such as mouth sores, can be uncomfortable. Tell the team about any pain, because there are usually ways to help."
          ]
        },
        {
          id: "chemo-duration",
          q: "How long does chemotherapy last?",
          patterns: ["how long does chemo last", "how long is chemotherapy", "how many cycles", "how many months of chemo", "how long will it take"],
          keywords: ["how long", "long", "months", "years", "cycles", "duration", "last"],
          a: [
            "It varies a lot. Some plans last a few months, while others, such as many leukemia plans, continue for two years or more, with less intense treatment towards the end. The number of cycles depends on the type of cancer and the protocol. Ask the team for a calendar of your child's planned treatment."
          ]
        },
        {
          id: "chemo-delay",
          q: "Why was chemo delayed?",
          patterns: ["why was chemo delayed", "why was chemo postponed", "chemo was cancelled because of low counts", "why did they not give chemo today"],
          keywords: ["delayed", "postponed", "cancelled", "canceled", "not given", "push back"],
          a: [
            "Teams sometimes delay a dose when blood counts are low, if there is an infection, or for other safety reasons. This is a common and planned part of keeping treatment safe. Ask the team why it was delayed and what happens next. Please do not change the timing yourself."
          ]
        }
      ],
      askTeam: [
        "Which chemotherapy medicines will my child have, and how often?",
        "What side effects are most likely with these medicines?",
        "Which side effects mean we should call you straight away?",
        "Will any chemo be taken at home? How do we store and handle it safely?"
      ],
      followUps: ["Will my child lose their hair?", "How is nausea managed?", "Why is fever dangerous during chemotherapy?", "What is a port or central line?"],
      related: ["hair-loss", "nausea-vomiting", "low-counts-infection", "central-lines", "side-effects-overview"],
      sources: ["nci-chemo", "nci-side-effects"]
    },
    {
      id: "surgery",
      category: "treatment",
      title: "Surgery for childhood cancer",
      summary: "Why surgery is done, what to expect, and recovery.",
      patterns: [
        "what is cancer surgery like for children",
        "why does my child need surgery",
        "will they remove the tumor",
        "what happens before surgery",
        "how long is recovery after surgery",
        "what is resection"
      ],
      keywords: ["surgery", "operation", "operate", "surgeon", "remove", "removal", "resection", "excision", "anesthesia", "anaesthesia", "stitches", "recovery", "ot"],
      short: [
        "**Surgery** means an operation to remove a tumor, or part of it. It is most useful for **solid tumors** that are in one area. Surgery is also used to take biopsies and to place central lines.",
        "Sometimes chemotherapy is given first to shrink a tumor and make surgery safer. Sometimes surgery comes first."
      ],
      more: [
        {
          h: "Before the operation",
          list: [
            "The surgeon and anesthetist (the doctor who gives the medicine that puts your child to sleep) will explain the plan and the risks, and ask for your consent.",
            "You will be told when your child must stop eating and drinking. Follow these instructions exactly.",
            "Preparing your child in simple, honest words can help (see \"Preparing a child for procedures\")."
          ]
        },
        {
          h: "After the operation",
          p: [
            "Recovery depends on the type of surgery. The team will manage pain, and explain care of the wound, activity limits, and signs to watch for. After surgery, the removed tissue is usually checked by a pathologist, and the report helps decide what happens next."
          ]
        }
      ],
      askTeam: [
        "What exactly will the operation do?",
        "What are the main risks?",
        "How long will my child stay in hospital, and what will recovery look like?",
        "How will pain be managed?"
      ],
      followUps: ["How do I prepare my child for a procedure?", "What is a pathology report?", "What is a discharge summary?"],
      related: ["preparing-for-procedures", "pathology-report", "discharge-summary"],
      sources: ["nci-surgery"]
    },
    {
      id: "radiation",
      category: "treatment",
      title: "Radiation therapy",
      summary: "How radiation treats cancer, what sessions are like, and common questions.",
      patterns: [
        "what is radiation therapy",
        "what is radiotherapy",
        "does radiation hurt",
        "will my child be radioactive",
        "how many radiation sessions",
        "why does my child need radiation"
      ],
      keywords: ["radiation", "radiotherapy", "rt", "radiation therapy", "beam", "sessions", "fractions", "mask", "proton", "radioactive", "brachytherapy"],
      short: [
        "**Radiation therapy** (also called radiotherapy) uses high-energy rays to damage cancer cells so they stop growing and die. It is aimed carefully at the area that needs treatment.",
        "It is often given in short daily sessions, on weekdays, over several weeks. The treatment itself does not hurt, and with the usual external radiation, **your child does not become radioactive** and is safe to hug."
      ],
      more: [
        {
          h: "What sessions are like",
          p: [
            "First there is a planning visit, often with a scan, to map exactly where the radiation will go. Children need to lie very still, so younger children may need sedation or anesthesia each day. For treatment to the head, a custom mask may be made to keep the head still. Each session is usually short."
          ]
        },
        {
          h: "Side effects",
          p: [
            "Side effects depend on the part of the body treated. They can include tiredness, skin changes in the treated area, and hair loss in that area. Because children are still growing, the team plans radiation carefully and will explain possible long-term effects to watch for."
          ]
        }
      ],
      askTeam: [
        "Why is radiation recommended, and which area will be treated?",
        "How many sessions will there be?",
        "Will my child need sedation for each session?",
        "What short-term and long-term effects should we watch for?"
      ],
      followUps: ["Will my child lose their hair?", "What are late effects?", "How do I prepare my child for a procedure?"],
      related: ["hair-loss", "late-effects", "preparing-for-procedures"],
      sources: ["nci-radiation"]
    },
    {
      id: "immunotherapy",
      category: "treatment",
      title: "Immunotherapy",
      summary: "Treatments that help the immune system recognize and attack cancer.",
      patterns: [
        "what is immunotherapy",
        "how does immunotherapy work",
        "what is car t cell therapy",
        "what are monoclonal antibodies",
        "is immunotherapy better than chemo"
      ],
      keywords: ["immunotherapy", "immune", "immune system", "car t", "car-t", "monoclonal", "antibody", "antibodies", "checkpoint", "vaccine"],
      short: [
        "**Immunotherapy** helps the body's own immune system find and attack cancer cells. It includes several kinds of treatment, such as **monoclonal antibodies** (lab-made proteins that attach to cancer cells) and **CAR T-cell therapy** (where a child's own immune cells are changed in a lab to target the cancer)."
      ],
      more: [
        {
          h: "When it is used in children",
          p: [
            "In childhood cancer, immunotherapy is used for certain cancers and situations, for example some leukemias and neuroblastoma, often alongside or after other treatments. It is not suitable for every child or every cancer. Some forms are given only at specialist centres or through clinical trials.",
            "Immunotherapy is not simply \"better\" or \"gentler\" than chemotherapy. It has its own side effects, which can sometimes be serious, so the team monitors children closely."
          ]
        }
      ],
      askTeam: [
        "Is immunotherapy an option for my child's type of cancer?",
        "What side effects should we watch for?",
        "Is it available here, or would it be part of a clinical trial?"
      ],
      followUps: ["What is targeted therapy?", "What is a clinical trial?", "How is treatment planned?"],
      related: ["targeted-therapy", "clinical-trials", "treatment-overview"],
      sources: ["nci-immuno"]
    },
    {
      id: "targeted-therapy",
      category: "treatment",
      title: "Targeted therapy",
      summary: "Medicines aimed at specific features of cancer cells.",
      patterns: [
        "what is targeted therapy",
        "how does targeted therapy work",
        "what is precision medicine",
        "what is biomarker testing",
        "what is a mutation test"
      ],
      keywords: ["targeted", "targeted therapy", "precision", "precision medicine", "biomarker", "mutation", "gene test", "molecular", "inhibitor"],
      short: [
        "**Targeted therapy** uses medicines that act on specific proteins or changes that help certain cancer cells grow and spread. They are usually tablets or drips.",
        "Doctors often first test the cancer cells (sometimes called **biomarker** or molecular testing) to see whether there is a target that a medicine can act on."
      ],
      more: [
        {
          h: "In childhood cancer",
          p: [
            "Targeted therapies are used for some childhood cancers, often together with chemotherapy, and are an active area of research. Not every cancer has a known target, so this treatment is not suitable for every child. These medicines can still have side effects, such as diarrhea or effects on the liver, and are monitored by the team."
          ]
        }
      ],
      askTeam: [
        "Has my child's cancer been tested for targets that a medicine could act on?",
        "Is targeted therapy part of my child's plan?",
        "What side effects should we look out for?"
      ],
      followUps: ["What is immunotherapy?", "What is a clinical trial?", "What is a pathology report?"],
      related: ["immunotherapy", "clinical-trials", "pathology-report"],
      sources: ["nci-targeted"]
    },
    {
      id: "stem-cell-transplant",
      category: "treatment",
      title: "Stem cell and bone marrow transplant",
      summary: "What a transplant is, why it is used, and what families can expect.",
      patterns: [
        "what is a bone marrow transplant",
        "what is a stem cell transplant",
        "what is bmt",
        "who can be a donor",
        "can a sibling be a donor",
        "what is hla matching"
      ],
      keywords: ["transplant", "bmt", "stem cell", "stem cells", "donor", "hla", "match", "matching", "autologous", "allogeneic", "graft"],
      short: [
        "A **stem cell transplant** (often called a bone marrow transplant, or BMT) replaces blood-forming cells that have been destroyed by very strong cancer treatment, or that are not working properly.",
        "The stem cells can come from the child (**autologous**) or from a donor (**allogeneic**), such as a matched brother or sister, a parent, or an unrelated donor."
      ],
      more: [
        {
          h: "What it involves",
          p: [
            "A transplant usually means a long hospital stay in a specialist unit, with strict infection precautions, because the immune system is very weak for a time. Families are given detailed preparation before it begins.",
            "Donor matching uses a test called **HLA typing**. If a brother or sister is tested as a possible donor, the team will explain what this involves for them, too."
          ]
        }
      ],
      askTeam: [
        "Why is a transplant recommended for my child?",
        "What type of transplant, and who could be the donor?",
        "How long will my child be in hospital, and what support is there for the family?"
      ],
      followUps: ["Why is fever dangerous during chemotherapy?", "How do I support my other children?", "What is a clinical trial?"],
      related: ["low-counts-infection", "siblings", "inpatient-stay"],
      sources: ["nci-transplant"]
    },
    {
      id: "clinical-trials",
      category: "treatment",
      title: "Clinical trials",
      summary: "What a clinical trial is, and questions to ask before joining one.",
      patterns: [
        "what is a clinical trial",
        "should we join a clinical trial",
        "is my child a guinea pig",
        "what is a research study",
        "what does randomized mean"
      ],
      keywords: ["trial", "trials", "clinical trial", "study", "research", "randomized", "randomised", "experimental", "consent", "guinea pig"],
      short: [
        "A **clinical trial** is a research study that tests new or improved ways to treat or support people with cancer. Much of the progress in childhood cancer care has come from trials.",
        "Joining is **voluntary**. Families should get clear information, have time to ask questions, and can usually leave a trial later."
      ],
      more: [
        {
          h: "Good questions to ask",
          list: [
            "What is the trial testing, and why?",
            "What would my child's treatment be in the trial, and what would it be outside it?",
            "What are the possible benefits and risks?",
            "What extra tests or visits are involved?",
            "Who do we contact with questions?"
          ]
        },
        {
          h: "This app cannot advise on joining",
          p: [
            "Whether a trial is right for a particular child is a decision for the family with the treating team."
          ]
        }
      ],
      askTeam: [
        "Is there a clinical trial my child could join?",
        "How is the trial treatment different from standard treatment?",
        "What happens if we decide not to join, or to leave later?"
      ],
      followUps: ["How is treatment planned?", "Can we get a second opinion?", "What should I ask the doctor tomorrow?"],
      related: ["treatment-overview", "second-opinion", "preparing-questions"],
      sources: ["nci-trials"]
    }
  ]);
})(typeof window !== "undefined" ? window : globalThis);
