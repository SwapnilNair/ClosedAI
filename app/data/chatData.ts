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
    question: "Who are you. What is this?",
    answer: "Hey! I'm Swapnil Nair, a 23 year old engineer from Bangalore working at Aurva Inc. I build data security products, love quizzing and debates, and apparently think regular portfolios are boring - hence this ChatGPT - inspired site. ( That should also tell you that I consider myself a fantastic comedian ) I'm a problem solver who moves fast, breaks things (occasionally), and fixes them even faster. Ask me anything!",
    keywords: ["who", "site", "website"]
  },
  {
    question: "What do you do",
    answer: "I'm an engineer at Aurva Inc, a data security company based in California but working out of Bangalore. We power some of India's top fintechs like Razorpay, PayTM, and several banks. I work primarily with Golang, databases, and cloud systems - building products that help secure sensitive data across cloud and on-prem environments. It doesn't really feel like work because I would have done something like this anyway, but now I get paid for it. Incredible isn't it ?",
    keywords: ["do", "work", "job", "career", "aurva"]
  },
  {
    question: "Tell me about Aurva",
    answer: "Aurva (aurva.io) is building data security infrastructure for India. We're a California-based company operating out of Bangalore, and we power security for some of India's biggest fintechs and banks. I've been here for two years now - joined a semester early since I finished my credits ahead of schedule. It's been an incredible journey building enterprise security products from scratch! I've been here as their first intern, and it has been grounding to realize how much effort, patience and perseverance goes into building a startup. As an engineer I've always been blinded by just building something that is 'exciting', and not always functional. This place has taught me that solving a problem is much more important than building something shiny.",
    keywords: ["aurva", "company", "work", "startup"]
  },
  {
    question: "What is Swapnil working on?",
    answer: "**Right now at Aurva:** Architecting AIOStack - our newest product for AI observability in Kubernetes. Think non-intrusive discovery for all AI workloads in the cloud. I'm handling everything from backend to Helm deployments, CI/CD pipelines, and airgapped validation systems. The goal? Make it the defacto standard after any AI install in k8s. No pressure.\n\n**Side quests:** Built this ChatGPT-looking website because regular portfolios are for cowards. Also plotting to build an LLM from scratch someday - Andrej Karpathy and Claude Code got me hooked and now I need to understand how these things actually work under the hood.\n\n**General obsessions:** Anything tech, software or hardware (it's not work if you love it), databases and their protocols, and figuring out how to break and secure cloud infrastructure. I recently read about the Shadow Brokers and I'm both awed and terrified, and want to learn more. Mossad if you're reading this, can I get a beginner's crash course from you guys.",
    keywords: ["working", "projects", "current", "now", "doing"]
  },
  {
    question: "What technologies does Swapnil use?",
    answer: "Primarily Golang, databases and cloud systems (AWS, GCP, Azure). I worked extensively with Kubernetes, Helm charts and CI pipelines of late. I've worked a lot with python, AWK and sed for data processing too. Don't be fooled by just the software, I'm a huge hardware geek and love to assemble PCs too. I've built everything from Finite State Machines for database protocols to distributed systems for security monitoring. I also deal with customer deployments directly, which has taught me a ton about E2E sales ( I have so much to learn there ) and real-world enterprise requirements.",
    keywords: ["tech", "stack", "technologies", "tools", "languages", "framework"]
  },
  {
    question: "Tell me about Swapnil's background",
    answer: "I'm a software engineer passionate about building innovative web applications and solving complex problems. I have a strong foundation in computer science and have been coding for several years. I love exploring new technologies, contributing to open-source, and sharing knowledge with the developer community.\n\nMy journey in tech started with curiosity about how websites work, and it's evolved into a career where I get to build products that make a difference. I'm particularly interested in AI, full-stack development, and creating delightful user experiences.",
    keywords: ["background", "about", "who", "bio", "story", "introduction"]
  },
  {
    question: "What are Swapnil's best projects?",
    answer: "Here are some of my favorite projects:\n\n**At Aurva:**\n• **AIOStack** - Architected a non-intrusive AI discovery and observability platform for Kubernetes. Built the backend, Helm deployments, CI/CD pipelines, and airgapped validation systems.\n• **DSPM Product** - Instrumental in building our Data Security Posture Management product that powers India's top fintechs.\n• **Database Access Monitoring** - Built Finite State Machines from scratch to parse and monitor database protocols for security threats.\n• **Cloud IAM Static Analysis** - Created a vertical for analyzing AWS, GCP, and Azure IAM to detect insider and infiltration threats.\n\n**From College:**\n• **Yggdrasil** - An Apache Kafka and Zookeeper clone built from scratch.\n• **ConFederate** - Federated learning system to analyze data and train models in a distributed system with zero data transfer.\n• **McFlAi** - On-time performance dashboard for airlines using Spark and Kafka.\n• **PageRank Implementation** - Google's PageRank algorithm using the MapReduce model in Python.\n• **HyperShift** - Take photos and videos at events without worrying about device memory.\n• **A.R.E.S** - A Rather Emotionally Supportive System using GPT-3 that you can actually talk to.\n• **SafariFox** - Firefox mod to make it look like Safari from WWDC 2021.\n• **CodeX** - Terminal text editor built with C++ and Python.\n• **PineappleMusic** - Stream music at atrocious quality over UDP sockets. Works only half the time (feature, not a bug).",
    keywords: ["projects", "best", "portfolio", "work", "built", "created"]
  },
  {
    question: "How can I contact Swapnil?",
    answer: "I'd love to hear from you! Here are the best ways to reach me:\n\n• **Email**: swapnilnair747@gmail.com\n• **GitHub**: github.com/swapnilnair\n• **LinkedIn**: linkedin.com/in/swapnilnair1\n• **Twitter**: @swapnilnair\n\nFeel free to reach out for collaborations, questions, or just to chat about tech! I usually respond within a day or two.",
    keywords: ["contact", "email", "reach", "get in touch", "message", "talk"]
  },
  {
    question: "What is Swapnil's experience?",
    answer: `**Professional Journey:**\n• **Aurva Inc** (2 years) - Started as an engineer, got promoted twice  (honestly still figuring out what my designation is - I call myself the Chief Intern Officer since I deal with hiring and interns).Now I'm architecting products like AIOStack, handling customer deployments, and building security infrastructure for India's top fintechs and banks. The growth has been wild.\n• **Fidelity Investments** (2 months, SRE Team) - Built a compliance tool for images and deployments that cut time and effort by ~80%. Loved it there, the people were fantastic, but I had to get out of my comfort zone and try something new.\n\n**The Growth Trajectory:** Two years, two promotions, and I've gone from writing code to architecting entire products. Built database protocolparsers with FSMs, cloud-native AI observability platforms, and dealt with actual production systems at banks. The pace has been absolutely insane - in the best way possible.\n\n**Beyond Work:**\n• Former Head of Quiz Club Committee(QQC)\n• Member of Karnataka Quiz Association  \n• Dabbled in debating\n• Want to learn Morse code and get a HAM radio license (found a place in Bangalore!)\n• Always learning - currently obsessed with building an LLM from scratch`,
    keywords: ["experience", "work", "career", "professional", "job", "history", "promoted", "growth", "fidelity"]
  },
  {
    question: "What are Swapnil's interests?",
    answer: "where do I start? I'm basically a curiosity vending machine. Tech and engineering (obviously - it's literally my job). Reading voraciously - 16 books this year on business case studies, autobiographies, and mythology-inspired fiction. Quizzing competitively because apparently knowing random facts is a sport. I'm fascinated by design, advertising, business strategy, and statistics (yes, I'm fun at parties). I also have a weird soft spot for chemistry and history - the kind of subjects that make you go 'wait, THAT'S how that happened?!' I want to learn get a HAM radio license, and build an LLM from scratch because Andrej Karpathy is an aweosome teacher. I also get myself into the weirdest of scenarios, so that gives me a plethora of tales to enchant you. My friends call me a generalist, I call it having commitment issues with hobbies.",
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
    answer: "human, not just an engineer, jack of all trades, opens my worldview to be interdisciplinary, always open to questioning everything",
    keywords: ["stand out", "unique", "different", "special", "why", "strengths"]
  },
  {
    question: "Have you worked with customers?",
    answer: "Yes! I deal with customers directly quite frequently. It's given me invaluable insight into how E2E sales and deployments actually work - not just the theory, but the messy reality of enterprise requirements, compliance needs, and production constraints. I've personally worked on cloud and on-prem deployments at a medium-sized bank, which taught me more about real-world systems ( and honestly how slow and rigid they can be )than any textbook could.",
    keywords: ["customers", "sales", "deployments", "client", "enterprise"]
  },
  {
    question: "What are your interests outside of tech?",
    answer: "I'm an avid reader - knocked out 16 books this year, mostly business case studies, autobiographies, and mythology-inspired novellas. I'm still active in the quizzing circuit (former head of QQC, member of Karnataka Quiz Association). I want to learn Morse code and get a HAM radio license someday - actually found a place in Bangalore that does it! Oh, and I'm fascinated by LLMs and want to build one from scratch because I believe that is what the future will be built around",
    keywords: ["interests", "hobbies", "reading", "books", "ham", "quiz"]
  },
  {
    question: "Tell me about your quizzing background",
    answer: "Quizzing has been instrumental in shaping how I think! I was the former head of QQC (The Quotient Quiz Club). The lateral thinking and pattern recognition skills from quizzing directly translate to how I approach engineering problems - connecting dots that seem unrelated, thinking creatively under pressure, and rapid problem-solving. It's basically cross-training for the brain across seemingly random subjects",
    keywords: ["quiz", "quizzing", "qqc", "karnataka", "association"]
  },
  {
    question: "Tell me something fun about you",
    answer: "I want to learn Morse code and get a HAM radio license - found a place in Bangalore that does training! I'm also determined to build an LLM from scratch someday because I'm crazy like that. Oh, and I built this entire website to look like ChatGPT because regular portfolios are boring. I have an interest in chemistry, history and random trivia but also art and advertising oddly enough. I'm in awe of how some campaigns quite literally change the fate of companies and the lasting impact it has on society.  I move fast, break things, and occasionally call myself a comedian (my friends would debate that claim).",
    keywords: ["fun", "interesting", "funny", "cool", "hobby"]
  },
  {
    question: "What's your approach to problem-solving?",
    answer: "I tackle problems by moving fast and iterating quickly. My quizzing background taught me to think laterally and connect seemingly unrelated concepts. I don't wait for perfect solutions - I build, test, learn, and iterate. Sometimes ( this is an understatement ) I underestimate complexity (working on that!), but it means I'm never afraid to tackle ambitious projects. I build at unprecedente pace, but I still need to work on taking stuff across the finish line cause I can get bored really quick.",
    keywords: ["approach", "solve", "problem", "method", "philosophy"]
  },
  {
    question: "What's AIOStack?",
    answer: "AIOStack is our newest product - a non-intrusive discovery and observability tool for all AI workloads in the cloud. The goal is to make it the defacto standard after any AI installation in Kubernetes. I architected the platform (with a lot of guidance from my lead architect Akash), handled backend development, Helm deployments, CI/CD pipelines, airgapped product validation keys, and long-term log stores. It's ambitious, left me stumped for a while and really put to test how I handle teams but that's how I like my projects! Go check it out at https://aurva.ai , it's free !",
    keywords: ["aiostack", "ai", "kubernetes", "observability", "newest"]
  },
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
