// Avinash Singh
// 14043778

    var gl;

    function initGL(canvas) 
    {
        try 
        {
            gl = canvas.getContext("webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;

        canvas.onmousedown = handleMouseDown;
        document.onmouseup = handleMouseUp;
        document.onmousemove = handleMouseMove;

        document.onkeydown = handleKeyDown;

        }
        catch (e) { }
        
        if (!gl) 
        {
            alert("Could not initialise WebGL, sorry :-(");
        }
    }
