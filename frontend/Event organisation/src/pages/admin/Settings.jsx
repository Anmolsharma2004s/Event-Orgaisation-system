import { useEffect, useState } from "react";
import api from "../../api";
import {
  Settings, User, Bell, Lock, Palette, CreditCard,
  Mail, Smartphone, Eye, EyeOff, Save
} from "lucide-react";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  // ================= PROFILE =================
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    avatar: "",
  });

  // ================= SECURITY =================
  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ================= LOAD USER =================
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setProfileData({
        name: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        bio: user.bio || "",
        avatar:
          user.avatar ||
          "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
      });
    }
  }, []);

  // ================= HANDLERS =================
  const handleProfileChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSecurityChange = (field, value) => {
    setSecurityData((prev) => ({ ...prev, [field]: value }));
  };

  // ================= SAVE PROFILE =================
  const saveProfile = async () => {
    try {
      setSaveStatus("saving");

      const res = await api.put("/user/profile", {
        username: profileData.name,
        phone: profileData.phone,
        location: profileData.location,
        bio: profileData.bio,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));

      setSaveStatus("saved");
      setTimeout(() => setSaveStatus(""), 2000);
    } catch (err) {
      alert("Profile update failed");
      setSaveStatus("");
    }
  };

  // ================= CHANGE PASSWORD =================
  const changePassword = async () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await api.put("/user/change-password", {
        currentPassword: securityData.currentPassword,
        newPassword: securityData.newPassword,
      });

      alert("Password updated successfully");
      setSecurityData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      alert("Password update failed");
    }
  };

  // ================= UI =================
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <Settings size={32} className="text-blue-600" />
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      {/* TABS */}
      <div className="flex gap-4 mb-6">
        {["profile", "security"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-white border"
            }`}
          >
            {tab === "profile" ? "Profile" : "Security"}
          </button>
        ))}
      </div>

      {/* ================= PROFILE TAB ================= */}
      {activeTab === "profile" && (
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={profileData.name}
              onChange={(e) =>
                handleProfileChange("name", e.target.value)
              }
              placeholder="Name"
              className="border p-3 rounded"
            />

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" />
              <input
                value={profileData.email}
                disabled
                className="border p-3 pl-10 rounded bg-gray-100"
              />
            </div>

            <div className="relative">
              <Smartphone className="absolute left-3 top-3 text-gray-400" />
              <input
                value={profileData.phone}
                onChange={(e) =>
                  handleProfileChange("phone", e.target.value)
                }
                placeholder="Phone"
                className="border p-3 pl-10 rounded"
              />
            </div>

            <input
              value={profileData.location}
              onChange={(e) =>
                handleProfileChange("location", e.target.value)
              }
              placeholder="Location"
              className="border p-3 rounded"
            />
          </div>

          <textarea
            value={profileData.bio}
            onChange={(e) =>
              handleProfileChange("bio", e.target.value)
            }
            placeholder="Bio"
            className="border p-3 rounded w-full mt-4"
          />

          <button
            onClick={saveProfile}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded flex items-center gap-2"
          >
            <Save size={18} />
            {saveStatus === "saving"
              ? "Saving..."
              : saveStatus === "saved"
              ? "Saved"
              : "Save"}
          </button>
        </div>
      )}

      {/* ================= SECURITY TAB ================= */}
      {activeTab === "security" && (
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Change Password</h2>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Current Password"
            value={securityData.currentPassword}
            onChange={(e) =>
              handleSecurityChange("currentPassword", e.target.value)
            }
            className="border p-3 rounded w-full mb-3"
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={securityData.newPassword}
            onChange={(e) =>
              handleSecurityChange("newPassword", e.target.value)
            }
            className="border p-3 rounded w-full mb-3"
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={securityData.confirmPassword}
            onChange={(e) =>
              handleSecurityChange("confirmPassword", e.target.value)
            }
            className="border p-3 rounded w-full mb-3"
          />

          <button
            onClick={() => setShowPassword(!showPassword)}
            className="text-sm text-blue-600 mb-3 flex items-center gap-2"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            {showPassword ? "Hide" : "Show"} Password
          </button>

          <button
            onClick={changePassword}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Update Password
          </button>
        </div>
      )}
    </div>
  );
};

export default Setting;