const NotificationModel = require("../Models/NotificationModel");

const getAdminNotifications = async (req, res) => {
  try {
    const notifications = await NotificationModel.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notifications",
      error: error.message,
    });
  }
};

module.exports = { getAdminNotifications };