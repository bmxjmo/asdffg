import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function init() {
    
    let scene, camera, renderer, car, directionalLight, light, controls;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x292929);

    camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight,1,5000);
    camera.rotation.y = 45/180*Math.PI;
    camera.position.x = 800;
    camera.position.y = 100;
    camera.position.z = 800;

    
    let AmbientLight = new THREE.AmbientLight(0x404040,15);
    
    scene.add(AmbientLight);
    
    directionalLight = new THREE.DirectionalLight(0xffffff,8);
    directionalLight.position.set(0,1,0);
    directionalLight.castShadow = true;
    
    scene.add(directionalLight);
    
    light = new THREE.PointLight(0xcccccc,8);
    light.position.set(0,300,500);
    
    scene.add(light);
    
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);
    
    let example = new THREE.Object3D();
    
    let loader = new GLTFLoader();
    
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(4.5, 0, 4.5);
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.enableDamping = true;
    
    loader.load('scene.gltf', (gltf) => {
        example = gltf.scene;
        car = example.children[0];
        car.scale.set(200,200,200);
        scene.add(example);
        animate();
    })
    function animate() {
        controls.update();
        renderer.render(scene, camera);
        window.requestAnimationFrame(animate);
    }
}

init();
