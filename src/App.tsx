import React, { useEffect } from "react";
import "./App.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// @ts-ignore
import speaker from "./assets/speaker.glb";

function App() {
  useEffect(() => {
    // Render the scene
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document!.getElementById("mount")!.appendChild(renderer.domElement);

    // Create a scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#d9effa");

    // Create a camera
    const camera = new THREE.PerspectiveCamera(
      15,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    const controls = new OrbitControls(camera, renderer.domElement);
    scene.add(camera);

    // god said "let there be light"
    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 2);
    const light2 = new THREE.AmbientLight(0xffffff, 5);
    scene.add(light);
    scene.add(light2);

    //Load a model
    const loader = new GLTFLoader();
    loader.load(
      speaker,
      (gltf) => {
        const root = gltf.scene;
        console.log(gltf);
        console.log(root);
        scene.add(root);
      },
      undefined,
      (error) => {
        console.error("Unable to load file.");
        console.error(error);
      }
    );

    // const sphere = new THREE.SphereGeometry(5, 50, 50);
    // const sphereMaterial = new THREE.MeshPhongMaterial({ color: "#121646" });
    // const sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
    // scene.add(sphereMesh);

    // Create a geometry
    // const geometry = new THREE.BoxGeometry(3, 3, 3);
    // const material = new THREE.MeshBasicMaterial({ color: "#ffc1cc" });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    // Initialize the renderer
    camera.position.set(20, 0, -3);
    controls.update();

    // Render the scene
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      // console.log(camera.position);
      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return (
    <div className="App">
      <div id="mount"></div>
    </div>
  );
}

export default App;
