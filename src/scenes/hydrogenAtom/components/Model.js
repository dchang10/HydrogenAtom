import $ from 'jquery';
import React from 'react';
import * as WaveFunctions from './WaveFunction';
const THREE = require('three')
const OrbitControls = require('three-orbit-controls')(THREE)

let vertexShader = `
    attribute float alpha;
    varying float vAlpha; 
    attribute float size; 
    attribute vec3 customColor; 
    varying vec3 vColor; void main() { 
        vAlpha = alpha; vColor = customColor; 
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 ); 
        gl_PointSize = size * ( 250.0 / -mvPosition.z ); gl_Position = projectionMatrix * mvPosition; 
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


export default class Model extends React.Component{
    constructor(props){
        super(props);

        this.state = {n:1, l:0, m:0, equation: WaveFunctions.n1l0m0, resolution: 45};
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.animate = this.animate.bind(this);
        this.onResize = this.onResize.bind(this);
        this.scenes = [];
        this.orbitalScene = new THREE.Scene();
        this.axisScene= new THREE.Scene();
        this.axisRenderer = new THREE.WebGLRenderer({alpha:true});
        this.enableRotation = true;
        this.angle = 0;
    }

    reload() {
        this.enableRotation = true;

        this.cameraOffset = 5 + 5 * Math.pow(this.props.n, 2) + 10 * this.props.l;

        let waveFunc = "n" + this.props.n + "l" + this.props.l + "m";
        if (this.props.m > 0)
            waveFunc += 'Pos';
        else if (this.props.m < 0)
            waveFunc += 'Neg';
        waveFunc += Math.abs(this.props.m);

        let temp = 2 * this.props.n * this.props.n
        this.range = 3 + temp + 6 * this.props.l
        this.resolution = this.props.resolution;//this.range + 39;//42 + temp;


        let posArr = WaveFunctions.simpsonIntegrate(WaveFunctions.getFunc(waveFunc)/*eval(waveFunc)*/, -this.range, this.range, -this.range, this.range, -this.range, this.range, this.resolution);

        this.geometry.addAttribute('size', new THREE.BufferAttribute(this.cubeSize(this.resolution, posArr), 1));
        this.geometry.addAttribute('position', new THREE.BufferAttribute(this.cubePos(posArr), 3));
        this.geometry.addAttribute('customColor', new THREE.BufferAttribute(this.cubeCol(posArr), 3));
        this.geometry.addAttribute('alpha', new THREE.BufferAttribute(this.cubeAlpha(posArr), 1));

        this.particleSystem = new THREE.Points(this.geometry, this.shaderMaterial);
        
        this.modelCamera.position.z = this.cameraOffset;
        this.modelCamera.position.x = 0;
        this.modelCamera.position.y = 0;
        this.axesCamera.position.z = 10;
        this.axesCamera.position.x = 0;
        this.axesCamera.position.y = 0;
        


        //reloadChart();
    }
    componentDidMount(){

        this.orbitalRenderer = new THREE.WebGLRenderer({canvas:document.getElementById('my-canvas'), resize:true});
        let w = $('#model-container').width();
        let h = $('#model-container').height();
        this.modelCamera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
        this.orbitalRenderer.setSize(w, h);
        this.orbitalRenderer.domElement.style.zIndex = "0";
        this.mount.appendChild(this.orbitalRenderer.domElement);

        this.shaderMaterial = new THREE.ShaderMaterial({
            uniforms: {color: { type: "c", value: new THREE.Color(0xffffff) }},
            vertexShader:  vertexShader,
            fragmentShader: fragmentShader,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true
        });


        this.resolution = 45;
        this.range = 5;

        this.cameraOffset = 10;
        this.modelCamera.position.z = this.cameraOffset;
        this.modelCamera.position.x = 0;
        this.modelCamera.position.y = 0;
        let posArr = WaveFunctions.simpsonIntegrate(this.state.equation, -this.range, this.range, -this.range, this.range, -this.range, this.range, this.resolution);

        this.geometry = new THREE.BufferGeometry();

        this.geometry.addAttribute('size', new THREE.BufferAttribute(this.cubeSize(this.resolution, posArr), 1));
        this.geometry.addAttribute('position', new THREE.BufferAttribute(this.cubePos(posArr), 3)); 
        this.geometry.addAttribute('customColor', new THREE.BufferAttribute(this.cubeCol(posArr), 3)); 
        this.geometry.addAttribute('alpha', new THREE.BufferAttribute(this.cubeAlpha(posArr), 1)); 
        this.particleSystem = new THREE.Points(
            this.geometry, this.shaderMaterial);


        this.orbitalScene.add(this.particleSystem);
        this.nucleus = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 10), new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: false }));

        this.orbitalScene.add(this.nucleus);


        this.controls = new OrbitControls(this.modelCamera, this.orbitalRenderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.enablePan = false;

        //---------------------------------------------------------------Axes View
        this.axesCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        this.axisRenderer.setSize(w/10, w/10);
        this.axisRenderer.domElement.style.zIndex = "1";
        this.axisRenderer.domElement.style.position ="absolute";
        this.axisRenderer.domElement.style.bottom ="0";
        this.axisRenderer.domElement.style.right ="0";
        this.axisRenderer.setClearColor(0x000000, 0.0);


        this.mount.appendChild(this.axisRenderer.domElement);
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

        this.axisScene.add(axes);
        this.axescontrols = new OrbitControls(this.axesCamera, this.orbitalRenderer.domElement);
        this.axescontrols.enableDamping = true;
        this.axescontrols.dampingFactor = 0.25;
        this.axescontrols.enableZoom = false;
        this.axescontrols.ebablePan = false;
       //-----------------------------------------------------Event Listener for resize 
        window.addEventListener('resize', this.onResize, false);
        
        this.start();

    }

    componentWillUnmount() {
        window.removeEventListener('resize',this.onResize);
        return;

    }
    onResize (){
        let w = $('#model-container').width();
        let h = $('#model-container').height();

        this.modelCamera.aspect = w / h;
        this.modelCamera.updateProjectionMatrix();
        this.orbitalRenderer.setSize(w, h);
        this.axisRenderer.setSize(w/10, w/10);
        this.renderScenes();
    }

    renderScenes() {
        this.orbitalRenderer.render(this.orbitalScene, this.modelCamera);
        this.axisRenderer.render(this.axisScene, this.axesCamera);
    }

    start(){
        if(!this.frameId){
            this.reload();
            this.frameId = requestAnimationFrame(this.animate);
        }
    }
    stop(){
        cancelAnimationFrame(this.frameId);
    }
    animate (){
        
        this.frameId = requestAnimationFrame(this.animate);
        this.controls.update();
        this.axescontrols.update();
        this.renderScenes();
        let z = this.modelCamera.position.z;
        let x = this.modelCamera.position.x;
        let z1 = this.axesCamera.position.z;
        let x1 = this.axesCamera.position.x;
        let r = Math.sqrt(z * z + x * x);
        let p = Math.sqrt(z1 * z1 + x1 * x1);
        if (this.enableRotation) {
            this.modelCamera.position.z = r * Math.sin(this.angle);
            this.modelCamera.position.x = r * Math.cos(this.angle);
            this.axesCamera.position.z = p * Math.sin(this.angle);
            this.axesCamera.position.x = p * Math.cos(this.angle);
            this.angle += 0.001;
        }
        if(
            this.state.n !== this.props.n 
            || this.state.l !== this.props.l 
            || this.state.m !== this.props.m
            || this.state.resolution !== this.props.resolution
        ){
            this.setState({n:this.props.n, l:this.props.l, m:this.props.m, resolution:this.props.resolution});
            this.reload();
        }
    }
    cubePos(posArr) { //Creates float arr vertices
        let positions = new Float32Array(posArr.length * 3);
        for (let i = 0; i < posArr.length; i++) {
            let t = 3 * i;
            let scale = 1.75 * this.range / this.resolution;
            positions[t] = posArr[i][0] + Math.random() * scale; 
            positions[t + 1] = posArr[i][1] + Math.random() * scale;
            positions[t + 2] = posArr[i][2] + Math.random() * scale
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
        return alphas.map(e => e / ((0.15 + 0.35 * (this.props.l > 0)) * max));
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
            <div id='model-container' ref={(mount)=>{this.mount=mount}} className={this.props.className} style={{lineHeight:0}}>
                <canvas id='my-canvas' canvas="true" resize="true"/>
            </div>

          );
    }
}
