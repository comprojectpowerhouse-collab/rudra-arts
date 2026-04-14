import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Typography, Box, Button } from "@mui/material";
import AnimatedUnderline from "../AnimatedUnderline/AnimatedUnderline";
import { fetchCachedJson } from "../../lib/api";
import { getOptimizedImage } from "../../lib/media";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const FullNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalItems: 0,
  });

  const fetchNewsData = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchCachedJson(`/api/news?page=${page}&limit=6`, {
        cacheKey: `news:page:${page}`,
        ttlMs: 3 * 60 * 1000,
      });

      if (!Array.isArray(data.newsItems)) {
        throw new Error(
          "Invalid format: 'newsItems' array missing in response"
        );
      }

      setNewsData(data.newsItems.filter((item) => !item.isHide));
      setPagination({
        page: Number(data.currentPage),
        totalPages: data.totalPages,
        totalItems: data.totalItems,
      });
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchNewsData(newPage);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        py: 8,
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      {/* Background with overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(circle at top, rgba(245, 158, 11, 0.18), transparent 40%), linear-gradient(180deg, rgba(255, 251, 235, 0.98), rgba(254, 243, 199, 0.98))",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(140, 57, 27, 0.04), rgba(217, 119, 6, 0.08))",
          },
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1200px",
          margin: "0 auto",
          px: { xs: 3, md: 4 },
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2.2rem", md: "3rem" },
              fontWeight: "bold",
              mb: 2,
              color: "#3b2f2f",
              fontFamily: "'Montserrat', sans-serif",
            }}
            className="pt-20"
          >
            <AnimatedUnderline> Latest from Rudra Arts</AnimatedUnderline>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: "600px",
              mx: "auto",
              color: "#555",
              fontSize: "1.1rem",
            }}
          >
            Stay updated with our artistic journey, media features, exhibitions,
            and creative insights.
          </Typography>
        </motion.div>

        {/* Error State */}
        {error && (
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography color="error" sx={{ mb: 2 }}>
              Error: {error}
            </Typography>
            <Button
              onClick={() => fetchNewsData(pagination.page)}
              variant="contained"
              sx={{
                bgcolor: "#8C391B",
                "&:hover": { bgcolor: "#A04A2B" },
              }}
            >
              Retry
            </Button>
          </Box>
        )}

        {/* Loading Spinner */}
        {loading && newsData.length === 0 && (
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                display: "inline-block",
                animation: "spin 1s linear infinite",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                border: "3px solid rgba(140, 57, 27, 0.3)",
                borderTopColor: "#8C391B",
                mb: 2,
              }}
            />
            <Typography>Loading news...</Typography>
          </Box>
        )}

        {/* News Cards Grid */}
        {!error && newsData.length > 0 && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 4,
              mb: 6,
            }}
          >
            {newsData.map((news, index) => (
              <motion.div
                key={news._id || index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                <Box
                  sx={{
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 3,
                    transition: "all 0.3s ease",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: "250px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <Box
                      component="img"
                      src={getOptimizedImage(news.image, "blog")}
                      alt={news.title}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                      onError={(e) => {
                        e.target.src = "/placeholder-news.jpg";
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "60px",
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      p: 3,
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "bold",
                        mb: 2,
                        color: "text.primary",
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      {news.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        mb: 3,
                        flex: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {news.description}
                    </Typography>
                    <Button
                      href={news.link || `/news/${news._id}`}
                      variant="contained"
                      sx={{
                        alignSelf: "flex-start",
                        bgcolor: "#8C391B",
                        "&:hover": { bgcolor: "#A04A2B" },
                      }}
                    >
                      Read More
                    </Button>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        )}

        {/* Pagination */}
        {!error && pagination.totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                sx={{
                  minWidth: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  "&:disabled": { opacity: 0.5 },
                }}
              >
                &lt;
              </Button>
              {Array.from({ length: pagination.totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  sx={{
                    minWidth: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    bgcolor:
                      pagination.page === i + 1 ? "#8C391B" : "transparent",
                    color: pagination.page === i + 1 ? "#fff" : "inherit",
                    "&:hover": {
                      bgcolor:
                        pagination.page === i + 1
                          ? "#8C391B"
                          : "rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                sx={{
                  minWidth: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  "&:disabled": { opacity: 0.5 },
                }}
              >
                &gt;
              </Button>
            </Box>
          </Box>
        )}

        {/* Empty state */}
        {!loading && !error && newsData.length === 0 && (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
              No news articles found.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FullNews;
