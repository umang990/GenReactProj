import React from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function PromptInput({ prompt, setPrompt, sendPromptToAPI, loading }) {
  return (
    <div className="relative z-10 w-full">
      <div className="rounded-full bg-white/60 backdrop-blur-xl shadow-lg border border-white/30 transition overflow-hidden flex items-center">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type a prompt..."
          disabled={loading}
          className="flex-1 px-6 py-4 text-gray-800 placeholder-gray-500 bg-transparent font-medium rounded-full focus:outline-none"
        />
        <button
          className="h-12 w-12 m-1 flex items-center justify-center rounded-full bg-white/40 text-indigo-600 hover:text-indigo-800 shadow-sm hover:shadow-md transition duration-300"
          title="Sparkles"
        >
          <Sparkles size={20} strokeWidth={2} />
        </button>
        <button
          onClick={sendPromptToAPI}
          disabled={loading}
          className="h-12 w-12 m-1 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-400 to-yellow-400 shadow-lg hover:shadow-xl transition duration-300 active:scale-95"
          aria-label="Submit Prompt"
        >
          <ArrowUpRight size={22} strokeWidth={2.4} className="text-white" />
        </button>
      </div>
    </div>
  );
}
