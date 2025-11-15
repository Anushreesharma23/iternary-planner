import { Card, CardContent } from "@/components/ui/card";

export default function ChatMessage({ role, content }: { role: string; content: string }) {
  const isUser = role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <Card
        className={`max-w-xs sm:max-w-sm md:max-w-md p-3 rounded-2xl shadow text-sm ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
        }`}
      >
        <CardContent className="p-0">{content}</CardContent>
      </Card>
    </div>
  );
}
