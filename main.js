import './style.css'

import * as THREE from 'three';

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';



const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera);





//capsule

//const geometry = new THREE.CapsuleGeometry( 6.844, 10.382, 10, 21 )
const geometry = new THREE.SphereGeometry( 6, 32, 10)
const material = new THREE.MeshNormalMaterial( {
    color: 0x4432a8, 
});
const torus = new THREE.Mesh( geometry, material );

scene.add(torus)

torus.position.z = 10;
torus.position.setX(-10);

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper)

const controls = new OrbitControls( camera, renderer.domElement);

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff})
    const star = new THREE.Mesh(geometry, material);

    const[x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));

    star.position.set(x,y,z);
    scene.add(star)
}

Array(200).fill().forEach(addStar)


const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;



// Avatar

const usenTexture = new THREE.TextureLoader().load('usen.png');

const usen = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial({ map: usenTexture})
);

scene.add(usen);


// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture,
    })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(10);


//astronaut
const loader = new GLTFLoader()
loader.load('scene.gltf', function(glb){
    console.log(glb)
    const astronaut = glb.scene;
    astronaut.position.z = 30;
    astronaut.position.setX(-10);
    astronaut.scale.set(5, 5, 5);
    scene.add(astronaut);
}, function(xhr){
    console.log((xhr.loader/xhr.total * 100) + "% loaded")
}, function(error){
    console.log('An error occured')

});



function moveCamera(){

    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;
  
    usen.rotation.y += 0.01;
    usen.rotation.z += 0.01;

    //loader.rotation.y += 0.01;
    //loader.rotation.z += 0.01;
  
    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;

}

document.body.onscroll = moveCamera


function animate(){
    requestAnimationFrame( animate );

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    //astro.rotation.x += 0.01;
    //astro.rotation.y += 0.005;
   // astro.rotation.z += 0.01;

    controls.update();

    renderer.render( scene, camera);
}




animate()