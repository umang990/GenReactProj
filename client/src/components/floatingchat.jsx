import React, { useState } from "react";
import ChatContainer from "./chatcontainer";
import PromptInput from "./promptinput/promptInput";
import { MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function FloatingChat({ messages, loading, prompt, setPrompt, sendPromptToAPI }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Chat Bubble Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-br from-pink-400 via-yellow-300 to-indigo-400 text-white p-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
      >
        <MessageCircle size={22} />
      </button>

      {/* Full Chat UI when open */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay Blur */}
            <motion.div
              className="fixed inset-0 bg-white/30 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Chat Panel */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-lg bg-white/60 backdrop-blur-lg shadow-xl rounded-2xl p-4"
            >
              <div className="max-h-[400px] overflow-y-auto">
                <ChatContainer messages={messages} loading={loading} />
              </div>
              <div className="pt-4">
                <PromptInput
                  prompt={prompt}
                  setPrompt={setPrompt}
                  sendPromptToAPI={sendPromptToAPI}
                  loading={loading}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
