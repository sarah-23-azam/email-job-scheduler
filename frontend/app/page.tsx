"use client";

import { useState } from "react";

export default function Home() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sendAt, setSendAt] = useState("");
  const [loading, setLoading] = useState(false);

  const scheduleEmail = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:4000/api/schedule-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to,
          subject,
          message,
          sendAt,
        }),
      });

      if (!res.ok) {
        throw new Error("Server error");
      }

      alert("✅ Email scheduled successfully!");
      setTo("");
      setSubject("");
      setMessage("");
      setSendAt("");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to schedule email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 40, maxWidth: 500, margin: "0 auto" }}>
      <h1>Email Scheduler</h1>

      <input
        type="email"
        placeholder="To email"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />

      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />

      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />

      <input
        type="datetime-local"
        value={sendAt}
        onChange={(e) => setSendAt(e.target.value)}
        style={{ width: "100%", marginBottom: 20, padding: 8 }}
      />

      <button
        onClick={scheduleEmail}
        disabled={loading}
        style={{
          width: "100%",
          padding: 12,
          background: "black",
          color: "white",
          cursor: "pointer",
        }}
      >
        {loading ? "Scheduling..." : "Schedule Email"}
      </button>
    </main>
  );
}
