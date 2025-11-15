import { Loader2 } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex w-full">
      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-200 dark:bg-zinc-800 rounded-2xl text-zinc-700 dark:text-zinc-300 text-sm shadow">
        <Loader2 className="w-4 h-4 animate-spin" /> Bot is typing...
      </div>
    </div>
  );
}
