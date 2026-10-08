export interface CareerEntry {
  role: string;
  company: string;
  period: string;
  description: string;
}

export const careerEntries: CareerEntry[] = [
  {
    role: "IT Infrastructure Engineer",
    company: "Asico Real Estate LLC, Dubai (Remote)",
    period: "NOW",
    description:
      "Manage the company servers and cloud setup, and build and maintain the internal and customer web apps that run on them.",
  },
  {
    role: "Web Developer",
    company: "Pak Affairs, Islamabad",
    period: "2023-24",
    description:
      "Built website features from the first version to production, and fixed bugs in live systems.",
  },
  {
    role: "Remote Monitoring & Control Specialist",
    company: "ACT Group (Wind Power Plant)",
    period: "2020-22",
    description:
      "Monitored wind turbines in real time, tracked performance trends and coordinated maintenance work.",
  },
  {
    role: "Intern, Cyber Crime Wing",
    company: "Federal Investigation Agency (FIA), NR3C",
    period: "2019",
    description:
      "Tested web applications for security problems, helped sort small incidents and learned the basics of threat research and malware analysis.",
  },
];
