import React from "react";
import { 
  Award, 
  Library, 
  ShieldCheck, 
  Sparkles 
} from "lucide-react";

export default function Footer({
  onOpenQuiz,
  onOpenLibrary
}) {
  return (
    <footer className="app-footer ui-element glass-panel">
      {/* 1. Official Police Unit Branding */}
      <div className="footer-brand-box">
        <div className="footer-police-badge">
          <ShieldCheck size={18} style={{ color: "var(--color-gold)" }} />
        </div>
        <div className="footer-brand-text">
          <span className="footer-brand-title">CÔNG AN PHƯỜNG TÂN HƯNG</span>
          <span className="footer-brand-sub">CÔNG AN THÀNH PHỐ HỒ CHÍ MINH</span>
        </div>
      </div>

      {/* 2. Direct Essential Action Buttons */}
      <div className="footer-action-pills">
        <button 
          className="footer-pill-btn footer-pill-quiz"
          onClick={onOpenQuiz}
          title="Mở bài trắc nghiệm kiến thức phòng chống ma túy"
        >
          <Award size={15} />
          <span>Khảo Sát Kiến Thức (Trắc Nghiệm)</span>
        </button>

        <button 
          className="footer-pill-btn footer-pill-lib"
          onClick={onOpenLibrary}
          title="Tra cứu danh mục 36 mẫu vật & áp phích nghiệp vụ"
        >
          <Library size={15} />
          <span>Thư Viện 36 Hiện Vật</span>
        </button>
      </div>

      {/* 3. System Status Indicator */}
      <div className="footer-status-box">
        <div className="footer-status-dot" />
        <span className="footer-status-text">Không Gian Triển Lãm 3D • 36 Tiêu Bản Mẫu</span>
      </div>
    </footer>
  );
}
