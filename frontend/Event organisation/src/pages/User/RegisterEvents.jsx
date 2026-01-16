import { useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  IndianRupee,
  Clock,
  FileText,
  Tag,
  Sparkles,
  Send,
  AlertCircle,
} from "lucide-react";
import api from "../../api";

const RegisterEvents = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    time: "",
    location: "",
    amount: "",
    strength: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    "Conference",
    "Workshop",
    "Seminar",
    "Meetup",
    "Festival",
    "Sports",
    "Concert",
    "Exhibition",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Event title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Please select a category";
    if (!formData.date) newErrors.date = "Event date is required";
    if (!formData.time) newErrors.time = "Event time is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.amount || formData.amount <= 0) newErrors.amount = "Valid amount is required";
    if (!formData.strength || formData.strength <= 0) newErrors.strength = "Valid capacity is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Combine date and time for backend
      const eventDateTime = `${formData.date}T${formData.time}`;
      
      const payload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        date: eventDateTime,
        location: formData.location,
        amount: Number(formData.amount),
        strength: Number(formData.strength),
      };

      await api.post("/events/request", payload);
      
      alert("Event request submitted successfully! 🎉");
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        date: "",
        time: "",
        location: "",
        amount: "",
        strength: "",
      });
      
      if (onClose) onClose();
    } catch (err) {
      console.error("Error submitting event:", err);
      alert(err.response?.data?.message || "Failed to submit event request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="text-purple-600" size={32} />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Request New Event
          </h2>
        </div>
        <p className="text-gray-600">Fill in the details below to submit your event request</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Event Title */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
            <FileText className="text-blue-600" size={18} />
            Event Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter event title"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.title}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
            <FileText className="text-purple-600" size={18} />
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your event in detail..."
            rows="4"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.description}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
            <Tag className="text-green-600" size={18} />
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.category}
            </p>
          )}
        </div>

        {/* Date & Time Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
              <Calendar className="text-blue-600" size={18} />
              Event Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.date ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.date}
              </p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
              <Clock className="text-purple-600" size={18} />
              Event Time *
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.time ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.time && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.time}
              </p>
            )}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
            <MapPin className="text-red-600" size={18} />
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter event location"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.location ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.location}
            </p>
          )}
        </div>

        {/* Amount & Capacity Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
              <IndianRupee className="text-green-600" size={18} />
              Ticket Price (₹) *
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter ticket price"
              min="0"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.amount ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.amount}
              </p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
              <Users className="text-orange-600" size={18} />
              Event Capacity *
            </label>
            <input
              type="number"
              name="strength"
              value={formData.strength}
              onChange={handleChange}
              placeholder="Maximum attendees"
              min="1"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.strength ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.strength && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.strength}
              </p>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-sm text-gray-700 font-semibold mb-1">Important Information</p>
              <p className="text-sm text-gray-600">
                Your event request will be reviewed by our admin team. You will receive a notification once it's approved or if any changes are needed.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 py-3 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105"
            }`}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send size={20} />
                Submit Event Request
              </>
            )}
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegisterEvents;