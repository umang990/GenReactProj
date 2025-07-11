import React, { useRef, useEffect } from "react";
import { Copy, Code, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import SparkleLoader from "./sparkleloader";

export default function CodeOutput({
  selectedModel,
  setSelectedModel,
  codeOutput,
  copyToClipboard,
  loading,
  expanded,
  setExpanded
}) {
  const contentRef = useRef(null);
  const contentHeight = contentRef.current?.scrollHeight || 0;

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [codeOutput, loading]);

  const toggleExpand = () => setExpanded((prev) => !prev);

  return (
    <div className="min-h-[250px] flex flex-col relative">
      {/* Model Toggle */}
      <div className="relative w-80 h-14 mb-1 bg-white/60 backdrop-blur-xl rounded-full shadow-md overflow-hidden">
        <motion.div
          className="absolute top-1 left-1 h-[44px] w-[calc(50%-0.5rem)] rounded-full bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-400 shadow-md z-0"
          animate={{ x: selectedModel === "gemini" ? "100%" : "0%" }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        />
        <div className="relative z-10 flex h-full font-semibold text-base uppercase tracking-wide select-none">
          {["chatgpt", "gemini"].map((model) => {
            const isActive = selectedModel === model;
            return (
              <button
                key={model}
                onClick={() => setSelectedModel(model)}
                className={`w-1/2 h-full flex items-center justify-center transition-colors duration-200 ${isActive ? "text-white" : "text-gray-800"}`}
              >
                {model}
              </button>
            );
          })}
        </div>
      </div>

      {/* Output Box */}
      <div className="relative z-10 rounded-3xl bg-white/60 backdrop-blur-xl shadow-xl ring-1 ring-white/30 px-8 py-6 overflow-hidden">
        {/* Glow Background */}
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-gradient-to-br from-indigo-500 via-pink-400 to-yellow-400 opacity-30 blur-[90px] rounded-full z-0" />
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-gradient-to-br from-yellow-400 via-pink-400 to-indigo-500 opacity-30 blur-[90px] rounded-full z-0" />

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="p-2">
            <Code className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Code Output</h2>
        </div>

        {/* Top Buttons */}
        <div className="absolute top-6 right-6 flex gap-3 z-20">
          <button
            onClick={toggleExpand}
            className="text-pink-400 hover:text-pink-600"
            title={expanded ? "Collapse" : "Expand"}
          >
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown size={18} />
            </motion.div>
          </button>
          <button
            onClick={copyToClipboard}
            className="bg-white text-gray-800 hover:bg-gray-100 shadow-md rounded-full p-2 transition-all duration-300 active:scale-95"
            title="Copy code"
          >
            <Copy size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Expandable Content */}
        <motion.div
          animate={{ maxHeight: expanded ? contentHeight + 60 : 120 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden relative z-10 bg-white/70 rounded-xl shadow-inner px-4 py-2"
        >
          <pre
            ref={contentRef}
            className="text-sm font-mono text-gray-800 whitespace-pre-wrap leading-relaxed tracking-wide pr-6"
          >
            {loading ? (
              <div className="generative-loader rounded-md p-4">
                <SparkleLoader />
              </div>
            ) : (
              codeOutput || "// No code yet"
            )}
          </pre>
        </motion.div>

        {/* Bottom Expand Button */}
        <div className="flex justify-end pt-2 relative z-10">
          <button
            onClick={toggleExpand}
            className="text-pink-400 hover:text-pink-600 transition-transform"
            title={expanded ? "Collapse" : "Expand"}
          >
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown size={18} />
            </motion.div>
          </button>
        </div>
      </div>
    </div>
  );
}
