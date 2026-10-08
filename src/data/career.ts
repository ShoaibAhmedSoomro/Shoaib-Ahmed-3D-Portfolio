import data from "./career.json";

export interface CareerEntry {
  role: string;
  company: string;
  period: string;
  description: string;
}

// The JSON file is shared with the resume build script; the site only needs these fields.
export const careerEntries: CareerEntry[] = data.entries.map((e) => ({
  role: e.role,
  company: `${e.company}, ${e.place}`,
  period: e.period,
  description: e.summary,
}));
