import React, { useState, useEffect, useRef } from "react";
import { 
  Send, 
  Sparkles, 
  X,
  Compass,
  MessageSquare,
  AlertCircle
} from "lucide-react";

export default function CuratorHUDModal({
  onClose,
  onCompleteQuest
}) {
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "ai",
      text: "Chào bạn! Tôi là AI Curator - hướng dẫn viên ảo của triển lãm PAST. Tôi ở đây để đồng hành cùng bạn khám phá kiến thức khoa học về tác hại của chất gây nghiện và hỗ trợ bạn bảo vệ bản thân, cộng đồng. Bạn muốn thảo luận chủ đề gì hôm nay?"
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // Add user message
    const newMessages = [...chatMessages, { sender: "user", text }];
    setChatMessages(newMessages);
    setChatInput("");

    // Simulate AI typing delay
    setTimeout(() => {
      let reply = "";
      const lowerText = text.toLowerCase();

      if (lowerText.includes("heroin") || lowerText.includes("thuốc phiện")) {
        reply = "Heroin là chất cực độc thuộc nhóm opioid chiết xuất từ nhựa cây anh túc. Nó tàn hại sức khỏe toàn diện: làm hoại tử tế bào thần kinh, suy kiệt hệ miễn dịch, và đặc biệt ức chế hành tủy gây ngừng thở tử vong tức khắc khi quá liều.";
      } else if (lowerText.includes("đá") || lowerText.includes("meth") || lowerText.includes("crystal")) {
        reply = "Ma túy đá (Methamphetamine) là chất kích thích tổng hợp cực độc. Nó cưỡng ép não bộ phóng thích dopamine gấp 10-15 lần bình thường, gây ảo giác hoang tưởng bạo lực (ngáo đá), lở loét hoại tử da, hoại tử răng lợi kinh hoàng.";
      } else if (lowerText.includes("lắc") || lowerText.includes("mdma") || lowerText.includes("ecstasy")) {
        reply = "Thuốc lắc (MDMA) là chất ảo giác cực kỳ nguy hiểm thường ngụy trang dưới các viên nén sặc sỡ. Nó làm tăng thân nhiệt cơ thể lên ngưỡng ác tính (42°C) gây suy đa tạng kịch phát và hoại tử cơ vân tức thì.";
      } else if (lowerText.includes("cần sa") || lowerText.includes("thảo mộc") || lowerText.includes("thần")) {
        reply = "Cần sa chứa hoạt chất hướng thần THC gây phá hoại tế bào não thùy trán, suy kiệt IQ vĩnh viễn ở thanh thiếu niên và dễ châm ngòi chứng tâm thần phân liệt. Nó đóng vai trò 'chất dẫn dụ' mở đường cho các ma túy nặng hơn.";
      } else if (lowerText.includes("cai nghiện") || lowerText.includes("giúp đỡ") || lowerText.includes("điều trị")) {
        reply = "Cai nghiện ma túy đòi hỏi sự phối hợp y tế khoa học kết hợp liệu pháp tâm lý phục hồi hành vi. Hãy luôn yêu thương, động viên, tránh kỳ thị xa lánh và đưa người cai nghiện tới cơ sở y tế xã hội có thẩm quyền chỉ dẫn.";
      } else {
        reply = "Tất cả các chất ma túy dù ở dạng tự nhiên hay tổng hợp đều bóp méo sinh hóa não bộ, triệt tiêu động lực và cướp đi hạnh phúc gia đình. Bản lĩnh đích thực là nói KHÔNG trước mọi cám dỗ, giữ gìn một tương lai tươi sáng!";
      }

      setChatMessages(prev => [...prev, { sender: "ai", text: reply }]);
      if (onCompleteQuest) {
        onCompleteQuest("chat_curator");
        onCompleteQuest("custom_chat");
      }
    }, 800);
  };

  const quickChips = [
    "Ma túy đá tàn phá cơ thể thế nào?",
    "Heroin gây nghiện ra sao?",
    "Tác hại của cần sa?",
    "Làm sao giúp bạn cai nghiện?"
  ];

  return (
    <div className="curator-hud-backdrop" onClick={onClose}>
      <style jsx>{`
        .curator-hud-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(4, 6, 11, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1100;
          font-family: 'Outfit', sans-serif;
          animation: hudFadeIn 0.3s ease-out;
        }

        @keyframes hudFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .curator-hud-container {
          background: rgba(10, 20, 35, 0.75);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(47, 128, 237, 0.3);
          box-shadow: 0 0 35px rgba(47, 128, 237, 0.2), inset 0 0 20px rgba(47, 128, 237, 0.05);
          border-radius: 24px;
          width: 90%;
          max-width: 550px;
          height: 80vh;
          max-height: 600px;
          padding: 24px;
          position: relative;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          gap: 16px;
          animation: hudSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes hudSlideUp {
          from { transform: translateY(30px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .curator-hud-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 12px;
        }

        .curator-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .curator-avatar-hud {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(47, 128, 237, 0.15);
          border: 1px solid rgba(47, 128, 237, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2f80ed;
          animation: holoFloat 3s ease-in-out infinite;
        }

        @keyframes holoFloat {
          0% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
          100% { transform: translateY(0); }
        }

        .curator-title-text h3 {
          font-size: 1.05rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #2f80ed;
        }

        .curator-title-text p {
          font-size: 0.72rem;
          color: #8a96a8;
          font-weight: 500;
        }

        .curator-hud-close {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #8a96a8;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .curator-hud-close:hover {
          color: #ffffff;
          background: rgba(235, 87, 87, 0.15);
          border-color: rgba(235, 87, 87, 0.3);
        }

        .curator-chat-messages {
          flex-grow: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-right: 6px;
          scrollbar-width: thin;
        }

        .msg-row {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          max-width: 85%;
        }

        .msg-row.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .msg-bubble-hud {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 10px 14px;
          border-radius: 4px 14px 14px 14px;
          font-size: 0.8rem;
          line-height: 1.45;
          color: #e2e8f0;
        }

        .msg-row.user .msg-bubble-hud {
          background: rgba(47, 128, 237, 0.12);
          border-color: rgba(47, 128, 237, 0.25);
          color: #ffffff;
          border-radius: 14px 4px 14px 14px;
        }

        .msg-sender-lbl {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255,255,255,0.08);
          font-size: 0.65rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8a96a8;
          flex-shrink: 0;
        }

        .msg-row.user .msg-sender-lbl {
          background: rgba(47, 128, 237, 0.15);
          border-color: rgba(47, 128, 237, 0.3);
          color: #56ccf2;
        }

        .curator-chat-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .curator-chip-hud {
          background: rgba(47, 128, 237, 0.05);
          border: 1px solid rgba(47, 128, 237, 0.15);
          color: #56ccf2;
          font-family: 'Outfit', sans-serif;
          font-size: 0.72rem;
          padding: 6px 12px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .curator-chip-hud:hover {
          background: rgba(47, 128, 237, 0.15);
          border-color: #56ccf2;
          transform: translateY(-1px);
        }

        .curator-chat-form {
          display: flex;
          gap: 8px;
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 6px 10px;
          align-items: center;
        }

        .curator-chat-input {
          flex-grow: 1;
          background: transparent;
          border: none;
          color: #ffffff;
          font-family: 'Outfit', sans-serif;
          font-size: 0.82rem;
          outline: none;
          padding: 6px;
        }

        .curator-chat-submit {
          background: #2f80ed;
          color: #ffffff;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .curator-chat-submit:hover {
          background: #1d4ed8;
          box-shadow: 0 0 10px rgba(47, 128, 237, 0.35);
        }
      `}</style>

      <div className="curator-hud-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="curator-hud-header">
          <div className="curator-info">
            <div className="curator-avatar-hud">
              <Sparkles size={18} />
            </div>
            <div className="curator-title-text">
              <h3>AI Curator Hướng Dẫn Viên</h3>
              <p>Mô phỏng hologram hướng dẫn viên trực tuyến tại PAST 2026</p>
            </div>
          </div>
          <button className="curator-hud-close" onClick={onClose}>
            <X size={14} />
          </button>
        </div>

        {/* Message History */}
        <div className="curator-chat-messages">
          {chatMessages.map((msg, i) => (
            <div key={i} className={`msg-row ${msg.sender}`}>
              <div className="msg-sender-lbl">
                {msg.sender === "ai" ? "AI" : "U"}
              </div>
              <div className="msg-bubble-hud">
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Query Chips */}
        <div className="curator-chat-chips">
          {quickChips.map((chip, idx) => (
            <button 
              key={idx} 
              className="curator-chip-hud"
              onClick={() => handleSendMessage(chip)}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form 
          className="curator-chat-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(chatInput);
          }}
        >
          <input 
            type="text" 
            className="curator-chat-input"
            placeholder="Đặt câu hỏi thảo luận về chất ma túy..." 
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
          />
          <button type="submit" className="curator-chat-submit">
            <Send size={12} fill="#fff" />
          </button>
        </form>
      </div>
    </div>
  );
}
