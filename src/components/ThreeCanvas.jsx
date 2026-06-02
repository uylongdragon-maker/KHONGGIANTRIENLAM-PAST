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
    // 1. Floor grid CanvasTexture (Roblox-style Red Carpet grid)
    const createFloorTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");
      
      // Rich red carpet base color
      ctx.fillStyle = "#8b0000";
      ctx.fillRect(0, 0, 256, 256);

      // Premium gold grid lines
      ctx.strokeStyle = "#e5c158";
      ctx.lineWidth = 4;
      ctx.strokeRect(0, 0, 256, 256);
      ctx.beginPath();
      ctx.moveTo(128, 0); ctx.lineTo(128, 256);
      ctx.moveTo(0, 128); ctx.lineTo(256, 128);
      ctx.stroke();

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
      ctx.font = "14px sans-serif";
      ctx.fillText("TRIỂN LÃM MA TÚY 3D PAST", 256, 130);

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

    // EXHIBITS DISPLAY CASES (3 large collective cabinets housing 30 specimens)
    const casesGroup = new THREE.Group();
    const floatingSpecimens = [];

    // Base Cabinet materials (Roblox sleek plastic/metallic style)
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

    // Cabinet 1 (Left main cabinet for Opioids/Depressants)
    // Widened to X = -5.0. Length 8.0 running from Z = -5.0 to 3.0 (center Z = -1.0)
    const cab1 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.9, 8.0), cabMat);
    cab1.position.set(-5.0, 0.45, -1.0);
    casesGroup.add(cab1);
    
    const cab1Trim = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.04, 8.02), goldTrimMat);
    cab1Trim.position.set(-5.0, 0.88, -1.0);
    casesGroup.add(cab1Trim);

    // Cabinet 2 (Right main cabinet for Stimulants)
    // Widened to X = 5.0. Length 8.0 running from Z = -5.0 to 3.0 (center Z = -1.0)
    const cab2 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.9, 8.0), cabMat);
    cab2.position.set(5.0, 0.45, -1.0);
    casesGroup.add(cab2);

    const cab2Trim = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.04, 8.02), goldTrimMat);
    cab2Trim.position.set(5.0, 0.88, -1.0);
    casesGroup.add(cab2Trim);

    // Cabinet 3 (Back long cabinet for Hallucinogens behind the partition wall)
    // Moved back to Z = 6.5. Runs along X: Z = 6.5, X from -8.0 to 8.0 (center X = 0, length 16.0)
    const cab3 = new THREE.Mesh(new THREE.BoxGeometry(16.0, 0.9, 0.8), cabMat);
    cab3.position.set(0.0, 0.45, 6.5);
    casesGroup.add(cab3);

    const cab3Trim = new THREE.Mesh(new THREE.BoxGeometry(16.02, 0.04, 0.82), goldTrimMat);
    cab3Trim.position.set(0.0, 0.88, 6.5);
    casesGroup.add(cab3Trim);

    // 3 Premium spotlights, aligned to new expanded cabinet positions
    
    // 1. Left Cabinet Spotlight
    const spotCab1 = new THREE.SpotLight(0xffe0b2, 4.0, 10.0, Math.PI / 4, 0.5, 1);
    spotCab1.position.set(-5.0, 3.9, -1.0);
    const targetCab1 = new THREE.Object3D();
    targetCab1.position.set(-5.0, 0.9, -1.0);
    scene.add(targetCab1);
    spotCab1.target = targetCab1;
    scene.add(spotCab1);

    // 2. Right Cabinet Spotlight
    const spotCab2 = new THREE.SpotLight(0xffe0b2, 4.0, 10.0, Math.PI / 4, 0.5, 1);
    spotCab2.position.set(5.0, 3.9, -1.0);
    const targetCab2 = new THREE.Object3D();
    targetCab2.position.set(5.0, 0.9, -1.0);
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

    // WALL POSTERS (4 posters)
    const postersGroup = new THREE.Group();
    posters.forEach((post) => {
      // Determine dynamic position override for posters to align with expanded walls
      const sideSign = post.position.x < 0 ? -1 : 1;
      const frameX = sideSign * 11.86; // Center frame so that the back sits exactly on the X = -11.9 / 11.9 inner wall face

      // Premium outer frame (polished dark chrome frame border)
      // Defined as wide along X (1.84) and thin along Z (0.08) before rotation, so that
      // after a 90-degree Y rotation, it aligns flat against the East/West walls (along Z).
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

      // Inner elegant golden lining frame for a luxury 3D nested frame aesthetic
      const innerFrameGeo = new THREE.BoxGeometry(1.76, 2.46, 0.09);
      const innerFrameMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37, // Polished gold trim
        metalness: 0.9,
        roughness: 0.1
      });
      const innerFrame = new THREE.Mesh(innerFrameGeo, innerFrameMat);
      innerFrame.position.copy(frame.position);
      innerFrame.rotation.copy(frame.rotation);
      postersGroup.add(innerFrame);

      // High impact poster surface texture
      const surfaceGeo = new THREE.PlaneGeometry(1.7, 2.4);
      const surfaceMat = new THREE.MeshBasicMaterial({
        map: createPosterTexture(post.title, post.subtitle, post.impactText),
        side: THREE.DoubleSide
      });
      const surface = new THREE.Mesh(surfaceGeo, surfaceMat);
      
      // Place slightly offset from inner frame to avoid z-fighting
      surface.position.copy(frame.position);
      surface.rotation.copy(frame.rotation);
      surface.position.x += -sideSign * 0.046; // Offset towards the center of the room to sit in front of the inner frame face
      
      postersGroup.add(surface);
    });
    scene.add(postersGroup);

    // AI CURATOR HOLOGRAM BASE & EFFECT
    const holoBaseGeo = new THREE.CylinderGeometry(0.9, 1.0, 0.15, 32);
    const holoBaseMat = new THREE.MeshStandardMaterial({ color: 0x0a101d, metalness: 0.8, roughness: 0.2 });
    const holoBase = new THREE.Mesh(holoBaseGeo, holoBaseMat);
    holoBase.position.set(0, 0.075, -0.5);
    scene.add(holoBase);

    // Hologram circular light ring
    const ringGeo = new THREE.RingGeometry(0.7, 0.75, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x2f80ed, side: THREE.DoubleSide });
    const lightRing = new THREE.Mesh(ringGeo, ringMat);
    lightRing.rotation.x = Math.PI / 2;
    lightRing.position.set(0, 0.16, -0.5);
    scene.add(lightRing);

    // Simulated Volumetric hologram shape: glowing octahedron + double rings
    const holoGroup = new THREE.Group();
    holoGroup.position.set(0, 1.25, -0.5);

    const coreGeo = new THREE.OctahedronGeometry(0.2, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xf2994a,
      transparent: true,
      opacity: 0.8,
      wireframe: true
    });
    const holoCore = new THREE.Mesh(coreGeo, coreMat);
    holoGroup.add(holoCore);

    // Outer rotating energy ring
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x2f80ed, transparent: true, opacity: 0.5, wireframe: true });
    const outerRing = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.02, 8, 24), ringMat2);
    outerRing.rotation.x = Math.PI/3;
    holoGroup.add(outerRing);

    const outerRing2 = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.015, 8, 24), ringMat2);
    outerRing2.rotation.y = Math.PI/4;
    holoGroup.add(outerRing2);

    scene.add(holoGroup);

    // Volumetric Emitter beam for hologram platform
    const beamGeo = new THREE.CylinderGeometry(0.65, 0.85, 2.2, 32, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x2f80ed,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const hologramBeam = new THREE.Mesh(beamGeo, beamMat);
    hologramBeam.position.set(0, 1.15, -0.5);
    scene.add(hologramBeam);

    // Volumetric floating hologram rings that rise up and expand
    const holoRings = [];
    const ringColors = [0x2f80ed, 0x56ccf2, 0xf2994a];
    for (let i = 0; i < 3; i++) {
      const rGeo = new THREE.RingGeometry(0.65, 0.68, 32);
      const rMat = new THREE.MeshBasicMaterial({
        color: ringColors[i % ringColors.length],
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const ringMesh = new THREE.Mesh(rGeo, rMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.set(0, 0.2 + i * 0.6, -0.5);
      scene.add(ringMesh);
      holoRings.push({
        mesh: ringMesh,
        baseY: 0.2,
        maxY: 2.2,
        speed: 0.35 + i * 0.08
      });
    }

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

      // Collision with Table 1 (Left Main Cabinet): X = -5.0, Z runs -5.0 to 3.0
      // Bounds: X from -5.6 to -4.4, Z from -5.6 to 3.6
      if (targetX > -5.6 && targetX < -4.4 && targetZ > -5.6 && targetZ < 3.6) return true;

      // Collision with Table 2 (Right Main Cabinet): X = 5.0, Z runs -5.0 to 3.0
      // Bounds: X from 4.4 to 5.6, Z from -5.6 to 3.6
      if (targetX > 4.4 && targetX < 5.6 && targetZ > -5.6 && targetZ < 3.6) return true;

      // Collision with Table 3 (Back Long Cabinet): X from -8.0 to 8.0, Z = 6.5
      // Bounds: X from -8.6 to 8.6, Z from 5.9 to 7.1
      if (targetX > -8.6 && targetX < 8.6 && targetZ > 5.9 && targetZ < 7.1) return true;

      // Collision with Central Partition Wall: Z = 4.5, X from -8.0 to 8.0
      // Thickness is 0.2, Z bounds: 4.1 to 4.9, X bounds: -8.6 to 8.6
      if (targetX > -8.6 && targetX < 8.6 && targetZ > 4.1 && targetZ < 4.9) return true;

      // Collision with Curator base
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

      holoGroup.rotation.y -= 0.5 * delta;
      holoCore.rotation.x += 0.3 * delta;
      outerRing.rotation.z += 0.8 * delta;
      outerRing2.rotation.x -= 0.6 * delta;

      // Emit volumetric pulse glowing effect
      const glowScale = 1.0 + Math.sin(time * 3) * 0.08;
      holoCore.scale.set(glowScale, glowScale, glowScale);

      // Animate Hologram volumetric rising rings
      holoRings.forEach((r) => {
        r.mesh.position.y += r.speed * delta;
        const progress = (r.mesh.position.y - r.baseY) / (r.maxY - r.baseY);
        r.mesh.material.opacity = (1 - progress) * 0.4;
        
        // Expand ring as it rises
        const scale = 1.0 + progress * 0.35;
        r.mesh.scale.set(scale, scale, 1.0);

        if (r.mesh.position.y > r.maxY) {
          r.mesh.position.y = r.baseY;
          r.mesh.scale.set(1.0, 1.0, 1.0);
        }
      });

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

      // Check AI Curator Platform
      const dcx = stateRef.current.posX - 0;
      const dcz = stateRef.current.posZ - (-0.5);
      const distCurator = Math.sqrt(dcx * dcx + dcz * dcz);
      if (distCurator < 1.8 && distCurator < minDistance) {
        closestElement = {
          type: "curator",
          prompt: "Nhấn [E] Để nói chuyện với AI Curator"
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
      
      holoBaseGeo.dispose();
      holoBaseMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      beamGeo.dispose();
      beamMat.dispose();
      
      holoRings.forEach(r => {
        r.mesh.geometry.dispose();
        r.mesh.material.dispose();
      });

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
            <span>Chat với Curator</span>
          </div>
        </div>
      )}
    </div>
  );
}
