import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useMousePosition } from '../hooks/useMousePosition';

export default function Interactive3DBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { mouse, speed, ripples } = useMousePosition();
  const [webglSupported, setWebglSupported] = useState(true);

  // Sharing values with the animation loop
  const mouseRef = useRef({ x: 0, y: 0 });
  const speedRef = useRef(0);
  const scrollRef = useRef(0);
  const clickRipplesRef = useRef<{ x: number; y: number; radius: number; maxRadius: number; strength: number; age: number }[]>([]);

  // Track cursor path coordinates
  const pathPointsRef = useRef<{ x: number; y: number; z: number; time: number }[]>([]);

  // Update refs on change
  useEffect(() => {
    mouseRef.current = mouse;
    speedRef.current = speed;
  }, [mouse, speed]);

  // Handle incoming clicks from ripples
  useEffect(() => {
    if (ripples.length > 0) {
      const last = ripples[ripples.length - 1];
      // Convert normalized screen coord (-1 to 1) to rough 3D coords
      const rx = last.normalizedX * 10;
      const ry = last.normalizedY * 6;
      clickRipplesRef.current.push({
        x: rx,
        y: ry,
        radius: 0.1,
        maxRadius: 8.0,
        strength: 0.8,
        age: 0
      });
    }
  }, [ripples]);

  // Track scroll position for depth effects
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      scrollRef.current = scrollPercent;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Main 3D render logic
  useEffect(() => {
    if (!containerRef.current) return;

    // Detect WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch (e) {
      setWebglSupported(false);
      return;
    }

    // Performance adaptation
    const isMobile = window.innerWidth < 768;
    const isLowPower = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Node counts
    const networkCount = isMobile ? 50 : isLowPower ? 60 : 130;
    const dustCount = isMobile ? 60 : isLowPower ? 50 : 150;

    // Setup Scene, Perspective Camera, and WebGLRenderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020205, 0.05);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Dynamic Network Particles
    const networkGeometry = new THREE.BufferGeometry();
    const networkPositions = new Float32Array(networkCount * 3);
    const networkVelocities = new Float32Array(networkCount * 3);
    const networkAnchors = new Float32Array(networkCount * 3); // Rest positions
    const networkPhases = new Float32Array(networkCount); // Sine wave phase differences

    // Initialize network particles
    for (let i = 0; i < networkCount; i++) {
      const x = (Math.random() - 0.5) * 24;
      const y = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 8 - 1;

      networkPositions[i * 3] = x;
      networkPositions[i * 3 + 1] = y;
      networkPositions[i * 3 + 2] = z;

      networkAnchors[i * 3] = x;
      networkAnchors[i * 3 + 1] = y;
      networkAnchors[i * 3 + 2] = z;

      networkVelocities[i * 3] = (Math.random() - 0.5) * 0.02;
      networkVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      networkVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;

      networkPhases[i] = Math.random() * Math.PI * 2;
    }

    networkGeometry.setAttribute('position', new THREE.BufferAttribute(networkPositions, 3));

    // Material for network particle nodes
    const nodeTexture = createCircleTexture();
    const networkMaterial = new THREE.PointsMaterial({
      color: 0x06b6d4, // Cyan glow
      size: isMobile ? 0.22 : 0.16,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: nodeTexture,
    });

    const networkSystem = new THREE.Points(networkGeometry, networkMaterial);
    scene.add(networkSystem);

    // Floating Ambient Dust Particles (for background depth)
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustSpeeds = new Float32Array(dustCount);

    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 32;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 5; // Further back
      dustSpeeds[i] = Math.random() * 0.005 + 0.002;
    }

    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({
      color: 0x8b5cf6, // Violet
      size: 0.08,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dustSystem = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustSystem);

    // Glowing Connection Lines Setup
    // Maximum possible connections = nodes * (nodes - 1) / 2
    // We construct a dynamic LineSegments mesh
    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      linewidth: 1, // WebGL specification limitation dictates 1px anyways
      depthWrite: false,
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 1.5, 15);
    blueLight.position.set(-6, 4, 3);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 1.5, 15);
    cyanLight.position.set(6, -4, 3);
    scene.add(cyanLight);

    // Track state smoothly
    let currentMouseX = 0;
    let currentMouseY = 0;
    let time = 0;
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Delta speed and clock increment
      const speedVal = speedRef.current;
      const speedExcitation = Math.min(speedVal * 0.12, 0.8);
      time += 0.008 + speedExcitation * 0.01;

      // Smooth mouse coordinate target tracking
      const targetMouseX = mouseRef.current.x;
      const targetMouseY = mouseRef.current.y;
      currentMouseX += (targetMouseX - currentMouseX) * 0.06;
      currentMouseY += (targetMouseY - currentMouseY) * 0.06;

      // Track cursor path (Coordinate path tracing)
      const cursorX3D = currentMouseX * 10;
      const cursorY3D = currentMouseY * 6;
      const cursorZ3D = 0;

      if (!isLowPower) {
        // Record path coordinate
        pathPointsRef.current.push({
          x: cursorX3D,
          y: cursorY3D,
          z: cursorZ3D,
          time: Date.now()
        });

        // Limit trail length based on speed (longer trails when moving fast)
        const maxTrailLength = isMobile ? 8 : 25 + Math.floor(speedVal * 5);
        if (pathPointsRef.current.length > maxTrailLength) {
          pathPointsRef.current.shift();
        }

        // Clean up points older than 1.5 seconds
        const now = Date.now();
        pathPointsRef.current = pathPointsRef.current.filter(p => now - p.time < 1500);
      }

      // Parallax zoom based on page scroll
      const scrollPercent = scrollRef.current;
      const cameraZTarget = 12 - scrollPercent * 4.5;
      camera.position.z += (cameraZTarget - camera.position.z) * 0.05;

      // Camera parallax movement
      camera.position.x = currentMouseX * 1.6;
      camera.position.y = currentMouseY * 1.0;
      camera.lookAt(0, 0, -2);
      camera.rotation.z = currentMouseX * -0.04;

      // Update lights position relative to mouse
      cyanLight.position.x = 6 + currentMouseX * 3;
      cyanLight.position.y = -4 + currentMouseY * 3;

      // Update ambient dust (downward drift)
      const dustPosAttr = dustGeometry.getAttribute('position') as THREE.BufferAttribute;
      const dustArr = dustPosAttr.array as Float32Array;
      for (let i = 0; i < dustCount; i++) {
        const idx3 = i * 3;
        dustArr[idx3 + 1] -= dustSpeeds[i] * (1.0 + speedVal * 0.5); // Drift down faster
        dustArr[idx3] += Math.sin(time * 0.5 + i) * 0.003; // Drift slightly left/right

        // Wrap around boundary
        if (dustArr[idx3 + 1] < -12) {
          dustArr[idx3 + 1] = 12;
          dustArr[idx3] = (Math.random() - 0.5) * 32;
        }
      }
      dustPosAttr.needsUpdate = true;

      // Process Click Ripples
      clickRipplesRef.current.forEach((ripple) => {
        ripple.age += 0.016;
        ripple.radius = ripple.age * 9.0; // Ripple expanding speed
        ripple.strength = (1.0 - ripple.radius / ripple.maxRadius) * 1.2;
      });
      // Remove dead ripples
      clickRipplesRef.current = clickRipplesRef.current.filter(r => r.radius < r.maxRadius);

      // --- Quadrant Interpolation Weight Calculations ---
      // Mouse ranges from -1 to 1.
      // Top-Left (x < 0, y > 0), Top-Right (x > 0, y > 0)
      // Bottom-Left (x < 0, y < 0), Bottom-Right (x > 0, y < 0)
      const mx = currentMouseX;
      const my = currentMouseY;

      const wTL = Math.max(0, -mx) * Math.max(0, my);
      const wTR = Math.max(0, mx) * Math.max(0, my);
      const wBL = Math.max(0, -mx) * Math.max(0, -my);
      const wBR = Math.max(0, mx) * Math.max(0, -my);
      
      // Center magnetic strength (strongest when mouse is near center (0,0))
      const centerDist = Math.sqrt(mx * mx + my * my);
      const wC = Math.max(0, 1.0 - centerDist);

      // Normalize weights
      const totalWeight = wTL + wTR + wBL + wBR + wC || 1;
      const fTL = wTL / totalWeight;
      const fTR = wTR / totalWeight;
      const fBL = wBL / totalWeight;
      const fBR = wBR / totalWeight;
      const fC = wC / totalWeight;

      // Update Network Positions based on Blended Algorithms
      const netPosAttr = networkGeometry.getAttribute('position') as THREE.BufferAttribute;
      const netArr = netPosAttr.array as Float32Array;

      for (let i = 0; i < networkCount; i++) {
        const i3 = i * 3;
        const phase = networkPhases[i];
        
        // Base coordinate (anchor coordinate)
        const ax = networkAnchors[i3];
        const ay = networkAnchors[i3 + 1];
        const az = networkAnchors[i3 + 2];

        // 1. TOP-LEFT: TRIANGULAR / POLYGON formations
        // Anchor particles to localized small groups (triangles)
        const triIdx = Math.floor(i / 3) * 3;
        const triCentroidX = (networkAnchors[triIdx * 3] + networkAnchors[((triIdx + 1) % networkCount) * 3] + networkAnchors[((triIdx + 2) % networkCount) * 3]) / 3;
        const triCentroidY = (networkAnchors[triIdx * 3 + 1] + networkAnchors[((triIdx + 1) % networkCount) * 3 + 1] + networkAnchors[((triIdx + 2) % networkCount) * 3 + 1]) / 3;
        const triCentroidZ = (networkAnchors[triIdx * 3 + 2] + networkAnchors[((triIdx + 1) % networkCount) * 3 + 2] + networkAnchors[((triIdx + 2) % networkCount) * 3 + 2]) / 3;

        // Rotation around triangle centroid
        const radius = 1.8;
        const angle = time * 0.6 + phase;
        const targetX_TL = triCentroidX + Math.cos(angle) * radius;
        const targetY_TL = triCentroidY + Math.sin(angle) * radius;
        const targetZ_TL = triCentroidZ + Math.sin(angle * 0.5) * 0.5;

        // 2. TOP-RIGHT: ORBITAL formations
        // Particles orbit circular orbits around coordinates (5, 3, -1) and (-5, -3, -1)
        const isOrbitGroupA = i % 2 === 0;
        const focusX = isOrbitGroupA ? 5 : -5;
        const focusY = isOrbitGroupA ? 3 : -3;
        const orbitRadius = 2.0 + (i % 6) * 1.2;
        const orbitAngle = time * (0.4 + (i % 3) * 0.1) + phase;
        const targetX_TR = focusX + Math.cos(orbitAngle) * orbitRadius;
        const targetY_TR = focusY + Math.sin(orbitAngle) * orbitRadius;
        const targetZ_TR = -2 + Math.sin(orbitAngle * 0.7) * 0.8;

        // 3. CENTER: MAGNETIC (gravity center at cursor)
        // Gently pool toward exact mouse cursor coordinate
        const magneticDx = cursorX3D - ax;
        const magneticDy = cursorY3D - ay;
        const magneticDist = Math.sqrt(magneticDx * magneticDx + magneticDy * magneticDy) || 1;
        const magStrength = Math.min(3.5 / magneticDist, 1.2);
        const targetX_C = ax + (magneticDx / magneticDist) * magStrength * 2.5;
        const targetY_C = ay + (magneticDy / magneticDist) * magStrength * 2.5;
        const targetZ_C = az;

        // 4. BOTTOM-LEFT: DIGITAL WAVES / Neural sheets
        // Standard grid flow layout modeled by wavy heights
        const targetX_BL = ax + Math.sin(time * 0.8 + ay) * 0.6;
        const targetY_BL = ay + Math.cos(time * 0.6 + ax) * 0.6;
        const targetZ_BL = az + Math.sin(time + ax * 0.5 + ay * 0.5) * 2.2;

        // 5. BOTTOM-RIGHT: VORTEX / SPIRAL
        // Swirl around coordinate (3, -3) with outward spiraling heights
        const vx = 3;
        const vy = -3;
        const dxV = ax - vx;
        const dyV = ay - vy;
        const distV = Math.sqrt(dxV * dxV + dyV * dyV) || 1;
        const baseAngle = Math.atan2(dyV, dxV);
        const vortexAngle = baseAngle + time * (1.5 / (distV + 1.0)); // Farther rotates slower
        const targetX_BR = vx + Math.cos(vortexAngle) * distV;
        const targetY_BR = vy + Math.sin(vortexAngle) * distV;
        const targetZ_BR = az + Math.sin(time + distV) * 0.8;

        // Blended Target Position
        const blendX = targetX_TL * fTL + targetX_TR * fTR + targetX_C * fC + targetX_BL * fBL + targetX_BR * fBR;
        const blendY = targetY_TL * fTL + targetY_TR * fTR + targetY_C * fC + targetY_BL * fBL + targetY_BR * fBR;
        const blendZ = targetZ_TL * fTL + targetZ_TR * fTR + targetZ_C * fC + targetZ_BL * fBL + targetZ_BR * fBR;

        // Smoothly interpolate current positions toward blended target positions
        netArr[i3] += (blendX - netArr[i3]) * 0.08;
        netArr[i3 + 1] += (blendY - netArr[i3 + 1]) * 0.08;
        netArr[i3 + 2] += (blendZ - netArr[i3 + 2]) * 0.08;

        // Speed reaction (excites coordinates with a tiny micro-vibration wobble)
        if (speedVal > 1.2) {
          const jitter = (speedVal - 1.2) * 0.015;
          netArr[i3] += (Math.random() - 0.5) * jitter;
          netArr[i3 + 1] += (Math.random() - 0.5) * jitter;
          netArr[i3 + 2] += (Math.random() - 0.5) * jitter;
        }

        // Apply Click Ripples Physics
        clickRipplesRef.current.forEach((rip) => {
          const rdx = netArr[i3] - rip.x;
          const rdy = netArr[i3 + 1] - rip.y;
          const rdist = Math.sqrt(rdx * rdx + rdy * rdy) || 0.1;
          const thickness = 1.2;

          if (Math.abs(rdist - rip.radius) < thickness) {
            const pushFactor = (1.0 - Math.abs(rdist - rip.radius) / thickness) * rip.strength * 0.4;
            netArr[i3] += (rdx / rdist) * pushFactor;
            netArr[i3 + 1] += (rdy / rdist) * pushFactor;
          }
        });

        // Cursor Path Tracing Pull
        // Pull particles slightly toward the cursor path trail points
        if (pathPointsRef.current.length > 0 && !isLowPower) {
          const pathPoints = pathPointsRef.current;
          let minDistance = 999;
          let closestPoint = pathPoints[0];

          // Find closest point along cursor path
          for (let pIdx = 0; pIdx < pathPoints.length; pIdx += 2) { // Step by 2 to keep calculations efficient
            const pt = pathPoints[pIdx];
            if (!pt) continue;
            const pdx = netArr[i3] - pt.x;
            const pdy = netArr[i3 + 1] - pt.y;
            const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
            if (pdist < minDistance) {
              minDistance = pdist;
              closestPoint = pt;
            }
          }

          // If close, draw particles slightly toward that part of the path
          if (minDistance < 2.5) {
            const pathAge = (Date.now() - closestPoint.time) / 1500; // Normalized 0 to 1
            const pullForce = (2.5 - minDistance) * (1.0 - pathAge) * 0.015;
            netArr[i3] += (closestPoint.x - netArr[i3]) * pullForce;
            netArr[i3 + 1] += (closestPoint.y - netArr[i3 + 1]) * pullForce;
          }
        }
      }
      netPosAttr.needsUpdate = true;

      // ----------------------------------------------------
      // DRAW CONNECTING NETWORK LINES
      // ----------------------------------------------------
      // To prevent memory allocation during render, we use a single dynamic line mesh
      const existingLines = scene.getObjectByName('interactive_network_lines');
      if (existingLines) scene.remove(existingLines);

      const linePoints: number[] = [];
      const lineColors: number[] = [];
      const maxDistance = isMobile ? 3.0 : 3.8;

      // We combine network particle positions with recent cursor path points!
      // This automatically creates connections along the cursor trail and connects particles to it!
      const activePathPoints = pathPointsRef.current.filter((_, pIdx) => pIdx % 2 === 0); // Decimate path points for performance

      // Total nodes to draw lines between
      const nodesX: number[] = [];
      const nodesY: number[] = [];
      const nodesZ: number[] = [];
      const nodeIsPath: boolean[] = [];
      const nodeAges: number[] = []; // for path points fading

      // Add network particles
      for (let i = 0; i < networkCount; i++) {
        nodesX.push(netArr[i * 3]);
        nodesY.push(netArr[i * 3 + 1]);
        nodesZ.push(netArr[i * 3 + 2]);
        nodeIsPath.push(false);
        nodeAges.push(0);
      }

      // Add path points as temporary connecting nodes
      if (!isLowPower) {
        activePathPoints.forEach((pt) => {
          nodesX.push(pt.x);
          nodesY.push(pt.y);
          nodesZ.push(pt.z);
          nodeIsPath.push(true);
          nodeAges.push((Date.now() - pt.time) / 1500); // 0 to 1 age
        });
      }

      const totalNodes = nodesX.length;
      const cyanColor = new THREE.Color(0x06b6d4); // Cyan
      const indigoColor = new THREE.Color(0x8b5cf6); // Indigo

      // Maximum connections per particle to avoid dense visual clutter & keep performance flat
      const maxConnectionsPerNode = isMobile ? 2 : isLowPower ? 3 : 5;
      const connectionsCount = new Uint8Array(totalNodes);

      for (let i = 0; i < totalNodes; i++) {
        if (connectionsCount[i] >= maxConnectionsPerNode) continue;

        for (let j = i + 1; j < totalNodes; j++) {
          if (connectionsCount[j] >= maxConnectionsPerNode) continue;
          if (connectionsCount[i] >= maxConnectionsPerNode) break;

          const dx = nodesX[i] - nodesX[j];
          const dy = nodesY[i] - nodesY[j];
          const dz = nodesZ[i] - nodesZ[j];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            connectionsCount[i]++;
            connectionsCount[j]++;

            // Base opacity determined by distance
            let opacity = 1.0 - dist / maxDistance;
            
            // Speed excitement (connections glow brighter when moving mouse fast)
            opacity *= (1.0 + speedExcitation * 0.8);

            // Path nodes fade out as they age
            if (nodeIsPath[i]) opacity *= (1.0 - nodeAges[i]);
            if (nodeIsPath[j]) opacity *= (1.0 - nodeAges[j]);

            // Skip drawing transparent lines
            if (opacity < 0.05) continue;

            linePoints.push(nodesX[i], nodesY[i], nodesZ[i]);
            linePoints.push(nodesX[j], nodesY[j], nodesZ[j]);

            // Interpolate color (particles are cyan, path is indigo, blending based on type)
            const cI = nodeIsPath[i] ? indigoColor : cyanColor;
            const cJ = nodeIsPath[j] ? indigoColor : cyanColor;

            lineColors.push(cI.r * opacity, cI.g * opacity, cI.b * opacity);
            lineColors.push(cJ.r * opacity, cJ.g * opacity, cJ.b * opacity);
          }
        }
      }

      if (linePoints.length > 0) {
        const lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));
        lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

        const segments = new THREE.LineSegments(lineGeometry, lineMaterial);
        segments.name = 'interactive_network_lines';
        scene.add(segments);
      }

      // Render Three.js Scene
      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup resources
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      networkGeometry.dispose();
      networkMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      lineMaterial.dispose();
    };
  }, [webglSupported]);

  // Helper texture function to render rounded, glowing points instead of pixelated squares
  function createCircleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Draw radial gradient circle
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      gradient.addColorStop(0.2, 'rgba(6, 182, 212, 0.8)'); // Cyan glow
      gradient.addColorStop(0.6, 'rgba(6, 182, 212, 0.15)');
      gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  // Graceful CSS gradient fallback when WebGL isn't supported
  if (!webglSupported) {
    return (
      <div
        id="gradient-fallback-background"
        className="fixed inset-0 w-full h-full -z-10 bg-gradient-to-br from-[#020205] via-[#050B14] to-[#0A0512] transition-colors duration-500 overflow-hidden"
      >
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-cyan-500/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-violet-500/10 rounded-full blur-[160px]" />
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[140px]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-[#020205] overflow-hidden pointer-events-none">
      {/* ThreeJS WebGL canvas container */}
      <div
        ref={containerRef}
        id="3d-canvas-container"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Background Atmosphere: Simulated 3D Space Glow Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '12s' }} />

      {/* Tech Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] pointer-events-none" />

      {/* Visual Overlay Texture (stardust) */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
    </div>
  );
}
