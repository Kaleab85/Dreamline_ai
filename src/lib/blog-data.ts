export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  image: string;
  aiHint: string;
  excerpt: string;
  content: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    title: 'Top 10 Scholarships for International Students in 2024',
    slug: 'top-10-scholarships-2024',
    date: '2024-05-15',
    image: 'https://placehold.co/800x450.png',
    aiHint: 'student graduation',
    excerpt: 'Discover the most prestigious and accessible scholarships for students looking to study abroad. Your dream education is within reach!',
    content: `
      <p>Embarking on an international education journey is a transformative experience, but financing it can be a significant hurdle. Fortunately, numerous scholarships are available to help ambitious students like you. Here are ten of the best scholarships for international students in 2024.</p>
      
      <h3 class="text-2xl font-headline font-bold my-4">1. Fulbright Foreign Student Program</h3>
      <p>The Fulbright Program is one of the most prestigious international exchange programs in the world. It offers full funding for graduate students, young professionals, and artists to study and conduct research in the United States.</p>
      
      <h3 class="text-2xl font-headline font-bold my-4">2. Chevening Scholarships</h3>
      <p>Funded by the UK government, Chevening Scholarships enable outstanding emerging leaders from all over the world to pursue one-year master's degrees in any subject at any UK university.</p>
      
      <h3 class="text-2xl font-headline font-bold my-4">3. Australia Awards Scholarships</h3>
      <p>Australia Awards Scholarships are long-term awards administered by the Department of Foreign Affairs and Trade. They aim to contribute to the development needs of Australia's partner countries in line with bilateral and regional agreements.</p>
    `,
    tags: ['scholarships', 'study abroad', 'international students', 'financial aid'],
  },
  {
    title: 'A Step-by-Step Guide to Your Student Visa Application',
    slug: 'student-visa-guide',
    date: '2024-04-22',
    image: 'https://placehold.co/800x450.png',
    aiHint: 'passport visa',
    excerpt: 'Navigating the student visa application process can be daunting. Our comprehensive guide breaks it down into simple, manageable steps.',
    content: `
      <p>The student visa is your golden ticket to studying abroad, but the application process can feel complex and overwhelming. This guide will walk you through each step, ensuring you have the best possible chance of success.</p>
      
      <h3 class="text-2xl font-headline font-bold my-4">Step 1: Receive Your Letter of Acceptance</h3>
      <p>Before you can apply for a visa, you must be accepted into a designated learning institution. Your acceptance letter is the most crucial document for your application.</p>
      
      <h3 class="text-2xl font-headline font-bold my-4">Step 2: Gather Required Documents</h3>
      <p>This typically includes your passport, proof of financial support, passport-size photos, and your acceptance letter. Check the specific requirements for your destination country.</p>

      <h3 class="text-2xl font-headline font-bold my-4">Step 3: Complete the Application Form</h3>
      <p>Fill out the visa application form accurately and completely. Double-check all your information before submitting.</p>
    `,
    tags: ['visa application', 'student visa', 'immigration', 'study abroad'],
  },
  {
    title: '5 Tips for a Smooth Transition to Living Abroad',
    slug: 'smooth-transition-abroad',
    date: '2024-03-10',
    image: 'https://placehold.co/800x450.png',
    aiHint: 'airport departure',
    excerpt: 'Moving to a new country is exciting but challenging. Follow these five essential tips to make your transition as smooth as possible.',
    content: `
      <p>The adventure of living abroad is unparalleled. However, culture shock and logistical challenges are real. Here's how to prepare for a seamless transition.</p>
      
      <h3 class="text-2xl font-headline font-bold my-4">1. Research Your Destination</h3>
      <p>Learn about the local culture, customs, and basic laws. Understanding social etiquette can save you from embarrassing situations.</p>

      <h3 class="text-2xl font-headline font-bold my-4">2. Sort Out Your Finances</h3>
      <p>Inform your bank about your move, and consider opening a local bank account upon arrival for easier access to funds.</p>

      <h3 class="text-2xl font-headline font-bold my-4">3. Stay Connected</h3>
      <p>Set up a reliable way to communicate with family and friends back home. Also, make an effort to build a new social network in your host country.</p>
    `,
    tags: ['travel', 'living abroad', 'culture shock', 'international students'],
  },
  {
    title: 'The Future of Global Education: Trends to Watch',
    slug: 'future-global-education',
    date: '2024-02-18',
    image: 'https://placehold.co/800x450.png',
    aiHint: 'futuristic classroom',
    excerpt: 'The landscape of international education is constantly evolving. We explore the key trends that will shape the experiences of students worldwide.',
    content: `
        <p>Technology and globalization are reshaping education. Here are the key trends to watch.</p>
        <h3 class="text-2xl font-headline font-bold my-4">1. Virtual and Augmented Reality in Classrooms</h3>
        <p>VR and AR are set to make learning more immersive and interactive than ever before.</p>
        <h3 class="text-2xl font-headline font-bold my-4">2. Rise of Micro-credentials</h3>
        <p>Short, specialized courses are becoming a popular alternative to traditional degrees.</p>
    `,
    tags: ['education', 'technology', 'future', 'trends'],
  },
];

export function getBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}
