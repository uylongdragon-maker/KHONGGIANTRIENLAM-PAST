import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Compass, Eye, ShieldAlert } from "lucide-react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function ThreeCanvas({
  playerPosition,
  setPlayerPosition,
  playerRotation,
  setPlayerRotation,
  onSelectExhibit,
  onCompleteQuest,
  exhibits,
  posters,
  activeExhibit,
  onOpenCurator
}) {
  const mountRef = useRef(null);
  const containerRef = useRef(null);
  const [interactionPrompt, setInteractionPrompt] = useState(null);
  const [currentDistanceLabel, setCurrentDistanceLabel] = useState("");

  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 });
  const joystickTouchIdRef = useRef(null);
  const joystickCenterRef = useRef({ x: 0, y: 0 });
  const maxJoystickRadius = 45;
  const joystickZoneRef = useRef(null);

  useEffect(() => {
    setIsMobileDevice(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  }, []);

  // Bind standard DOM event listeners non-passively on virtual joystick zone
  useEffect(() => {
    const zone = joystickZoneRef.current;
    if (!zone) return;

    const onStart = (e) => {
      handleJoystickStart(e);
    };
    const onMove = (e) => {
      handleJoystickMove(e);
    };
    const onEnd = (e) => {
      handleJoystickEnd(e);
    };

    zone.addEventListener("touchstart", onStart, { passive: false });
    zone.addEventListener("touchmove", onMove, { passive: false });
    zone.addEventListener("touchend", onEnd, { passive: false });
    zone.addEventListener("touchcancel", onEnd, { passive: false });

    return () => {
      zone.removeEventListener("touchstart", onStart);
      zone.removeEventListener("touchmove", onMove);
      zone.removeEventListener("touchend", onEnd);
      zone.removeEventListener("touchcancel", onEnd);
    };
  }, [isMobileDevice, exhibits]);


  const handleJoystickStart = (e) => {
    if (e.cancelable) e.preventDefault();
    if (joystickTouchIdRef.current !== null) return;
    
    const touch = e.changedTouches[0];
    joystickTouchIdRef.current = touch.identifier;
    
    const baseElement = e.currentTarget.querySelector(".joystick-base");
    if (!baseElement) return;
    const rect = baseElement.getBoundingClientRect();
    joystickCenterRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  };

  const handleJoystickMove = (e) => {
    if (e.cancelable) e.preventDefault();
    if (joystickTouchIdRef.current === null) return;
    
    const touches = Array.from(e.touches);
    const touch = touches.find(t => t.identifier === joystickTouchIdRef.current);
    if (!touch) return;
    
    const deltaX = touch.clientX - joystickCenterRef.current.x;
    const deltaY = touch.clientY - joystickCenterRef.current.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    let moveX = deltaX;
    let moveY = deltaY;
    
    if (distance > maxJoystickRadius) {
      moveX = (deltaX / distance) * maxJoystickRadius;
      moveY = (deltaY / distance) * maxJoystickRadius;
    }
    
    setJoystickPos({ x: moveX, y: moveY });
    
    const forceX = moveX / maxJoystickRadius;
    const forceY = -moveY / maxJoystickRadius;
    
    stateRef.current.joyX = forceX;
    stateRef.current.joyY = forceY;
  };

  const handleJoystickEnd = (e) => {
    if (joystickTouchIdRef.current === null) return;
    
    const changedTouches = Array.from(e.changedTouches);
    const hasEnded = changedTouches.some(t => t.identifier === joystickTouchIdRef.current);
    
    if (hasEnded) {
      joystickTouchIdRef.current = null;
      setJoystickPos({ x: 0, y: 0 });
      stateRef.current.joyX = 0;
      stateRef.current.joyY = 0;
    }
  };

  // Refs for animation loop and keyboard state to avoid re-triggering useEffect
  const stateRef = useRef({
    posX: 0,
    posZ: 2, // Start in main lobby area
    rotY: 0,
    rotX: 0,
    keys: {},
    mouseDrag: false,
    prevMouseX: 0,
    prevMouseY: 0,
    teleportRequest: null,
    focusedElement: null,
    interactionPrompt: null // Sync current interactive overlay
  });

  // Track teleport updates from parent
  useEffect(() => {
    if (playerPosition) {
      stateRef.current.posX = playerPosition.x;
      stateRef.current.posZ = playerPosition.z;
    }
  }, [playerPosition]);

  // Synchronize interactionPrompt to ref for single-binding listener
  useEffect(() => {
    stateRef.current.interactionPrompt = interactionPrompt;
  }, [interactionPrompt]);

  // Handle keys (Binds EXACTLY ONCE on mount to ensure butter-smooth performance and Telex layout immunity)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const k = e.key.toLowerCase();
      const code = e.code;
      stateRef.current.keys[k] = true;
      stateRef.current.keys[code] = true;

      const prompt = stateRef.current.interactionPrompt;
      if (!prompt) return;

      // Handle interaction key 'f' / 'KeyF'
      if ((k === "f" || code === "KeyF") && prompt.type === "exhibit") {
        onSelectExhibit(prompt.id);
        onCompleteQuest(`explore_${prompt.id}`);
      }
      
      // Handle interaction key 'e' / 'KeyE' for AI Curator
      if ((k === "e" || code === "KeyE") && prompt.type === "curator") {
        onSelectExhibit(null); // Deselect exhibit
        onCompleteQuest("chat_curator");
        if (onOpenCurator) onOpenCurator();
      }
    };

    const handleKeyUp = (e) => {
      const k = e.key.toLowerCase();
      const code = e.code;
      stateRef.current.keys[k] = false;
      stateRef.current.keys[code] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [onSelectExhibit, onCompleteQuest, onOpenCurator]);

  useEffect(() => {
    if (!mountRef.current) return;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06101e); // Sunlit clean white museum background color -> Now majestic deep navy blue
    scene.fog = new THREE.FogExp2(0x06101e, 0.025); // Light fog matching background color for realistic depth

    const camera = new THREE.PerspectiveCamera(
      65,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(stateRef.current.posX, 1.6, stateRef.current.posZ);

    const isMobile = typeof window !== "undefined" && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, // Force antialiasing on all devices for sharp edges (no pixelation)
      alpha: false,
      powerPreference: "high-performance" 
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
    renderer.shadowMap.enabled = false; 
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isMobile ? 1.55 : 1.35;
    
    // Smooth rendering styles on the DOM element
    renderer.domElement.style.imageRendering = "auto";
    renderer.domElement.style.outline = "none";
    
    mountRef.current.appendChild(renderer.domElement);

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, isMobile ? 1.6 : 1.0); // Brighter fill on mobile to prevent pitch black look
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xe2e8f0, isMobile ? 1.25 : 0.75); // Overhead skylight brightness booster
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    // AI Curator Platform spotlights
    const curatorLight = new THREE.PointLight(0x2f80ed, 3, 5);
    curatorLight.position.set(0, 1.8, -0.5);
    scene.add(curatorLight);

    // DUST PARTICLES (Optimized for Mobile)
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = isMobile ? 30 : 120; // Drastically reduce particles count on mobile to save GPU processing
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 16;
      posArray[i + 1] = Math.random() * 4;
      posArray[i + 2] = (Math.random() - 0.5) * 12;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xf2994a,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const dustParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(dustParticles);

    // PROCEDURAL TEXTURES GENERATORS
    // 1. Floor grid CanvasTexture (Modern high-end polished granite/slate exhibition floor)
    const createFloorTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      
      // Modern sleek deep charcoal/slate granite base
      const grad = ctx.createLinearGradient(0, 0, 512, 512);
      grad.addColorStop(0, "#0c121e");
      grad.addColorStop(0.5, "#131c2e");
      grad.addColorStop(1, "#0a0f18");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);

      // Fine stone grain / granite speckles
      for (let i = 0; i < 600; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const radius = Math.random() * 1.5;
        const alpha = Math.random() * 0.08 + 0.02;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4 Tile quadrants (2x2 grid on 512x512 canvas)
      // Tile borders with subtle beveled reflection
      ctx.strokeStyle = "rgba(15, 23, 42, 0.9)";
      ctx.lineWidth = 6;
      ctx.strokeRect(0, 0, 512, 512);
      ctx.beginPath();
      ctx.moveTo(256, 0); ctx.lineTo(256, 512);
      ctx.moveTo(0, 256); ctx.lineTo(512, 256);
      ctx.stroke();

      // Luxurious polished brass/gold inlay seam lines
      ctx.strokeStyle = "rgba(212, 175, 55, 0.5)"; // Gold seam
      ctx.lineWidth = 1.5;
      ctx.strokeRect(3, 3, 506, 506);
      ctx.beginPath();
      ctx.moveTo(256, 0); ctx.lineTo(256, 512);
      ctx.moveTo(0, 256); ctx.lineTo(512, 256);
      ctx.stroke();

      // Inner subtle glow/specular gloss on each tile
      const drawTileGloss = (ox, oy) => {
        const radial = ctx.createRadialGradient(ox + 128, oy + 128, 20, ox + 128, oy + 128, 120);
        radial.addColorStop(0, "rgba(59, 130, 246, 0.07)");
        radial.addColorStop(0.7, "rgba(30, 58, 138, 0.02)");
        radial.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = radial;
        ctx.fillRect(ox + 4, oy + 4, 248, 248);

        // Subtle diagonal marble vein
        ctx.strokeStyle = "rgba(148, 163, 184, 0.09)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(ox + 20, oy + 230);
        ctx.bezierCurveTo(ox + 80, oy + 160, ox + 170, oy + 110, ox + 230, oy + 30);
        ctx.stroke();
      };

      drawTileGloss(0, 0);
      drawTileGloss(256, 0);
      drawTileGloss(0, 256);
      drawTileGloss(256, 256);

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(12, 9);
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
      tex.anisotropy = maxAnisotropy;
      return tex;
    };

    // 2. Poster CanvasTexture generator (Optimized to prevent Moiré aliasing patterns and enabled Anisotropic Filtering)
    const createPosterTexture = (title, subtitle, warnText) => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 768;
      const ctx = canvas.getContext("2d");

      // Ultra premium Red/Black dramatic gradient background
      const grad = ctx.createLinearGradient(0, 0, 0, 768);
      grad.addColorStop(0, "#eb5757");
      grad.addColorStop(0.2, "#4a0606");
      grad.addColorStop(0.8, "#140101");
      grad.addColorStop(1, "#050000");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 768);

      // Draw thin elegant glowing decorative frame borders instead of dense checker grids
      ctx.strokeStyle = "rgba(235, 87, 87, 0.3)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(15, 15, 482, 738);
      
      ctx.strokeStyle = "rgba(242, 153, 74, 0.25)";
      ctx.lineWidth = 1;
      ctx.strokeRect(25, 25, 462, 718);

      // Title Box
      ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
      ctx.fillRect(35, 45, 442, 110);
      ctx.strokeStyle = "#f2994a";
      ctx.lineWidth = 2;
      ctx.strokeRect(35, 45, 442, 110);

      // Draw Title Text
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 32px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(title, 256, 92);

      ctx.fillStyle = "#f2994a";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText("CÔNG AN PHƯỜNG TÂN HƯNG - CÔNG AN TP. HỒ CHÍ MINH", 256, 130);

      // Draw Subtitle / Slogan
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 26px sans-serif";
      ctx.fillText(subtitle, 256, 320);

      // Skull warning graphic circle
      ctx.strokeStyle = "#eb5757";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(256, 450, 40, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = "#eb5757";
      ctx.font = "bold 14px sans-serif";
      ctx.fillText("CẢNH BÁO NGUY HIỂM", 256, 540);

      // Warning paragraph text
      ctx.fillStyle = "#a0aec0";
      ctx.font = "16px sans-serif";
      const words = warnText.split(" ");
      let line = "";
      let y = 600;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 400 && n > 0) {
          ctx.fillText(line, 256, y);
          line = words[n] + " ";
          y += 26;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 256, y);

      // Outer Poster heavy boundary border
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.lineWidth = 10;
      ctx.strokeRect(5, 5, 502, 758);

      // Enable high quality min/mag and Anisotropic filtering on the CanvasTexture
      const tex = new THREE.CanvasTexture(canvas);
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
      tex.anisotropy = maxAnisotropy; // Solves diagonal and sharp grazing angle texture aliasing
      
      return tex;
    };

    // FLOOR & CEILING (Using MeshBasicMaterial to prevent any lighting/shadow compilation bugs on large planes)
    const floorGeo = new THREE.PlaneGeometry(24, 18);
    const floorTexture = createFloorTexture();
    const floorMat = new THREE.MeshBasicMaterial({
      map: floorTexture,
      color: 0xffffff
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // Decorative museum center floor ring around the robot platform
    const floorDecalGeo = new THREE.RingGeometry(1.4, 1.46, 64);
    const floorDecalMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      side: THREE.DoubleSide
    });
    const floorDecal = new THREE.Mesh(floorDecalGeo, floorDecalMat);
    floorDecal.rotation.x = -Math.PI / 2;
    floorDecal.position.set(0, 0.005, -0.5);
    scene.add(floorDecal);

    const floorDecalGeo2 = new THREE.RingGeometry(1.58, 1.62, 64);
    const floorDecalMat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide
    });
    const floorDecal2 = new THREE.Mesh(floorDecalGeo2, floorDecalMat2);
    floorDecal2.rotation.x = -Math.PI / 2;
    floorDecal2.position.set(0, 0.005, -0.5);
    scene.add(floorDecal2);

    // CEILING
    const ceilGeo = new THREE.PlaneGeometry(24, 18);
    const ceilMat = new THREE.MeshBasicMaterial({ 
      color: 0x1e293b // Roblox dark ceiling look
    });
    const ceiling = new THREE.Mesh(ceilGeo, ceilMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 4;
    scene.add(ceiling);

    // STRUCTURAL WALLS
    const wallGroup = new THREE.Group();
    
    // Wall materials - Roblox style: low roughness, clean bright colors
    const darkWallMat = new THREE.MeshStandardMaterial({ 
      color: 0x0f172a, // Slate base
      roughness: 0.3, 
      metalness: 0.1 
    });
    const crimsonWallMat = new THREE.MeshStandardMaterial({ 
      color: 0xbe123c, // Rose red accent columns
      roughness: 0.3, 
      metalness: 0.15 
    });

    // Create a boundary wall
    const createWall = (w, h, d, x, y, z, mat) => {
      const geo = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      wallGroup.add(mesh);
    };

    // North Wall (Z = -9)
    createWall(24, 4, 0.2, 0, 2, -9, darkWallMat);
    // South Wall (Z = 9)
    createWall(24, 4, 0.2, 0, 2, 9, darkWallMat);
    
    // West Wall (X = -12) - Solid slate wall with accent columns
    createWall(0.2, 4, 18, -12, 2, 0, darkWallMat);
    createWall(0.22, 4, 2, -12, 2, -4.5, crimsonWallMat);
    createWall(0.22, 4, 2, -12, 2, 4.5, crimsonWallMat);
    
    // East Wall (X = 12) - Solid slate wall with accent columns
    createWall(0.2, 4, 18, 12, 2, 0, darkWallMat);
    createWall(0.22, 4, 2, 12, 2, -4.5, crimsonWallMat);
    createWall(0.22, 4, 2, 12, 2, 4.5, crimsonWallMat);

    // Central partition wall (Z = 4.5) dividing the main gallery and the back gallery
    // Runs from X = -8.0 to X = 8.0 (length 16.0), Y from 0 to 3.2. Thickness is 0.2
    createWall(16.0, 3.2, 0.2, 0, 1.6, 4.5, darkWallMat);
    
    // Golden frame trim on top of the partition wall
    const pTrimGeo = new THREE.BoxGeometry(16.1, 0.06, 0.26);
    const pTrimMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.1 });
    const pTrim = new THREE.Mesh(pTrimGeo, pTrimMat);
    pTrim.position.set(0, 3.2, 4.5);
    wallGroup.add(pTrim);

    scene.add(wallGroup);

    // EXHIBITS DISPLAY CASES (3 large collective cabinets housing 35 specimens: 12 + 11 + 12)
    const casesGroup = new THREE.Group();
    const floatingSpecimens = [];

    // Base Cabinet materials (sleek dark metallic style with gold trim)
    const cabMat = new THREE.MeshStandardMaterial({ 
      color: 0x1e293b, 
      roughness: 0.2, 
      metalness: 0.15 
    });
    const goldTrimMat = new THREE.MeshStandardMaterial({ 
      color: 0xd4af37, 
      metalness: 0.9, 
      roughness: 0.1 
    });

    // Cabinet 1 (Left main cabinet for Opioids/Depressants - 12 specimens)
    // Symmetrically centered at Z = -1.5, length 7.8m (spans Z from -5.4 to 2.4, covering exhibits from -4.8 to 1.8)
    const cab1 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.9, 7.8), cabMat);
    cab1.position.set(-5.0, 0.45, -1.5);
    casesGroup.add(cab1);
    
    const cab1Trim = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.04, 7.82), goldTrimMat);
    cab1Trim.position.set(-5.0, 0.88, -1.5);
    casesGroup.add(cab1Trim);

    // Cabinet 2 (Right main cabinet for Stimulants - 11 specimens)
    // Symmetrically centered at Z = -1.5, length 7.8m (spans Z from -5.4 to 2.4, covering exhibits from -4.5 to 1.5)
    const cab2 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.9, 7.8), cabMat);
    cab2.position.set(5.0, 0.45, -1.5);
    casesGroup.add(cab2);

    const cab2Trim = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.04, 7.82), goldTrimMat);
    cab2Trim.position.set(5.0, 0.88, -1.5);
    casesGroup.add(cab2Trim);

    // Cabinet 3 (Back long cabinet for Hallucinogens - 12 specimens)
    // At Z = 6.5, centered at X = 0.0, length 15.0m (spans X from -7.5 to 7.5, covering exhibits from -6.6 to 6.6)
    const cab3 = new THREE.Mesh(new THREE.BoxGeometry(15.0, 0.9, 0.8), cabMat);
    cab3.position.set(0.0, 0.45, 6.5);
    casesGroup.add(cab3);

    const cab3Trim = new THREE.Mesh(new THREE.BoxGeometry(15.02, 0.04, 0.82), goldTrimMat);
    cab3Trim.position.set(0.0, 0.88, 6.5);
    casesGroup.add(cab3Trim);

    // 3 Premium spotlights, aligned to new cabinet centers
    // 1. Left Cabinet Spotlight
    const spotCab1 = new THREE.SpotLight(0xffe0b2, 4.0, 10.0, Math.PI / 4, 0.5, 1);
    spotCab1.position.set(-5.0, 3.9, -1.5);
    const targetCab1 = new THREE.Object3D();
    targetCab1.position.set(-5.0, 0.9, -1.5);
    scene.add(targetCab1);
    spotCab1.target = targetCab1;
    scene.add(spotCab1);

    // 2. Right Cabinet Spotlight
    const spotCab2 = new THREE.SpotLight(0xffe0b2, 4.0, 10.0, Math.PI / 4, 0.5, 1);
    spotCab2.position.set(5.0, 3.9, -1.5);
    const targetCab2 = new THREE.Object3D();
    targetCab2.position.set(5.0, 0.9, -1.5);
    scene.add(targetCab2);
    spotCab2.target = targetCab2;
    scene.add(spotCab2);

    // 3. Back Cabinet Spotlight
    const spotCab3 = new THREE.SpotLight(0xb3e5fc, 5.0, 10.0, Math.PI / 3, 0.5, 1);
    spotCab3.position.set(0.0, 3.9, 6.5);
    const targetCab3 = new THREE.Object3D();
    targetCab3.position.set(0.0, 0.9, 6.5);
    scene.add(targetCab3);
    spotCab3.target = targetCab3;
    scene.add(spotCab3);

    // Loop through each of the active specimens
    exhibits.forEach((ex) => {
      // Determine dynamic position overrides for expanded room
      let posX = ex.position.x;
      let posZ = ex.position.z;
      if (ex.cabinetId === "cabinet_left") {
        posX = -5.0;
      } else if (ex.cabinetId === "cabinet_right") {
        posX = 5.0;
      } else if (ex.cabinetId === "cabinet_back") {
        posZ = 6.5;
      }

      // 1. Ceiling light fixture above the specimen
      const fixtureGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.08, 12);
      const fixtureMat = new THREE.MeshStandardMaterial({ 
        color: 0x1e293b, 
        metalness: 0.9, 
        roughness: 0.1 
      });
      const fixture = new THREE.Mesh(fixtureGeo, fixtureMat);
      fixture.position.set(posX, 3.95, posZ);
      casesGroup.add(fixture);

      // 2. Volumetric spotlight cone (from ceiling 3.95 down to table 0.9)
      const coneGeo = new THREE.CylinderGeometry(0.03, 0.25, 3.05, 12, 1, true);
      const coneMat = new THREE.MeshBasicMaterial({
        color: ex.cabinetId === "cabinet_left" ? 0xffe0b2 : ex.cabinetId === "cabinet_right" ? 0xffcc80 : 0xb3e5fc,
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const lightCone = new THREE.Mesh(coneGeo, coneMat);
      lightCone.position.set(posX, 2.425, posZ);
      casesGroup.add(lightCone);

      // 3. Individual glass dome over the specimen on the table (sleek Cylinder style)
      const glassGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.35, 24);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.22, 
        roughness: 0.05,
        metalness: 0.1,
        clearcoat: 1.0, 
        clearcoatRoughness: 0.05,
        side: THREE.FrontSide,
        depthWrite: false 
      });
      const glass = new THREE.Mesh(glassGeo, glassMat);
      glass.position.set(posX, 1.06, posZ);
      casesGroup.add(glass);

      // Specimen Mesh generation
      let specimenMesh = new THREE.Group();
      specimenMesh.position.set(posX, 1.06, posZ);
      
      // Apply custom model scale factor from admin database
      const scaleVal = ex.scale !== undefined ? ex.scale : 1.0;
      specimenMesh.scale.set(scaleVal, scaleVal, scaleVal);

      if (ex.modelUrl) {
        // Beautiful rotating holographic wireframe loading indicator
        const loaderGeo = new THREE.BoxGeometry(0.06, 0.06, 0.06);
        const loaderMat = new THREE.MeshBasicMaterial({
          color: 0xf2994a,
          wireframe: true,
          transparent: true,
          opacity: 0.7
        });
        const loaderMesh = new THREE.Mesh(loaderGeo, loaderMat);
        specimenMesh.add(loaderMesh);

        // Load real GLB model
        const loader = new GLTFLoader();
        loader.load(
          ex.modelUrl,
          (gltf) => {
            specimenMesh.remove(loaderMesh);
            loaderGeo.dispose();
            loaderMat.dispose();

            const model = gltf.scene;
            const box = new THREE.Box3().setFromObject(model);
            const center = new THREE.Vector3();
            box.getCenter(center);
            model.position.sub(center);
            
            const size = new THREE.Vector3();
            box.getSize(size);
            const maxDim = Math.max(size.x, size.y, size.z);
            const targetSize = 0.22; // Scale custom specimen to be larger and fill the dome nicely
            if (maxDim > 0) {
              const modelScale = targetSize / maxDim;
              model.scale.set(modelScale, modelScale, modelScale);
            }
            
            specimenMesh.add(model);
          },
          undefined,
          (error) => {
            console.error(`Error loading GLTF model from ${ex.modelUrl}:`, error);
            specimenMesh.remove(loaderMesh);
            loaderGeo.dispose();
            loaderMat.dispose();

            const fallbackGeo = new THREE.SphereGeometry(0.05, 12, 12);
            const fallbackMat = new THREE.MeshPhysicalMaterial({ color: 0xeb5757, roughness: 0.2 });
            const fallbackMesh = new THREE.Mesh(fallbackGeo, fallbackMat);
            specimenMesh.add(fallbackMesh);
          }
        );
      } else {
        // Procedural model based on ID
        const idStr = ex.id.toLowerCase();
        let internalMesh;
        if (idStr === "heroin" || idStr === "cocaine") {
          // Zip bag or compressed powder block
          const bagGeo = new THREE.BoxGeometry(0.14, 0.14, 0.03);
          const bagMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.5, transparent: true, opacity: 0.9 });
          internalMesh = new THREE.Mesh(bagGeo, bagMat);
        } else if (idStr === "meth" || idStr === "lsd") {
          // Crystals / Paper sheets
          const cryGeo = new THREE.OctahedronGeometry(0.06);
          const cryMat = new THREE.MeshPhysicalMaterial({ color: 0x56ccf2, roughness: 0, transmission: 0.6, thickness: 0.2 });
          internalMesh = new THREE.Mesh(cryGeo, cryMat);
        } else if (idStr === "ecstasy" || idStr === "ritalin" || idStr === "adderall") {
          // Medicine pill
          const pillGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.012, 16);
          const pillMat = new THREE.MeshStandardMaterial({ color: idStr === "ecstasy" ? 0xeb5757 : 0xf2994a, roughness: 0.4 });
          internalMesh = new THREE.Mesh(pillGeo, pillMat);
          internalMesh.rotation.x = Math.PI / 2;
        } else if (idStr === "cannabis" || idStr === "khat" || idStr === "kratom") {
          // Leaf structure
          const group = new THREE.Group();
          const leafGeo = new THREE.ConeGeometry(0.03, 0.1, 4);
          const leafMat = new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.8 });
          for(let i=0; i<4; i++) {
            const leaf = new THREE.Mesh(leafGeo, leafMat);
            leaf.rotation.set(Math.PI/3, (i * Math.PI*2)/4, 0);
            leaf.scale.set(0.6, 0.6, 0.6);
            group.add(leaf);
          }
          internalMesh = group;
        } else {
          // Fallback: A beautiful general guide crystal sphere representing chemical structures
          const sphereGeo = new THREE.SphereGeometry(0.05, 12, 12);
          const sphereMat = new THREE.MeshPhysicalMaterial({
            color: ex.cabinetId === "cabinet_left" ? 0xeb5757 : ex.cabinetId === "cabinet_right" ? 0xf2994a : 0x2f80ed,
            roughness: 0.1,
            transmission: 0.7,
            thickness: 0.1
          });
          internalMesh = new THREE.Mesh(sphereGeo, sphereMat);
        }
        specimenMesh.add(internalMesh);
      }
      
      casesGroup.add(specimenMesh);
      floatingSpecimens.push({ mesh: specimenMesh, initialY: 1.06, id: ex.id });
    });

    scene.add(casesGroup);

    // WALL POSTERS (4 posters with downloaded anti-drug educational artworks)
    const postersGroup = new THREE.Group();
    const posterTextureLoader = new THREE.TextureLoader();

    posters.forEach((post) => {
      const sideSign = post.position.x < 0 ? -1 : 1;
      const frameX = sideSign * 11.86;

      // 1. Outer dark titanium frame
      const frameGeo = new THREE.BoxGeometry(1.84, 2.54, 0.08);
      const frameMat = new THREE.MeshStandardMaterial({ 
        color: 0x1e293b, 
        metalness: 0.9, 
        roughness: 0.1 
      });
      const frame = new THREE.Mesh(frameGeo, frameMat);
      frame.position.set(frameX, post.position.y, post.position.z);
      frame.rotation.set(post.rotation.x, post.rotation.y, post.rotation.z);
      postersGroup.add(frame);

      // 2. Inner luxury gold trim frame
      const innerFrameGeo = new THREE.BoxGeometry(1.76, 2.46, 0.09);
      const innerFrameMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.9,
        roughness: 0.1
      });
      const innerFrame = new THREE.Mesh(innerFrameGeo, innerFrameMat);
      innerFrame.position.copy(frame.position);
      innerFrame.rotation.copy(frame.rotation);
      postersGroup.add(innerFrame);

      // 3. Real artwork surface loaded from /public/posters/
      const surfaceGeo = new THREE.PlaneGeometry(1.7, 2.4);
      let posterTexture;
      if (post.imageUrl) {
        posterTexture = posterTextureLoader.load(
          post.imageUrl,
          (tex) => {
            tex.minFilter = THREE.LinearMipmapLinearFilter;
            tex.magFilter = THREE.LinearFilter;
            tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
            tex.needsUpdate = true;
          },
          undefined,
          () => {
            surface.material.map = createPosterTexture(post.title, post.subtitle, post.impactText);
            surface.material.needsUpdate = true;
          }
        );
      } else {
        posterTexture = createPosterTexture(post.title, post.subtitle, post.impactText);
      }

      const surfaceMat = new THREE.MeshBasicMaterial({
        map: posterTexture,
        side: THREE.FrontSide
      });
      const surface = new THREE.Mesh(surfaceGeo, surfaceMat);
      surface.position.copy(frame.position);
      surface.rotation.copy(frame.rotation);
      surface.position.x += -sideSign * 0.046;
      postersGroup.add(surface);

      // 4. Gallery spotlight angling on the poster
      const posterSpot = new THREE.SpotLight(0xfff5e6, 2.5, 6.0, Math.PI / 4, 0.5, 1.2);
      posterSpot.position.set(frameX - sideSign * 1.5, 3.8, post.position.z);
      const posterTarget = new THREE.Object3D();
      posterTarget.position.set(frameX, post.position.y, post.position.z);
      scene.add(posterTarget);
      posterSpot.target = posterTarget;
      postersGroup.add(posterSpot);
    });
    scene.add(postersGroup);

    // 3D POLICE ROBOT GUIDE (Robot 3D Hướng Dẫn Viên - Công An Phường Tân Hưng)
    const robotMasterGroup = new THREE.Group();
    robotMasterGroup.position.set(0, 0, -0.5);

    // 1. Pedestal Base
    const robotBaseGeo = new THREE.CylinderGeometry(0.85, 0.95, 0.15, 32);
    const robotBaseMat = new THREE.MeshStandardMaterial({ 
      color: 0x0f172a, 
      metalness: 0.85, 
      roughness: 0.25 
    });
    const robotBase = new THREE.Mesh(robotBaseGeo, robotBaseMat);
    robotBase.position.set(0, 0.075, 0);
    robotMasterGroup.add(robotBase);

    // Gold pedestal bevel ring
    const baseTrimGeo = new THREE.TorusGeometry(0.86, 0.018, 12, 32);
    const baseTrimMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.1 });
    const baseTrim = new THREE.Mesh(baseTrimGeo, baseTrimMat);
    baseTrim.rotation.x = Math.PI / 2;
    baseTrim.position.set(0, 0.15, 0);
    robotMasterGroup.add(baseTrim);

    // Glowing cyan pedestal activation ring
    const ringGeo = new THREE.RingGeometry(0.65, 0.72, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, side: THREE.DoubleSide });
    const lightRing = new THREE.Mesh(ringGeo, ringMat);
    lightRing.rotation.x = Math.PI / 2;
    lightRing.position.set(0, 0.155, 0);
    robotMasterGroup.add(lightRing);

    // Repulsor hover energy cone under robot
    const repulsorBeamGeo = new THREE.CylinderGeometry(0.18, 0.42, 0.45, 24, 1, true);
    const repulsorBeamMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const repulsorBeam = new THREE.Mesh(repulsorBeamGeo, repulsorBeamMat);
    repulsorBeam.position.set(0, 0.38, 0);
    robotMasterGroup.add(repulsorBeam);

    // Floating pulsing repulsor ring beneath robot
    const repulsorRingGeo = new THREE.TorusGeometry(0.28, 0.02, 16, 32);
    const repulsorRingMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const repulsorRing = new THREE.Mesh(repulsorRingGeo, repulsorRingMat);
    repulsorRing.rotation.x = Math.PI / 2;
    repulsorRing.position.set(0, 0.48, 0);
    robotMasterGroup.add(repulsorRing);

    // 2. Floating Robot Body Group (handles idle hovering and swaying)
    const robotBodyGroup = new THREE.Group();
    robotBodyGroup.position.set(0, 0.7, 0);

    // Materials
    const robotWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.15,
      metalness: 0.15
    });
    const robotNavyMat = new THREE.MeshStandardMaterial({
      color: 0x0a2540, // Police navy
      roughness: 0.25,
      metalness: 0.5
    });
    const robotDarkMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.4,
      metalness: 0.6
    });
    const robotGoldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.15,
      metalness: 0.95
    });
    const robotEyeMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff
    });

    // Lower repulsor thruster chassis
    const thrusterGeo = new THREE.CylinderGeometry(0.2, 0.1, 0.18, 20);
    const thruster = new THREE.Mesh(thrusterGeo, robotDarkMat);
    thruster.position.set(0, 0.05, 0);
    robotBodyGroup.add(thruster);

    // Waist belt with gold police buckle
    const beltGeo = new THREE.CylinderGeometry(0.24, 0.22, 0.08, 24);
    const belt = new THREE.Mesh(beltGeo, robotDarkMat);
    belt.position.set(0, 0.16, 0);
    robotBodyGroup.add(belt);

    const buckleGeo = new THREE.BoxGeometry(0.08, 0.06, 0.04);
    const buckle = new THREE.Mesh(buckleGeo, robotGoldMat);
    buckle.position.set(0, 0.16, 0.22);
    robotBodyGroup.add(buckle);

    // Main Torso (Sleek aerodynamic high-gloss body)
    const torsoGeo = new THREE.CylinderGeometry(0.28, 0.24, 0.45, 24);
    const torso = new THREE.Mesh(torsoGeo, robotWhiteMat);
    torso.position.set(0, 0.4, 0);
    robotBodyGroup.add(torso);

    // Front Chest Armor Plate (Police Navy Blue)
    const chestPlateGeo = new THREE.BoxGeometry(0.3, 0.24, 0.08);
    const chestPlate = new THREE.Mesh(chestPlateGeo, robotNavyMat);
    chestPlate.position.set(0, 0.44, 0.21);
    robotBodyGroup.add(chestPlate);

    // Golden Police Star Badge / Huy hiệu Công an on Chest
    const starGeo = new THREE.ConeGeometry(0.045, 0.02, 5);
    const starMesh = new THREE.Mesh(starGeo, robotGoldMat);
    starMesh.rotation.x = Math.PI / 2;
    starMesh.position.set(0, 0.46, 0.26);
    robotBodyGroup.add(starMesh);

    // Red police shield background for badge
    const shieldGeo = new THREE.BoxGeometry(0.07, 0.08, 0.015);
    const shieldMat = new THREE.MeshStandardMaterial({ color: 0xbe123c, roughness: 0.3 });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    shieldMesh.position.set(0, 0.46, 0.252);
    robotBodyGroup.add(shieldMesh);

    // Chest Status LED indicator bar (pulsing green/cyan)
    const ledBarGeo = new THREE.BoxGeometry(0.14, 0.02, 0.02);
    const ledBarMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const ledBar = new THREE.Mesh(ledBarGeo, ledBarMat);
    ledBar.position.set(0, 0.35, 0.255);
    robotBodyGroup.add(ledBar);

    // Shoulder Chrome Ball Joints
    const shoulderGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const shoulderMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.1 });
    
    // Left Arm (Rests gracefully by side)
    const shoulderL = new THREE.Mesh(shoulderGeo, shoulderMat);
    shoulderL.position.set(-0.32, 0.52, 0);
    robotBodyGroup.add(shoulderL);

    const armLGeo = new THREE.CylinderGeometry(0.04, 0.035, 0.22, 12);
    const armL = new THREE.Mesh(armLGeo, robotWhiteMat);
    armL.position.set(-0.35, 0.38, 0.02);
    armL.rotation.z = 0.15;
    robotBodyGroup.add(armL);

    const handLGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const handL = new THREE.Mesh(handLGeo, robotDarkMat);
    handL.position.set(-0.37, 0.24, 0.03);
    robotBodyGroup.add(handL);

    // Right Arm (Welcoming / Waving gesture)
    const shoulderR = new THREE.Mesh(shoulderGeo, shoulderMat);
    shoulderR.position.set(0.32, 0.52, 0);
    robotBodyGroup.add(shoulderR);

    // Upper arm angled outward & up
    const armRGroup = new THREE.Group();
    armRGroup.position.set(0.32, 0.52, 0);
    armRGroup.rotation.z = -0.55; // Angle outward
    armRGroup.rotation.x = -0.3; // Angle forward

    const upperArmR = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.038, 0.18, 12), robotWhiteMat);
    upperArmR.position.set(0, -0.09, 0);
    armRGroup.add(upperArmR);

    // Elbow joint
    const elbowR = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), shoulderMat);
    elbowR.position.set(0, -0.19, 0);
    armRGroup.add(elbowR);

    // Forearm & Hand in separate group for waving animation
    const robotForearmR = new THREE.Group();
    robotForearmR.position.set(0, -0.19, 0);
    robotForearmR.rotation.z = -1.2; // Bend up into waving pose

    const forearmR = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.035, 0.18, 12), robotNavyMat);
    forearmR.position.set(0, 0.09, 0);
    robotForearmR.add(forearmR);

    // Hand with articulated fingers spread in wave
    const handR = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), robotDarkMat);
    handR.position.set(0, 0.19, 0);
    robotForearmR.add(handR);

    // Friendly 3 robotic fingers
    for (let f = -1; f <= 1; f++) {
      const fingerGeo = new THREE.CylinderGeometry(0.01, 0.008, 0.06, 8);
      const finger = new THREE.Mesh(fingerGeo, robotGoldMat);
      finger.position.set(f * 0.02, 0.23, 0);
      finger.rotation.z = f * 0.15;
      robotForearmR.add(finger);
    }

    armRGroup.add(robotForearmR);
    robotBodyGroup.add(armRGroup);

    // Neck joint
    const neckGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.08, 16);
    const neck = new THREE.Mesh(neckGeo, robotDarkMat);
    neck.position.set(0, 0.65, 0);
    robotBodyGroup.add(neck);

    // 3. Robot Head Group (for looking around animation)
    const robotHeadGroup = new THREE.Group();
    robotHeadGroup.position.set(0, 0.72, 0);

    // Main head helmet (smooth ceramic white)
    const headGeo = new THREE.SphereGeometry(0.22, 24, 20);
    const headMesh = new THREE.Mesh(headGeo, robotWhiteMat);
    headMesh.scale.set(1.05, 0.95, 1.0);
    headMesh.position.set(0, 0.16, 0);
    robotHeadGroup.add(headMesh);

    // Curved Glossy Visor Face
    const visorGeo = new THREE.SphereGeometry(0.205, 24, 16, 0, Math.PI, 0, Math.PI * 0.65);
    const visorMat = new THREE.MeshPhysicalMaterial({
      color: 0x020617,
      roughness: 0.05,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05
    });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.rotation.x = -Math.PI / 2;
    visor.rotation.z = -Math.PI / 2;
    visor.position.set(0, 0.16, 0.04);
    robotHeadGroup.add(visor);

    // Digital Glowing Cyan Eyes (Dual friendly LED eyes)
    const eyeGeo = new THREE.CapsuleGeometry(0.022, 0.055, 8, 12);
    
    const eyeL = new THREE.Mesh(eyeGeo, robotEyeMat);
    eyeL.rotation.z = Math.PI / 2;
    eyeL.position.set(-0.075, 0.18, 0.22);
    robotHeadGroup.add(eyeL);

    const eyeR = new THREE.Mesh(eyeGeo, robotEyeMat);
    eyeR.rotation.z = Math.PI / 2;
    eyeR.position.set(0.075, 0.18, 0.22);
    robotHeadGroup.add(eyeR);

    // Police Cap / Crest on head
    const capBaseGeo = new THREE.CylinderGeometry(0.18, 0.2, 0.05, 24);
    const capBase = new THREE.Mesh(capBaseGeo, robotNavyMat);
    capBase.position.set(0, 0.35, 0.02);
    capBase.rotation.x = 0.12;
    robotHeadGroup.add(capBase);

    // Gold cap trim band
    const capBandGeo = new THREE.CylinderGeometry(0.202, 0.202, 0.015, 24);
    const capBand = new THREE.Mesh(capBandGeo, robotGoldMat);
    capBand.position.set(0, 0.33, 0.02);
    capBand.rotation.x = 0.12;
    robotHeadGroup.add(capBand);

    // Cap Visor Bill (Glossy black patent leather visor)
    const billGeo = new THREE.BoxGeometry(0.24, 0.015, 0.12);
    const billMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.1, metalness: 0.8 });
    const bill = new THREE.Mesh(billGeo, billMat);
    bill.position.set(0, 0.32, 0.15);
    bill.rotation.x = 0.35;
    robotHeadGroup.add(bill);

    // Mini Golden Police Star on Cap
    const capStar = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.015, 5), robotGoldMat);
    capStar.rotation.x = Math.PI / 2;
    capStar.position.set(0, 0.36, 0.19);
    robotHeadGroup.add(capStar);

    // Ear Modules with Glowing LED accents
    const earGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.04, 16);
    const earL = new THREE.Mesh(earGeo, robotNavyMat);
    earL.rotation.z = Math.PI / 2;
    earL.position.set(-0.23, 0.16, 0);
    robotHeadGroup.add(earL);

    const earR = new THREE.Mesh(earGeo, robotNavyMat);
    earR.rotation.z = Math.PI / 2;
    earR.position.set(0.23, 0.16, 0);
    robotHeadGroup.add(earR);

    // Comms Antennae on ears with blinking tip LEDs
    const antennaGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.18, 8);
    const antennaMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.1 });
    
    const antennaL = new THREE.Mesh(antennaGeo, antennaMat);
    antennaL.position.set(-0.23, 0.28, 0);
    antennaL.rotation.z = 0.2;
    robotHeadGroup.add(antennaL);

    const antennaTipGeo = new THREE.SphereGeometry(0.018, 12, 12);
    const antennaTipMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const antennaTipL = new THREE.Mesh(antennaTipGeo, antennaTipMat);
    antennaTipL.position.set(-0.25, 0.38, 0);
    robotHeadGroup.add(antennaTipL);

    const antennaR = new THREE.Mesh(antennaGeo, antennaMat);
    antennaR.position.set(0.23, 0.28, 0);
    antennaR.rotation.z = -0.2;
    robotHeadGroup.add(antennaR);

    const antennaTipR = new THREE.Mesh(antennaTipGeo, antennaTipMat);
    antennaTipR.position.set(0.25, 0.38, 0);
    robotHeadGroup.add(antennaTipR);

    robotBodyGroup.add(robotHeadGroup);
    robotMasterGroup.add(robotBodyGroup);

    // 4. Floating Holographic Badge Above Robot's Head
    const createRobotBadgeTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 160;
      const ctx = canvas.getContext("2d");

      // Semi-transparent high-tech HUD background
      ctx.fillStyle = "rgba(10, 25, 47, 0.85)";
      ctx.fillRect(0, 0, 512, 160);

      // Cyan glowing neon borders
      ctx.strokeStyle = "#00f0ff";
      ctx.lineWidth = 4;
      ctx.strokeRect(6, 6, 500, 148);

      // Corner tech accents
      ctx.fillStyle = "#00f0ff";
      ctx.fillRect(0, 0, 20, 6);
      ctx.fillRect(0, 0, 6, 20);
      ctx.fillRect(492, 0, 20, 6);
      ctx.fillRect(506, 0, 6, 20);
      ctx.fillRect(0, 154, 20, 6);
      ctx.fillRect(0, 140, 6, 20);
      ctx.fillRect(492, 154, 20, 6);
      ctx.fillRect(506, 140, 6, 20);

      // Line 1: Action Prompt
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 34px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("[E] ROBOT HƯỚNG DẪN VIÊN 3D", 256, 62);

      // Line 2: Subtitle
      ctx.fillStyle = "#facc15"; // Gold
      ctx.font = "bold 24px sans-serif";
      ctx.fillText("CÔNG AN PHƯỜNG TÂN HƯNG", 256, 114);

      const tex = new THREE.CanvasTexture(canvas);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      return tex;
    };

    const badgePlaneGeo = new THREE.PlaneGeometry(1.4, 0.44);
    const badgePlaneMat = new THREE.MeshBasicMaterial({
      map: createRobotBadgeTexture(),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95
    });
    const robotBadgePlane = new THREE.Mesh(badgePlaneGeo, badgePlaneMat);
    robotBadgePlane.position.set(0, 1.95, 0);
    robotMasterGroup.add(robotBadgePlane);

    scene.add(robotMasterGroup);

    // INTERACTIVE CAMERA DRAG CONTROLS
    const onMouseDown = (e) => {
      // Check if clicking directly on the 3D Canvas
      if (e.target !== renderer.domElement) return;
      stateRef.current.mouseDrag = true;
      stateRef.current.prevMouseX = e.clientX;
      stateRef.current.prevMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!stateRef.current.mouseDrag) return;
      const deltaX = e.clientX - stateRef.current.prevMouseX;
      const deltaY = e.clientY - stateRef.current.prevMouseY;

      stateRef.current.prevMouseX = e.clientX;
      stateRef.current.prevMouseY = e.clientY;

      // Update camera yaw & pitch
      stateRef.current.rotY -= deltaX * 0.003;
      stateRef.current.rotX -= deltaY * 0.003;

      // Clamp vertical look to prevent turning upside down
      stateRef.current.rotX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, stateRef.current.rotX));
    };

    const onMouseUp = () => {
      stateRef.current.mouseDrag = false;
    };

    // Multitouch touch look controls (tracks non-joystick touch IDs)
    const activeLookTouchId = { current: null };
    const prevLookTouchX = { current: 0 };
    const prevLookTouchY = { current: 0 };

    const onTouchStart = (e) => {
      if (e.target !== renderer.domElement) return;
      
      // Stop dynamic browser bouncing and scrolling bar movements
      if (e.cancelable) e.preventDefault();
      
      if (activeLookTouchId.current !== null) return;

      // Find the look touch (excluding the joystick touch)
      const touches = Array.from(e.changedTouches);
      const lookTouch = touches.find(t => t.identifier !== joystickTouchIdRef.current);
      if (!lookTouch) return;

      activeLookTouchId.current = lookTouch.identifier;
      prevLookTouchX.current = lookTouch.clientX;
      prevLookTouchY.current = lookTouch.clientY;
      stateRef.current.mouseDrag = true;
    };

    const onTouchMove = (e) => {
      if (activeLookTouchId.current === null) return;
      
      // Stop dynamic browser bouncing and scrolling bar movements
      if (e.cancelable) e.preventDefault();

      const touches = Array.from(e.touches);
      const lookTouch = touches.find(t => t.identifier === activeLookTouchId.current);
      if (!lookTouch) return;

      const deltaX = lookTouch.clientX - prevLookTouchX.current;
      const deltaY = lookTouch.clientY - prevLookTouchY.current;

      prevLookTouchX.current = lookTouch.clientX;
      prevLookTouchY.current = lookTouch.clientY;

      stateRef.current.rotY -= deltaX * 0.0035; // Fine-tuned speed for premium iPhone panning
      stateRef.current.rotX -= deltaY * 0.0035;
      stateRef.current.rotX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, stateRef.current.rotX));
    };

    const onTouchEnd = (e) => {
      if (activeLookTouchId.current === null) return;

      const changedTouches = Array.from(e.changedTouches);
      const hasEnded = changedTouches.some(t => t.identifier === activeLookTouchId.current);

      if (hasEnded) {
        activeLookTouchId.current = null;
        stateRef.current.mouseDrag = false;
      }
    };

    const onTouchCancel = (e) => {
      onTouchEnd(e);
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchCancel);

    // ANIMATION & INTERACTION LOOP
    let animationFrameId;
    const clock = new THREE.Clock();

    const checkCollisions = (targetX, targetZ) => {
      // Outer boundaries
      if (targetX < -11.5 || targetX > 11.5) return true;
      if (targetZ < -8.5 || targetZ > 8.5) return true;

      // Collision with Table 1 (Left Main Cabinet: 12 specimens): X = -5.0, Z from -5.4 to 2.4
      // Bounds: X from -5.6 to -4.4, Z from -5.8 to 2.8
      if (targetX > -5.6 && targetX < -4.4 && targetZ > -5.8 && targetZ < 2.8) return true;

      // Collision with Table 2 (Right Main Cabinet: 11 specimens): X = 5.0, Z from -5.4 to 2.4
      // Bounds: X from 4.4 to 5.6, Z from -5.8 to 2.8
      if (targetX > 4.4 && targetX < 5.6 && targetZ > -5.8 && targetZ < 2.8) return true;

      // Collision with Table 3 (Back Long Cabinet: 12 specimens): X from -7.5 to 7.5, Z = 6.5
      // Bounds: X from -7.9 to 7.9, Z from 5.9 to 7.1
      if (targetX > -7.9 && targetX < 7.9 && targetZ > 5.9 && targetZ < 7.1) return true;

      // Collision with Central Partition Wall: Z = 4.5, X from -8.0 to 8.0
      // Thickness is 0.2, Z bounds: 4.1 to 4.9, X bounds: -8.2 to 8.2
      if (targetX > -8.2 && targetX < 8.2 && targetZ > 4.1 && targetZ < 4.9) return true;

      // Collision with Robot Guide Base
      const dcx = targetX - 0;
      const dcz = targetZ - (-0.5);
      if (Math.sqrt(dcx * dcx + dcz * dcz) < 1.0) return true;

      return false;
    };

    const tick = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // 1. ROTATE PROCEDURAL ELEMENTS
      floatingSpecimens.forEach((spec) => {
        spec.mesh.rotation.y += 0.8 * delta;
        spec.mesh.position.y = spec.initialY + Math.sin(time * 2 + spec.mesh.position.x) * 0.04;
      });

      // Animate 3D Police Robot Guide (Idling hover bob, subtle sway, look-around, friendly waving)
      robotBodyGroup.position.y = 0.68 + Math.sin(time * 2.2) * 0.04;
      robotBodyGroup.rotation.y = Math.sin(time * 1.2) * 0.03;
      robotBodyGroup.rotation.z = Math.sin(time * 1.8) * 0.015;
      
      // Robot head looks around smoothly
      robotHeadGroup.rotation.y = Math.sin(time * 0.8) * 0.28;
      robotHeadGroup.rotation.x = Math.sin(time * 1.4) * 0.05;

      // Right arm waving animation
      robotForearmR.rotation.z = -1.2 + Math.sin(time * 3.8) * 0.22;

      // Pulsing repulsor ring & beam beneath robot
      repulsorRing.rotation.y += 1.5 * delta;
      const ringScale = 1.0 + Math.sin(time * 3.5) * 0.06;
      repulsorRing.scale.set(ringScale, ringScale, 1.0);
      repulsorBeam.material.opacity = 0.16 + Math.sin(time * 3.5) * 0.06;

      // Robot LED eyes subtle blink every few seconds
      const blinkCycle = time % 4.0;
      const isBlinking = blinkCycle > 3.85 && blinkCycle < 3.98;
      eyeL.scale.y = isBlinking ? 0.1 : 1.0;
      eyeR.scale.y = isBlinking ? 0.1 : 1.0;

      // Comms Antennae LED pulse
      antennaTipMat.color.setHex(Math.sin(time * 4.0) > 0 ? 0x00f0ff : 0x38bdf8);

      // Dust particles float upward
      const positions = dustParticles.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += 0.1 * delta;
        if (positions[i] > 4) {
          positions[i] = 0; // Wrap back to floor
        }
      }
      dustParticles.geometry.attributes.position.needsUpdate = true;

      // 2. PROCESS NAVIGATION CONTROLS (WASD Keys + Mobile Virtual Joystick)
      const moveSpeed = 2.4 * delta;
      const keys = stateRef.current.keys;
      
      let moveX = 0;
      let moveZ = 0;

      // Forward/Back based on yaw (Checks code and key for Telex layout immunity)
      if (keys["w"] || keys["arrowup"] || keys["KeyW"] || keys["ArrowUp"]) {
        moveX -= Math.sin(stateRef.current.rotY) * moveSpeed;
        moveZ -= Math.cos(stateRef.current.rotY) * moveSpeed;
      }
      if (keys["s"] || keys["arrowdown"] || keys["KeyS"] || keys["ArrowDown"]) {
        moveX += Math.sin(stateRef.current.rotY) * moveSpeed;
        moveZ += Math.cos(stateRef.current.rotY) * moveSpeed;
      }
      
      // Strafe
      if (keys["a"] || keys["arrowleft"] || keys["KeyA"] || keys["ArrowLeft"]) {
        moveX -= Math.cos(stateRef.current.rotY) * moveSpeed;
        moveZ += Math.sin(stateRef.current.rotY) * moveSpeed;
      }
      if (keys["d"] || keys["arrowright"] || keys["KeyD"] || keys["ArrowRight"]) {
        moveX += Math.cos(stateRef.current.rotY) * moveSpeed;
        moveZ -= Math.sin(stateRef.current.rotY) * moveSpeed;
      }

      // Add Mobile Joystick Forces (joyX/joyY: -1.0 to 1.0)
      const joyX = stateRef.current.joyX || 0;
      const joyY = stateRef.current.joyY || 0;
      if (joyY !== 0) {
        moveX += joyY * -Math.sin(stateRef.current.rotY) * moveSpeed;
        moveZ += joyY * -Math.cos(stateRef.current.rotY) * moveSpeed;
      }
      if (joyX !== 0) {
        moveX += joyX * Math.cos(stateRef.current.rotY) * moveSpeed;
        moveZ += joyX * -Math.sin(stateRef.current.rotY) * moveSpeed;
      }

      // Check collision
      const newX = stateRef.current.posX + moveX;
      const newZ = stateRef.current.posZ + moveZ;
      if (!checkCollisions(newX, newZ)) {
        stateRef.current.posX = newX;
        stateRef.current.posZ = newZ;
      }

      // Apply coordinates to camera
      camera.position.set(stateRef.current.posX, 1.6, stateRef.current.posZ);
      
      // Calculate rotation quaternion using rotY & rotX
      const qYaw = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), stateRef.current.rotY);
      const qPitch = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), stateRef.current.rotX);
      camera.quaternion.copy(qYaw).multiply(qPitch);

      // Report player coordinates back to parent for Minimap rendering
      setPlayerPosition({ x: stateRef.current.posX, z: stateRef.current.posZ });
      setPlayerRotation(stateRef.current.rotY);

      // 3. INTERACTION PROMPT DETECTION
      let closestElement = null;
      let minDistance = 2.0; // Interactive trigger range (meters)

      // Check display cases with overridden coordinates
      exhibits.forEach((ex) => {
        let posX = ex.position.x;
        let posZ = ex.position.z;
        if (ex.cabinetId === "cabinet_left") {
          posX = -5.0;
        } else if (ex.cabinetId === "cabinet_right") {
          posX = 5.0;
        } else if (ex.cabinetId === "cabinet_back") {
          posZ = 6.5;
        }

        const dx = stateRef.current.posX - posX;
        const dz = stateRef.current.posZ - posZ;
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist < minDistance) {
          minDistance = dist;
          closestElement = {
            type: "exhibit",
            id: ex.id,
            name: ex.name,
            prompt: `Nhấn [F] Khảo sát ${ex.name}`
          };
        }
      });

      // Check posters with overridden coordinates
      posters.forEach((post) => {
        let posX = post.position.x;
        let posZ = post.position.z;
        if (posX < 0) {
          posX = -11.86;
        } else {
          posX = 11.86;
        }

        const dx = stateRef.current.posX - posX;
        const dz = stateRef.current.posZ - posZ;
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist < 1.8) {
          minDistance = dist;
          closestElement = {
            type: "exhibit", // Trigger detailed view on the side
            id: post.id, // Set the poster ID correctly
            name: post.title,
            prompt: `Nhấn [F] Xem Áp phích "${post.title}"`,
            isPoster: true,
            posterId: post.id
          };
        }
      });

      // Check 3D Police Robot Platform
      const dcx = stateRef.current.posX - 0;
      const dcz = stateRef.current.posZ - (-0.5);
      const distCurator = Math.sqrt(dcx * dcx + dcz * dcz);
      if (distCurator < 2.0 && distCurator < minDistance) {
        closestElement = {
          type: "curator",
          prompt: "Nhấn [E] Để nói chuyện với Robot Hướng Dẫn Viên 3D"
        };
      }

      setInteractionPrompt(closestElement);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // RESIZE EVENT
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchCancel);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Recursive disposer function for complete, leak-free memory cleanup
      const disposeNode = (node) => {
        if (node.geometry) node.geometry.dispose();
        if (node.material) {
          if (Array.isArray(node.material)) {
            node.material.forEach(m => {
              if (m.map) m.map.dispose();
              m.dispose();
            });
          } else {
            if (node.material.map) node.material.map.dispose();
            node.material.dispose();
          }
        }
        if (node.children) {
          node.children.forEach(disposeNode);
        }
      };

      // Dispose materials/geometry to avoid memory leaks
      floorGeo.dispose();
      if (floorMat.map) floorMat.map.dispose();
      floorMat.dispose();
      ceilGeo.dispose();
      ceilMat.dispose();
      
      // Recursively clean groups
      wallGroup.children.forEach(disposeNode);
      casesGroup.children.forEach(disposeNode);
      postersGroup.children.forEach(disposeNode);
      disposeNode(robotMasterGroup);

      renderer.dispose();
    };
  }, [exhibits, posters]);

  return (
    <div className="canvas-container" ref={containerRef}>
      {/* 3D Canvas Mounting point */}
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />

      {/* Floating Raycast prompt HUD */}
      {interactionPrompt && (
        <div 
          className="exhibit-look-prompt ui-element animate-pulse"
          style={{ cursor: "pointer", pointerEvents: "auto" }}
          onClick={() => {
            if (interactionPrompt.type === "exhibit") {
              onSelectExhibit(interactionPrompt.id);
              onCompleteQuest(`explore_${interactionPrompt.id}`);
            } else if (interactionPrompt.type === "curator") {
              onSelectExhibit(null);
              onCompleteQuest("chat_curator");
              if (onOpenCurator) onOpenCurator();
            }
          }}
        >
          <Compass size={14} className="header-logo" style={{ animation: 'holographic-pulse 2s infinite' }} />
          <span>{interactionPrompt.prompt} (Chạm để mở)</span>
        </div>
      )}

      {/* Mobile Virtual Joystick Overlay */}
      {isMobileDevice && (
        <div 
          className="joystick-zone ui-element"
          ref={joystickZoneRef}
        >
          <div className="joystick-base">
            <div 
              className="joystick-handle" 
              style={{
                transform: `translate(${joystickPos.x}px, ${joystickPos.y}px)`,
                transition: joystickPos.x === 0 && joystickPos.y === 0 ? "transform 0.15s ease-out" : "none"
              }}
            />
          </div>
        </div>
      )}

      {/* Basic instruction hints (Hidden on Mobile) */}
      {!isMobileDevice && (
        <div className="hud-control-tip ui-element" style={{ bottom: '24px', opacity: 0.9 }}>
          <div className="hud-control-item">
            <span className="hud-key">W</span>
            <span className="hud-key">A</span>
            <span className="hud-key">S</span>
            <span className="hud-key">D</span>
            <span>Di chuyển</span>
          </div>
          <div className="hud-control-item">
            <span className="hud-key">Chuột</span>
            <span>Kéo nhìn quanh</span>
          </div>
          <div className="hud-control-item">
            <span className="hud-key">F</span>
            <span>Tương tác mẫu</span>
          </div>
          <div className="hud-control-item">
            <span className="hud-key">E</span>
            <span>Hỏi Robot 3D</span>
          </div>
        </div>
      )}
    </div>
  );
}
