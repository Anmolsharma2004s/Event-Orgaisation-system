const User = require("../Models/AuthModel");

const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { username, phone, location, bio } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, phone, location, bio },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Profile update failed",
      error: error.message,
    });
  }
};

module.exports = { updateProfile };
