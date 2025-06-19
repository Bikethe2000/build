import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface STLModelProps {
  file: File;
  onVolumeComputed: (volume: number) => void;
}

const STLModel: React.FC<STLModelProps> = ({ file, onVolumeComputed }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!file || !containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / 300, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, 300);
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 100).normalize();
    scene.add(light);

    const loader = new STLLoader();
    const reader = new FileReader();

    reader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const geometry = loader.parse(arrayBuffer);
      geometry.center();

      // Υπολογισμός όγκου σε mm³
      const computeVolume = (geo: THREE.BufferGeometry) => {
        let volume = 0;
        const posAttr = geo.getAttribute('position');
        for (let i = 0; i < posAttr.count; i += 3) {
          const p1 = new THREE.Vector3().fromBufferAttribute(posAttr, i);
          const p2 = new THREE.Vector3().fromBufferAttribute(posAttr, i + 1);
          const p3 = new THREE.Vector3().fromBufferAttribute(posAttr, i + 2);
          volume += p1.dot(p2.cross(p3)) / 6;
        }
        return Math.abs(volume);
      };

      const volume = computeVolume(geometry);
      onVolumeComputed(volume); // ενημέρωση γονέα

      const material = new THREE.MeshPhongMaterial({ color: 0x5588ff });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };

      animate();
    };

    reader.readAsArrayBuffer(file);

    return () => {
      renderer.dispose();
    };
  }, [file]);

  return <div ref={containerRef} />;
};

export default STLModel;
