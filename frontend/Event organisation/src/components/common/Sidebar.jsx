import { NavLink } from "react-router-dom";

const Sidebar = ({ onLinkClick, user }) => {
  const mainLinks = [
    { to: "dashboard", label: "Dashboard" },
    { to: "allEvents", label: "Browse Events" },
    { to: "my-bookings", label: "My Bookings" },
  ];

  return (
    <div className="flex flex-col h-full w-64 bg-slate-900 text-white">
      
      {/* USER INFO */}
      <div className="flex flex-col items-center py-6 border-b border-slate-700">
        <img
          src={user?.avatar || "https://i.pravatar.cc/150"}
          alt="User"
          className="w-20 h-20 rounded-full border-4 border-amber-500 object-cover"
        />
        <h3 className="mt-3 font-semibold">{user?.name || "User"}</h3>
        <span className="text-xs text-amber-400">User</span>
      </div>

      {/* NAV LINKS */}
      <div className="flex-1 px-4 py-6 space-y-2">
        {mainLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onLinkClick}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition font-medium ${
                isActive
                  ? "bg-amber-500 text-white"
                  : "hover:bg-slate-800 text-slate-200"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;