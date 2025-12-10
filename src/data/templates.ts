// Template definitions for the application

export interface TemplateSection {
  name: string;
  content: string;
  placeholder?: string;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  type: 'Note' | 'Document';
  sections: TemplateSection[];
  content?: string; // For flat content format (like Letter to GP)
}

export interface TemplateListItem {
  id: string;
  name: string;
  type: 'Note' | 'Document';
  icon: string;
}

// 1. SOAP Note (Standard) Template
export const soapNoteTemplate: TemplateDefinition = {
  id: "soap-standard",
  name: "SOAP Note (Standard)",
  type: "Note",
  sections: [
    { name: "Subjective", content: "", placeholder: "Not Provided" },
    { name: "Objective", content: "", placeholder: "Not Provided" },
    { name: "Assessment", content: "", placeholder: "Not Provided" },
    { name: "Plan", content: "", placeholder: "Not Provided" }
  ]
};

// Example with generated content (for demo / seeding only)
export const soapNoteWithContent: TemplateDefinition = {
  id: "soap-standard",
  name: "SOAP Note (Standard)",
  type: "Note",
  sections: [
    {
      name: "Subjective",
      content:
        "Patient is a 42-year-old female presenting with complaints of headaches for the past week. She describes the pain as right-sided, located behind the eye, rated 6-7/10 in intensity. The headaches worsen in the afternoon. She reports associated photophobia during episodes. Patient notes increased work stress and poor sleep quality recently."
    },
    {
      name: "Objective",
      content:
        "Vitals: BP 128/82 mmHg, HR 76 bpm, Temp 98.6°F\nGeneral: Alert and oriented, appears mildly uncomfortable\nHEENT: Normocephalic, atraumatic. Pupils equal, round, reactive to light. No sinus tenderness.\nNeurological: Cranial nerves II-XII intact. No focal deficits. Normal gait and coordination."
    },
    {
      name: "Assessment",
      content:
        "1. Tension-type headache with migrainous features\n2. Work-related stress\n3. Insomnia, likely secondary to stress"
    },
    {
      name: "Plan",
      content:
        "1. Start Sumatriptan 50mg PO PRN for acute headache episodes, max 2 doses per 24 hours\n2. Discussed lifestyle modifications: regular sleep schedule, stress management techniques, adequate hydration\n3. Consider starting prophylactic therapy if headaches occur >4 times per month\n4. Return to clinic in 2 weeks for follow-up\n5. Patient to keep headache diary"
    }
  ]
};

// 2. My Consult Letter Template
export const consultLetterTemplate: TemplateDefinition = {
  id: "consult-letter",
  name: "My Consult Letter",
  type: "Document",
  sections: [
    { name: "Header", content: "Dear Colleague, thank you for referring this patient." },
    { name: "ID/CC", content: "", placeholder: "Not documented" },
    { name: "Reason for Referral", content: "", placeholder: "Not documented" },
    { name: "HPI", content: "", placeholder: "Not documented" },
    { name: "Examination", content: "", placeholder: "Not documented" },
    { name: "Medications", content: "", placeholder: "Not documented" },
    { name: "Past Medical History", content: "", placeholder: "Not documented" },
    { name: "Allergies", content: "", placeholder: "Not documented" },
    { name: "Social History", content: "", placeholder: "Not documented" },
    { name: "Other Relevant Information", content: "", placeholder: "Not documented" },
    { name: "Diagnostic Impression", content: "", placeholder: "Not documented" },
    { name: "Plan", content: "", placeholder: "Not documented" },
    { name: "Signature", content: "Sincerely,\n\n[Physician Name]" }
  ]
};

// 3. My Dictation Template (Free-form)
export const dictationTemplate: TemplateDefinition = {
  id: "my-dictation",
  name: "My Dictation",
  type: "Note",
  sections: [
    {
      name: "Dictation",
      content: "",
      placeholder: "Start dictating or paste your transcript here..."
    }
  ]
};

export const dictationWithContent: TemplateDefinition = {
  id: "my-dictation",
  name: "My Dictation",
  type: "Note",
  sections: [
    {
      name: "Dictation",
      content:
        "This patient came to see me from a fertility care perspective. Not a good diagnosis. They were rude to me. I was not good to them."
    }
  ]
};

// 4. Letter to GP Template
export const letterToGPTemplate: TemplateDefinition = {
  id: "letter-to-gp",
  name: "Letter to GP",
  type: "Document",
  sections: [
    { name: "Address", content: "GP Address" },
    { name: "Salutation", content: "Dear Doctor" },
    { name: "Re Line", content: "Re: [Patient Name], DOB: [DOB]" },
    { name: "Body", content: "" },
    {
      name: "Closing",
      content:
        "Please do not hesitate to contact me if you require any further information.\n\nYours sincerely,"
    },
    {
      name: "Signature",
      content: "[Physician Name]\n[Credentials]\n[Practice Name]"
    }
  ]
};

export const letterToGPWithContent: TemplateDefinition = {
  id: "letter-to-gp",
  name: "Letter to GP",
  type: "Document",
  sections: [
    { name: "Address", content: "GP Address" },
    { name: "Salutation", content: "Dear Doctor" },
    { name: "Re Line", content: "Re: Test Patient, DOB: [DOB]" },
    { name: "Body", content: "This patient presented to me from a fertility care perspective.\n\nThe patient presented for fertility care and received a poor diagnosis.\n\nOn examination,\n\nDuring the consultation, we discussed the diagnosis." },
    { name: "Closing", content: "Please do not hesitate to contact me if you require any further information.\n\nYours sincerely," },
    { name: "Signature", content: "Dr. Shahid Saya\nFertility Specialist\nThe Fertility Partners" }
  ],
  content: `GP Address

Dear Doctor

Re: Test Patient, DOB: [DOB]

This patient presented to me from a fertility care perspective.

The patient presented for fertility care and received a poor diagnosis.

On examination,

During the consultation, we discussed the diagnosis.

Please do not hesitate to contact me if you require any further information.

Yours sincerely,

Dr. Shahid Saya
Fertility Specialist
The Fertility Partners`
};

// 5. Progress Note Template
export const progressNoteTemplate: TemplateDefinition = {
  id: "progress-note",
  name: "Progress Note",
  type: "Note",
  sections: [
    { name: "Interval History", content: "", placeholder: "Not documented" },
    { name: "Current Symptoms", content: "", placeholder: "Not documented" },
    { name: "Examination", content: "", placeholder: "Not documented" },
    { name: "Assessment", content: "", placeholder: "Not documented" },
    { name: "Plan", content: "", placeholder: "Not documented" }
  ]
};

// 6. H & P Template
export const hAndPTemplate: TemplateDefinition = {
  id: "h-and-p",
  name: "H & P",
  type: "Note",
  sections: [
    { name: "Chief Complaint", content: "", placeholder: "Not documented" },
    { name: "History of Present Illness", content: "", placeholder: "Not documented" },
    { name: "Past Medical History", content: "", placeholder: "Not documented" },
    { name: "Medications", content: "", placeholder: "Not documented" },
    { name: "Allergies", content: "", placeholder: "Not documented" },
    { name: "Social History", content: "", placeholder: "Not documented" },
    { name: "Family History", content: "", placeholder: "Not documented" },
    { name: "Review of Systems", content: "", placeholder: "Not documented" },
    { name: "Physical Examination", content: "", placeholder: "Not documented" },
    { name: "Assessment", content: "", placeholder: "Not documented" },
    { name: "Plan", content: "", placeholder: "Not documented" }
  ]
};

// 7. Procedure Note Template
export const procedureNoteTemplate: TemplateDefinition = {
  id: "procedure-note",
  name: "Procedure Note",
  type: "Note",
  sections: [
    { name: "Procedure", content: "", placeholder: "Not documented" },
    { name: "Indication", content: "", placeholder: "Not documented" },
    { name: "Consent", content: "", placeholder: "Not documented" },
    { name: "Technique", content: "", placeholder: "Not documented" },
    { name: "Findings", content: "", placeholder: "Not documented" },
    { name: "Complications", content: "", placeholder: "Not documented" },
    { name: "Post-Procedure Plan", content: "", placeholder: "Not documented" }
  ]
};

// 8. Referral Letter Template
export const referralLetterTemplate: TemplateDefinition = {
  id: "referral-letter",
  name: "Referral Letter",
  type: "Document",
  sections: [
    { name: "To", content: "", placeholder: "Not documented" },
    { name: "Re", content: "", placeholder: "Not documented" },
    { name: "Reason for Referral", content: "", placeholder: "Not documented" },
    { name: "Clinical Summary", content: "", placeholder: "Not documented" },
    { name: "Current Treatment", content: "", placeholder: "Not documented" },
    { name: "Request", content: "", placeholder: "Not documented" },
    { name: "Signature", content: "Sincerely,\n\n[Physician Name]" }
  ]
};

// List of available templates for the dropdown
export const availableTemplates: TemplateListItem[] = [
  { id: "soap-standard", name: "SOAP Note (Standard)", type: "Note", icon: "📋" },
  { id: "my-dictation", name: "My Dictation", type: "Note", icon: "🎙️" },
  { id: "consult-letter", name: "My Consult Letter", type: "Document", icon: "📄" },
  { id: "letter-to-gp", name: "Letter to GP", type: "Document", icon: "✉️" },
  { id: "progress-note", name: "Progress Note", type: "Note", icon: "📝" },
  { id: "h-and-p", name: "H & P", type: "Note", icon: "🏥" },
  { id: "procedure-note", name: "Procedure Note", type: "Note", icon: "⚕️" },
  { id: "referral-letter", name: "Referral Letter", type: "Document", icon: "📨" }
];

// Template map for easy lookup
export const templateDefinitions: Record<string, TemplateDefinition> = {
  "soap-standard": soapNoteTemplate,
  "my-dictation": dictationTemplate,
  "consult-letter": consultLetterTemplate,
  "letter-to-gp": letterToGPTemplate,
  "progress-note": progressNoteTemplate,
  "h-and-p": hAndPTemplate,
  "procedure-note": procedureNoteTemplate,
  "referral-letter": referralLetterTemplate
};

// Template content examples for generation
export const templateContentExamples: Record<string, TemplateDefinition> = {
  "soap-standard": soapNoteWithContent,
  "my-dictation": dictationWithContent,
  "letter-to-gp": letterToGPWithContent
};

// Helper function to format template sections as string
export function formatTemplateSections(template: TemplateDefinition): string {
  if (template.content) {
    return template.content;
  }
  
  return template.sections
    .map(section => {
      const content = section.content || section.placeholder || '';
      return `**${section.name}:**\n${content}`;
    })
    .join('\n\n');
}

// Generation function - takes template and content, returns formatted note
export function generateNoteFromTemplate(
  templateId: string,
  transcript: string,
  context: string
): string {
  const template = templateDefinitions[templateId];
  const exampleContent = templateContentExamples[templateId];
  
  if (!template) {
    return 'Template not found.';
  }
  
  // If we have example content and there's input, use the example
  if (exampleContent && (transcript.trim() || context.trim())) {
    return formatTemplateSections(exampleContent);
  }
  
  // Otherwise return empty template structure
  return formatTemplateSections(template);
}
