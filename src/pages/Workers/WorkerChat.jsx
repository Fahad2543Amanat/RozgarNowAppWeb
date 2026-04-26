import { useEffect, useRef, useState } from "react";

const usersData = [
  { id: 1, name: "Ali Worker" },
  { id: 2, name: "Usman Worker" },
  { id: 3, name: "Ahmed Worker" },
];

function GlassChat() {
  const [users] = useState(usersData);
  const [selected, setSelected] = useState(null);
  const [text, setText] = useState("");

  const [isMobile, setIsMobile] = useState(false);

  const inputRef = useRef(null);
  const chatEndRef = useRef(null);

  const [chats, setChats] = useState(
    JSON.parse(localStorage.getItem("glass_chats")) || {}
  );

  /* =========================
     RESPONSIVE FIX (IMPORTANT)
  ========================= */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  /* SAVE */
  useEffect(() => {
    localStorage.setItem("glass_chats", JSON.stringify(chats));
  }, [chats]);

  /* AUTO FOCUS */
  useEffect(() => {
    if (selected && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selected]);

  /* AUTO SCROLL */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, selected]);

  const messages = (id) => chats?.[id] || [];

  const send = () => {
    if (!text.trim() || !selected) return;

    const msg = {
      id: Date.now(),
      text,
      sender: "worker",
      time: new Date().toLocaleTimeString(),
    };

    const updated = {
      ...chats,
      [selected.id]: [...messages(selected.id), msg],
    };

    setChats(updated);
    setText("");
  };

  const openChat = (u) => setSelected(u);

  const goBack = () => setSelected(null);

  return (
    <div style={styles.wrapper}>

      {/* ================= LEFT PANEL ================= */}
      {(!isMobile || !selected) && (
        <div style={styles.left}>
          <div style={styles.logo}>💬 Worker Chats</div>

          {users.map((u) => (
            <div
              key={u.id}
              onClick={() => openChat(u)}
              style={{
                ...styles.userCard,
                border:
                  selected?.id === u.id
                    ? "1px solid #ff6a00"
                    : "1px solid transparent",
              }}
            >
              <div style={styles.avatar}>{u.name.charAt(0)}</div>

              <div>
                <div style={styles.name}>{u.name}</div>
                <div style={styles.sub}>
                  {messages(u.id).slice(-1)[0]?.text || "No messages"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= CHAT PANEL ================= */}
      {selected && (
        <div style={styles.right}>

          {/* HEADER */}
          <div style={styles.header}>
            {isMobile && (
              <button onClick={goBack} style={styles.backBtn}>
                ← Back
              </button>
            )}

            <div style={styles.chatTitle}>{selected.name}</div>
          </div>

          {/* CHAT BODY */}
          <div style={styles.chatArea}>
            {messages(selected.id).map((m) => (
              <div
                key={m.id}
                style={{
                  ...styles.msg,
                  alignSelf:
                    m.sender === "worker"
                      ? "flex-end"
                      : "flex-start",
                  background:
                    m.sender === "worker"
                      ? "linear-gradient(90deg,#ff6a00,#ff9f1c)"
                      : "#f1f1f1",
                  color: m.sender === "worker" ? "white" : "#000",
                }}
              >
                {m.text}
                <div style={styles.time}>{m.time}</div>
              </div>
            ))}

            <div ref={chatEndRef} />
          </div>

          {/* INPUT */}
          <div style={styles.inputBox}>
            <input
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type message..."
              style={styles.input}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />

            <button onClick={send} style={styles.sendBtn}>
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GlassChat;

/* =========================
   STYLES (ORANGE + WHITE)
========================= */
const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial",
    background: "#fff",
  },

  /* LEFT */
  left: {
    width: "30%",
    minWidth: "280px",
    borderRight: "1px solid #eee",
    overflowY: "auto",
    background: "#fff",
  },

  logo: {
    padding: "15px",
    fontWeight: "bold",
    color: "#ff6a00",
    borderBottom: "1px solid #eee",
  },

  userCard: {
    display: "flex",
    gap: "10px",
    padding: "12px",
    cursor: "pointer",
    alignItems: "center",
  },

  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#ff6a00",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },

  name: {
    fontWeight: "bold",
  },

  sub: {
    fontSize: "12px",
    color: "#777",
  },

  /* RIGHT */
  right: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background: "#fff",
  },

  header: {
    padding: "12px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    borderBottom: "1px solid #eee",
    background: "#fff",
  },

  chatTitle: {
    fontWeight: "bold",
    color: "#ff6a00",
  },

  backBtn: {
    background: "#ff6a00",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  chatArea: {
    flex: 1,
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    overflowY: "auto",
    background: "#fafafa",
  },

  msg: {
    padding: "10px 14px",
    borderRadius: "12px",
    maxWidth: "60%",
  },

  time: {
    fontSize: "10px",
    opacity: 0.6,
    marginTop: "4px",
  },

  inputBox: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #eee",
    gap: "10px",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
  },

  sendBtn: {
    background: "#ff6a00",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
  },
};