"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import TypingIndicator from "@/components/TypingIndicator";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hi! I'm your travel planner 🤖✈️. Tell me where you're going and for how long!",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botReply = {
        role: "bot",
        content:
          "Great choice! 🌴☀️ Here's a sample itinerary: Day 1: Beach, Day 2: Temple tour, Day 3: Cafe hopping, Day 4: Waterfalls, Day 5: Adventure activities.",
      };
      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 1800);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-zinc-100 dark:bg-black p-4">
      <Card className="w-full max-w-3xl h-[90vh] flex flex-col rounded-2xl shadow-2xl dark:bg-zinc-900">
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-700">
          <h1 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">Travel Itinerary Planner</h1>
        </div>

        <ScrollArea className="flex-1 px-6 py-6 space-y-6 bg-zinc-50 dark:bg-zinc-950 rounded-md">
          {messages.map((msg, index) => (
            <ChatMessage key={index} role={msg.role} content={msg.content} />
          ))}

          {isTyping && <TypingIndicator />}
        </ScrollArea>

        <ChatInput
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          isTyping={isTyping}
        />
      </Card>
    </div>
  );
}