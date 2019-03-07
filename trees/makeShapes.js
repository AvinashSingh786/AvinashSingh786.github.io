// Avinash Singh
// 14043778


    var pyramidVertexPositionBuffer;
    var pyramidVertexColorBuffer;
    var cubeVertexPositionBuffer;
    var cubeVertexColorBuffer;
    var cubeVertexIndexBuffer;
    var cubeNormal;
    var triangleNormal;


var moonVertexPositionBuffer;
  var moonVertexNormalBuffer;
  
  var moonVertexIndexBuffer;
    function initBuffers() 
    {
        pyramidVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, pyramidVertexPositionBuffer);
        var vertices = [
            // Front face
             0.1,  0.5,  0.0,
            -0.5, -0.1,  0.5,
             0.5, -0.5,  0.1,

            // Right face
             0.0,  0.5,  0.0,
             0.1, -0.1,  0.1,
             0.5, -0.5, -0.5,

            // Back face
             0.0,  0.5,  0.1,
             0.5, -0.1, -0.5,
            -0.1, -0.5, -0.5,

            // Left face
             0.0,  0.5,  0.0,
            -0.1, -0.1, -0.1,
            -0.5, -0.5,  0.5
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        pyramidVertexPositionBuffer.itemSize = 3;
        pyramidVertexPositionBuffer.numItems = 12;

        triangleNormal = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormal);
        var normal = [
             0.0,  1.0,  1.0,
             0.0,  1.0,  1.0,
             0.0,  1.0,  1.0,

            -1.0,  1.0,  0.0,
            -1.0,  1.0,  0.0,
            -1.0,  1.0,  0.0,

             0.0,  1.0, -1.0,
             0.0,  1.0, -1.0,
             0.0,  1.0, -1.0,

             1.0,  1.0,  0.0,
             1.0,  1.0,  0.0,
             1.0,  1.0,  0.0,

             0.0, -1.0, 0.0,
             0.0, -1.0, 0.0,
             0.0, -1.0, 0.0,

             0.0, -1.0, 0.0,
             0.0, -1.0, 0.0,
             0.0, -1.0, 0.0
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normal), gl.STATIC_DRAW);
        triangleNormal.itemSize = 3;
        triangleNormal.numItems = 18;

        pyramidVertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, pyramidVertexColorBuffer);
        var colors = 
        [
            // Front face
            0.1, 0.4, 0.0, 1.0,
            0.1, 0.4, 0.0, 1.0,
            0.1, 0.4, 0.0, 1.0,

            // Right face
            0.1, 0.4, 0.0, 1.0,
            0.1, 0.4, 0.0, 1.0,
            0.1, 0.4, 0.0, 1.0,

            // Back face
            0.1, 0.4, 0.0, 1.0,
            0.1, 0.4, 0.0, 1.0,
            0.1, 0.4, 0.0, 1.0,

            // Left face
            0.1, 0.4, 0.0, 1.0,
            0.1, 0.4, 0.0, 1.0,
            1.0, 1.0, 1.0, 1.0
        ];

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        pyramidVertexColorBuffer.itemSize = 4;
        pyramidVertexColorBuffer.numItems = 12;


        cubeVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
        vertices = [
            // Front face
            -0.1, -0.5,  0.1,
             0.1, -0.5,  0.1,
             0.1,  0.5,  0.1,
            -0.1,  0.5,  0.1,

            // Back face
            -0.1, -0.5, -0.1,
            -0.1,  0.5, -0.1,
             0.1,  0.5, -0.1,
             0.1, -0.5, -0.1,

            // Top face
            -0.1,  0.5, -0.1,
            -0.1,  0.5,  0.1,
             0.1,  0.5,  0.1,
             0.1,  0.5, -0.1,

            // Bottom face
            -0.1, -0.5, -0.1,
             0.1, -0.5, -0.1,
             0.1, -0.5,  0.1,
            -0.1, -0.5,  0.1,

            // Right face
             0.1, -0.5, -0.1,
             0.1,  0.5, -0.1,
             0.1,  0.5,  0.1,
             0.1, -0.5,  0.1,

            // Left face
            -0.1, -0.5, -0.1,
            -0.1, -0.5,  0.1,
            -0.1,  0.5,  0.1,
            -0.1,  0.5, -0.1
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        cubeVertexPositionBuffer.itemSize = 3;
        cubeVertexPositionBuffer.numItems = 24;

        cubeNormal = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeNormal);
        normal = [
        0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,

      // Back face
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,

      // Top face
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,

      // Bottom face
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,

      // Right face
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,

      // Left face
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
    ];

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normal), gl.STATIC_DRAW);
        cubeNormal.itemSize = 3;
        cubeNormal.numItems = 24;

        cubeVertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer);
        colors = [
            [0.4, 0.3, 0.2, 0.3], // Front face
            [0.4, 0.3, 0.2, 1.0], // Back face
            [0.4, 0.3, 0.2, 1.0], // Top face
            [0.4, 0.3, 0.2, 1.0], // Bottom face
            [0.4, 0.3, 0.2, 1.0], // Right face
            [0.4, 0.3, 0.2, 1.0]  // Left face
        ];
        var unpackedColors = [];
        for (var i in colors) {
            var color = colors[i];
            for (var j=0; j < 4; j++) 
            {
                unpackedColors = unpackedColors.concat(color);
            }
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(unpackedColors), gl.STATIC_DRAW);
        cubeVertexColorBuffer.itemSize = 4;
        cubeVertexColorBuffer.numItems = 24;

        cubeVertexIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
        var cubeVertexIndices = [
            0, 1, 2,      0, 2, 3,    // Front face
            4, 5, 6,      4, 6, 7,    // Back face
            8, 9, 10,     8, 10, 11,  // Top face
            12, 13, 14,   12, 14, 15, // Bottom face
            16, 17, 18,   16, 18, 19, // Right face
            20, 21, 22,   20, 22, 23  // Left face
        ];
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
        cubeVertexIndexBuffer.itemSize = 1;
        cubeVertexIndexBuffer.numItems = 36;


        var latitudeBands = 30;
        var longitudeBands = 30;
        var radius = 2;

        var vertexPositionData = [];
        var normalData = [];
        var textureCoordData = [];
        for (var latNumber=0; latNumber <= latitudeBands; latNumber++) {
            var theta = latNumber * Math.PI / latitudeBands;
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);

            for (var longNumber=0; longNumber <= longitudeBands; longNumber++) {
                var phi = longNumber * 2 * Math.PI / longitudeBands;
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi);

                var x = cosPhi * sinTheta;
                var y = cosTheta;
                var z = sinPhi * sinTheta;
                var u = 1 - (longNumber / longitudeBands);
                var v = 1 - (latNumber / latitudeBands);

                normalData.push(x);
                normalData.push(y);
                normalData.push(z);
                textureCoordData.push(u);
                textureCoordData.push(v);
                vertexPositionData.push(radius * x);
                vertexPositionData.push(radius * y);
                vertexPositionData.push(radius * z);
            }
        }

        var indexData = [];
        for (var latNumber=0; latNumber < latitudeBands; latNumber++) {
            for (var longNumber=0; longNumber < longitudeBands; longNumber++) {
                var first = (latNumber * (longitudeBands + 1)) + longNumber;
                var second = first + longitudeBands + 1;
                indexData.push(first);
                indexData.push(second);
                indexData.push(first + 1);

                indexData.push(second);
                indexData.push(second + 1);
                indexData.push(first + 1);
            }
        }

        moonVertexNormalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, moonVertexNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
        moonVertexNormalBuffer.itemSize = 3;
        moonVertexNormalBuffer.numItems = normalData.length / 3;

        moonVertexTextureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, moonVertexTextureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordData), gl.STATIC_DRAW);
        moonVertexTextureCoordBuffer.itemSize = 2;
        moonVertexTextureCoordBuffer.numItems = textureCoordData.length / 2;

        moonVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, moonVertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
        moonVertexPositionBuffer.itemSize = 3;
        moonVertexPositionBuffer.numItems = vertexPositionData.length / 3;

        moonVertexIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, moonVertexIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);
        moonVertexIndexBuffer.itemSize = 1;
        moonVertexIndexBuffer.numItems = indexData.length;


}


