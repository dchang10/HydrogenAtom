import Model from './Model.js';
import Graph from './Graph.js';
import ControlPanel from './ControlPanel.js';
import * as  WaveFunctions from './WaveFunction';
import './css/hydrogen.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React from 'react';
import $ from 'jquery';
import MathJax from 'react-mathjax2';


export default class OrbitalView extends React.Component{
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
