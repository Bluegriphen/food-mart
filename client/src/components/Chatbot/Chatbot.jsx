import React, { useState, useRef, useEffect } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]); // { sender: 'user'|'bot', text: string }
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const appendMessage = (msg) => setMessages((prev) => [...prev, msg]);

  const sendToBackend = async (text) => {
    try {
      const res = await fetch("http://localhost:4000/api/bot/v1/Message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        // Try to read body for more info, but fallback to generic
        let body = {};
        try {
          body = await res.json();
        } catch (_) {}
        throw new Error(body?.message || `Server responded ${res.status}`);
      }

      const data = await res.json();
      const botText =
        (data && (data.botMessage || data.bot || data.message)) ||
        "Sorry, I couldn't generate a reply.";

      return botText;
    } catch (err) {
      console.error("Chatbot request failed:", err);
      throw err;
    }
  };

  const sendMessage = async () => {
    const trimmed = input?.trim();
    if (!trimmed || loading) return;
    setError(null);

    const userMessage = { sender: "user", text: trimmed };
    appendMessage(userMessage);
    setInput("");
    setLoading(true);

    try {
      const botReply = await sendToBackend(trimmed);
      appendMessage({ sender: "bot", text: botReply });
    } catch (err) {
      const fallback = {
        sender: "bot",
        text: "Something went wrong. Please try again later.",
      };
      appendMessage(fallback);
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "20px auto",
        fontFamily: "Inter, Roboto, sans-serif",
      }}
    >
      <div
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
          background: "#fff",
        }}
      >
        <div
          style={{
            padding: "12px 16px",
            borderBottom: "1px solid #f1f5f9",
            background: "#f8fafc",
          }}
        >
          <strong style={{ fontSize: 16 }}>FoodMart Chatbot</strong>
        </div>

        <div
          role="log"
          aria-live="polite"
          style={{
            height: 380,
            overflowY: "auto",
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            background: "#fbfdff",
          }}
        >
          {messages.length === 0 && (
            <div style={{ color: "#64748b" }}>
              Ask me anything about the menu or orders. Try "hello".
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: m.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "75%",
                  padding: "10px 14px",
                  borderRadius: 18,
                  background: m.sender === "user" ? "#dcf8c6" : "#f1f5f9",
                  color: "#0f172a",
                  lineHeight: 1.4,
                }}
              >
                {m.text}
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            padding: 12,
            borderTop: "1px solid #f1f5f9",
            alignItems: "center",
            background: "#fff",
          }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={loading ? "Sending..." : "Type your message..."}
            rows={1}
            disabled={loading}
            style={{
              flex: 1,
              resize: "none",
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid #e6eef6",
              outline: "none",
              fontSize: 14,
              lineHeight: "18px",
            }}
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            aria-label="Send message"
            style={{
              background: loading ? "#94d3a2" : "#16a34a",
              color: "#fff",
              border: "none",
              padding: "8px 14px",
              borderRadius: 10,
              cursor: loading ? "wait" : "pointer",
              fontWeight: 600,
            }}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>

        {error && (
          <div
            role="alert"
            style={{
              padding: 8,
              borderTop: "1px solid #fee2e2",
              background: "#fff7f7",
              color: "#dc2626",
              fontSize: 13,
            }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
