import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function ChatInput({ input, setInput, sendMessage, isTyping }: any) {
  return (
    <div className="flex items-center gap-3 px-6 py-4 border-t border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
      <Input
        placeholder="Describe your travel plan..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        className="flex-1"
      />
      <Button onClick={sendMessage} disabled={isTyping}>
        {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send"}
      </Button>
    </div>
  );
}
