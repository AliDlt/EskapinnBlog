import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuth } from "../../../utils/auth";

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

export default function EditPost() {
  const router = useRouter();
  const { getToken } = useAuth();
  const { slug } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [meta, setMeta] = useState("");
  const [keywords, setKeywords] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${slug}`);
        const postData = response.data.data.post;
        setPost(postData);
        setTitle(postData.title);
        setMeta(postData.meta || '');
        setKeywords(postData.keywords.join(', ') || '');
        setShortDescription(postData.shortDescription);
        setImage(postData.image || '');
        setContent(postData.content);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      await axios.patch(
        `http://localhost:5000/api/posts/${slug}`,
        { title, meta, keywords: keywords.split(',').map(keyword => keyword.trim()), shortDescription, image, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push(`/posts/${slug}`);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      {post ? (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
          <h1 className="text-3xl font-bold mb-4 text-black">Edit Post</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-black">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-black p-2 mb-3 mt-3 border-black rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="meta" className="block text-black">Meta</label>
              <input
                type="text"
                id="meta"
                value={meta}
                onChange={(e) => setMeta(e.target.value)}
                className="w-full text-black p-2 mb-3 mt-3 border-black rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="keywords" className="block text-black">Keywords (comma-separated)</label>
              <input
                type="text"
                id="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full text-black p-2 mb-3 mt-3 border-black rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="shortDescription" className="block text-black">Short Description</label>
              <textarea
                id="shortDescription"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full border-black rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black p-2 mb-3 mt-3"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-black">Image URL</label>
              <input
                type="text"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full text-black p-2 mb-3 mt-3 border-black rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block text-black">Content</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border-black rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black p-2 mb-3 mt-3"
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">Save</button>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
