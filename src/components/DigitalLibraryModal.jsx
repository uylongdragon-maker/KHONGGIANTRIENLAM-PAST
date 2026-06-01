import React, { useState } from "react";
import { 
  X, 
  Search, 
  Compass, 
  Sparkles, 
  MapPin, 
  AlertTriangle,
  Bookmark,
  FileText
} from "lucide-react";

export default function DigitalLibraryModal({
  exhibits,
  posters,
  onClose,
  onTeleport,
  onSelectExhibit,
  savedExhibits,
  onSaveExhibit
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all"); // "all" | "opioids" | "stimulants" | "hallucinogens" | "posters"

  const handleTeleportClick = (item, isPoster) => {
    let targetX = item.position.x;
    let targetZ = item.position.z;

    if (isPoster) {
      // West wall posters are at X = -7.9. East wall posters are at X = 7.9.
      if (item.position.x < 0) {
        targetX = -6.4; // Safe navigable distance in the West hallway
      } else {
        targetX = 6.4;  // Safe navigable distance in the East hallway
      }
      onTeleport(targetX, targetZ);
      onSelectExhibit(null);
    } else {
      if (item.cabinetId === "cabinet_left" || item.position.x < -1) {
        targetX = -1.8; // Safe navigable space in Left hallway (facing left cabinet)
      } else if (item.cabinetId === "cabinet_right" || item.position.x > 1) {
        targetX = 1.8;  // Safe navigable space in Right hallway (facing right cabinet)
      } else if (item.cabinetId === "cabinet_back" || item.position.z > 3) {
        targetX = item.position.x;
        targetZ = 3.6;  // Safe navigable space in Back hallway (facing back cabinet)
      }
      onTeleport(targetX, targetZ);
      onSelectExhibit(item.id);
    }
    onClose();
  };

  const handleSelectDetail = (id) => {
    onSelectExhibit(id);
    onClose();
  };

  // Filter items
  const filteredExhibits = exhibits.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ex.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ex.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (activeFilter === "opioids") return ex.cabinetId === "cabinet_left";
    if (activeFilter === "stimulants") return ex.cabinetId === "cabinet_right";
    if (activeFilter === "hallucinogens") return ex.cabinetId === "cabinet_back";
    return true;
  });

  const filteredPosters = posters.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.impactText.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    return activeFilter === "all" || activeFilter === "posters";
  });

  return (
    <div className="lib-modal-backdrop" onClick={onClose}>
      <style jsx>{`
        .lib-modal-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(4, 6, 11, 0.7);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1050;
          font-family: 'Outfit', sans-serif;
          padding: 20px;
          animation: libFadeIn 0.3s ease-out;
        }

        @keyframes libFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .lib-modal-container {
          background: rgba(10, 18, 30, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(255,255,255,0.02);
          border-radius: 24px;
          width: 100%;
          max-width: 960px;
          height: 88vh;
          padding: 32px;
          position: relative;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          gap: 20px;
          animation: libSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes libSlideUp {
          from { transform: translateY(40px) scale(0.97); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .lib-close-btn {
          position: absolute;
          top: 24px;
          right: 24px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #8a96a8;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .lib-close-btn:hover {
          color: #ffffff;
          background: rgba(235, 87, 87, 0.15);
          border-color: rgba(235, 87, 87, 0.3);
        }

        .lib-header {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .lib-header-title {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #f2994a;
        }

        .lib-header h1 {
          font-size: 1.5rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: linear-gradient(135deg, #ffffff 0%, #a0aec0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .lib-header p {
          font-size: 0.8rem;
          color: #8a96a8;
        }

        /* Search & Filter bar row */
        .lib-control-bar {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 16px;
          align-items: center;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 12px 20px;
          border-radius: 16px;
        }

        .lib-search-box {
          position: relative;
          display: flex;
          align-items: center;
          flex-grow: 1;
        }

        .lib-search-box input {
          width: 100%;
          background: rgba(255, 255, 255, 0.04);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 10px 16px 10px 40px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.85rem;
          outline: none;
          transition: all 0.2s ease;
        }

        .lib-search-box input:focus {
          border-color: #f2994a;
          box-shadow: 0 0 10px rgba(242, 153, 74, 0.15);
        }

        .lib-search-icon {
          position: absolute;
          left: 14px;
          color: #8a96a8;
        }

        .lib-tabs {
          display: flex;
          gap: 8px;
        }

        .lib-tab-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: #8a96a8;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 0.75rem;
          padding: 8px 16px;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .lib-tab-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.06);
        }

        .lib-tab-btn.active {
          background: rgba(242, 153, 74, 0.12);
          border-color: rgba(242, 153, 74, 0.3);
          color: #f2994a;
          box-shadow: 0 0 12px rgba(242, 153, 74, 0.15);
        }

        /* Substance Grid */
        .lib-grid-container {
          flex-grow: 1;
          overflow-y: auto;
          scrollbar-width: thin;
          padding-right: 6px;
        }

        .lib-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
        }

        .lib-card {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .lib-card:hover {
          border-color: rgba(242, 153, 74, 0.25);
          background: rgba(242, 153, 74, 0.02);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }

        .lib-card-meta {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .lib-card-meta h3 {
          font-size: 1rem;
          font-weight: 700;
          color: #ffffff;
        }

        .lib-card-meta span.badge {
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 2px 8px;
          border-radius: 10px;
          background: rgba(235, 87, 87, 0.1);
          border: 1px solid rgba(235, 87, 87, 0.25);
          color: #eb5757;
        }

        .lib-card-category {
          font-size: 0.68rem;
          font-weight: 600;
          color: #f2994a;
          text-transform: uppercase;
        }

        .lib-card-desc {
          font-size: 0.75rem;
          color: #a0aec0;
          line-height: 1.4;
          height: 56px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }

        .lib-card-effects {
          font-size: 0.72rem;
          color: #e2e8f0;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 8px;
          padding: 8px 12px;
        }

        .lib-card-actions {
          display: flex;
          gap: 8px;
          margin-top: auto;
        }

        .lib-card-btn {
          flex: 1;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: #ffffff;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 0.72rem;
          padding: 8px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .lib-card-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.12);
        }

        .lib-card-btn-teleport {
          background: #f2994a;
          color: #000000;
          border: none;
        }

        .lib-card-btn-teleport:hover {
          background: #e28938;
          box-shadow: 0 0 10px rgba(242, 153, 74, 0.3);
        }

        .empty-results {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding-top: 100px;
          color: #8a96a8;
          font-size: 0.9rem;
        }
      `}</style>

      <div className="lib-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="lib-close-btn" onClick={onClose}>
          <X size={16} />
        </button>

        {/* Header */}
        <div className="lib-header">
          <div className="lib-header-title">
            <Compass size={24} />
            <h1>Thư Viện Số & Danh Mục Chất Cấm</h1>
          </div>
          <p>Tìm kiếm, tra cứu y học và định vị nhanh 30 tiêu bản chất cấm & 4 áp phích tuyên truyền trong sảnh 3D.</p>
        </div>

        {/* Search & Tabs control bar */}
        <div className="lib-control-bar">
          <div className="lib-search-box">
            <Search size={16} className="lib-search-icon" />
            <input 
              type="text" 
              placeholder="Nhập tên chất cấm hoặc tác hại cần tra cứu..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="lib-tabs">
            <button className={`lib-tab-btn ${activeFilter === "all" ? "active" : ""}`} onClick={() => setActiveFilter("all")}>Tất cả ({exhibits.length + posters.length})</button>
            <button className={`lib-tab-btn ${activeFilter === "opioids" ? "active" : ""}`} onClick={() => setActiveFilter("opioids")}>Tủ 1: Trái ({exhibits.filter(e => e.cabinetId === "cabinet_left").length})</button>
            <button className={`lib-tab-btn ${activeFilter === "stimulants" ? "active" : ""}`} onClick={() => setActiveFilter("stimulants")}>Tủ 2: Phải ({exhibits.filter(e => e.cabinetId === "cabinet_right").length})</button>
            <button className={`lib-tab-btn ${activeFilter === "hallucinogens" ? "active" : ""}`} onClick={() => setActiveFilter("hallugen") || setActiveFilter("hallucinogens")}>Tủ 3: Sau ({exhibits.filter(e => e.cabinetId === "cabinet_back").length})</button>
            <button className={`lib-tab-btn ${activeFilter === "posters" ? "active" : ""}`} onClick={() => setActiveFilter("posters")}>Áp phích ({posters.length})</button>
          </div>
        </div>

        {/* Grid List view */}
        <div className="lib-grid-container">
          {filteredExhibits.length === 0 && filteredPosters.length === 0 ? (
            <div className="empty-results">
              <AlertTriangle size={32} style={{ color: "#eb5757" }} />
              <span>Không tìm thấy chất cấm hoặc áp phích nào phù hợp với từ khóa tìm kiếm.</span>
            </div>
          ) : (
            <div className="lib-grid">
              {/* Render Exhibits */}
              {activeFilter !== "posters" && filteredExhibits.map(ex => {
                const isSaved = savedExhibits && savedExhibits.includes(ex.id);
                return (
                  <div key={ex.id} className="lib-card">
                    <div className="lib-card-meta">
                      <h3>{ex.name}</h3>
                      <span className="badge">Độc tố A</span>
                    </div>
                    <div className="lib-card-category">{ex.category}</div>
                    <p className="lib-card-desc">{ex.description}</p>
                    
                    <div className="lib-card-effects">
                      <strong style={{ color: "#eb5757", fontSize: "0.65rem", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>Biến chứng điển hình:</strong>
                      <span style={{ fontSize: "0.7rem", color: "#d1d5db" }}>{ex.effects[0]}</span>
                    </div>

                    <div className="lib-card-actions">
                      <button className="lib-card-btn" onClick={() => handleSelectDetail(ex.id)}>
                        <FileText size={12} />
                        <span>Xem Chi Tiết</span>
                      </button>
                      <button className="lib-card-btn lib-card-btn-teleport" onClick={() => handleTeleportClick(ex, false)}>
                        <MapPin size={12} />
                        <span>Dịch Chuyển</span>
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Render Posters */}
              {(activeFilter === "all" || activeFilter === "posters") && filteredPosters.map(post => (
                <div key={post.id} className="lib-card" style={{ borderColor: "rgba(86, 204, 242, 0.15)" }}>
                  <div className="lib-card-meta">
                    <h3 style={{ color: "#56ccf2" }}>Áp Phích: {post.title}</h3>
                    <span className="badge" style={{ color: "#56ccf2", borderColor: "rgba(86, 204, 242, 0.25)", background: "rgba(86, 204, 242, 0.05)" }}>Truyền thông</span>
                  </div>
                  <div className="lib-card-category" style={{ color: "#56ccf2" }}>Tranh cổ động giáo dục</div>
                  <p className="lib-card-desc">{post.description}</p>
                  
                  <div className="lib-card-effects" style={{ borderColor: "rgba(86, 204, 242, 0.1)" }}>
                    <strong style={{ color: "#56ccf2", fontSize: "0.65rem", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>Khẩu hiệu hành động:</strong>
                    <span style={{ fontSize: "0.7rem", color: "#d1d5db" }}>"{post.subtitle}"</span>
                  </div>

                  <div className="lib-card-actions">
                    <button className="lib-card-btn lib-card-btn-teleport" style={{ background: "#56ccf2", color: "#000000" }} onClick={() => handleTeleportClick(post, true)}>
                      <MapPin size={12} />
                      <span>Đến Xem Vách</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
