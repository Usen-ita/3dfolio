import './style.css'

import * as THREE from 'three';


import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';



const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);
//camera.position.setX(-40);

renderer.render( scene, camera);



//sphere

//const geometry = new THREE.CapsuleGeometry( 6.844, 10.382, 10, 21 )
const geometry = new THREE.SphereGeometry( 6, 32, 10)
const material = new THREE.MeshNormalMaterial( {
    color: 0x4432a8, 
});
const torus = new THREE.Mesh( geometry, material );

scene.add(torus)

torus.position.z = 10;
torus.position.setX(0);

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls( camera, renderer.domElement);

function animate(){
    requestAnimationFrame( animate );

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    controls.update();

    renderer.render( scene, camera);
}




animate()