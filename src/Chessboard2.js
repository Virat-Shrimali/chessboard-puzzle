// src/Chessboard.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Chessboard = ({ rotation }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create the chessboard
    const size = 8;
    const tileSize = 1;
    const chessboard = new THREE.Group();
    for (let x = 0; x < size; x++) {
      for (let z = 0; z < size; z++) {
        const geometry = new THREE.BoxGeometry(tileSize, 0.1, tileSize);
        const material = new THREE.MeshBasicMaterial({
          color: (x + z) % 2 === 0 ? 0xffffff : 0x000000,
        });
        const tile = new THREE.Mesh(geometry, material);
        tile.position.set(x - size / 2, 0, z - size / 2);
        chessboard.add(tile);
      }
    }
    scene.add(chessboard);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      chessboard.rotation.x = rotation.y * (Math.PI / 180);
      chessboard.rotation.y = rotation.x * (Math.PI / 180);
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [rotation]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default Chessboard2;
