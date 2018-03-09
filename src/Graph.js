import * as WaveFunctions from './WaveFunction';
const React = require('react');
const MathJax = require('react-mathjax2');

class EquationDisplay extends React.Component{
    constructor(props){
        super(props);
        this.equation = WaveFunctions.wr10;
    }

    render(){
        return(
                <MathJax.Context input={'tex'}>
                <p>
                   <MathJax.Node>{this.equation}</MathJax.Node>
                </p>
                </MathJax.Context>
              )
    }
}

export default class Graph extends React.Component{
    constructor(props){
        super(props);

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
        let context = this.refs.canvas.getContext('2d');

        context.clearRect(0, 0, 300, 300);
        this.drawEquation(WaveFunctions.r10, 'red', 2);
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
        context.fillText('r [Bohr radii]' , (canvas.width - 28), this.centerY + this.tickSize / 2 - 10);  
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
        context.fillText("R (r)" , this.centerX + 8, 0);  
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
                    <EquationDisplay/>
                    <canvas ref='canvas' width={300} height={300}>
                    </canvas>
                </div>
              );
    }
}
