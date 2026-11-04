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

**Part 01 Complete:** The application foundation, design system tokens, responsive application shell, landing experience, age selection prototype, learner home shell, and static catalog routes have been implemented. Full branching quest interactions and scoring will follow in Part 02.

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

# Run QA & Foundation Verification
node scripts/verify_foundation.mjs

# Build for production
npm run build
```

## Safety, privacy, and accessibility

Because the intended users are children, safety and privacy need to shape the product from the start:

- Collect as little personal information as possible and explain data use in child-friendly language.
- Avoid exposing children's identities, locations, or contact details to other users.
- Design any social features with strong moderation, reporting, and safeguarding procedures; do not enable unsupervised contact by default.
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
