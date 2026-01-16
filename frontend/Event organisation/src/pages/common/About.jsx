import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-800">

      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
          alt="About Us"
          className="w-full h-full object-cover brightness-75"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4"
        >
          <h1 className="text-5xl font-bold drop-shadow-lg">
            About Our Event Agency
          </h1>
          <p className="text-lg mt-3 max-w-3xl drop-shadow-lg">
            We transform your imagination into visually stunning and
            unforgettable experiences.
          </p>
        </motion.div>
      </div>

      {/* Who We Are */}
      <div className="px-8 md:px-16 lg:px-24 py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Who We Are</h2>
        <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
          We are a creative event management agency specializing in crafting
          high-quality, unforgettable moments. From corporate conferences to
          concerts, weddings, sports events, and media productions — we deliver
          end-to-end planning, execution, and management services with
          professionalism and passion.
        </p>
      </div>

      {/* Mission / Vision */}
      <div className="px-8 md:px-16 lg:px-24 grid md:grid-cols-2 gap-10 py-10">
        {[
          {
            title: "Our Mission",
            desc: "To deliver flawless, innovative, and memorable events that exceed expectations and create long-lasting impressions.",
            img: "https://images.unsplash.com/photo-1515165562835-c7d16d1e00b7",
          },
          {
            title: "Our Vision",
            desc: "To become a globally recognized event management leader known for creativity, quality, and impactful experiences.",
            img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-lg rounded-2xl overflow-hidden"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Values Section */}
      <div className="px-8 md:px-16 lg:px-24 py-12">
        <h2 className="text-3xl font-bold mb-6">Our Core Values</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Creativity",
            "Professionalism",
            "Transparency",
            "Detail-Oriented",
            "Integrity",
            "Client Satisfaction",
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 shadow-md rounded-xl text-center text-lg font-semibold text-gray-700"
            >
              {value}
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="w-full bg-gray-900 text-white py-14 text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Let’s Work Together</h2>
        <p className="mb-6 text-gray-300 text-lg">
          Ready to host your next big event? We’re here to make it extraordinary.
        </p>
        <button className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all">
         <Link to='/contact'>Contact Us</Link> 
        </button>
      </motion.div>
    </div>
  );
};

export default About;
