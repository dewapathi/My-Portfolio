export const DRIVE_SECTION_IDS = [
  "home",
  "about",
  "skills",
  "experience",
  "projects",
  "services",
  "contact",
] as const;

export type DriveSectionId = (typeof DRIVE_SECTION_IDS)[number];

