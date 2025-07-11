import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import PromptInput from "./components/promptinput/promptInput";
import CodeOutput from "./components/codeOutput";
import LivePreview from "./components/livePreview";
import FloatingChat from "./components/floatingchat";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("chatgpt");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [codeOutput, setCodeOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const sendPromptToAPI = async () => {
    if (!prompt.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const newMessage = { role: "user", content: prompt, timestamp };
    setMessages((prev) => [...prev, newMessage]);
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      const responseMessage = {
        role: "assistant",
        content: data.code || "// No response received",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, responseMessage]);
      setCodeOutput(data.code || "// No response received");
    } catch (err) {
      console.error(err);
      setCodeOutput("// Error fetching response from API");
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  const copyToClipboard = () => navigator.clipboard.writeText(codeOutput);

  // Ref for positioning the floating prompt input
  const outputContainerRef = useRef(null);
  const [promptBoxWidth, setPromptBoxWidth] = useState(0);
  const [promptBoxLeft, setPromptBoxLeft] = useState(0);

  useEffect(() => {
    if (expanded && outputContainerRef.current) {
      const rect = outputContainerRef.current.getBoundingClientRect();
      setPromptBoxWidth(rect.width);
      setPromptBoxLeft(rect.left);
    }
  }, [expanded]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-200 via-gray-100 to-white text-gray-900 font-inter">
      <Sidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />

      <div className="pl-16 transition-all duration-300">
        <Header />

        <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-10">
          <div className="flex flex-col space-y-4 relative">
            {/* Main CodeOutput Container */}
            <div ref={outputContainerRef}>
              <CodeOutput
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
                codeOutput={codeOutput}
                copyToClipboard={copyToClipboard}
                loading={loading}
                expanded={expanded}
                setExpanded={setExpanded}
              />
            </div>

            {/* Normal Prompt Input when not expanded */}
            {!expanded && (
              <PromptInput
                prompt={prompt}
                setPrompt={setPrompt}
                sendPromptToAPI={sendPromptToAPI}
                loading={loading}
              />
            )}

            {/* Floating Chat */}
            <FloatingChat
              messages={messages}
              loading={loading}
              prompt={prompt}
              setPrompt={setPrompt}
              sendPromptToAPI={sendPromptToAPI}
            />
          </div>

          <div className="sticky top-24 h-fit">
            <LivePreview code={codeOutput} />
          </div>
        </main>
      </div>

      {/* Floating Prompt Input at screen bottom when expanded */}
      {expanded && (
        <div
          className="fixed bottom-4 z-50 transition-all duration-300"
          style={{
            width: promptBoxWidth,
            left: promptBoxLeft,
          }}
        >
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            sendPromptToAPI={sendPromptToAPI}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
}
