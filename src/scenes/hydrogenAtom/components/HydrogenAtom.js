import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import MathJax from 'react-mathjax2';
import React, { Component, Fragment } from 'react';
import Model from './Model.js';
import Graph from './Graph.js';
import ControlPanel from './ControlPanel.js';
import * as  WaveFunctions from './WaveFunction';
import '../css/hydrogen.css';
import atom from '../images/atom.svg';

function Banner(){
    return(
        <div className="row" style={{positon:'relative', borderStyle:'hidden hidden solid hidden',borderWidth:'0px 0px 0.3em 0px', height:'25em', 
                backgroundPosition:'50% 50%', backgroundSize:'30em',
                backgroundColor:'gray', backgroundImage: `url(${atom})`,
                backgroundRepeat:'no-repeat', opacity:'0.8'}}>
                <h1 className="blend-title box-title" align='center' style={{position:'absolute', top: '3.08em',
    left: '50%', msTransform: 'translate(-50%, -50%)', transform: 'translate(-50%, -50%)'}}> The Hydrogen Atom</h1>
        </div>
        );
}

function BohrRadius(){
    return(
        <Fragment>
            <div className="row" style={{paddingTop: '5em'}}>
                <div className="col-lg-4"/>
                <div className="col-lg-4">
                    <MathJax.Context input={'tex'}>
                        <h3 align="center" className="box-title-2">
                            <MathJax.Node>{'a_0=\\frac{4\\pi\\,\\hbar^2\\,\\epsilon_0}{\\mu\\,e^2}'}</MathJax.Node>
                        </h3>
                    </MathJax.Context>
                </div>
                <div className="col-lg-4"></div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <h2 align="center" style={{fontWeight:'bold', color:'#AC2B37'}}>
                        The Bohr Model
                    </h2>
                </div>
            </div>
        </Fragment>
        );
}
function BohrInfo(){
    return(
        <div className="row" style={{paddingTop: "3em"}}>
            <div className="col-lg-2"/>
            <div className="col-lg-8">
                <MathJax.Context input={'tex'}>
                    <p>
                        <span className="drop-caps" align="center">P</span>hysics took a turn near the begining of the twentieth century. 1897 marked the year physicist J.J. Thomson discovered the electron, and 1911 was the year the nucleus was discovered through the famous <a href="https://en.wikipedia.org/wiki/Geiger%E2%80%93Marsden_experiment">Geiger-Marsden Experiment</a>. The leading atomic model at the time was the Rutherford atomic model, which predicted electron orbits around the nucleus to be similar to the orbits of celestial bodies around the sun. This model however had a few problems associated with it, most notably :-
                    </p>
                </MathJax.Context>
                    <p style={{padding: "1em 5em 1em 5em"}}>
                        {"Maxwell's Equations predict that the motion of an electron around the nucleus of an atom would produce electromagnetic radiation, which would result in energy loss of the electron over time. As a result of this energy loss, the electron would eventually spiral into the nucleus as it orbits the atom."}
                    </p>
                <MathJax.Context input={'tex'}>
                    <p>
                        {"The first attempt to rectify this problem was made by Niels Bohr in 1913. Bohr's atomic model predicted \"layers\" of atomic orbitals by which electrons were only allowed to have circular orbits at certain fixed distances away from the nucleus. The result of this was that electron could only gain and lose angular momentum in amounts quantized by "}
                        <MathJax.Node inline>{'\\hbar = 6.582119514×10^{−16} eV\\,s'}</MathJax.Node>
                        {". Furthermore there would be a minimum orbit which electrons are allowed to fall into, making it impossible for electrons to fall into the nucleus. From this Bohr was able to predict the atomic radius of the Hydrogen atom and energies of the orbitals with some simple math and basic physics shown below."}
                    </p>
                </MathJax.Context>
                <MathJax.Context input={'tex'}>
                <p>
                    {"With angular momentum "}
                    <MathJax.Node>{'l = n\\hbar'}</MathJax.Node>
                    {", where "}
                    <MathJax.Node inline>{"n \\geq 1"}</MathJax.Node>
                    {" is an integer. Then for circular orbit, it is requaired that twice the negative of the kinetic energy be equal to the potential energy. That is "}
                    <MathJax.Node>{"2E_K=-E_P"}</MathJax.Node>
                    {" Since the orbit is circular, all of the kinetic energy results from the hydrogen atom's angular momentum. So "}
                    <MathJax.Node>{"E_K=\\frac{l^2}{2\\,\\mu\\,r^2}=\\frac{n^2\\,\\hbar^2}{2\\,\\mu\\,r^2}"}</MathJax.Node> 
                    {"where "}
                    <MathJax.Node inline>{"\\mu=\\frac{m_e\\,m_p}{m_e+m_p}"}</MathJax.Node>
                    {" is the atom's reduced mass, with "}
                    <MathJax.Node inline>{"m_e"}</MathJax.Node>
                    {" and "}
                    <MathJax.Node inline>{"m_p"}</MathJax.Node>
                    {" being the mass of the electron and proton respectively. All that is needed now is the potential energy of the atoms which is given by Coulumb's law which says that "}
                    <MathJax.Node inline>{"E_P=-\\frac{e^2}{4\\pi\\,\\epsilon_0\\,r^2}"}</MathJax.Node>
                    {", where "}
                    <MathJax.Node inline>{"r"}</MathJax.Node>
                    {" is the radius of orbit.Then after some algebra, the orbiting radius is found to be "}
                    <MathJax.Node>{"r = \\frac{4\\pi\\,n^2\\,\\hbar^2\\,\\epsilon_0}{\\mu\\,e^2}"}</MathJax.Node>
                    {" The Bohr radius is given for the case of "}
                    <MathJax.Node inline>{"n=1"}</MathJax.Node>
                    {", which is generally thought of as the radius of the Hydrogen atom "}
                    <MathJax.Node>{"a_0=\\frac{4\\pi\\,\\hbar^2\\,\\epsilon_0}{\\mu\\,e^2}"}</MathJax.Node>
                    {"Using that the total energy is "}
                    <MathJax.Node>{"E_T=E_K+E_P=-E_K"}</MathJax.Node>
                    {" one can then find the energy of each orbital which is "}
                    <MathJax.Node>{"E_T= - \\frac{l^2}{2\\mu\\, r^2}=-\\frac{e^4\\,\\mu}{32\\pi^2\\,\\hbar^2\\,{\\epsilon_0}^2}\\approx - 13.6\\,eV"}</MathJax.Node>
                </p>
                </MathJax.Context>
            </div>
            <div className="col-lg-2"/>
        </div>
        );
}
function SchrodingerEquation(){
    return(
        <Fragment>
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <MathJax.Context input={'tex'}>
                        <h3 align="center" className="box-title-2">
                            <MathJax.Node inline>{"\\frac{-\\hbar^2}{2m}\\nabla^2\\psi+V\\,\\psi=i\\hbar\\frac{\\partial}{\\partial\\,t}\\psi"}</MathJax.Node>
                        </h3>
                    </MathJax.Context>
                </div>
                <div className="col-lg-4"></div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <h2 align="center" style={{fontWeight:'bold',color:'#AC2B37'}}>
                        The Schrödinger Equation
                    </h2>
                </div>
            </div>
        </Fragment>
        );
}
function SchrodingerInfo(){
    return(
        <div className="row">
            <div className="col-lg-2">
            </div>
            <div className="col-lg-8">
                <MathJax.Context input={'tex'}>
                    <p>
                        <span className="drop-caps">{"E"}</span>
                        {"ven after the Bohr Model of the Hydrogenic (Hydrogen like) atom, Quantum Mechanics was still in its infancy. The next major step came with the prediction of particle-wave duality by "}
                        <a href="https://en.wikipedia.org/wiki/Louis_de_Broglie">{"Louis de Broglie."}</a>
                        {" Using intuition of the paticle wave duality of light, de Broglie hypothesised that the momenta and energy of all particles are related to their wavelengths and frequencies by "}
                        <MathJax.Node>
                            {"p=\\hbar k\\qquad\\qquad\\qquad\\text{and}\\qquad\\qquad\\qquad E=\\hbar\\nu"}
                        </MathJax.Node>
                        {" de Broglie was later vindicated by the "}
                        <a href="https://en.wikipedia.org/wiki/Davisson%E2%80%93Germer_experiment">
                            {"Davisson-Germer experiment"}
                        </a>
                        {" which displayed the wave like nature of the electron."}
                    </p>
                </MathJax.Context>
                <MathJax.Context input={'tex'}>
                    <p>
                        {"After de Broglie, physicist Peter Debye supposedly made a comment that if particles behaved like waves, then they should satisfy some wave equation. This comment inspired "}
                        <a href="https://en.wikipedia.org/wiki/Schrödinger_equation">
                            {"Erwin Schrödinger's"}
                        </a>{" efforts for the search of a wave equation. Schrödinger first examined the relatatistic energy momentum relationship and developed a wave equation such that standing waves would satisfy the de Broglie relation. The resulting equation—;now known as the Klein-Gordon equation—;resulted in energy states that did not correctly predict "}
                        <a href="https://en.wikipedia.org/wiki/Arnold_Sommerfeld">
                            {"Arnold Sommerfeld's"}
                        </a>{" correction to the Bohr atom. "}
                        <MathJax.Node>
                            {"{\\frac {1}{c^{2}}}{\\frac {\\partial ^{2}}{\\partial t^{2}}}\\psi -\\nabla ^{2}\\psi +{\\frac {m^{2}c^{2}}{\\hbar ^{2}}}\\psi =0"}
                        </MathJax.Node>
                            {" As a result, Schrödinger abandoned this attempt and secluded himself in a mountain cabin where he continued his efforts on a non-relativistic equation which he later published in 1926. "}
                        <MathJax.Node>
                            {"\\frac{-\\hbar^2}{2m}\\nabla^2\\psi+V\\,\\psi=i\\hbar\\frac{\\partial}{\\partial\\,t}\\psi"}
                        </MathJax.Node>
                    </p>
                </MathJax.Context>
                <MathJax.Context input={'tex'}>
                    <p> 
                        {"From the Schrödinger equation, it became possible to solve for the functions "}
                    <MathJax.Node inline>
                        {"\\psi"}
                    </MathJax.Node>
                    {" whose amplitude square describe the probabilities of finding electron at various points in space. This gave rise to the modern model of the hydrogen atom where electrons are imagined as clouds around the nucleus instead of as a particle orbitting around it. "}
                    </p>
                </MathJax.Context>
                <p>
                    {" These electron clouds take varying shapes and result in interesting geometries. 3D models of the electron orbitals are shown below along with their respective wavefunctions a plot of the radial graph is shown along side the model."}
                </p>
            </div>
            <div className="col-lg-2">
            </div>
        </div>        
        );
}
function Footer(){
    return(
        <footer id="my-footer" className="container-fluid">
            <div className="row">
                <div className="col-lg-12 card-footer">
                    <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 0 300 53">
                        <g id="git">
                            <circle xmlns="http://www.w3.org/2000/svg" cx="24" cy="24" fill="transparent" stroke='transparent' strokeWidth="3px" r="24" />
                            <path d="M 296.133 354.174 c 49.885 -5.891 102.942 -24.029 102.942 -110.192 c 0 -24.49 -8.624 -44.448 -22.67 -59.869 c 2.266 -5.89 9.515 -28.114 -2.734 -58.947 c 0 0 -18.139 -5.898 -60.759 22.669 c -18.139 -4.983 -38.09 -8.163 -56.682 -8.163 c -19.053 0 -39.011 3.18 -56.697 8.163 c -43.082 -28.567 -61.22 -22.669 -61.22 -22.669 c -12.241 30.833 -4.983 53.057 -2.718 58.947 c -14.061 15.42 -22.677 35.379 -22.677 59.869 c 0 86.163 53.057 104.301 102.942 110.192 c -6.344 5.452 -12.241 15.873 -14.507 30.387 c -12.702 5.438 -45.808 15.873 -65.758 -18.592 c 0 0 -11.795 -21.31 -34.012 -22.669 c 0 0 -22.224 -0.453 -1.813 13.592 c 0 0 14.96 6.812 24.943 32.653 c 0 0 13.6 43.089 76.179 29.48 v 38.543 c 0 5.906 -4.53 12.702 -15.865 10.89 C 96.139 438.977 32.2 354.626 32.2 255.77 c 0 -123.807 100.216 -224.022 224.03 -224.022 c 123.347 0 224.023 100.216 223.57 224.022 c 0 98.856 -63.946 182.754 -152.828 212.688 c -11.342 2.266 -15.873 -4.53 -15.873 -10.89 V 395.45 C 311.1 374.577 304.288 360.985 296.133 354.174 L 296.133 354.174 Z M 512 256.23 C 512 114.73 397.263 0 256.23 0 C 114.73 0 0 114.73 0 256.23 C 0 397.263 114.73 512 256.23 512 C 397.263 512 512 397.263 512 256.23 L 512 256.23 Z" transform="scale(0.1)" />
                        </g>
                        <g id="linkedIn" transform="translate(70,2) scale(1.02)">
                            <circle xmlns="http://www.w3.org/2000/svg" cx="24" cy="24" fill="transparent" stroke="#000000" strokeWidth="3px" r="24" />
                            <path xmlns="http://www.w3.org/2000/svg" d="M17.4,34.9h-4.6V20.1h4.6V34.9z M14.9,18.2L14.9,18.2c-1.7,0-2.8-1.1-2.8-2.6c0-1.5,1.1-2.6,2.8-2.6  c1.7,0,2.8,1.1,2.8,2.6C17.7,17.1,16.7,18.2,14.9,18.2z M35.9,34.9h-5.3v-7.7c0-2-0.8-3.4-2.6-3.4c-1.4,0-2.1,0.9-2.5,1.8  c-0.1,0.3-0.1,0.8-0.1,1.2v8h-5.2c0,0,0.1-13.6,0-14.8h5.2v2.3c0.3-1,2-2.5,4.6-2.5c3.3,0,5.9,2.1,5.9,6.7V34.9z" fill="#000000" />
                        </g>
                        <g id="twitter">
                            <circle xmlns="http://www.w3.org/2000/svg" cx="24" cy="24" fill="transparent" stroke="transparent" strokeWidth="3px" r="24" transform="translate(140,0)" />
                            <g transform="scale(0.1) translate(1380,0)">
                                <path d="M258.8,507.2C120.4,507.8,6.6,392.6,9.9,251.9C13,118,123.9,7.2,261.9,8.7C398.7,10.1,511.8,124,508.1,264.8   C504.6,398.2,394.6,507.8,258.8,507.2z M477.8,257.8C476.7,132.4,375.1,35.9,255.2,38C138.6,40,40.1,135.2,40.4,258.4   C40.7,383.9,143.1,480.2,263,478C379.5,475.8,477,380.8,477.8,257.8z" />
                                <path d="M99,230.2c10.3,2.9,20.3,5.8,30.4,8.6c0.3-0.5,0.6-1.1,0.9-1.6c-20.1-15.5-31-35.4-30.5-60.9c0.2-13.2,4.1-27.1,9.8-34.2   c39,45.3,87.9,70.9,147,74.7c0.5-10.9-0.1-21.3,1.6-31.3c7.3-42.1,55.6-68.6,95.4-53c9.4,3.7,17.8,8.9,25.4,15.6   c1.5,1.3,4.6,2.4,6.4,1.8c12.1-4.1,24-8.6,36-13.1c1.7-0.6,3.2-1.6,5.8-3c-5.5,16.9-15.7,28.9-28.8,39.4c4.1-0.7,8.2-1.3,12.2-2.2   c4.4-1,8.7-2.3,13-3.7c4-1.3,8-2.8,13.1-4.7c-9,13.5-19.1,24.2-30.9,33.3c-3.4,2.6-4.7,5.1-4.7,9.5c0.5,55.5-18.3,103.8-55.2,144.8   c-28.8,32-64.9,51.9-107.3,60.1c-32.1,6.2-63.9,5.6-95.6-2.7c-19.4-5.1-37.7-13.1-54.8-23.6c-0.5-0.3-0.9-0.8-1.9-1.7   c38.9,3.3,73.5-6.1,105.2-29.9c-33.1-3.2-55-19.6-67.3-50.5c10.7,0,20.5,0,30.3,0c0.1-0.5,0.2-1.1,0.3-1.6   c-20.6-5.6-36.5-17.4-46.9-36.1C101.8,253.5,99.1,242,99,230.2z" />
                            </g>
                        </g>
                    </svg>
                    <p>Created by Dominic Chang</p>
                </div>
            </div>
        </footer>
        )
}


class HydrogenAtom extends Component {
    render() {
        return (
            <Fragment>
                <div className='container-fluid' style={{background:'white'}}>
                    <Banner/>
                    <BohrRadius/>
                    <BohrInfo/>
                    <hr/>
                    <SchrodingerEquation/>
                    <SchrodingerInfo/>
                    <OrbitalView/>
                </div>
            <Footer/>
            </Fragment>
        );
  }
}

class OrbitalView extends Component{
    constructor(props){
        super(props);
        this.state = {n:1, l:0, m:0};
        this.waveFunc = "n" + this.state.n + "l" + this.state.l + "m";
        if (this.state.m > 0)
            this.waveFunc += 'Pos';
        else if (this.state.m < 0)
            this.waveFunc += 'Neg';
        this.waveFunc += Math.abs(this.state.m);

    }
    setStateParent(N,L,M){
        this.setState({n:N,l:L,m:M});
        this.waveFunc = "n" + N + "l" + L + "m";
        if (M > 0)
            this.waveFunc += 'Pos';
        else if (M < 0)
            this.waveFunc += 'Neg';
        this.waveFunc += Math.abs(M);

    }
    
    render(){
        return(
            <div id='orbital-view' className='row' style={{backgroundColor:'black'}}>
                <div className='col-lg-12'>
                    <h2 align={"center"} style={{fontWeight:'bold',color:'white',mixBlendMode:'screen',MarginBottom:'0px'}}>Hydrogen Atomic Orbital Viewer</h2>
                </div> 
                <Model id='model' className='col-sm-8' n={this.state.n} l={this.state.l} m={this.state.m}/>
                <div className='col-sm-4'>
                    <ControlPanel onChange={(n,l,m)=>{this.setStateParent(n,l,m)}}/>
                    <Graph id='graph' maxX = {10} maxY={2} minX={0} minY={-2} unitsPerTick={1} range ={5} unitX={1} n={this.state.n} l={this.state.l} m={this.state.m}/>
                </div>
                <div className="col-lg-8">
                    <MathJax.Context input={'tex'}>
                    <h1 style={{color:'white', fontSize: '1.5em'}}>
                       <MathJax.Node>{'\\psi(r,\\theta,\\phi)='+WaveFunctions.LatexWaveFuncs['w'+this.waveFunc]}</MathJax.Node>
                    </h1>
                    </MathJax.Context>
                </div>
                <div className='col-md-1'>
                    <p style={{fontFamily:'Bubbler One, sans-serif', fontSize:'12pt', color:'white'}}>Instructions: </p>
                </div>
                <div className='col-md-3'>
                    <ul>
                        <li>Scroll to zoom</li>
                        <li>Click and drag to rotate orbital</li>
                        <li>
                            Select quantum numbers to load new orbitals
                        </li>
                    </ul>
                </div>
            </div>
                );
    }
}


export default HydrogenAtom;
