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
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  const inputRef = useRef(null);
  const chatEndRef = useRef(null);

  const [chats, setChats] = useState(
    JSON.parse(localStorage.getItem("glass_chats")) || {}
  );

  // Save chats
  useEffect(() => {
    localStorage.setItem("glass_chats", JSON.stringify(chats));
  }, [chats]);

  // Auto focus input
  useEffect(() => {
    if (selected && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selected]);

  // Auto scroll
  useEffect(() => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [chats, selected]);

  const messages = (id) => chats?.[id] || [];

  const send = () => {
    if (!text.trim() || !selected) return;

    const msg = {
      id: Date.now(),
      text,
      sender: "client",
      time: new Date().toLocaleTimeString(),
    };

    const updated = {
      ...chats,
      [selected.id]: [...messages(selected.id), msg],
    };

    setChats(updated);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const openChat = (u) => {
    setSelected(u);
    setIsMobileChatOpen(true);
  };

  const goBack = () => {
    setIsMobileChatOpen(false);
    setSelected(null);
  };

  return (
    <div style={styles.bg} className="chat-wrapper">

      {/* LEFT PANEL */}
      <div
        className="left-panel hide-scroll"
        style={{
          ...styles.leftGlass,
          display:
            isMobileChatOpen && window.innerWidth <= 768 ? "none" : "block",
        }}
      >
        <h2 style={styles.logo}>💬 Chats</h2>

        {users.map((u) => (
          <div
            key={u.id}
            onClick={() => openChat(u)}
            style={{
              ...styles.userCard,
              background:
                selected?.id === u.id
                  ? "rgba(255,106,0,0.25)"
                  : "rgba(255,255,255,0.08)",
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

      {/* RIGHT PANEL (CHAT) */}
      <div
        className="right-panel"
        style={{
          ...styles.rightGlass,
          display: selected ? "flex" : "none",
        }}
      >
        {selected && (
          <>
            {/* HEADER */}
            <div style={styles.header}>
              {/* BACK BUTTON (MOBILE) */}
              <span onClick={goBack} style={styles.backBtn}>
                ← Back
              </span>

              Chat with <b>{selected.name}</b>
            </div>

            {/* CHAT AREA */}
            <div className="hide-scroll" style={styles.chatArea}>
              {messages(selected.id).map((m) => (
                <div
                  key={m.id}
                  style={{
                    ...styles.msg,
                    alignSelf:
                      m.sender === "client" ? "flex-end" : "flex-start",
                    background:
                      m.sender === "client"
                        ? "linear-gradient(135deg,#ff6a00,#ff8c1a)"
                        : "rgba(255,255,255,0.15)",
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
                onKeyDown={handleKeyDown}
                placeholder="Type message..."
                style={styles.input}
              />
              <button onClick={send} style={styles.btn}>
                ➤
              </button>
            </div>
          </>
        )}
      </div>

      {/* RESPONSIVE CSS */}
      <style>{`
        @media (max-width: 768px) {
          .chat-wrapper {
            padding: 0 !important;
            flex-direction: column !important;
          }

          .left-panel,
          .right-panel {
            width: 100% !important;
            height: 100% !important;
            border-radius: 0 !important;
          }
        }

        /* Hide Scrollbar */
        .hide-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .hide-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default GlassChat;

/* =========================
   STYLES
========================= */
const styles = {
  bg: {
    height: "100vh",
    display: "flex",
    background: "linear-gradient(135deg,#ff6a00,#ff8c1a,#000)",
    fontFamily: "Arial",
    overflow: "hidden",
  },

  /* LEFT */
  leftGlass: {
    width: "30%",
    minWidth: "280px",
    height: "100%",
    overflowY: "auto",
    backdropFilter: "blur(20px)",
    background: "rgba(255,255,255,0.08)",
    padding: "15px",
    border: "1px solid rgba(255,255,255,0.2)",
  },

  logo: {
    color: "white",
    marginBottom: "15px",
  },

  userCard: {
    display: "flex",
    gap: "10px",
    padding: "12px",
    borderRadius: "15px",
    marginBottom: "10px",
    cursor: "pointer",
    color: "white",
    alignItems: "center",
  },

  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#ff6a00",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    color: "white",
  },

  name: { fontWeight: "bold" },
  sub: { fontSize: "12px", opacity: 0.7 },

  /* RIGHT */
  rightGlass: {
    flex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backdropFilter: "blur(25px)",
    background: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },

  header: {
    padding: "15px",
    color: "white",
    background: "rgba(0,0,0,0.2)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  backBtn: {
    cursor: "pointer",
    fontWeight: "bold",
    color: "white",
  },

  chatArea: {
    flex: 1,
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    gap: "10px",
  },

  msg: {
    padding: "10px 15px",
    borderRadius: "15px",
    color: "white",
    maxWidth: "60%",
  },

  time: {
    fontSize: "10px",
    opacity: 0.7,
    marginTop: "5px",
  },

  inputBox: {
    display: "flex",
    padding: "15px",
    gap: "10px",
    background: "rgba(0,0,0,0.2)",
  },

  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    outline: "none",
    background: "rgba(255,255,255,0.2)",
    color: "white",
  },

  btn: {
    width: "45px",
    borderRadius: "12px",
    border: "none",
    background: "#ff6a00",
    color: "white",
    cursor: "pointer",
    fontSize: "18px",
  },
};