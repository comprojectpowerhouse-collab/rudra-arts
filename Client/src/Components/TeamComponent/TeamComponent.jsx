import React from "react";
import {
  FaCrown,
  FaShieldAlt,
  FaChartLine,
  FaHandsHelping,
} from "react-icons/fa";
import { GiRoyalLove } from "react-icons/gi";
import AnimatedUnderline from "../AnimatedUnderline/AnimatedUnderline";

const TeamComponent = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Satyajeet Arun Vaidya",
      role: "Managing Director",
      description:
        "A proud descendant of traditional artisans, Satyajeet leads Rudra Arts with a vision to preserve, promote, and innovate handcrafted cultural weaponry and artifacts.",
      image: "/images/owner.jpg",
      historicalNote:
        "His family has been trusted artisans for cultural and ceremonial weaponry in Maharashtra for decades.",
    },
    {
      id: 2,
      name: "Smita Satyajeet Vaidya",
      role: "Operational Head",
      description:
        "With an eye for detail and a passion for legacy crafts, Mam oversees daily operations, blending age-old techniques with modern production standards.",
      image: "/images/owner2.jpg",
      historicalNote:
        "She has revived long-lost crafting methods and adapted them for contemporary collectors.",
    },
    // {
    //   id: 3,
    //   name: "Reshma Tupe",
    //   role: "Team Leader",
    //   description:
    //     "Reshma brings unmatched dedication to Rudra Arts, guiding our team of artisans with patience and skill. She ensures each creation is finished with precision and care.",
    //   image: "/images/teammember1.jpg",
    //   historicalNote:
    //     "Having learned under respected masters, she now mentors upcoming artisans and upholds our commitment to authentic craftsmanship.",
    // },
    // {
    //   id: 4,
    //   name: "Yash Indalkar",
    //   role: "Quality Control & Sales Assistant",
    //   description:
    //     "Yash’s deep knowledge of traditional forging and finishing guarantees each product meets Rudra Arts’ strict quality standards before reaching our clients.",
    //   image: "/images/teammember2.jpg",
    //   historicalNote:
    //     "He specializes in quality inspections rooted in traditional blacksmith practices.",
    // },
    // {
    //   id: 5,
    //   name: "Sanika Indalkar",
    //   role: "Sales Assistant",
    //   description:
    //     "Sanika connects clients and collectors to our heritage pieces, sharing the stories, meaning, and cultural significance behind every work of art.",
    //   image: "/images/teammember3.jpg",
    //   historicalNote:
    //     "She comes from a family with a deep tradition in local trade, continuing their legacy through her passion for art and storytelling.",
    // },
  ];

  // Split team members into two groups: first 2 and last 3
  const topRowMembers = teamMembers.slice(0, 2);
  const bottomRowMembers = teamMembers.slice(2);

  return (
    <div className="bg-amber-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Historical Header */}
        <div className="text-center mb-16 mt-20">
          <h2 className="text-5xl font-times font-normal text-amber-800 mb-4 relative inline-block">
            <AnimatedUnderline>Brains Behind Rudra Arts</AnimatedUnderline>
          </h2>
          <p className="text-lg italic text-amber-700 max-w-3xl mx-auto">
            “Rudra Arts carries forward the sacred traditions of master
            craftsmen—heralding artistry and devotion through every handcrafted
            masterpiece.”
          </p>
          <div className="mt-6">
            <img
              src="/images/rudra_arts_logo_single.png"
              alt="Historical artisans at work"
              className="h-24 object-cover rounded-lg opacity-90 mx-auto"
            />
          </div>
        </div>

        {/* Top Row - 2 Cards */}
        <div className="flex justify-center mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {topRowMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-2 border border-amber-200 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative pt-[100%]">
                  <div className="absolute inset-0 flex items-center justify-center bg-customBrown">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="object-contain w-full h-full p-4"
                      style={{ maxHeight: "100%", maxWidth: "100%" }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">
                      {member.name}
                    </h3>
                    <p className="text-amber-200 font-medium">{member.role}</p>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <p className="text-gray-700 mb-4 flex-grow">
                    {member.description}
                  </p>

                  {/* Historical Note */}
                  <div className="bg-amber-50 p-4 rounded border-l-4 border-amber-400">
                    <p className="text-xs italic text-amber-800">
                      <span className="font-bold">Historical Legacy:</span>{" "}
                      {member.historicalNote}
                    </p>
                  </div>

                  {/* Decorative Elements */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full bg-amber-400"
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row - 3 Cards */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
            {bottomRowMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-2 border border-amber-200 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative pt-[100%]">
                  <div className="absolute inset-0 flex items-center justify-center bg-customBrown">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="object-contain w-full h-full p-4"
                      style={{ maxHeight: "100%", maxWidth: "100%" }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">
                      {member.name}
                    </h3>
                    <p className="text-amber-200 font-medium">{member.role}</p>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <p className="text-gray-700 mb-4 flex-grow">
                    {member.description}
                  </p>

                  {/* Historical Note */}
                  <div className="bg-amber-50 p-4 rounded border-l-4 border-amber-400">
                    <p className="text-xs italic text-amber-800">
                      <span className="font-bold">Historical Legacy:</span>{" "}
                      {member.historicalNote}
                    </p>
                  </div>

                  {/* Decorative Elements */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full bg-amber-400"
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Historical Footer */}
        <div className="mt-16 text-center border-t border-customBrown pt-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-serif text-amber-800 mb-6">
              "The Brains that craft today, honor the masters of yesterday"
            </h3>
            <p className="text-amber-700 mb-8">
              Our team continues the unbroken lineage of artisans who have
              served royal courts, temples, and collectors for over three
              centuries. Each member is initiated into the traditional methods
              while innovating for modern connoisseurs.
            </p>
            <img
              src="/images/rudra_arts_logo_single.png"
              alt="Founder's signature"
              className="h-12 object-contain opacity-80 mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamComponent;
