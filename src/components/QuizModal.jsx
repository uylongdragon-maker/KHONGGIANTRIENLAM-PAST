import React, { useState } from "react";
import { 
  X, 
  Check, 
  AlertCircle, 
  Award, 
  RotateCcw, 
  Printer, 
  Download,
  Share2,
  FileCheck2
} from "lucide-react";
import { questionsData } from "../data/exhibits";

export default function QuizModal({ onClose, onPassQuiz }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [userName, setUserName] = useState("");
  const [certificateGenerated, setCertificateGenerated] = useState(false);

  const currentQuestion = questionsData[currentIdx];

  const handleOptionSelect = (optIdx) => {
    if (showAnswer) return;
    setSelectedOption(optIdx);
    setShowAnswer(true);

    if (optIdx === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowAnswer(false);
    if (currentIdx < questionsData.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
      if (score >= 4) {
        onPassQuiz(); // Unlock badges and complete footer quest
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setScore(0);
    setQuizFinished(false);
    setCertificateGenerated(false);
    setUserName("");
  };

  const handleGenerateCertificate = (e) => {
    e.preventDefault();
    if (!userName.trim()) return;
    setCertificateGenerated(true);
  };

  const handlePrint = () => {
    window.print();
  };

  // Generate random certificate ID
  const certId = `3DPAST-2026-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="modal-backdrop ui-element" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: certificateGenerated ? '650px' : '550px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={16} />
        </button>

        {/* 1. QUIZ RUNNING STATE */}
        {!quizFinished && (
          <div className="quiz-question-card">
            {/* Header / Progress bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-secondary)' }}>
              <span style={{ fontWeight: 600 }}>Bài Kiểm Tra Nhận Thức Phòng Chống Ma Túy</span>
              <span>Câu hỏi {currentIdx + 1} / {questionsData.length}</span>
            </div>
            
            <div className="quiz-progress-bar">
              <div 
                className="quiz-progress-fill" 
                style={{ width: `${((currentIdx + 1) / questionsData.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <h3 style={{ fontSize: '1rem', fontWeight: 600, lineHeight: 1.5, marginTop: '8px' }}>
              {currentQuestion.question}
            </h3>

            {/* Options list */}
            <div className="quiz-options">
              {currentQuestion.options.map((opt, i) => {
                let optClass = "quiz-option";
                if (showAnswer) {
                  if (i === currentQuestion.answer) {
                    optClass += " correct";
                  } else if (i === selectedOption) {
                    optClass += " incorrect";
                  }
                } else if (i === selectedOption) {
                  optClass += " selected";
                }

                return (
                  <button 
                    key={i} 
                    className={optClass}
                    onClick={() => handleOptionSelect(i)}
                    disabled={showAnswer}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                      <span>{opt}</span>
                      {showAnswer && i === currentQuestion.answer && <Check size={14} style={{ color: 'var(--color-emerald)' }} />}
                      {showAnswer && i === selectedOption && i !== currentQuestion.answer && <X size={14} style={{ color: 'var(--color-ruby)' }} />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {showAnswer && (
              <div style={{ 
                background: 'rgba(255,255,255,0.03)', 
                border: '1px stroke var(--border-light)', 
                padding: '12px', 
                borderRadius: '8px',
                fontSize: '0.75rem',
                lineHeight: 1.4
              }}>
                <strong style={{ color: selectedOption === currentQuestion.answer ? 'var(--color-emerald)' : 'var(--color-ruby)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                  {selectedOption === currentQuestion.answer ? <Check size={12} /> : <AlertCircle size={12} />}
                  {selectedOption === currentQuestion.answer ? "Đáp án chính xác!" : "Đáp án chưa chính xác!"}
                </strong>
                <p style={{ color: 'var(--color-secondary)' }}>{currentQuestion.explain}</p>
              </div>
            )}

            {/* Next button */}
            {showAnswer && (
              <button 
                onClick={handleNext}
                className="exhibit-btn"
                style={{ background: 'var(--color-gold)', color: '#000', border: 'none', fontWeight: 700 }}
              >
                <span>{currentIdx === questionsData.length - 1 ? "Xem Kết Quả" : "Câu Tiếp Theo"}</span>
              </button>
            )}
          </div>
        )}

        {/* 2. QUIZ FINISHED STATE */}
        {quizFinished && !certificateGenerated && (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            <div style={{ 
              width: 70, 
              height: 70, 
              borderRadius: '50%', 
              background: score >= 4 ? 'rgba(39, 174, 96, 0.12)' : 'rgba(235, 87, 87, 0.12)',
              border: `2px solid ${score >= 4 ? 'var(--color-emerald)' : 'var(--color-ruby)'}`,
              display: 'flex',
              alignItems: 'center',
              justifycontent: 'center',
              color: score >= 4 ? 'var(--color-emerald)' : 'var(--color-ruby)'
            }}>
              {score >= 4 ? (
                <Award size={36} style={{ margin: 'auto' }} />
              ) : (
                <RotateCcw size={36} style={{ margin: 'auto' }} />
              )}
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              {score >= 4 ? "Hoàn Thành Xuất Sắc!" : "Chưa Đạt Tiêu Chuẩn"}
            </h3>
            
            <p style={{ fontSize: '0.85rem', color: 'var(--color-secondary)', maxWidth: '400px', lineHeight: 1.5 }}>
              {score >= 4 
                ? `Chúc mừng bạn đã trả lời chính xác ${score}/${questionsData.length} câu hỏi. Bạn đã nắm giữ kiến thức vững vàng để tự bảo vệ bản thân và xã hội trước hiểm họa ma túy!` 
                : `Bạn trả lời đúng ${score}/${questionsData.length} câu hỏi. Để nhận Chứng nhận danh giá, bạn cần đạt tối thiểu 4/5 câu hỏi chính xác. Hãy ôn tập lại tiêu bản và thử lại!`
              }
            </p>

            {score >= 4 ? (
              /* Name Form to generate Certificate */
              <form onSubmit={handleGenerateCertificate} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--color-secondary)', textAlign: 'left', fontWeight: 600 }}>
                  Nhập Họ & Tên đầy đủ để cấp chứng chỉ:
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    type="text" 
                    className="chat-input"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '10px 14px' }}
                    placeholder="Nguyễn Văn A"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <button 
                    type="submit" 
                    className="exhibit-btn"
                    style={{ background: 'var(--color-gold)', color: '#000', border: 'none', fontWeight: 700, padding: '0 20px', flex: 'initial' }}
                  >
                    <span>Cấp Chứng Nhận</span>
                  </button>
                </div>
              </form>
            ) : (
              <button 
                onClick={handleRestart}
                className="exhibit-btn"
                style={{ background: 'var(--color-gold)', color: '#000', border: 'none', fontWeight: 700, marginTop: '10px' }}
              >
                <RotateCcw size={16} />
                <span>Thực Hiện Lại Bài Thi</span>
              </button>
            )}
          </div>
        )}

        {/* 3. PREMIUM CERTIFICATE COMPONENT */}
        {certificateGenerated && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="print-certificate-wrapper">
            {/* The printable card */}
            <div className="certificate-container" id="printable-certificate-card">
              {/* Double border background grid decoration */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.05, backgroundImage: 'radial-gradient(var(--color-gold) 1px, transparent 0)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold)', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '2px' }}>
                <Award size={14} fill="var(--color-gold)" /> Triển Lãm Phòng Chống Ma Túy 3D
              </div>

              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-gold)', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px' }}>
                Chứng Nhận Danh Dự
              </h2>
              
              <div style={{ width: '40px', height: '2px', background: 'var(--color-gold)', margin: '4px 0' }} />

              <p style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--color-secondary)' }}>
                Chứng chỉ này được trân trọng trao cho
              </p>

              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', margin: '4px 0', textShadow: '0 0 10px rgba(255,255,255,0.2)' }}>
                {userName.toUpperCase()}
              </h1>

              <p style={{ fontSize: '0.8rem', color: 'var(--color-secondary)', maxWidth: '420px', lineHeight: 1.5 }}>
                Đã hoàn thành xuất sắc khóa trải nghiệm thực tế ảo tương tác 3D và vượt qua kỳ kiểm tra kiến thức nhận diện, phòng chống tệ nạn ma túy bảo vệ cộng đồng.
              </p>

              {/* Metrics */}
              <div style={{ display: 'flex', gap: '20px', background: 'rgba(0,0,0,0.3)', padding: '8px 20px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.75rem', marginTop: '6px' }}>
                <div>Kết quả: <strong style={{ color: 'var(--color-emerald)' }}>{score}/5 Đúng</strong></div>
                <div style={{ width: 1, height: 14, background: 'var(--border-light)' }} />
                <div>Hạng: <strong style={{ color: 'var(--color-gold)' }}>Xuất sắc (Gold)</strong></div>
              </div>

              {/* Seal and Signature area */}
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginTop: '12px', padding: '0 20px' }}>
                <div style={{ textAlign: 'left', fontSize: '0.65rem', color: 'var(--color-secondary)' }}>
                  <div>Mã chứng nhận: <strong>{certId}</strong></div>
                  <div>Ngày cấp: {new Date().toLocaleDateString('vi-VN')}</div>
                </div>

                <div className="certificate-seal">
                  <div style={{ textAlign: 'center', padding: '4px' }}>
                    <div style={{ fontSize: '0.5rem', fontWeight: 800 }}>BTC 3D PAST</div>
                    <FileCheck2 size={16} style={{ margin: '3px auto 0 auto', color: '#000' }} />
                    <div style={{ fontSize: '0.45rem', fontWeight: 600, marginTop: '2px' }}>ĐÃ CHỨNG NHẬN</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate Action row */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={handlePrint}
                className="exhibit-btn"
                style={{ background: 'var(--color-gold)', color: '#000', border: 'none', fontWeight: 700 }}
              >
                <Printer size={16} />
                <span>In Chứng Nhận</span>
              </button>
              <button 
                onClick={handlePrint}
                className="exhibit-btn"
              >
                <Download size={16} />
                <span>Tải Chứng Chỉ (PDF)</span>
              </button>
              <button 
                onClick={handleRestart}
                className="exhibit-btn"
              >
                <RotateCcw size={16} />
                <span>Làm Lại Bài Thi</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
