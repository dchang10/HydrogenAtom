import React from 'react';
import * as WaveFunctions from './WaveFunction';
const $ = require('jquery');
const THREE = require('three')
const OrbitControls = require('three-orbit-controls')(THREE)

var animate;
var onResize;

export default class OrbitalViewer extends React.Component{
    constructor(props){
        super(props);
        this.scenes = [];
        for(let scene = 0; scene < 2; scene++){
            this.scenes.push(new THREE.Scene());
        }
        this.axesCamera = null; //camera for axes
        this.modelCamera = null;//camera for model
        this.renderers = [];
        this.enableRotation = true;
        this.angle = 0;

        for(let scnRenderer = 0; scnRenderer < 2; scnRenderer++){
            this.renderers.push(new THREE.WebGLRenderer({alpha:true}));
        }
        
    }
    componentDidMount(){
        let modelContainer = $("#model-container").get(0);
        modelContainer.style.width = 0.65 * window.innerWidth + 'px';
        modelContainer.style.height = 0.35 * window.innerWidth + 'px';
        this.modelCamera = new THREE.PerspectiveCamera(75, modelContainer.offsetWidth 
                / modelContainer.offsetHeight, 0.1, 1000);
        this.renderers[0].setSize(modelContainer.offsetWidth, modelContainer.offsetHeight);
        this.renderers[0].domElement.style.zIndex = "0";
        modelContainer.appendChild(this.renderers[0].domElement);

        let vertexShader = `
            attribute float alpha;
            varying float vAlpha; 
            attribute float size; 
            attribute vec3 customColor; 
            varying vec3 vColor; void main() { 
                vAlpha = alpha; vColor = customColor; 
                vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 ); 
                gl_PointSize = size * ( 400.0 / -mvPosition.z ); gl_Position = projectionMatrix * mvPosition; 
            }
            `;

        let fragmentShader = `
            varying float vAlpha; 
            varying vec3 vColor; void main() {
                float r = 0.0; 
                vec2 cxy = 2.0 * gl_PointCoord - 1.0; 
                r = dot(cxy, cxy); 
                if (r > 1.0) { 
                    discard; 
                } gl_FragColor = vec4( vColor, vAlpha ); 
            }
            `; 

        this.shaderMaterial = new THREE.ShaderMaterial({
            uniforms: {color: { type: "c", value: new THREE.Color(0xffffff) }},
            vertexShader:  vertexShader,
            fragmentShader: fragmentShader,
            //blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true
        });


        this.resolution = 45;
        this.range = 5;
        this.n = 1;
        this.l = 0;
        this.m = 0;
        this.cameraOffset = 10;
        this.modelCamera.position.z = this.cameraOffset;
        this.modelCamera.position.x = 0;
        this.modelCamera.position.y = 0;
        let posArr = WaveFunctions.simpsonIntegrate(WaveFunctions.n1l0m0, -this.range, this.range, -this.range, this.range, -this.range, this.range, this.resolution);

        this.geometry = new THREE.BufferGeometry();

        this.geometry.addAttribute('size', new THREE.BufferAttribute(this.cubeSize(this.resolution, posArr), 1));
        this.geometry.addAttribute('position', new THREE.BufferAttribute(this.cubePos(posArr), 3)); 
        this.geometry.addAttribute('customColor', new THREE.BufferAttribute(this.cubeCol(posArr), 3)); 
        this.geometry.addAttribute('alpha', new THREE.BufferAttribute(this.cubeAlpha(posArr), 1)); 
        this.particleSystem = new THREE.Points(
            this.geometry, this.shaderMaterial);


        this.scenes[0].add(this.particleSystem);
        this.nucleus = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 10), new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: false }));

        this.scenes[0].add(this.nucleus);


        this.controls = new OrbitControls(this.modelCamera, this.renderers[0].domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.noPan = true;

        //---------------------------------------------------------------Axes View
        this.axesCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        this.renderers[1].setSize(modelContainer.offsetWidth/10, modelContainer.offsetWidth/10);
        this.renderers[1].domElement.style.zIndex = "1";
        this.renderers[1].domElement.style.position ="absolute";
        this.renderers[1].domElement.style.bottom ="0";
        this.renderers[1].domElement.style.right ="0";
        this.renderers[1].setClearColor(0x000000, 0.0);


        modelContainer.appendChild(this.renderers[1].domElement);
        let arrowHead = [];
        for(let i = 0; i < 3; i++){
            arrowHead.push(new THREE.Mesh(new THREE.CylinderGeometry(0, 0.5, 1, 32), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: false })));
        }
        var arrowTail = [];
        for(let i = 0; i < 3; i++){
            arrowTail.push(new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 4, 32), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: false })));
            arrowTail[i].position.set(0,-2,0);
        }
        this.axesCamera.position.z = 10;
        this.axesCamera.position.x = 0;
        this.axesCamera.position.y = 0;

        let arrow = [];
        for(let i = 0; i < 3; i++){
            arrow.push(new THREE.Group());
            arrow[i].add(arrowHead[i]);
            arrow[i].add(arrowTail[i]);
        }
        arrow[0].position.set(0,4,0);
            arrow[1].rotation.set(0,0,-Math.PI/2);
            arrow[1].position.set(4,0,0);
            arrow[2].rotation.set(Math.PI/2,0,0);
            arrow[2].position.set(0,0,4);

            var axes = new THREE.Group();
            arrow.forEach( e=>{axes.add(e)
            });
            axes.position.set(0,0,0);

        this.scenes[1].add(axes);
        this.axescontrols = new OrbitControls(this.axesCamera, this.renderers[0].domElement);
        this.axescontrols.enableDamping = true;
        this.axescontrols.dampingFactor = 0.25;
        this.axescontrols.enableZoom = false;
        this.axescontrols.noPan = true;
       //-----------------------------------------------------Event Listener for resize 
        this.defonResize();
        window.addEventListener('resize', onResize, false);
        $('#model-container').mousedown(e => { this.enableRotation = false; });
        $('#model-container').mouseup(e => {    
            this.enableRotation = true;
            let z = this.modelCamera.position.z;
            let x = this.modelCamera.position.x;
            this.angle = Math.atan(z / x) -  Math.PI * (x < 0);
          });

        this.defanimate();
        animate();

    }

    defonResize() {
        onResize = ()=>{
            let modelContainer = $("#model-container").get(0);
            modelContainer.style.width = 0.65 * window.innerWidth + 'px';
            modelContainer.style.height = 0.35 * window.innerWidth + 'px';
            this.modelCamera.aspect = modelContainer.offsetWidth / modelContainer.offsetHeight;
            this.modelCamera.updateProjectionMatrix();
            this.renderers[0].setSize(modelContainer.offsetWidth, modelContainer.offsetHeight);
            this.renderScenes();
        }
    }

    renderScenes() {
        
        this.renderers[0].render(this.scenes[0], this.modelCamera);
        this.renderers[1].render(this.scenes[1], this.axesCamera);
    }
    defanimate(){
        animate = ()=>{
            requestAnimationFrame(animate);
            this.controls.update();
            this.axescontrols.update();
            this.renderScenes();
            let z = this.modelCamera.position.z;
            let x = this.modelCamera.position.x;
            let y = this.modelCamera.position.y;
            let z1 = this.axesCamera.position.z;
            let x1 = this.axesCamera.position.x;
            let r = Math.sqrt(z * z + x * x);
            let p = Math.sqrt(z1 * z1 + x1 * x1);
            if (this.enableRotation) {
                this.modelCamera.position.z = r * Math.sin(this.angle);
                this.modelCamera.position.x = r * Math.cos(this.angle);
                this.axesCamera.position.z = p * Math.sin(this.angle);
                this.axesCamera.position.x = p * Math.cos(this.angle);
                this.angle += 0.01;
            }
        }
    }
    cubePos(posArr) { //Creates float arr vertices
        let positions = new Float32Array(posArr.length * 3);
        for (let i = 0; i < posArr.length; i++) {
            let t = 3 * i;
            positions[t] = posArr[i][0] + 1.75 * Math.random() * this.range / this.resolution;
            positions[t + 1] = posArr[i][1] + 1.75 * Math.random() * this.range / this.resolution;
            positions[t + 2] = posArr[i][2] + 1.75 * Math.random() * this.range / this.resolution;
        }
        return positions;
    }

    cubeCol(posArr) {
        let colors = new Float32Array(posArr.length * 3);
        for (let i = 0; i < posArr.length; i++) {
            let color = new THREE.Color(posArr[i][4]);
            let t = 3 * i;
            colors[t] = color.r;
            colors[t + 1] = color.g;
            colors[t + 2] = color.b;
        }
        return colors;
    }

    cubeAlpha(posArr) {
        let alphas = new Float32Array(posArr.length);
        let max = 0;
        for (let i = 0; i < posArr.length; i++) {
            let temp = posArr[i][3];
            if (temp > max)
                max = temp;
            alphas[i] = temp;
        }
        //if (l > 0)
        //    return alphas.map(e => e / (5 * parseInt(l) * max));
        return alphas.map(e => e / (0.25 * max + 1.75 * max * (this.l > 0)));
    }


    cubeSize(resolution, posArr) {
        let sizes = new Float32Array(posArr.length);
        for (let i = 0; i < posArr.length; i++) {
            sizes[i] = this.range / this.resolution;
        }
        return sizes;
    }

    render() {
        return(
            <div id='model-container' className={this.props.className}/>
          );
    }
}
