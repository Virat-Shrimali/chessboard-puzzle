import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Chessboard = ({ rotation }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable transparent background
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // Adjust for high DPI screens
    renderer.setClearColor(0x000000, 0); // Set the background to transparent
    mountRef.current.appendChild(renderer.domElement);

    // Create the chessboard
    const size = 8;
    const tileSize = 1; // Size relative to container
    const chessboard = new THREE.Group();
    const tileColors = [0x8B4513, 0xD2B48C]; // Vintage brown colors

    for (let x = 0; x < size; x++) {
      for (let z = 0; z < size; z++) {
        const geometry = new THREE.BoxGeometry(tileSize, 0.1, tileSize);
        const material = new THREE.MeshBasicMaterial({
          color: (x + z) % 2 === 0 ? tileColors[0] : tileColors[1],
          side: THREE.DoubleSide
        });
        const tile = new THREE.Mesh(geometry, material);
        tile.position.set(x - size / 2 + tileSize / 2, 0, z - size / 2 + tileSize / 2);
        chessboard.add(tile);
      }
    }

    scene.add(chessboard);

    // Set the camera position
    camera.position.z = size * tileSize * 1.5; // Adjusted based on size

    const animate = () => {
      requestAnimationFrame(animate);
      chessboard.rotation.x = rotation.y * (Math.PI / 180);
      chessboard.rotation.y = rotation.x * (Math.PI / 180);
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [rotation]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default Chessboard;
