import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const EnhancedProteinViewer = () => {
  const mountRef = useRef(null);
  const [proteinInfo, setProteinInfo] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Load protein information from JSON
    fetch("/assets/get_specific_dataset_info_result.json")
      .then((response) => response.json())
      .then((data) => {
        setProteinInfo(data.body.item[0]);
      })
      .catch((error) => console.log("Could not load protein info:", error));
  }, []);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene setup with enhanced visuals
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    scene.fog = new THREE.Fog(0x0a0a0a, 10, 100);

    const camera = new THREE.PerspectiveCamera(
      60,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      200,
    );
    camera.position.set(25, 20, 25);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x0a0a0a, 0.9);
    currentMount.appendChild(renderer.domElement);

    // Enhanced controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Advanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    // Key light
    const keyLight = new THREE.DirectionalLight(0x4da6ff, 1.0);
    keyLight.position.set(30, 30, 30);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.1;
    keyLight.shadow.camera.far = 100;
    scene.add(keyLight);

    // Fill light
    const fillLight = new THREE.DirectionalLight(0xff6b9d, 0.5);
    fillLight.position.set(-20, 10, -10);
    scene.add(fillLight);

    // Rim light
    const rimLight = new THREE.PointLight(0x00ff88, 1.0, 50);
    rimLight.position.set(0, 20, 0);
    scene.add(rimLight);

    // Animated point lights for DNA repair theme
    const dnaLight1 = new THREE.PointLight(0xff3366, 0.8, 30);
    const dnaLight2 = new THREE.PointLight(0x3366ff, 0.8, 30);
    scene.add(dnaLight1);
    scene.add(dnaLight2);

    // Protein visualization groups
    const proteinGroup = new THREE.Group();
    const helixGroup = new THREE.Group();
    const activeGroup = new THREE.Group();
    const particleGroup = new THREE.Group();

    scene.add(proteinGroup);
    scene.add(helixGroup);
    scene.add(activeGroup);
    scene.add(particleGroup);

    // Create DNA repair visualization particles
    function createRepairParticles() {
      const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
      const particleMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.7,
        emissive: 0x002200,
      });

      for (let i = 0; i < 50; i++) {
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        particle.position.set(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
        );
        particle.userData = {
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02,
          ),
          originalPosition: particle.position.clone(),
        };
        particleGroup.add(particle);
      }
    }

    // Load and parse PDB data with enhanced visualization
    fetch("/1BNO.pdb")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((pdbData) => {
        console.log("DNA Polymerase Beta (1BNO) loaded successfully");
        const lines = pdbData.split(/\r?\n/);
        const atoms = [];
        const caAtoms = [];
        const helixRegions = [];

        setLoadingProgress(25);

        // Parse helix information
        lines.forEach((line) => {
          if (line.startsWith("HELIX")) {
            const helixId = line.substring(7, 10).trim();
            const start = parseInt(line.substring(21, 25));
            const end = parseInt(line.substring(33, 37));
            helixRegions.push({ id: helixId, start, end });
          }
        });

        setLoadingProgress(50);

        // Parse atoms with enhanced categorization
        lines.forEach((line) => {
          if (line.startsWith("ATOM")) {
            const atomName = line.substring(12, 16).trim();
            const resName = line.substring(17, 20).trim();
            const x = parseFloat(line.substring(30, 38));
            const y = parseFloat(line.substring(38, 46));
            const z = parseFloat(line.substring(46, 54));
            const element = line.substring(76, 78).trim() || atomName.charAt(0);
            const resSeq = parseInt(line.substring(22, 26));

            const atom = {
              name: atomName,
              resName: resName,
              position: new THREE.Vector3(x, y, z),
              element: element,
              resSeq: resSeq,
              isInHelix: helixRegions.some(
                (h) => resSeq >= h.start && resSeq <= h.end,
              ),
              isActive: resSeq >= 30 && resSeq <= 50, // Active site region
            };

            atoms.push(atom);

            if (atomName === "CA") {
              caAtoms.push(atom);
            }
          }
        });

        setLoadingProgress(75);

        console.log(
          `Parsed ${atoms.length} atoms, ${caAtoms.length} CA atoms, ${helixRegions.length} helices`,
        );

        if (atoms.length === 0) {
          console.error("No atoms found in PDB file");
          createRepairParticles();
          return;
        }

        // Center and scale the protein
        const center = new THREE.Vector3();
        atoms.forEach((atom) => center.add(atom.position));
        center.divideScalar(atoms.length);
        atoms.forEach((atom) => atom.position.sub(center));

        const scale = 0.12;
        atoms.forEach((atom) => atom.position.multiplyScalar(scale));

        // Create enhanced atom visualization
        atoms.forEach((atom, index) => {
          let color, radius, emissiveColor;

          // Enhanced color scheme based on function
          if (atom.isActive) {
            // Active site atoms - bright and glowing
            switch (atom.element) {
              case "C":
                color = 0xff6b35;
                emissiveColor = 0x331100;
                radius = 0.18;
                break;
              case "N":
                color = 0x4dabf7;
                emissiveColor = 0x001133;
                radius = 0.15;
                break;
              case "O":
                color = 0xff4757;
                emissiveColor = 0x330011;
                radius = 0.15;
                break;
              default:
                color = 0xffa502;
                emissiveColor = 0x332200;
                radius = 0.12;
            }
          } else if (atom.isInHelix) {
            // Helix atoms - structural elements
            switch (atom.element) {
              case "C":
                color = 0x00d2d3;
                emissiveColor = 0x003333;
                radius = 0.16;
                break;
              case "N":
                color = 0x0084ff;
                emissiveColor = 0x001133;
                radius = 0.13;
                break;
              case "O":
                color = 0xff006e;
                emissiveColor = 0x330011;
                radius = 0.13;
                break;
              default:
                color = 0x54a0ff;
                emissiveColor = 0x001122;
                radius = 0.11;
            }
          } else {
            // Regular atoms
            switch (atom.element) {
              case "C":
                color = 0x2ed573;
                emissiveColor = 0x003311;
                radius = 0.14;
                break;
              case "N":
                color = 0x3742fa;
                emissiveColor = 0x000833;
                radius = 0.12;
                break;
              case "O":
                color = 0xff3838;
                emissiveColor = 0x330808;
                radius = 0.12;
                break;
              case "S":
                color = 0xffdd59;
                emissiveColor = 0x333311;
                radius = 0.17;
                break;
              default:
                color = 0xdfe4ea;
                emissiveColor = 0x111111;
                radius = 0.1;
            }
          }

          const geometry = new THREE.SphereGeometry(radius, 12, 8);
          const material = new THREE.MeshPhongMaterial({
            color: color,
            emissive: emissiveColor,
            shininess: 100,
            transparent: true,
            opacity: atom.isActive ? 0.9 : 0.8,
          });

          const sphere = new THREE.Mesh(geometry, material);
          sphere.position.copy(atom.position);
          sphere.castShadow = true;
          sphere.receiveShadow = true;

          sphere.userData = {
            originalPosition: atom.position.clone(),
            animationOffset: Math.random() * Math.PI * 2,
            animationSpeed: atom.isActive ? 1.5 : atom.isInHelix ? 1.0 : 0.7,
            atom: atom,
          };

          if (atom.isActive) {
            activeGroup.add(sphere);
          } else {
            proteinGroup.add(sphere);
          }
        });

        // Create enhanced backbone visualization
        if (caAtoms.length > 3) {
          const helixPoints = caAtoms
            .filter((atom) => atom.isInHelix)
            .map((atom) => atom.position);
          const regularPoints = caAtoms
            .filter((atom) => !atom.isInHelix)
            .map((atom) => atom.position);

          // Helix regions as thicker ribbons
          if (helixPoints.length > 3) {
            const helixCurve = new THREE.CatmullRomCurve3(helixPoints);
            const helixGeometry = new THREE.TubeGeometry(
              helixCurve,
              64,
              0.08,
              8,
              false,
            );
            const helixMaterial = new THREE.MeshPhongMaterial({
              color: 0xff6b9d,
              transparent: true,
              opacity: 0.8,
              emissive: 0x331122,
              shininess: 50,
            });
            const helixTube = new THREE.Mesh(helixGeometry, helixMaterial);
            helixTube.castShadow = true;
            helixGroup.add(helixTube);
          }

          // Regular backbone
          const allPoints = caAtoms.map((atom) => atom.position);
          const curve = new THREE.CatmullRomCurve3(allPoints);
          const tubeGeometry = new THREE.TubeGeometry(
            curve,
            128,
            0.04,
            6,
            false,
          );
          const tubeMaterial = new THREE.MeshPhongMaterial({
            color: 0x4da6ff,
            transparent: true,
            opacity: 0.6,
            emissive: 0x001133,
          });
          const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
          tube.castShadow = true;
          proteinGroup.add(tube);
        }

        createRepairParticles();
        setLoadingProgress(100);
        console.log("Enhanced DNA Polymerase Beta visualization created");
      })
      .catch((error) => {
        console.error("Error loading PDB file:", error);
        createRepairParticles();
      });

    // Advanced animation loop
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Animate protein atoms with enhanced motion
      [...proteinGroup.children, ...activeGroup.children].forEach((atom) => {
        if (atom.userData && atom.userData.originalPosition) {
          const offset = atom.userData.animationOffset;
          const speed = atom.userData.animationSpeed;
          const isActive = atom.userData.atom?.isActive;

          atom.position.copy(atom.userData.originalPosition);

          if (isActive) {
            // Active site atoms have more dramatic motion
            atom.position.y += Math.sin(elapsedTime * speed + offset) * 0.15;
            atom.position.x +=
              Math.cos(elapsedTime * speed * 0.8 + offset) * 0.1;
            atom.rotation.y = elapsedTime * 2;
          } else {
            // Regular floating motion
            atom.position.y += Math.sin(elapsedTime * speed + offset) * 0.08;
            atom.position.x +=
              Math.cos(elapsedTime * speed * 0.6 + offset) * 0.04;
          }
        }
      });

      // Animate repair particles
      particleGroup.children.forEach((particle) => {
        if (particle.userData) {
          particle.position.add(particle.userData.velocity);

          // Boundary check and reset
          if (particle.position.length() > 15) {
            particle.position.copy(particle.userData.originalPosition);
          }

          // Subtle rotation
          particle.rotation.x += 0.01;
          particle.rotation.y += 0.02;
        }
      });

      // Animate DNA lights in a double helix pattern
      const helixRadius = 12;
      const helixHeight = 8;

      dnaLight1.position.x = Math.cos(elapsedTime * 0.5) * helixRadius;
      dnaLight1.position.z = Math.sin(elapsedTime * 0.5) * helixRadius;
      dnaLight1.position.y = Math.sin(elapsedTime * 0.3) * helixHeight;

      dnaLight2.position.x =
        Math.cos(elapsedTime * 0.5 + Math.PI) * helixRadius;
      dnaLight2.position.z =
        Math.sin(elapsedTime * 0.5 + Math.PI) * helixRadius;
      dnaLight2.position.y =
        Math.sin(elapsedTime * 0.3 + Math.PI) * helixHeight;

      // Rotate entire structure slowly
      proteinGroup.rotation.y = elapsedTime * 0.05;
      helixGroup.rotation.y = elapsedTime * 0.05;
      activeGroup.rotation.y = elapsedTime * 0.05;

      // Pulsing effect for active site
      activeGroup.children.forEach((child) => {
        const pulse = 1 + Math.sin(elapsedTime * 3) * 0.1;
        child.scale.setScalar(pulse);
      });

      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!currentMount) return;

      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {/* Info Panel */}
      {proteinInfo && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            background: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "15px",
            borderRadius: "10px",
            fontFamily: "Arial, sans-serif",
            fontSize: "12px",
            maxWidth: "300px",
            zIndex: 1000,
            border: "1px solid #4da6ff",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0", color: "#4da6ff" }}>
            {proteinInfo.proteinName.split("(")[0]}
          </h3>
          <p style={{ margin: "5px 0", fontSize: "11px" }}>
            <strong>PDB ID:</strong> {proteinInfo.PDBID}
          </p>
          <p style={{ margin: "5px 0", fontSize: "11px" }}>
            <strong>Function:</strong> {proteinInfo.function}
          </p>
          <p style={{ margin: "5px 0", fontSize: "11px" }}>
            <strong>Druggability:</strong> {proteinInfo.druggabilityScore}
          </p>
          {proteinInfo.modulator && proteinInfo.modulator.length > 0 && (
            <div style={{ marginTop: "10px" }}>
              <strong style={{ color: "#ff6b9d" }}>Modulators:</strong>
              {proteinInfo.modulator.slice(0, 2).map((mod, idx) => (
                <div key={idx} style={{ fontSize: "10px", marginTop: "3px" }}>
                  • {mod.compound} ({mod.type})
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Loading Progress */}
      {loadingProgress < 100 && (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "10px 20px",
            borderRadius: "20px",
            fontSize: "14px",
            zIndex: 1000,
          }}
        >
          Loading DNA Polymerase Beta: {loadingProgress}%
        </div>
      )}

      {/* Legend */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          background: "rgba(0, 0, 0, 0.8)",
          color: "white",
          padding: "10px",
          borderRadius: "8px",
          fontSize: "10px",
          zIndex: 1000,
        }}
      >
        <div style={{ color: "#ff6b35" }}>● Active Site</div>
        <div style={{ color: "#00d2d3" }}>● Helix Regions</div>
        <div style={{ color: "#2ed573" }}>● Regular Structure</div>
        <div style={{ color: "#00ff88" }}>● DNA Repair Activity</div>
      </div>

      <div
        ref={mountRef}
        style={{
          width: "100%",
          height: "100vh",
          background: "radial-gradient(circle, #1a1a2e 0%, #0a0a0a 100%)",
        }}
      />
    </div>
  );
};

export default EnhancedProteinViewer;
