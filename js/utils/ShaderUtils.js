/**
 * User: jchionh
 * Date: 2/21/13
 * Time: 1:24 AM
 */
// create namespace
wa.utils = wa.utils || {};

/**
 *
 * we search the document for the script tag that contains the shader
 * and we compile it and return it.
 *
 * @param {WebGLRenderingContext} gl the gl context
 * @param {string} id the id of the script tag that has this shader
 *
 * @return {WebGLShader} the compiled shader
 */
wa.utils.compileShaderFromScriptElement = function (gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    // get the shader source text
    var shaderSource = shaderScript.text;

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    // load the source into our shader object
    gl.shaderSource(shader, shaderSource);

    // compile our shader object
    gl.compileShader(shader);

    // check our compile status
    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        // get the error for our compile
        var errorStr = gl.getShaderInfoLog(shader);
        console.log("Error compiling shader: " + errorStr);
        gl.deleteShader(shader);
        return null;
    }
    console.log("Shader compiled: " + id);
    return shader;
};

/**
 *
 * @param {WebGLRenderingContext} gl
 * @param {WebGLShader} vertexShader
 * @param {WebGLShader} fragmentShader
 * @param {Array.<string>} attribNamesArray
 * @return {WebGLProgram}
 */
wa.utils.createShaderProgram = function(gl, vertexShader, fragmentShader, attribNamesArray) {
    // create the program
    var program = gl.createProgram();
    // attach the shaders.
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    // bind our attribues here
    for (var i = 0; i < attribNamesArray.length; ++i) {
        gl.bindAttribLocation(program, i, attribNamesArray[i]);
        console.log("binding attribute: " + attribNamesArray[i]);
    }
    // link the program.
    gl.linkProgram(program);

    // check errors
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
        // something went wrong with the link
        var errorStr = gl.getProgramInfoLog (program);
        gl.deleteProgram(program);
        console.log("Error linking shader program: " + errorStr);
        return null;
    }
    console.log("ShaderProgram created.");
    return program;
};