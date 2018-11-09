
import _ from 'lodash';
import {print} from './utils.js';
import Scene from './wrappers/scene'
import Set from './set'
import TopDownController from './top-down-controller.js';
import Player from './player.js';
import Mesh from './wrappers/mesh'
import Camera from './wrappers/camera'

let prevTime = performance.now();

let set = new Set();
let scene = new Scene();
let camera = new Camera();



var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xffffff );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
cube.position.x = 2;
scene.add( cube );

var geometry = new THREE.PlaneGeometry( 1, 1, 0);
var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
scene.add( plane );

//camera.position.z = 5;

let controller = new TopDownController();

let player = new Player();
player.addProp({
	type: "Mesh",
	object: plane
})
player.addProp({
	type: "Camera",
	object: camera
})

set.registerActor(player) 

set.registerSystem(controller)

var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

let animate = function() {
	requestAnimationFrame( animate );

	let time = performance.now();
	var delta = ( time - prevTime ) / 1000;

	//stats.begin();

	set.update(delta);

	renderer.render( scene, camera );

	//stats.end();

	prevTime = time;

	};

animate();


window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}