import React from "react";
import { motion } from "framer-motion";
import { Calendar, Sparkles, Users, Camera, Music, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const Event = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900">

      {/* ---------- HERO SECTION ---------- */}
      <section className="w-full bg-white py-20 shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Premium Event Management
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            We plan, design, and execute unforgettable events with perfection.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
          >
           <Link to="/user/userdashboard">Book Your Event Now</Link> 
          </motion.button>
        </div>
      </section>

      {/* ---------- SERVICES SECTION ---------- */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Event Services
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Card 1 */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-md p-8 text-center border hover:shadow-lg transition"
            >
              <Calendar className="mx-auto mb-4" size={42} />
              <h3 className="text-xl font-semibold mb-2">Corporate Events</h3>
              <p className="text-gray-600">
                Conferences, seminars, product launches and more.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-md p-8 text-center border hover:shadow-lg transition"
            >
              <Users className="mx-auto mb-4" size={42} />
              <h3 className="text-xl font-semibold mb-2">Weddings & Parties</h3>
              <p className="text-gray-600">
                Beautifully managed weddings & celebrations.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-md p-8 text-center border hover:shadow-lg transition"
            >
              <Music className="mx-auto mb-4" size={42} />
              <h3 className="text-xl font-semibold mb-2">Concerts & Shows</h3>
              <p className="text-gray-600">
                Live music events, artists, stage setup & more.
              </p>
            </motion.div>

            {/* Card 4 */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-md p-8 text-center border hover:shadow-lg transition"
            >
              <Camera className="mx-auto mb-4" size={42} />
              <h3 className="text-xl font-semibold mb-2">Media & Production</h3>
              <p className="text-gray-600">
                Photography, videography, marketing shoots.
              </p>
            </motion.div>

            {/* Card 5 */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-md p-8 text-center border hover:shadow-lg transition"
            >
              <Sparkles className="mx-auto mb-4" size={42} />
              <h3 className="text-xl font-semibold mb-2">Theme Decorations</h3>
              <p className="text-gray-600">
                Creative decor, lighting, and immersive themes.
              </p>
            </motion.div>

            {/* Card 6 */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-md p-8 text-center border hover:shadow-lg transition"
            >
              <Trophy className="mx-auto mb-4" size={42} />
              <h3 className="text-xl font-semibold mb-2">Sports Events</h3>
              <p className="text-gray-600">
                Organizing indoor & outdoor sports events.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ---------- CTA SECTION ---------- */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Let’s Create Something Amazing!</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Our team ensures seamless execution and unforgettable experiences.
        </p>

        <button className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-xl shadow-md hover:bg-gray-100 transition">
          <Link to="/contact">Contact Us</Link>
        </button>
      </section>

    </div>
  );
};

export default Event;
