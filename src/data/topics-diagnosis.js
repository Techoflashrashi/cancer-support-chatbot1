(function (root) {
  "use strict";
  var CSC = root.CSC;

  CSC.addTopics([
    {
      id: "biopsy",
      category: "diagnosis",
      title: "Biopsy: what it is and why it is needed",
      summary: "Why doctors take a small sample of tissue, and what usually happens.",
      patterns: [
        "what does biopsy mean",
        "what is a biopsy",
        "why does my child need a biopsy",
        "why do they need a sample",
        "how is a biopsy done",
        "biopsy procedure for children",
        "why is a biopsy needed if they did a scan"
      ],
      keywords: ["biopsy", "biopsies", "sample", "tissue", "needle", "piece", "excisional", "incisional"],
      short: [
        "A **biopsy** means taking a small sample of tissue (or sometimes fluid) from the body so it can be examined under a microscope.",
        "Scans and blood tests can show that something is wrong, but **a biopsy is often the only way to confirm whether cancer is present** and exactly what type it is. Knowing the exact type helps the team choose the right treatment."
      ],
      more: [
        {
          h: "How it is done",
          list: [
            "**Needle biopsy:** a thin needle is used to take a small sample.",
            "**Surgical biopsy:** a surgeon removes part of the abnormal area, or all of it.",
            "**Bone marrow biopsy:** a sample is taken from inside a bone, usually the back of the hip. This is common when leukemia is suspected."
          ]
        },
        {
          h: "For children",
          p: [
            "Children are usually given sedation (medicine to make them sleepy) or general anesthesia (medicine to put them fully to sleep) so they do not feel the procedure. The team will tell you if your child needs to stop eating and drinking beforehand. Follow their instructions exactly, because they differ between hospitals and procedures."
          ]
        },
        {
          h: "What happens to the sample",
          p: [
            "A doctor called a **pathologist** examines the sample and writes a **pathology report**. Some tests on the sample take longer than others, so results may come back in parts over several days."
          ]
        }
      ],
      faqs: [
        {
          id: "biopsy-pain",
          q: "Does a biopsy hurt?",
          patterns: ["does a biopsy hurt", "will the biopsy be painful", "is biopsy painful for kids", "will it hurt"],
          keywords: ["hurt", "pain", "painful", "sore"],
          a: [
            "Children are usually given sedation or anesthesia, so they should not feel the procedure itself. The area may feel sore or bruised afterwards for a few days.",
            "Ask the team what pain relief your child can have afterwards. Do not give any medicine at home without checking with them first, because some common medicines are not suitable during cancer care."
          ]
        },
        {
          id: "biopsy-results-time",
          q: "How long do biopsy results take?",
          patterns: ["how long do biopsy results take", "when will we get the biopsy report", "how many days for biopsy result"],
          keywords: ["how long", "when", "days", "wait", "waiting", "results"],
          a: [
            "It varies. A first result may come within a few days, while special tests on the sample (such as genetic or molecular tests) can take longer. Waiting is hard. Ask the team when they expect results and how they will share them with you."
          ]
        }
      ],
      askTeam: [
        "What kind of biopsy does my child need, and why?",
        "Will my child be asleep for it? When must they stop eating and drinking?",
        "When will we get the results, and who will explain them?",
        "What should we watch for afterwards?"
      ],
      followUps: ["What is a pathology report?", "What is a bone marrow test?", "What tests are used to diagnose cancer?"],
      related: ["pathology-report", "bone-marrow-lp", "blood-tests", "scans"],
      sources: ["nci-diagnosis", "nci-pathology"]
    },
    {
      id: "blood-tests",
      category: "diagnosis",
      title: "Blood tests and blood counts",
      summary: "What a complete blood count measures, and why blood tests happen so often.",
      patterns: [
        "what is a cbc",
        "what does the blood test show",
        "why so many blood tests",
        "what is hemoglobin",
        "what are platelets",
        "what is wbc",
        "what are blood counts",
        "why do they keep checking his blood"
      ],
      keywords: ["blood test", "blood tests", "cbc", "complete blood count", "counts", "count", "hemoglobin", "hb", "platelets", "platelet", "wbc", "white cells", "neutrophils", "anc", "red cells", "blood report"],
      short: [
        "Blood tests are one of the most common tests during childhood cancer care. The most frequent one is the **complete blood count (CBC)**, which counts the different types of cells in the blood.",
        "They are repeated often because cancer, and treatments like chemotherapy, can change these counts, and the team uses them to make safe decisions about treatment."
      ],
      more: [
        {
          h: "What a CBC measures",
          list: [
            "**Hemoglobin (Hb):** carries oxygen in red blood cells. When low, this is called **anemia**, and a child may look pale or feel very tired.",
            "**White blood cells (WBC):** help fight infection. **Neutrophils** are a type of white cell. The **absolute neutrophil count (ANC)** is especially important during chemotherapy, because a low count raises the risk of serious infection.",
            "**Platelets:** help blood clot. When low, a child may bruise easily or bleed more than usual."
          ]
        },
        {
          h: "About your child's numbers",
          p: [
            "Normal ranges differ by age and by laboratory, and what counts as safe during treatment depends on your child's plan. **This app cannot interpret your child's results.** Ask the team what the numbers mean for your child and whether anything needs to change."
          ]
        },
        {
          h: "Other blood tests",
          p: [
            "Doctors may also check how well the liver and kidneys are working, salts in the blood, and sometimes substances called tumor markers. These help with diagnosis and with keeping treatment safe."
          ]
        }
      ],
      askTeam: [
        "Which blood counts are you watching most closely for my child?",
        "Are my child's counts low right now? What should we do differently at home?",
        "When is the next blood test?"
      ],
      followUps: ["What does a low neutrophil count mean?", "What is a blood transfusion?", "Why is fever dangerous during chemotherapy?"],
      related: ["low-counts-infection", "transfusions", "bone-marrow-lp"],
      sources: ["nci-diagnosis", "nci-infection"]
    },
    {
      id: "scans",
      category: "diagnosis",
      title: "Scans: X-ray, ultrasound, CT, MRI and PET",
      summary: "What each type of scan is, and how children are helped through them.",
      patterns: [
        "what is a ct scan",
        "what is an mri",
        "what is a pet scan",
        "why does my child need a scan",
        "will my child be put to sleep for the mri",
        "is the scan safe",
        "how long does an mri take"
      ],
      keywords: ["scan", "scans", "ct", "cat scan", "mri", "pet", "pet scan", "ultrasound", "sonography", "x-ray", "xray", "imaging", "contrast", "dye", "bone scan"],
      short: [
        "Scans take pictures of the inside of the body. They help doctors see where a tumor is, how big it is, whether cancer has spread, and later, how well treatment is working.",
        "Different scans show different things, so a child may need more than one type."
      ],
      more: [
        {
          h: "The main types",
          list: [
            "**X-ray:** a quick picture using a small amount of radiation.",
            "**Ultrasound:** uses sound waves, not radiation. Gel is put on the skin and a small probe is moved over it.",
            "**CT scan:** many X-ray pictures combined by a computer into detailed images.",
            "**MRI:** uses a strong magnet and radio waves, not radiation. It is noisy and takes longer, and children need to lie very still.",
            "**PET scan and other nuclear scans:** a small amount of a radioactive tracer is given, which collects in active cells and shows up on the scan."
          ]
        },
        {
          h: "Helping a child through a scan",
          p: [
            "Younger children often need sedation or anesthesia to stay still, especially for MRI. Older children may manage awake with preparation, music, or a parent nearby. Some scans use a **contrast** dye, given by drink or through a drip, to make images clearer. The team will tell you about any fasting needed."
          ]
        }
      ],
      askTeam: [
        "What is this scan looking for?",
        "Will my child need sedation, and when should they stop eating?",
        "When will we hear the results?"
      ],
      followUps: ["What is a biopsy?", "How do I prepare my child for a procedure?", "What does stage mean?"],
      related: ["biopsy", "preparing-for-procedures", "staging-risk"],
      sources: ["nci-diagnosis"]
    },
    {
      id: "bone-marrow-lp",
      category: "diagnosis",
      title: "Bone marrow tests and lumbar punctures",
      summary: "Two common procedures in leukemia and some other cancers.",
      patterns: [
        "what is a bone marrow test",
        "what is bone marrow aspiration",
        "what is a lumbar puncture",
        "what is a spinal tap",
        "why do they take fluid from the spine",
        "what is intrathecal chemo",
        "what is an lp"
      ],
      keywords: ["bone marrow", "marrow", "aspiration", "aspirate", "bma", "lumbar puncture", "lp", "spinal tap", "spinal fluid", "csf", "intrathecal", "back injection"],
      short: [
        "**Bone marrow** is the soft tissue inside bones where blood cells are made. A **bone marrow aspiration and biopsy** takes a small sample, usually from the back of the hip bone, to look for cancer cells.",
        "A **lumbar puncture (LP)**, sometimes called a spinal tap, uses a thin needle in the lower back to collect a small amount of the fluid around the brain and spinal cord."
      ],
      more: [
        {
          h: "Why they are done",
          p: [
            "These tests are very common in leukemia. They help confirm the diagnosis, check whether cancer cells have reached the spinal fluid, and later show how well treatment is working.",
            "During an LP, chemotherapy may also be given directly into the spinal fluid. This is called **intrathecal chemotherapy**."
          ]
        },
        {
          h: "What to expect",
          p: [
            "Children usually have sedation or anesthesia. Afterwards, the area may be sore. Some children get a headache after an LP. The team will tell you how long your child should lie flat, if at all, and what to watch for."
          ]
        }
      ],
      askTeam: [
        "Why is this test needed now?",
        "Will chemotherapy be given during the lumbar puncture?",
        "What should we watch for after the procedure?"
      ],
      followUps: ["What is leukemia?", "What does remission mean?", "How do I prepare my child for a procedure?"],
      related: ["leukemia", "biopsy", "preparing-for-procedures"],
      sources: ["nci-diagnosis", "nci-chemo", "nci-child-all"]
    },
    {
      id: "pathology-report",
      category: "diagnosis",
      title: "Understanding a pathology report",
      summary: "What a pathology report is, what sections it has, and how to talk it through.",
      patterns: [
        "what is a pathology report",
        "how do i read the pathology report",
        "what does the histopathology report say",
        "can you explain my child's report",
        "what does histology mean",
        "what does the report mean"
      ],
      keywords: ["pathology", "pathologist", "report", "histopathology", "hpe", "histology", "microscope", "immunohistochemistry", "ihc", "cytogenetics", "molecular", "margins", "grade"],
      short: [
        "A **pathology report** is written by a **pathologist**, a doctor who examines tissue under a microscope. It describes the biopsy or surgery sample and gives a diagnosis.",
        "Reports use very technical language and are written mainly for doctors. **Reading one alone can be confusing or frightening.** It is best to go through it with your child's team."
      ],
      more: [
        {
          h: "Sections you may see",
          list: [
            "**Specimen or sample:** where the tissue came from.",
            "**Gross description:** what the sample looked like to the eye.",
            "**Microscopic description:** what the cells looked like under the microscope.",
            "**Special tests:** such as immunohistochemistry (IHC), cytogenetics or molecular tests, which identify features of the cancer cells. These can help choose treatment.",
            "**Margins:** after surgery, whether cancer cells were found at the edge of the removed tissue.",
            "**Diagnosis or impression:** the pathologist's conclusion."
          ]
        },
        {
          h: "Getting help with a report",
          p: [
            "You can ask the team to go through the report line by line, and to tell you which parts matter most for treatment. Keep a copy in your folder. If you type a term from the report here, this app can explain what the word generally means, but not what it means for your child."
          ]
        }
      ],
      askTeam: [
        "Can you go through this report with me and explain the main findings?",
        "Are any results still pending?",
        "How do these results change the treatment plan?",
        "Can I have a copy for our records?"
      ],
      followUps: ["What does stage mean?", "What does malignant mean?", "How can I keep track of reports?"],
      related: ["biopsy", "staging-risk", "medical-records"],
      sources: ["nci-pathology"]
    },
    {
      id: "staging-risk",
      category: "diagnosis",
      title: "Stage, grade and risk group",
      summary: "How doctors describe how much cancer there is, and why it guides treatment.",
      patterns: [
        "what does stage mean",
        "what stage is it",
        "what is stage 4",
        "what is risk group",
        "what does high risk mean",
        "what does grade mean",
        "what is the difference between stage and grade"
      ],
      keywords: ["stage", "staging", "stage 1", "stage 2", "stage 3", "stage 4", "grade", "risk", "risk group", "high risk", "standard risk", "low risk", "spread", "tnm"],
      short: [
        "**Stage** describes how much cancer there is in the body and whether, or how far, it has spread. Doctors use it to plan treatment and to find suitable clinical trials.",
        "Many childhood cancers are also sorted into **risk groups**. The risk group usually decides how intensive treatment needs to be."
      ],
      more: [
        {
          h: "Stage, grade and risk are different things",
          list: [
            "**Stage:** the amount and spread of cancer. Different childhood cancers use different staging systems.",
            "**Grade:** how abnormal the cancer cells look under the microscope.",
            "**Risk group:** combines stage with other features, such as the child's age, test results on the cancer cells, and early response to treatment. Leukemias are usually described by risk group rather than stage."
          ]
        },
        {
          h: "Please keep in mind",
          p: [
            "A higher stage or risk group usually means more intensive treatment. It does not on its own tell you what will happen to your child. The team can explain what your child's stage or risk group means for their plan."
          ]
        }
      ],
      askTeam: [
        "What is my child's stage or risk group?",
        "How does that affect the treatment plan?",
        "Could the risk group change during treatment?"
      ],
      followUps: ["What is a treatment protocol?", "What is a clinical trial?", "What does remission mean?"],
      related: ["treatment-overview", "pathology-report", "clinical-trials"],
      sources: ["nci-staging"]
    }
  ]);
})(typeof window !== "undefined" ? window : globalThis);
