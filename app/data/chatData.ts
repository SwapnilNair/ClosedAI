// Types
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  preview: string;
  messages: Message[];
}

export interface QAPair {
  question: string;
  answer: string;
  keywords: string[];
}

// Predefined Q&A pairs
export const qaPairs: QAPair[] = [
  {
    question: "Who are you and What is this?",
    answer: "This is a personal shenanigan",
    keywords: ["who", "what", "site", "website"]
  },
  {
    question: "What is Swapnil working on?",
    answer: "",
    keywords: ["working", "projects", "current", "now", "doing"]
  },
  {
    question: "What technologies does Swapnil use?",
    answer: "",
    keywords: ["tech", "stack", "technologies", "tools", "languages", "framework"]
  },
  {
    question: "Tell me about Swapnil's background",
    answer: "I'm a software engineer passionate about building innovative web applications and solving complex problems. I have a strong foundation in computer science and have been coding for several years. I love exploring new technologies, contributing to open-source, and sharing knowledge with the developer community.\n\nMy journey in tech started with curiosity about how websites work, and it's evolved into a career where I get to build products that make a difference. I'm particularly interested in AI, full-stack development, and creating delightful user experiences.",
    keywords: ["background", "about", "who", "bio", "story", "introduction"]
  },
  {
    question: "What are Swapnil's best projects?",
    answer: "Here are some of my favorite projects:\n\n**1. ClosedAI Portfolio** - This ChatGPT-inspired personal website you're looking at! Built with Next.js, React, and Tailwind CSS.\n\n**2. Full-Stack E-Commerce Platform** - A scalable online marketplace with payment integration, real-time inventory, and admin dashboard.\n\n**3. AI-Powered Content Generator** - A tool that uses GPT models to help creators generate blog posts, social media content, and more.\n\n**4. Developer Tools Library** - A collection of useful utilities and components for React developers.\n\nEach project taught me valuable lessons about scalability, user experience, and clean code architecture!",
    keywords: ["projects", "best", "portfolio", "work", "built", "created"]
  },
  {
    question: "How can I contact Swapnil?",
    answer: "I'd love to hear from you! Here are the best ways to reach me:\n\n• **Email**: swapnilnair747@gmail.com\n• **GitHub**: github.com/swapnilnair\n• **LinkedIn**: linkedin.com/in/swapnilnair1\n• **Twitter**: @swapnilnair\n\nFeel free to reach out for collaborations, questions, or just to chat about tech! I usually respond within a day or two.",
    keywords: ["contact", "email", "reach", "get in touch", "message", "talk"]
  },
  {
    question: "What is Swapnil's experience?",
    answer: "",
    keywords: ["experience", "work", "career", "professional", "job", "history"]
  },
  {
    question: "What are Swapnil's interests?",
    answer: "Beyond coding, I'm passionate about:\n\n• **Tech Trends**: Following AI developments, web3, and emerging technologies\n• **Open Source**: Contributing to projects and helping the developer community\n• **Writing**: Sharing technical articles and tutorials\n• **Learning**: Always exploring new frameworks, languages, and paradigms\n• **Problem Solving**: Competitive programming and algorithmic challenges\n• **Design**: Creating beautiful, user-friendly interfaces\n\nI believe in continuous learning and staying curious!",
    keywords: ["interests", "hobbies", "like", "enjoy", "passion", "love"]
  },
  {
    question: "What is Swapnil's education?",
    answer: "I hold a Bachelor's degree in Computer Science, where I developed a strong foundation in:\n\n• Data Structures & Algorithms\n• Software Engineering principles\n• Database Systems\n• Computer Networks\n\nBeyond formal education, I'm a strong believer in self-learning. I've completed numerous online courses, attended tech conferences, and constantly learn from real-world projects. I find it incredibly exciting to keep up with the bleeding edge of tech, and moving fast and breaking things has become a way of life. ",
    keywords: ["education", "degree", "school", "university", "study", "learn"]
  },
  {
    question: "Does Swapnil do freelance work?",
    answer: "Not really, my focus is currently on building Aurva and myself, but if you need someone to bounce ideas off of or have deep discussions on tech, life, quizzes, history absolutely hit me up on instagram or email",
    keywords: ["freelance", "hire", "available", "consulting", "contract", "work with"]
  },
  {
    question: "What makes Swapnil stand out?",
    answer: "What sets me apart:\n\n**1. Full-Stack Versatility** - Comfortable across the entire stack, from UI/UX to database optimization.\n\n**2. Product Mindset** - I don't just write code; I think about user experience, business goals, and long-term maintainability.\n\n**3. Fast Learner** - I can quickly adapt to new technologies and codebases.\n\n**4. Clear Communication** - I believe great software requires great teamwork and documentation.\n\n**5. Attention to Detail** - I care about code quality, performance, and edge cases.\n\nI'm not just looking to build features—I want to build the *right* features, the *right* way.",
    keywords: ["stand out", "unique", "different", "special", "why", "strengths"]
  }
];

// Suggested questions
export const suggestedQuestions = [
  "Who are you and What is this?",
  "Tell me about Swapnil's background",
  "How can I contact Swapnil?",
  "What is Swapnil working on?",
  "What are Swapnil's best projects?",
  "What technologies does Swapnil use?",
];

// Predefined conversations (sidebar items)
export const conversations: Conversation[] = [
  {
    id: "about",
    title: "About Me",
    preview: "Learn about my background and experience",
    messages: [
      {
        id: "1",
        role: "user",
        content: "Tell me about Swapnil's background",
        timestamp: new Date()
      },
      {
        id: "2",
        role: "assistant",
        content: qaPairs.find(qa => qa.question === "Tell me about Swapnil's background")!.answer,
        timestamp: new Date()
      }
    ]
  },
  {
    id: "projects",
    title: "Projects",
    preview: "Explore my best work and creations",
    messages: [
      {
        id: "1",
        role: "user",
        content: "What are Swapnil's best projects?",
        timestamp: new Date()
      },
      {
        id: "2",
        role: "assistant",
        content: qaPairs.find(qa => qa.question === "What are Swapnil's best projects?")!.answer,
        timestamp: new Date()
      }
    ]
  },
  {
    id: "tech-stack",
    title: "Tech Stack",
    preview: "Technologies and tools I use",
    messages: [
      {
        id: "1",
        role: "user",
        content: "What technologies does Swapnil use?",
        timestamp: new Date()
      },
      {
        id: "2",
        role: "assistant",
        content: qaPairs.find(qa => qa.question === "What technologies does Swapnil use?")!.answer,
        timestamp: new Date()
      }
    ]
  },
  {
    id: "experience",
    title: "Experience",
    preview: "Professional background and achievements",
    messages: [
      {
        id: "1",
        role: "user",
        content: "What is Swapnil's experience?",
        timestamp: new Date()
      },
      {
        id: "2",
        role: "assistant",
        content: qaPairs.find(qa => qa.question === "What is Swapnil's experience?")!.answer,
        timestamp: new Date()
      }
    ]
  },
  {
    id: "contact",
    title: "Contact",
    preview: "Get in touch with me",
    messages: [
      {
        id: "1",
        role: "user",
        content: "How can I contact Swapnil?",
        timestamp: new Date()
      },
      {
        id: "2",
        role: "assistant",
        content: qaPairs.find(qa => qa.question === "How can I contact Swapnil?")!.answer,
        timestamp: new Date()
      }
    ]
  }
];

// Social links
export const socialLinks = [
  {
    name: "Email",
    url: "mailto:swapnilnair747@gmail.com",
    icon: "email"
  },
  {
    name: "GitHub",
    url: "https://github.com/swapnilnair",
    icon: "github"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/swapnilnair1",
    icon: "linkedin"
  },
  {
    name: "Twitter",
    url: "https://twitter.com/swapnilnair",
    icon: "twitter"
  }
];

// Function to find best matching Q&A
export function findBestMatch(userQuestion: string): QAPair | null {
  const lowerQuestion = userQuestion.toLowerCase();

  // First, try exact match
  const exactMatch = qaPairs.find(qa =>
    qa.question.toLowerCase() === lowerQuestion
  );
  if (exactMatch) return exactMatch;

  // Then, try keyword matching
  const keywordMatches = qaPairs.filter(qa =>
    qa.keywords.some(keyword => lowerQuestion.includes(keyword.toLowerCase()))
  );

  if (keywordMatches.length > 0) {
    // Return the one with most keyword matches
    return keywordMatches.sort((a, b) => {
      const aMatches = a.keywords.filter(k => lowerQuestion.includes(k.toLowerCase())).length;
      const bMatches = b.keywords.filter(k => lowerQuestion.includes(k.toLowerCase())).length;
      return bMatches - aMatches;
    })[0];
  }

  return null;
}

// Fallback response
export const fallbackResponse = "Hmm, I'm not trained on that yet! 🤔 Try asking me about:\n\n• My current projects\n• Tech stack and skills\n• Professional experience\n• How to get in touch\n• My interests and background";
