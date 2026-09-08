import { useState } from "react";

function App() {
    const [message, setMessage] = useState("");
    const [reply, setReply] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!message.trim()) return;

        setLoading(true);
        setReply("");

        try {
            const response = await fetch("http://localhost:3001/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: message,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            setReply(data.reply);
        } catch (error) {
            console.error(error);
            setReply("Sorry, I could not connect to the AI server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                padding: "40px",
                fontFamily: "Arial, sans-serif",
                background: "#f5f7fa",
            }}
        >
            <h1>SIH Yojana Setu</h1>

            <p>AI Assistant for Government Schemes</p>

            <div style={{ marginTop: "30px" }}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendMessage();
                        }
                    }}
                    placeholder="Ask me about government schemes..."
                    style={{
                        width: "60%",
                        padding: "14px",
                        fontSize: "16px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                    }}
                />

                <button
                    onClick={sendMessage}
                    disabled={loading}
                    style={{
                        marginLeft: "10px",
                        padding: "14px 22px",
                        fontSize: "16px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    {loading ? "Thinking..." : "Send"}
                </button>
            </div>

            {reply && (
                <div
                    style={{
                        marginTop: "30px",
                        padding: "20px",
                        background: "white",
                        borderRadius: "10px",
                        maxWidth: "700px",
                    }}
                >
                    <h3>AI Assistant</h3>
                    <p>{reply}</p>
                </div>
            )}
        </div>
    );
}

export default App;