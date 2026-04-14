const cloudinaryTransformations = {
  thumbnail: "c_fill,w_160,h_160,q_auto,f_auto,dpr_auto",
  card: "c_limit,w_600,h_600,q_auto,f_auto,dpr_auto",
  detail: "c_limit,w_1200,h_1200,q_auto,f_auto,dpr_auto",
  hero: "c_limit,w_1600,h_900,q_auto,f_auto,dpr_auto",
  blog: "c_fill,w_960,h_540,q_auto,f_auto,dpr_auto",
};

const isCloudinaryUrl = (url) =>
  typeof url === "string" &&
  url.includes("res.cloudinary.com") &&
  url.includes("/upload/");

export const getOptimizedImage = (url, variant = "card") => {
  if (!url) return "";

  if (!isCloudinaryUrl(url)) {
    return url;
  }

  const transform =
    cloudinaryTransformations[variant] || cloudinaryTransformations.card;
  return url.replace("/upload/", `/upload/${transform}/`);
};

const videoAssets = {
  hero: {
    title: "Chhatrapati's Visit",
    poster: import.meta.env.VITE_HERO_VIDEO_POSTER || "/images/image.png",
    src:
      import.meta.env.VITE_HERO_VIDEO_URL ||
      "https://res.cloudinary.com/dquyimnmd/video/upload/q_60/v1776149451/video_irwd7j.mp4",
  },
  featured1: {
    poster:
      import.meta.env.VITE_FEATURED_VIDEO_1_POSTER || "/images/thumb1.jpg",
    youtubeUrl: "https://youtu.be/xh-ibz0qxaA?si=xUepIS8RUdQu2EU8",
  },
  featured2: {
    poster:
      import.meta.env.VITE_FEATURED_VIDEO_2_POSTER || "/images/thumb2.jpg",
    youtubeUrl: "https://youtu.be/2alkiZgDxMI?si=GBQ9R3Cd1j5Yxw0T",
  },
  featured3: {
    poster:
      import.meta.env.VITE_FEATURED_VIDEO_3_POSTER || "/images/thumb3.jpg",
    youtubeUrl: "https://youtu.be/WpBQTatwZhs?si=FB1EmdLeHk4v0IY8",
  },
};

export const getVideoAsset = (key) => videoAssets[key];
