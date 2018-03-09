    function Graph(config) {
        // user defined properties
        this.canvas = document.getElementById(config.canvasId);
        this.minX = config.minX;
        this.minY = config.minY;
        this.maxX = config.maxX;
        this.maxY = config.maxY;
        this.unitsPerTick = config.unitsPerTick;

        // constants
        this.axisColor = '#ffffff';
        this.font = '8pt Calibri';
        this.tickSize = 5;

        // relationships
        this.context = this.canvas.getContext('2d');
        this.rangeX = this.maxX - this.minX;
        this.rangeY = this.maxY - this.minY;
        this.unitX = (this.canvas.width - 57) / this.rangeX;
        this.unitY = this.canvas.height / this.rangeY;
        this.centerY = Math.round(Math.abs(this.minY / this.rangeY) * this.canvas.height);
        this.centerX = Math.round(Math.abs(this.minX / this.rangeX) * (this.canvas.width - 57));
        this.iteration = (this.maxX - this.minX) / 1000;
        this.scaleX = (this.canvas.width - 57) / this.rangeX;
        this.scaleY = this.canvas.height / this.rangeY;

        // draw x and y axis
        this.drawXAxis();
        this.drawYAxis();
    }

    Graph.prototype.drawXAxis = function() {
        var context = this.context;
        context.save();
        context.beginPath();
        context.moveTo(0, this.centerY);
        context.lineTo((this.canvas.width - 57), this.centerY);
        context.strokeStyle = this.axisColor;
        context.lineWidth = 1;
        context.stroke();

        // draw tick marks
        var xPosIncrement = this.unitsPerTick * this.unitX;
        var xPos, unit;
        context.font = this.font;
        context.fillStyle = 'white';
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
        while (xPos < (this.canvas.width - 57)) {
            context.moveTo(xPos, this.centerY - this.tickSize / 2);
            context.lineTo(xPos, this.centerY + this.tickSize / 2);
            context.stroke();
            context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
            unit += this.unitsPerTick;
            xPos = Math.round(xPos + xPosIncrement);
        }
        context.moveTo(this.canvas.width - 57, this.centerY + this.tickSize / 2 - 3);
        context.lineTo(this.canvas.width - 60, this.centerY + this.tickSize / 2 - 5);
        context.stroke(); 
        context.moveTo(this.canvas.width - 57, this.centerY + this.tickSize / 2 - 3); 
        context.lineTo(this.canvas.width - 60, this.centerY + this.tickSize / 2);
        context.stroke(); 
        context.fillText('r [Bohr radii]' , (this.canvas.width - 28), this.centerY + this.tickSize / 2 - 10);  
        context.restore();
    };

    Graph.prototype.drawYAxis = function() {
        var context = this.context;
        context.save();
        context.beginPath();
        context.moveTo(this.centerX, 10);
        context.lineTo(this.centerX, this.canvas.height);
        context.strokeStyle = this.axisColor;
        context.lineWidth = 1;
        context.stroke();
        context.moveTo(this.centerX, 10 );
        context.lineTo(this.centerX + 5, 15);
        context.stroke();      
        context.moveTo(this.centerX, this.canvas.height);
        context.lineTo(this.centerX + 5, this.canvas.height - 5);
        context.stroke();
        context.font = this.font;
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.font = "8pt Bubbler One"
        context.textBaseline = 'top';
        context.fillText("R (r)" , this.centerX + 8, 0);  
        context.restore();
    };
    Graph.prototype.update = function(minY,maxY){
        this.minY = minY;
        this.maxY = maxY;
        this.rangeY = this.maxY - this.minY;
        this.unitY = this.canvas.height / this.rangeY;
        this.centerY = Math.round(Math.abs(this.minY / this.rangeY) * this.canvas.height);
        this.scaleY = this.canvas.height / this.rangeY;        
    };
    Graph.prototype.drawEquation = function(equation, color, thickness) {
        var context = this.context;
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

    Graph.prototype.transformContext = function() {
        var context = this.context;

        // move context to center of canvas
        this.context.translate(this.centerX, this.centerY);

        /*
         * stretch grid to fit the canvas window, and
         * invert the y scale so that that increments
         * as you move upwards
         */
        context.scale(this.scaleX, -this.scaleY);
    };
    



    const OrbitControls = require('three-orbit-controls')(THREE);
    console.log("yes");
    //Manipulates UI
    function changel() {
        l = 0;
        $("#l").html('<label class="btn btn btn-outline-primary active"><input type="radio" name="options" id="l0 " autocomplete="off" onfocus="l = 0; changem();"> 0 </label>');

        for (let i = 1; i < n; i++) {
            $("#l").append('<label class="btn btn btn-outline-primary"><input type="radio" name="options" id="l' + i + '" autocomplete="off" onfocus="l =' + i + '; changem();"> ' + i + ' </label>');
        }
        changem();
    }

    function changem() {
        m = 0;
        $("#m").html("");
        for (var i = -l; i < 0; i++) {
            $("#m").append('<label class="btn btn btn-outline-primary"><input type="radio" name="options" id="m' + i + '" autocomplete="off" onfocus="m =' + i + ';"> ' + i + ' </label>');
        }
        $("#m").append('<label class="btn btn btn-outline-primary active"><input type="radio" name="options" id="m0 " autocomplete="off" onfocus="m = 0;"> 0 </label>');
        i++;
        for (; i <= l; i++) {
            $("#m").append('<label class="btn btn btn-outline-primary"><input type="radio" name="options" id="m' + i + '" autocomplete="off" onfocus="m =' + i + ';"> ' + i + ' </label>');
        }
    }

    function cubePos(posArr) { //Creates float arr vertices
        var positions = new Float32Array(posArr.length * 3);
        for (i = 0; i < posArr.length; i++) {
            let t = 3 * i;
            positions[t] = posArr[i][0] + 1.75 * Math.random() * range / resolution;
            positions[t + 1] = posArr[i][1] + 1.75 * Math.random() * range / resolution;
            positions[t + 2] = posArr[i][2] + 1.75 * Math.random() * range / resolution;
        }
        return positions;
    }

    function cubeCol(posArr) {
        var colors = new Float32Array(posArr.length * 3);
        for (i = 0; i < posArr.length; i++) {
            var color = new THREE.Color(posArr[i][4]);
            let t = 3 * i;
            colors[t] = color.r;
            colors[t + 1] = color.g;
            colors[t + 2] = color.b;
        }
        return colors;
    }

    function cubeAlpha(posArr) {
        var alphas = new Float32Array(posArr.length);
        max = 0;
        for (i = 0; i < posArr.length; i++) {
            var temp = posArr[i][3];
            if (temp > max)
                max = temp;
            alphas[i] = temp;
        }
        //if (l > 0)
        //    return alphas.map(e => e / (5 * parseInt(l) * max));
        return alphas.map(e => e / (0.25 * max + 1.75 * max * (l > 0)));
    }


    function cubeSize(resolution, posArr) {
        var sizes = new Float32Array(posArr.length);
        for (var i = 0; i < posArr.length; i++) {
            sizes[i] = range / resolution;
        }
        return sizes;
    }

//Three JS stuff
    var scenes = [];
    for(let i = 0; i < 2; i++){
        scenes.push(new THREE.Scene());
    }
    var axesCamera, modelCamera;
    var renderers = [];
    for(let i = 0; i < 2; i++){
        renderers.push(new THREE.WebGLRenderer(
        {alpha:true}));
    }
//------------------------------------------------------Model Viewer
    var modelContainer = $("#model-container").get(0);
    modelContainer.style.width = 0.65 * window.innerWidth + 'px';
    modelContainer.style.height = 0.35 * window.innerWidth + 'px';
    modelCamera = new THREE.PerspectiveCamera(75, modelContainer.offsetWidth / modelContainer.offsetHeight, 0.1, 1000);
    renderers[0].setSize(modelContainer.offsetWidth, modelContainer.offsetHeight);
    renderers[0].domElement.style.zIndex = "0";
    modelContainer.appendChild(renderers[0].domElement);

    uniforms = {
        color: { type: "c", value: new THREE.Color(0xffffff) }
    };
    var shaderMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: $('#vertexshader').get(0).textContent,
        fragmentShader: $('#fragmentshader').get(0).textContent,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true
    });


    var resolution = 45;
    var range = 5;
    var n = 1;
    var l = 0;
    var m = 0;
    var cameraOffset = 10;
    modelCamera.position.z = cameraOffset;
    modelCamera.position.x = 0;
    modelCamera.position.y = 0;
    var posArr = simpsonIntegrate(n1l0m0, -range, range, -range, range, -range, range, resolution);

    var geometry = new THREE.BufferGeometry();


    geometry.addAttribute('size', new THREE.BufferAttribute(cubeSize(resolution, posArr), 1));
    geometry.addAttribute('position', new THREE.BufferAttribute(cubePos(posArr), 3));
    geometry.addAttribute('customColor', new THREE.BufferAttribute(cubeCol(posArr), 3));
    geometry.addAttribute('alpha', new THREE.BufferAttribute(cubeAlpha(posArr), 1));

    var particleSystem = new THREE.Points(
        geometry, shaderMaterial);


    scenes[0].add(particleSystem);
    var nucleus = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 10), new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: false }));

    scenes[0].add(nucleus);


    controls = new THREE.OrbitControls(modelCamera, renderers[0].domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.noPan = true;
//------------------------------------------------------- Axes View
    axesCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    renderers[1].setSize(modelContainer.offsetWidth/10, modelContainer.offsetWidth/10);
    renderers[1].domElement.style.zIndex = "1";
    renderers[1].domElement.style.position ="absolute";
    renderers[1].domElement.style.bottom ="0";
    renderers[1].domElement.style.right ="0";
    renderers[1].setClearColor(0x000000, 0.0);


    modelContainer.appendChild(renderers[1].domElement);
    var arrowHead = [];
    for(let i = 0; i < 3; i++){
        arrowHead.push(new THREE.Mesh(new THREE.CylinderGeometry(0, 0.5, 1, 32), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: false })));
    }
    var arrowTail = [];
    for(let i = 0; i < 3; i++){
        arrowTail.push(new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 4, 32), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: false })));
        arrowTail[i].position.set(0,-2,0);
    }
    axesCamera.position.z = 10;
    axesCamera.position.x = 0;
    axesCamera.position.y = 0;

    
    var arrow = [];
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

    scenes[1].add(axes);
    axescontrols = new THREE.OrbitControls(axesCamera, renderers[0].domElement);
    axescontrols.enableDamping = true;
    axescontrols.dampingFactor = 0.25;
    axescontrols.enableZoom = false;
    axescontrols.noPan = true;
//----------------------------------------------Animation and Windows event Handling

    window.addEventListener('resize', onResize, false);
    $('#model-container').mousedown(e => { enableRotation = 0; });
    $('#model-container').mouseup(e => {    
        enableRotation = 1;
        var z = modelCamera.position.z;
        var x = modelCamera.position.x;
        angle = Math.atan(z / x) -  Math.PI * (x < 0);
      });

    function onResize() {
        modelContainer.style.width = 0.65 * window.innerWidth + 'px';
        modelContainer.style.height = 0.35 * window.innerWidth + 'px';
        modelCamera.aspect = modelContainer.offsetWidth / modelContainer.offsetHeight;
        modelCamera.updateProjectionMatrix();
        renderers[0].setSize(modelContainer.offsetWidth, modelContainer.offsetHeight);
        render();
    }
    angle = 0;
    enableRotation = true;

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        axescontrols.update();
        render();
        var z = modelCamera.position.z;
        var x = modelCamera.position.x;
        var y = modelCamera.position.y;
        var z1 = axesCamera.position.z;
        var x1 = axesCamera.position.x;
        var r = Math.sqrt(z * z + x * x);
        var p = Math.sqrt(z1 * z1 + x1 * x1);
        if (enableRotation) {
            modelCamera.position.z = r * Math.sin(angle);
            modelCamera.position.x = r * Math.cos(angle);
            axesCamera.position.z = p * Math.sin(angle);
            axesCamera.position.x = p * Math.cos(angle);
            angle += 0.01;
        }
    }

    function render() {
        
        renderers[0].render(scenes[0], modelCamera);
        renderers[1].render(scenes[1], axesCamera);
    }
    animate();

    function reload() {
        enableRotation = true;

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


        reloadChart();
    }

    function reloadChart() {
        $("#myChart").get(0).getContext("2d").clearRect(0, 0, $('#myChart').width(), $('#myChart').height());
        myGraph = new Graph({
            canvasId: 'myChart',
            minX: 0,
            minY: -11,
            maxX: range,
            maxY: 11, //$('chart-slider').val(),
            unitsPerTick: n,
        });
        myGraph.drawEquation(eval('r' + n + l), 'red', 2);
    }
    //controls graph


    var myGraph = new Graph({
        canvasId: 'myChart',
        minX: 0,
        minY: -2,
        maxX: range,
        maxY: 2,
        unitsPerTick: 1
    });
    myGraph.drawEquation(r10, 'red', 2);