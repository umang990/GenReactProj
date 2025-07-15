import React from "react";
import {
  Settings,
  User,
  MessageSquarePlus,
  Search,
  Menu,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ expanded, setExpanded, sidebarRef }) => {
  const chats = [
    "First React Component",
    "Gemini Example",
    "Form Builder",
    "Dark Mode Toggle",
    "UI Cards",
  ];

  return (
    <motion.div
      ref={sidebarRef}
      animate={{ width: expanded ? 256 : 0, opacity: expanded ? 1 : 0 }}
      initial={{ width: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed top-0 left-0 h-screen z-40 bg-white/100 backdrop-blur-xl shadow-xl border-r border-white/30 flex flex-col justify-between overflow-hidden"
    >
      {/* Top Section */}
      <div>
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <AnimatePresence>
            {expanded && (
              <motion.span
                className="text-lg font-semibold text-gray-800"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                ReactGen
              </motion.span>
            )}
          </AnimatePresence>

          {/* Menu Icon to collapse */}
          <button
            onClick={() => setExpanded(false)}
            className="p-1 rounded hover:bg-white/40 transition"
          >
            <Menu size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="p-2 flex flex-col gap-6 mt-2">
          <button className="flex items-center gap-3 w-full text-left py-2 px-3 rounded-md text-pink-500 hover:bg-pink-100/30 transition">
            <MessageSquarePlus size={18} />
            <AnimatePresence>
              {expanded && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  New Chat
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Search + Chat List */}
          <div className="flex flex-col gap-6">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400">
                <Search size={16} />
              </div>
              <AnimatePresence>
                {expanded && (
                  <motion.input
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    type="text"
                    placeholder="Search chats"
                    className="w-full pl-10 pr-4 py-2 rounded-md bg-white/40 text-sm placeholder-pink-400 text-gray-800 focus:outline-none"
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-2">
              {chats.map((chat, i) => (
                <button
                  key={i}
                  className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md hover:bg-pink-100/20 text-gray-700 transition"
                >
                  <div className="w-2 h-2 rounded-full bg-pink-300/80" />
                  <AnimatePresence>
                    {expanded && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {chat}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-2 border-t border-white/20">
        <button className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md hover:bg-pink-100/30 text-gray-700 transition">
          <Settings size={18} className="text-pink-400" />
          <AnimatePresence>
            {expanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        <button className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md hover:bg-pink-100/30 text-gray-700 transition">
          <User size={18} className="text-pink-400" />
          <AnimatePresence>
            {expanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                Account
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
