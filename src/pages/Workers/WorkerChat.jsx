import { useState } from "react";

function WorkerChat() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  const send = () => {
    if (!msg) return;

    setMessages([...messages, msg]);
    setMsg("");
  };

  return (
    <div>
      <h2>💬 Chat</h2>

      <div style={{ minHeight: "150px", marginBottom: "10px" }}>
        {messages.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>

      <input value={msg} onChange={(e)=>setMsg(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
}

export default WorkerChat;