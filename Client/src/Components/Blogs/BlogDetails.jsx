import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import { fetchCachedJson } from "../../lib/api";
import { getOptimizedImage } from "../../lib/media";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchBlog = async () => {
      try {
        const data = await fetchCachedJson(`/api/blogs/${id}`, {
          cacheKey: `blog:${id}`,
          ttlMs: 5 * 60 * 1000,
        });
        setBlog(data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Submitted email:", email);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-700">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-700">Blog not found</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 pt-20 pb-10"
    >
      {/* Back Button */}
      <motion.button
        whileHover={{ x: -4 }}
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-20 flex items-center gap-2 text-gray-800 font-medium bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-200 mt-20"
      >
        <FiArrowLeft />
        <span className="hidden sm:inline">Back to Blogs</span>
      </motion.button>

      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-sm text-gray-500">
        <span>Home</span> &gt; <span>Insights</span> &gt; <span>Blogs</span>{" "}
        &gt; <span className="text-gray-700">{blog.title}</span>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        {/* Blog Header */}
        {/* Blog Header */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center text-center gap-6 mb-12"
          >
            {/* Title */}
            <h1 className="text-3xl font-yatra sm:text-4xl lg:text-5xl font-normal text-gray-900 leading-[2]">
              {blog.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                {blog.author?.[0] || "A"}
              </div>
              <div className="text-left">
                <p className="text-2xl font-normal font-times text-gray-900">
                  {blog.author || "Anonymous"}
                </p>
                <p className="text-gray-500 text-sm">
                  {blog.role || "Blog Writer"} •{" "}
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Image */}
            {blog.image && (
              <img
                src={getOptimizedImage(blog.image, "hero")}
                alt={blog.title}
                className="w-[20rem] md:w-[24rem] h-auto rounded-lg shadow"
              />
            )}
          </motion.div>

          {/* Blog Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="prose max-w-4xl mx-auto text-gray-700 mb-12"
          >
            {blog.content.split("\n").map((paragraph, i) => (
              <p key={i} className="mb-6 leading-relaxed text-lg font-yatra">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>

        {/* Email Subscription Form */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-50 rounded-xl p-6 sm:p-8 mb-12 max-w-3xl mx-auto"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Please fill out the form below
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Business email address *
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@business.com"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </motion.div> */}
      </div>
    </motion.div>
  );
};

export default BlogDetail;
