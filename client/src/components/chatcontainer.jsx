// chatContainer.jsx
import React, { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { MessageCircle } from "lucide-react";

export default function ChatContainer({ messages = [], loading }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div
      ref={containerRef}
      className="relative z-10 h-[300px] overflow-y-auto space-y-4 px-4 py-4 bg-white/50 backdrop-blur-md rounded-xl shadow-inner border border-white/30 scrollbar-thin scrollbar-thumb-pink-300/70 scrollbar-track-white/20"
    >
            <div className="sticky top-0 z-10 bg-white/60 backdrop-blur-md flex items-center gap-2 py-2 px-2 rounded-t-xl">
        <MessageCircle className="text-pink-500" size={20} />
        <h2 className="text-lg font-semibold text-gray-700">Chat</h2>
        </div>


      {messages.length === 0 && !loading ? (
        <div className="text-gray-600 text-sm text-center">No messages yet.</div>
      ) : (
        messages.map((msg, index) => {
          if (msg.role === "user") {
            const assistant = messages[index + 1]?.role === "assistant" ? messages[index + 1] : null;
            const isGenerating = loading && !assistant;

            return (
              <ChatMessage
                key={index}
                prompt={msg.content}
                response={assistant?.content}
                timestamp={msg.timestamp}
                responseTimestamp={assistant?.timestamp}
                isGenerating={isGenerating}
              />
            );
          }
          return null;
        })
      )}
    </div>
  );
}
