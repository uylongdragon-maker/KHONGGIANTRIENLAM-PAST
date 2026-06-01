import React, { useState, useEffect } from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  Info, 
  Activity, 
  AlertTriangle,
  RotateCcw,
  Maximize,
  X,
  Sparkles
} from "lucide-react";

export default function ExhibitHUDModal({
  exhibit,
  onClose,
  onOpenInspect,
  onSaveExhibit,
  isSaved
}) {
  const [activeTab, setActiveTab] = useState("info");
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-pause audio on exhibit change and handle Web Speech API Synthesis
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlaying(false);
    }, 0);
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    return () => clearTimeout(timer);
  }, [exhibit]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    if (isPlaying) {
      const textToSpeak = exhibit.audioText || exhibit.description;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = "vi-VN";
      utterance.rate = 0.95; // Premium natural narrative speed
      utterance.pitch = 1.0;

      // Locate premium native voice if available
      const voices = window.speechSynthesis.getVoices();
      const viVoice = voices.find(v => v.lang.toLowerCase().startsWith("vi"));
      if (viVoice) {
        utterance.voice = viVoice;
      }

      utterance.onend = () => {
        setIsPlaying(false);
      };
      utterance.onerror = () => {
        setIsPlaying(false);
      };

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [isPlaying, exhibit]);

  return (
    <div className="hud-popup-backdrop" onClick={onClose}>
      <style jsx>{`
        .hud-popup-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(4, 6, 11, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          font-family: 'Outfit', sans-serif;
          animation: hudFadeIn 0.3s ease-out;
        }

        @keyframes hudFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .hud-popup-container {
          background: rgba(10, 18, 30, 0.7);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(86, 204, 242, 0.25);
          box-shadow: 0 0 30px rgba(86, 204, 242, 0.15), inset 0 0 15px rgba(86, 204, 242, 0.05);
          border-radius: 24px;
          width: 90%;
          max-width: 520px;
          padding: 28px;
          position: relative;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          gap: 20px;
          animation: hudSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes hudSlideUp {
          from { transform: translateY(30px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .hud-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #8a96a8;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .hud-close-btn:hover {
          color: #ffffff;
          background: rgba(235, 87, 87, 0.15);
          border-color: rgba(235, 87, 87, 0.3);
        }

        .hud-badge {
          align-self: flex-start;
          background: rgba(235, 87, 87, 0.1);
          border: 1px solid rgba(235, 87, 87, 0.3);
          color: #eb5757;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 4px 10px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 6px;
          animation: pulseGlow 2s infinite;
        }

        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(235, 87, 87, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(235, 87, 87, 0); }
          100% { box-shadow: 0 0 0 0 rgba(235, 87, 87, 0); }
        }

        .hud-header h2 {
          font-size: 1.5rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: linear-gradient(135deg, #ffffff 0%, #a0aec0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-top: 6px;
        }

        .hud-header p {
          font-size: 0.78rem;
          color: #8a96a8;
          font-weight: 600;
          margin-top: 4px;
        }

        .hud-tab-row {
          display: flex;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          gap: 16px;
        }

        .hud-tab-btn {
          background: transparent;
          border: none;
          color: #8a96a8;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 0.8rem;
          padding: 10px 4px;
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
        }

        .hud-tab-btn:hover {
          color: #ffffff;
        }

        .hud-tab-btn.active {
          color: #56ccf2;
        }

        .hud-tab-btn.active::after {
          content: "";
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 2px;
          background: #56ccf2;
          box-shadow: 0 0 8px #56ccf2;
        }

        .hud-content {
          font-size: 0.85rem;
          line-height: 1.5;
          color: #d1d5db;
          min-height: 160px;
          max-height: 240px;
          overflow-y: auto;
          scrollbar-width: thin;
        }

        .effects-box {
          background: rgba(235, 87, 87, 0.06);
          border: 1px solid rgba(235, 87, 87, 0.15);
          padding: 14px;
          border-radius: 12px;
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .effects-title {
          font-weight: 700;
          color: #eb5757;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .effects-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .effects-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.8rem;
          color: #e5e7eb;
        }

        .effects-bullet {
          color: #eb5757;
          font-size: 1.1rem;
          line-height: 0.8;
        }

        .hud-warning {
          font-style: italic;
          color: #f2994a;
          border-left: 2px solid #f2994a;
          padding-left: 10px;
          margin-top: 12px;
          font-size: 0.78rem;
          background: rgba(242, 153, 74, 0.03);
          padding-top: 6px;
          padding-bottom: 6px;
          border-radius: 0 8px 8px 0;
        }

        .hud-action-row {
          display: flex;
          gap: 12px;
          margin-top: 10px;
        }

        .hud-btn {
          flex: 1;
          background: rgba(255, 255, 255, 0.04);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.08);
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          padding: 12px;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
        }

        .hud-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .hud-btn-primary {
          background: #56ccf2;
          color: #000000;
          border: none;
        }

        .hud-btn-primary:hover {
          background: #3bbce8;
          box-shadow: 0 0 15px rgba(86, 204, 242, 0.4);
        }

        .hud-btn-accent {
          border-color: rgba(212, 175, 55, 0.3);
          color: #d4af37;
        }

        .hud-btn-accent:hover {
          background: rgba(212, 175, 55, 0.08);
          border-color: #d4af37;
        }

        /* Audio styling */
        .hud-audio-box {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 16px;
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
        }

        .hud-audio-controls {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .hud-play-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #56ccf2;
          color: #000000;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 0 12px rgba(86, 204, 242, 0.3);
        }

        .hud-play-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 18px rgba(86, 204, 242, 0.5);
        }

        .hud-audio-wave {
          display: flex;
          align-items: center;
          gap: 3px;
          flex-grow: 1;
          height: 32px;
        }

        .hud-wave-bar {
          flex-grow: 1;
          width: 2px;
          background: rgba(86, 204, 242, 0.2);
          border-radius: 10px;
          transition: all 0.2s ease;
        }

        .hud-audio-wave.playing .hud-wave-bar {
          background: #56ccf2;
          animation: hudWavePlay 1.2s ease-in-out infinite alternate;
        }

        @keyframes hudWavePlay {
          from { height: 15%; }
          to { height: 95%; }
        }
      `}</style>

      <div className="hud-popup-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="hud-close-btn" onClick={onClose}>
          <X size={16} />
        </button>

        {/* Threat Level Badge */}
        <div className="hud-badge">
          <AlertTriangle size={12} />
          <span>Mức độ nguy hại: Loại A (Cực độc)</span>
        </div>

        {/* Header Title */}
        <div className="hud-header">
          <h2>{exhibit.name}</h2>
          <p>{exhibit.category} • Quy cách: {exhibit.inspectInfo || "Mẫu bột nén tinh khiết"}</p>
        </div>

        {/* Tabs */}
        <div className="hud-tab-row">
          <button 
            className={`hud-tab-btn ${activeTab === "info" ? "active" : ""}`}
            onClick={() => setActiveTab("info")}
          >
            THÔNG TIN TÁC HẠI
          </button>
          <button 
            className={`hud-tab-btn ${activeTab === "audio" ? "active" : ""}`}
            onClick={() => setActiveTab("audio")}
          >
            AUDIO THUYẾT MINH
          </button>
        </div>

        {/* Content */}
        <div className="hud-content">
          {activeTab === "info" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <p>{exhibit.description}</p>
              
              <div className="effects-box">
                <span className="effects-title">
                  <Activity size={12} /> Tác động hủy hoại sinh học:
                </span>
                <div className="effects-list">
                  {exhibit.effects.map((eff, i) => (
                    <div key={i} className="effects-item">
                      <span className="effects-bullet">•</span>
                      <span>{eff}</span>
                    </div>
                  ))}
                </div>
              </div>

              {exhibit.warning && (
                <div className="hud-warning">
                  {exhibit.warning}
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Audio guide player */}
              <div className="hud-audio-box">
                <div className="hud-audio-controls">
                  <button className="hud-play-btn" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause size={18} fill="#000" /> : <Play size={18} fill="#000" />}
                  </button>

                  <div className={`hud-audio-wave ${isPlaying ? "playing" : ""}`}>
                    {exhibit.waveform.map((val, i) => (
                      <div 
                        key={i} 
                        className="hud-wave-bar" 
                        style={{ 
                          height: isPlaying ? undefined : `${val}%`, 
                          animationDuration: isPlaying ? `${0.6 + (i * 0.05)}s` : undefined 
                        }}
                      />
                    ))}
                  </div>

                  <Volume2 size={16} style={{ color: "#8a96a8" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.68rem", color: "#8a96a8" }}>
                  <span>{isPlaying ? "Đang phát..." : "Thuyết minh hướng dẫn viên tự động"}</span>
                  <span>{isPlaying ? "0:12 / 2:15" : "0:00 / 2:15"}</span>
                </div>
              </div>

              <p style={{ fontSize: "0.8rem", color: "#e5e7eb", fontStyle: "italic" }}>
                &ldquo;{exhibit.audioText}&rdquo;
              </p>
            </div>
          )}
        </div>

        {/* Action Row */}
        <div className="hud-action-row">
          <button 
            className={`hud-btn ${isSaved ? "hud-btn-accent" : ""}`} 
            onClick={() => onSaveExhibit(exhibit.id)}
          >
            <Sparkles size={14} />
            <span>{isSaved ? "Đã Lưu Mẫu" : "Lưu Tiêu Bản"}</span>
          </button>
          
          <button className="hud-btn" onClick={onOpenInspect}>
            <RotateCcw size={14} />
            <span>Xoay 3D</span>
          </button>

          <button className="hud-btn hud-btn-primary" onClick={onOpenInspect}>
            <Maximize size={14} />
            <span>Xem Phóng To</span>
          </button>
        </div>
      </div>
    </div>
  );
}
