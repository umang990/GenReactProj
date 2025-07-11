import React from "react";
import { Sparkles } from "lucide-react";

export default function SparkleLoader() {
  return (
    <div className="flex items-center gap-3 animate-pulse text-indigo-600">
      <Sparkles className="animate-spin-slow" size={20} />
      <span className="italic">Generating...</span>
    </div>
  );
}
