export const DEMO_TRANSCRIPT = `Patient is a 45-year-old male presenting with complaints of persistent lower back pain for the past three weeks. Pain is described as dull and aching, rated 6 out of 10, worsening with prolonged sitting and improving with movement. No radiation to the legs. No numbness or tingling. No bowel or bladder dysfunction. Patient denies any recent trauma or injury. He works as an accountant and sits for extended periods. Physical examination reveals tenderness over the lumbar paraspinal muscles. Range of motion is slightly limited due to pain. Straight leg raise test is negative bilaterally. Neurological examination is intact. Assessment: Mechanical lower back pain, likely musculoligamentous strain. Plan: Recommend NSAIDs for pain relief, physical therapy referral, ergonomic workstation assessment, and follow-up in two weeks if symptoms persist.`;

export const DEMO_CONTEXT = `Patient: 45-year-old male
Occupation: Accountant
Chief Complaint: Lower back pain x 3 weeks

Relevant History:
- No previous back problems
- No chronic conditions
- No regular medications
- No allergies

Current Medications: None
Allergies: NKDA`;

export const TEMPLATES = [
  { id: 'soap', name: 'SOAP Note', description: 'Standard medical format' },
  { id: 'gp-referral', name: 'GP Referral Letter', description: 'Letter to referring physician' },
  { id: 'progress', name: 'Progress Note', description: 'Follow-up visit documentation' },
  { id: 'consultation', name: 'Consultation Note', description: 'Specialist consultation format' },
  { id: 'discharge', name: 'Discharge Summary', description: 'Patient discharge documentation' },
  { id: 'patient-instructions', name: 'Patient Instructions', description: 'Take-home instructions' },
  { id: 'brief-clinical', name: 'Brief Clinical Note', description: 'Quick clinical summary' },
];

export const DEMO_NOTES: Record<string, string> = {
  'soap': `SUBJECTIVE:
45-year-old male presenting with persistent lower back pain for 3 weeks. Pain is dull and aching, 6/10 severity. Worsens with prolonged sitting, improves with movement. No leg radiation, numbness, tingling, or bowel/bladder dysfunction. No recent trauma. Patient works as accountant with extended sitting periods.

OBJECTIVE:
- Tenderness over lumbar paraspinal muscles
- Range of motion: Slightly limited secondary to pain
- Straight leg raise: Negative bilaterally
- Neurological examination: Intact

ASSESSMENT:
Mechanical lower back pain - likely musculoligamentous strain

PLAN:
1. NSAIDs for pain relief
2. Physical therapy referral
3. Ergonomic workstation assessment
4. Follow-up in 2 weeks if symptoms persist`,

  'gp-referral': `[Current Date]

Dear Dr. [Referring Physician],

Re: [Patient Name]
DOB: [Date of Birth]

I am writing to refer the above patient for further evaluation and management of persistent lower back pain.

CLINICAL SUMMARY:
This 45-year-old male has been experiencing lower back pain for approximately three weeks. The pain is characterized as dull and aching with a severity of 6/10. Symptoms worsen with prolonged sitting and improve with movement. There is no radiation to the lower extremities and no associated neurological symptoms.

EXAMINATION FINDINGS:
Physical examination revealed tenderness over the lumbar paraspinal muscles with slightly limited range of motion. Straight leg raise test was negative bilaterally and neurological examination was intact.

CURRENT ASSESSMENT:
Mechanical lower back pain, likely musculoligamentous strain.

REASON FOR REFERRAL:
I would appreciate your expert opinion and recommendations for further management, particularly regarding physical therapy optimization and any additional investigations you deem necessary.

Thank you for seeing this patient.

Yours sincerely,

Dr. [Your Name]
[Your Practice]
[Contact Information]`,

  'progress': `PROGRESS NOTE

Date: [Current Date]
Patient: [Patient Name]
Visit Type: Follow-up

INTERVAL HISTORY:
Patient returns for follow-up of lower back pain initially presented 3 weeks ago. Reports pain as dull and aching, currently 6/10. Notes worsening with prolonged sitting and improvement with movement.

CURRENT SYMPTOMS:
- Lower back pain: Persistent
- Radiation: None
- Neurological symptoms: None
- Functional impact: Difficulty with prolonged sitting at work

EXAMINATION:
- Lumbar spine: Paraspinal tenderness present
- ROM: Slightly limited
- SLR: Negative bilateral
- Neuro: Intact

ASSESSMENT:
Mechanical lower back pain - musculoligamentous strain, stable

PLAN:
- Continue NSAIDs
- Initiate physical therapy
- Ergonomic assessment recommended
- Return in 2 weeks`,

  'consultation': `CONSULTATION NOTE

Date: [Current Date]
Referring Physician: Dr. [Name]
Patient: [Patient Name]
Reason for Consultation: Evaluation of chronic lower back pain

HISTORY OF PRESENT ILLNESS:
This 45-year-old male accountant presents with a 3-week history of persistent lower back pain. The pain is described as dull and aching, rated 6/10 in severity. Aggravating factors include prolonged sitting. Alleviating factors include movement and position changes. There are no associated radicular symptoms, paresthesias, or bowel/bladder dysfunction.

PHYSICAL EXAMINATION:
- General: Well-appearing male in no acute distress
- Spine: Tenderness over lumbar paraspinal musculature
- Range of Motion: Mildly limited lumbar flexion secondary to pain
- Neurological: Strength 5/5 bilateral lower extremities, sensation intact, reflexes symmetric
- Special Tests: Straight leg raise negative bilaterally

IMPRESSION:
Mechanical low back pain consistent with musculoligamentous strain, likely related to prolonged sedentary work posture.

RECOMMENDATIONS:
1. NSAIDs as needed for pain
2. Physical therapy for core strengthening and postural correction
3. Ergonomic workplace assessment
4. Activity modification - frequent position changes
5. Follow-up in 2-4 weeks`,

  'discharge': `DISCHARGE SUMMARY

Patient: [Patient Name]
Admission Date: [Date]
Discharge Date: [Current Date]
Attending Physician: Dr. [Name]

PRINCIPAL DIAGNOSIS:
Mechanical lower back pain - musculoligamentous strain

HISTORY OF PRESENT ILLNESS:
45-year-old male accountant with 3-week history of progressive lower back pain, dull and aching in character, 6/10 severity, worse with sitting, better with movement.

HOSPITAL COURSE:
Patient was evaluated and found to have mechanical low back pain without neurological deficit. Conservative management was initiated.

DISCHARGE CONDITION:
Stable, improved

DISCHARGE MEDICATIONS:
1. Ibuprofen 400mg PO TID PRN pain
2. Continue home medications

DISCHARGE INSTRUCTIONS:
1. Physical therapy as scheduled
2. Ergonomic workstation modifications
3. Avoid prolonged sitting >30 minutes
4. Apply ice/heat as needed for comfort

FOLLOW-UP:
- Primary care: 2 weeks
- Physical therapy: Per PT schedule`,

  'patient-instructions': `PATIENT INSTRUCTIONS

Date: [Current Date]
Patient: [Patient Name]
Diagnosis: Lower Back Pain (Muscle Strain)

YOUR CONDITION:
You have muscle strain in your lower back, likely from prolonged sitting. This is a common condition that typically improves with proper care.

WHAT TO DO:

At Home:
• Take ibuprofen (Advil/Motrin) as directed for pain
• Apply ice for 15-20 minutes several times daily for the first 48 hours
• After 48 hours, use heat (heating pad) for comfort
• Do gentle stretching exercises as shown

At Work:
• Stand up and move every 30 minutes
• Adjust your chair height and monitor position
• Consider a standing desk or ergonomic assessment

Activities:
✓ Light walking
✓ Gentle stretching
✓ Normal daily activities as tolerated
✗ Heavy lifting
✗ Prolonged sitting without breaks
✗ High-impact activities

WHEN TO SEEK IMMEDIATE CARE:
• Numbness or tingling in legs
• Weakness in legs or feet
• Loss of bladder or bowel control
• Severe pain not relieved by medication
• Fever

FOLLOW-UP:
Schedule an appointment in 2 weeks, or sooner if symptoms worsen.

Physical Therapy: [Contact information will be provided]

Questions? Call our office at [Phone Number]`,

  'brief-clinical': `BRIEF CLINICAL NOTE

Date: [Current Date]

CC: Lower back pain x 3 weeks

HPI: 45 y/o male, dull aching pain 6/10, worse sitting, better with movement. No red flags.

PE: Paraspinal tenderness, limited ROM, neuro intact, SLR negative.

Dx: Mechanical LBP - musculoligamentous strain

Plan: NSAIDs, PT referral, ergonomic mods, f/u 2 weeks PRN.`
};
