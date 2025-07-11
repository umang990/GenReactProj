// chatMessage.jsx
import React, { useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function ChatMessage({ prompt, response, timestamp, responseTimestamp, isGenerating }) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [response]);

  const toggleExpand = () => setExpanded((prev) => !prev);

  return (
    <div className="flex flex-col gap-2">
      {/* Prompt bubble */}
      {prompt && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="self-end max-w-[70%] relative rounded-[1.5rem] rounded-tr-[0.3rem] bg-gradient-to-br from-indigo-400 via-pink-300 to-yellow-300 text-white px-4 py-2 text-sm shadow-md"
        >
          {prompt}
          <div className="text-right text-xs text-white/70 mt-1">{timestamp}</div>
        </motion.div>
      )}

      {/* Assistant response */}
      {response && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="self-start max-w-[90%] relative rounded-[1.5rem] rounded-tl-[0.3rem] bg-white/80 text-gray-800 px-4 py-2 text-sm shadow-md"
        >
          <button
            onClick={toggleExpand}
            className="absolute top-2 right-2 text-pink-400 hover:text-pink-600 z-10"
            title={expanded ? "Collapse" : "Expand"}
          >
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown size={18} />
            </motion.div>
          </button>

          <motion.div
            animate={{ maxHeight: expanded ? contentHeight + 40 : 100 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <pre ref={contentRef} className="whitespace-pre-wrap font-mono text-sm leading-relaxed pr-6">
              {response}
            </pre>
          </motion.div>

          <div className="flex justify-end pt-1">
            <button
              onClick={toggleExpand}
              className="text-pink-400 hover:text-pink-600"
              title={expanded ? "Collapse" : "Expand"}
            >
              <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown size={18} />
              </motion.div>
            </button>
          </div>
          <div className="text-left text-xs text-gray-600 mt-1">{responseTimestamp}</div>
        </motion.div>
      )}

      {/* Typing animation */}
      {isGenerating && (
        <div className="self-start flex items-center gap-2 text-gray-600 pl-3 pt-2">
          <div className="relative flex gap-1 text-xl">
            <span className="animate-bounce [animation-delay:-0.2s]">.</span>
            <span className="animate-bounce [animation-delay:-0.1s]">.</span>
            <span className="animate-bounce">.</span>
          </div>
        </div>
      )}
    </div>
  );
}
