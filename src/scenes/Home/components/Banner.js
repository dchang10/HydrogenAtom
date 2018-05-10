import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../../../css/blog.css';

export default class Banner extends Component{
	constructor(props){
		super(props);
		if(this.props.style == null){
			this.style = {
                backgroundSize:'10em',
                backgroundColor:'#ee0000', 
                backgroundImage: `url(${this.props.image})`,
                opacity:'0.8'
            };
		} else {
			this.style = this.props.style;
			this.style.backgroundImage = this.props.image?`url(${this.props.image})`:null
		}
		let style = this.style;
		this.style.borderStyle = style.borderStyle?style.borderStyle:'hidden hidden solid hidden';
		this.style.borderWidth = style.borderWidth?style.borderWidth:'0px 0px 0.3em 0px';
		this.style.position = style.position?style.position:'relative';
		this.style.opacity = style.opacity?style.opacity:'0.8';
		this.style.height = style.height?style.height:'18em';
		this.style.backgroundPosition = style.backgroundPosition?style.backgroundPosition:'50% 50%'; 
		this.style.backgroundColor=style.backgroundColor?style.backgroundColor:'#ee0000';
	}
    render(){
        return(
            <div className="row" style={this.style}>
                    <h1 className="blend-title box-title" align='center' style={{position:'absolute', top: '50%',
        left: '50%', msTransform: 'translate(-50%, -50%)', transform: 'translate(-50%, -50%)'}}>{this.props.children}</h1>
            </div>
            );
    }
}