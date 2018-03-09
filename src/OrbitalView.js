import OrbitalViewer from './OrbitalViewer.js';
import Graph from './Graph.js';
import './css/hydrogen.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import OrbitalViewerControls from './OrbitalViewerPanel.js';
require("jquery/package.json");
require('popper.js/package.json');
const React = require('react');
const $ = require('jquery');

var reload;


export default class OrbitalView extends React.Component{
    constructor(props){
        super(props);
        this.state = {n:1, l:0, m:0};
    }

    componentWillMount(){
        this.defreload();
    }

    defreload() {
   /*     enableRotation = true;

        cameraOffset = 5 + 5 * Math.pow(n, 2) + 10 * l;

        var waveFunc = "n" + n + "l" + l + "m";
        if (m > 0)
            waveFunc += 'Pos';
        else if (m < 0)
            waveFunc += 'Neg';
        waveFunc += Math.abs(m);

        $('#equation').html("$$\\psi(r,\\theta,\\phi)=" + eval('w' + waveFunc) + "$$");
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "equation"]);
        $('#radial-equation').html("$$R(r)=" + eval('wr' + parseInt(n) + l) + "$$");
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "radial-equation"]);
        range = 3 + 2 * n * n + 6 * l
        resolution = 42 + 3 * n * n;


        var posArr = simpsonIntegrate(eval(waveFunc), -range, range, -range, range, -range, range, resolution);

        geometry.addAttribute('size', new THREE.BufferAttribute(cubeSize(resolution, posArr), 1));
        geometry.addAttribute('position', new THREE.BufferAttribute(cubePos(posArr), 3));
        geometry.addAttribute('customColor', new THREE.BufferAttribute(cubeCol(posArr), 3));
        geometry.addAttribute('alpha', new THREE.BufferAttribute(cubeAlpha(posArr), 1));

        particleSystem = new THREE.Points(geometry, shaderMaterial);
        modelCamera.position.z = cameraOffset;
        modelCamera.position.x = 0;
        modelCamera.position.y = 0;
        axesCamera.position.z = 10;
        axesCamera.position.x = 0;
        axesCamera.position.y = 0;


        reloadChart();*/
        reload = ()=> {alert('reload');}
    }
    render(){
        return(
            <div className='row' style={{backgroundColor:'black'}}>
                <div className='col-lg-12'>
                    <h2 align={"center"} style={{fontWeight:'bold',color:'white',mixBlendMode:'screen',MarginBottom:'0px'}}>Hydrogen Atomic Orbital Viewer</h2>
                </div> 
                <OrbitalViewer className='col-sm-8'/>
                <div className='col-sm-4'>
                    <OrbitalViewPanel/>
                    <Graph maxX = {10} maxY={2} minX={0} minY={-2} unitsPerTick={1} range ={5} unitX={1}/>
                </div>
                <div className="col-lg-8">
                    <p id="equation" style={{fontSize: '1.5em'}}> howdy</p>
                </div>
                <div className='col-md-1'>
                    <p style={{fontFamily:'Bubbler One, sans-serif', fontSize:'12pt', color:'white'}}>Instructions: </p>
                </div>
                <div class='col-md-3'>
                    <ul>
                        <li>Scroll to zoom</li>
                        <li>Click and drag to rotate orbital</li>
                        <li>
                            Select quantum numbers and click 'Load Orbital' to load new orbitals
                        </li>
                    </ul>
                </div>
            </div>
                );
    }
}
