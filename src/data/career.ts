export interface CareerEntry {
  role: string;
  company: string;
  period: string;
  description: string;
}

export const careerEntries: CareerEntry[] = [
  {
    role: "Web Developer",
    company: "Asico Real Estate LLC — Dubai (Remote)",
    period: "NOW",
    description:
      "Build and maintain internal and customer-facing web applications; integrate AI-assisted experiences while focusing on maintainability.",
  },
  {
    role: "Web Developer",
    company: "Pak Affairs — Islamabad",
    period: "2023-24",
    description:
      "Delivered web features end-to-end and supported production troubleshooting; improved stability via refactoring and bug fixes.",
  },
  {
    role: "Remote Monitoring & Control Specialist",
    company: "ACT Group (Wind Power Plant)",
    period: "2020-22",
    description:
      "Monitored real-time turbine operations, analyzed trends, and coordinated maintenance actions in a high-reliability environment.",
  },
  {
    role: "Intern — Cyber Crime Wing",
    company: "Federal Investigation Agency (FIA), NR3C",
    period: "2019",
    description:
      "Assisted with web application security testing and minor incident triage; gained exposure to threat research and malware analysis.",
  },
];
