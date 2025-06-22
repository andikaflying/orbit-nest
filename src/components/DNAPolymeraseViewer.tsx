import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const DNAPolymeraseViewer = () => {
  const mountRef = useRef(null);
  const [loadingStatus, setLoadingStatus] = useState("Initializing...");
  const [atomCount, setAtomCount] = useState(0);
  const [helixCount, setHelixCount] = useState(0);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene setup optimized for protein structure
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);

    const camera = new THREE.PerspectiveCamera(
      50,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      500,
    );
    camera.position.set(40, 30, 40);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x1a1a2e, 1.0);
    currentMount.appendChild(renderer.domElement);

    // Controls for protein exploration
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.enablePan = true;

    // Professional lighting setup for protein visualization
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    // Main directional light
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(50, 50, 50);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 4096;
    mainLight.shadow.mapSize.height = 4096;
    mainLight.shadow.camera.near = 0.1;
    mainLight.shadow.camera.far = 200;
    mainLight.shadow.camera.left = -30;
    mainLight.shadow.camera.right = 30;
    mainLight.shadow.camera.top = 30;
    mainLight.shadow.camera.bottom = -30;
    scene.add(mainLight);

    // Fill light
    const fillLight = new THREE.DirectionalLight(0x4da6ff, 0.3);
    fillLight.position.set(-30, 20, 30);
    scene.add(fillLight);

    // Accent light for depth
    const accentLight = new THREE.PointLight(0xff6b9d, 0.5, 80);
    accentLight.position.set(0, 30, 0);
    scene.add(accentLight);

    // Groups for different structural elements
    const backboneGroup = new THREE.Group();
    const helixGroup = new THREE.Group();
    const sideChainGroup = new THREE.Group();
    const surfaceGroup = new THREE.Group();

    scene.add(backboneGroup);
    scene.add(helixGroup);
    scene.add(sideChainGroup);
    scene.add(surfaceGroup);

    // Load and parse the DNA Polymerase PDB structure
    setLoadingStatus("Loading DNA Polymerase Beta structure...");

    fetch("/assets/1BNO.pdb")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load PDB file: ${response.status}`);
        }
        return response.text();
      })
      .then((pdbData) => {
        setLoadingStatus("Parsing protein structure...");

        const lines = pdbData.split(/\r?\n/);
        const atoms = [];
        const caAtoms = [];
        const helices = [];
        const sheets = [];

        // Parse secondary structure information
        lines.forEach((line) => {
          if (line.startsWith("HELIX")) {
            const helixId = line.substring(7, 10).trim();
            const helixClass = line.substring(38, 40).trim();
            const start = parseInt(line.substring(21, 25));
            const end = parseInt(line.substring(33, 37));
            const length = parseInt(line.substring(71, 76));

            helices.push({
              id: helixId,
              class: helixClass,
              start: start,
              end: end,
              length: length,
            });
          } else if (line.startsWith("SHEET")) {
            const sheetId = line.substring(7, 10).trim();
            const start = parseInt(line.substring(22, 26));
            const end = parseInt(line.substring(33, 37));

            sheets.push({
              id: sheetId,
              start: start,
              end: end,
            });
          }
        });

        setHelixCount(helices.length);
        console.log(
          `Found ${helices.length} helices and ${sheets.length} beta sheets`,
        );

        // Parse atom coordinates
        lines.forEach((line) => {
          if (line.startsWith("ATOM")) {
            const atomSerial = parseInt(line.substring(6, 11));
            const atomName = line.substring(12, 16).trim();
            const altLoc = line.substring(16, 17).trim();
            const resName = line.substring(17, 20).trim();
            const chainId = line.substring(21, 22).trim();
            const resSeq = parseInt(line.substring(22, 26));
            const x = parseFloat(line.substring(30, 38));
            const y = parseFloat(line.substring(38, 46));
            const z = parseFloat(line.substring(46, 54));
            const occupancy = parseFloat(line.substring(54, 60));
            const tempFactor = parseFloat(line.substring(60, 66));
            const element = line.substring(76, 78).trim() || atomName.charAt(0);

            // Only use atoms with alternate location A or no alternate location
            if (altLoc === "" || altLoc === "A") {
              const atom = {
                serial: atomSerial,
                name: atomName,
                resName: resName,
                chainId: chainId,
                resSeq: resSeq,
                position: new THREE.Vector3(x, y, z),
                element: element,
                occupancy: occupancy,
                tempFactor: tempFactor,
                isBackbone: ["N", "CA", "C", "O"].includes(atomName),
                isCA: atomName === "CA",
                inHelix: helices.some(
                  (h) => resSeq >= h.start && resSeq <= h.end,
                ),
                inSheet: sheets.some(
                  (s) => resSeq >= s.start && resSeq <= s.end,
                ),
              };

              atoms.push(atom);

              if (atom.isCA) {
                caAtoms.push(atom);
              }
            }
          }
        });

        setAtomCount(atoms.length);
        setLoadingStatus("Building 3D structure...");

        console.log(
          `Parsed ${atoms.length} atoms (${caAtoms.length} CA atoms)`,
        );

        if (atoms.length === 0) {
          setLoadingStatus("Error: No atoms found in PDB file");
          return;
        }

        // Center and scale the protein
        const center = new THREE.Vector3();
        atoms.forEach((atom) => center.add(atom.position));
        center.divideScalar(atoms.length);
        atoms.forEach((atom) => atom.position.sub(center));

        // Scale to fit nicely in view
        const boundingBox = new THREE.Box3();
        atoms.forEach((atom) => boundingBox.expandByPoint(atom.position));
        const size = boundingBox.getSize(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z);
        const scale = 20 / maxDimension;
        atoms.forEach((atom) => atom.position.multiplyScalar(scale));

        setLoadingStatus("Rendering atoms...");

        // Create sophisticated atom representation
        atoms.forEach((atom, index) => {
          if (index % 50 === 0) {
            setLoadingStatus(
              `Rendering atoms... ${Math.round((index / atoms.length) * 100)}%`,
            );
          }

          let color, radius, material;

          // Color scheme based on structure and element
          if (atom.inHelix) {
            switch (atom.element) {
              case "C":
                color = 0xff6b9d; // Pink for helix carbons
                radius = atom.isBackbone ? 0.15 : 0.12;
                break;
              case "N":
                color = 0x4dabf7; // Blue for nitrogens
                radius = 0.12;
                break;
              case "O":
                color = 0xff4757; // Red for oxygens
                radius = 0.12;
                break;
              case "S":
                color = 0xffdd59; // Yellow for sulfurs
                radius = 0.16;
                break;
              default:
                color = 0xdfe4ea; // Gray for others
                radius = 0.1;
            }
          } else if (atom.inSheet) {
            switch (atom.element) {
              case "C":
                color = 0x00d2d3; // Cyan for sheet carbons
                radius = atom.isBackbone ? 0.15 : 0.12;
                break;
              case "N":
                color = 0x0084ff; // Bright blue
                radius = 0.12;
                break;
              case "O":
                color = 0xff006e; // Magenta
                radius = 0.12;
                break;
              case "S":
                color = 0xffa502; // Orange
                radius = 0.16;
                break;
              default:
                color = 0xa4b0be; // Light gray
                radius = 0.1;
            }
          } else {
            // Loop regions
            switch (atom.element) {
              case "C":
                color = 0x2ed573; // Green for carbons
                radius = atom.isBackbone ? 0.14 : 0.11;
                break;
              case "N":
                color = 0x3742fa; // Purple-blue
                radius = 0.11;
                break;
              case "O":
                color = 0xff3838; // Bright red
                radius = 0.11;
                break;
              case "S":
                color = 0xf1c40f; // Yellow
                radius = 0.15;
                break;
              default:
                color = 0x747d8c; // Dark gray
                radius = 0.09;
            }
          }

          // Adjust radius based on temperature factor (flexibility)
          const tempFactorScale = Math.max(
            0.5,
            Math.min(1.5, atom.tempFactor / 30),
          );
          radius *= tempFactorScale;

          const geometry = new THREE.SphereGeometry(radius, 8, 6);
          material = new THREE.MeshPhongMaterial({
            color: color,
            shininess: 100,
            transparent: false,
            opacity: 1.0,
          });

          const sphere = new THREE.Mesh(geometry, material);
          sphere.position.copy(atom.position);
          sphere.castShadow = true;
          sphere.receiveShadow = true;

          // Store atom information for interactions
          sphere.userData = {
            atom: atom,
            originalColor: color,
          };

          if (atom.isBackbone) {
            backboneGroup.add(sphere);
          } else {
            sideChainGroup.add(sphere);
          }
        });

        setLoadingStatus("Creating backbone structure...");

        // Create backbone representation
        if (caAtoms.length > 3) {
          // Sort CA atoms by residue sequence
          caAtoms.sort((a, b) => a.resSeq - b.resSeq);

          const backbonePoints = caAtoms.map((atom) => atom.position);
          const curve = new THREE.CatmullRomCurve3(backbonePoints);

          // Create smooth backbone tube
          const tubeGeometry = new THREE.TubeGeometry(
            curve,
            backbonePoints.length * 2,
            0.08,
            8,
            false,
          );
          const tubeMaterial = new THREE.MeshPhongMaterial({
            color: 0x6c5ce7,
            transparent: true,
            opacity: 0.8,
            shininess: 50,
          });
          const backboneTube = new THREE.Mesh(tubeGeometry, tubeMaterial);
          backboneTube.castShadow = true;
          backboneTube.receiveShadow = true;
          backboneGroup.add(backboneTube);
        }

        // Create helix representations
        helices.forEach((helix, index) => {
          const helixCA = caAtoms
            .filter(
              (atom) => atom.resSeq >= helix.start && atom.resSeq <= helix.end,
            )
            .sort((a, b) => a.resSeq - b.resSeq);

          if (helixCA.length > 3) {
            const helixPoints = helixCA.map((atom) => atom.position);
            const helixCurve = new THREE.CatmullRomCurve3(helixPoints);

            // Create helix ribbon
            const ribbonGeometry = new THREE.TubeGeometry(
              helixCurve,
              helixPoints.length * 2,
              0.12,
              6,
              false,
            );
            const ribbonMaterial = new THREE.MeshPhongMaterial({
              color: 0xff6b9d,
              transparent: true,
              opacity: 0.9,
              shininess: 80,
            });
            const ribbon = new THREE.Mesh(ribbonGeometry, ribbonMaterial);
            ribbon.castShadow = true;
            ribbon.receiveShadow = true;
            helixGroup.add(ribbon);
          }
        });

        // Create bonds between nearby atoms
        setLoadingStatus("Creating chemical bonds...");
        const bondGroup = new THREE.Group();
        scene.add(bondGroup);

        for (let i = 0; i < atoms.length; i++) {
          if (i % 100 === 0) {
            setLoadingStatus(
              `Creating bonds... ${Math.round((i / atoms.length) * 100)}%`,
            );
          }

          const atom1 = atoms[i];

          for (let j = i + 1; j < atoms.length; j++) {
            const atom2 = atoms[j];
            const distance = atom1.position.distanceTo(atom2.position);

            // Create bonds for atoms in the same residue or adjacent residues
            const sameResidue = atom1.resSeq === atom2.resSeq;
            const adjacentResidue = Math.abs(atom1.resSeq - atom2.resSeq) === 1;
            const bondDistance = sameResidue
              ? 0.18
              : adjacentResidue
                ? 0.15
                : 0;

            if (distance < bondDistance && distance > 0.05) {
              const bondGeometry = new THREE.CylinderGeometry(
                0.02,
                0.02,
                distance,
              );
              const bondMaterial = new THREE.MeshPhongMaterial({
                color: 0x808080,
                transparent: true,
                opacity: 0.7,
              });

              const bond = new THREE.Mesh(bondGeometry, bondMaterial);

              // Position and orient the bond
              const midpoint = new THREE.Vector3()
                .addVectors(atom1.position, atom2.position)
                .multiplyScalar(0.5);
              bond.position.copy(midpoint);

              const direction = new THREE.Vector3()
                .subVectors(atom2.position, atom1.position)
                .normalize();
              const quaternion = new THREE.Quaternion().setFromUnitVectors(
                new THREE.Vector3(0, 1, 0),
                direction,
              );
              bond.setRotationFromQuaternion(quaternion);

              bondGroup.add(bond);
            }
          }
        }

        setLoadingStatus("DNA Polymerase Beta structure loaded successfully!");
        console.log("DNA Polymerase Beta 3D structure created successfully");
      })
      .catch((error) => {
        console.error("Error loading DNA Polymerase structure:", error);
        setLoadingStatus("Error loading structure: " + error.message);
      });

    // Animation loop
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Gentle rotation of the entire structure
      if (backboneGroup.children.length > 0) {
        backboneGroup.rotation.y = elapsedTime * 0.02;
        helixGroup.rotation.y = elapsedTime * 0.02;
        sideChainGroup.rotation.y = elapsedTime * 0.02;
      }

      // Subtle breathing motion for helices
      helixGroup.children.forEach((helix, index) => {
        const scale = 1 + Math.sin(elapsedTime + index * 0.5) * 0.02;
        helix.scale.setScalar(scale);
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
      {/* Header Info */}
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
          fontSize: "14px",
          zIndex: 1000,
          border: "1px solid #6c5ce7",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0", color: "#6c5ce7" }}>
          DNA Polymerase Beta (1BNO)
        </h3>
        <p style={{ margin: "5px 0", fontSize: "12px" }}>
          <strong>Atoms:</strong> {atomCount.toLocaleString()}
        </p>
        <p style={{ margin: "5px 0", fontSize: "12px" }}>
          <strong>Helices:</strong> {helixCount}
        </p>
        <p style={{ margin: "5px 0", fontSize: "12px" }}>
          <strong>Function:</strong> DNA repair enzyme
        </p>
      </div>

      {/* Status Display */}
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
        {loadingStatus}
      </div>

      {/* Structure Legend */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          background: "rgba(0, 0, 0, 0.8)",
          color: "white",
          padding: "12px",
          borderRadius: "8px",
          fontSize: "11px",
          zIndex: 1000,
          lineHeight: "1.4",
        }}
      >
        <div
          style={{ fontWeight: "bold", marginBottom: "8px", color: "#6c5ce7" }}
        >
          Structure Legend
        </div>
        <div style={{ color: "#ff6b9d" }}>● α-Helices</div>
        <div style={{ color: "#00d2d3" }}>● β-Sheets</div>
        <div style={{ color: "#2ed573" }}>● Loop Regions</div>
        <div style={{ color: "#6c5ce7" }}>— Backbone</div>
        <div style={{ color: "#808080", fontSize: "10px" }}>
          — Chemical Bonds
        </div>
      </div>

      {/* Controls Info */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "rgba(0, 0, 0, 0.8)",
          color: "white",
          padding: "12px",
          borderRadius: "8px",
          fontSize: "11px",
          zIndex: 1000,
          lineHeight: "1.4",
        }}
      >
        <div
          style={{ fontWeight: "bold", marginBottom: "8px", color: "#6c5ce7" }}
        >
          Controls
        </div>
        <div>Mouse: Rotate view</div>
        <div>Scroll: Zoom in/out</div>
        <div>Drag: Pan view</div>
      </div>

      <div
        ref={mountRef}
        style={{
          width: "100%",
          height: "100vh",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        }}
      />
    </div>
  );
};

export default DNAPolymeraseViewer;
