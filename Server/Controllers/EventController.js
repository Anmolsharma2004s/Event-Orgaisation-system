const EventModel = require("../Models/EventModel");


const createEvent = async (req, res) => {
  const {
    date,
    amount,
    location,
    status,
    activityMessage,
    description,
    title,
    category,
    strength,
  } = req.body;

  try {
    const finalStatus =
      req.user.role === "admin" && status ? status : "pending";

    const event = await EventModel.create({
      createdBy: req.user._id,
      date,
      location,
      amount,
      title,
      description,
      category,
      strength,
      status: finalStatus,
      activityMessage: activityMessage || "Event requested",
    });

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create event",
      error: error.message,
    });
  }
};


const updateEvent = async (req, res) => {
  const {
    date,
    location,
    amount,
    title,
    description,
    category,
    strength,
    status,
  } = req.body;

  try {
    const event = await EventModel.findByIdAndUpdate(
      req.params.id,
      {
        date,
        location,
        amount,
        title,
        description,
        category,
        strength,
        status,
      },
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update event",
      error: error.message,
    });
  }
};


const deleteEvent = async (req, res) => {
  try {
    const event = await EventModel.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "Event deleted successfully",
      event,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete event",
      error: error.message,
    });
  }
};


const getAllEvents = async (req, res) => {
  try {
    const filter = req.query.status ? { status: req.query.status } : {};

    const events = await EventModel.find(filter)
      .populate("createdBy", "username email role")
      .sort({ date: 1 });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


const getEventById = async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id).populate(
      "createdBy",
      "username email role"
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


const getApprovedEvents = async (req, res) => {
  try {
    const filter = { status: "upcoming" };

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const events = await EventModel.find(filter).sort({ date: 1 });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const approveEvent = async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.status !== "pending") {
      return res.status(400).json({
        message: "Only pending events can be approved",
      });
    }

    event.status = "upcoming";
    await event.save();

    res.status(200).json({
      message: "Event approved successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to approve event",
      error: error.message,
    });
  }
};


const getEventCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (!category) {
      return res.status(400).json({
        message: "Category is required",
      });
    }

    const events = await EventModel.find({
      category,
      status: "upcoming",
    }).sort({ createdAt: -1 });

    res.status(200).json(events);
  } catch (error) {
    console.error("Category events error:", error);
    res.status(500).json({
      message: "Failed to fetch category events",
      error: error.message,
    });
  }
};


module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  getApprovedEvents,
  approveEvent,
  getEventCategory,
};
