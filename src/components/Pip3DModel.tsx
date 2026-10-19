import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RotateCcw, ZoomIn, ZoomOut, Play, Pause, Sparkles, Lightbulb, Moon, Smile } from 'lucide-react';
import { playMagicChime, playUiChime } from '../utils/soundEffects';
import { awardStardust } from '../utils/visitorMemory';

interface Pip3DModelProps {
  isMuted?: boolean;
  className?: string;
  onInteract?: (action: string) => void;
}

export const Pip3DModel: React.FC<Pip3DModelProps> = ({
  isMuted = false,
  className = '',
  onInteract,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [lanternActive, setLanternActive] = useState(true);
  const [interactionToast, setInteractionToast] = useState<string | null>(null);
  const [currentAction, setCurrentAction] = useState<string>('floating');

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const pipGroupRef = useRef<THREE.Group | null>(null);
  const lanternLightRef = useRef<THREE.PointLight | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const eyesRef = useRef<{ left: THREE.Mesh; right: THREE.Mesh } | null>(null);
  const cloudsRef = useRef<THREE.Group | null>(null);

  // Interaction tracking state
  const isDraggingRef = useRef(false);
  const previousPointerPositionRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const zoomLevelRef = useRef(3.8);
  const animationFrameIdRef = useRef<number | null>(null);
  const bounceTimeRef = useRef(0);
  const isBouncingRef = useRef(false);
  const isSpinningRef = useRef(false);
  const spinAngleRef = useRef(0);
  const autoRotateRef = useRef(true);

  // Sync autoRotate state to ref
  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  const triggerToast = useCallback((msg: string) => {
    setInteractionToast(msg);
    setTimeout(() => {
      setInteractionToast((prev) => (prev === msg ? null : prev));
    }, 2800);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect headless test environments
    const isHeadless =
      typeof navigator !== 'undefined' &&
      (navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent));

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 380;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.4, zoomLevelRef.current);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isHeadless,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    // Clear previous children
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. Lighting setup
    const ambientLight = new THREE.AmbientLight(0xfef5ed, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff0db, 1.4);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xcca4e3, 0.8);
    rimLight.position.set(-3, -2, -2);
    scene.add(rimLight);

    // Warm point light for Pip's lantern
    const lanternPointLight = new THREE.PointLight(0xf5c96a, 2.4, 4);
    lanternPointLight.position.set(0.65, 0.1, 0.5);
    scene.add(lanternPointLight);
    lanternLightRef.current = lanternPointLight;

    // 5. Build Pip 3D Character Group
    const pipGroup = new THREE.Group();
    scene.add(pipGroup);
    pipGroupRef.current = pipGroup;

    // Material palette
    const skullBoneMaterial = new THREE.MeshStandardMaterial({
      color: 0xfdfaf7,
      roughness: 0.35,
      metalness: 0.05,
    });

    const eyeSocketMaterial = new THREE.MeshStandardMaterial({
      color: 0x221a29,
      roughness: 0.8,
    });

    const eyeGlowMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5c96a,
      emissive: 0xf5c96a,
      emissiveIntensity: 0.9,
      roughness: 0.2,
    });

    const nightcapMaterial = new THREE.MeshStandardMaterial({
      color: 0x241d3b,
      roughness: 0.6,
      metalness: 0.1,
    });

    const bowMaterial = new THREE.MeshStandardMaterial({
      color: 0xeba4b9,
      roughness: 0.4,
      metalness: 0.15,
    });

    const goldStarMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5c96a,
      metalness: 0.6,
      roughness: 0.3,
      emissive: 0xd49b28,
      emissiveIntensity: 0.3,
    });

    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.8,
      roughness: 0.25,
    });

    const cloudMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.9,
      metalness: 0.0,
      transparent: true,
      opacity: 0.88,
    });

    // A. Pip's Head (Cute, rounded cranial skull baby shape)
    const craniumGeo = new THREE.SphereGeometry(0.55, 32, 32);
    craniumGeo.scale(1.0, 1.05, 0.95);
    const cranium = new THREE.Mesh(craniumGeo, skullBoneMaterial);
    cranium.position.y = 0.55;
    pipGroup.add(cranium);

    // Cheek chubbiness
    const leftCheekGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const leftCheek = new THREE.Mesh(leftCheekGeo, skullBoneMaterial);
    leftCheek.position.set(-0.28, 0.42, 0.25);
    pipGroup.add(leftCheek);

    const rightCheek = leftCheek.clone();
    rightCheek.position.x = 0.28;
    pipGroup.add(rightCheek);

    // Jaw / Chin
    const chinGeo = new THREE.SphereGeometry(0.26, 16, 16);
    chinGeo.scale(1.1, 0.7, 0.9);
    const chin = new THREE.Mesh(chinGeo, skullBoneMaterial);
    chin.position.set(0, 0.22, 0.24);
    pipGroup.add(chin);

    // B. Eye Sockets & Glowing Amber Pupils
    const socketGeo = new THREE.CylinderGeometry(0.14, 0.12, 0.12, 24);
    socketGeo.rotateX(Math.PI / 2);

    const leftSocket = new THREE.Mesh(socketGeo, eyeSocketMaterial);
    leftSocket.position.set(-0.22, 0.58, 0.44);
    pipGroup.add(leftSocket);

    const rightSocket = new THREE.Mesh(socketGeo, eyeSocketMaterial);
    rightSocket.position.set(0.22, 0.58, 0.44);
    pipGroup.add(rightSocket);

    // Glowing Amber Pupils
    const pupilGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const leftPupil = new THREE.Mesh(pupilGeo, eyeGlowMaterial);
    leftPupil.position.set(-0.22, 0.58, 0.49);
    pipGroup.add(leftPupil);

    const rightPupil = new THREE.Mesh(pupilGeo, eyeGlowMaterial);
    rightPupil.position.set(0.22, 0.58, 0.49);
    pipGroup.add(rightPupil);
    eyesRef.current = { left: leftPupil, right: rightPupil };

    // Gentle curved mouth (subtle arch)
    const smileCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.12, 0.34, 0.47),
      new THREE.Vector3(0, 0.30, 0.49),
      new THREE.Vector3(0.12, 0.34, 0.47)
    );
    const smileGeo = new THREE.TubeGeometry(smileCurve, 16, 0.016, 8, false);
    const smileMesh = new THREE.Mesh(smileGeo, eyeSocketMaterial);
    pipGroup.add(smileMesh);

    // C. Nightcap (Floppy conical bedtime hat draped to the side)
    const capCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.95, 0),
      new THREE.Vector3(0.12, 1.25, -0.05),
      new THREE.Vector3(0.35, 1.35, -0.15),
      new THREE.Vector3(0.55, 1.15, -0.2),
      new THREE.Vector3(0.62, 0.85, -0.18),
    ]);
    const capGeo = new THREE.TubeGeometry(capCurve, 32, 0.34, 16, false);
    const capMesh = new THREE.Mesh(capGeo, nightcapMaterial);
    pipGroup.add(capMesh);

    // White fur brim around nightcap base
    const brimGeo = new THREE.TorusGeometry(0.48, 0.07, 12, 32);
    brimGeo.rotateX(Math.PI / 2.3);
    const brimMesh = new THREE.Mesh(brimGeo, skullBoneMaterial);
    brimMesh.position.set(0.04, 0.95, 0.02);
    pipGroup.add(brimMesh);

    // Pink bow at the side of nightcap
    const bowKnotGeo = new THREE.SphereGeometry(0.07, 12, 12);
    const bowKnot = new THREE.Mesh(bowKnotGeo, bowMaterial);
    bowKnot.position.set(0.38, 0.95, 0.32);
    pipGroup.add(bowKnot);

    const bowWingGeo = new THREE.ConeGeometry(0.11, 0.18, 12);
    bowWingGeo.rotateZ(Math.PI / 2);
    const leftWing = new THREE.Mesh(bowWingGeo, bowMaterial);
    leftWing.position.set(0.28, 0.95, 0.32);
    pipGroup.add(leftWing);

    const rightWing = leftWing.clone();
    rightWing.rotation.z = -Math.PI / 2;
    rightWing.position.x = 0.48;
    pipGroup.add(rightWing);

    // Pom-pom at cap tip
    const pomGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const pomMesh = new THREE.Mesh(pomGeo, skullBoneMaterial);
    pomMesh.position.set(0.62, 0.82, -0.18);
    pipGroup.add(pomMesh);

    // Mini stars studded on the cap
    const starGeo = new THREE.OctahedronGeometry(0.045, 0);
    const starPositions = [
      [0.08, 1.15, 0.22],
      [-0.14, 1.05, 0.28],
      [0.26, 1.25, 0.05],
      [0.45, 1.20, -0.08],
    ];
    starPositions.forEach(([x, y, z]) => {
      const star = new THREE.Mesh(starGeo, goldStarMaterial);
      star.position.set(x, y, z);
      pipGroup.add(star);
    });

    // D. Starry Cape / Body
    const bodyGeo = new THREE.ConeGeometry(0.46, 0.65, 24);
    bodyGeo.rotateX(Math.PI);
    const bodyMesh = new THREE.Mesh(bodyGeo, nightcapMaterial);
    bodyMesh.position.set(0, 0.05, 0);
    pipGroup.add(bodyMesh);

    // E. Crescent Starlight Lantern held in hand
    const lanternGroup = new THREE.Group();
    lanternGroup.position.set(0.65, 0.15, 0.45);

    // Brass frame
    const lanternCapGeo = new THREE.CylinderGeometry(0.04, 0.12, 0.08, 12);
    const lanternCap = new THREE.Mesh(lanternCapGeo, brassMaterial);
    lanternGroup.add(lanternCap);

    // Glass cylinder
    const glassGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.18, 16);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      transmission: 0.85,
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    glassMesh.position.y = -0.12;
    lanternGroup.add(glassMesh);

    // Glowing core star inside lantern
    const coreStarGeo = new THREE.OctahedronGeometry(0.05, 0);
    const coreStar = new THREE.Mesh(coreStarGeo, goldStarMaterial);
    coreStar.position.y = -0.12;
    lanternGroup.add(coreStar);

    // Brass base
    const baseGeo = new THREE.CylinderGeometry(0.11, 0.08, 0.06, 12);
    const baseMesh = new THREE.Mesh(baseGeo, brassMaterial);
    baseMesh.position.y = -0.24;
    lanternGroup.add(baseMesh);

    // Little arm holding lantern
    const armGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.35, 12);
    armGeo.rotateZ(-Math.PI / 3);
    const armMesh = new THREE.Mesh(armGeo, nightcapMaterial);
    armMesh.position.set(0.38, 0.22, 0.2);
    pipGroup.add(armMesh);
    pipGroup.add(lanternGroup);

    // F. Fluffy Dream Cloud Base
    const cloudsGroup = new THREE.Group();
    cloudsGroup.position.y = -0.35;
    const cloudSpheres = [
      { r: 0.38, x: 0, y: 0, z: 0 },
      { r: 0.32, x: -0.35, y: -0.05, z: 0.1 },
      { r: 0.30, x: 0.35, y: -0.05, z: -0.05 },
      { r: 0.26, x: 0.15, y: 0.05, z: 0.3 },
      { r: 0.28, x: -0.2, y: -0.02, z: -0.25 },
      { r: 0.24, x: 0.4, y: -0.08, z: 0.2 },
    ];
    cloudSpheres.forEach(({ r, x, y, z }) => {
      const spGeo = new THREE.SphereGeometry(r, 16, 16);
      const sp = new THREE.Mesh(spGeo, cloudMaterial);
      sp.position.set(x, y, z);
      cloudsGroup.add(sp);
    });
    pipGroup.add(cloudsGroup);
    cloudsRef.current = cloudsGroup;

    // G. Floating Stardust Particles
    const particleCount = isHeadless ? 20 : 60;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 0.8 + Math.random() * 1.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      particlePos[i] = radius * Math.cos(theta) * Math.cos(phi);
      particlePos[i + 1] = 0.2 + radius * Math.sin(phi);
      particlePos[i + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xf5c96a,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 6. Animation Loop
    let lastTime = performance.now();
    let clockTime = 0;

    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      clockTime += delta;

      // Handle spinning action
      if (isSpinningRef.current && pipGroupRef.current) {
        spinAngleRef.current += delta * 9;
        pipGroupRef.current.rotation.y = spinAngleRef.current;
        if (spinAngleRef.current >= Math.PI * 4) {
          isSpinningRef.current = false;
          spinAngleRef.current = 0;
          setCurrentAction('floating');
        }
      } else if (autoRotateRef.current && !isDraggingRef.current && pipGroupRef.current) {
        pipGroupRef.current.rotation.y += delta * 0.45;
      } else if (pipGroupRef.current) {
        // Smoothly interpolate towards target rotation when user drags
        pipGroupRef.current.rotation.y +=
          (targetRotationRef.current.y - pipGroupRef.current.rotation.y) * 0.12;
        pipGroupRef.current.rotation.x +=
          (targetRotationRef.current.x - pipGroupRef.current.rotation.x) * 0.12;
      }

      // Gentle floating hover
      if (pipGroupRef.current) {
        let hoverY = Math.sin(clockTime * 1.8) * 0.08;

        // Bounce action addition
        if (isBouncingRef.current) {
          bounceTimeRef.current += delta * 5.5;
          const bounceOffset = Math.sin(bounceTimeRef.current) * 0.28;
          if (bounceOffset < 0) {
            isBouncingRef.current = false;
            bounceTimeRef.current = 0;
            setCurrentAction('floating');
          } else {
            hoverY += bounceOffset;
          }
        }

        pipGroupRef.current.position.y = hoverY;
      }

      // Cloud soft breathing pulse
      if (cloudsRef.current) {
        const cloudScale = 1 + Math.sin(clockTime * 2.2) * 0.035;
        cloudsRef.current.scale.set(cloudScale, cloudScale, cloudScale);
      }

      // Rotate stardust particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y -= delta * 0.15;
      }

      // Lantern glow flicker
      if (lanternLightRef.current) {
        lanternLightRef.current.intensity = 2.2 + Math.sin(clockTime * 4.5) * 0.35;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      // Dispose materials & geometries
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
    };
  }, []);

  // Pointer drag to rotate handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    previousPointerPositionRef.current = { x: e.clientX, y: e.clientY };
    if (pipGroupRef.current) {
      targetRotationRef.current = {
        x: pipGroupRef.current.rotation.x,
        y: pipGroupRef.current.rotation.y,
      };
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !pipGroupRef.current) return;

    const deltaX = e.clientX - previousPointerPositionRef.current.x;
    const deltaY = e.clientY - previousPointerPositionRef.current.y;

    targetRotationRef.current.y += deltaX * 0.008;
    targetRotationRef.current.x = Math.max(
      -0.4,
      Math.min(0.4, targetRotationRef.current.x + deltaY * 0.006)
    );

    previousPointerPositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Zoom handlers
  const handleZoom = (direction: 'in' | 'out') => {
    playUiChime(isMuted);
    if (!cameraRef.current) return;
    const current = zoomLevelRef.current;
    const next = direction === 'in' ? Math.max(2.4, current - 0.45) : Math.min(5.5, current + 0.45);
    zoomLevelRef.current = next;
    cameraRef.current.position.z = next;
  };

  const handleResetCamera = () => {
    playUiChime(isMuted);
    zoomLevelRef.current = 3.8;
    targetRotationRef.current = { x: 0, y: 0 };
    if (cameraRef.current) cameraRef.current.position.set(0, 0.4, 3.8);
    if (pipGroupRef.current) pipGroupRef.current.rotation.set(0, 0, 0);
    triggerToast('Camera reset to front view');
  };

  // Interactive Actions
  const handleBounce = () => {
    playMagicChime(isMuted);
    isBouncingRef.current = true;
    bounceTimeRef.current = 0;
    setCurrentAction('bouncing');
    awardStardust(2);
    triggerToast("Pip hops joyfully! +2 Stardust ✨");
    if (onInteract) onInteract('bounce');
  };

  const handleSpin = () => {
    playMagicChime(isMuted);
    isSpinningRef.current = true;
    spinAngleRef.current = pipGroupRef.current ? pipGroupRef.current.rotation.y : 0;
    setCurrentAction('spinning');
    awardStardust(3);
    triggerToast("Pip performs a 360° Starlight Pirouette! +3 Stardust 🌟");
    if (onInteract) onInteract('spin');
  };

  const toggleLantern = () => {
    playUiChime(isMuted);
    setLanternActive((prev) => {
      const next = !prev;
      if (lanternLightRef.current) {
        lanternLightRef.current.color.setHex(next ? 0xf5c96a : 0x99e1d9);
        lanternLightRef.current.intensity = next ? 2.4 : 1.2;
      }
      triggerToast(next ? 'Lantern lit with warm honey starlight 🏮' : 'Lantern shifted to calm twilight cyan 🌙');
      return next;
    });
  };

  const handleSleepyNod = () => {
    playUiChime(isMuted);
    if (pipGroupRef.current) {
      targetRotationRef.current.x = 0.28;
      setTimeout(() => {
        targetRotationRef.current.x = 0;
      }, 1200);
    }
    triggerToast("Pip gives a sleepy bedtime nod... 'zzZ' 💤");
    if (onInteract) onInteract('nod');
  };

  return (
    <div
      className={`relative rounded-3xl bg-gradient-to-b from-[#fbf5ee] via-[#f7ebdc] to-[#efe0cc] dark:from-[#251e3a] dark:via-[#1e1830] dark:to-[#171226] border border-[#f0dfcf] dark:border-[#43395c] shadow-xl overflow-hidden flex flex-col ${className}`}
      data-testid="pip-3d-model-container"
    >
      {/* 3D Canvas Viewport */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="w-full aspect-square sm:aspect-[4/3] max-h-[460px] cursor-grab active:cursor-grabbing select-none relative"
        aria-label="Interactive 3D model of Pip the Junior Dream Engineer. Drag to rotate 360 degrees."
        role="region"
      >
        {/* Floating action feedback toast */}
        {interactionToast && (
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1.5 rounded-full bg-[#402c25]/90 dark:bg-[#302847]/95 text-[#fcf8f2] text-xs font-medium shadow-lg backdrop-blur-md border border-[#f5c96a]/30 animate-in fade-in zoom-in-95 pointer-events-none"
            role="status"
          >
            {interactionToast}
          </div>
        )}

        {/* 3D Drag Hint Overlay */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 dark:bg-[#201d39]/80 backdrop-blur-xs text-[11px] font-mono text-[#6e544b] dark:text-[#dcd2ea] border border-[#f0dfcf] dark:border-[#43395c] pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Drag to Orbit 360°</span>
        </div>

        {/* Floating Zoom & Camera Controls */}
        <div className="absolute left-3 bottom-3 z-10 flex flex-col gap-1.5 bg-white/85 dark:bg-[#201d39]/85 backdrop-blur-xs p-1.5 rounded-2xl border border-[#f0dfcf] dark:border-[#43395c] shadow-xs">
          <button
            onClick={() => handleZoom('in')}
            aria-label="Zoom in on 3D Pip"
            className="p-1.5 rounded-xl hover:bg-[#f4d7df]/50 dark:hover:bg-[#302847] text-[#5c4033] dark:text-[#fcf8f2] transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleZoom('out')}
            aria-label="Zoom out from 3D Pip"
            className="p-1.5 rounded-xl hover:bg-[#f4d7df]/50 dark:hover:bg-[#302847] text-[#5c4033] dark:text-[#fcf8f2] transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetCamera}
            aria-label="Reset camera view"
            className="p-1.5 rounded-xl hover:bg-[#f4d7df]/50 dark:hover:bg-[#302847] text-[#5c4033] dark:text-[#fcf8f2] transition-colors cursor-pointer"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            aria-label={autoRotate ? 'Pause auto-rotation' : 'Start auto-rotation'}
            className="p-1.5 rounded-xl hover:bg-[#f4d7df]/50 dark:hover:bg-[#302847] text-[#5c4033] dark:text-[#fcf8f2] transition-colors cursor-pointer"
            title={autoRotate ? 'Pause Orbit' : 'Auto Orbit'}
          >
            {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Interactive Controls & Character Action Buttons */}
      <div className="p-4 sm:p-5 bg-white/80 dark:bg-[#201d39]/90 border-t border-[#f0dfcf] dark:border-[#43395c] flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs font-semibold text-[#5c4033] dark:text-[#fcf8f2]">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#f5c96a]" />
            <span>Interactive Pip Actions:</span>
          </span>
          <span className="text-[11px] font-mono text-[#9c8278] dark:text-[#a69bb8]">
            WebGL · Real-time Three.js
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={handleBounce}
            aria-label="Make Pip hop and bounce"
            className="px-3 py-2.5 rounded-xl text-xs font-semibold bg-[#fff8f1] dark:bg-[#2c2444] border border-[#f0dfcf] dark:border-[#43395c] hover:border-[#a34063] dark:hover:border-[#f5c96a] text-[#402c25] dark:text-[#fcf8f2] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Smile className="w-3.5 h-3.5 text-[#dba7b9]" />
            <span>Hop & Cheer</span>
          </button>

          <button
            onClick={handleSpin}
            aria-label="Make Pip spin in 360 degrees"
            className="px-3 py-2.5 rounded-xl text-xs font-semibold bg-[#fff8f1] dark:bg-[#2c2444] border border-[#f0dfcf] dark:border-[#43395c] hover:border-[#a34063] dark:hover:border-[#f5c96a] text-[#402c25] dark:text-[#fcf8f2] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#f5c96a]" />
            <span>Star Pirouette</span>
          </button>

          <button
            onClick={toggleLantern}
            aria-label="Toggle lantern light color"
            className="px-3 py-2.5 rounded-xl text-xs font-semibold bg-[#fff8f1] dark:bg-[#2c2444] border border-[#f0dfcf] dark:border-[#43395c] hover:border-[#a34063] dark:hover:border-[#f5c96a] text-[#402c25] dark:text-[#fcf8f2] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Lightbulb className={`w-3.5 h-3.5 ${lanternActive ? 'text-[#f5c96a]' : 'text-[#99e1d9]'}`} />
            <span>{lanternActive ? 'Warm Honey' : 'Twilight Blue'}</span>
          </button>

          <button
            onClick={handleSleepyNod}
            aria-label="Make Pip nod sleepily"
            className="px-3 py-2.5 rounded-xl text-xs font-semibold bg-[#fff8f1] dark:bg-[#2c2444] border border-[#f0dfcf] dark:border-[#43395c] hover:border-[#a34063] dark:hover:border-[#f5c96a] text-[#402c25] dark:text-[#fcf8f2] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Moon className="w-3.5 h-3.5 text-[#c7b6df]" />
            <span>Sleepy Nod</span>
          </button>
        </div>
      </div>
    </div>
  );
};
