export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  time: string;
  category: string;
  featured?: boolean;
}

export const newsData: NewsItem[] = [
  {
    id: 1,
    title: "India's Economic Growth Surpasses Expectations in Q3",
    excerpt: "The Indian economy has shown remarkable resilience with GDP growth reaching 7.2% in the third quarter, exceeding all analyst predictions and marking the highest growth rate in the region.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: "Rajesh Kumar",
    time: "2 hours ago",
    category: "Business",
    featured: true
  },
  {
    id: 2,
    title: "Historic Space Mission Launches from Sriharikota",
    excerpt: "ISRO successfully launches Chandrayaan-4 mission, marking another milestone in India's space exploration journey with advanced lunar research capabilities.",
    image: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: "Dr. Priya Sharma",
    time: "4 hours ago",
    category: "Technology"
  },
  {
    id: 3,
    title: "Cricket World Cup: India Defeats Australia in Thrilling Final",
    excerpt: "In a nail-biting finish, Team India clinches the Cricket World Cup with a 6-wicket victory over Australia, sending millions of fans into celebration.",
    image: "https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: "Suresh Menon",
    time: "6 hours ago",
    category: "Sports"
  },
  {
    id: 4,
    title: "New Education Policy Shows Promising Results",
    excerpt: "The National Education Policy 2020 implementation shows significant improvement in student enrollment and learning outcomes across rural areas.",
    image: "https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: "Meera Patel",
    time: "8 hours ago",
    category: "Education"
  },
  {
    id: 5,
    title: "Bollywood Star Announces Retirement from Acting",
    excerpt: "Veteran actor announces retirement after 40 years in the film industry, leaving behind a legacy of memorable performances and cultural impact.",
    image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: "Kavya Singh",
    time: "10 hours ago",
    category: "Entertainment"
  },
  {
    id: 6,
    title: "Climate Change Summit: India Pledges Carbon Neutrality",
    excerpt: "At the global climate summit, India announces ambitious plans to achieve carbon neutrality by 2070, with massive renewable energy investments.",
    image: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: "Arjun Reddy",
    time: "12 hours ago",
    category: "Environment"
  },
  {
    id: 7,
    title: "Healthcare Revolution: AI-Powered Diagnosis System",
    excerpt: "Indian researchers develop groundbreaking AI system that can diagnose diseases with 95% accuracy, revolutionizing healthcare accessibility.",
    image: "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: "Dr. Anita Gupta",
    time: "14 hours ago",
    category: "Health"
  },
  {
    id: 8,
    title: "Election Commission Announces Voting Reforms",
    excerpt: "Major electoral reforms announced including digital voting trials and enhanced security measures to ensure transparent democratic processes.",
    image: "https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: "Vikram Joshi",
    time: "16 hours ago",
    category: "Politics"
  },
  {
    id: 9,
    title: "Startup Ecosystem Reaches New Heights",
    excerpt: "India's startup ecosystem achieves record funding of $50 billion this year, with unicorns emerging across fintech, edtech, and healthtech sectors.",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: "Neha Agarwal",
    time: "18 hours ago",
    category: "Business"
  }
];

export const getNewsByCategory = (category: string): NewsItem[] => {
  return newsData.filter(news => news.category.toLowerCase() === category.toLowerCase());
};

export const getFeaturedNews = (): NewsItem[] => {
  return newsData.filter(news => news.featured);
};

export const getLatestNews = (limit: number = 5): NewsItem[] => {
  return newsData.slice(0, limit);
};