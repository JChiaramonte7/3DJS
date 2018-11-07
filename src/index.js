import _ from 'lodash';
import {print} from './utils.js';
import TopDownController from './top-down-controller.js';

let prevTime = performance.now();

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

let controller = new TopDownController(camera);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xffffff );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
cube.position.x = 2;
scene.add( cube );

camera.position.z = 5;

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

let animate = function() {
	requestAnimationFrame( animate );

	stats.begin();

	let time = performance.now();
	var delta = ( time - prevTime ) / 1000;

	controller.update(delta);

	renderer.render( scene, camera );

	stats.end();

	prevTime = time;

	};

animate();