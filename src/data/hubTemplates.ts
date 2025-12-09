export interface HubTemplate {
  id: string;
  type: 'Note' | 'Document';
  title: string;
  author: {
    name: string;
    avatar: string;
    specialty: string;
    country: string;
    verified: boolean;
  };
  usageCount: number;
  lastEdited: string;
  about: string;
  exampleNote: string;
  templateStructure: string;
}

export const hubTemplates: HubTemplate[] = [
  {
    id: 'gb-nhs-gp-consult',
    type: 'Note',
    title: 'GB NHS GP Consult',
    author: {
      name: 'Naveen Nandakumar',
      avatar: '/placeholder.svg',
      specialty: 'General Practitioner',
      country: 'UK',
      verified: true
    },
    usageCount: 5125,
    lastEdited: '12/04/2025',
    about: "Need a clear and concise way to document patient consultations? This NHS GP Consult template is designed for General Practitioners to efficiently record patient encounters. It covers all essential aspects of a consultation, from presenting complaints and medical history to examination findings, assessment, and a detailed plan. This template ensures comprehensive documentation, helping GPs maintain accurate records and provide optimal patient care. With FertiAI, this template can be quickly populated from a consultation transcript, saving valuable time and improving the quality of your clinical notes.",
    exampleNote: `F2F
Seen alone
Reason for visit: Follow up

History:
- History of presenting complaints: Follow up for hypertension and new onset of lower back pain.
- ICE: Patient states they are concerned about their blood pressure and the back pain is affecting their sleep.
- Presence or absence of red flag symptoms relevant to the presenting complaint: No red flag symptoms reported.
- Relevant risk factors: Smoker, BMI 32.
- PMH: / PSH: Hypertension, Osteoarthritis.
- DH: Ramipril 5mg daily, Paracetamol as needed.
- Allergies: NKDA.
- FH: Father with history of heart disease.
- SH: Smoker (10 cigarettes per day), drinks alcohol occasionally, works as a teacher.

Examination:
- Vital signs: T 37.0°C, Sats 98% on room air, HR 78 bpm, BP 145/90 mmHg, RR 16.
- Physical or mental state examination findings, including system-specific examination: Lower back tenderness on palpation, no neurological deficits.

Assessment:
- Working diagnosis: Essential hypertension (suboptimally controlled), Mechanical lower back pain.

Plan:
- Increase Ramipril to 10mg daily
- Advised smoking cessation
- Physiotherapy referral for back pain
- Follow up in 4 weeks`,
    templateStructure: `[Write whether this is a face to face/in person consultation "F2F" OR telephone "T/C"] (Only include if explicitly mentioned in the transcript, contextual notes or clinical note; otherwise omit completely.)

[Specify whether anyone else is present i.e. "seen alone" or "seen with..." (based on introductions)] (Only include if explicitly mentioned in the transcript, contextual notes or clinical note; otherwise omit completely.)

[Reason for visit, e.g. current issues or presenting complaint or booking note or follow up] (Only include if explicitly mentioned in the transcript, contextual notes or clinical note; otherwise omit completely.)

History:
- [History of presenting complaints] (Only include if explicitly mentioned in the transcript, contextual notes or clinical note; otherwise omit completely.)
- [ICE: Patient's Ideas, Concerns and Expectations] (Only include if explicitly mentioned in the transcript, contextual notes or clinical note; otherwise omit completely.)
- [Presence or absence of red flag symptoms relevant to the presenting complaint] (Only include if explicitly mentioned in the transcript, contextual notes or clinical note; otherwise omit completely.)
- [Relevant risk factors] (Only include if explicitly mentioned in the transcript, contextual notes or clinical note; otherwise omit completely.)
- [PMH: / PSH: Past medical history or surgical history] (Only include if explicitly mentioned in the transcript, contextual notes or clinical note; otherwise omit completely.)
- [DH: Drug history/medications] (Only include if explicitly mentioned in the transcript, contextual notes or clinical note; otherwise omit completely.)
- [Allergies] (Only include if explicitly mentioned in the transcript, contextual notes or clinical note; otherwise omit completely.)
- [FH: Relevant family history] (Only include if explicitly mentioned in the transcript, contextual notes or clinical note; otherwise omit completely.)
- [SH: Social history i.e. lives with, occupation, smoking/alcohol/drugs, recent travel, carers/package of care] (Only include if explicitly mentioned in the transcript, contextual notes or clinical note; otherwise omit completely.)

Examination:
- [Vital signs: e.g. T, Sats %, HR, BP, RR] (Only include if explicitly mentioned in the transcript, contextual notes or clinical note; otherwise omit completely.)
- [Physical or mental state examination findings, including system-specific examination] (Only include if explicitly mentioned in the transcript, contextual notes or clinical note; otherwise omit completely.)
- [Investigations with results] (Only include if explicitly mentioned in the transcript, contextual notes or clinical note; otherwise omit completely.)

Assessment:
- [Working diagnosis or differential diagnoses] (Only include if explicitly mentioned in the transcript, contextual notes or clinical note; otherwise omit completely.)

Plan:
- [Management plan including investigations, treatments, referrals, follow-up] (Only include if explicitly mentioned in the transcript, contextual notes or clinical note; otherwise omit completely.)`
  },
  {
    id: 'meeting-minutes',
    type: 'Note',
    title: 'Meeting Minutes',
    author: {
      name: 'Louise Jones',
      avatar: '/placeholder.svg',
      specialty: 'Psychologist',
      country: 'UK',
      verified: true
    },
    usageCount: 3031,
    lastEdited: '11/28/2025',
    about: "A comprehensive meeting minutes template designed for healthcare professionals. This template helps you capture key discussion points, decisions made, and action items from clinical meetings, case conferences, or team huddles. Perfect for maintaining accurate records of multidisciplinary team meetings and ensuring follow-through on agreed actions.",
    exampleNote: `Meeting: Weekly Case Conference
Date: November 28, 2025
Attendees: Dr. Jones, Dr. Smith, Nurse Williams, Social Worker Adams

Agenda Items Discussed:
1. Patient A - Depression management review
2. Patient B - Discharge planning
3. New referrals review

Key Decisions:
- Patient A: Increase medication dosage, schedule follow-up in 2 weeks
- Patient B: Approved for discharge with community support package

Action Items:
- Dr. Jones: Update Patient A care plan
- Nurse Williams: Coordinate Patient B discharge
- Next meeting: December 5, 2025`,
    templateStructure: `Meeting: [Meeting title/type]
Date: [Date]
Attendees: [List of attendees]

Agenda Items Discussed:
[List main discussion topics]

Key Decisions:
[Document decisions made]

Action Items:
[List action items with responsible parties]

Next meeting: [Date/time of next meeting]`
  },
  {
    id: 'initial-clinical-interview',
    type: 'Note',
    title: 'Initial Clinical Interview',
    author: {
      name: 'Olga Lavalle',
      avatar: '/placeholder.svg',
      specialty: 'Psychologist',
      country: 'Canada',
      verified: true
    },
    usageCount: 2681,
    lastEdited: '11/15/2025',
    about: "A structured template for conducting initial psychological assessments. This template guides clinicians through the essential components of a first session, including presenting concerns, mental status examination, risk assessment, and preliminary formulation. Ideal for psychologists and mental health professionals establishing new therapeutic relationships.",
    exampleNote: `Initial Clinical Interview

Client: John D.
Date: November 15, 2025

Presenting Concerns:
Client reports experiencing persistent low mood and anxiety for the past 6 months, following job loss. Reports difficulty sleeping, reduced appetite, and social withdrawal.

Mental Status Examination:
- Appearance: Casually dressed, adequate hygiene
- Behavior: Cooperative, minimal eye contact
- Speech: Normal rate and tone
- Mood: "Depressed"
- Affect: Constricted, tearful at times
- Thought Process: Linear, goal-directed
- Thought Content: No SI/HI, no psychotic symptoms
- Cognition: Alert and oriented x4

Risk Assessment:
- Suicide Risk: Low (no ideation, plan, or intent)
- Violence Risk: None identified

Preliminary Formulation:
Adjustment disorder with mixed anxiety and depressed mood in context of recent job loss.

Plan:
- Weekly therapy sessions (CBT approach)
- Consider psychiatric referral if no improvement in 4 weeks`,
    templateStructure: `Initial Clinical Interview

Client: [Client name/identifier]
Date: [Date]

Presenting Concerns:
[Main reasons for seeking treatment]

Mental Status Examination:
- Appearance: [Description]
- Behavior: [Description]
- Speech: [Description]
- Mood: [Patient's reported mood]
- Affect: [Observed affect]
- Thought Process: [Description]
- Thought Content: [Including SI/HI assessment]
- Cognition: [Orientation, attention, memory]

Risk Assessment:
- Suicide Risk: [Low/Medium/High with justification]
- Violence Risk: [Assessment]

Preliminary Formulation:
[Initial diagnostic impression and contributing factors]

Plan:
[Treatment recommendations]`
  },
  {
    id: 'psychology-session-notes',
    type: 'Note',
    title: 'Psychology Session Notes',
    author: {
      name: 'Olga Lavalle',
      avatar: '/placeholder.svg',
      specialty: 'Psychologist',
      country: 'Canada',
      verified: true
    },
    usageCount: 2274,
    lastEdited: '11/20/2025',
    about: "A streamlined template for documenting ongoing therapy sessions. Captures session content, therapeutic interventions used, client progress, and plans for future sessions. Designed to maintain consistent documentation while allowing flexibility for different therapeutic modalities.",
    exampleNote: `Session Notes

Client: Jane S.
Session #: 8
Date: November 20, 2025

Session Focus:
Continued work on cognitive restructuring for social anxiety.

Content Summary:
- Reviewed homework (thought record)
- Identified automatic thoughts related to work presentations
- Practiced cognitive challenging techniques
- Role-played upcoming team meeting scenario

Interventions Used:
- Cognitive restructuring
- Behavioral experiments
- Role play

Client Response:
Client engaged well in session. Demonstrated improved ability to identify and challenge negative automatic thoughts. Reported reduced anxiety about upcoming presentation.

Plan for Next Session:
- Review presentation experience
- Begin exposure hierarchy for social situations
- Introduce relaxation techniques`,
    templateStructure: `Session Notes

Client: [Client name/identifier]
Session #: [Number]
Date: [Date]

Session Focus:
[Main themes/goals for this session]

Content Summary:
[Key topics discussed and activities completed]

Interventions Used:
[Therapeutic techniques applied]

Client Response:
[Observations about client engagement and progress]

Plan for Next Session:
[Goals and activities for next session]`
  },
  {
    id: 'main-template-gp-consult',
    type: 'Note',
    title: 'Main template GP consult',
    author: {
      name: 'Brett Ogilvie',
      avatar: '/placeholder.svg',
      specialty: 'General Practitioner',
      country: 'Australia',
      verified: true
    },
    usageCount: 1949,
    lastEdited: '12/01/2025',
    about: "A versatile GP consultation template suitable for various appointment types. This template provides a flexible framework for documenting patient encounters while ensuring all critical information is captured. Suitable for both acute presentations and chronic disease management reviews.",
    exampleNote: `Consultation Notes

Patient: Mary T.
Date: December 1, 2025
Type: Routine appointment

Chief Complaint:
Annual health check and diabetes review

History:
Type 2 diabetes diagnosed 5 years ago, currently on Metformin 1g BD. Last HbA1c 7.2%. No complications. Also manages hypertension with Perindopril 5mg daily.

Examination:
- BP: 128/78
- Weight: 82kg (stable)
- Foot exam: Normal sensation, pulses present, no lesions
- Eyes: Retinal screening current

Assessment:
Well-controlled T2DM and hypertension

Plan:
- Continue current medications
- Repeat HbA1c in 3 months
- Annual review completed
- Lifestyle advice reinforced`,
    templateStructure: `Consultation Notes

Patient: [Patient identifier]
Date: [Date]
Type: [Appointment type]

Chief Complaint:
[Reason for visit]

History:
[Relevant medical history and current concerns]

Examination:
[Physical examination findings]

Assessment:
[Clinical impression/diagnosis]

Plan:
[Management plan and follow-up]`
  },
  {
    id: 'comprehensive-psychiatric-intake',
    type: 'Document',
    title: 'Comprehensive Psychiatric Intake',
    author: {
      name: 'Elena del Busto',
      avatar: '/placeholder.svg',
      specialty: 'Psychiatrist',
      country: 'USA',
      verified: true
    },
    usageCount: 1744,
    lastEdited: '11/10/2025',
    about: "A thorough psychiatric evaluation template for new patient assessments. This comprehensive document covers psychiatric history, medical history, substance use, family history, developmental history, and detailed mental status examination. Designed for psychiatrists conducting initial evaluations.",
    exampleNote: `Psychiatric Intake Evaluation

Patient: Robert M.
DOB: 03/15/1985
Date of Evaluation: November 10, 2025

Chief Complaint:
"I can't focus at work and my anxiety is through the roof"

History of Present Illness:
40-year-old male presenting with 6-month history of worsening concentration, anxiety, and irritability...

[Detailed documentation continues...]`,
    templateStructure: `Psychiatric Intake Evaluation

Patient: [Name]
DOB: [Date of birth]
Date of Evaluation: [Date]

Chief Complaint:
[Patient's words describing main concern]

History of Present Illness:
[Detailed narrative of current symptoms]

Past Psychiatric History:
[Previous diagnoses, treatments, hospitalizations]

Medical History:
[Current and past medical conditions]

Medications:
[Current medications with doses]

Substance Use History:
[Alcohol, drugs, tobacco use]

Family Psychiatric History:
[Mental health conditions in family]

Social History:
[Education, occupation, relationships, living situation]

Mental Status Examination:
[Comprehensive MSE]

Assessment:
[Diagnostic impressions with DSM-5 criteria]

Plan:
[Treatment recommendations]`
  },
  {
    id: 'problem-based-primary-clinic',
    type: 'Document',
    title: 'Problem Based Primary Clinic Note',
    author: {
      name: 'David Janese',
      avatar: '/placeholder.svg',
      specialty: 'Family Medicine Specialist',
      country: 'USA',
      verified: true
    },
    usageCount: 1635,
    lastEdited: '11/25/2025',
    about: "A problem-oriented documentation template for primary care settings. This template organizes patient information by active problems, making it easy to track multiple conditions and their management. Ideal for complex patients with multiple comorbidities.",
    exampleNote: `Problem-Based Clinic Note

Patient: Susan K.
Date: November 25, 2025

Active Problems:

Problem #1: Type 2 Diabetes Mellitus
- Status: Stable
- Current management: Metformin 1000mg BID
- Last HbA1c: 6.8% (10/2025)
- Plan: Continue current management

Problem #2: Hypertension
- Status: Improved
- Current management: Lisinopril 20mg daily
- Today's BP: 132/82
- Plan: Continue current dose

Problem #3: Obesity
- Status: Ongoing
- Current BMI: 32
- Plan: Referral to dietitian, discussed exercise goals`,
    templateStructure: `Problem-Based Clinic Note

Patient: [Patient identifier]
Date: [Date]

Active Problems:

Problem #1: [Diagnosis]
- Status: [Stable/Improved/Worsening]
- Current management: [Treatments]
- Relevant data: [Labs, vitals, etc.]
- Plan: [Next steps]

[Repeat for each active problem]

New Problems Identified:
[Any new issues]

Preventive Care:
[Screenings, immunizations due]

Follow-up:
[Next appointment]`
  },
  {
    id: 'adhd-dsm5-criteria',
    type: 'Document',
    title: 'ADHD DSM-5 Criteria',
    author: {
      name: 'Kieran McLeod',
      avatar: '/placeholder.svg',
      specialty: 'Psychiatrist',
      country: 'UK',
      verified: true
    },
    usageCount: 1433,
    lastEdited: '10/30/2025',
    about: "A structured assessment template based on DSM-5 criteria for Attention-Deficit/Hyperactivity Disorder. This template guides clinicians through systematic evaluation of ADHD symptoms, ensuring comprehensive assessment and accurate diagnosis.",
    exampleNote: `ADHD Assessment - DSM-5 Criteria

Patient: Alex T.
Date: October 30, 2025

Inattention Symptoms (≥6 required for diagnosis):
✓ Often fails to give close attention to details
✓ Often has difficulty sustaining attention
✓ Often does not seem to listen when spoken to
✓ Often does not follow through on instructions
✓ Often has difficulty organizing tasks
✓ Often avoids tasks requiring sustained mental effort
□ Often loses things necessary for tasks
✓ Often easily distracted
✓ Often forgetful in daily activities

Count: 8/9 symptoms present

Hyperactivity/Impulsivity Symptoms:
[Assessment continues...]

Duration: Symptoms present since age 7
Impairment: Present in work, home, and social settings

Diagnosis: ADHD, Combined Presentation, Moderate`,
    templateStructure: `ADHD Assessment - DSM-5 Criteria

Patient: [Name]
Date: [Date]

Inattention Symptoms (≥6 required):
□ Often fails to give close attention to details
□ Often has difficulty sustaining attention
□ Often does not seem to listen when spoken to
□ Often does not follow through on instructions
□ Often has difficulty organizing tasks
□ Often avoids tasks requiring sustained mental effort
□ Often loses things necessary for tasks
□ Often easily distracted
□ Often forgetful in daily activities

Hyperactivity/Impulsivity Symptoms (≥6 required):
[List all criteria with checkboxes]

Age of Onset:
[Symptoms present before age 12]

Settings Affected:
[Two or more settings]

Functional Impairment:
[Description of impact]

Rule-outs:
[Other conditions considered]

Diagnosis:
[ADHD subtype and severity]`
  },
  {
    id: 'fertility-consultation',
    type: 'Note',
    title: 'Fertility Consultation Template',
    author: {
      name: 'Dr. Shahid Saya',
      avatar: '/placeholder.svg',
      specialty: 'Fertility Specialist',
      country: 'Canada',
      verified: true
    },
    usageCount: 1200,
    lastEdited: '12/05/2025',
    about: "A specialized template for fertility consultations covering comprehensive reproductive history, investigations, and treatment planning. Designed for reproductive endocrinologists and fertility specialists to document initial assessments and follow-up consultations.",
    exampleNote: `Fertility Consultation

Patient: Sarah & Michael P.
Date: December 5, 2025
Consultation Type: Initial Assessment

Presenting Concern:
Primary infertility - trying to conceive for 18 months

Female Partner History:
- Age: 34
- Menstrual history: Regular 28-day cycles
- Obstetric history: G0P0
- Previous investigations: Day 3 FSH normal, AMH 2.1 ng/mL
- HSG: Patent tubes bilaterally

Male Partner History:
- Age: 36
- Semen analysis: Normal parameters

Assessment:
Unexplained infertility

Plan:
- Recommend 3 cycles of IUI
- Discuss IVF if unsuccessful
- Lifestyle optimization counseling`,
    templateStructure: `Fertility Consultation

Patient: [Patient names]
Date: [Date]
Consultation Type: [Initial/Follow-up]

Presenting Concern:
[Primary/Secondary infertility, duration trying]

Female Partner History:
- Age: [Age]
- Menstrual history: [Cycle details]
- Obstetric history: [G_P_]
- Previous investigations: [Results]
- Medical/Surgical history: [Relevant conditions]

Male Partner History:
- Age: [Age]
- Semen analysis: [Results]
- Medical history: [Relevant conditions]

Investigations Reviewed:
[Current test results]

Assessment:
[Diagnosis/Working diagnosis]

Plan:
[Treatment recommendations]`
  },
  {
    id: 'ivf-treatment-plan',
    type: 'Document',
    title: 'IVF Treatment Plan',
    author: {
      name: 'Dr. Sarah Chen',
      avatar: '/placeholder.svg',
      specialty: 'Fertility Specialist',
      country: 'USA',
      verified: true
    },
    usageCount: 980,
    lastEdited: '12/02/2025',
    about: "A comprehensive IVF treatment planning document for fertility clinics. This template covers protocol selection, medication schedules, monitoring plans, and procedure scheduling. Essential for coordinating care in assisted reproduction treatment cycles.",
    exampleNote: `IVF Treatment Plan

Patient: Jennifer L.
Cycle #: 1
Start Date: December 15, 2025

Protocol: Antagonist Protocol

Baseline Assessment:
- AFC: 12
- AMH: 3.2 ng/mL
- FSH: 6.2 mIU/mL

Stimulation Protocol:
- Gonal-F 225 IU daily starting CD2
- Cetrotide 0.25mg starting when lead follicle ≥14mm
- First monitoring: CD6

Trigger Criteria:
- ≥3 follicles ≥17mm
- E2 appropriate for follicle count

Egg Retrieval: Anticipated CD12-14
Embryo Transfer: Day 5 blastocyst transfer planned

Special Considerations:
- ICSI recommended
- PGT-A discussed, patient declined`,
    templateStructure: `IVF Treatment Plan

Patient: [Name]
Cycle #: [Number]
Start Date: [Date]

Protocol: [Protocol type]

Baseline Assessment:
- AFC: [Count]
- AMH: [Value]
- FSH: [Value]

Stimulation Protocol:
[Medication details and doses]

Monitoring Schedule:
[Ultrasound and blood work schedule]

Trigger Criteria:
[Criteria for trigger shot]

Procedural Plan:
- Egg Retrieval: [Anticipated date]
- Fertilization method: [IVF/ICSI]
- Transfer plan: [Day 3/Day 5, fresh/frozen]

Special Considerations:
[PGT, ICSI, other notes]`
  }
];

export const sortOptions = ['Most Popular', 'Newest', 'Most Used', 'A-Z'] as const;
export const locationOptions = ['All', 'Canada', 'USA', 'UK', 'Australia', 'Other'] as const;
export const specialtyOptions = [
  'All',
  'General Practitioner',
  'Fertility Specialist',
  'Psychologist',
  'Psychiatrist',
  'Emergency Medicine',
  'Internal Medicine',
  'Pediatrician',
  'Family Medicine'
] as const;
export const categoryOptions = ['All', 'Note', 'Document'] as const;
