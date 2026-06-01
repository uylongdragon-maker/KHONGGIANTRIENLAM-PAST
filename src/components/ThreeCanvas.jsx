import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Compass, Eye, ShieldAlert } from "lucide-react";

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
      antialias: !isMobile, // Disable antialias on mobile for extreme performance gain
      alpha: false,
      powerPreference: "high-performance" // Enable dedicated GPU for maximum smoothness
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    // Limit pixel ratio on mobile to 1.0 (prevents heavy lag), limit desktop to max 2.0
    renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false; // Completely disabled shadowMap to resolve Apple Silicon GPU pitch black rendering bugs
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isMobile ? 1.55 : 1.35; // Enhanced phơi sáng for crisp details, brighter on mobile
    
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
    // 1. Floor grid CanvasTexture (Bright white modern museum style)
    const createFloorTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      
      // Premium deep velvet red base
      ctx.fillStyle = "#5c0606";
      ctx.fillRect(0, 0, 512, 512);

      // Glowing golden elegant grid lines
      ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
      ctx.lineWidth = 6;
      ctx.strokeRect(0, 0, 512, 512);
      ctx.beginPath();
      ctx.moveTo(256, 0); ctx.lineTo(256, 512);
      ctx.moveTo(0, 256); ctx.lineTo(512, 256);
      ctx.stroke();

      // Subtle gold quartz grain
      ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
      for (let i = 0; i < 600; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        ctx.fillRect(x, y, 2, 2);
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(8, 6);
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
    const floorGeo = new THREE.PlaneGeometry(16, 12);
    const floorTexture = createFloorTexture();
    const floorMat = new THREE.MeshBasicMaterial({
      map: floorTexture,
      color: 0xffffff // Soft bright white polished floor with grid texture
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // CEILING
    const ceilGeo = new THREE.PlaneGeometry(16, 12);
    const ceilMat = new THREE.MeshBasicMaterial({ 
      color: 0xffffff // Brilliant clean white plaster ceiling
    });
    const ceiling = new THREE.Mesh(ceilGeo, ceilMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 4;
    scene.add(ceiling);

    // STRUCTURAL WALLS
    const wallGroup = new THREE.Group();
    
    // Wall materials - Brighter on mobile for premium visibility, deep navy blue & glowing dark crimson on desktop
    const darkWallMat = new THREE.MeshStandardMaterial({ 
      color: isMobile ? 0x162c4a : 0x0a1c36, 
      roughness: 0.6, 
      metalness: 0.1 
    });
    const crimsonWallMat = new THREE.MeshStandardMaterial({ 
      color: isMobile ? 0xaa1313 : 0x8b0000, 
      roughness: 0.4, 
      metalness: 0.2 
    });

    // Create a boundary wall
    const createWall = (w, h, d, x, y, z, mat) => {
      const geo = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      wallGroup.add(mesh);
    };

    // North Wall (Z = -6)
    createWall(16, 4, 0.2, 0, 2, -6, darkWallMat);
    // South Wall (Z = 6)
    createWall(16, 4, 0.2, 0, 2, 6, darkWallMat);
    
    // West Wall (X = -8) - non-overlapping elegant partitions (perfectly aligns with posters)
    createWall(0.2, 4, 1.5, -8, 2, -5.25, darkWallMat);
    createWall(0.2, 4, 3.0, -8, 2, -3.0, crimsonWallMat);
    createWall(0.2, 4, 1.5, -8, 2, -0.75, darkWallMat);
    createWall(0.2, 4, 3.0, -8, 2, 1.5, crimsonWallMat);
    createWall(0.2, 4, 3.0, -8, 2, 4.5, darkWallMat);
    
    // East Wall (X = 8) - non-overlapping elegant partitions (perfectly aligns with posters)
    createWall(0.2, 4, 1.5, 8, 2, -5.25, darkWallMat);
    createWall(0.2, 4, 3.0, 8, 2, -3.0, crimsonWallMat);
    createWall(0.2, 4, 1.5, 8, 2, -0.75, darkWallMat);
    createWall(0.2, 4, 3.0, 8, 2, 1.5, crimsonWallMat);
    createWall(0.2, 4, 3.0, 8, 2, 4.5, darkWallMat);

    // Central partition wall (Z = 3.0) dividing the main gallery and the back gallery
    // Runs from X = -5.5 to X = 5.5 (length 11.0), Y from 0 to 3.2. Thickness is 0.2
    createWall(11.0, 3.2, 0.2, 0, 1.6, 3.0, darkWallMat);
    
    // Golden frame trim on top of the partition wall
    const pTrimGeo = new THREE.BoxGeometry(11.1, 0.06, 0.26);
    const pTrimMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.1 });
    const pTrim = new THREE.Mesh(pTrimGeo, pTrimMat);
    pTrim.position.set(0, 3.2, 3.0);
    wallGroup.add(pTrim);

    scene.add(wallGroup);

    // EXHIBITS DISPLAY CASES (3 large collective cabinets housing 30 specimens)
    const casesGroup = new THREE.Group();
    const floatingSpecimens = [];

    // Base Cabinet materials (mockup's premium emerald wood look)
    const cabMat = new THREE.MeshStandardMaterial({ 
      color: 0x163725, 
      roughness: 0.25, 
      metalness: 0.15 
    });
    const goldTrimMat = new THREE.MeshStandardMaterial({ 
      color: 0xd4af37, 
      metalness: 0.9, 
      roughness: 0.1 
    });

    // Cabinet 1 (Left main cabinet for Opioids/Depressants)
    // Runs along Z: X = -3, Z from -4.75 to 2.05 (center Z = -1.35, length 6.8)
    const cab1 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.9, 6.8), cabMat);
    cab1.position.set(-3.0, 0.45, -1.35);
    casesGroup.add(cab1);
    
    const cab1Trim = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.04, 6.82), goldTrimMat);
    cab1Trim.position.set(-3.0, 0.88, -1.35);
    casesGroup.add(cab1Trim);

    // Cabinet 2 (Right main cabinet for Stimulants)
    // Runs along Z: X = 3, Z from -4.75 to 2.05 (center Z = -1.35, length 6.8)
    const cab2 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.9, 6.8), cabMat);
    cab2.position.set(3.0, 0.45, -1.35);
    casesGroup.add(cab2);

    const cab2Trim = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.04, 6.82), goldTrimMat);
    cab2Trim.position.set(3.0, 0.88, -1.35);
    casesGroup.add(cab2Trim);

    // Cabinet 3 (Back long cabinet for Hallucinogens behind the partition wall)
    // Runs along X: Z = 4.5, X from -5.0 to 5.0 (center X = 0, length 10.0)
    const cab3 = new THREE.Mesh(new THREE.BoxGeometry(10.0, 0.9, 0.8), cabMat);
    cab3.position.set(0.0, 0.45, 4.5);
    casesGroup.add(cab3);

    const cab3Trim = new THREE.Mesh(new THREE.BoxGeometry(10.02, 0.04, 0.82), goldTrimMat);
    cab3Trim.position.set(0.0, 0.88, 4.5);
    casesGroup.add(cab3Trim);

    // 3 Premium high-performance spotlights, one for each large collective cabinet
    // This replaces 30 individual physical spotlights to give 60fps butter-smooth rendering
    
    // 1. Left Cabinet Spotlight
    const spotCab1 = new THREE.SpotLight(0xffe0b2, 4.0, 6.0, Math.PI / 4, 0.5, 1);
    spotCab1.position.set(-3.0, 3.9, -1.35);
    const targetCab1 = new THREE.Object3D();
    targetCab1.position.set(-3.0, 0.9, -1.35);
    scene.add(targetCab1);
    spotCab1.target = targetCab1;
    scene.add(spotCab1);

    // 2. Right Cabinet Spotlight
    const spotCab2 = new THREE.SpotLight(0xffe0b2, 4.0, 6.0, Math.PI / 4, 0.5, 1);
    spotCab2.position.set(3.0, 3.9, -1.35);
    const targetCab2 = new THREE.Object3D();
    targetCab2.position.set(3.0, 0.9, -1.35);
    scene.add(targetCab2);
    spotCab2.target = targetCab2;
    scene.add(spotCab2);

    // 3. Back Cabinet Spotlight
    const spotCab3 = new THREE.SpotLight(0xb3e5fc, 5.0, 6.0, Math.PI / 3, 0.5, 1);
    spotCab3.position.set(0.0, 3.9, 4.5);
    const targetCab3 = new THREE.Object3D();
    targetCab3.position.set(0.0, 0.9, 4.5);
    scene.add(targetCab3);
    spotCab3.target = targetCab3;
    scene.add(spotCab3);

    // Loop through each of the active specimens
    exhibits.forEach((ex) => {
      // 1. Ceiling light fixture above the specimen
      const fixtureGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.08, 12);
      const fixtureMat = new THREE.MeshStandardMaterial({ 
        color: 0x1e293b, 
        metalness: 0.9, 
        roughness: 0.1 
      });
      const fixture = new THREE.Mesh(fixtureGeo, fixtureMat);
      fixture.position.set(ex.position.x, 3.95, ex.position.z);
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
      lightCone.position.set(ex.position.x, 2.425, ex.position.z);
      casesGroup.add(lightCone);

      // 3. Individual glass dome over the specimen on the table
      const glassGeo = new THREE.BoxGeometry(0.38, 0.32, 0.38);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.15,
        roughness: 0,
        metalness: 0.1,
        transmission: 0.9,
        ior: 1.4,
        thickness: 0.02,
        side: THREE.DoubleSide
      });
      const glass = new THREE.Mesh(glassGeo, glassMat);
      glass.position.set(ex.position.x, 1.06, ex.position.z);
      casesGroup.add(glass);

      // Specimen Mesh generation
      let specimenMesh;
      const idStr = ex.id.toLowerCase();
      
      if (idStr === "heroin" || idStr === "cocaine") {
        // Zip bag or compressed powder block
        const bagGeo = new THREE.BoxGeometry(0.14, 0.14, 0.03);
        const bagMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.5, transparent: true, opacity: 0.9 });
        specimenMesh = new THREE.Mesh(bagGeo, bagMat);
      } else if (idStr === "meth" || idStr === "lsd") {
        // Crystals / Paper sheets
        const cryGeo = new THREE.OctahedronGeometry(0.06);
        const cryMat = new THREE.MeshPhysicalMaterial({ color: 0x56ccf2, roughness: 0, transmission: 0.6, thickness: 0.2 });
        specimenMesh = new THREE.Mesh(cryGeo, cryMat);
      } else if (idStr === "ecstasy" || idStr === "ritalin" || idStr === "adderall") {
        // Medicine pill
        const pillGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.012, 16);
        const pillMat = new THREE.MeshStandardMaterial({ color: idStr === "ecstasy" ? 0xeb5757 : 0xf2994a, roughness: 0.4 });
        specimenMesh = new THREE.Mesh(pillGeo, pillMat);
        specimenMesh.rotation.x = Math.PI / 2;
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
        specimenMesh = group;
      } else {
        // Fallback: A beautiful general guide crystal sphere representing chemical structures
        const sphereGeo = new THREE.SphereGeometry(0.05, 12, 12);
        const sphereMat = new THREE.MeshPhysicalMaterial({
          color: ex.cabinetId === "cabinet_left" ? 0xeb5757 : ex.cabinetId === "cabinet_right" ? 0xf2994a : 0x2f80ed,
          roughness: 0.1,
          transmission: 0.7,
          thickness: 0.1
        });
        specimenMesh = new THREE.Mesh(sphereGeo, sphereMat);
      }
      
      specimenMesh.position.set(ex.position.x, 1.06, ex.position.z);
      
      // Apply custom model scale factor from admin database
      const scaleVal = ex.scale !== undefined ? ex.scale : 1.0;
      specimenMesh.scale.set(scaleVal, scaleVal, scaleVal);
      
      casesGroup.add(specimenMesh);
      floatingSpecimens.push({ mesh: specimenMesh, initialY: 1.06, id: ex.id });
    });

    scene.add(casesGroup);

    // WALL POSTERS (4 posters)
    const postersGroup = new THREE.Group();
    posters.forEach((post) => {
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
      frame.position.set(post.position.x, post.position.y, post.position.z);
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
      surface.position.x += post.position.x > 0 ? -0.046 : 0.046;
      
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

    // Touch events for mobile screens
    const onTouchStart = (e) => {
      if (e.target !== renderer.domElement) return;
      stateRef.current.mouseDrag = true;
      stateRef.current.prevMouseX = e.touches[0].clientX;
      stateRef.current.prevMouseY = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (!stateRef.current.mouseDrag) return;
      const deltaX = e.touches[0].clientX - stateRef.current.prevMouseX;
      const deltaY = e.touches[0].clientY - stateRef.current.prevMouseY;

      stateRef.current.prevMouseX = e.touches[0].clientX;
      stateRef.current.prevMouseY = e.touches[0].clientY;

      stateRef.current.rotY -= deltaX * 0.005;
      stateRef.current.rotX -= deltaY * 0.005;
      stateRef.current.rotX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, stateRef.current.rotX));
    };

    const onTouchEnd = () => {
      stateRef.current.mouseDrag = false;
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // ANIMATION & INTERACTION LOOP
    let animationFrameId;
    const clock = new THREE.Clock();

    const checkCollisions = (targetX, targetZ) => {
      // Outer boundaries
      if (targetX < -7.5 || targetX > 7.5) return true;
      if (targetZ < -5.5 || targetZ > 5.5) return true;

      // Collision with Table 1 (Left Main Cabinet): X = -3, Z from -4.75 to 2.05
      // Bounds: X from -3.5 to -2.5, Z from -5.25 to 2.55 (adjusted for player radius)
      if (targetX > -3.6 && targetX < -2.4 && targetZ > -5.25 && targetZ < 2.55) return true;

      // Collision with Table 2 (Right Main Cabinet): X = 3, Z from -4.75 to 2.05
      // Bounds: X from 2.4 to 3.6, Z from -5.25 to 2.55
      if (targetX > 2.4 && targetX < 3.6 && targetZ > -5.25 && targetZ < 2.55) return true;

      // Collision with Table 3 (Back Long Cabinet): X from -5.0 to 5.0, Z = 4.5
      // Bounds: X from -5.5 to 5.5, Z from 4.0 to 5.0
      if (targetX > -5.5 && targetX < 5.5 && targetZ > 4.0 && targetZ < 5.0) return true;

      // Collision with Central Partition Wall: Z = 3.0, X from -5.5 to 5.5
      // Thickness is 0.2, so Z bounds: 2.8 to 3.2
      if (targetX > -5.7 && targetX < 5.7 && targetZ > 2.7 && targetZ < 3.3) return true;

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

      // 2. PROCESS WASD CONTROLS
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

      // Check display cases
      exhibits.forEach((ex) => {
        const dx = stateRef.current.posX - ex.position.x;
        const dz = stateRef.current.posZ - ex.position.z;
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

      // Check posters
      posters.forEach((post) => {
        const dx = stateRef.current.posX - post.position.x;
        const dz = stateRef.current.posZ - post.position.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist < 1.8) {
          minDistance = dist;
          closestElement = {
            type: "exhibit", // Trigger detailed view on the side
            id: activeExhibit?.id, // Keep the active exhibit or trigger poster context
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

      {/* Basic instruction hints */}
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
    </div>
  );
}
