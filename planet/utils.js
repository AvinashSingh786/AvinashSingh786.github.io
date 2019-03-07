// Avinash Singh
// 14043778

    var lastTime = 0;

    // Translation
    var cubeXT = -1.47e-15;
    var cubeYT = -0.8;
    var cubeZT = -0;

    var pyramidXT = -3.2;
    var pyramidYT = -0.3;
    var pyramidZT = -8.0;


    // Rotation
    var cubeXR = 0;
    var cubeYR = 0;
    var cubeZR = 0;

    var pyramidXR = 0;
    var pyramidYR = 0;
    var pyramidZR = 0;

    var status = 0;
    var clock = 1;
    var scale = 0;
    var shear = 0;
    var house = 0;

// PX: -3.2000000000000015Y: -0.30000000000000004Z: -8
// CX: -1.4710455076283324e-15Y: -0.7999999999999999Z: 0

	if(typeof Float32Array != "undefined")
	{
		glMatrixArray = Float32Array;
	}
	else 
	{
	if(typeof WebGLFloatArray != "undefined")
	{
		glMatrixArray = WebGLFloatArray;
	}
	else
	{
		glMatrixArray = Array;
	}
	}
    function clockwise()
    {
    	if (clock == 0) 
    	{
			clock = 1;
			document.getElementById("c").innerHTML = "Anti-Clockwise";
			document.getElementById("c").style.background = "red ";
    	}
    	else
    	{
    		clock = 0;	
    		document.getElementById("c").innerHTML = "Clockwise";
    		document.getElementById("c").style.background = "green";
    	} 

    }



	function degToRad(degrees) 
	{
	    return degrees * Math.PI / 180;
	}

    function animate() 
    {
        var timeNow = new Date().getTime();
        if (lastTime != 0) {
            var elapsed = timeNow - lastTime;

           pyramidYR += (360 * elapsed) / 50000.0;
           // rCube -= (75 * elapsed) / 1000.0;
        }
        lastTime = timeNow;
    }


    function tick() 
    {
        requestAnimFrame(tick);
        keyPress();
        drawScene();
        animate();

    }


    function webGLStart() 
    {
        var canvas = document.getElementById("canvas");
        initGL(canvas);
        initShaders()
        initBuffers();
        initTexture();

        document.onkeydown = keyDownHandler;
    	document.onkeyup = keyUpHandler;

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);

        tick();
    }

    // function setMatrixUniforms() 
    // {
    //     gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    //     gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    // }

    var mvMatrix = create();
    var mvMatrixStack = [];
    var pMatrix = create();

    function mvPushMatrix() 
    {
        var copy = mvMatrix;
        equals(copy, mvMatrix);
        mvMatrixStack.push(copy);
    }

    function mvPopMatrix() 
    {
        if (mvMatrixStack.length == 0) 
        {
            throw "Invalid popMatrix!";
        }
        mvMatrix = mvMatrixStack.pop();
    }

    function reset()
    {
    	identity(mvMatrix);
    	    // Translation
	    cubeXT = -1.47e-15;
	    cubeYT = -0.8;
	    cubeZT = -0;

	    pyramidXT = -3.2;
	    pyramidYT = -0.3;
	    pyramidZT = -8.0;

		en = 0;
    }


    ///////////////////////
    ////	TRANSLATE
    ///////////////////////
    function translate(m, x, y, z)
    {
		m[12] = (m[0] * x) + (m[4] * y) + (m[8]  * z) + m[12];
		m[13] = (m[1] * x) + (m[5] * y) + (m[9]  * z) + m[13];
		m[14] = (m[2] * x) + (m[6] * y) + (m[10] * z) + m[14];
		m[15] = (m[3] * x) + (m[7] * y) + (m[11] * z) + m[15];

    }


    ///////////////////////
    ////	ROTATE
    ///////////////////////
    function rotate(i, m, deg)
    {
    	if (i == 1) rotateX(m, deg);
    	else if (i == 2) rotateY(m, deg);
    		else if (i == 3) rotateZ(m, deg);
    			else if (i == 4) rotateX(m, deg);
    				else if (i == 5) rotateY(m, deg);
    					else if (i == 6) rotateZ(m, deg);
    }


    function rotateX(m, deg)
    {

    	if (clock == 0)
    	{
	    	var s = Math.sin(deg);
			var c = Math.cos(deg);
		}
		else
		{
			var s = Math.sin(-deg);
			var c = Math.cos(-deg);
		}
	
        
            var mv1 = m[1], mv5 = m[5], mv9 = m[9];
				
            m[1] = m[1]*c-m[2]*s;
            m[5] = m[5]*c-m[6]*s;
            m[9] = m[9]*c-m[10]*s;

            m[2] = m[2]*c+mv1*s;
            m[6] = m[6]*c+mv5*s;
            m[10] = m[10]*c+mv9*s;


		
		return m;
    }



    function rotateY(m, deg)
    {
    	// if (clock == 0)
    	// {
	    	var s = Math.sin(deg);
			var c = Math.cos(deg);
		// }
		// else
		// {
		// 	var s = Math.sin(-deg);
		// 	var c = Math.cos(-deg);
		// }

    	var tmp = create();
    	identity(tmp);

            var mv0 = m[0], mv4 = m[4], mv8 = m[8];
				
            m[0] = c*m[0]+s*m[2];
            m[4] = c*m[4]+s*m[6];
            m[8] = c*m[8]+s*m[10];

            m[2] = c*m[2]-s*mv0;
            m[6] = c*m[6]-s*mv4;
            m[10] = c*m[10]-s*mv8;




		// tmp[0] = c;
		// tmp[2] = -1.0*s;
		// tmp[8] = s;
		// tmp[10] = c;

		// copy( m, mul(m, tmp));

		return m;

    }


    function rotateZ(m, deg) 
    {
    	if (clock == 0)
    	{
	    	var s = Math.sin(deg);
			var c = Math.cos(deg);
		}
		else
		{
			var s = Math.sin(-deg);
			var c = Math.cos(-deg);
		}


            var mv0 = m[0], mv4 = m[4], mv8 = m[8];
				
            m[0] = c*m[0]-s*m[1];
            m[4] = c*m[4]-s*m[5];
            m[8] = c*m[8]-s*m[9];

            m[1] = c*m[1]+s*mv0;
            m[5] = c*m[5]+s*mv4;
            m[9] = c*m[9]+s*mv8;



		return m;	
	}
    


    function identity(m)
    {
    	
		m[0] = 1; m[1] = 0; m[2] = 0; m[3] = 0;
		m[4] = 0; m[5] = 1; m[6] = 0; m[7] = 0;
		m[8] = 0; m[9] = 0; m[10] = 1; m[11] = 0;
		m[12] = 0; m[13] = 0; m[14] = 0; m[15] = 1;
	
	}

	function equals(m, mm)
	{
		if(m != mm)
		{
			for (var i = 0; i < 16; i++)
				m[i] = mm[i];
		}
		return m;
	}
    



    ///////////////////////
    ////	SHEAR
    ///////////////////////
    function shearX(m, deg)
    {
    	var cot_deg = 1 / Math.tan(deg);
		cot_deg /= 2;
    	var tmp = create();

		tmp[0] = 1.0;
		tmp[1] = cot_deg;
		tmp[2] = 0.0;
		tmp[3] = 0.0;

		tmp[4] = 0.0;
		tmp[5] = 1.0;
		tmp[6] = 0.0;
		tmp[7] = 0.0;

		tmp[8] = 0.0;
		tmp[9] = 0.0;
		tmp[10] = 1.0;
		tmp[11] = 0.0;

		tmp[12] = 0.0;
		tmp[13] = 0.0;
		tmp[14] = 0.0;
		tmp[15] = 1.0;
		
		tmp = transpose(tmp);
		m = mul(m, tmp);

		return m;
    }

    function shearY(m, deg)
    {

    	var cot_deg = 1 / Math.tan(deg);
		cot_deg /= 2;
    	var tmp = create();


		tmp[0] = 1.0;
		tmp[1] = cot_deg;
		tmp[2] = 0.0;
		tmp[3] = 0.0;

		tmp[4] = 0.0;//
		tmp[5] = 1.0;
		tmp[6] = 0.0;
		tmp[7] = 0.0;

		tmp[8] = 0.0;
		tmp[9] = cot_deg;
		tmp[10] = 1.0;
		tmp[11] = 0.0;

		tmp[12] = 0.0;
		tmp[13] = 0.0;
		tmp[14] = 0.0;
		tmp[15] = 1.0;
		



		//tmp = transpose(tmp);
		m = mul(m, tmp);
		// m[6] = m[6] * cot_deg;
		return m;
    } // 9 6 

    function shearZ(m, deg)
    {
    	var cot_deg = 1 / Math.tan(deg);
		cot_deg /= 2;
    	var tmp = create();

		tmp[0] = 1.0;
		tmp[1] = 0.0;
		tmp[2] = 0.0;
		tmp[3] = 0.0;

		tmp[4] = 0.0;
		tmp[5] = 1.0;
		tmp[6] = cot_deg;
		tmp[7] = 0.0;

		tmp[8] = 0.0;//
		tmp[9] = 0.0;
		tmp[10] = 1.0;
		tmp[11] = 0.0;

		tmp[12] = 0.0;
		tmp[13] = 0.0;
		tmp[14] = 0.0;
		tmp[15] = 1.0;
		
		//tmp = transpose(tmp);
		m = mul(m, tmp);

		return m;

    } 


    ///////////////////////
    ////	SCALE
    ///////////////////////
    function scaleX(m, fac)
    {
    	m[0] = m[0] * fac;
    }

    function scaleY(m, fac)
    {
    	m[5] = m[5] * fac;
    }

    function scaleZ(m, fac)
    {
		m[10] = m[10] * fac;
    } 


	function mul(m, mm)
	{
		var tmp = create();

		for (var i = 0; i < 16; i += 4) 
		{
      		for (var j = 0; j < 4; j++) 
      		{
      			tmp[i + j] = 0.0;
        		for (var k = 0; k < 4; k++)
        			tmp[i + j] += m[i + k] * mm[k*4 + j];
      		}
    	}

    	return tmp;

	}

	function transpose(m)
	{
		var src = create();
		
	    for (var i = 0; i < 4; i++)
	    {
	      src[i +  0] = m[i*4 + 0];
	      src[i +  4] = m[i*4 + 1];
	      src[i +  8] = m[i*4 + 2];
	      src[i + 12] = m[i*4 + 3];
		}

		return src;
	}

	function create()
	{
		var newMatrix = new glMatrixArray(16);
		for (var i = 0; i < 16; i++)
		{
			newMatrix[0] = 0.0;
		}
	
		return newMatrix;
	}






    var currKeysPressed = {};

	function keyDownHandler(event)
	{
		currKeysPressed[event.keyCode] = true;
		console.log(event.keyCode);

		if (event.keyCode == 76)
		{
            if (le == 0)
            {
                $("#p").animate({bottom: "8%"});
                $("#left").css("background-color", "yellow"); 
                le++;
            }
            else
            {
                $("#p").animate({bottom: "-88%"});
                $("#left").css("background-color", "white"); 
                le--;   
            }
		}

		if (event.keyCode == 67)
		{
			
            if (ri == 0)
            {
                $("#s").animate({bottom: "8%"});
                $("#right").css("background-color", "yellow"); 
                ri++;
            }
            else
            {
                $("#s").animate({bottom: "-88%"});
                $("#right").css("background-color", "white"); 
                ri--;   
            } 
		}
	}

	function keyUpHandler(event)
	{
		currKeysPressed[event.keyCode] = false;
		status = 0;
		scale = 0;
		shear = 0;
	}

	function keyPress()
	{
		if (currKeysPressed[61]) // +
		{
			pyramidZT += 0.1;
		}

		if (currKeysPressed[173]) // -
		{
			pyramidZT -= 0.1;
		}
///////////////////////////////////////////////////////////////////////////////////
///////////////////////     TRANSLATE      ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

		///  PYRAMID TRANSLATE w, a, s, d
		///
		
	   	if(currKeysPressed[37]) // left
		{
			pyramidXT -= 0.1;
			// if (house == 0) cubeXT += 0.1;
		}

	   	if(currKeysPressed[38]) // up
		{
			pyramidYT += 0.1;
			// if (house == 0) cubeYT -= 0.1;
		}

	   	if(currKeysPressed[39]) // right
		{
			pyramidXT += 0.1;
			// if (house == 0) cubeXT -= 0.1;
		}

	   	if(currKeysPressed[40]) // down
		{
			pyramidYT -= 0.1;
			// if (house == 0) cubeYT += 0.1;
		}

		if(currKeysPressed[33]) // pageup
		{
			pyramidZT += 0.1;
			// if (house == 0) cubeZT -= 0.1;
		}

		if(currKeysPressed[34]) // pagedown
		{
			pyramidZT -= 0.1;
			// if (house == 0) cubeZT += 0.1;
		}




		// ///  CUBE TRANSLATE up, down, left, right
		// ///
	 //   	if(currKeysPressed[65]) // a
		// {
		// 	// pyramidXT += 0.1;
		// 	if (house == 0) cubeXT -= 0.1;
		// }

	 //   	if(currKeysPressed[87]) // w
		// {
		// 	// pyramidYT -= 0.1;
		// 	if (house == 0) cubeYT += 0.1;
		// }

	 //   	if(currKeysPressed[68]) // d
		// {
		// 	// pyramidXT -= 0.1;
		// 	if (house == 0) cubeXT += 0.1;
		// }

	 //   	if(currKeysPressed[83]) // s
		// {
		// 	// pyramidYT += 0.1;
		// 	if (house == 0) cubeYT -= 0.1;
		// }

		// if(currKeysPressed[81]) // q
		// {
		// 	// pyramidZT -= 0.1;
		// 	if (house == 0) cubeZT -= 0.1;
		// }

		// if(currKeysPressed[69]) // e
		// {
		// 	//pyramidZT -= 0.1;
		// 	if (house == 0) cubeZT += 0.1;
		// }

///////////////////////////////////////////////////////////////////////////////////
///////////////////         ROTATE            ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


		if(currKeysPressed[88]) // x
		{
			status = 2;
		}

		if(currKeysPressed[90]) // z
		{
			status = 2;
		}

		if(currKeysPressed[67]) // c
		{
			// status = 3;
		}




///////////////////////////////////////////////////////////////////////////////////
///////////////////         Change            ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////



		if(currKeysPressed[49]) // 1
		{
			document.getElementById('orthogonal').checked = true;
			document.getElementById('oblique').checked = false;
			document.getElementById('perspective').checked = false;
		}

		if(currKeysPressed[50]) // 2
		{
			document.getElementById('orthogonal').checked = false;
			document.getElementById('oblique').checked = true;
			document.getElementById('perspective').checked = false;	
		}

		if(currKeysPressed[51]) // 3
		{
			document.getElementById('orthogonal').checked = false;
			document.getElementById('oblique').checked = false;
			document.getElementById('perspective').checked = true;
		}


		if(currKeysPressed[81]) // q
		{
			document.getElementById('point').checked = true;
			document.getElementById('spot').checked = false;
			document.getElementById('ambient').checked = false;
		}

	   	if(currKeysPressed[87]) // w
		{
			document.getElementById('point').checked = false;
			document.getElementById('spot').checked = true;
			document.getElementById('ambient').checked = false;
		
		
		}

		if(currKeysPressed[69]) // e
		{
			document.getElementById('point').checked = false;
			document.getElementById('spot').checked = false;
			document.getElementById('ambient').checked = true;
		
		
		}


///////////////////////////////////////////////////////////////////////////////////
/////////////////////        SCALE          ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


		// CUBE SCALE
		///

		if(currKeysPressed[73]) // I
		{
			scale = 4;
		}

		if(currKeysPressed[79]) // O
		{
			scale = 5;
		}

		if(currKeysPressed[80]) // P
		{
			scale = 6;

		}


		// PYRAMID SCALE
		///

		if(currKeysPressed[74]) // J
		{
			scale = 1;
		}

		if(currKeysPressed[75]) // K 
		{
			scale = 2;
		}

		if(currKeysPressed[76]) // L
		{
			scale = 3;
		}


///////////////////////////////////////////////////////////////////////////////////
/////////////////////        SHEAR         ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


		// CUBE SHEAR
		///

		if(currKeysPressed[219]) // [
		{
			shear = 4;
		}

		if(currKeysPressed[220]) // \
		{
			shear = 6;
		}

		if(currKeysPressed[221]) // ]
		{
			shear = 5;

		}


		// PYRAMID SHEAR
		///

		if(currKeysPressed[66]) // B
		{
			shear = 1;
		}

		if(currKeysPressed[78]) //  N
		{
			shear = 2;
		}

		if(currKeysPressed[77]) // M
		{
			shear = 3;
		}

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


	}
  		

function setMatrixUniforms() 
{
	gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
	gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);

	/* NORMALES */
	var normalMatrix = mat3.create();
	mat4.toInverseMat3(mvMatrix, normalMatrix);
	mat3.transpose(normalMatrix);
	gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);

}


function oblique() 
{
	
	var theta = Math.tan(degToRad(110));
	var phi = Math.tan(degToRad(80));
	var tmp = create();	
	identity(tmp);

	tmp[8] = 1 / theta;
	tmp[9] = 1 / phi;

	// return tmp;

	return mul(tmp, orthogonal(-1, 1, -1, 1, -50, 100));

}  		

function perspective(x, y, z, d)
{
// (45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
	
	pMatrix[0][0] = pMatrix[0][0] * x;
	pMatrix[3][0] = pMatrix[0][0] * y;
	pMatrix[0][0] = pMatrix[0][0] * z;

}

function orthogonal(left, right, bottom, top, near, far)
{
	var tmp = create();

	tmp[0] = 2 / (right - left);
	tmp[1] = 0.0;
	tmp[2] = 0.0;
	tmp[3] = - ( (left+right) / (right-left) );

	tmp[4] = 0.0;
	tmp[5] = 2 / (top - bottom);
	tmp[6] = 0.0;
	tmp[7] = - ( (top+bottom) / (top-bottom) );

	tmp[8] = 0.0;
	tmp[9] = 0.0;
	tmp[10] = - (2 / (far - near));
	tmp[11] = - ( (far+near) / (far-near) );

	tmp[12] = 0.0;
	tmp[13] = 0.0;
	tmp[14] = 0.0;
	tmp[15] = 1;
	
	// tmp = transpose(tmp);
	// return mul(pMatrix, tmp);
	return tmp;

}


function spot() 
{
// 	gl.uniform1i(shaderProgram.useDirectionalLightingUniform, true);
// 	gl.uniform1i(shaderProgram.useLightingUniform, false);
// 	gl.uniform1i(shaderProgram.usePointLightingUniform, false);
	
	var ambientR = parseFloat(document.getElementById("ambientR").value);
	var ambientG = parseFloat(document.getElementById("ambientG").value);
	var ambientB = parseFloat(document.getElementById("ambientB").value); 
	    	
            var lightingDirection = [0.0, 1.0, 1.0];
            var adjustedLD = vec3.create();
            vec3.normalize(lightingDirection, adjustedLD);
            gl.uniform3fv(shaderProgram.lightingDirectionUniform, adjustedLD);
            gl.uniform3f(shaderProgram.directionalColorUniform, 1.0, 1.0, 1.0);


}



function ambient() 
{
	// gl.uniform3f(
 //        shaderProgram.ambientColorUniform,
 //        parseFloat(document.getElementById("ambientR").value),
 //        parseFloat(document.getElementById("ambientG").value),
 //        parseFloat(document.getElementById("ambientB").value)
 //      );

	// gl.uniform1i(shaderProgram.useDirectionalLightingUniform, false);
	// gl.uniform1i(shaderProgram.useLightingUniform, true);
	// gl.uniform1i(shaderProgram.usePointLightingUniform, false);

	var ambientR = parseFloat(document.getElementById("ambientR").value);
	var ambientG = parseFloat(document.getElementById("ambientG").value);
	var ambientB = parseFloat(document.getElementById("ambientB").value);

	
	gl.uniform3f( shaderProgram.ambientColorUniform, ambientR, ambientG, ambientB);
	
}


function point() 
{

	
	// gl.uniform1i(shaderProgram.useDirectionalLightingUniform, false);
	// gl.uniform1i(shaderProgram.useLightingUniform, false);
	// gl.uniform1i(shaderProgram.usePointLightingUniform, true);



	var ambientR = parseFloat(document.getElementById("ambientR").value);
	var ambientG = parseFloat(document.getElementById("ambientG").value);
	var ambientB = parseFloat(document.getElementById("ambientB").value);
	// gl.uniform3f(shaderProgram.pointLightingDiffuseColorUniform, ambientR, ambientG, ambientB);


  
            gl.uniform3f(shaderProgram.pointLightingLocationUniform, 0.0, 0.0, 0.0);
            gl.uniform3f(shaderProgram.pointLightingDiffuseColorUniform, ambientR, ambientG, ambientB);





}

function copy(m, mm)
{
	for (var k = 0; k < m.length; k++)
		m[k] = mm[k];
}

