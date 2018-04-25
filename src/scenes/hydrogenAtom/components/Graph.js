import * as WaveFunctions from './WaveFunction';
import '../css/hydrogen.css';
const React = require('react');
const MathJax = require('react-mathjax2');

class EquationDisplay extends React.Component{
    render(){
        return(
                <MathJax.Context input={'tex'}>
                <p style={{color:'white', fontSize: '0.7em'}}>
                   <MathJax.Node>{'R(r)='+WaveFunctions.LatexWaveFuncs['wr'+this.props.n+this.props.l]}</MathJax.Node>
                </p>
                </MathJax.Context>
              );
    }
}

export default class Graph extends React.Component{
    constructor(props){
        super(props);
        this.animate = this.animate.bind(this);
        this.state = {n:this.props.n,l:this.props.l,m:this.props.m};
        this.minX = props.minX;
        this.minY = props.minY;
        this.maxX = props.maxX;
        this.maxY = props.maxY;
        this.unitsPerTick = props.unitsPerTick;

        // constants
        this.axisColor = '#ffffff';
        this.font = '8pt Calibri';
        this.tickSize = 5;
    }

    reloadGraph() {
        let canvas = this.refs.canvas;
        let context = canvas.getContext('2d');

        this.unitsPerTick = this.state.n;
        this.rangeX = 3 + 2 * this.state.n * this.state.n + 10*this.state.l;
        this.unitX = (canvas.width - 57) / this.rangeX;
        context.clearRect(0, 0, 1000, 1000);
        this.drawXAxis();
        this.drawYAxis();
        this.drawEquation(WaveFunctions.getFunc('r'+this.state.n+this.state.l), 'red', 2);
    }

    componentDidMount(){
        // relationships
        let canvas = this.refs.canvas;
     
        this.rangeX = this.maxX - this.minX;
        this.rangeY = this.maxY - this.minY;
        this.unitX = (canvas.width - 57) / this.rangeX;
        this.unitY = canvas.height / this.rangeY;
        this.centerY = Math.round(Math.abs(this.minY / this.rangeY) * canvas.height);
        this.centerX = Math.round(Math.abs(this.minX / this.rangeX) * (canvas.width - 57));
        this.iteration = (this.maxX - this.minX) / 1000;
        this.scaleX = (canvas.width - 57) / this.rangeX;
        this.scaleY = canvas.height / this.rangeY;

        this.reloadGraph();

        // draw x and y axis
        this.drawXAxis();
        this.drawYAxis();
        this.animate();
    }
    animate(){
        if(
            this.state.n !== this.props.n 
            || this.state.l !== this.props.l 
            || this.state.m !== this.props.m
        ){
            this.setState({n:this.props.n,l:this.props.l,m:this.props.m});
            this.reloadGraph();
        }
       
        this.frameId = requestAnimationFrame(this.animate);

    }


    drawXAxis() {
        let canvas = this.refs.canvas;
        var context = canvas.getContext('2d');
        context.save();
        context.beginPath();
        context.moveTo(0, this.centerY);
        context.lineTo((canvas.width - 57), this.centerY);
        context.strokeStyle = this.axisColor;
        context.lineWidth = 1;
        context.stroke();

        // draw tick marks
        var xPosIncrement = this.unitsPerTick * this.unitX;
        var xPos, unit;
        context.font = this.font;
        context.fillStyle = '#ffffff';
        context.textAlign = 'center';
        context.font = "8pt Bubbler One"
        context.textBaseline = 'top';

        // draw left tick marks
        xPos = this.centerX - xPosIncrement;
        unit = -1 * this.unitsPerTick;
        while (xPos > 0) {
            context.moveTo(xPos, this.centerY - this.tickSize / 2);
            context.lineTo(xPos, this.centerY + this.tickSize / 2);
            context.stroke();
            //context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
            unit -= this.unitsPerTick;
            xPos = Math.round(xPos - xPosIncrement);
        }

        // draw right tick marks
        xPos = this.centerX + xPosIncrement;
        unit = this.unitsPerTick;
        while (xPos < (canvas.width - 57)) {
            context.moveTo(xPos, this.centerY - this.tickSize / 2);
            context.lineTo(xPos, this.centerY + this.tickSize / 2);
            context.stroke();
            context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
            unit += this.unitsPerTick;
            xPos = Math.round(xPos + xPosIncrement);
        }
        context.moveTo(canvas.width - 57, this.centerY + this.tickSize / 2 - 3);
        context.lineTo(canvas.width - 60, this.centerY + this.tickSize / 2 - 5);
        context.stroke(); 
        context.moveTo(canvas.width - 57, this.centerY + this.tickSize / 2 - 3); 
        context.lineTo(canvas.width - 60, this.centerY + this.tickSize / 2);
        context.stroke(); 
        context.fillText('r [Bohr radii]' , (canvas.width - 38), this.centerY + this.tickSize / 2 - 20);  
        context.restore();
    };

    drawYAxis() {
        let canvas = this.refs.canvas;
        let context = canvas.getContext('2d');
        context.save();
        context.beginPath();
        context.moveTo(this.centerX, 10);
        context.lineTo(this.centerX, canvas.height);
        context.strokeStyle = this.axisColor;
        context.lineWidth = 1;
        context.stroke();
        context.moveTo(this.centerX, 10 );
        context.lineTo(this.centerX + 5, 15);
        context.stroke();      
        context.moveTo(this.centerX, canvas.height);
        context.lineTo(this.centerX + 5, canvas.height - 5);
        context.stroke();
        context.font = this.font;
        context.fillStyle = '#ffffff';
        context.textAlign = 'center';
        context.font = "8pt Bubbler One"
        context.textBaseline = 'top';
        context.fillText("R (r)" , this.centerX + 18, 0);  
        context.restore();
    };

    update(minY,maxY){
        let canvas = this.refs.canvas;
        this.minY = minY;
        this.maxY = maxY;
        this.rangeY = this.maxY - this.minY;
        this.unitY = canvas.height / this.rangeY;
        this.centerY = Math.round(Math.abs(this.minY / this.rangeY) * canvas.height);
        this.scaleY = canvas.height / this.rangeY;        
    };

    drawEquation(equation, color, thickness) {
        var context = this.refs.canvas.getContext('2d');
        var MY = 0;
        let points = [];
        for (var x = this.minX + this.iteration; x <= this.maxX; x += this.iteration) {
            let temp =  equation(x, 0, 0);
            if(temp > MY)
                MY = temp;
            points.push([x,temp]);
        }
        this.update(-MY*1.3, MY*1.3);
        context.save();
        context.save();
        this.transformContext();

        context.beginPath();
        context.moveTo(this.minX, equation(this.minX, 0, 0));
        
        points.forEach(e=>context.lineTo(e[0], e[1]));
        context.restore();
        context.lineJoin = 'round';
        context.lineWidth = thickness;
        context.strokeStyle = color;
        context.stroke();
        context.restore();
    };

    transformContext() {
        let canvas = this.refs.canvas;
        let context = canvas.getContext('2d');

        // move context to center of canvas
        context.translate(this.centerX, this.centerY);

        /*
         * stretch grid to fit the canvas window, and
         * invert the y scale so that that increments
         * as you move upwards
         */
        context.scale(this.scaleX, -this.scaleY);
    };
    render(){
        return(
                <div>
                    <EquationDisplay n={this.state.n} l={this.state.l}/>
                    <canvas ref='canvas' width={500} height={250}>
                    </canvas>
                </div>
              );
    }
}
