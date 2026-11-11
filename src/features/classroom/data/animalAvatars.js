export const ANIMAL_AVATARS = Object.freeze([
  { id: 'tiger', codename: 'Brave Tiger', emoji: '🐯', color: '#e58b37' },
  { id: 'peacock', codename: 'Radiant Peacock', emoji: '🦚', color: '#4c9e9a' },
  { id: 'elephant', codename: 'Wise Elephant', emoji: '🐘', color: '#7185aa' },
  { id: 'fox', codename: 'Curious Fox', emoji: '🦊', color: '#df7654' },
  { id: 'chital', codename: 'Gentle Chital', emoji: '🦌', color: '#b78b56' },
  { id: 'falcon', codename: 'Clever Falcon', emoji: '🦅', color: '#7175a7' },
  { id: 'turtle', codename: 'Patient Turtle', emoji: '🐢', color: '#5e9b78' },
  { id: 'dolphin', codename: 'Joyful Dolphin', emoji: '🐬', color: '#4e9fc2' },
]);

export function getAnimalAvatar(id) {
  return ANIMAL_AVATARS.find((avatar) => avatar.id === id) || null;
}

export function getAvatarByCodename(codename) {
  return ANIMAL_AVATARS.find((avatar) => avatar.codename === codename) || null;
}
