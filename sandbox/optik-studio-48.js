// reference
// https://github.com/NekoStark/lsystem-threejs-unifi

import './style.css';
import './easing.js';
import * as THREE from 'three';
import {map, degrees_to_radians, random, clamp, shift} from './custom_functions.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { makeNoise2D, makeNoise3D, makeNoise4D } from "open-simplex-noise";
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';
// import 'ccapture.js';

// SETTINGS
let responsive = true;
let display = false;
let pause = false;
let recording = false;
let camera_rotate = false;

// TEMPLATE SETUP --- START
let canvas, scene, camera, renderer, controls, light, frame, mesh;
let canvas_width = responsive === true ? window.innerWidth : 1080;
let canvas_height = responsive === true ? window.innerHeight : 1080;
let canvas_background = 0x000000;

let clock, time, clock_display;
let time_elapse = 0;
let time_pause = 0;
let frame_count;
let frame_percent;

let frame_total = 480;
let frame_rate = 60;

let noise_2d = makeNoise2D(Date.now());
let noise_3d = makeNoise3D(Date.now());
let noise_4d = makeNoise4D(Date.now());
// TEMPLATE SETUP --- END


// CAPTURE --- START
let capturer;
if(recording){
	capturer = new CCapture( {
		framerate: 60,
		format: 'png',
		timeLimit: 8,
		autoSaveTime: 'png',
		verbose: true
	} );
}

// CAPTURE --- END


function init(){

	if(display === true){
		clock_display = document.createElement('div');
		clock_display.className = 'clock';
		document.body.appendChild(clock_display);
	}
	
    // CANVAS
    canvas = document.querySelector('canvas.webgl');

    // SCENE 
    scene = new THREE.Scene();

    // RENDERER
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
    });
    renderer.setSize( canvas_width, canvas_height );
    renderer.setClearColor( canvas_background , 1 );
    renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.VSMShadowMap;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // CAMERA
    camera = new THREE.OrthographicCamera( 
		canvas_width / - 2, 
		canvas_width / 2, 
		canvas_height / 2, 
		canvas_height / - 2, 
		-1080, 1080 
	);
	camera.position.y = 1;
	camera.position.z = 1;
	camera.position.x = 1;
	camera.zoom = 2;
	camera.updateProjectionMatrix();
	camera.lookAt(scene.position);

    // ORBIT CONTROLS
	controls = new OrbitControls( camera, renderer.domElement );
	controls.minZoom = 2; // for orthographic
	controls.maxZoom = 12; // for orthographic
	// controls.minPolarAngle = degrees_to_radians(0); // radians
	// controls.maxPolarAngle = degrees_to_radians(90); // radians
	controls.autoRotate = camera_rotate;
	controls.autoRotateSpeed = 10;
	controls.enableDamping = true;
	controls.update();

    // RESIZE 
	if (responsive == true) {
		window.addEventListener( 'resize', onWindowResize );
	}
	
}

// PROJECT SETUP --- START

let objects = [];
let rotations = [];
let circles_count = 60;
let circles_radius = 100;
let radius = 120;
let length = 50;
let radians_min = 100;


// PROJECT SETUP --- END

function setup(){
	noise_2d = makeNoise2D(Date.now());
	noise_3d = makeNoise3D(Date.now());

	objects = [];
	rotations = [];
	circles_count = random(60, 120);
	circles_radius = 160;
	radius = random(20, 120);
	length = random(40,90);

	let angle_step = 2 * Math.PI / circles_count;

	for( let i = 0; i < circles_count; i++ ){

		const curve = new THREE.EllipseCurve(
			0,  0,            // ax, aY
			circles_radius, circles_radius,         // xRadius, yRadius
			0,  2 * Math.PI,  // aStartAngle, aEndAngle
			false,            // aClockwise
			0                 // aRotation
		);

		let colors = [];
		let division = 100;
		const points = curve.getPoints( division );
		const geometry = new THREE.BufferGeometry().setFromPoints( points );
		
		
		// set colors for each vertex point
		let size_test = 0;
		for(let i = 0; i < division + 1; i++){

			let test_valeu = map(i, length, division + 1, 0, 1);
			size_test = map(i, 0, division + 1, 0, 1);
			// let test_valeu = 1;
			const color = new THREE.Color( test_valeu, test_valeu, test_valeu );
			colors.push(color.r, color.g, color.b);

		}

		geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
		// console.log(geometry);
		
		// const material = new THREE.LineBasicMaterial( { 
		// 	color: 0xffffff,
		// 	vertexColors: true
		// } );

		const material = new MeshLineMaterial( { 
			color: 0xffffff,
			lineWidth: 1,
		} );
		
		// Create the final object to add to the scene
		// const ellipse = new THREE.Line( geometry, material );
		const line = new MeshLine();
		// const line = new MeshLine();
		line.setGeometry(geometry, p => map(p, 0.5, 1, 0, 0.8));
		// line.setPoints(geometry, p => 1 - p); 

		const ellipse = new THREE.Mesh(line, material);
		// let random_degrees = random(0,0);
		// ellipse.rotation.x = degrees_to_radians(90);
		// ellipse.rotation.y = degrees_to_radians(random_degrees);
		// rotations.push(degrees_to_radians(random(0, 360)));

		let angle =  angle_step * i;
		ellipse.position.x = radius * Math.cos(angle);
		ellipse.position.z = radius * Math.sin(angle);
		// ellipse.rotation.y = degrees_to_radians(90);
		// ellipse.rotation.set(0, 0, 0);
		// ellipse.rotateY(0.1);
		// ellipse.lookAt(0, 0, 0);
		// ellipse.rotateY(Math.PI / 2);
		ellipse.lookAt(0, 0, 0);
		// ellipse.rotateY(Math.PI / 2);

		const sign = Math.sign(ellipse.position.x);
		

		// noise
		let increment =  0.001;
		let a = i * Math.PI * 2;
		let xoff = Math.cos(a) * increment;
		let yoff = i;
		let zoff = Math.sin(a) * increment;;
		let n = noise_3d(xoff, yoff, zoff);
		
		// let rotate_angles = 0;
		// let rotate_angles = map(n, -1, 1, 0, 40);
		let offset = map(n, -1, 1, 0, 10);
		let rotate_angles = map(i, 0, circles_count, 0, 360);

		// if(sign === -1){
		// 	console.log('flip');
		// 	// rotate_angles = -180;
		// 	rotate_angles = map(i, 0, circles_count, -180 + offset / 2, 180 + offset / 2);
		// 	ellipse.rotateZ(degrees_to_radians(180));
		// }
		// console.log(rotate_angles);
		rotations.push(degrees_to_radians(rotate_angles));
		

		// Math.sign
		// The Math.sign() function is a mathematical function that returns the sign of a number, indicating whether the number is positive, negative, or zero. In JavaScript, the Math.sign() function returns one of the following values:

		

		

		// ellipse.rotateY(Math.PI / 2);


		// rotations.push(degrees_to_radians(random(0, 360)));
		// let rotate_angles = map(i, 0, circles_count, 0, 360);
		
		
		

		objects.push(ellipse);

		scene.add(ellipse);
	}

}



function render(){

	// CLOCK
	timer();

	for(let i = 0; i < circles_count; i++){

		objects[i].rotation.z = rotations[i] + map(frame_percent, 0, 1, 0, Math.PI * 2);
	}
	
	
}

function shift2(arr, direction, n) {
	for (var i = n; i > 0; --i) { (direction > 0 ? arr.unshift(arr.pop()) : arr.push(arr.shift())); }
	return arr;
 }

// https://stackoverflow.com/questions/58489884/how-to-shift-all-the-items-in-an-array-to-the-rightby-1-using-method-map
function shift3(arr, pos) {
    return arr.map((_, i, a) => a[(i + a.length - pos) % a.length]);
}

function animate(){

    requestAnimationFrame(animate);
	render();

	controls.update();
	renderer.render(scene, camera);

	// for recording --- start
	if(recording){
		if( capturer ) {
			capturer.capture( renderer.domElement )
		};
	}
	
	// for recording --- start

}

init();
setup();
animate();


// CLOCK --- START

function timer(){

	clock = renderer.info.render.frame / 200;
	time = clock;

	if (!pause) {
		// play
		time = clock - time_elapse;
	} else {
		// pause
		time_elapse = clock - time_pause;
		time = time_pause;
	}

	let time_to_frame = Math.floor(time * 200);
	frame_percent = (time_to_frame % frame_total) / frame_total;
	frame_count = Math.round(frame_percent * frame_total);


	if(display === true ) clock_display.innerHTML = `
		<div>Clock: `+clock+`</div>
		<div>Frame Rate: `+frame_rate+`</div>
		<div>Frame: `+frame_total+`</div>
		<div>Frame Count: `+frame_count+`</div>
		<div>Percent: `+frame_percent+`</div>
		<div>Pause: `+pause+`</div>
		`;

}

// CLOCK --- END




// KEYBOARD CONTROLS --- START

function key_press(e){

	// key R
	if(e.keyCode === 82) regenerateScene();
	

	// key P
	if( e.keyCode === 80) pauseScene();


	// key c
	if(recording){
		if(e.keyCode === 67) captureScene();
	}
	
}

function captureScene(){
	capturer.start();
}

function pauseScene(){
	
	if (pause === true) {
		// play
		pause = false;

	} else {
		// pause
		pause = true;
		time_pause = time;
		time_elapse = 0;
	}
}

function regenerateScene(){

	let selectedObject = scene.getObjectByName('tree');
	console.log(scene);
	scene.remove( selectedObject );

	// // CLEAR ALL OBJECTS
	const meshes = [];
	scene.traverse(function (object){

		if (object.isLine) {
			meshes.push(object);
		}

		if (object.isMesh) {
			meshes.push(object);
		}
	})

	for ( let i = 0; i < meshes.length; i ++ ) {
		const mesh = meshes[ i ];
		mesh.material.dispose();
		mesh.geometry.dispose();
		scene.remove( mesh );
	}
	// // CLEAR ALL OBJECTS

	setup();

}

document.addEventListener('keydown', key_press);

// KEYBOARD CONTROLS --- END



// WINDOW --- START

function onWindowResize() {

	let aspect = window.innerWidth / window.innerHeight;

	// orthpgraphic camera ---
	camera.left = window.innerWidth / - 2;
	camera.right = window.innerWidth / 2;
	camera.top = window.innerHeight / 2;
	camera.bottom = window.innerHeight / - 2;

	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

// WINDOW --- END
