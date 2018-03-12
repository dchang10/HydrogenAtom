import OrbitalView from './OrbitalView';

class OrbitalControl {
    constructor(){
        this.n = 1;
        this.l = 0;
        this.m = 0;
        this.view;
    }
    reload() {
        enableRotation = true;

        cameraOffset = 5 + 5 * Math.pow(n, 2) + 10 * l;

        let waveFunc = "n" + n + "l" + l + "m";
        if (m > 0)
            waveFunc += 'Pos';
        else if (m < 0)
            waveFunc += 'Neg';
        waveFunc += Math.abs(m);

        //$('#equation').html("$$\\psi(r,\\theta,\\phi)=" + eval('w' + waveFunc) + "$$");
        //MathJax.Hub.Queue(["Typeset", MathJax.Hub, "equation"]);
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
}
