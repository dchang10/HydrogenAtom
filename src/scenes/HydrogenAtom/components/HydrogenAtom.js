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
                        <span className="hydrogen__drop-caps" align="center">P</span>hysics took a turn near the begining of the twentieth century. 1897 marked the year physicist J.J. Thomson discovered the electron, and 1911 was the year the nucleus was discovered through the famous <a href="https://en.wikipedia.org/wiki/Geiger%E2%80%93Marsden_experiment">Geiger-Marsden Experiment</a>. The leading atomic model at the time was the Rutherford atomic model, which predicted electron orbits around the nucleus to be similar to the orbits of celestial bodies around the sun. This model however had a few problems associated with it, most notably :-
                    </p>
                </MathJax.Context>
                    <blockquote style={{padding: "1em 5em 1em 5em"}}>
                    <p>
                        {"Maxwell's Equations predict that the motion of an electron around the nucleus of an atom would produce electromagnetic radiation, which would result in energy loss of the electron over time. As a result of this energy loss, the electron would eventually spiral into the nucleus as it orbits the atom."}
                    </p>
                    </blockquote>
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
                        <span className="hydrogen__drop-caps">{"E"}</span>
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
            </Fragment>
        );
  }
}

class OrbitalView extends Component{
    constructor(props){
        super(props);
        this.state = {n:1, l:0, m:0, resolution:46};
        this.waveFunc = "n" + this.state.n + "l" + this.state.l + "m";
        if (this.state.m > 0)
            this.waveFunc += 'Pos';
        else if (this.state.m < 0)
            this.waveFunc += 'Neg';
        this.waveFunc += Math.abs(this.state.m);

    }
    setStateParent(N,L,M,Resolution){
        this.setState({n:N,l:L,m:M,resolution:Resolution});
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
                <Model id='model' className='col-sm-8' n={this.state.n} l={this.state.l} m={this.state.m} resolution={this.state.resolution}/>
                <div className='col-sm-4'>
                    <ControlPanel onChange={(n,l,m,resolution)=>{this.setStateParent(n,l,m,resolution)}}/>
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
