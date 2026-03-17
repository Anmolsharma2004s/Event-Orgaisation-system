import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import Sidebar from "../../components/common/Sidebar";

const UserDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const pageTitle = location.pathname.split("/").pop() || "dashboard";

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">

      {/* Mobile menu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static w-64 bg-slate-900 z-40 ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <Sidebar />
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <Sparkles className="text-purple-600" />
            <h1 className="text-3xl font-bold capitalize">
              {pageTitle.replace("-", " ")}
            </h1>
          </div>
        </div>

        {/* CHILD ROUTES RENDER HERE */}
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
