import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../css/hydrogen.css'
import React, {Component, Fragment} from 'react';
require("jquery/package.json");
require('popper.js/package.json');
const $ = require('jquery');


class SubOrbitalButton extends Component{
    render(){
        if(this.props.value === 0){
            return(<label className="btn btn-outline-primary active">
                    <input className="hydrogen__input" type="radio" name="options" id={this.props.id} autoComplete="off" onFocus={this.props.onFocus}/>{this.props.value}
                </label>
            );
        }else{
            return(<label className="btn btn-outline-primary">
                    <input className="hydrogen__input" type="radio" name="options"  id={this.props.id} autoComplete="off" onFocus={this.props.onFocus}/>{this.props.value}
                </label>
            );
        }
    }    
}

class OrbitalButton extends Component{
    render(){
        if(this.props.value === 1){
            return(<label className="btn btn-outline-primary active">
                    <input className="hydrogen__input" type="radio" name="options"  id={this.props.id} autoComplete="off" onFocus={this.props.onFocus}/>{this.props.value}
                </label>
            );
        }else{
            return(<label className="btn btn-outline-primary">
                    <input className="hydrogen__input" type="radio" name="options"  id={this.props.id} autoComplete="off" onFocus={this.props.onFocus}/>{this.props.value}
                </label>
            );
        }
    }
}

export default class ControlPanel extends Component{
    constructor(props){
        super(props);
        this.state = {n:1, l:0, m:0};
        this.Lbuttons = <SubOrbitalButton id='l0' value={0} onFocus={()=>this.handleChangeL(1)}/>;
        this.Mbuttons = <SubOrbitalButton id='m0' value={0} onFocus={()=>this.handleChangeM(1)}/>;
        this.setStateParent = props.onChange;
    }
//------------------------------------------------State change Handlers
    handleChangeN(i){// Handles the change in state of N quantum number
        this.Lbuttons = this.renderLbuttons(i);
        this.setState({n:i,l:0,m:0});
        $('#l0').parent().click();
        this.setStateParent(i, 0, 0);
    }
    handleChangeL(i){// Handles the change in state of L quantum number
        this.Mbuttons = this.renderMbuttons(i);
        this.setState({l:i,m:0});
        $('#m0').parent().click();
        this.setStateParent(this.state.n, i, 0);
    }
    handleChangeM(i){// Handles the change in state of M quantum number
        this.setState({m:i});
        this.setStateParent(this.state.n, this.state.l, i);
    }

    //Control Button Rendering
    renderNbuttons(i){
        return(<OrbitalButton key={'n'+i} id={'n'+i} value={i} onFocus={() => this.handleChangeN(i)}/>); 
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
                    borderColor:'#aaaaaa', borderWidth:'0.05em 0  0.05em 0', padding:'0.5em 0 0.5em 0'}}>
                <div className='row'>
                    <div className="col-lg-1">
                        <h3 style={{fontFamily:'Bubbler One, sans-serif',
                            color:'white', paddingLeft:'0.2em', paddingTop: '0.1em', align:'left'}}>
                            n
                        </h3>
                    </div>
                    <div className="btn-group" id="n" data-toggle="buttons" style={{paddingLeft:'1em'}}>
                        {[this.renderNbuttons(1),this.renderNbuttons(2),this.renderNbuttons(3),
                            this.renderNbuttons(4)]}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-1">
                        <h3 style={{fontFamily: 'Bubbler One, sans-serif', color:'white',paddingLeft: '0.3em', 
                                paddingTop: '0.2em'}}>
                            l
                        </h3>
                    </div>
                    <div className="btn-group" id="l" data-toggle="buttons" style={{paddingLeft:'1em'}}>
                        {this.Lbuttons}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-1">
                        <h3 style={{fontFamily: 'Bubbler One, sans-serif', color:'white', paddingTop:'0.1em'}} align="left">
                            m
                        </h3>
                    </div>
                    <div className="btn-group" id="m" data-toggle="buttons" style={{paddingLeft:'1em'}}>
                        {this.Mbuttons}
                    </div>
                </div>
            </div>
        </Fragment>
              );
    }
}
