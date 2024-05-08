import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/auth';

export default function CreatePost() {
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [meta, setMeta] = useState('');
  const [keywords, setKeywords] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = {
        title,
        meta,
        keywords: keywords.split(',').map(keyword => keyword.trim()),
        shortDescription,
        image,
        content,
        author: user ? user._id : '',
        slug: slug || title.toLowerCase().replace(/ /g, '-')
      };

      await axios.post('http://localhost:5000/api/posts', newPost);
      router.push('/posts');
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Error creating post');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">Create Post</h1>
        {user && (user.role === 'editor' || user.role === 'admin') ? (
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
              <input
                type="text"
                id="title"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="slug" className="block text-gray-700 text-sm font-bold mb-2">Slug</label>
              <input
                type="text"
                id="slug"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="meta" className="block text-gray-700 text-sm font-bold mb-2">Meta</label>
              <input
                type="text"
                id="meta"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={meta}
                onChange={(e) => setMeta(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="keywords" className="block text-gray-700 text-sm font-bold mb-2">Keywords (comma-separated)</label>
              <input
                type="text"
                id="keywords"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="shortDescription" className="block text-gray-700 text-sm font-bold mb-2">Short Description</label>
              <textarea
                id="shortDescription"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
              <input
                type="text"
                id="image"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Content</label>
              <textarea
                id="content"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create
            </button>
          </form>
        ) : (
          <p className="text-red-500 text-sm">You are not authorized to create a post.</p>
        )}
      </div>
    </div>
  );
}
