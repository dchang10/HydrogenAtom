import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './css/hydrogen.css'
import React, {Component, Fragment} from 'react';
require("jquery/package.json");
require('popper.js/package.json');
const $ = require('jquery');

var reload;

export default class OrbitalViewerPanel extends Component{
    constructor(props){
        super(props);
        this.state = {n:this.props.n, l:this.props.l, m:this.props.m};
        this.Lbuttons = <SubOrbitalButton id='l0' value={0} onFocus={()=>this.handleChangeL(1)}/>;
        this.Mbuttons = <SubOrbitalButton id='m0' value={0} onFocus={()=>this.handleChangeM(1)}/>;
    }
//------------------------------------------------State change Handlers
    handleChangeN(i){// Handles the change in state of N quantum number
        this.Lbuttons = this.renderLbuttons(i);
        this.setState({n:i});
    }
    handleChangeL(i){// Handles the change in state of L quantum number
        this.Mbuttons = this.renderMbuttons(i);
        this.setState({l:i});
    }
    handleChangeM(i){// Handles the change in state of M quantum number
        this.setState({m:i});
    }

    //Control Button Rendering
    renderNbuttons(i){
        return(<OrbitalButton id={'n'+i} value={i} onFocus={() => this.handleChangeN(i)}/>); 
    }
    renderLbuttons(i){
        let buttons = [];
        for(let j = 0; j < i;j++){
            buttons.push(<SubOrbitalButton id={'l' +j} value={j} onFocus={() =>this.handleChangeL(j)}/>);
        }
        return buttons;
    }
    renderMbuttons(i){
        let buttons = [];
        for(let j = -i; j <= i;j++){
            buttons.push(<SubOrbitalButton id={'m' +j} value={j} onFocus={() =>this.handleChangeM(j)}/>);
        }
        return buttons;
    }
    render(){
        return(
        <Fragment>
            <h3 align='center' style={{fontWeight: 'bold', color: '#AC2B37'}}>
                Select Quantum Numbers
            </h3>
            <div className="wrapper" style={{borderStyle:'solid none solid none', 
                    borderColor:'#aaaaaa', borderWidth:'1px 0  1px 0'}}>
                <div className='row'>
                    <div className="col-lg-1">
                        <h3 style={{fontFamily:'Bubbler One, sans-serif',
                            color:'white', paddingTop: '0.1em', align:'left'}}>
                            n
                        </h3>
                    </div>
                    <div className="btn-group" id="n" data-toggle="buttons">
                        {[this.renderNbuttons(1),this.renderNbuttons(2),this.renderNbuttons(3),
                            this.renderNbuttons(4)]}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-1">
                        <h3 style={{fontFamily: 'Bubbler One, sans-serif', color:'white',paddingLeft: '0.2em', 
                                paddingTop: '0.2em'}}>
                            l
                        </h3>
                    </div>
                    <div className="btn-group" id="l" data-toggle="buttons">
                        {this.Lbuttons}
                    </div>
                    <button className="btn btn-danger" type="button" onClick={reload} 
                                style={{marginBottom: '0px', fontFamily: 'Bubbler One, serif', 
                                backgroundColor: '#ac2b37', borderColor: '#ac2b37', 
                                marginLeft:'auto', marginRight:'5%', height:'38px'}}>
                            Load Orbital
                    </button>
                </div>
                <div className="row">
                    <div className="col-lg-1">
                        <h3 style={{fontFamily: 'Bubbler One, sans-serif', color:'white', paddingTop:'0.1em'}} align="left">
                            m
                        </h3>
                    </div>
                    <div className="btn-group" id="m" data-toggle="buttons">
                        {this.Mbuttons}
                    </div>
                </div>
            </div>
        </Fragment>
              );
    }
}

class Mbuttons extends Component{
    constructor(props){
        super(props);
        this.state ={level:props.level};
    }
    render(){
        if(this.props.level > 0){
            return(
            <Fragment>
                <label className="btn btn-outline-primary">
                    <input type="radio" name="options" id={'m' + -this.props.level} autocomplete="off" onFocus={()=>{this.m = -this.props.level;}}/>  {-this.props.level} 
                </label>
                <Mbuttons level={this.props.level-1}/>
                <label className="btn btn-outline-primary">
                    <input type="radio" name="options" id={'m' + this.props.level} autocomplete="off" onFocus={()=>{this.m = this.props.level;}}/> {this.props.level}
                </label>
            </Fragment>
            );
        }else{
            return(
            <label className="btn btn-outline-primary">
                <input type="radio" name="options" id={'m' + this.props.level} autocomplete="off" onFocus={()=>{this.m = this.props.level;}}/> {0}
            </label>
            );
        }
      
    }
}

class SubOrbitalButton extends Component{
    render(){
        if(this.props.value === 0){
            return(<label className="btn btn-outline-primary active">
                    <input type="radio" name="options"  id={this.props.id} autocomplete="off" onFocus={this.props.onFocus}/>{this.props.value}
                </label>
            );
        }else{
            return(<label className="btn btn-outline-primary">
                    <input type="radio" name="options"  id={this.props.id} autocomplete="off" onFocus={this.props.onFocus}/>{this.props.value}
                </label>
            );
        }
    }    
}

class OrbitalButton extends Component{
    render(){
        if(this.props.value === 1){
            return(<label className="btn btn-outline-primary active">
                    <input type="radio" name="options"  id={this.props.id} autocomplete="off" onFocus={this.props.onFocus}/>{this.props.value}
                </label>
            );
        }else{
            return(<label className="btn btn-outline-primary">
                    <input type="radio" name="options"  id={this.props.id} autocomplete="off" onFocus={this.props.onFocus}/>{this.props.value}
                </label>
            );
        }
    }
}
