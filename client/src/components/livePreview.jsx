import React, { useEffect, useRef } from "react";
import { MonitorSmartphone } from "lucide-react";

export default function LivePreview({ code }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Remove import/export lines
    const cleanedCode = code
      .split("\n")
      .filter(line => !line.trim().startsWith("import") && !line.trim().startsWith("export"))
      .join("\n");

    // Detect first component name
    const match = cleanedCode.match(/const (\w+)\s*=\s*\(/);
    const componentName = match?.[1] || null;

    const html = `
      <html>
        <head>
          <style>
            body {
              font-family: sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background: white;
            }
          </style>
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel">
            try {
              const { useState, useEffect, useRef } = React;

              ${cleanedCode}

              const root = ReactDOM.createRoot(document.getElementById('root'));
              ${componentName ? `root.render(<${componentName} />);` : `document.getElementById('root').innerText = 'No component found';`}
            } catch (err) {
              document.getElementById('root').innerHTML = '<pre style="color:red;">Error: ' + err.message + '</pre>';
            }
          </script>
        </body>
      </html>
    `;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    iframe.src = url;

    return () => URL.revokeObjectURL(url);
  }, [code]);

  return (
    <div className="h-full min-h-[500px] max-h-[calc(100vh-6rem)] flex flex-col rounded-3xl bg-white/60 backdrop-blur-xl shadow-xl ring-1 ring-white/30 px-10 py-8 relative overflow-hidden">
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-gradient-to-br from-indigo-500 via-pink-400 to-yellow-400 opacity-30 blur-[90px] rounded-full z-0" />
      <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-gradient-to-br from-yellow-400 via-pink-400 to-indigo-500 opacity-30 blur-[90px] rounded-full z-0" />

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2">
          <MonitorSmartphone className="w-5 h-5 text-indigo-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Live Component Preview</h2>
      </div>

      <div className="flex-1 relative z-10 flex items-center justify-center text-gray-800 text-lg font-medium rounded-xl bg-white/70 overflow-hidden">
        <iframe
          ref={iframeRef}
          title="Live Preview"
          className="w-full h-full border-none rounded-xl"
        />
      </div>
    </div>
  );
}
