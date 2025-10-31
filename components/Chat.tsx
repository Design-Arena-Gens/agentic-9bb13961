"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type ChatMessage = {
  id: string;
  role: "user" | "agent" | "system";
  content: string;
  timestamp: number;
};

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: crypto.randomUUID(),
      role: "system",
      content:
        "Hi! I'm the Wisdomrule Guide. Ask me about our ethos, offerings, or how we empower communities.",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([
    "What is Wisdomrule's mission?",
    "How do engagements begin?"
  ]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages]);

  const groupedMessages = useMemo(() => {
    return messages.map((msg) => ({ ...msg, time: new Date(msg.timestamp).toLocaleTimeString() }));
  }, [messages]);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const value = input.trim();
    if (!value || pending) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: value,
      timestamp: Date.now()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setPending(true);
    setError(null);

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: [...messages, userMessage].map(({ role, content }) => ({ role, content })) })
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const payload: { message: string; suggestions?: string[] } = await response.json();
      const agentMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "agent",
        content: payload.message,
        timestamp: Date.now()
      };

      setMessages((prev) => [...prev, agentMessage]);
      setSuggestions(payload.suggestions?.length ? payload.suggestions : suggestions);
    } catch (err) {
      console.error(err);
      setError("I ran into a snag answering that. Try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="chat">
      <div className="chat__history" ref={containerRef}>
        {groupedMessages.map((message) => (
          <div key={message.id} className={`chat__bubble chat__bubble--${message.role}`}>
            <div className="chat__bubble-header">
              <span className="chat__bubble-role">
                {message.role === "user" ? "You" : message.role === "agent" ? "Wisdomrule Guide" : "System"}
              </span>
              <span className="chat__bubble-time">{message.time}</span>
            </div>
            <p className="chat__bubble-content">{message.content}</p>
          </div>
        ))}
      </div>
      <form className="chat__composer" onSubmit={handleSubmit}>
        <input
          className="chat__input"
          placeholder="Ask about Wisdomrule..."
          value={input}
          onChange={(evt) => setInput(evt.target.value)}
          disabled={pending}
        />
        <button type="submit" className="chat__send" disabled={pending || !input.trim()}>
          {pending ? "Thinking..." : "Send"}
        </button>
      </form>
      {error ? <p className="chat__error">{error}</p> : null}
      {!error && suggestions.length ? (
        <div className="chat__suggestions">
          {suggestions.map((item) => (
            <button
              type="button"
              key={item}
              className="chat__suggestion"
              onClick={() => setInput(item)}
              disabled={pending}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
