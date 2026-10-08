// First paid/intern role started in September 2019 (see career.ts).
const CAREER_START = new Date(2019, 8, 1);

/** Whole years of work experience, recalculated every time the site loads. */
export const yearsOfExperience = (now = new Date()) =>
  Math.floor((now.getTime() - CAREER_START.getTime()) / (365.25 * 24 * 3600 * 1000));
