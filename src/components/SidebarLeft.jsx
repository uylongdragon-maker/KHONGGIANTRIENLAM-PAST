import React from "react";
import { 
  Home, 
  MapPin, 
  Library, 
  HelpCircle, 
  FolderOpen, 
  Compass, 
  Mic, 
  Volume2, 
  Users, 
  ChevronRight,
  Maximize2,
  ZoomIn
} from "lucide-react";

export default function SidebarLeft({
  playerPosition,
  playerRotation,
  onTeleport,
  onOpenQuiz,
  activeNav,
  setActiveNav,
  exhibits,
  isOpen
}) {
  const visitors = [
    { name: "Bạn (Khách)", role: "host", letter: "B" },
    { name: "Curator AI", role: "bot", letter: "AI" },
    { name: "Minh Anh", role: "guest", letter: "MA" },
    { name: "Hoàng Nam", role: "guest", letter: "HN" },
    { name: "Ngọc Trâm", role: "guest", letter: "NT" }
  ];

  // Teleports user to specific coordinates based on nav click
  const handleNavClick = (key) => {
    setActiveNav(key);
    if (key === "sanh-chinh") {
      onTeleport(0, 0); // X = 0, Z = 0
    } else if (key === "vach-1") {
      onTeleport(-3.8, -1.0); // Next to Left Cabinet (X = -5)
    } else if (key === "vach-2") {
      onTeleport(3.8, -1.0); // Next to Right Cabinet (X = 5)
    } else if (key === "tu-lieu") {
      onTeleport(0, 5.2); // Next to Back Cabinet (Z = 6.5)
    } else if (key === "trai-nghiem") {
      onOpenQuiz();
    }
  };

  // Convert 3D space X/Z (-12 to 12, -9 to 9) to SVG pixels (0 to 200, 0 to 150)
  const mapX = (x) => {
    // x: -12 -> 0px, 12 -> 200px
    return ((x + 12) / 24) * 180 + 10;
  };
  
  const mapZ = (z) => {
    // z: -9 -> 0px, 9 -> 150px
    return ((z + 9) / 18) * 130 + 10;
  };

  // Player arrow rotation in degrees
  const arrowDeg = (playerRotation * 180) / Math.PI;

  return (
    <aside className={`sidebar-left ui-element glass-panel ${!isOpen ? "collapsed" : ""}`}>
      {/* 1. ĐIỀU HƯỚNG SECTION */}
      <div className="sidebar-section">
        <h2 className="sidebar-section-title">Điều Hướng</h2>
        <nav className="nav-menu">
          <button 
            className={`nav-item ${activeNav === "sanh-chinh" ? "active" : ""}`}
            onClick={() => handleNavClick("sanh-chinh")}
          >
            <Home size={16} />
            <span>Sảnh chính</span>
          </button>
          
          <button 
            className={`nav-item ${activeNav === "vach-1" ? "active" : ""}`}
            onClick={() => handleNavClick("vach-1")}
          >
            <Compass size={16} />
            <span>Vách phân khu 1</span>
          </button>
          
          <button 
            className={`nav-item ${activeNav === "vach-2" ? "active" : ""}`}
            onClick={() => handleNavClick("vach-2")}
          >
            <Compass size={16} />
            <span>Vách phân khu 2</span>
          </button>
          
          <button 
            className={`nav-item ${activeNav === "tu-lieu" ? "active" : ""}`}
            onClick={() => handleNavClick("tu-lieu")}
          >
            <FolderOpen size={16} />
            <span>Phòng tư liệu</span>
          </button>
          
          <button 
            className={`nav-item ${activeNav === "trai-nghiem" ? "active" : ""}`}
            onClick={() => handleNavClick("trai-nghiem")}
          >
            <HelpCircle size={16} />
            <span>Khu trải nghiệm (Quiz)</span>
          </button>
          
          <button 
            className={`nav-item ${activeNav === "thu-vien" ? "active" : ""}`}
            onClick={() => handleNavClick("thu-vien")}
          >
            <Library size={16} />
            <span>Thư viện số</span>
          </button>
        </nav>
      </div>

      {/* 2. BẢN ĐỒ SECTION */}
      <div className="sidebar-section">
        <h2 className="sidebar-section-title">Bản Đồ</h2>
        <div className="minimap-container">
          <svg className="minimap-svg" viewBox="0 0 200 150">
            {/* Gallery Bounds */}
            <rect 
              x="10" 
              y="10" 
              width="180" 
              height="130" 
              fill="none" 
              stroke="#556275" 
              strokeWidth="2" 
              rx="4"
            />
            {/* Partitions */}
            <line x1="62.5" y1="10" x2="62.5" y2="107.5" stroke="#333f52" strokeWidth="2" strokeDasharray="3,3" />
            <line x1="137.5" y1="10" x2="137.5" y2="107.5" stroke="#333f52" strokeWidth="2" strokeDasharray="3,3" />
            <line x1="40" y1="107.5" x2="160" y2="107.5" stroke="#333f52" strokeWidth="2" strokeDasharray="3,3" />
            
            {/* Exhibits (Pins on map) */}
            {exhibits.map((ex) => {
              let posX = ex.position.x;
              let posZ = ex.position.z;
              if (ex.cabinetId === "cabinet_left") {
                posX = -5.0;
              } else if (ex.cabinetId === "cabinet_right") {
                posX = 5.0;
              } else if (ex.cabinetId === "cabinet_back") {
                posZ = 6.5;
              }

              return (
                <circle
                  key={ex.id}
                  cx={mapX(posX)}
                  cy={mapZ(posZ)}
                  r="5"
                  fill="#f2994a"
                  className="minimap-point"
                  onClick={() => {
                    let targetX = posX;
                    let targetZ = posZ;
                    if (ex.cabinetId === "cabinet_left") {
                      targetX = -3.8;
                    } else if (ex.cabinetId === "cabinet_right") {
                      targetX = 3.8;
                    } else if (ex.cabinetId === "cabinet_back") {
                      targetZ = 5.2;
                    }
                    onTeleport(targetX, targetZ);
                  }}
                  title={ex.name}
                />
              );
            })}

            {/* AI Curator platform at center */}
            <circle
              cx={mapX(0)}
              cy={mapZ(-0.5)}
              r="6"
              fill="none"
              stroke="#2f80ed"
              strokeWidth="2"
              className="minimap-point"
              onClick={() => onTeleport(0, 1.0)} // Safe distance from curator
              title="AI Curator"
            />
            <circle cx={mapX(0)} cy={mapZ(-0.5)} r="2" fill="#2f80ed" />

            {/* Player position dot and directional arrow */}
            <g transform={`translate(${mapX(playerPosition.x)}, ${mapZ(playerPosition.z)}) rotate(${arrowDeg})`}>
              <polygon 
                points="0,-8 -6,6 0,2 6,6" 
                fill="#2f80ed" 
                stroke="#fff" 
                strokeWidth="1" 
                style={{ filter: "drop-shadow(0px 0px 4px #2f80ed)" }}
              />
            </g>
          </svg>
          
          <div className="minimap-controls">
            <button className="minimap-ctrl-btn" title="Zoom"><ZoomIn size={12} /></button>
            <button className="minimap-ctrl-btn" title="Fullscreen"><Maximize2 size={12} /></button>
          </div>
        </div>
      </div>

      {/* 4. VOICE CONTROLS */}
      <div className="voice-control-box">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Đàm thoại nhóm</span>
          <span style={{ fontSize: '0.65rem' }}>Nhấn V để nói</span>
        </div>
        
        <div className="voice-actions">
          <button className="voice-btn" title="Toggle Mic">
            <Mic size={14} />
          </button>
          <button className="voice-btn" title="Toggle Speaker">
            <Volume2 size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
