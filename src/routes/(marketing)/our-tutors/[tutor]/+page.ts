import type { PageLoad } from "./$types"
import { error } from "@sveltejs/kit"

interface Subject {
  name: string
  score: number
  units12: boolean
  units34: boolean
}

interface SocialLink {
  type: "linkedin" | "github" | "youtube" | "instagram" | "website" | "resume"
  url: string
  label: string
}

interface TutorData {
  slug: string
  name: string
  atar: string
  image: string
  email: string
  locations: string[]
  subjects: Subject[]
  nonTutoringSubjects?: string[]
  socialLinks?: SocialLink[]
  bio: string[]
  credentials: {
    title?: string
    items: string[]
  }[]
  prices: string[]
}

const tutorsData: Record<string, TutorData> = {
  eric: {
    slug: "eric",
    name: "Eric Lai",
    atar: "99.30",
    image: "/images/people/eric.jpg",
    email: "eric@axiomeducation.com.au",
    locations: ["Glen Waverley", "CBD", "Online"],
    subjects: [
      { name: "Maths Methods", score: 44, units12: true, units34: true },
      { name: "Specialist Maths", score: 44, units12: true, units34: true },
      { name: "Media", score: 43, units12: true, units34: true },
    ],
    socialLinks: [
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/eric-lai-43a9441bb/",
        label: "LinkedIn",
      },
      {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=A9lrvGfgmd8",
        label: "YouTube",
      },
    ],
    bio: [
      "Hi, I'm Eric! I'm a 2024 VCE graduate who specialises in Maths Methods and Specialist Maths. I also have a profound passion for VCE Media.",
      "As someone with extensive casual tutoring experience, I understand the struggle that many people may face in the final year of VCE. I hope my classes can help you achieve the best study scores possible, while also being fun and exciting!",
      "I believe that Year 12 is more than just about studying, as it can also be an enjoyable last year of high school. I will help you reach your maximum academic potential, or achieve your desired results so that you can focus more on the social aspects of Year 12 — whatever your goal is.",
      "And trust me, I know what it takes to improve your scores. In Year 11, my grades were decent, but nothing to write home about. With a B grade average throughout all of my subjects, I was slaving away doing more and more work only to see no improvements in my results. Then, at the start of Year 12, I discovered that hard work was only half the story. Despite being necessary, it wasn't enough by itself to get me where I needed. Only after discovering the strategies, tips, and tricks that the best high-scorers utilise did I end up soaring past my peers to be ranked within the top 5 in every 3/4 subject I took. I'm here to bring you along the same journey, so join me today to see the start of your VCE success story.",
    ],
    credentials: [
      {
        items: ["Scratch Golfer at 13 Years Old", "300+ Hours of Premiere Pro"],
      },
      {
        title: "Caulfield Grammar Awards",
        items: [
          "The School Prize for Mathematics",
          "The J.W. Twycross Prize for The Arts",
          "Academic General Excellence",
        ],
      },
    ],
    prices: [
      "$65/hour for one-on-one classes",
      "$40/hour for group classes",
      "10% off if you join with a friend! 🤝",
    ],
  },
  garv: {
    slug: "garv",
    name: "Garv Shah",
    atar: "99.50",
    image: "/images/people/garv.jpg",
    email: "garv@axiomeducation.com.au",
    locations: ["Glen Waverley", "CBD", "Online"],
    subjects: [
      { name: "Maths Methods", score: 44, units12: true, units34: true },
      { name: "Specialist Maths", score: 40, units12: true, units34: true },
      { name: "Software Dev", score: 45, units12: false, units34: true },
    ],
    nonTutoringSubjects: [
      "English Language (41)",
      "Physics (41)",
      "Algorithmics (39)",
      "UniMaths (First Class Honours)",
    ],
    socialLinks: [
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/garvshah/",
        label: "LinkedIn",
      },
      {
        type: "github",
        url: "https://github.com/garv-shah",
        label: "GitHub",
      },
      {
        type: "resume",
        url: "https://garv-shah.github.io/resume.pdf",
        label: "Resume",
      },
      {
        type: "website",
        url: "https://garv-shah.github.io/",
        label: "Website",
      },
    ],
    bio: [
      "Hi there!! I'm Garv, nice to meet you :)",
      "Programming and maths are my two biggest passions, and I love linguistics too. Outside of school, I love music (I play the drums/sing) and video-editing, with some published music on Spotify and short films created using my 2013 Panasonic HC-V520M and Premiere Pro.",
      "Having recently finished high school, I know that VCE can be an insane time, but I hope to help you get the absolute best scores you can while still enjoying your subjects (I can't fix your sleep schedule though 😔💔). I've spent the last three years tutoring Methods, Specialist Maths, and SoftDev, so I have plenty of experience under my belt to cater for your learning styles and ability, helping you get one level higher with every lesson we do.",
      "Let's work together to make your VCE journey genuinely rewarding. See you soon!",
    ],
    credentials: [
      {
        items: [
          "Caulfield Grammar Academic Scholarship - Received academic scholarship from years 7 to 12.",
          "Apple Scholarship - One of 300 global students awarded in the Swift Student Challenge, sponsored to attend the Worldwide Developer Conference.",
          "International Mathematical Modelling Challenge - Placed 2nd in Australia for modelling most efficient way to board planes, proceeding to the international finals out of 58 global finalists.",
        ],
      },
    ],
    prices: [
      "$65/hour for one-on-one classes",
      "$40/hour for group classes",
      "10% off if you join with a friend! 🤝",
    ],
  },
  ava: {
    slug: "ava",
    name: "Ava Goldenberg",
    atar: "98.00",
    image: "/images/people/ava.jpg",
    email: "ava@axiomeducation.com.au",
    locations: ["South East", "CBD", "Online"],
    subjects: [
      { name: "Psychology", score: 49, units12: true, units34: true },
      { name: "Literature", score: 43, units12: true, units34: true },
    ],
    bio: [
      "Hey :D! My name is Ava and I am currently enrolled in a Bachelor of Science course at the University of Melbourne. Outside of studying and tutoring, you can find me drawing, devouring a book, or playing video games. However, the majority of the VCE experience remains fresh in my mind. Having just experienced all the stress high school comes with, I've learned what students need to learn and perform their best, and maybe even enjoy their subjects!",
    ],
    credentials: [
      {
        title: "Leadership",
        items: [
          "Australian Government Department of Defence ADF Long Tan Youth Leadership and Teamwork Award",
        ],
      },
      {
        title: "Academics",
        items: [
          "The School Prize for Academic Excellence",
          "Triple Academic Colours re-awarded for performance in the top 5% of the cohort",
        ],
      },
    ],
    prices: [
      "$65/hour for one-on-one classes",
      "$40/hour for group classes",
      "10% off if you join with a friend! 🤝",
    ],
  },
  helen: {
    slug: "helen",
    name: "Helen Yang",
    atar: "99.45",
    image: "/images/people/helen.jpg",
    email: "helen@axiomeducation.com.au",
    locations: ["Boxhill", "Ringwood", "East", "CBD", "Online"],
    subjects: [
      { name: "Accounting", score: 42, units12: true, units34: true },
      { name: "English Language", score: 41, units12: true, units34: true },
    ],
    socialLinks: [
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/hailun-yang-093375259",
        label: "LinkedIn",
      },
    ],
    bio: [
      "Halo!! My name is Helen, a Bachelor of Commerce student at the University of Melbourne and a huuuge music enthusiast (from classical to Kpop 😎🎶).",
      "Having recently completed VCE Accounting while also securing an undergraduate consultant position at a prestigious accounting and advisory firm that is ranked top 10 in Australia, my understanding of accounting concepts will allow me to bring both theoretical knowledge and real-world experience to my tutoring.",
      "I am also very passionate about English Language, and would love to help you not only understand and master the subject for the best scores, but to apply these linguistic strategies to everyday scenarios, boosting your everyday communication skills that will be a lifelong asset.",
      "After tutoring many students myself, as well as being tutored in various places in my own VCE journey, I know exactly what it's like from both ends. I will take the time to understand your unique challenges and tailor our learning to suit your needs. With over 200 hours of tutoring experience, my teaching method focuses on equipping you with the specific skillset required for each SAC and ultimately the final exam, all delivered in a systematic, enjoyable and often funny way.",
      "No matter what your goals are in the VCE journey, I'm here to support you with a personalised roadmap to help you succeed.",
    ],
    credentials: [
      {
        items: [
          "VCE Accounting Subject Prize",
          "Mathematics Captain",
          "Melbourne University Kwong Lee Dow Young Scholar",
        ],
      },
    ],
    prices: [
      "$65/hour for one-on-one classes",
      "$40/hour for group classes",
      "10% off if you join with a friend! 🤝",
    ],
  },
}

export const load = (({ params }) => {
  const tutor = tutorsData[params.tutor]

  if (!tutor) {
    throw error(404, {
      message: "Tutor not found",
    })
  }

  return {
    tutor,
  }
})
