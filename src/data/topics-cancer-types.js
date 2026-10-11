(function (root) {
  "use strict";
  var CSC = root.CSC;

  var TYPE_NOTE = "This is a general overview. Each type has subtypes that are treated differently, so the exact diagnosis matters. Your child's team can explain your child's specific type.";

  CSC.addTopics([
    {
      id: "childhood-cancers-overview",
      category: "cancer-types",
      title: "The most common childhood cancers",
      summary: "An overview of the main types and how they differ from one another.",
      patterns: [
        "what are the most common childhood cancers",
        "types of childhood cancer",
        "what kinds of cancer do children get",
        "how are childhood cancers different from each other",
        "which cancers affect children"
      ],
      keywords: ["types", "type", "kinds", "common", "childhood cancers", "list", "most common"],
      short: [
        "Childhood cancers are a group of many different diseases. In children, the most common are **leukemias** (blood cancers), **brain and spinal cord tumors**, and **lymphomas**. Other cancers mainly seen in young children include **neuroblastoma**, **Wilms tumor** (kidney) and **retinoblastoma** (eye). Bone cancers and some lymphomas are more common in teenagers."
      ],
      more: [
        {
          h: "Two broad groups",
          list: [
            "**Blood cancers** such as leukemia start in the bone marrow and blood. They usually do not form a single lump and are mainly treated with chemotherapy.",
            "**Solid tumors** form a mass in one part of the body, such as the brain, kidney, bone or muscle. They are often treated with a combination of surgery, chemotherapy and sometimes radiation."
          ]
        },
        {
          h: "Why the exact type matters",
          p: [
            "Each type, and often each subtype, has its own treatment approach and outlook. Two children with \"leukemia\" may have quite different plans. With timely diagnosis and treatment, many childhood cancers can be cured, but outcomes differ widely between types and depend on access to care."
          ]
        }
      ],
      askTeam: [
        "What is the exact type and subtype of my child's cancer?",
        "How common is this type at this hospital? How much experience does the team have with it?"
      ],
      followUps: ["What is leukemia?", "What are brain tumors?", "What is lymphoma?", "What is neuroblastoma or Wilms tumor?", "What are bone and soft tissue sarcomas?"],
      related: ["leukemia", "brain-tumors", "lymphoma", "young-child-solid-tumors", "sarcomas"],
      sources: ["nci-childhood", "who-childhood", "acs-children"]
    },
    {
      id: "leukemia",
      category: "cancer-types",
      title: "Leukemia",
      summary: "Cancer of the blood and bone marrow, the most common childhood cancer.",
      patterns: [
        "what is leukemia",
        "what is blood cancer",
        "what is acute lymphoblastic leukemia",
        "what is aml",
        "difference between all and aml",
        "how is leukemia treated in children",
        "how long is leukemia treatment"
      ],
      keywords: ["leukemia", "leukaemia", "blood cancer", "all", "aml", "lymphoblastic", "myeloid", "acute", "blasts", "maintenance", "induction", "consolidation"],
      short: [
        "**Leukemia** is a cancer of the blood-forming cells in the bone marrow. Abnormal white blood cells, often called **blasts**, build up and crowd out healthy cells. This can cause tiredness, paleness, infections, bruising or bleeding, and bone pain.",
        "It is the most common cancer in children. The two main types are **acute lymphoblastic leukemia (ALL)**, which is the most common, and **acute myeloid leukemia (AML)**."
      ],
      more: [
        {
          h: "How it is usually treated",
          p: [
            "Leukemia is mainly treated with **chemotherapy**, often given in phases. Names such as **induction**, **consolidation** and **maintenance** describe these phases. Treatment for ALL commonly continues for a long time, often around two years or more, much of it as tablets at home during maintenance. AML treatment is usually shorter but more intensive. Some children need a stem cell transplant, targeted therapy or immunotherapy.",
            "The exact plan depends on the subtype, test results on the leukemia cells, and how well the child responds early in treatment."
          ]
        },
        { h: "Please keep in mind", p: [TYPE_NOTE] }
      ],
      askTeam: [
        "Which type of leukemia does my child have, and what risk group?",
        "What are the phases of treatment and how long will each last?",
        "How will you check how well treatment is working?"
      ],
      followUps: ["What happens during chemotherapy?", "What is a bone marrow test?", "What does remission mean?"],
      related: ["chemotherapy", "bone-marrow-lp", "remission-relapse", "stem-cell-transplant"],
      sources: ["nci-child-all", "nci-childhood", "acs-children"]
    },
    {
      id: "brain-tumors",
      category: "cancer-types",
      title: "Brain and spinal cord tumors",
      summary: "The second most common group of childhood cancers.",
      patterns: [
        "what is a brain tumor",
        "my child has a brain tumour",
        "what is medulloblastoma",
        "what is glioma",
        "how are brain tumors treated in children",
        "what is a cns tumor"
      ],
      keywords: ["brain", "brain tumor", "brain tumour", "spinal cord", "cns", "medulloblastoma", "glioma", "astrocytoma", "ependymoma", "neurosurgery", "head", "shunt"],
      short: [
        "Brain and spinal cord tumors (also called **central nervous system or CNS tumors**) are the second most common group of cancers in children. There are many types, such as gliomas and medulloblastoma, and some are not cancerous but still need treatment because of where they are.",
        "Symptoms depend on where the tumor is, and can include headaches, vomiting, balance problems, changes in vision, or seizures."
      ],
      more: [
        {
          h: "How they are usually treated",
          p: [
            "Treatment often starts with **surgery** by a neurosurgeon, if the tumor can be safely removed. Some children then have **chemotherapy**, **radiation therapy**, or both. Treatment depends a lot on the tumor type, its location, and the child's age. Radiation is used carefully in very young children because the brain is still developing.",
            "Many children also work with rehabilitation teams, such as physiotherapists, occupational therapists or speech therapists, during or after treatment."
          ]
        },
        { h: "Please keep in mind", p: [TYPE_NOTE] }
      ],
      askTeam: [
        "What type of brain tumor is it, and where exactly is it?",
        "Can it be removed with surgery? What are the risks?",
        "Will my child need rehabilitation or school support afterwards?"
      ],
      followUps: ["What is cancer surgery like for children?", "What is radiation therapy?", "What are late effects?"],
      related: ["surgery", "radiation", "late-effects", "school"],
      sources: ["nci-childhood", "acs-children"]
    },
    {
      id: "lymphoma",
      category: "cancer-types",
      title: "Lymphoma",
      summary: "Cancer of the lymph system, more common in older children and teenagers.",
      patterns: [
        "what is lymphoma",
        "what is hodgkin lymphoma",
        "what is non hodgkin lymphoma",
        "what are lymph nodes",
        "swollen glands cancer"
      ],
      keywords: ["lymphoma", "hodgkin", "hodgkins", "non hodgkin", "nhl", "lymph", "lymph node", "lymph nodes", "glands", "burkitt"],
      short: [
        "**Lymphoma** is a cancer that starts in **lymphocytes**, a type of white blood cell found in the lymph system. The lymph system includes lymph nodes (sometimes called glands) in the neck, armpits, chest, tummy and elsewhere.",
        "There are two main groups: **Hodgkin lymphoma**, more common in teenagers, and **non-Hodgkin lymphoma**, which includes several types that can grow quickly."
      ],
      more: [
        {
          h: "How it is usually treated",
          p: [
            "Lymphoma is mainly treated with **chemotherapy**. Some children also receive radiation therapy, immunotherapy or targeted therapy, depending on the type and stage."
          ]
        },
        { h: "Please keep in mind", p: [TYPE_NOTE] }
      ],
      askTeam: [
        "Which type of lymphoma does my child have?",
        "Which areas of the body are involved?",
        "What does the treatment plan involve?"
      ],
      followUps: ["What happens during chemotherapy?", "What is immunotherapy?", "What does stage mean?"],
      related: ["chemotherapy", "immunotherapy", "staging-risk"],
      sources: ["nci-childhood", "acs-children"]
    },
    {
      id: "young-child-solid-tumors",
      category: "cancer-types",
      title: "Neuroblastoma, Wilms tumor and retinoblastoma",
      summary: "Solid tumors seen mostly in babies and young children.",
      patterns: [
        "what is neuroblastoma",
        "what is wilms tumor",
        "what is a kidney tumor in children",
        "what is retinoblastoma",
        "what is eye cancer in children",
        "what is hepatoblastoma"
      ],
      keywords: ["neuroblastoma", "wilms", "nephroblastoma", "kidney", "retinoblastoma", "eye", "retina", "hepatoblastoma", "liver", "adrenal"],
      short: [
        "These solid tumors are seen mostly in babies and young children:",
        "**Neuroblastoma** starts in early nerve cells, often in the adrenal glands above the kidneys. **Wilms tumor** (also called nephroblastoma) is a kidney cancer, most often found in children aged about 2 to 5. **Retinoblastoma** is a cancer of the retina at the back of the eye. **Hepatoblastoma** is a rare liver cancer of young children."
      ],
      more: [
        {
          h: "How they are usually treated",
          p: [
            "Treatment depends on the type, stage and risk group. It often involves a combination of **surgery** and **chemotherapy**, and sometimes radiation therapy. Some children with neuroblastoma receive immunotherapy or a stem cell transplant. Retinoblastoma care focuses on treating the cancer and, wherever possible, protecting vision.",
            "Some of these cancers can be linked to inherited gene changes, so the team may suggest genetic counseling."
          ]
        },
        { h: "Please keep in mind", p: [TYPE_NOTE] }
      ],
      askTeam: [
        "What stage or risk group is my child's tumor?",
        "Will surgery be needed, and when?",
        "Should our family see a genetic counselor?"
      ],
      followUps: ["What does stage mean?", "What is cancer surgery like for children?", "Why did this happen to my child?"],
      related: ["staging-risk", "surgery", "why-did-this-happen"],
      sources: ["nci-wilms", "nci-neuroblastoma", "acs-children", "who-childhood"]
    },
    {
      id: "sarcomas",
      category: "cancer-types",
      title: "Bone and soft tissue sarcomas",
      summary: "Osteosarcoma, Ewing sarcoma and rhabdomyosarcoma.",
      patterns: [
        "what is bone cancer",
        "what is osteosarcoma",
        "what is ewing sarcoma",
        "what is rhabdomyosarcoma",
        "what is a sarcoma",
        "will my child lose a leg"
      ],
      keywords: ["sarcoma", "bone cancer", "bone", "osteosarcoma", "ewing", "ewings", "rhabdomyosarcoma", "rms", "muscle", "soft tissue", "limb", "leg", "arm", "amputation", "limb salvage"],
      short: [
        "**Sarcomas** are cancers of bone or soft tissue such as muscle. **Osteosarcoma** and **Ewing sarcoma** are the main bone cancers and are more common in teenagers. **Rhabdomyosarcoma** is a soft tissue cancer that develops from cells that normally form muscle and can occur in many parts of the body."
      ],
      more: [
        {
          h: "How they are usually treated",
          p: [
            "Treatment usually combines **chemotherapy** with **surgery** and, for some types, **radiation therapy**. For bone tumors in the arm or leg, surgeons often try to remove the tumor while saving the limb (sometimes called limb-sparing surgery). Whether this is possible depends on the tumor's size and location. Physiotherapy is often an important part of recovery."
          ]
        },
        { h: "Please keep in mind", p: [TYPE_NOTE] }
      ],
      askTeam: [
        "Which type of sarcoma is it and where is it?",
        "What kind of surgery is planned and what will recovery involve?",
        "Will my child need physiotherapy or rehabilitation?"
      ],
      followUps: ["What is cancer surgery like for children?", "What happens during chemotherapy?", "What is radiation therapy?"],
      related: ["surgery", "chemotherapy", "radiation"],
      sources: ["acs-children", "nci-childhood"]
    }
  ]);
})(typeof window !== "undefined" ? window : globalThis);
