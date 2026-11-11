# RightsQuest India

A gamified learning platform that helps children in India understand their rights, recognize unsafe or unfair situations, and learn where to seek help.

> **Project brief:** Development of a gamified platform on Children's Rights to increase legal literacy and awareness among children in India. Source metadata: 2023 · Smart Education · Software · Ministry of Law and Justice.

## About

RightsQuest is designed for children ages 8–16. It turns child-rights topics into approachable, age-appropriate learning experiences using stories, interactive scenarios, and progressive learning modules. The goal is to help children make informed choices and feel more confident standing up for themselves and others.

The platform is intended to be inclusive across gender, language, ability, and socio-economic background. Learning content should use clear language, accessible interactions, and culturally relevant examples. Where a situation calls for real-world help, the experience should direct children to trusted adults and verified support services rather than imply that a game can provide legal representation or emergency assistance.

## Intended features

- **Scenario-based gameplay:** Interactive stories and challenges based on everyday situations involving children's rights.
- **Progressive learning paths:** Modular lessons that can adapt to a learner's age, progress, and needs.
- **Accessible, multilingual experience:** Simple navigation, inclusive multimedia, and language support.
- **Collaboration and community:** Opportunities to learn with peers and, where safely moderated, connect with experts and organizations.
- **Support-service information:** Clear routes to verified child-rights organizations and help services.

These are goals from the project brief. Update this section to distinguish implemented features from planned work as the prototype develops.

## Target audience

Children in India between 8 and 16 years old, with content and interaction patterns appropriate to different ages. Educators, caregivers, and child-rights organizations may also support learning and use of the platform.

## Project status

- **Part 01 Complete:** Application foundation, design system tokens, responsive application shell, Cormorant Garamond kinetic intro, Lenis smooth scroll, age selection prototype, learner home shell, and static catalog routes.
- **Part 02 Complete:** The Living Story World (*The World of Every Child*), 5 constitutional realms, Mitra the Sun-Fox Mascot (9 expressive states & child safeguard behavior), interactive 60fps SVG vector adventure map, and 6-scene cinematic landing storytelling.
- **Part 03 Complete:** Stateful branching scenario dialogue engine (`ScenarioRunner`), ethical decision trees (`ChoicePanel`), non-punitive consequence evaluation (`ConsequencePreview`), constitutional article reveal stamps (`ArticleRevealStamp`), tactile evidence inspector (`EvidenceInspector`), and `/play/:scenarioId` mission routing.
- **Part 04 Complete:** Dignity XP and rights passport, non-punitive streaks, collectible badges, and shared community goals.
- **Part 05 Complete:** Teacher-led live classroom rooms with animal codenames, private voting, aggregate reveal, and a facilitator discussion guide.
- **Parts 06–08 Planned:** Teacher/parent dashboards, multilingual localization, and offline PWA.

## Getting started

### Requirements
- Node.js (v18+ recommended)
- npm

### Installation & Run Commands
```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Start the app and the Part 05 WebSocket relay together
npm run dev:classroom

# Run the existing automated QA, legal fidelity & child safety checks (Parts 01–04)
npm test

# Run individual verification suites
npm run test:foundation   # 120 checks (Parts 01 & 02)
npm run test:part03       # 38 checks (Part 03 Scenario Engine)

# Build for production
npm run build
```

### Classroom relay

`npm run dev:classroom` starts the Vite app and a separate WebSocket relay on port `8787`. The browser connects to the same hostname as the app; set `VITE_CLASSROOM_WS_URL` at build time to use a different relay URL. For local-network devices, allow the exact Vite origin in the relay, for example:

```bash
CLASSROOM_ALLOWED_ORIGINS=http://192.168.1.40:5173 npm run dev:classroom
```

In production, run `node server/classroom-server.js` as a long-lived Node process, expose it through `wss://`, and set `CLASSROOM_ALLOWED_ORIGINS` to the app origin. Room state lives only in the relay process memory: there is no database, session history, or horizontal scaling support. A relay restart closes active rooms and clears their codenames and votes.

## Safety, privacy, and accessibility

Because the intended users are children, safety and privacy need to shape the product from the start:

- Collect as little personal information as possible and explain data use in child-friendly language.
- Avoid exposing children's identities, locations, or contact details to other users.
- Design any social features with strong moderation, reporting, and safeguarding procedures; do not enable unsupervised contact by default.
- Classroom sessions are facilitator-led: students cannot message one another. Room codenames and votes are kept only in relay memory and are removed when the room closes or expires.
- Have child-rights content and support-service details reviewed by qualified, local experts and keep referrals current.
- Make clear that educational content is not a substitute for advice from a qualified professional or help from a trusted adult.
- Test with children only through an appropriate, safeguarded process, with informed consent and assent as applicable.
- Check the experience with accessibility guidance and children with varied language, literacy, and access needs.

## Deliverables in the project brief

1. A functional prototype demonstrating key features.
2. User-testing and feedback data about effectiveness and usability.
3. A report and presentation covering the development process, design decisions, technical challenges, and ethical considerations.

## Contributing

Contributions should prioritize child safety, factual accuracy, accessibility, and inclusive language. Please include evidence or expert review for changes to legal-rights content and support-service referrals.

## License

No license has been specified yet. Add a `LICENSE` file and update this section before distributing or reusing the project.
