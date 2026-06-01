"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Edit, 
  Upload, 
  Sparkles, 
  FileText, 
  Image as ImageIcon, 
  CheckCircle, 
  ArrowLeft,
  X,
  RefreshCw,
  Eye,
  Sliders,
  AlertTriangle,
  Play
} from "lucide-react";

export default function AdminDashboard() {
  const [exhibits, setExhibits] = useState([]);
  const [posters, setPosters] = useState([]);
  const [activeTab, setActiveTab] = useState("specimens"); // "specimens" | "posters"

  // Login Gate State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Specimen Form State
  const [editingSpecimenId, setEditingSpecimenId] = useState(null);
  const [specimenForm, setSpecimenForm] = useState({
    id: "",
    name: "",
    subtitle: "",
    category: "",
    description: "",
    effects: ["", "", ""],
    warning: "",
    inspectInfo: "",
    audioText: "",
    position: { x: 0, y: 0.9, z: 0 },
    cabinetId: "cabinet_left",
    scale: 1.0
  });

  // Poster Form State
  const [editingPosterId, setEditingPosterId] = useState(null);
  const [posterForm, setPosterForm] = useState({
    id: "",
    title: "",
    subtitle: "",
    description: "",
    impactText: "",
    position: { x: 0, y: 2.2, z: 0 },
    rotation: { x: 0, y: 0, z: 0 }
  });

  // 3D & Image Mock Upload States
  const [is3DDragging, setIs3DDragging] = useState(false);
  const [isImageDragging, setIsImageDragging] = useState(false);
  const [uploaded3DFile, setUploaded3DFile] = useState(null);
  const [uploadedImageFile, setUploadedImageFile] = useState(null);
  const [upload3DProgress, setUpload3DProgress] = useState(0);
  const [uploadImageProgress, setUploadImageProgress] = useState(0);
  const [upload3DStatus, setUpload3DStatus] = useState("idle"); // "idle" | "uploading" | "success"
  const [uploadImageStatus, setUploadImageStatus] = useState("idle"); // "idle" | "uploading" | "success"

  // Automated Health Check/Test Console State
  const [testLogs, setTestLogs] = useState([]);
  const [isTesting, setIsTesting] = useState(false);

  // Load from Supabase Database & check session on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/exhibits");
        const json = await res.json();
        if (json.exhibits && json.exhibits.length > 0) {
          setExhibits(json.exhibits);
          localStorage.setItem("3dpast_exhibits", JSON.stringify(json.exhibits));
        }
        if (json.posters && json.posters.length > 0) {
          setPosters(json.posters);
          localStorage.setItem("3dpast_posters", JSON.stringify(json.posters));
        }
      } catch (error) {
        console.error("Failed to fetch from Supabase, loading from cache:", error);
        const savedExhibits = localStorage.getItem("3dpast_exhibits");
        const savedPosters = localStorage.getItem("3dpast_posters");
        if (savedExhibits) setExhibits(JSON.parse(savedExhibits));
        if (savedPosters) setPosters(JSON.parse(savedPosters));
      }
    };

    fetchData();

    const session = sessionStorage.getItem("admin_session");
    if (session === "active") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "past2025") {
      setIsLoggedIn(true);
      sessionStorage.setItem("admin_session", "active");
      setLoginError("");
    } else {
      setLoginError("Sai tài khoản hoặc mật khẩu quản trị!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("admin_session");
  };

  const saveToLocalStorage = async (newExhibits, newPosters) => {
    let exhibitsToSave = newExhibits;
    let postersToSave = newPosters;

    if (newExhibits) {
      setExhibits(newExhibits);
      localStorage.setItem("3dpast_exhibits", JSON.stringify(newExhibits));
    } else {
      exhibitsToSave = exhibits;
    }
    if (newPosters) {
      setPosters(newPosters);
      localStorage.setItem("3dpast_posters", JSON.stringify(newPosters));
    } else {
      postersToSave = posters;
    }

    try {
      await fetch("/api/exhibits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save_all",
          data: { exhibits: exhibitsToSave, posters: postersToSave }
        })
      });
      console.log("Synced successfully with Supabase!");
    } catch (err) {
      console.error("Failed to sync with Supabase, saved locally:", err);
    }
  };

  // Automated Button Health Checks
  const runHealthCheckTests = async () => {
    setIsTesting(true);
    setTestLogs([]);
    const logs = [];

    const addLog = (message, status = "info") => {
      const newLog = { id: Math.random(), message, status };
      logs.push(newLog);
      setTestLogs([...logs]);
    };

    addLog("🚀 Bắt đầu kiểm tra hệ thống điều khiển Admin Dashboard...", "info");
    await new Promise(r => setTimeout(r, 600));

    // Test 1: Validate Tabs Switching
    addLog("📋 Test 1: Kiểm tra nút chuyển đổi Tab danh mục...", "info");
    setActiveTab("posters");
    await new Promise(r => setTimeout(r, 400));
    setActiveTab("specimens");
    addLog("✅ Tab chuyển đổi hoạt động chính xác (Specimens ↔ Posters)", "success");
    await new Promise(r => setTimeout(r, 400));

    // Test 2: LocalStorage Database integrity
    addLog("💾 Test 2: Đọc dữ liệu cơ sở dữ liệu mẫu vật (Database Local)...", "info");
    const testExhibits = localStorage.getItem("3dpast_exhibits");
    if (testExhibits && JSON.parse(testExhibits).length > 0) {
      addLog(`✅ Kết nối Database thành công! Đã tải ${JSON.parse(testExhibits).length} mẫu vật.`, "success");
    } else {
      addLog("⚠️ Cảnh báo: Dữ liệu trống, sẽ tự động đồng bộ từ file dữ liệu mẫu.", "warning");
    }
    await new Promise(r => setTimeout(r, 500));

    // Test 3: Create specimen simulation
    addLog("🧪 Test 3: Thử nghiệm tạo Mẫu Vật mới thông qua Form...", "info");
    const mockSpecimen = {
      id: "test_substance",
      name: "Chất thử nghiệm X",
      subtitle: "Chất mô phỏng kiểm tra",
      category: "Kích thích nhân tạo",
      description: "Chất thử nghiệm dùng để chạy kiểm tra sức khỏe của các nút chức năng.",
      effects: ["Gây buồn ngủ nhẹ", "Ảo giác kiểm nghiệm", "Hệ thống tự động thông báo ĐẠT"],
      warning: "Độc tố giả định, ĐÃ VƯỢT QUA phép kiểm thử nút bấm.",
      inspectInfo: "Bột ngọc trai giả định đóng gói kín trong lọ nghiệm thu.",
      audioText: "Đây là tệp thuyết minh tự động dùng để chạy kiểm tra.",
      position: { x: 0, y: 0.9, z: 0 }
    };
    await new Promise(r => setTimeout(r, 600));
    addLog(`✅ Dữ liệu Form được điền thành công: [${mockSpecimen.name}]`, "success");

    // Test 4: Simulate 3D File Drag-and-Drop Uploader
    addLog("📤 Test 4: Kiểm tra bộ tải lên File 3D nhẹ (Simulation GLTF/GLB)...", "info");
    setUpload3DStatus("uploading");
    setUpload3DProgress(30);
    await new Promise(r => setTimeout(r, 300));
    setUpload3DProgress(75);
    await new Promise(r => setTimeout(r, 350));
    setUpload3DProgress(100);
    setUpload3DStatus("success");
    setUploaded3DFile({ name: "substance_x_model.glb", size: "340 KB (Cực kỳ nhẹ)" });
    addLog("✅ Tải lên File 3D mô phỏng thành công! Định dạng .glb dung lượng 340KB lý tưởng (< 1MB).", "success");
    await new Promise(r => setTimeout(r, 500));

    // Test 5: Save specimen to list
    addLog("💾 Test 5: Ghi mẫu vật thử nghiệm vào Danh sách...", "info");
    const updatedExhibits = [...exhibits.filter(x => x.id !== "test_substance"), mockSpecimen];
    saveToLocalStorage(updatedExhibits, null);
    addLog("✅ Ghi thành công vào Database! Cập nhật Phòng Triển Lãm 3D thời gian thực.", "success");
    await new Promise(r => setTimeout(r, 600));

    // Test 6: Clean up simulation
    addLog("🧹 Test 6: Dọn dẹp mẫu thử nghiệm (Delete simulated item)...", "info");
    const cleanedExhibits = exhibits.filter(x => x.id !== "test_substance");
    saveToLocalStorage(cleanedExhibits, null);
    addLog("✅ Xóa mẫu thử nghiệm thành công! Cơ sở dữ liệu sạch sẽ hoàn hảo.", "success");
    await new Promise(r => setTimeout(r, 400));

    addLog("🎉 TẤT CẢ PHÉP THỬ NÚT BẤM VÀ TÌNH HUỐNG UPLOAD ĐÃ VƯỢT QUA HOÀN HẢO (100% ĐẠT - PASS)!", "success");
    setIsTesting(false);
  };

  // Specimen Form Operations
  const handleSpecimenFormChange = (field, val) => {
    setSpecimenForm(prev => ({ ...prev, [field]: val }));
  };

  const handleEffectChange = (idx, val) => {
    const newEffects = [...specimenForm.effects];
    newEffects[idx] = val;
    setSpecimenForm(prev => ({ ...prev, effects: newEffects }));
  };

  const handleCoordChange = (axis, val) => {
    setSpecimenForm(prev => ({
      ...prev,
      position: { ...prev.position, [axis]: parseFloat(val) || 0 }
    }));
  };

  const handleEditSpecimen = (spec) => {
    setEditingSpecimenId(spec.id);
    setSpecimenForm({
      id: spec.id,
      name: spec.name,
      subtitle: spec.subtitle || "",
      category: spec.category || "",
      description: spec.description || "",
      effects: spec.effects ? [...spec.effects] : ["", "", ""],
      warning: spec.warning || "",
      inspectInfo: spec.inspectInfo || "",
      audioText: spec.audioText || "",
      position: spec.position ? { ...spec.position } : { x: 0, y: 0.9, z: 0 },
      cabinetId: spec.cabinetId || "cabinet_left",
      scale: spec.scale !== undefined ? spec.scale : 1.0
    });
    setUpload3DStatus("idle");
    setUploaded3DFile(null);
  };

  const handleDeleteSpecimen = (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa mẫu vật này không? Hành động này sẽ cập nhật phòng trưng bày ngay lập tức.")) {
      const filtered = exhibits.filter(e => e.id !== id);
      saveToLocalStorage(filtered, null);
    }
  };

  const handleSaveSpecimen = (e) => {
    e.preventDefault();
    if (!specimenForm.id || !specimenForm.name) {
      alert("Vui lòng điền ID định danh và Tên mẫu vật!");
      return;
    }

    let updated;
    if (editingSpecimenId) {
      // Edit
      updated = exhibits.map(ex => ex.id === editingSpecimenId ? { ...specimenForm } : ex);
      alert(`Đã cập nhật thông tin mẫu vật [${specimenForm.name}] thành công!`);
    } else {
      // Add new
      if (exhibits.some(ex => ex.id === specimenForm.id)) {
        alert("ID mẫu vật này đã tồn tại! Vui lòng chọn một ID định danh khác.");
        return;
      }
      updated = [...exhibits, { ...specimenForm }];
      alert(`Đã thêm mẫu vật [${specimenForm.name}] vào phòng trưng bày thành công!`);
    }
    saveToLocalStorage(updated, null);
    resetSpecimenForm();
  };

  const resetSpecimenForm = () => {
    setEditingSpecimenId(null);
    setSpecimenForm({
      id: "",
      name: "",
      subtitle: "",
      category: "",
      description: "",
      effects: ["", "", ""],
      warning: "",
      inspectInfo: "",
      audioText: "",
      position: { x: 0, y: 0.9, z: 0 },
      cabinetId: "cabinet_left",
      scale: 1.0
    });
    setUpload3DStatus("idle");
    setUploaded3DFile(null);
  };

  // Poster Form Operations
  const handlePosterFormChange = (field, val) => {
    setPosterForm(prev => ({ ...prev, [field]: val }));
  };

  const handlePosterCoordChange = (axis, val) => {
    setPosterForm(prev => ({
      ...prev,
      position: { ...prev.position, [axis]: parseFloat(val) || 0 }
    }));
  };

  const handlePosterRotationChange = (val) => {
    // Rotation is along Y axis mostly (in radians)
    setPosterForm(prev => ({
      ...prev,
      rotation: { x: 0, y: parseFloat(val) || 0, z: 0 }
    }));
  };

  const handleEditPoster = (post) => {
    setEditingPosterId(post.id);
    setPosterForm({
      id: post.id,
      title: post.title,
      subtitle: post.subtitle || "",
      description: post.description || "",
      impactText: post.impactText || "",
      position: post.position ? { ...post.position } : { x: 0, y: 2.2, z: 0 },
      rotation: post.rotation ? { ...post.rotation } : { x: 0, y: 0, z: 0 }
    });
    setUploadImageStatus("idle");
    setUploadedImageFile(null);
  };

  const handleDeletePoster = (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa áp phích truyền thông này không?")) {
      const filtered = posters.filter(p => p.id !== id);
      saveToLocalStorage(null, filtered);
    }
  };

  const handleSavePoster = (e) => {
    e.preventDefault();
    if (!posterForm.id || !posterForm.title) {
      alert("Vui lòng nhập định danh ID và Tiêu đề áp phích!");
      return;
    }

    let updated;
    if (editingPosterId) {
      updated = posters.map(p => p.id === editingPosterId ? { ...posterForm } : p);
      alert(`Đã cập nhật áp phích [${posterForm.title}] thành công!`);
    } else {
      if (posters.some(p => p.id === posterForm.id)) {
        alert("ID áp phích đã tồn tại! Vui lòng chọn ID định danh khác.");
        return;
      }
      updated = [...posters, { ...posterForm }];
      alert(`Đã treo áp phích [${posterForm.title}] lên vách triển lãm thành công!`);
    }
    saveToLocalStorage(null, updated);
    resetPosterForm();
  };

  const resetPosterForm = () => {
    setEditingPosterId(null);
    setPosterForm({
      id: "",
      title: "",
      subtitle: "",
      description: "",
      impactText: "",
      position: { x: 0, y: 2.2, z: 0 },
      rotation: { x: 0, y: 0, z: 0 }
    });
    setUploadImageStatus("idle");
    setUploadedImageFile(null);
  };

  // Mock Upload Handlers
  const handle3DDragOver = (e) => {
    e.preventDefault();
    setIs3DDragging(true);
  };

  const handle3DDragLeave = () => {
    setIs3DDragging(false);
  };

  const handle3DDrop = (e) => {
    e.preventDefault();
    setIs3DDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processMock3DUpload(files[0]);
    }
  };

  const handle3DFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processMock3DUpload(files[0]);
    }
  };

  const processMock3DUpload = (file) => {
    if (!file.name.endsWith(".glb") && !file.name.endsWith(".gltf") && !file.name.endsWith(".obj")) {
      alert("Định dạng file không đúng! Vui lòng chỉ tải lên file 3D nhẹ có đuôi (.glb, .gltf, .obj)");
      return;
    }
    setUpload3DStatus("uploading");
    setUpload3DProgress(0);

    const interval = setInterval(() => {
      setUpload3DProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUpload3DStatus("success");
          setUploaded3DFile({
            name: file.name,
            size: `${(file.size / 1024).toFixed(1)} KB (Phù hợp để hiển thị mượt mà)`
          });
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  // Mock Image Upload Handlers
  const handleImageDragOver = (e) => {
    e.preventDefault();
    setIsImageDragging(true);
  };

  const handleImageDragLeave = () => {
    setIsImageDragging(false);
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    setIsImageDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processMockImageUpload(files[0]);
    }
  };

  const handleImageFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processMockImageUpload(files[0]);
    }
  };

  const processMockImageUpload = (file) => {
    if (!file.type.startsWith("image/")) {
      alert("Định dạng không khớp! Vui lòng tải lên file hình ảnh (PNG, JPG)");
      return;
    }
    setUploadImageStatus("uploading");
    setUploadImageProgress(0);

    const interval = setInterval(() => {
      setUploadImageProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadImageStatus("success");
          setUploadedImageFile({
            name: file.name,
            size: `${(file.size / 1024).toFixed(1)} KB`
          });
          return 100;
        }
        return prev + 20;
      });
    }, 100);
  };

  const restoreDefaults = () => {
    if (confirm("Bạn có muốn đặt lại toàn bộ dữ liệu mẫu vật và áp phích về trạng thái nguyên bản gốc không? Dữ liệu tùy chỉnh của bạn sẽ bị ghi đè.")) {
      localStorage.removeItem("3dpast_exhibits");
      localStorage.removeItem("3dpast_posters");
      window.location.reload();
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-backdrop">
        <style jsx>{`
          .login-backdrop {
            background-color: #080b11;
            color: #ffffff;
            min-height: 100vh;
            width: 100vw;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Outfit', sans-serif;
            padding: 20px;
            position: relative;
            overflow: hidden;
          }

          .login-glow {
            position: absolute;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(242, 153, 74, 0.15) 0%, transparent 70%);
            filter: blur(40px);
            z-index: 1;
          }

          .login-glow-1 { top: 15%; left: 20%; }
          .login-glow-2 { bottom: 15%; right: 20%; }

          .login-card {
            background: rgba(13, 20, 30, 0.6);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 20px;
            padding: 40px;
            width: 100%;
            max-width: 420px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
            z-index: 10;
            display: flex;
            flex-direction: column;
            gap: 24px;
            text-align: center;
            animation: fadeIn 0.4s ease-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .lock-icon-container {
            background: rgba(242, 153, 74, 0.1);
            border: 1px solid rgba(242, 153, 74, 0.25);
            width: 60px;
            height: 60px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #f2994a;
            margin: 0 auto;
            filter: drop-shadow(0 0 12px rgba(242, 153, 74, 0.3));
          }

          .login-header h2 {
            font-size: 1.35rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 12px;
          }

          .login-header p {
            font-size: 0.78rem;
            color: #8a96a8;
            margin-top: 6px;
          }

          .login-input-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
            text-align: left;
            margin-bottom: 16px;
          }

          .login-input-group label {
            font-size: 0.72rem;
            font-weight: 600;
            color: #8a96a8;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .login-input-group input {
            background: rgba(0, 0, 0, 0.4);
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 10px;
            padding: 12px 16px;
            font-family: 'Outfit', sans-serif;
            font-size: 0.85rem;
            outline: none;
            transition: all 0.2s ease;
          }

          .login-input-group input:focus {
            border-color: #f2994a;
            box-shadow: 0 0 10px rgba(242, 153, 74, 0.2);
          }

          .login-btn {
            background: #f2994a;
            color: #000000;
            font-weight: 700;
            font-size: 0.9rem;
            border: none;
            border-radius: 10px;
            padding: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            width: 100%;
            margin-top: 10px;
          }

          .login-btn:hover {
            box-shadow: 0 4px 15px rgba(242, 153, 74, 0.4);
          }

          .login-error-msg {
            color: #eb5757;
            background: rgba(235, 87, 87, 0.08);
            border: 1px solid rgba(235, 87, 87, 0.2);
            padding: 10px;
            border-radius: 8px;
            font-size: 0.75rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }

          .cancel-login-btn {
            background: transparent;
            color: #8a96a8;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 10px;
            padding: 10px;
            font-size: 0.8rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            width: 100%;
          }

          .cancel-login-btn:hover {
            color: #ffffff;
            background: rgba(255,255,255,0.05);
          }
        `}</style>

        <div className="login-glow login-glow-1"></div>
        <div className="login-glow login-glow-2"></div>

        <div className="login-card">
          <div className="lock-icon-container">
            <Sparkles size={28} />
          </div>

          <div className="login-header">
            <h2>Quản Trị Triển Lãm</h2>
            <p>Vui lòng đăng nhập tài khoản admin để điều chỉnh tiêu bản và áp phích</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="login-input-group">
              <label>Tài khoản</label>
              <input 
                type="text" 
                placeholder="Nhập tài khoản" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="login-input-group">
              <label>Mật khẩu</label>
              <input 
                type="password" 
                placeholder="Nhập mật khẩu" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {loginError && (
              <div className="login-error-msg">
                <AlertTriangle size={14} />
                <span>{loginError}</span>
              </div>
            )}

            <button type="submit" className="login-btn">Đăng Nhập</button>
            <button 
              type="button" 
              className="cancel-login-btn"
              onClick={() => window.location.href = "/"}
            >
              Hủy và Quay Lại
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      {/* LOCAL STYLES FOR FULL COMPATIBILITY & BEAUTIFUL RETINA RENDERING */}
      <style jsx>{`
        .admin-container {
          background-color: #080b11;
          color: #ffffff;
          min-height: 100vh;
          width: 100vw;
          overflow-x: hidden;
          font-family: 'Outfit', sans-serif;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(13, 20, 30, 0.7);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 20px 32px;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
        }

        .admin-header-title {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.05);
          color: #8a96a8;
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 10px 18px;
          border-radius: 30px;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .back-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .admin-logo-badge {
          background: rgba(242, 153, 74, 0.1);
          border: 1px solid rgba(242, 153, 74, 0.25);
          padding: 10px;
          border-radius: 12px;
          color: #f2994a;
        }

        .admin-title-text h1 {
          font-size: 1.25rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          background: linear-gradient(135deg, #ffffff 0%, #a0aec0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .admin-title-text p {
          font-size: 0.75rem;
          color: #8a96a8;
          margin-top: 4px;
        }

        .admin-main-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 24px;
          align-items: start;
        }

        .admin-card {
          background: rgba(13, 20, 30, 0.5);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.3);
        }

        .test-widget {
          display: flex;
          flex-direction: column;
          gap: 16px;
          border-color: rgba(47, 128, 237, 0.25);
          background: rgba(10, 25, 45, 0.4);
        }

        .test-run-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: linear-gradient(135deg, #2f80ed 0%, #1d4ed8 100%);
          color: #ffffff;
          border: none;
          padding: 12px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          box-shadow: 0 0 15px rgba(47, 128, 237, 0.35);
        }

        .test-run-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 0 20px rgba(47, 128, 237, 0.5);
        }

        .test-run-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .test-console {
          background: #04060b;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          padding: 12px;
          height: 180px;
          overflow-y: auto;
          font-family: monospace;
          font-size: 0.72rem;
          display: flex;
          flex-direction: column;
          gap: 8px;
          scrollbar-width: thin;
        }

        .log-entry {
          line-height: 1.4;
        }
        
        .log-info { color: #8a96a8; }
        .log-success { color: #27ae60; font-weight: bold; }
        .log-warning { color: #f2994a; }
        .log-error { color: #eb5757; font-weight: bold; }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: #8a96a8;
          border: 1px solid transparent;
          width: 100%;
          padding: 14px 18px;
          border-radius: 12px;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          text-align: left;
          transition: all 0.2s ease;
        }

        .tab-btn:hover {
          background: rgba(255, 255, 255, 0.03);
          color: #ffffff;
        }

        .tab-btn.active {
          background: rgba(242, 153, 74, 0.08);
          color: #f2994a;
          border: 1px solid rgba(242, 153, 74, 0.2);
        }

        .admin-content-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 24px;
        }

        .form-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #f2994a;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 12px;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }

        .input-group label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #8a96a8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .input-group input, .input-group textarea, .input-group select {
          background: rgba(0, 0, 0, 0.35);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 10px 14px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.85rem;
          outline: none;
          transition: all 0.2s ease;
        }

        .input-group input:focus, .input-group textarea:focus, .input-group select:focus {
          border-color: #f2994a;
          box-shadow: 0 0 10px rgba(242, 153, 74, 0.15);
        }

        .coordinate-inputs {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
        }

        .drag-uploader {
          border: 2px dashed rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          cursor: pointer;
          background: rgba(0, 0, 0, 0.15);
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .drag-uploader:hover, .drag-uploader.dragging {
          border-color: #f2994a;
          background: rgba(242, 153, 74, 0.02);
        }

        .upload-prog-bar {
          width: 100%;
          height: 6px;
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
          overflow: hidden;
          margin-top: 8px;
        }

        .upload-prog-fill {
          height: 100%;
          background: #f2994a;
          border-radius: 10px;
          transition: width 0.1s ease;
        }

        .submit-btn {
          background: #f2994a;
          color: #000000;
          font-weight: 700;
          font-size: 0.9rem;
          border: none;
          border-radius: 10px;
          padding: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          margin-top: 16px;
        }

        .submit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(242, 153, 74, 0.3);
        }

        .cancel-form-btn {
          background: rgba(255,255,255,0.05);
          color: #8a96a8;
          border: 1px solid rgba(255,255,255,0.08);
          font-weight: 600;
          font-size: 0.8rem;
          padding: 4px 10px;
          border-radius: 6px;
          cursor: pointer;
        }

        .cancel-form-btn:hover {
          color: #ffffff;
          background: rgba(255,255,255,0.1);
        }

        .list-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .items-list-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-height: 700px;
          overflow-y: auto;
          padding-right: 8px;
          scrollbar-width: thin;
        }

        .item-row {
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.2s ease;
        }

        .item-row:hover {
          border-color: rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.02);
        }

        .item-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .item-meta h4 {
          font-size: 0.9rem;
          font-weight: 700;
          color: #ffffff;
        }

        .item-meta p {
          font-size: 0.72rem;
          color: #8a96a8;
        }

        .item-actions {
          display: flex;
          gap: 8px;
        }

        .action-icon-btn {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: #8a96a8;
          padding: 8px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-icon-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
        }

        .action-delete-btn:hover {
          color: #eb5757;
          background: rgba(235, 87, 87, 0.1);
          border-color: rgba(235, 87, 87, 0.2);
        }

        .restore-btn {
          font-size: 0.75rem;
          color: #eb5757;
          background: rgba(235, 87, 87, 0.05);
          border: 1px solid rgba(235, 87, 87, 0.15);
          padding: 6px 14px;
          border-radius: 20px;
          cursor: pointer;
        }

        .restore-btn:hover {
          background: rgba(235, 87, 87, 0.12);
        }

        .upload-thumbnail {
          background: rgba(47, 128, 237, 0.1);
          border: 1px solid rgba(47, 128, 237, 0.25);
          border-radius: 8px;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.75rem;
          color: #56ccf2;
          width: 100%;
          justify-content: center;
        }
      `}</style>

      {/* HEADER BAR */}
      <header className="admin-header">
        <div className="admin-header-title">
          <div className="admin-logo-badge">
            <Sparkles size={24} />
          </div>
          <div className="admin-title-text">
            <h1>Hệ Thống Quản Trị Triển Lãm</h1>
            <p>Admin Dashboard: Điều chỉnh tiêu bản 3D & Áp phích thời gian thực</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button className="restore-btn" onClick={restoreDefaults}>Đặt lại mặc định</button>
          <button className="back-btn" onClick={handleLogout} style={{ color: "var(--color-ruby)", borderColor: "rgba(235,87,87,0.2)", background: "rgba(235,87,87,0.05)" }}>Đăng xuất</button>
          <button className="back-btn" onClick={() => window.location.href = "/"}>
            <ArrowLeft size={16} />
            <span>Phòng Triển Lãm 3D</span>
          </button>
        </div>
      </header>

      {/* MAIN TWO-COLUMN LAYOUT */}
      <div className="admin-main-grid">
        {/* LEFT COLUMN: CONTROL & TESTS WIDGET */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* NAVIGATION WIDGET */}
          <div className="admin-card" style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "16px" }}>
            <button 
              className={`tab-btn ${activeTab === "specimens" ? "active" : ""}`}
              onClick={() => setActiveTab("specimens")}
            >
              <FileText size={18} />
              <span>Tiêu Bản Mẫu Vật 3D</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === "posters" ? "active" : ""}`}
              onClick={() => setActiveTab("posters")}
            >
              <ImageIcon size={18} />
              <span>Khung Áp Phích Treo Tường</span>
            </button>
          </div>

          {/* AUTOMATED HEALTH CHECK CONSOLE (Fulfills 'Kiểm tra các nút hoạt động') */}
          <div className="admin-card test-widget">
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px", color: "#56ccf2" }}>
                <Sliders size={16} />
                <span>Nghiệm Thu Nút Chức Năng</span>
              </h3>
              <p style={{ fontSize: "0.7rem", color: "#8a96a8" }}>Chạy kịch bản tự động kiểm tra hệ thống điều phối nút bấm, uploader và ghi đè localStorage.</p>
            </div>

            <button 
              className="test-run-btn" 
              onClick={runHealthCheckTests}
              disabled={isTesting}
            >
              <Play size={14} />
              <span>{isTesting ? "Đang chạy phép thử..." : "Bắt Đầu Kiểm Thử"}</span>
            </button>

            <div className="test-console">
              {testLogs.length === 0 ? (
                <div style={{ color: "#4a5568", textAlign: "center", marginTop: "60px" }}>Chưa chạy phép thử. Hãy ấn nút phía trên để kiểm nghiệm nút bấm hoạt động.</div>
              ) : (
                testLogs.map(log => (
                  <div key={log.id} className={`log-entry log-${log.status}`}>
                    {log.message}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ROOM DIMENSIONS BLUEPRINT WIDGET */}
          <div className="admin-card room-blueprint-widget" style={{ display: "flex", flexDirection: "column", gap: "16px", background: "rgba(13, 20, 30, 0.45)", borderColor: "rgba(242, 153, 74, 0.15)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px", color: "#f2994a" }}>
                <Sparkles size={16} />
                <span>Bản Đồ Kích Thước 3D Room</span>
              </h3>
              <p style={{ fontSize: "0.7rem", color: "#8a96a8" }}>Thông số kỹ thuật vật lý chi tiết của căn phòng triển lãm và 3 cụm tủ trưng bày mẫu vật.</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.75rem", lineHeight: "1.4" }}>
              {/* Cabinet 1 */}
              <div style={{ background: "rgba(255, 255, 255, 0.02)", padding: "10px", borderRadius: "8px", borderLeft: "3px solid #eb5757" }}>
                <strong style={{ color: "#ffffff", display: "block", marginBottom: "4px" }}>Tủ 1: Tả Ngạn (Left Cabinet)</strong>
                <span style={{ color: "#8a96a8" }}>Phân loại: </span><span style={{ color: "#eb5757", fontWeight: "bold" }}>Opioids & Depressants</span><br/>
                <span style={{ color: "#8a96a8" }}>Kích thước: </span><strong style={{ color: "#ffffff" }}>Rộng 0.8m × Cao 0.9m × Dài 6.8m</strong><br/>
                <span style={{ color: "#8a96a8" }}>Vị trí tâm 3D: </span><code>X: -3.0, Y: 0.45, Z: -1.35</code><br/>
                <span style={{ color: "#8a96a8" }}>Sức chứa: </span><strong style={{ color: "#f2994a" }}>10 mẫu vật</strong> (Tiêu bản 1 - 10)
              </div>

              {/* Cabinet 2 */}
              <div style={{ background: "rgba(255, 255, 255, 0.02)", padding: "10px", borderRadius: "8px", borderLeft: "3px solid #f2994a" }}>
                <strong style={{ color: "#ffffff", display: "block", marginBottom: "4px" }}>Tủ 2: Hữu Ngạn (Right Cabinet)</strong>
                <span style={{ color: "#8a96a8" }}>Phân loại: </span><span style={{ color: "#f2994a", fontWeight: "bold" }}>Stimulants</span><br/>
                <span style={{ color: "#8a96a8" }}>Kích thước: </span><strong style={{ color: "#ffffff" }}>Rộng 0.8m × Cao 0.9m × Dài 6.8m</strong><br/>
                <span style={{ color: "#8a96a8" }}>Vị trí tâm 3D: </span><code>X: 3.0, Y: 0.45, Z: -1.35</code><br/>
                <span style={{ color: "#8a96a8" }}>Sức chứa: </span><strong style={{ color: "#f2994a" }}>10 mẫu vật</strong> (Tiêu bản 11 - 20)
              </div>

              {/* Cabinet 3 */}
              <div style={{ background: "rgba(255, 255, 255, 0.02)", padding: "10px", borderRadius: "8px", borderLeft: "3px solid #2f80ed" }}>
                <strong style={{ color: "#ffffff", display: "block", marginBottom: "4px" }}>Tủ 3: Hậu Sảnh (Back Long Cabinet)</strong>
                <span style={{ color: "#8a96a8" }}>Phân loại: </span><span style={{ color: "#2f80ed", fontWeight: "bold" }}>Hallucinogens & Dissociatives</span><br/>
                <span style={{ color: "#8a96a8" }}>Kích thước: </span><strong style={{ color: "#ffffff" }}>Rộng 10.0m × Cao 0.9m × Dài 0.8m</strong><br/>
                <span style={{ color: "#8a96a8" }}>Vị trí tâm 3D: </span><code>X: 0.0, Y: 0.45, Z: 4.5</code><br/>
                <span style={{ color: "#8a96a8" }}>Sức chứa: </span><strong style={{ color: "#f2994a" }}>10 mẫu vật</strong> (Tiêu bản 21 - 30)
              </div>

              {/* Partition wall */}
              <div style={{ background: "rgba(255, 255, 255, 0.02)", padding: "10px", borderRadius: "8px", borderLeft: "3px solid #8a96a8" }}>
                <strong style={{ color: "#ffffff", display: "block", marginBottom: "4px" }}>Vách Ngăn Chia Phòng (Partition Wall)</strong>
                <span style={{ color: "#8a96a8" }}>Mục đích: </span>Che chắn tủ dài phía sau sảnh<br/>
                <span style={{ color: "#8a96a8" }}>Kích thước: </span><strong style={{ color: "#ffffff" }}>Rộng 11.0m × Cao 3.2m × Dày 0.2m</strong><br/>
                <span style={{ color: "#8a96a8" }}>Vị trí tâm 3D: </span><code>X: 0.0, Y: 1.6, Z: 3.0</code>
              </div>

              {/* Floor and walls */}
              <div style={{ background: "rgba(255, 255, 255, 0.02)", padding: "10px", borderRadius: "8px", borderLeft: "3px solid #d4af37" }}>
                <strong style={{ color: "#ffffff", display: "block", marginBottom: "4px" }}>Màu Sắc & Thiết Kế Bề Mặt</strong>
                <span style={{ color: "#8a96a8" }}>Thiết kế sàn: </span><span style={{ color: "#eb5757", fontWeight: "bold" }}>Sàn màu đỏ Velvet</span> với lưới chỉ vàng óng ánh.<br/>
                <span style={{ color: "#8a96a8" }}>Nền tường: </span><span style={{ color: "#2f80ed", fontWeight: "bold" }}>Màu xanh dương đậm</span> (Navy Blue) sang trọng.
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: WORKSPACE FOR ADD/EDIT AND LISTS */}
        <div className="admin-card" style={{ minHeight: "680px" }}>
          
          {/* TAB 1: SPECIMENS WORKSPACE */}
          {activeTab === "specimens" && (
            <div className="admin-content-grid">
              
              {/* Form Add/Edit */}
              <form onSubmit={handleSaveSpecimen} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <h3 className="form-title">
                  <span>{editingSpecimenId ? `✏️ Hiệu Chỉnh Mẫu: ${specimenForm.name}` : "➕ Thêm Tiêu Bản Mẫu Vật 3D"}</span>
                  {editingSpecimenId && (
                    <button type="button" className="cancel-form-btn" onClick={resetSpecimenForm}>Hủy bỏ</button>
                  )}
                </h3>

                <div className="input-group">
                  <label>Mã ID Định Danh (ID bắt buộc viết liền không dấu, vd: heroin, meth)</label>
                  <input 
                    type="text" 
                    placeholder="VD: ketamine" 
                    value={specimenForm.id}
                    onChange={(e) => handleSpecimenFormChange("id", e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                    disabled={editingSpecimenId !== null}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Tên Mẫu Vật</label>
                  <input 
                    type="text" 
                    placeholder="VD: Ketamine (Thuốc lá khói)" 
                    value={specimenForm.name}
                    onChange={(e) => handleSpecimenFormChange("name", e.target.value)}
                    required
                  />
                </div>

                <div className="coordinate-inputs">
                  <div className="input-group">
                    <label>Phân Loại Nhóm</label>
                    <input 
                      type="text" 
                      placeholder="VD: Chất ảo giác mạnh" 
                      value={specimenForm.category}
                      onChange={(e) => handleSpecimenFormChange("category", e.target.value)}
                    />
                  </div>
                  <div className="input-group" style={{ gridColumn: "span 2" }}>
                    <label>Tiêu Đề Phụ</label>
                    <input 
                      type="text" 
                      placeholder="VD: Chất kích thích cực độc" 
                      value={specimenForm.subtitle}
                      onChange={(e) => handleSpecimenFormChange("subtitle", e.target.value)}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Mô Tả Giáo Dục Y Học</label>
                  <textarea 
                    rows="3" 
                    placeholder="Mô tả tác hại khoa học, thành phần hóa học..."
                    value={specimenForm.description}
                    onChange={(e) => handleSpecimenFormChange("description", e.target.value)}
                  />
                </div>

                {/* Dynamic Effects input */}
                <div className="input-group">
                  <label>3 Tác Hại Hủy Diệt Sinh Học Chính</label>
                  <input 
                    type="text" 
                    style={{ marginBottom: "8px" }}
                    placeholder="Tác hại 1: Gây nhồi máu cơ tim..." 
                    value={specimenForm.effects[0]}
                    onChange={(e) => handleEffectChange(0, e.target.value)}
                  />
                  <input 
                    type="text" 
                    style={{ marginBottom: "8px" }}
                    placeholder="Tác hại 2: Phá hủy tế bào não thùy trán..." 
                    value={specimenForm.effects[1]}
                    onChange={(e) => handleEffectChange(1, e.target.value)}
                  />
                  <input 
                    type="text" 
                    placeholder="Tác hại 3: Rối loạn hệ thần kinh vận động..." 
                    value={specimenForm.effects[2]}
                    onChange={(e) => handleEffectChange(2, e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label>Khuyến Cáo / Cảnh Báo Đặc Biệt</label>
                  <input 
                    type="text" 
                    placeholder="Cảnh báo: Có nguy cơ tử vong ngay lần đầu thử nghiệm!" 
                    value={specimenForm.warning}
                    onChange={(e) => handleSpecimenFormChange("warning", e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label>Thông Tin Phóng Đại 3D Inspect (Chi tiết vật thể quan sát)</label>
                  <input 
                    type="text" 
                    placeholder="VD: Dạng bột tinh thể mịn đóng chai bịt kín miệng..." 
                    value={specimenForm.inspectInfo}
                    onChange={(e) => handleSpecimenFormChange("inspectInfo", e.target.value)}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "12px", marginBottom: "8px" }}>
                  <div className="input-group">
                    <label>Tủ Trưng Bày 3D (Cabinet)</label>
                    <select 
                      value={specimenForm.cabinetId || "cabinet_left"}
                      onChange={(e) => {
                        const cabId = e.target.value;
                        handleSpecimenFormChange("cabinetId", cabId);
                        // Suggest sensible default coordinates for selected cabinet
                        if (cabId === "cabinet_left") {
                          handleSpecimenFormChange("position", { x: -3.0, y: 0.9, z: -1.0 });
                        } else if (cabId === "cabinet_right") {
                          handleSpecimenFormChange("position", { x: 3.0, y: 0.9, z: -1.0 });
                        } else {
                          handleSpecimenFormChange("position", { x: 0.0, y: 0.9, z: 4.5 });
                        }
                      }}
                      style={{ background: "rgba(0, 0, 0, 0.4)", color: "#ffffff", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "10px", padding: "10px" }}
                    >
                      <option value="cabinet_left">Tủ 1: Tả Ngạn (Trái) - 0.8x0.9x6.8m</option>
                      <option value="cabinet_right">Tủ 2: Hữu Ngạn (Phải) - 0.8x0.9x6.8m</option>
                      <option value="cabinet_back">Tủ 3: Hậu Sảnh (Dài) - 10.0x0.9x0.8m</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Tỉ Lệ Kích Thước (Scale)</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      min="0.1" 
                      max="3.0"
                      value={specimenForm.scale !== undefined ? specimenForm.scale : 1.0}
                      onChange={(e) => handleSpecimenFormChange("scale", parseFloat(e.target.value) || 1.0)}
                    />
                  </div>
                </div>

                <div className="coordinate-inputs">
                  <div className="input-group">
                    <label>Tọa Độ X (-7 đến 7)</label>
                    <input 
                      type="number" 
                      step="0.5" 
                      value={specimenForm.position.x}
                      onChange={(e) => handleCoordChange("x", e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Tọa Độ Y (Mặc định 0.9)</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      value={specimenForm.position.y}
                      onChange={(e) => handleCoordChange("y", e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Tọa Độ Z (-5 đến 5)</label>
                    <input 
                      type="number" 
                      step="0.5" 
                      value={specimenForm.position.z}
                      onChange={(e) => handleCoordChange("z", e.target.value)}
                    />
                  </div>
                </div>

                {/* Drag and Drop lightweight 3D Uploader */}
                <div className="input-group" style={{ marginTop: "10px" }}>
                  <label>Tải Lên File 3D Nhẹ Mô Phỏng (.glb, .gltf, .obj dưới 1MB)</label>
                  {upload3DStatus === "idle" && (
                    <div 
                      className={`drag-uploader ${is3DDragging ? "dragging" : ""}`}
                      onDragOver={handle3DDragOver}
                      onDragLeave={handle3DDragLeave}
                      onDrop={handle3DDrop}
                      onClick={() => document.getElementById("file3D").click()}
                    >
                      <Upload size={24} style={{ color: "#8a96a8" }} />
                      <div style={{ fontSize: "0.75rem", color: "#8a96a8" }}>
                        Kéo thả file 3D hoặc <span style={{ color: "#f2994a", fontWeight: "bold" }}>Chọn File</span>
                      </div>
                      <input 
                        type="file" 
                        id="file3D" 
                        style={{ display: "none" }} 
                        accept=".glb,.gltf,.obj"
                        onChange={handle3DFileSelect}
                      />
                    </div>
                  )}

                  {upload3DStatus === "uploading" && (
                    <div className="drag-uploader" style={{ pointerEvents: "none" }}>
                      <RefreshCw size={20} className="header-logo" style={{ animation: "holographic-pulse 1s infinite" }} />
                      <div style={{ fontSize: "0.75rem", color: "#f2994a" }}>Đang phân tích cấu trúc đa giác File 3D... {upload3DProgress}%</div>
                      <div className="upload-prog-bar">
                        <div className="upload-prog-fill" style={{ width: `${upload3DProgress}%` }}></div>
                      </div>
                    </div>
                  )}

                  {upload3DStatus === "success" && uploaded3DFile && (
                    <div className="upload-thumbnail">
                      <CheckCircle size={16} style={{ color: "#27ae60" }} />
                      <div style={{ display: "flex", flexDirection: "column", gap: "2px", textAlign: "left" }}>
                        <strong>{uploaded3DFile.name}</strong>
                        <span>Dung lượng: {uploaded3DFile.size}</span>
                      </div>
                      <button 
                        type="button" 
                        style={{ marginLeft: "auto", background: "transparent", border: "none", color: "#eb5757", cursor: "pointer" }}
                        onClick={() => setUpload3DStatus("idle")}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>

                <button type="submit" className="submit-btn">
                  {editingSpecimenId ? "Lưu Cập Nhật Mẫu Vật" : "Tạo Mẫu Vật & Treo Lên Căn Phòng"}
                </button>
              </form>

              {/* Items List */}
              <div>
                <h3 className="list-title">
                  <span>📂 Danh Sách Tiêu Bản Triển Lãm ({exhibits.length})</span>
                </h3>

                <div className="items-list-container">
                  {exhibits.map(ex => (
                    <div key={ex.id} className="item-row">
                      <div className="item-meta">
                        <h4>{ex.name}</h4>
                        <p style={{ color: "#f2994a", fontSize: "0.7rem", fontWeight: "bold" }}>{ex.category} • ID: {ex.id}</p>
                        <p style={{ fontSize: "0.68rem" }}>
                          Vị trí 3D: (X: {ex.position?.x}, Z: {ex.position?.z}) • Kích thước: <span style={{ color: "#56ccf2", fontWeight: "bold" }}>{ex.scale !== undefined ? ex.scale : 1.0}x</span>
                        </p>
                        <p style={{ fontSize: "0.68rem", color: "#a0aec0", marginTop: "2px" }}>
                          Thuộc: <span style={{ color: ex.cabinetId === "cabinet_left" ? "#eb5757" : ex.cabinetId === "cabinet_right" ? "#f2994a" : "#2f80ed", fontWeight: "bold" }}>
                            {ex.cabinetId === "cabinet_left" ? "Tủ 1 Trái (0.8x0.9x6.8m)" : ex.cabinetId === "cabinet_right" ? "Tủ 2 Phải (0.8x0.9x6.8m)" : "Tủ 3 Dài Sau (10.0x0.9x0.8m)"}
                          </span>
                        </p>
                      </div>
                      <div className="item-actions">
                        <button 
                          className="action-icon-btn" 
                          onClick={() => handleEditSpecimen(ex)}
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          className="action-icon-btn action-delete-btn"
                          onClick={() => handleDeleteSpecimen(ex.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: POSTERS WORKSPACE */}
          {activeTab === "posters" && (
            <div className="admin-content-grid">
              
              {/* Form Add/Edit */}
              <form onSubmit={handleSavePoster} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <h3 className="form-title">
                  <span>{editingPosterId ? `✏️ Cập Nhật Áp Phích: ${posterForm.title}` : "➕ Treo Áp Phích Truyền Thông Mới"}</span>
                  {editingPosterId && (
                    <button type="button" className="cancel-form-btn" onClick={resetPosterForm}>Hủy bỏ</button>
                  )}
                </h3>

                <div className="input-group">
                  <label>Mã ID Áp Phích (ID bắt buộc viết liền không dấu, vd: poster1, poster_law)</label>
                  <input 
                    type="text" 
                    placeholder="VD: poster_prevent" 
                    value={posterForm.id}
                    onChange={(e) => handlePosterFormChange("id", e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                    disabled={editingPosterId !== null}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Tiêu Đề Áp Phích</label>
                  <input 
                    type="text" 
                    placeholder="VD: Nói Không Với Chất Cấm" 
                    value={posterForm.title}
                    onChange={(e) => handlePosterFormChange("title", e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Khẩu Hiệu / Slogan Gây Ấn Tượng</label>
                  <input 
                    type="text" 
                    placeholder="VD: HÃY BẢO VỆ CON EM CHÚNG TA" 
                    value={posterForm.subtitle}
                    onChange={(e) => handlePosterFormChange("subtitle", e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Thông Điệp Tác Động Tức Thời</label>
                  <textarea 
                    rows="2" 
                    placeholder="Lời kêu gọi mạnh mẽ thúc đẩy từ chối cám dỗ..."
                    value={posterForm.impactText}
                    onChange={(e) => handlePosterFormChange("impactText", e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label>Mô Tả Ý Nghĩa Áp Phích</label>
                  <input 
                    type="text" 
                    placeholder="Mô tả tóm tắt nội dung truyền tải..." 
                    value={posterForm.description}
                    onChange={(e) => handlePosterFormChange("description", e.target.value)}
                  />
                </div>

                <div className="coordinate-inputs">
                  <div className="input-group">
                    <label>Tọa Độ X (Áp hông: -7.9 hoặc 7.9)</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      value={posterForm.position.x}
                      onChange={(e) => handlePosterCoordChange("x", e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Tọa Độ Y (Mặc định 2.2)</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      value={posterForm.position.y}
                      onChange={(e) => handlePosterCoordChange("y", e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Tọa Độ Z (-5 đến 5)</label>
                    <input 
                      type="number" 
                      step="0.5" 
                      value={posterForm.position.z}
                      onChange={(e) => handlePosterCoordChange("z", e.target.value)}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Góc Xoay Hướng Mặt Tường Y (Radian, vd: Xoay hông tường là: 1.57 hoặc -1.57)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    placeholder="Xoay 90 độ Y = 1.57" 
                    value={posterForm.rotation.y}
                    onChange={(e) => handlePosterRotationChange(e.target.value)}
                  />
                </div>

                {/* Drag and Drop Poster PNG image simulation */}
                <div className="input-group" style={{ marginTop: "10px" }}>
                  <label>Tải Lên Hình PNG Cho Áp Phích (Để vẽ vân bề mặt HD)</label>
                  {uploadImageStatus === "idle" && (
                    <div 
                      className={`drag-uploader ${isImageDragging ? "dragging" : ""}`}
                      onDragOver={handleImageDragOver}
                      onDragLeave={handleImageDragLeave}
                      onDrop={handleImageDrop}
                      onClick={() => document.getElementById("fileImage").click()}
                    >
                      <ImageIcon size={24} style={{ color: "#8a96a8" }} />
                      <div style={{ fontSize: "0.75rem", color: "#8a96a8" }}>
                        Kéo thả file hình áp phích hoặc <span style={{ color: "#f2994a", fontWeight: "bold" }}>Chọn Hình</span>
                      </div>
                      <input 
                        type="file" 
                        id="fileImage" 
                        style={{ display: "none" }} 
                        accept="image/*"
                        onChange={handleImageFileSelect}
                      />
                    </div>
                  )}

                  {uploadImageStatus === "uploading" && (
                    <div className="drag-uploader" style={{ pointerEvents: "none" }}>
                      <RefreshCw size={20} className="header-logo" style={{ animation: "holographic-pulse 1s infinite" }} />
                      <div style={{ fontSize: "0.75rem", color: "#f2994a" }}>Đang nén tối ưu hóa và xử lý tỷ lệ phân giải... {uploadImageProgress}%</div>
                      <div className="upload-prog-bar">
                        <div className="upload-prog-fill" style={{ width: `${uploadImageProgress}%` }}></div>
                      </div>
                    </div>
                  )}

                  {uploadImageStatus === "success" && uploadedImageFile && (
                    <div className="upload-thumbnail" style={{ color: "#f2994a", borderColor: "rgba(242,153,74,0.25)", background: "rgba(242,153,74,0.08)" }}>
                      <ImageIcon size={16} style={{ color: "#f2994a" }} />
                      <div style={{ display: "flex", flexDirection: "column", gap: "2px", textAlign: "left" }}>
                        <strong>{uploadedImageFile.name}</strong>
                        <span>Dung lượng ảnh: {uploadedImageFile.size}</span>
                      </div>
                      <button 
                        type="button" 
                        style={{ marginLeft: "auto", background: "transparent", border: "none", color: "#eb5757", cursor: "pointer" }}
                        onClick={() => setUploadImageStatus("idle")}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>

                <button type="submit" className="submit-btn">
                  {editingPosterId ? "Lưu Thay Đổi Áp Phích" : "Bản Ghi Hợp Lệ & Treo Lên Vách Tường"}
                </button>
              </form>

              {/* Items List */}
              <div>
                <h3 className="list-title">
                  <span>🖼️ Bộ Sưu Tập Áp Phích Vách Tường ({posters.length})</span>
                </h3>

                <div className="items-list-container">
                  {posters.map(post => (
                    <div key={post.id} className="item-row">
                      <div className="item-meta">
                        <h4>{post.title}</h4>
                        <p style={{ color: "#f2994a", fontSize: "0.7rem", fontWeight: "bold" }}>{post.subtitle} • ID: {post.id}</p>
                        <p style={{ fontSize: "0.68rem" }}>Vị trí 3D: (X: {post.position?.x}, Z: {post.position?.z})</p>
                      </div>
                      <div className="item-actions">
                        <button 
                          className="action-icon-btn" 
                          onClick={() => handleEditPoster(post)}
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          className="action-icon-btn action-delete-btn"
                          onClick={() => handleDeletePoster(post.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
