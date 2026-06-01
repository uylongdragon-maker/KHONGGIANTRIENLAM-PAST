"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { 
  Compass, 
  HelpCircle, 
  X,
  Volume2,
  Users,
  Award,
  Sparkles,
  Info,
  BadgeAlert
} from "lucide-react";

import { exhibitsData, postersData } from "../data/exhibits";
import ThreeCanvas from "../components/ThreeCanvas";
import SidebarLeft from "../components/SidebarLeft";
import ExhibitHUDModal from "../components/ExhibitHUDModal";
import CuratorHUDModal from "../components/CuratorHUDModal";
import DigitalLibraryModal from "../components/DigitalLibraryModal";
import Footer from "../components/Footer";
import QuizModal from "../components/QuizModal";

export default function Home() {
  // Exhibits & Posters dynamic state loaded from localStorage
  const [exhibits, setExhibits] = useState([]);
  const [posters, setPosters] = useState([]);
  const [tiktokVideos, setTiktokVideos] = useState([]);
  
  // Load dynamic data on mount from Supabase Database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/exhibits");
        const json = await res.json();
        if (json.exhibits && json.exhibits.length >= 30) {
          setExhibits(json.exhibits);
          localStorage.setItem("3dpast_exhibits", JSON.stringify(json.exhibits));
        } else {
          loadFallback();
        }
        if (json.posters && json.posters.length > 0) {
          setPosters(json.posters);
          localStorage.setItem("3dpast_posters", JSON.stringify(json.posters));
        }
        if (json.tiktokVideos && json.tiktokVideos.length > 0) {
          setTiktokVideos(json.tiktokVideos);
          localStorage.setItem("3dpast_tiktokVideos", JSON.stringify(json.tiktokVideos));
        }
      } catch (error) {
        console.error("Failed to load from Supabase database, using local cache fallback:", error);
        loadFallback();
      }
    };

    const loadFallback = () => {
      const savedExhibits = localStorage.getItem("3dpast_exhibits");
      const savedPosters = localStorage.getItem("3dpast_posters");
      const savedTiktok = localStorage.getItem("3dpast_tiktokVideos");
      
      if (savedExhibits && JSON.parse(savedExhibits).length >= 30) {
        setExhibits(JSON.parse(savedExhibits));
      } else {
        localStorage.setItem("3dpast_exhibits", JSON.stringify(exhibitsData));
        setExhibits(exhibitsData);
      }
      
      if (savedPosters) {
        setPosters(JSON.parse(savedPosters));
      } else {
        localStorage.setItem("3dpast_posters", JSON.stringify(postersData));
        setPosters(postersData);
      }

      if (savedTiktok) {
        setTiktokVideos(JSON.parse(savedTiktok));
      } else {
        const initialTiktokVideos = [
          {
            id: "tiktok1",
            title: "Hiệu ứng Ma Túy Đá tàn hoại thần kinh kinh hoàng - VTV24",
            url: "https://www.tiktok.com/@vtv24news/video/7183029104829287682"
          },
          {
            id: "tiktok2",
            title: "Sự thật về thuốc lá điện tử ngụy trang ma túy học đường - VTV24",
            url: "https://www.tiktok.com/@vtv24news/video/7219358291083928192"
          },
          {
            id: "tiktok3",
            title: "Hiểm họa ma túy ảo giác tẩm trong bùa lưỡi, nấm thức thần - PAST",
            url: "https://www.tiktok.com/@vtv24news/video/7258392019482910832"
          }
        ];
        localStorage.setItem("3dpast_tiktokVideos", JSON.stringify(initialTiktokVideos));
        setTiktokVideos(initialTiktokVideos);
      }
    };

    fetchData();
  }, []);

  // Navigation & Teleport state
  const [playerPosition, setPlayerPosition] = useState({ x: 0, z: 1.0 });
  const [playerRotation, setPlayerRotation] = useState(0);
  const [activeNav, setActiveNav] = useState("sanh-chinh");
  
  // Selection states
  const [activeExhibitId, setActiveExhibitId] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showInspect3D, setShowInspect3D] = useState(false);
  
  // Mobile and Orientation states
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [bypassOrientationPrompt, setBypassOrientationPrompt] = useState(false);

  useEffect(() => {
    setIsMobileDevice(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);
    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);
  
  // HUD UI collapse states
  const [showLeftSidebar, setShowLeftSidebar] = useState(false); // Closed by default for unobstructed full 3D room experience
  const [showCuratorChat, setShowCuratorChat] = useState(false); // Curator Chat dialogue pop-up HUD

  // Gamification & bookmarks
  const [completedQuests, setCompletedQuests] = useState([]);
  const [savedExhibits, setSavedExhibits] = useState([]);
  const [earnedBadgesCount, setEarnedBadgesCount] = useState(0);
  const [exhibitionsCount, setExhibitionsCount] = useState(0);

  // Get active exhibit object
  const activeExhibit = exhibits.find(e => e.id === activeExhibitId) || null;

  // Handle teleport trigger from Left Sidebar or Minimap
  const handleTeleport = (x, z) => {
    setPlayerPosition({ x, z });
    // Determine active navigation based on location
    if (x === 0 && z === 0) setActiveNav("sanh-chinh");
    else if (x === -4) setActiveNav("vach-1");
    else if (x === 4) setActiveNav("vach-2");
    else if (x === 0 && z > 2) setActiveNav("tu-lieu");
  };

  const handleSelectExhibit = (id) => {
    setActiveExhibitId(id);
  };

  // Add completed quests checklist
  const handleCompleteQuest = (questKey) => {
    if (!completedQuests.includes(questKey)) {
      setCompletedQuests(prev => [...prev, questKey]);
    }
  };

  // Save / Bookmark exhibit
  const handleSaveExhibit = (id) => {
    if (savedExhibits.includes(id)) {
      setSavedExhibits(prev => prev.filter(item => item !== id));
    } else {
      setSavedExhibits(prev => [...prev, id]);
    }
  };

  // Passing the quiz unlocks badges
  const handlePassQuiz = () => {
    handleCompleteQuest("pass_quiz");
    setEarnedBadgesCount(3);
  };

  return (
    <div className="app-container" style={{ position: "relative", width: "100vw", overflow: "hidden" }}>
      {/* 1. THREE.JS 3D ENVIRONMENT */}
      <ThreeCanvas
        playerPosition={playerPosition}
        setPlayerPosition={setPlayerPosition}
        playerRotation={playerRotation}
        setPlayerRotation={setPlayerRotation}
        onSelectExhibit={handleSelectExhibit}
        onCompleteQuest={handleCompleteQuest}
        exhibits={exhibits}
        posters={posters}
        activeExhibit={activeExhibit}
        onOpenCurator={() => setShowCuratorChat(true)}
      />

      {/* 2. OVERLAYS UI LAYER */}
      <div className="ui-overlay-container">
        {/* HEADER */}
        <header className="app-header glass-panel ui-element">
          <div className="header-title-container" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img src="/past_logo.png" alt="PAST Logo" style={{ height: "46px", width: "46px", objectFit: "contain", filter: "drop-shadow(0 0 10px rgba(242,153,74,0.35))" }} />
            <div className="header-title">
              <h1>Triển Lãm Ma Túy 3D</h1>
              <p>Hiểu đúng - Phòng ngừa - Vì một cộng đồng không ma túy</p>
            </div>
          </div>

          <div className="header-tabs">
            <button className="header-tab-btn active">
              <Compass size={14} />
              <span>CĂN PHÒNG 3D</span>
            </button>
            <button className="header-tab-btn" onClick={() => setActiveNav("thu-vien")}>
              <Compass size={14} />
              <span>DANH SÁCH HIỆN VẬT</span>
            </button>
            <button className="header-tab-btn" onClick={() => window.location.href = "/admin"} style={{ color: "var(--color-gold)", border: "1px solid var(--border-accent)" }}>
              <Sparkles size={14} />
              <span>QUẢN TRỊ ADMIN</span>
            </button>
          </div>

          <div className="header-right">
            <button className="invite-btn">MỜI BẠN</button>
            <div className="profile-avatar">A</div>
          </div>
        </header>

        {/* FLOATING HUD TOGGLE BUTTONS */}
        <div className={`floating-hud-controls ${showLeftSidebar ? "sidebar-open" : ""}`}>
          <button 
            className={`floating-hud-btn ui-element ${showLeftSidebar ? "active" : ""}`}
            onClick={() => setShowLeftSidebar(!showLeftSidebar)}
            title={showLeftSidebar ? "Thu gọn bản đồ" : "Mở bản đồ & Điều hướng"}
          >
            <Compass size={16} style={{ transform: showLeftSidebar ? 'rotate(180deg)' : 'none', transition: 'transform 0.4s' }} />
            <span>{showLeftSidebar ? "ẨN BẢN ĐỒ" : "BẢN ĐỒ & ĐIỀU HƯỚNG"}</span>
          </button>
        </div>

        {/* MOBILE SIDEBAR DRAWERS BACKDROP OVERLAY */}
        {showLeftSidebar && (
          <div 
            className="mobile-sidebar-backdrop ui-element" 
            onClick={() => setShowLeftSidebar(false)}
          />
        )}

        {/* SIDEBAR LEFT */}
        <SidebarLeft
          playerPosition={playerPosition}
          playerRotation={playerRotation}
          onTeleport={handleTeleport}
          onOpenQuiz={() => setShowQuiz(true)}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          exhibits={exhibits}
          isOpen={showLeftSidebar}
        />

        {/* FOOTER */}
        <Footer
          completedQuests={completedQuests}
          savedExhibitsCount={savedExhibits.length}
          onOpenQuiz={() => setShowQuiz(true)}
          earnedBadgesCount={earnedBadgesCount}
        />
      </div>

      {/* 3. MODALS */}
      
      {/* EXHIBIT DETAIL HUD POP-UP MODAL */}
      {activeExhibit && (
        <ExhibitHUDModal
          exhibit={activeExhibit}
          onClose={() => setActiveExhibitId(null)}
          onOpenInspect={() => setShowInspect3D(true)}
          onSaveExhibit={handleSaveExhibit}
          isSaved={savedExhibits.includes(activeExhibitId)}
        />
      )}

      {/* DIGITAL LIBRARY / SEARCHABLE DIRECTORY MODAL */}
      {activeNav === "thu-vien" && (
        <DigitalLibraryModal
          exhibits={exhibits}
          posters={posters}
          tiktokVideos={tiktokVideos}
          onClose={() => setActiveNav("sanh-chinh")}
          onTeleport={handleTeleport}
          onSelectExhibit={handleSelectExhibit}
          savedExhibits={savedExhibits}
          onSaveExhibit={handleSaveExhibit}
        />
      )}

      {/* AI CURATOR DIALOGUE HUD POP-UP MODAL */}
      {showCuratorChat && (
        <CuratorHUDModal
          onClose={() => setShowCuratorChat(false)}
          onCompleteQuest={handleCompleteQuest}
        />
      )}

      {/* QUIZ MODAL */}
      {showQuiz && (
        <QuizModal
          onClose={() => setShowQuiz(false)}
          onPassQuiz={handlePassQuiz}
        />
      )}

      {/* 3D INSPECT ROTATABLE DIALOG */}
      {showInspect3D && activeExhibit && (
        <InspectModal
          exhibit={activeExhibit}
          onClose={() => setShowInspect3D(false)}
        />
      )}

      {/* ORIENTATION ROTATE DEVICE PROMPT OVERLAY */}
      {isMobileDevice && isPortrait && !bypassOrientationPrompt && (
        <div className="orientation-prompt-overlay ui-element">
          <div className="orientation-prompt-card glass-panel">
            <div className="phone-rotate-icon-container">
              <Compass size={44} className="phone-rotate-icon" />
            </div>
            <h2>Xoay Ngang Thiết Bị</h2>
            <p>Vui lòng xoay ngang điện thoại của bạn để có góc nhìn tham quan rộng mở và trải nghiệm không gian triển lãm 3D PAST tốt nhất!</p>
            <button 
              className="bypass-orientation-btn"
              onClick={() => setBypassOrientationPrompt(true)}
            >
              Tiếp tục ở chế độ dọc
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Micro Three.js 3D Specimen Inspector Modal
function InspectModal({ exhibit, onClose }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    
    // Background gradient glow
    scene.background = new THREE.Color(0x0a0f18);

    const camera = new THREE.PerspectiveCamera(45, 1.8, 0.1, 10);
    camera.position.set(0, 0, 1.0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Light
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(2, 2, 4);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(exhibit.id === 'meth' ? 0x56ccf2 : exhibit.id === 'cannabis' ? 0x27ae60 : 0xf2994a, 2, 3);
    rimLight.position.set(-1.5, -1, -0.5);
    scene.add(rimLight);

    // Dynamic procedural geometry for specimen inspection
    let specimenMesh;
    if (exhibit.id === "heroin") {
      // Evidence zip bag
      const bagGeo = new THREE.BoxGeometry(0.3, 0.35, 0.05);
      const bagMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.2, transparent: true, opacity: 0.85 });
      specimenMesh = new THREE.Mesh(bagGeo, bagMat);
    } else if (exhibit.id === "meth") {
      // Octahedrons cluster
      specimenMesh = new THREE.Group();
      const cryGeo = new THREE.OctahedronGeometry(0.08);
      const cryMat = new THREE.MeshPhysicalMaterial({ color: 0x56ccf2, roughness: 0.1, transmission: 0.7, thickness: 0.3 });
      
      for(let i=0; i<6; i++) {
        const mesh = new THREE.Mesh(cryGeo, cryMat);
        mesh.position.set((Math.random()-0.5)*0.18, (Math.random()-0.5)*0.18, (Math.random()-0.5)*0.18);
        mesh.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, 0);
        specimenMesh.add(mesh);
      }
    } else if (exhibit.id === "cocaine") {
      const blockGeo = new THREE.BoxGeometry(0.35, 0.18, 0.22);
      const blockMat = new THREE.MeshStandardMaterial({ color: 0xe0e0e0, roughness: 0.9 });
      specimenMesh = new THREE.Mesh(blockGeo, blockMat);
    } else if (exhibit.id === "ecstasy") {
      specimenMesh = new THREE.Group();
      const pillGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.02, 32);
      const redMat = new THREE.MeshStandardMaterial({ color: 0xeb5757, roughness: 0.5 });
      const blueMat = new THREE.MeshStandardMaterial({ color: 0x2f80ed, roughness: 0.5 });
      const orangeMat = new THREE.MeshStandardMaterial({ color: 0xf2994a, roughness: 0.5 });
      
      for(let i=0; i<8; i++) {
        const mesh = new THREE.Mesh(pillGeo, i%3===0 ? redMat : i%3===1 ? blueMat : orangeMat);
        mesh.position.set((Math.random()-0.5)*0.2, (Math.random()-0.5)*0.15, (Math.random()-0.5)*0.15);
        mesh.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI);
        specimenMesh.add(mesh);
      }
    } else {
      specimenMesh = new THREE.Group();
      const leafGeo = new THREE.ConeGeometry(0.08, 0.25, 4);
      const leafMat = new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.8 });
      for(let i=0; i<8; i++) {
        const leaf = new THREE.Mesh(leafGeo, leafMat);
        leaf.rotation.set(Math.PI/3, (i * Math.PI*2)/8, 0);
        leaf.scale.set(0.7, 0.7, 0.7);
        specimenMesh.add(leaf);
      }
    }

    scene.add(specimenMesh);

    // Mouse drag rotation controls for Inspect
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      specimenMesh.rotation.y += deltaX * 0.01;
      specimenMesh.rotation.x += deltaY * 0.01;
    };

    const onMouseUp = () => { isDragging = false; };

    mountRef.current.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Animation Loop
    let id;
    const tick = () => {
      if (!isDragging) {
        specimenMesh.rotation.y += 0.4 * 0.016;
        specimenMesh.rotation.z += 0.2 * 0.016;
      }
      renderer.render(scene, camera);
      id = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [exhibit]);

  return (
    <div className="modal-backdrop ui-element" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={16} />
        </button>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-gold)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={16} />
          <span>Kính Phóng Đại 3D: {exhibit.name}</span>
        </h3>
        
        <p style={{ fontSize: '0.75rem', color: 'var(--color-secondary)' }}>
          {exhibit.inspectInfo}
        </p>

        {/* 3D Inspect Mount Point */}
        <div className="inspect-3d-canvas-container" ref={mountRef}>
          <div className="inspect-hud-hint">Kéo chuột để xoay tự do và xem chi tiết cấu trúc</div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ background: 'rgba(235,87,87,0.08)', border: '1px solid rgba(235,87,87,0.2)', padding: '12px', borderRadius: '10px', display: 'flex', gap: '10px', width: '100%', alignItems: 'center' }}>
            <BadgeAlert size={20} style={{ color: 'var(--color-ruby)', flexShrink: 0 }} />
            <div style={{ fontSize: '0.75rem', lineHeight: '1.4', color: 'var(--color-secondary)' }}>
              <strong>Lưu ý:</strong> Tiêu bản được bảo quản phục vụ nghiên cứu giáo dục. Mọi hành vi tiếp xúc trái phép ngoài thực tế đều bị xử lý nghiêm minh pháp luật.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
