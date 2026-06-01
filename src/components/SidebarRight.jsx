import React, { useState, useEffect, useRef } from "react";
import { 
  Send, 
  Sparkles, 
  Volume2
} from "lucide-react";

export default function SidebarRight({
  onCuratorQuery
}) {
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "ai",
      text: "Chào bạn! Tôi là AI Curator của triển lãm. Tôi có thể giải đáp tất cả câu hỏi của bạn về tác hại của các chất ma túy, cơ chế gây nghiện, và cách phòng tránh. Bạn muốn tìm hiểu thông tin gì?"
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
        reply = "Heroin là chất cực độc chiết xuất từ cây thuốc phiện. Nó ức chế hành tủy khiến hệ hô hấp ngừng hoạt động cực nhanh. Chỉ 1 lần thử cũng có thể gây nghiện vĩnh viễn và đẩy người dùng vào cái chết cận kề.";
      } else if (lowerText.includes("đá") || lowerText.includes("meth") || lowerText.includes("crystal")) {
        reply = "Ma túy đá (Methamphetamine) tàn phá hệ thần kinh cực mạnh. Nó đẩy lượng dopamine lên gấp hàng chục lần mức tự nhiên, gây ảo giác hoang tưởng (ngáo đá), lở loét da và hoại tử răng miệng nghiêm trọng.";
      } else if (lowerText.includes("lắc") || lowerText.includes("mdma") || lowerText.includes("ecstasy")) {
        reply = "Thuốc lắc (MDMA) kích thích hệ thần kinh trung ương mạnh mẽ, làm tăng thân nhiệt lên mức 41-42 độ C gây đông máu nội mạch và suy đa tạng chớp nhoáng. MDMA tại vũ trường thường bị pha trộn hóa chất diệt chuột vô cùng nguy hiểm.";
      } else if (lowerText.includes("cần sa") || lowerText.includes("thảo mộc") || lowerText.includes("thần")) {
        reply = "Cần sa chứa THC, một chất ảo giác làm suy giảm vĩnh viễn IQ của thanh thiếu niên, phá hủy thùy trán chịu trách nhiệm về tư duy logic và nhận thức xã hội. Nó là chất dẫn dụ nguy hiểm dẫn tới các ma túy nặng hơn.";
      } else if (lowerText.includes("cai nghiện") || lowerText.includes("giúp đỡ") || lowerText.includes("điều trị")) {
        reply = "Khi phát hiện người thân nghiện ma túy, điều quan trọng nhất là thấu hiểu, động viên tinh thần và đưa họ đến cơ sở y tế cai nghiện chuyên nghiệp để phục hồi hành vi khoa học, tránh kỳ thị xa lánh.";
      } else {
        reply = "Ma túy dù ở dạng tự nhiên hay tổng hợp đều tàn phá tế bào não, cướp đi hạnh phúc gia đình và tương lai tươi sáng của bạn. Hãy kiên quyết nói KHÔNG với mọi lời rủ rê, bảo vệ bản thân vì một cộng đồng lành mạnh!";
      }

      setChatMessages(prev => [...prev, { sender: "ai", text: reply }]);
      if (onCuratorQuery) onCuratorQuery(); // Trigger progress in Footer quests
    }, 1000);
  };

  const quickChips = [
    "Ma túy đá tàn phá cơ thể thế nào?",
    "Heroin gây nghiện ra sao?",
    "Tác hại của cần sa?",
    "Làm sao giúp bạn cai nghiện?"
  ];

  return (
    <aside className="sidebar-right ui-element glass-panel" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* AI CURATOR CHATBOX SECTION */}
      <div className="curator-chat-box" style={{ height: "100%", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <div className="chat-header">
          <div className="chat-header-title">
            <Sparkles size={14} style={{ color: 'var(--color-gold)' }} />
            <span style={{ fontWeight: 800 }}>AI CURATOR HƯỚNG DẪN VIÊN</span>
          </div>
          <div className="status-indicator">
            <span className="status-dot"></span>
            <span>Trực tuyến</span>
          </div>
        </div>

        {/* Chat History */}
        <div className="chat-messages" style={{ flexGrow: 1, overflowY: "auto" }}>
          {chatMessages.map((msg, i) => (
            <div key={i} className={`chat-message ${msg.sender}`}>
              <div className="msg-avatar">
                {msg.sender === "ai" ? "AI" : "U"}
              </div>
              <div className="msg-bubble">
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick query chips */}
        <div className="chat-chips">
          {quickChips.map((chip, idx) => (
            <button 
              key={idx} 
              className="chat-chip"
              onClick={() => handleSendMessage(chip)}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Chat Input form */}
        <form 
          className="chat-input-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(chatInput);
          }}
        >
          <input 
            type="text" 
            className="chat-input"
            placeholder="Nhập câu hỏi của bạn..." 
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
          />
          <button type="submit" className="chat-submit-btn">
            <Send size={12} fill="#000" />
          </button>
        </form>
      </div>
    </aside>
  );
}
