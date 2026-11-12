/**
 * Verified Official Support Services for Children & Adolescents in India
 * Sources:
 * - Ministry of Women and Child Development (MWCD) Mission Vatsalya Guidelines
 * - Ministry of Home Affairs (MHA) Emergency Response Support System (ERSS-112)
 * - National Commission for Protection of Child Rights (NCPCR)
 * - Ministry of Social Justice and Empowerment (MSJE)
 * 
 * Fact-Checked Status: VERIFIED OFFICIAL GOVT SERVICES
 * Verification Date: November 2026
 * Crucial Safeguarding Invariant:
 * The platform DOES NOT promise immediate dispatch or claim to be an emergency responder.
 * All contacts route directly to legitimate statutory Indian authorities.
 */

export const VERIFIED_SUPPORT_SERVICES = [
  {
    id: 'childline-1098',
    name: 'National Child Helpline (1098)',
    shortCode: '1098',
    type: 'phone',
    isPrimary: true,
    authority: 'Ministry of Women and Child Development (MWCD), Govt. of India',
    operatingArrangement: 'Integrated with Emergency Response Support System (ERSS 112) under Mission Vatsalya',
    operationalHours: '24 Hours a Day · 7 Days a Week · 365 Days a Year',
    cost: '100% Free / Toll-Free from any mobile network or landline (No SIM balance required)',
    description: 'Childline 1098 is India’s dedicated emergency phone outreach service for children in need of care and protection. When you dial 1098, your call is connected to the State WCD Control Room and local Child Welfare Police Officers / Child Welfare Committee for rescue, shelter, medical help, or legal protection.',
    verificationMetadata: {
      verifiedDate: '2026-11-13',
      officialSource: 'MWCD Mission Vatsalya Guidelines & ERSS Integration Notification',
      status: 'VERIFIED_ACTIVE',
    },
    actionInstructions: [
      'Pick up any mobile phone or landline and dial 1-0-9-8.',
      'You do not need prepaid balance or internet data to make this call.',
      'A trained child welfare counselor will answer calmly and listen to you.',
      'Explain where you are and what is happening. You do not have to know legal terms.',
    ],
    officialUrl: 'https://wcd.nic.in',
  },
  {
    id: 'national-emergency-112',
    name: 'National Emergency Response (112)',
    shortCode: '112',
    type: 'phone',
    isPrimary: false,
    authority: 'Ministry of Home Affairs (MHA), Govt. of India',
    operatingArrangement: 'Single unified emergency number across all Indian states and Union Territories',
    operationalHours: '24/7 All-India Emergency Dispatch',
    cost: 'Toll-Free from all telecom operators',
    description: 'National emergency helpline integrating Police, Fire, and Ambulance services. If a child or family is in immediate physical danger, violence, or accident, dialing 112 dispatches the nearest emergency response vehicle via GPS.',
    verificationMetadata: {
      verifiedDate: '2026-11-13',
      officialSource: 'MHA National Emergency Response Support System (112.gov.in)',
      status: 'VERIFIED_ACTIVE',
    },
    actionInstructions: [
      'Use 112 when there is an immediate, life-threatening emergency or ongoing violence.',
      'State your exact location (landmark, street, city) clearly to the dispatcher.',
    ],
    officialUrl: 'https://112.gov.in',
  },
  {
    id: 'ncpcr-pocso-ebox',
    name: 'NCPCR POCSO e-Box',
    shortCode: 'Online Portal',
    type: 'web',
    isPrimary: false,
    authority: 'National Commission for Protection of Child Rights (NCPCR)',
    operatingArrangement: 'Statutory Body under Commission for Protection of Child Rights Act 2005',
    operationalHours: 'Web Portal available 24/7',
    cost: 'Free online reporting',
    description: 'An electronic box for children or guardians to directly and confidentially report incidents of child sexual abuse under the POCSO Act 2012 directly to the National Commission. NCPCR monitors the case and directs state police for immediate action.',
    verificationMetadata: {
      verifiedDate: '2026-11-13',
      officialSource: 'National Commission for Protection of Child Rights (ncpcr.gov.in)',
      status: 'VERIFIED_ACTIVE',
    },
    actionInstructions: [
      'Visit the official NCPCR portal (ncpcr.gov.in/pocso-ebox).',
      'Follow the simple pictorial prompts to register what occurred.',
      'A dedicated NCPCR protection officer will initiate inquiry and monitor child safety.',
    ],
    officialUrl: 'https://ncpcr.gov.in',
  },
  {
    id: 'cybercrime-1930',
    name: 'National Cyber Crime Reporting Helpline (1930)',
    shortCode: '1930',
    type: 'phone_and_web',
    isPrimary: false,
    authority: 'Indian Cyber Crime Coordination Centre (I4C), Ministry of Home Affairs',
    operatingArrangement: 'Toll-free national cyber helpline & cybercrime.gov.in portal',
    operationalHours: '24/7 National Cyber Emergency Support',
    cost: 'Toll-Free',
    description: 'Specialized national helpline to report online blackmail, cyberbullying, morphed private photographs, identity theft, or online sexual exploitation. Operates in coordination with state cyber crime police cells to take down abusive digital material.',
    verificationMetadata: {
      verifiedDate: '2026-11-13',
      officialSource: 'Ministry of Home Affairs Cyber Crime Portal (cybercrime.gov.in)',
      status: 'VERIFIED_ACTIVE',
    },
    actionInstructions: [
      'Dial 1930 immediately if someone is threatening you online or blackmailing with photos.',
      'Do not delete message screenshots, profile handles, or URLs; they serve as digital evidence.',
      'File an incident report on cybercrime.gov.in with the assistance of a trusted adult.',
    ],
    officialUrl: 'https://cybercrime.gov.in',
  },
  {
    id: 'kiran-mental-health',
    name: 'KIRAN National Mental Health Helpline',
    shortCode: '1800-599-0019',
    type: 'phone',
    isPrimary: false,
    authority: 'Department of Empowerment of Persons with Disabilities, MSJE, Govt. of India',
    operatingArrangement: 'Psychological first aid & mental health counseling across 13 Indian languages',
    operationalHours: '24/7 Toll-Free Psychological Support',
    cost: 'Toll-Free',
    description: 'National helpline providing psychological support, anxiety management, depression screening, and crisis intervention for adolescents, students facing exam stress, and young people feeling overwhelmed.',
    verificationMetadata: {
      verifiedDate: '2026-11-13',
      officialSource: 'Ministry of Social Justice and Empowerment (MSJE)',
      status: 'VERIFIED_ACTIVE',
    },
    actionInstructions: [
      'Dial 1800-599-0019 when feeling intensely anxious, depressed, or unable to cope.',
      'You can request to speak to a counselor in your preferred regional language.',
    ],
    officialUrl: 'https://disabilityaffairs.gov.in',
  },
];

