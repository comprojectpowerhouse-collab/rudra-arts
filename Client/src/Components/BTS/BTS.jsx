import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiZoomIn, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import TeamComponent from "../TeamComponent/TeamComponent";
import AnimatedUnderline from "../AnimatedUnderline/AnimatedUnderline";

const getGalleryImageUrl = (src) => src;

const images = {
  statueUnit: [
    { src: "/images/bts2.jpg", title: "Crafting Perfection" },
    { src: "/images/bts3.jpg", title: "Artisan at Work" },
    { src: "/images/bts4.jpg", title: "Traditional Techniques" },
    { src: "/images/bts5.jpg", title: "Master's Touch" },
    { src: "/images/bts6.jpg", title: "Detail Oriented" },
    { src: "/images/bts1.jpg", title: "Traditional Tools" },
  ],
  printingUnit: [
    { src: "/images/bts7.jpg", title: "3D Printing Process" },
    { src: "/images/bts8.jpg", title: "Miniature Design" },
    { src: "/images/bts9.jpg", title: "Digital Modeling" },
    { src: "/images/bts10.jpg", title: "Precision Printing" },
    { src: "/images/bts12.jpg", title: "Quality Check" },
    { src: "/images/bts13.jpg", title: "Frame Assembly" },
    { src: "/images/bts14.jpg", title: "Wood Selection" },
    { src: "/images/bts15.jpg", title: "Finishing Touches" },
    { src: "/images/bts16.jpg", title: "Custom Designs" },
    { src: "/images/bts18.jpg", title: "Quality Inspection" },
    { src: "/images/bts19.jpg", title: "Craftsmanship" },
    { src: "/images/bts20.jpg", title: "Detail Work" },
    { src: "/images/bts21.jpg", title: "Creative Flow" },
    { src: "/images/bts22.jpg", title: "Finishing Touches" },
  ],
  frameUnit: [
    { src: "/images/bts23.jpg", title: "Finishing Touches" },
    { src: "/images/bts24.jpg", title: "Finishing Touches" },
    { src: "/images/bts25.jpg", title: "Finishing Touches" },
    { src: "/images/bts26.jpg", title: "Finishing Touches" },
  ],
  colouringUnit: [
    { src: "/images/bts27.jpg", title: "Finishing Touches" },
    { src: "/images/bts28.jpg", title: "Finishing Touches" },
    { src: "/images/bts29.jpg", title: "Finishing Touches" },
    { src: "/images/bts30.jpg", title: "Finishing Touches" },
    { src: "/images/bts31.jpg", title: "Finishing Touches" },
    { src: "/images/bts32.jpg", title: "Finishing Touches" },
  ],
  weaponsUnit: [
    { src: "/images/weapon1.jpg", title: "Finishing Touches" },
    { src: "/images/weapon2.jpg", title: "Finishing Touches" },
    { src: "/images/weapon3.jpg", title: "Finishing Touches" },
    { src: "/images/weapon4.jpg", title: "Finishing Touches" },
    { src: "/images/weapon5.jpg", title: "Finishing Touches" },
    { src: "/images/weapon6.jpg", title: "Finishing Touches" },
    { src: "/images/weapon7.jpg", title: "Finishing Touches" },
    { src: "/images/weapon8.jpg", title: "Finishing Touches" },
    { src: "/images/weapon9.jpg", title: "Finishing Touches" },
  ],
};

const BTS = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageSet, setSelectedImageSet] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const openImage = (set, index) => {
    setSelectedImageSet(set);
    setSelectedImage(index);
    document.body.style.overflow = "hidden";
  };

  const closeImage = () => {
    setSelectedImage(null);
    setSelectedImageSet(null);
    document.body.style.overflow = "auto";
  };

  const renderGallery = (unitName, title, description) => {
    const unitImages = images[unitName];

    // Skip rendering if no images
    if (!unitImages || unitImages.length === 0) return null;

    return (
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-normal font-times text-amber-800 mb-2">
            {title}
          </h3>
          <p className="text-amber-600 max-w-3xl mx-auto font-times">
            {description}
          </p>
          <div className="mt-6 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent w-1/3 mx-auto" />
        </motion.div>

        {/* Changed grid to always show 3 columns */}
        <div className="grid grid-cols-3 gap-4">
          {unitImages.map((img, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer aspect-square"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => openImage(unitName, index)}
            >
              <img
                src={getGalleryImageUrl(img.src)}
                alt={img.title}
                className="w-full h-full object-cover transition-all duration-500"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                sizes="(max-width: 768px) 33vw, (max-width: 1280px) 25vw, 20vw"
                style={{
                  transform:
                    hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                  filter:
                    hoveredIndex === index
                      ? "brightness(0.8)"
                      : "brightness(0.9)",
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white">
                  <h3 className="font-medium">{img.title}</h3>
                  <div className="flex items-center mt-1">
                    <FiZoomIn className="mr-1" />
                    <span className="text-xs">Click to enlarge</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="px-4 py-8 bg-gradient-to-b from-amber-50 to-amber-100 pt-14">
      <TeamComponent />

      <div className="max-w-7xl mx-auto">
        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-normal font-times text-amber-900 mb-4 mt-10">
            <AnimatedUnderline>Hands Behind Rudra Arts</AnimatedUnderline>
          </h2>
          <p className="text-lg font-times italic text-amber-700 max-w-2xl mx-auto">
            "Witness the sacred process where tradition meets mastery"
          </p>
          <div className="mt-8 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent w-1/2 mx-auto" />
        </motion.div>

        {/* Statue Manufacturing Unit */}
        {/* {renderGallery(
          "statueUnit",
          "Statue Manufacturing Unit",
          "Where ancient techniques meet modern precision to create timeless pieces of art"
        )} */}

        {/* 3D Printing and Miniature Unit */}
        {renderGallery(
          "printingUnit",
          "3D Printing & Miniature Unit",
          "Innovative technology crafting detailed miniatures with perfect accuracy",
        )}

        {/* Frame Manufacturing Unit */}
        {renderGallery(
          "frameUnit",
          "Frame Manufacturing Unit",
          "Handcrafted frames that complement and enhance every artwork",
        )}

        {/* Coloring Manufacturing Unit */}
        {renderGallery(
          "colouringUnit",
          "Colouring Unit",
          "Handcrafted frames that complement and enhance every artwork",
        )}

        {/* Coloring Manufacturing Unit */}
        {renderGallery(
          "weaponsUnit",
          "Weapons Unit",
          "Handcrafted frames that complement and enhance every artwork",
        )}

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage !== null && selectedImageSet !== null && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeImage}
            >
              <button
                className="absolute top-6 right-6 text-white text-2xl z-10"
                onClick={closeImage}
              >
                <FiX />
              </button>

              <motion.div
                className="relative max-w-6xl w-full max-h-[90vh]"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={getGalleryImageUrl(
                    images[selectedImageSet][selectedImage].src,
                  )}
                  alt={images[selectedImageSet][selectedImage].title}
                  className="w-full h-full object-contain max-h-[80vh] mx-auto"
                  decoding="async"
                  fetchPriority="high"
                />
                <div className="mt-4 text-center text-white">
                  <h3 className="text-xl font-medium">
                    {images[selectedImageSet][selectedImage].title}
                  </h3>
                  <p className="text-sm text-amber-200 mt-1">
                    {selectedImage + 1} of {images[selectedImageSet].length}
                  </p>
                </div>
              </motion.div>

              {/* Navigation Arrows */}
              {selectedImage > 0 && (
                <button
                  className="absolute left-4 md:left-8 text-white text-3xl z-10 bg-black/50 rounded-full p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((prev) => prev - 1);
                  }}
                >
                  &larr;
                </button>
              )}
              {selectedImage < images[selectedImageSet].length - 1 && (
                <button
                  className="absolute right-4 md:right-8 text-white text-3xl z-10 bg-black/50 rounded-full p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((prev) => prev + 1);
                  }}
                >
                  &rarr;
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-amber-700 italic mb-4 font-times">
            "Every piece tells a story of dedication passed through generations"
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BTS;
