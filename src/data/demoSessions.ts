// Demo sessions data for the View sessions panel

export interface DemoGeneratedNote {
  template: string;
  sections: {
    name: string;
    content: string;
  }[];
}

export interface DemoAdditionalNote {
  type: string;
  title: string;
  content: string;
}

export interface DemoSession {
  id: string;
  title: string;
  patientName?: string;
  patientDetails?: string;
  createdAt: Date;
  time: string;
  status: 'draft' | 'complete';
  visitType: string;
  transcript: string;
  medicalContext: string;
  selectedTemplate: string;
  generatedNote: DemoGeneratedNote | null;
  additionalNotes?: DemoAdditionalNote[];
  recordingDuration: number;
}

export const demoSessionsWithContent: DemoSession[] = [
  {
    id: "1",
    title: "Untitled session",
    createdAt: new Date("2025-11-28T17:48:00"),
    time: "5:48PM",
    status: "draft",
    visitType: "in-person",
    transcript: "",
    medicalContext: "",
    selectedTemplate: "SOAP Note (Standard)",
    generatedNote: null,
    recordingDuration: 0
  },
  {
    id: "2",
    title: "Unknown Session",
    createdAt: new Date("2025-11-27T17:36:00"),
    time: "5:36PM",
    status: "complete",
    visitType: "in-person",
    transcript:
      "And as you can see, like it doesn't really tell you the dictation or anything like that, right? But when I stop it,",
    medicalContext: "",
    selectedTemplate: "SOAP Note (Standard)",
    generatedNote: {
      template: "SOAP Note (Standard)",
      sections: [
        {
          name: "Subjective",
          content:
            "As you can see, it doesn't really tell you the dictation or anything like that. But when I stop it.."
        },
        { name: "Objective", content: "Not Provided" },
        { name: "Assessment", content: "Not Provided" },
        { name: "Plan", content: "Not Provided" }
      ]
    },
    additionalNotes: [
      {
        type: "custom",
        title: "Infection Risks.",
        content: "..."
      }
    ],
    recordingDuration: 11
  },
  {
    id: "3",
    title: "Test Patient",
    patientName: "Test Patient",
    patientDetails: "Fertility Care Perspective",
    createdAt: new Date("2025-11-26T02:59:00"),
    time: "2:59AM",
    status: "complete",
    visitType: "in-person",
    transcript:
      "Within this patient came to me to see uh um me from a fertility care perspective uh not a good diagnosis. They were rude to me. I was not good to them. blah. Let's see how well you did on the dictation.",
    medicalContext: "",
    selectedTemplate: "My Dictation",
    generatedNote: {
      template: "My Dictation",
      sections: [
        {
          name: "Dictation",
          content:
            "This patient came to see me from a fertility care perspective. Not a good diagnosis. They were rude to me. I was not good to them."
        }
      ]
    },
    additionalNotes: [
      {
        type: "letter_to_gp",
        title: "Letter to GP",
        content: `GP Address

Dear Doctor

Re: Test Patient, DOB: [DOB]

This patient presented to me from a fertility care perspective.

The patient presented for fertility care and received a poor diagnosis.

On examination,

During the consultation, we discussed the diagnosis.`
      }
    ],
    recordingDuration: 22
  },
  {
    id: "4",
    title: "Sarah Johnson - Headache Consult",
    patientName: "Sarah Johnson",
    createdAt: new Date("2025-11-28T17:37:00"),
    time: "5:37PM",
    status: "complete",
    visitType: "in-person",
    transcript: `Doctor: Good morning Mrs. Johnson. How are you feeling today?

Patient: Good morning doctor. I've been having some headaches for the past week, and I'm feeling quite tired all the time.

Doctor: I see. Can you describe the headaches? Where exactly do you feel the pain?

Patient: It's mainly on the right side of my head, behind my eye. It gets worse in the afternoon.

Doctor: How would you rate the pain on a scale of 1 to 10?

Patient: About a 6 or 7. It's quite uncomfortable.

Doctor: Are you experiencing any other symptoms? Nausea, sensitivity to light?

Patient: Yes, actually. Bright lights do bother me when the headache is bad.

Doctor: Have you been under any stress lately?

Patient: Yes, work has been very demanding. I've also not been sleeping well.

Doctor: Based on what you're describing, this sounds like tension headaches, possibly with some migraine features. I'd like to check your blood pressure and do a quick neurological exam. I'll also recommend some lifestyle changes and possibly prescribe medication if needed.`,
    medicalContext:
      "Patient: Sarah Johnson, 42yoF. PMH: Hypertension (controlled), Anxiety. Current meds: Lisinopril 10mg daily, Sertraline 50mg daily. Vitals: BP 128/82, HR 76, Temp 98.6F. Allergies: Penicillin.",
    selectedTemplate: "SOAP Note (Standard)",
    generatedNote: {
      template: "SOAP Note (Standard)",
      sections: [
        {
          name: "Subjective",
          content:
            "Patient is a 42-year-old female presenting with complaints of headaches for the past week. She describes the pain as right-sided, located behind the eye, rated 6-7/10 in intensity. The headaches worsen in the afternoon. She reports associated photophobia during episodes. Patient notes increased work stress and poor sleep quality recently."
        },
        {
          name: "Objective",
          content:
            "Vitals: BP 128/82 mmHg, HR 76 bpm, Temp 98.6°F\nGeneral: Alert and oriented, appears mildly uncomfortable\nHEENT: Normocephalic, atraumatic. Pupils equal, round, reactive to light.\nNeurological: Cranial nerves II-XII intact. No focal deficits."
        },
        {
          name: "Assessment",
          content:
            "1. Tension-type headache with migrainous features\n2. Work-related stress\n3. Insomnia, likely secondary to stress"
        },
        {
          name: "Plan",
          content:
            "1. Start Sumatriptan 50mg PO PRN for acute headache episodes\n2. Lifestyle modifications: regular sleep schedule, stress management, adequate hydration\n3. Return to clinic in 2 weeks for follow-up\n4. Patient to keep headache diary"
        }
      ]
    },
    recordingDuration: 185
  }
];

// Helper to get formatted note content from a demo session
export function getFormattedNoteContent(session: DemoSession): string {
  if (!session.generatedNote) return '';
  
  return session.generatedNote.sections
    .map(section => `**${section.name}:**\n${section.content}`)
    .join('\n\n');
}
