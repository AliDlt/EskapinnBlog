import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../../utils/auth";
import { useRouter } from "next/router";

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

export default function Post() {
  const { getToken } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [userRole, setUserRole] = useState("");
  const { slug } = useRouter().query;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${slug}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        });
        if (!response.ok) {
          throw Error("Could not fetch post from server");
        }
        const data = await response.json();
        setPost(data.data.post);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    if (slug) {
      fetchPost();
    }

    const token = getToken();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUserRole(decodedToken.role);
    }
  }, [slug, getToken]);

  const handleDelete = async () => {
    const token = getToken();
    const decodedToken = JSON.parse(atob(token.split(".")[1]));

    if (decodedToken.role === "admin" || decodedToken.role === "editor") {
      try {
        await fetch(`http://localhost:5000/api/posts/${slug}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        router.push("/posts");
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    } else {
      console.error("You are not authorized to perform this action");
    }
  };

  return (
    <div className="container mx-auto py-8">
      {post ? (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
          <h1 className="text-3xl text-black font-bold mb-4">{post.title}</h1>
          {post.image && (
            <img src={post.image} alt={post.title} className="w-full h-64 object-cover mb-4 rounded" />
          )}
          <p className="mb-4 text-black">{post.content}</p>
          <p className="mb-4 text-black">{post.shortDescription}</p>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Published on {new Date(post.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-500">Meta: {post.meta}</p>
              <p className="text-gray-500">Keywords: {post.keywords.join(", ")}</p>
            </div>
            {(userRole === "admin" || userRole === "editor") && (
              <div className="flex space-x-4">
                <Link href={`/posts/${post.slug}/edit`}>
                  <span className="text-blue-500 cursor-pointer">Edit</span>
                </Link>
                <button onClick={handleDelete} className="text-red-500 cursor-pointer">Delete</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
}
