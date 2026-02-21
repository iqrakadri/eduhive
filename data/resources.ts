// /data/resources.ts

export interface Resource {
  id: number;
  title: string;
  category: string;
  description: string;
  content: string;
  xpValue: number;
}

export const resources: Resource[] = [
  {
    id: 1,
    title: "DSA Notes",
    category: "Computer Science",
    description: "In-depth guide on Arrays, Linked Lists, and Big O notation.",
    content: "## Data Structures & Algorithms\n\n### 1. Big O Notation\nUnderstanding efficiency is key. Big O describes the upper bound of the execution time.\n- **O(1):** Constant time\n- **O(n):** Linear time\n- **O(log n):** Logarithmic time\n\n### 2. Linked Lists\nA linear data structure where elements are not stored at contiguous memory locations. Each node contains a data field and a reference to the next node.",
    xpValue: 120
  },
  {
    id: 2,
    title: "AI Basics",
    category: "Artificial Intelligence",
    description: "Understanding Neural Networks and Generative AI models.",
    content: "## Introduction to AI\n\nArtificial Intelligence is the simulation of human intelligence by machines. \n\n### Key Concepts:\n- **Neural Networks:** Inspired by the human brain to recognize patterns.\n- **NLP:** Natural Language Processing helps machines understand text.\n- **Generative AI:** Models like GPT that create new content from scratch.",
    xpValue: 150
  },
  {
    id: 3,
    title: "Web Dev Guide",
    category: "Development",
    description: "The 2026 roadmap for Full-stack development with Next.js.",
    content: "## The Modern Web Stack\n\nTo build high-performance apps today, you need more than just HTML/CSS.\n\n- **Frontend:** React 19 and Next.js 15 (App Router).\n- **Backend:** Server Actions and Edge Functions.\n- **Database:** Prisma with PostgreSQL or Drizzle ORM.",
    xpValue: 100
  },
  {
    id: 4,
    title: "Python Cheatsheet",
    category: "Programming",
    description: "Quick reference for syntax, loops, and data manipulation.",
    content: "## Python Quick Reference\n\n### Basics\n```python\n# List Comprehension\nsquares = [x**2 for x in range(10)]\n\n# Dictionary\nuser = {'name': 'Iqra', 'role': 'Developer'}\n```\n### Functions\nUse `def` to define reusable blocks. Always handle exceptions with `try-except` blocks to keep your code robust.",
    xpValue: 80
  },
  {
    id: 5,
    title: "Cybersecurity Intro",
    category: "Security",
    description: "The CIA Triad and basic defense against common attacks.",
    content: "## Cybersecurity Fundamentals\n\n### The CIA Triad\n1. **Confidentiality:** Protecting data from unauthorized access.\n2. **Integrity:** Ensuring data hasn't been tampered with.\n3. **Availability:** Keeping systems accessible.\n\n### Common Threats\n- **Phishing:** Social engineering via email.\n- **DDoS:** Overwhelming a server with traffic.",
    xpValue: 200
  },
  {
    id: 6,
    title: "Machine Learning",
    category: "AI",
    description: "Supervised vs Unsupervised learning and Linear Regression.",
    content: "## Machine Learning 101\n\nML is a subset of AI that allows systems to learn from data without being explicitly programmed.\n\n- **Supervised:** Learning with labeled data (e.g., Spam detection).\n- **Unsupervised:** Finding hidden patterns (e.g., Customer clustering).\n- **Reinforcement:** Learning by trial and error (e.g., Robotics).",
    xpValue: 180
  }
];