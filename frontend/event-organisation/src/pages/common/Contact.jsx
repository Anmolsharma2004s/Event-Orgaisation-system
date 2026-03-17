import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-800">

      {/* Hero Section */}
      <div className="relative h-[55vh] w-full">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
          alt="Contact"
          className="w-full h-full object-cover brightness-75"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4"
        >
          <h1 className="text-5xl font-bold drop-shadow-lg">Contact Us</h1>
          <p className="text-lg mt-3 max-w-3xl drop-shadow-lg">
            We would love to hear from you! Let’s plan something amazing together.
          </p>
        </motion.div>
      </div>

      {/* Contact Info + Form */}
      <div className="px-8 md:px-16 lg:px-24 py-16 grid lg:grid-cols-2 gap-14">

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Have a question? Need help planning an event?  
            Feel free to reach out — our team is always ready to assist you!
          </p>

          <div className="space-y-6 mt-8">

            <div className="flex items-center gap-4 bg-white p-5 shadow-md rounded-xl">
              <Mail className="text-blue-600" size={28} />
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <p className="text-gray-600">support@eventagency.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-5 shadow-md rounded-xl">
              <Phone className="text-green-600" size={28} />
              <div>
                <h3 className="font-semibold text-lg">Phone</h3>
                <p className="text-gray-600">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-5 shadow-md rounded-xl">
              <MapPin className="text-red-600" size={28} />
              <div>
                <h3 className="font-semibold text-lg">Location</h3>
                <p className="text-gray-600">Chandigarh, India</p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 shadow-xl rounded-2xl grid gap-6"
        >
          <h2 className="text-3xl font-bold mb-2">Send a Message</h2>

          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            rows="5"
            placeholder="Your Message"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>

          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all">
            Send Message
          </button>
        </motion.form>
      </div>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="w-full h-[350px] px-8 md:px-16 lg:px-24 pb-16"
      >
        <iframe
          title="Google Map"
          className="w-full h-full rounded-2xl shadow-lg"
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13619.465065331316!2d76.779417!3d30.733315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fef43c192311b%3A0xdeb31dadd4ef95b!2sChandigarh!5e0!3m2!1sen!2sin!4v1700000000000"
        ></iframe>
      </motion.div>
    </div>
  );
};

export default Contact;
