import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaRegHeart, FaStar, FaSearch } from "react-icons/fa";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AutoScrollCarousel from "./Carousel";
import aboutBg from "/images/border.jpg";
import { Box, Skeleton, Chip } from "@mui/material";
import AnimatedUnderline from "../AnimatedUnderline/AnimatedUnderline";
import { useMemo } from "react";

const AllProducts = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // const { category } = useParams();
  const { category: categoryParam } = useParams();
  const category = categoryParam ? decodeURIComponent(categoryParam) : null;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState(category || "All");
  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("All");
    }
  }, [category]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/products`
        );
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();

        const productsWithExtras = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((product) => ({
            ...product,
            isFavorite: false,
            category: product.product_category || "Uncategorized",
            rating: product.product_rating || Math.random() * 1 + 4,
            isNew:
              Date.now() - new Date(product.createdAt).getTime() < 604800000,
          }));

        setProducts(productsWithExtras);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const normalize = (str) =>
    str
      ? str
          .toLowerCase()
          .replace(/\s+/g, "")
          .replace(/[^a-z0-9]/g, "")
      : "";

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory === "All") return true;
        return normalize(p.category) === normalize(selectedCategory);
      })
      .filter(
        (p) =>
          p.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.product_description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOption === "price-low")
          return a.product_price - b.product_price;
        if (sortOption === "price-high")
          return b.product_price - a.product_price;
        if (sortOption === "rating") return b.rating - a.rating;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [products, selectedCategory, searchQuery, sortOption]);

  const toggleFavorite = (productId) => {
    setProducts((prev) =>
      prev.map((p) =>
        p._id === productId ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
  };

  const loadMoreProducts = () => {
    setVisibleProducts((prev) => prev + 12);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-amber-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-amber-400 opacity-50" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 font-times">
      {/* Background Texture */}
      <div
        className="fixed inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `url(${aboutBg})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-3">
        {/* Carousel */}
        <AutoScrollCarousel />

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 mt-8"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-amber-900 mb-6 leading-tight">
            <AnimatedUnderline>Heritage Artisans Collection</AnimatedUnderline>
          </h1>
          <p className="text-lg md:text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed">
            Handcrafted with devotion, each piece tells a story of our glorious
            past and spiritual traditions.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            {/* Search Bar */}
            <div className="relative w-full md:w-1/2">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/80 text-amber-900 placeholder-amber-400 transition-all duration-300"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="w-full md:w-auto">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/80 text-amber-900 transition-all duration-300"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {category && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-normal text-amber-900 capitalize">
                {category}
              </h2>
              <p className="text-amber-700 mt-2">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "item" : "items"} in this
                collection
              </p>
            </motion.div>
          )}
          {/* {console.log(selectedCategory)} */}
          {/* Category Filter */}
          <div className="mb-6 w-50">
            <label className="block text-amber-800 mb-2 font-medium">
              Filter by Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                const newCategory = e.target.value;
                setSelectedCategory(newCategory);
                if (newCategory === "All") {
                  navigate("/products");
                } else {
                  navigate(
                    `/products/category/${encodeURIComponent(newCategory)}`
                  );
                }
              }}
              className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/80 text-amber-900 transition-all duration-300"
            >
              <option value="All">All Categories</option>
              <option value="Mavala">Mavala</option>
              <option value="Maharaj">Maharaj</option>
              <option value="Shastra (Weapons)">Shastra (Weapons)</option>
              <option value="Miniature Weapons">Miniature Weapons</option>
              <option value="Miniatures">Miniatures</option>
              <option value="Spiritual Statues">Spiritual Statues</option>
              <option value="Car Dashboard">Car Dashboard</option>
              <option value="Frame Collection">Frame Collection</option>
              <option value="Shilekhana (Weapon Vault)">
                Shilekhana (Weapon Vault)
              </option>
              <option value="Symbolic & Cultural Artefacts">
                Symbolic & Cultural Artefacts
              </option>
              <option value="Sanch">Sanch</option>
              <option value="Keychains">Keychains</option>
              <option value="Jewellery">Jewellery</option>
              <option value="Historical Legends">Historical Legends</option>
              <option value="Badges">Badges</option>
              <option value="Taxidermy">Taxidermy</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="bg-white/80 rounded-xl overflow-hidden shadow-sm border border-amber-100">
                  <Skeleton variant="rectangular" className="w-full h-48" />
                  <div className="p-4">
                    <Skeleton className="w-3/4 h-6 mb-2" />
                    <Skeleton className="w-1/2 h-4 mb-4" />
                    <Skeleton className="w-full h-10" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {filteredProducts.slice(0, visibleProducts).map((product) => (
                  <motion.div
                    key={product._id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                    className="relative group bg-white overflow-hidden shadow-sm border border-gray-200"
                  >
                    <Link
                      to={`/product-details/${product._id}`}
                      className="block h-full"
                    >
                      <div className="h-full flex flex-col">
                        {/* Product Image Container - Amazon Style */}
                        <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                          <motion.img
                            src={product.product_image[0].replace(
                              "/upload/",
                              "/upload/w_400,q_auto,f_auto/"
                            )}
                            alt={product.product_name}
                            className="w-full h-full object-cover p-2"
                            loading="lazy"
                            initial={{ scale: 1 }}
                            whileHover={{
                              scale: 1.05,
                              transition: { duration: 0.3 },
                            }}
                          />

                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex gap-2">
                            {product.isNew && (
                              <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                                New
                              </span>
                            )}
                            {product.product_price > 5000 && (
                              <span className="bg-amber-800 text-white text-xs px-2 py-1 rounded-full">
                                Premium
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-4 flex flex-col flex-grow border-t border-gray-100">
                          <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                            {product.product_name}
                          </h3>

                          {/* Size */}
                          {product.product_size !== "0" ? (
                            <p className="text-sm text-gray-500 mb-3">
                              Size: {product.product_size}
                            </p>
                          ) : (
                            <p className="text-sm text-black mb-3">
                              {product.product_description
                                .split(" ")
                                .slice(0, 10)
                                .join(" ")}
                              ...
                            </p>
                          )}

                          {/* Price and CTA */}
                          <div className="mt-auto flex justify-between items-center">
                            <div>
                              <span className="text-xl font-bold text-gray-900">
                                ₹{product.product_price.toLocaleString()}
                              </span>
                              {product.product_discount > 0 && (
                                <span className="ml-2 text-sm text-green-600">
                                  {product.product_discount}% off
                                </span>
                              )}
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-1 px-3 py-2 text-sm font-medium bg-amber-600 text-white rounded-md transition hover:bg-amber-700"
                            >
                              <ShoppingCart size={16} />
                              <span className="hidden sm:inline">Add</span>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Load More Button */}
            {visibleProducts < filteredProducts.length && (
              <div className="mt-12 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={loadMoreProducts}
                  className="px-8 py-3 bg-amber-700 text-white rounded-full font-medium transition hover:bg-amber-800"
                >
                  Load More
                </motion.button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-white/80 rounded-xl">
            <h3 className="text-2xl font-medium text-amber-900 mb-3">
              No products found
            </h3>
            <p className="text-amber-700 mb-6 max-w-md mx-auto">
              Try adjusting your search or filter criteria to find what you're
              looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSortOption("newest");
              }}
              className="flex items-center gap-2 px-6 py-3 bg-amber-100 text-amber-800 rounded-full font-medium transition hover:bg-amber-200 mx-auto"
            >
              Reset filters
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
