import React, { useState, useRef, useEffect } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const triggerRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const trigger = triggerRef.current;
      const sidebar = sidebarRef.current;
      if (!trigger || !sidebar) return;

      const insideTrigger = trigger.contains(e.target);
      const insideSidebar = sidebar.contains(e.target);

      setSidebarVisible(insideTrigger || insideSidebar);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleClick = () => {
    setSidebarVisible(true); // manual expand on click
  };

  return (
    <>
      {/* Blur overlay when sidebar is expanded */}
      <AnimatePresence>
        {sidebarVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 backdrop-blur-sm transition-opacity"
            style={{ pointerEvents: "none" }}
          />
        )}
      </AnimatePresence>

      <header className="w-full sticky top-0 z-50 flex items-center bg-white/60 backdrop-blur-md shadow-md">
        <div
          ref={triggerRef}
          onClick={handleClick}
          className="relative z-50"
        >
          <div className="p-3 cursor-pointer bg-gradient-to-br from-purple-500 via-pink-400 to-yellow-400 shadow-md rounded-tr-xl rounded-br-xl">
            <Menu className="text-white font-bold text-xl" />
          </div>

          <Sidebar
            expanded={sidebarVisible}
            setExpanded={setSidebarVisible}
            sidebarRef={sidebarRef}
          />
        </div>

        <div className="flex-1 px-4 py-4">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-800">
            ReactGen Compare
          </h1>
        </div>
      </header>
    </>
  );
}
