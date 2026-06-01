import React, { useState } from "react";
import { 
  Star, 
  Bookmark, 
  Calendar, 
  Award,
  X,
  CheckCircle2,
  Lock
} from "lucide-react";

export default function Footer({
  completedQuests,
  savedExhibitsCount,
  onOpenQuiz,
  earnedBadgesCount
}) {
  const [showQuestModal, setShowQuestModal] = useState(false);
  const [showSavedModal, setShowSavedModal] = useState(false);

  // Hardcoded quest checklist based on anti-drug museum goals
  const quests = [
    { id: "curator", label: "Gặp gỡ & Trò chuyện với AI Curator", key: "chat_curator" },
    { id: "heroin", label: "Khám phá chi tiết tiêu bản Heroin", key: "explore_heroin" },
    { id: "meth", label: "Khám phá chi tiết tiêu bản Ma túy đá", key: "explore_meth" },
    { id: "cocaine", label: "Khám phá chi tiết tiêu bản Cocaine", key: "explore_cocaine" },
    { id: "ecstasy", label: "Khám phá chi tiết tiêu bản Thuốc lắc", key: "explore_ecstasy" },
    { id: "cannabis", label: "Khám phá chi tiết tiêu bản Cần sa", key: "explore_cannabis" },
    { id: "poster_w1", label: "Đọc thông điệp áp phích ở Vách phân khu 1", key: "read_poster1" },
    { id: "poster_e1", label: "Đọc thông điệp áp phích ở Vách phân khu 2", key: "read_poster3" },
    { id: "ask_ai", label: "Đặt câu hỏi thảo luận riêng với AI Curator", key: "custom_chat" },
    { id: "quiz", label: "Hoàn thành bài trắc nghiệm kiến thức ma túy", key: "pass_quiz" }
  ];

  // Count active finished items
  const finishedCount = quests.filter(q => completedQuests.includes(q.key)).length;

  return (
    <>
      <footer className="app-footer ui-element glass-panel">
        {/* QUESTS PROGRESS */}
        <div className="footer-widget" onClick={() => setShowQuestModal(true)}>
          <div className="footer-icon-box">
            <Star size={18} fill={finishedCount > 0 ? "var(--color-gold)" : "none"} />
          </div>
          <div className="footer-widget-text">
            <span className="footer-widget-label">Nhiệm vụ khám phá</span>
            <span className="footer-widget-val" style={{ color: 'var(--color-gold)' }}>
              {finishedCount}/{quests.length} Đã hoàn thành
            </span>
          </div>
        </div>

        {/* BOOKMARKS / MY COLLECTION */}
        <div className="footer-widget" onClick={() => setShowSavedModal(true)}>
          <div className="footer-icon-box">
            <Bookmark size={18} fill={savedExhibitsCount > 0 ? "var(--color-gold)" : "none"} />
          </div>
          <div className="footer-widget-text">
            <span className="footer-widget-label">Bộ sưu tập của tôi</span>
            <span className="footer-widget-val">
              {savedExhibitsCount} Hiện vật đã lưu
            </span>
          </div>
        </div>

        {/* EVENTS & ACTIVITIES */}
        <div className="footer-widget">
          <div className="footer-icon-box">
            <Calendar size={18} />
          </div>
          <div className="footer-widget-text">
            <span className="footer-widget-label">Sự kiện & Hoạt động</span>
            <span className="footer-widget-val">Sắp diễn ra: 2</span>
          </div>
        </div>

        {/* CERTIFICATION & QUIZ LINK */}
        <div className="footer-widget" onClick={onOpenQuiz}>
          <div className="footer-icon-box" style={{ borderColor: earnedBadgesCount > 0 ? 'var(--color-gold)' : 'var(--border-light)' }}>
            <Award size={18} fill={earnedBadgesCount > 0 ? "var(--color-gold)" : "none"} />
          </div>
          <div className="footer-widget-text">
            <span className="footer-widget-label">Chứng nhận của tôi</span>
            <span className="footer-widget-val" style={{ color: earnedBadgesCount > 0 ? 'var(--color-gold)' : 'var(--color-primary)' }}>
              {earnedBadgesCount > 0 ? "Đã đạt 3 huy chương" : "Đang khóa"}
            </span>
          </div>
        </div>
      </footer>

      {/* QUESTS MODAL */}
      {showQuestModal && (
        <div className="modal-backdrop ui-element" onClick={() => setShowQuestModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowQuestModal(false)}>
              <X size={16} />
            </button>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-gold)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Star size={18} fill="var(--color-gold)" /> Danh Sách Nhiệm Vụ Khám Phá
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-secondary)' }}>
              Hãy hoàn thành toàn bộ các thử thách dưới đây bằng cách tương tác với bảo tàng để mở khóa Huy chương Vàng Phòng chống ma túy tối cao!
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
              {quests.map((q) => {
                const done = completedQuests.includes(q.key);
                return (
                  <div key={q.id} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    padding: '10px 14px', 
                    borderRadius: '10px', 
                    background: done ? 'rgba(39, 174, 96, 0.08)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${done ? 'rgba(39, 174, 96, 0.2)' : 'rgba(255,255,255,0.05)'}`
                  }}>
                    {done ? (
                      <CheckCircle2 size={16} style={{ color: 'var(--color-emerald)' }} />
                    ) : (
                      <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid var(--color-secondary)' }} />
                    )}
                    <span style={{ fontSize: '0.85rem', color: done ? 'var(--color-primary)' : 'var(--color-secondary)', textDecoration: done ? 'line-through' : 'none' }}>
                      {q.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SAVED EXHIBITS MODAL */}
      {showSavedModal && (
        <div className="modal-backdrop ui-element" onClick={() => setShowSavedModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowSavedModal(false)}>
              <X size={16} />
            </button>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-gold)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bookmark size={18} fill="var(--color-gold)" /> Thư Mục Hiện Vật Đã Lưu ({savedExhibitsCount})
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-secondary)' }}>
              Danh sách các tiêu bản ma túy bạn đã đánh dấu lưu lại trong quá trình tham quan để nghiên cứu sâu thêm.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
              {savedExhibitsCount === 0 ? (
                <div style={{ padding: '30px', textAlign: 'center', color: 'var(--color-secondary)', fontSize: '0.8rem' }}>
                  Thư mục trống. Hãy đến gần tiêu bản bất kỳ và nhấn "Lưu mẫu" ở thanh bên phải.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-gold)', padding: '6px', background: 'rgba(242,153,74,0.1)', borderRadius: '6px' }}>
                    ✔ Bạn đã lưu các tài liệu nghiên cứu y học pháp lý liên quan đến các chất gây nghiện. Các tài liệu này đã được sao lưu đồng bộ về hệ thống bảo mật cá nhân của bạn.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
