import React from 'react';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'The Future of E-Learning: AI and Personalization',
    excerpt: 'Discover how artificial intelligence is transforming online education through personalized learning experiences.',
    author: 'Sarah Johnson',
    date: 'March 15, 2024',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 2,
    title: 'Best Practices for Remote Learning Success',
    excerpt: 'Learn effective strategies for maximizing your remote learning experience and staying motivated.',
    author: 'Michael Chen',
    date: 'March 12, 2024',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 3,
    title: 'HR Trends in Educational Technology',
    excerpt: 'Explore the latest trends in HR management within the educational technology sector.',
    author: 'Emily Rodriguez',
    date: 'March 10, 2024',
    category: 'HR',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            EduMaster Pro Blog
          </h1>
          <p className="mt-6 text-xl text-white/80">
            Insights, tips, and trends in e-learning and HR management
          </p>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-airbnb hover:shadow-airbnb-hover transition-all overflow-hidden group"
            >
              <div className="relative h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 text-sm font-medium bg-white/90 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-semibold text-dark group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="mt-3 text-light">{post.excerpt}</p>
                
                <div className="mt-4 flex items-center justify-between text-sm text-light">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.date}
                  </div>
                </div>

                <button className="mt-6 flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform">
                  Read More
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}