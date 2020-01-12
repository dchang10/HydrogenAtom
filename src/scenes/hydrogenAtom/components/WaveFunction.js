			// Integrates Via Simpson's Rule

			//takes function, resolution and range and returns 3D array of values
			export function simpsonIntegrate (foo, xmin, xmax, ymin, ymax, zmin, zmax, resolution){
				let coordinates = [];
				let xsteps = (xmax-xmin)/resolution;
				let ysteps = (ymax-ymin)/resolution;
				let zsteps = (zmax-zmin)/resolution;

				let currentx = xmin;
				let currenty = ymin;
				let currentz = zmin;

				let tempcurr;
				let tempmid;
				let tempafter;

				for(let i = 0; i < resolution; i++,currentx += xsteps){
					currenty = ymin;
					for(let j = 0; j < resolution; j++, currenty +=ysteps){
						currentz = zmin;	
						for(let k = 0; k < resolution; k++,currentz += zsteps){
							tempcurr = foo(currentx,currenty,currentz);
							tempmid = foo(currentx+xsteps/2, currenty+ysteps/2, currentz+zsteps/2);
							tempafter = foo(currentx+xsteps,currenty+ysteps,currentz+zsteps);
							let value = xsteps*ysteps*zsteps*(tempcurr+4*tempmid+tempafter)/6;
							if (value < 0){
								coordinates.push([currentx+xsteps/2, currenty+ysteps/2, currentz+zsteps/2,Math.pow(Math.abs(value),2),0x0000ff]);	
							}
							else{
								coordinates.push([currentx+xsteps/2, currenty+ysteps/2, currentz+zsteps/2,Math.pow(Math.abs(value),2),0xff0000]);
							
							}
							
						}
						
					}
					
				}
				return coordinates;
				
			}
			//radial probability functions
			export function r(x,y,z){
				return Math.sqrt(Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2));
			}
			export function r10(x,y,z){
				let R = r(x,y,z);
				return 2*Math.exp(-R);
			}
			export function r20(x,y,z){
				let R =r(x,y,z);
				return (1-R/2)*Math.exp(-R/2)/(Math.sqrt(2));
			}
			export function r21(x,y,z){
				let R = r(x,y,z);
				return Math.exp(-R/2)/Math.sqrt(24);
			}
			export function r30(x,y,z){
				let R =r(x,y,z);
				return (2/Math.sqrt(27))*(27-18*R+2*Math.pow(R,2))*Math.exp(-R/3);
			}
			export function r31(x,y,z){
				let R =r(x,y,z);
				return R*(8/(Math.sqrt(6)*27))*(6-R)*Math.exp(-R/3);
			}
			export function r32(x,y,z){
				let R =r(x,y,z);
				return Math.pow(R,2)*(4/(81*Math.sqrt(30)))*Math.exp(-R/3);
			}
			export function r40(x,y,z){
				let R =r(x,y,z);
				return (1-3*R/4+Math.pow(R,2)/8-Math.pow(R,3)/192)*Math.exp(-R/4)/4;
			}
			export function r41(x,y,z){
				let R = r(x,y,z);
				return R*(Math.sqrt(5)/(16*Math.sqrt(3)))*(1-R/4+Math.pow(R,2)/80)*Math.exp(-R/4);
			}
			export function r42(x,y,z){
				let R = r(x,y,z);
				return Math.pow(R,2)*(1-R/12)*Math.exp(-R/4)/(64*Math.sqrt(5));
			}
			export function r43(x,y,z){
				let R = r(x,y,z);
				return Math.pow(R,3)*Math.exp(-R/4)/(Math.sqrt(35)*768);
			}
            let functionHash = {
                'r10':r10,'r20':r20,'r21':r21,'r30':r30,'r31':r31,'r32':r32,
                'r40':r40,'r41':r41,'r42':r42,'r43':r43,
                'n1l0m0':n1l0m0,'n2l0m0':n2l0m0,'n2l1mNeg1':n2l1mNeg1,
                'n2l1m0':n2l1m0,'n2l1mPos1':n2l1mPos1,'n3l0m0':n3l0m0,
                'n3l1mNeg1':n3l1mNeg1,'n3l1m0':n3l1m0,'n3l1mPos1':n3l1mPos1,
                'n3l2mNeg2':n3l2mNeg2,'n3l2mNeg1':n3l2mNeg1,'n3l2m0':n3l2m0,
                'n3l2mPos1':n3l2mPos1,'n3l2mPos2':n3l2mPos2,'n4l0m0':n4l0m0,
                'n4l1mNeg1':n4l1mNeg1,'n4l1m0':n4l1m0,'n4l1mPos1':n4l1mPos1,
                'n4l2mNeg2':n4l2mNeg2,'n4l2mNeg1':n4l2mNeg1,'n4l2m0':n4l2m0,
                'n4l2mPos1':n4l2mPos1,'n4l2mPos2':n4l2mPos2,
                'n4l3mNeg3':n4l3mNeg3,'n4l3mNeg2':n4l3mNeg2, 'n4l3mNeg1':n4l3mNeg1,
                'n4l3m0':n4l3m0, 'n4l3mPos1':n4l3mPos1,'n4l3mPos2':n4l3mPos2,'n4l3mPos3':n4l3mPos3

            }
			//Wave functions go here
			export function n1l0m0(x,y,z){
				return 10*r10(x,y,z);
			}
			export function n2l0m0(x,y,z){
				return r20(x,y,z)*4;
			}
			export function n2l1mNeg1(x,y,z){
				return x*r21(x,y,z)*5;
			}
			export function n2l1m0(x,y,z){
				return z*r21(x,y,z)*5;
			}
			export function n2l1mPos1(x,y,z){
				return y*r21(x,y,z)*5;
			}
			export function n3l0m0(x,y,z){
				return r30(x,y,z)/15;
			}
			export function n3l1mNeg1(x,y,z){
				return x*r31(x,y,z)/4;
			}
			export function n3l1m0(x,y,z){
				return z*r31(x,y,z)/4;
			}
			export function n3l1mPos1(x,y,z){
				return y*r31(x,y,z)/4;
			}
			export function n3l2mNeg2(x,y,z){
				return x*y*r32(x,y,z);
			}
			export function n3l2mNeg1(x,y,z){
				return x*z*r32(x,y,z);
			}
			export function n3l2m0(x,y,z){
				return (3*Math.pow(z,2)-Math.pow(r(x,y,z),2))*r32(x,y,z);
			}
			export function n3l2mPos1(x,y,z){
				return y*z*r32(x,y,z);
			}
			export function n3l2mPos2(x,y,z){
				return 2*(Math.pow(x,2)-Math.pow(y,2))*r32(x,y,z);
			}
			export function n4l0m0(x,y,z){
				return 2.1*r40(x,y,z)/1.2;
			}
			export function n4l1mNeg1(x,y,z){
				return x*r41(x,y,z);
			}
			export function n4l1m0(x,y,z){
				return z*r41(x,y,z);
			}
			export function n4l1mPos1(x,y,z){
				return y*r41(x,y,z);
			}
			export function n4l2mNeg2(x,y,z){
				return x*y*r42(x,y,z);
			}
			export function n4l2mNeg1(x,y,z){
				return x*z*r42(x,y,z);
			}
			export function n4l2m0(x,y,z){
				return (3*Math.pow(z,2)-Math.pow(r(x,y,z),2))*r42(x,y,z);
			}
			export function n4l2mPos1(x,y,z){
				return y*z*r42(x,y,z);
			}
			export function n4l2mPos2(x,y,z){
				return 2*(Math.pow(x,2)-Math.pow(y,2))*r42(x,y,z);
			}
			export function n4l3mNeg3(x,y,z){
				return 2*(Math.pow(x,2)-3*Math.pow(y,2))*x*r43(x,y,z)/1.2;
			}
			export function n4l3mNeg2(x,y,z){
				return x*y*z*r43(x,y,z);
			}
			export function n4l3mNeg1(x,y,z){
				return x*(5*Math.pow(z,2)- Math.pow(r(x,y,z),2))*r43(x,y,z);
			}
			export function n4l3m0(x,y,z){
				return z*(5*Math.pow(z,2)-3*Math.pow(r(x,y,z),2))*r43(x,y,z)/1.5;
			}
			export function n4l3mPos1(x,y,z){
				return y*(5*Math.pow(z,2)- Math.pow(r(x,y,z),2))*r43(x,y,z);
			}
			export function n4l3mPos2(x,y,z){
				return 2*(Math.pow(x,2)-Math.pow(y,2))*z*r43(x,y,z);				
			}
			export function n4l3mPos3(x,y,z){
				return 2*(3*Math.pow(x,2)-Math.pow(y,2))*y*r43(x,y,z)/1.2 + y*(5*Math.pow(z,2)- Math.pow(r(x,y,z),2))*r43(x,y,z);
			}
            export function getFunc(str){
                return(functionHash[str]);
            }
			//Latex wave equation variables
			export const LatexWaveFuncs={
                wr10:"2\\,{a_0}^\\frac{-3}{2}\\,e^{-\\frac{r}{a_0}}",
                wr20: "\\frac{1}{\\sqrt{2}\\,{a_0}^\\frac{3}{2}}\\left(1-\\frac{1}{2}\\frac{r}{a_0}\\right)\\,e^{-\\frac{r}{a_0}}",
                wr21:"\\frac{1}{\\sqrt{24}\\,{a_0}^\\frac{3}{2}}\\,\\frac{r}{a_0}\\,e^{\\frac{-r}{2\\,a_0}}",
		    	wr30:"\\frac{2}{\\sqrt{27}\\,{a_0}^\\frac{3}{2}}\\,\\left[1 - \\frac{2}{3}\\frac{r}{a_0}+\\frac{2}{27}\\frac{r}{a_0}^2\\right]e^{\\frac{-r}{3a_0}}",
		    	wr31:"\\frac{8}{27\\sqrt{6}\\,{a_0}^\\frac{3}{2}}\\,\\left[1-\\frac{1}{6}\\frac{r}{a_0}\\right]\\frac{r}{a_0}\\,e^\\frac{-r}{3\\,a_0}\\cos\\theta",
                wr32:"\\frac{4}{81\\sqrt{30}\\,{a_0}^\\frac{3}{2}}\\,\\frac{r^2}{{a_0}^2}e^{-\\frac{r}{3\\,a_0}}(3\\cos^2\\theta - 1)",
            	wr40:"\\frac{1}{4\\,{a_0}^\\frac{3}{2}}\\,\\left[1-\\frac{3}{4}\\,\\frac{r}{a_0} +\\frac{1}{8}\\,\\frac{r^2}{{a_0}^2}-\\frac{1}{192}\\,\\frac{r^3}{{a_0}^3}\\right]\\,e^{\\frac{-r}{4a_0}}",
            	wr41:"\\frac{\\sqrt{5}}{16\\,\\sqrt{3}\\,{a_0}^\\frac{3}{2}}\\,\\left[1 - \\frac{1}{4}\\,\\frac{r}{a_0}+2\\,\\frac{1}{80}\\,\\frac{r}{a_0}^2\\right]\\frac{r}{a_0}\\,e^{\\frac{-r}{4a_0}}\\,cos\\theta",
			    wr42:"\\frac{1}{64\\sqrt{35}\\,{a_0}^\\frac{3}{2}}\\,\\left[1-\\frac{1}{12}\\,\\frac{r}{a_0}\\right]\\frac{r^2}{{a_0}^2}\\,e^\\frac{-r}{4\\,a_0}(3\\cos^2\\theta - 1)",
			    wr43:"\\frac{1}{768\\sqrt{35}\\,{a_0}^\\frac{3}{2}}\\frac{r^3}{{a_0}^3}\\,e^{\\frac{-r}{a_0}}(5\\cos^3\\theta-3\\cos\\theta)",
			    wn1l0m0:"\\frac{1}{\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,e^{\\frac{-r}{a_0}}",
			    wn2l0m0:"\\frac{1}{4\\sqrt{2\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[2-\\frac{r}{a_0}\\right]\\,e^{\\frac{-r}{2\\,a_0}}",
			    wn2l1mNeg1:"\\frac{1}{8\\sqrt{pi}\\,{a_0}^\\frac{3}{2}}\\,\\\\frac{r}{a_0}\\,e^{\\frac{-r}{2\\,a_0}}\\sin\\,\\theta\\,e^{-i\\,\\phi}",
			    wn2l1m0:"\\frac{1}{4\\sqrt{2\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\frac{r}{a_0}\\,e^{\\frac{-r}{2\\,a_0}}\\cos\\,\\theta",
			    wn2l1mPos1:"\\frac{1}{8\\sqrt{pi}\\,{a_0}^\\frac{3}{2}}\\,\\\\frac{r}{a_0}\\,e^{\\frac{-r}{2\\,a_0}}\\sin\\,\\theta\\,e^{i\\,\\phi}",
			    wn3l0m0:"\\frac{1}{81\\sqrt{3\\,\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[27 - 18\\,\\frac{r}{a_0}+2\\frac{r}{a_0}^2\\right]e^{\\frac{-r}{3a_0}}",
			    wn3l1mNeg1:"\\frac{2}{81\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[6-\\frac{r}{a_0}\\right]\\frac{r}{a_0}\\,e^\\frac{-r}{3\\,a_0}\\sin\\theta\\,e^{-i\\phi}",
			    wn3l1m0:"\\frac{2}{81\\sqrt{6\\,\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[6-\\frac{r}{a_0}\\right]\\frac{r}{a_0}\\,e^\\frac{-r}{3\\,a_0}\\cos\\theta",
			    wn3l1mPos1:"\\frac{2}{81\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[6-\\frac{r}{a_0}\\right]\\frac{r}{a_0}\\,e^\\frac{-r}{3\\,a_0}\\sin\\theta\\,e^{i\\phi}",
			    wn3l2mNeg2:"\\frac{2}{162\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\frac{r^2}{{a_0}^2}e^{-\\frac{r}{3\\,a_0}}\\sin^2\\theta\\,e^{-i\\,2\\phi}",
			    wn3l2mNeg1:"\\frac{2}{81\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\frac{r^2}{{a_0}^2}e^{-\\frac{r}{3\\,a_0}}\\sin\\theta\\,\\cos\\theta\\,e^{-i\\phi}",
			    wn3l2m0:"\\frac{2}{81\\sqrt{6\\,\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\frac{r^2}{{a_0}^2}e^{-\\frac{r}{3\\,a_0}}(3\\cos^2\\theta - 1)",
			    wn3l2mPos1:"\\frac{2}{81\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\frac{r^2}{{a_0}^2}e^{-\\frac{r}{3\\,a_0}}\\sin\\theta\\,\\cos\\theta\\,e^{i\\phi}",
			    wn3l2mPos2:"\\frac{2}{162\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\frac{r^2}{{a_0}^2}e^{-\\frac{r}{3\\,a_0}}\\sin^2\\theta\\,e^{i\\,2\\phi}",
			    wn4l0m0:"\\frac{2}{8\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[1-\\frac{3}{4}\\,\\frac{r}{a_0} +\\frac{1}{8}\\,\\frac{r^2}{{a_0}^2}-\\frac{1}{192}\\,\\frac{r^3}{{a_0}^3}\\right]\\,e^{\\frac{-r}{4a_0}}",
			    wn4l1mNeg1:"\\frac{\\sqrt{5}}{32\\,\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[1 - \\frac{1}{4}\\,\\frac{r}{a_0}+2\\,\\frac{1}{80}\\,\\frac{r}{a_0}^2\\right]\\frac{r}{a_0}\\,e^{\\frac{-r}{4a_0}}\\,\\sin\\theta\\,e^{-i\\,\\phi}",
			    wn4l1m0:"\\frac{\\sqrt{5}}{32\\,\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[1 - \\frac{1}{4}\\,\\frac{r}{a_0}+2\\,\\frac{1}{80}\\,\\frac{r}{a_0}^2\\right]\\frac{r}{a_0}\\,e^{\\frac{-r}{4a_0}}\\,cos\\theta",
			    wn4l1mPos1:"\\frac{\\sqrt{5}}{32\\,\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[1 - \\frac{1}{4}\\,\\frac{r}{a_0}+2\\,\\frac{1}{80}\\,\\frac{r}{a_0}^2\\right]\\frac{r}{a_0}\\,e^{\\frac{-r}{4a_0}}\\,\\sin\\theta\\,e^{i\\,\\phi}",
			    wn4l2mNeg2:"\\frac{\\sqrt{3}}{128\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[1-\\frac{1}{12}\\,\\frac{r}{a_0}\\right]\\frac{r^2}{{a_0}^2}\\,e^\\frac{-r}{4\\,a_0}\\,\\sin\\theta \\,\\cos\\theta\\,e^{-2i\\phi}",
			    wn4l2mNeg1:"\\frac{\\sqrt{3}}{256\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[1-\\frac{1}{12}\\,\\frac{r}{a_0}\\right]\\frac{r^2}{{a_0}^2}\\,e^\\frac{-r}{4\\,a_0}\\,\\sin^2\\theta\\,e^{-i\\phi}",
			    wn4l2m0:"\\frac{1}{156\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[1-\\frac{1}{12}\\,\\frac{r}{a_0}\\right]\\frac{r^2}{{a_0}^2}\\,e^\\frac{-r}{4\\,a_0}(3\\cos^2\\theta - 1)",
			    wn4l2mPos1:"\\frac{\\sqrt{3}}{128\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[1-\\frac{1}{12}\\,\\frac{r}{a_0}\\right]\\frac{r^2}{{a_0}^2}\\,e^\\frac{-r}{4\\,a_0}\\,\\sin\\theta \\,\\cos\\theta\\,e^{i\\phi}",
			    wn4l2mPos2:"\\frac{\\sqrt{3}}{256\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[1-\\frac{1}{12}\\,\\frac{r}{a_0}\\right]\\frac{r^2}{{a_0}^2}\\,e^\\frac{-r}{4\\,a_0}\\,\\sin^2\\theta\\,e^{2i\\phi}",
			    wn4l3mNeg3:"\\frac{1}{6114\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\frac{r^3}{{a_0}^3}\\,e^{\\frac{-r}{a_0}}\\sin^3\\theta\\,e^{-3i\\phi}",	
			    wn4l3mNeg2:"\\frac{\\sqrt{3}}{3072\\sqrt{6\\pi}\\,{a_0}^\\frac{3}{2}}\\frac{r^3}{{a_0}^3}\\,e^{\\frac{-r}{a_0}}\\sin^2\\theta\\,\\cos\\theta\\,e^{-2i\\phi}",
			    wn4l3mNeg1:"\\frac{\\sqrt{3}}{6114\\sqrt{5\\pi}\\,{a_0}^\\frac{3}{2}}\\frac{r^3}{{a_0}^3}\\,e^{\\frac{-r}{a_0}}\\sin\\theta\\,(5\\cos^2\\theta-1)\\,e^{-i\\phi}",
			    wn4l3m0:"\\frac{1}{3072\\sqrt{5\\pi}\\,{a_0}^\\frac{3}{2}}\\frac{r^3}{{a_0}^3}\\,e^{\\frac{-r}{a_0}}(5\\cos^3\\theta-3\\cos\\theta)",
			    wn4l3mPos1:"\\frac{\\sqrt{3}}{6114\\sqrt{5\\pi}\\,{a_0}^\\frac{3}{2}}\\frac{r^3}{{a_0}^3}\\,e^{\\frac{-r}{a_0}}\\sin\\theta\\,(5\\cos^2\\theta-1)\\,e^{i\\phi}",
			    wn4l3mPos2:"\\frac{\\sqrt{3}}{3072\\sqrt{6\\pi}\\,{a_0}^\\frac{3}{2}}\\frac{r^3}{{a_0}^3}\\,e^{\\frac{-r}{a_0}}\\sin^2\\theta\\,\\cos\\theta\\,e^{2i\\phi}",
			    wn4l3mPos3:"\\frac{1}{6114\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\frac{r^3}{{a_0}^3}\\,e^{\\frac{-r}{a_0}}\\sin^3\\theta\\,e^{3i\\phi}",
            };
