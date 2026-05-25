export interface Project {
  id: string;
  title: string;
  category: string;
  tools: string;
  image: string;
  alt: string;
  link: string;
}

export const projects: Project[] = [
  {
    id: "01",
    title: "ASICO WhatsApp Bot",
    category: "CRM & Automation",
    tools: "Node.js, Express, MySQL, Socket.IO, WhatsApp API",
    image: "/images/placeholder.webp",
    alt: "ASICO WhatsApp Bot",
    link: "https://github.com/ShoaibAhmedSoomro",
  },
  {
    id: "02",
    title: "Interactive Resume NextGen",
    category: "Portfolio & Resume",
    tools: "React 19, GSAP, Framer Motion, Three.js, Tailwind",
    image: "/images/placeholder.webp",
    alt: "Interactive Resume",
    link: "https://github.com/ShoaibAhmedSoomro",
  },
  {
    id: "03",
    title: "High-Performance Portfolio",
    category: "Web Development",
    tools: "Next.js, TypeScript, React, Tailwind, Three.js",
    image: "/images/placeholder.webp",
    alt: "Portfolio",
    link: "https://github.com/ShoaibAhmedSoomro",
  },
];
