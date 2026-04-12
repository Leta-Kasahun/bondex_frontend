"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function RootLoading() {
  const [stage, setStage] = useState<"initializing" | "ready" | "welcome">("initializing");
  const [dotIndex, setDotIndex] = useState(0);

  useEffect(() => {
    const stageTimer1 = setTimeout(() => setStage("ready"), 1500);
    const stageTimer2 = setTimeout(() => setStage("welcome"), 2500);

    const dotInterval = setInterval(() => {
      setDotIndex((prev) => (prev + 1) % 4);
    }, 400);

    return () => {
      clearTimeout(stageTimer1);
      clearTimeout(stageTimer2);
      clearInterval(dotInterval);
    };
  }, []);

  const messages = {
    initializing: "Initializing Bondex",
    ready: "Ready",
    welcome: "Welcome to Bondex",
  };

  const dots = ["", ".", "..", "..."];

  return (
    <div className="min-h-screen bg-[#F3F2F0] flex items-center justify-center">
      <div className="text-center space-y-8">

        <div className="relative w-24 h-24 mx-auto">
          <Image
            src="/bondex.png"
            alt="Bondex Logo"
            fill
            sizes="96px"
            className="object-contain"
            priority
          />
        </div>
        

        <h1 className="text-3xl font-heading font-bold text-[#1E293B] tracking-wide">
          {messages[stage]}
          <span className="inline-block w-12 text-left">
            {dots[dotIndex]}
          </span>
        </h1>
        

        <div className="flex justify-center gap-3">
          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
            stage === "initializing" ? "bg-[#2C4E6F] w-6" : "bg-[#D1D9E0]"
          }`} />
          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
            stage === "ready" ? "bg-[#2C4E6F] w-6" : "bg-[#D1D9E0]"
          }`} />
          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
            stage === "welcome" ? "bg-[#2C4E6F] w-6" : "bg-[#D1D9E0]"
          }`} />
        </div>
      </div>
    </div>
  );
}