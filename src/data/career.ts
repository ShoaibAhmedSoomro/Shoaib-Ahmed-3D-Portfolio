export interface CareerEntry {
  role: string;
  company: string;
  period: string;
  description: string;
}

export const careerEntries: CareerEntry[] = [
  {
    role: "IT Infrastructure Engineer",
    company: "Asico Real Estate LLC — Dubai (Remote)",
    period: "NOW",
    description:
      "Keeping the infrastructure healthy and the web apps shipping: internal tools, customer-facing platforms and AI-assisted features, all built to be maintained, not just launched.",
  },
  {
    role: "Web Developer",
    company: "Pak Affairs — Islamabad",
    period: "2023-24",
    description:
      "Took web features from idea to production, then stayed to hunt the bugs and refactor the rough edges until things stopped breaking.",
  },
  {
    role: "Remote Monitoring & Control Specialist",
    company: "ACT Group (Wind Power Plant)",
    period: "2020-22",
    description:
      "Watched live turbine data around the clock, spotted trends before they became faults and coordinated maintenance, where downtime is measured in megawatts.",
  },
  {
    role: "Intern — Cyber Crime Wing",
    company: "Federal Investigation Agency (FIA), NR3C",
    period: "2019",
    description:
      "First taste of the other side: security-testing web apps, triaging small incidents and peeking into threat research and malware analysis.",
  },
];
