export type Category = 
  | 'Tamil Storytelling' 
  | 'Malayalam Podcasts' 
  | 'Voice Acting' 
  | 'Audiobooks' 
  | 'OTT Content' 
  | 'E-Learning'
  | 'Hindi Dubbing'
  | 'English Narration';

export interface Work {
  id: string;
  title: string;
  description: string;
  filename: string;
  language: 'Hindi' | 'English' | 'Tamil' | 'Malayalam' | 'Jingles';
  audio: string;
  duration?: string;
  year?: string;
  featured?: boolean;
  category: Category;
}

export const works: Work[] = [
  // Hindi Works
  {
    id: 'h1',
    title: 'The Dark Knight Returns',
    description: 'Hindi dubbing for the iconic Batman animated series.',
    filename: 'Hindi dub.mp3',
    language: 'Hindi',
    audio: '/audio/Hindi/Hindi dub.mp3',
    year: '2023',
    featured: true,
    category: 'Hindi Dubbing',
  },
  {
    id: 'h2',
    title: 'Kahani Sunao',
    description: 'Award-winning podcast series exploring untold stories from the heart of India.',
    filename: 'podcast.hindi.mp3',
    language: 'Hindi',
    audio: '/audio/Hindi/podcast.hindi.mp3',
    year: '2023',
    category: 'Malayalam Podcasts', // Categorized as Podcast
  },
  {
    id: 'h3',
    title: 'Dragon Ball Super',
    description: 'Official Hindi voice for lead characters in the popular anime series.',
    filename: 'movie dub_hindi.mp3',
    language: 'Hindi',
    audio: '/audio/Hindi/movie dub_hindi.mp3',
    year: '2022',
    category: 'Hindi Dubbing',
  },
  {
    id: 'h4',
    title: 'Hindi Commercial Ad',
    description: 'Professional voice for national Hindi television commercials.',
    filename: 'Add hindi.mp3',
    language: 'Hindi',
    audio: '/audio/Hindi/Add hindi.mp3',
    year: '2024',
    category: 'Voice Acting',
  },

  // English Works
  {
    id: 'e2',
    title: 'The Voice Within',
    description: 'A weekly English podcast discussing mental health and personal growth.',
    filename: 'Podcast.eng.mp3',
    language: 'English',
    audio: '/audio/English/Podcast.eng.mp3',
    year: '2022-Present',
    category: 'Malayalam Podcasts', // Categorized as Podcast
  },
  {
    id: 'e3',
    title: 'Corporate Training Modules',
    description: 'Instructional voice-over for Fortune 500 companies.',
    filename: 'coprporate.add.eng.mp3',
    language: 'English',
    audio: '/audio/English/coprporate.add.eng.mp3',
    year: '2023',
    category: 'E-Learning',
  },
  {
    id: 'e4',
    title: 'Emirates Voice Ad',
    description: 'Premium brand commercial for international broadcast.',
    filename: 'Emirates. Corporate add.mp3',
    language: 'English',
    audio: '/audio/English/Emirates. Corporate add.mp3',
    year: '2022',
    category: 'Voice Acting',
  },
  {
    id: 'e5',
    title: 'News Broadcast',
    description: 'Formal English news delivery for international audiences.',
    filename: 'news.mp3',
    language: 'English',
    audio: '/audio/English/news.mp3',
    year: '2023',
    category: 'English Narration',
  },
  {
    id: 'e6',
    title: 'Global Wildlife Documentary',
    description: 'Narrating the wonders of the natural world for global streaming.',
    filename: 'documentary.english.mp3',
    language: 'English',
    audio: '/audio/English/documentary.english.mp3',
    year: '2024',
    category: 'English Narration',
  },

  // Tamil Works
  {
    id: 't1',
    title: 'Tamil Movie Dubbing (B)',
    description: 'Re-dubbing select classic Tamil films for global platforms.',
    filename: 'movie dub.tamil.mp3',
    language: 'Tamil',
    audio: '/audio/Tamil/movie dub.tamil.mp3',
    year: '2023',
    featured: true,
    category: 'OTT Content',
  },
  {
    id: 't2',
    title: 'Chelsea Chronicles Ad',
    description: 'Cultural voice ad exploring the heritage of Chennai.',
    filename: 'corporate add tamil.mp3',
    language: 'Tamil',
    audio: '/audio/Tamil/corporate add tamil.mp3',
    year: '2023',
    category: 'Voice Acting',
  },
  {
    id: 't3',
    title: 'Tamil Movie Dubbing (A)',
    description: 'Main lead voice performances for high-budget Tamil cinematic releases.',
    filename: 'movie dub_tamil.mp3',
    language: 'Tamil',
    audio: '/audio/Tamil/movie dub_tamil.mp3',
    year: '2023',
    category: 'OTT Content',
  },
  {
    id: 't4',
    title: 'Kids Story Tamil',
    description: 'Engaging narration for children\'s educational content.',
    filename: 'kids story tamil.mp3',
    language: 'Tamil',
    audio: '/audio/Tamil/kids story tamil.mp3',
    year: '2021-Present',
    category: 'Tamil Storytelling',
  },
  {
    id: 't5',
    title: 'Tamil Brand Ad (A)',
    description: 'Premium voice for Tamil television commercials.',
    filename: 'Add.tamil 2.mp3',
    language: 'Tamil',
    audio: '/audio/Tamil/Add.tamil 2.mp3',
    year: '2024',
    category: 'Voice Acting',
  },
  {
    id: 't6',
    title: 'Tamil Brand Ad (B)',
    description: 'Energetic voice for cultural brand awareness projects.',
    filename: 'Add.tamil.mp3',
    language: 'Tamil',
    audio: '/audio/Tamil/Add.tamil.mp3',
    year: '2024',
    category: 'Voice Acting',
  },
  {
    id: 't7',
    title: 'Tamil Radio Jockey',
    description: 'Vibrant RJ hosting for popular Tamil FM stations.',
    filename: 'rj.tamil.mp3',
    language: 'Tamil',
    audio: '/audio/Tamil/rj.tamil.mp3',
    year: '2024',
    category: 'Voice Acting',
  },

  // Malayalam Works
  {
    id: 'm1',
    title: 'Malayalam Film Dubbing',
    description: 'Expert voice-over for Malayalam feature films.',
    filename: 'movie dub_malayalam.mp3',
    language: 'Malayalam',
    audio: '/audio/Malayalam/movie dub_malayalam.mp3',
    year: '2023',
    featured: true,
    category: 'OTT Content',
  },
  {
    id: 'm2',
    title: 'Malayalam Serial',
    description: 'Consistent character voice work for leading Malayalam television soaps.',
    filename: 'Malayalam serial.mp3',
    language: 'Malayalam',
    audio: '/audio/Malayalam/Malayalam serial.mp3',
    year: '2023',
    category: 'OTT Content',
  },
  {
    id: 'm3',
    title: 'Malayalam Brand Ad',
    description: 'Clear and engaging voice for Malayalam commercials.',
    filename: 'Add_malayalam.mp3',
    language: 'Malayalam',
    audio: '/audio/Malayalam/Add_malayalam.mp3',
    year: '2024',
    category: 'Voice Acting',
  },
  {
    id: 'm4',
    title: 'Malayalam Radio Host',
    description: 'Engaging narration and hosting for Malayalam radio programmes.',
    filename: 'rj 01.malayalam.mp3',
    language: 'Malayalam',
    audio: '/audio/Malayalam/rj 01.malayalam.mp3',
    year: '2024',
    category: 'Voice Acting',
  },

  // Jingles
  {
    id: 'j1',
    title: 'Brand Jingle 1',
    description: 'Catchy and engaging jingle for brand identity.',
    filename: 'AUD-20260409-WA0005.mp3',
    language: 'Jingles',
    audio: '/audio/Jingles/AUD-20260409-WA0005.mp3',
    year: '2024',
    category: 'Voice Acting',
  },
  {
    id: 'j2',
    title: 'Brand Jingle 2',
    description: 'Professional commercial jingle production.',
    filename: 'AUD-20260409-WA0006.mp3',
    language: 'Jingles',
    audio: '/audio/Jingles/AUD-20260409-WA0006.mp3',
    year: '2024',
    category: 'Voice Acting',
  },
];

export const getWorksByLanguage = (language: Work['language']) => 
  works.filter(work => work.language === language);

export const getWorksByCategory = (category: Category) => 
  works.filter(work => work.category === category);

export const getFeaturedWorks = () => 
  works.filter(work => work.featured);
