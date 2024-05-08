import { useState, useEffect } from "react";
import Link from "next/link";
import { getToken } from "../utils/auth";

interface Post {
  _id: string;
  title: string;
  meta?: string;
  keywords: string[];
  shortDescription: string;
  image?: string;
  content: string;
  author: string;
  createdAt: string;
  slug: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/posts");
      if (!response.ok) {
        throw Error("Could not fetch data from server");
      }
      const data = await response.json();
      setPosts(data.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'numeric', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.slug} className="bg-white shadow-md rounded-lg overflow-hidden">
            {post.image && (
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover object-center" />
            )}
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{post.shortDescription}</p>
              <p className="text-gray-600 text-sm mb-2">Created At: {formatDate(post.createdAt)}</p>
              <p className="text-gray-600 text-sm mb-2">Meta: {post.meta}</p>
              <p className="text-gray-600 text-sm mb-2">Keywords: {post.keywords.join(", ")}</p>
              <Link href={`/posts/${post.slug}`}>
                <button className="text-blue-500 hover:underline">Read more</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
