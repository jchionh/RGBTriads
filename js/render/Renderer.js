/**
 * User: jchionh
 * Date: 2/21/13
 * Time: 10:52 PM
 */
// create namespace
wa.render = wa.render || {};

/**
 *
 * @param {WebGLRenderingContext} gl
 * @constructor
 */
wa.render.Renderer = function(gl) {
    // constants
    this.MAX_NUM_RENDER_OBJECTS = 100;
    // our shaderhandle refs sturcture
    this.shaderHandleRefs = new wa.render.ShaderHandleRefs();
    this.currentRenderObjectIndex = 0;
    this.lastRenderObjectIndex = 0;

    // this is our viewpoint
    this.viewpoint = null;
};

/**
 * init our view
 */
wa.render.Renderer.prototype.initView = function() {
    gl.clearColor(0.3, 0.3, 0.3, 1.0);
    gl.enable(gl.DEPTH_TEST);
};

/**
 * init our shaders and shader program
 * @param {WebGLRenderingContext} gl
 * @param {string} vtxShaderId the script tag id that has our vertex shader
 * @param {string} fragShaderId the script tag id that has out fragment shader
 */
wa.render.Renderer.prototype.initDefaultShaders = function(gl, vtxShaderId, fragShaderId) {
    // first we compile our shaders
    var vtxShader = wa.utils.compileShaderFromScriptElement(gl, vtxShaderId);
    var fragShader = wa.utils.compileShaderFromScriptElement(gl, fragShaderId);
    // then let's link our program
    var attribNames = ["a_Position", "a_Color", "a_TexCoord"];
    var shaderProgram = wa.utils.createShaderProgram(gl, vtxShader, fragShader, attribNames);
    // assign to tour shader refs
    this.shaderHandleRefs.shaderProgram = shaderProgram;
    // get our arrtibute handles
    this.shaderHandleRefs.posHandle = gl.getAttribLocation(shaderProgram, "a_Position");
    this.shaderHandleRefs.colorHandle = gl.getAttribLocation(shaderProgram, "a_Color");
    this.shaderHandleRefs.texCoordHandle = gl.getAttribLocation(shaderProgram, "a_TexCoord");
    this.shaderHandleRefs.matrixHandle = gl.getUniformLocation(shaderProgram, "u_MVPMatrix");
    this.shaderHandleRefs.texMatrixHandle = gl.getUniformLocation(shaderProgram, "u_TexMatrix");
    this.shaderHandleRefs.texImageMatrixHandle = gl.getUniformLocation(shaderProgram, "u_ImageTexMatrix");
    this.shaderHandleRefs.texSamplerHandle = gl.getUniformLocation(shaderProgram, "u_Texture");
    this.shaderHandleRefs.texImageSamplerHandle = gl.getUniformLocation(shaderProgram, "u_ImageTexture");

    this.shaderHandleRefs.doVignetteHandle = gl.getUniformLocation(shaderProgram, "u_doVignette");
    this.shaderHandleRefs.vigOuterHandle = gl.getUniformLocation(shaderProgram, "u_vigOuterBorder");
    this.shaderHandleRefs.vigFadeHandle = gl.getUniformLocation(shaderProgram, "u_vigFade");
    this.shaderHandleRefs.fStop = gl.getUniformLocation(shaderProgram, "u_fStop");

    this.shaderHandleRefs.doCurvature = gl.getUniformLocation(shaderProgram, "u_doCurvature");
    this.shaderHandleRefs.outerWarp = gl.getUniformLocation(shaderProgram, "u_outerWarp");
    this.shaderHandleRefs.innerWarp = gl.getUniformLocation(shaderProgram, "u_innerWarp");
    this.shaderHandleRefs.gradientRatio = gl.getUniformLocation(shaderProgram, "u_gradientRatio");
    this.shaderHandleRefs.curvature = gl.getUniformLocation(shaderProgram, "u_curvature");
    this.shaderHandleRefs.curvatureType = gl.getUniformLocation(shaderProgram, "u_curvatureType");

    this.shaderHandleRefs.doTriads = gl.getUniformLocation(shaderProgram, "u_doTriads");

    this.shaderHandleRefs.imageBrightness = gl.getUniformLocation(shaderProgram, "u_imageBrightness");

    this.shaderHandleRefs.rBrightness = gl.getUniformLocation(shaderProgram, "u_rBrightness");
    this.shaderHandleRefs.gBrightness = gl.getUniformLocation(shaderProgram, "u_gBrightness");
    this.shaderHandleRefs.bBrightness = gl.getUniformLocation(shaderProgram, "u_bBrightness");

    this.shaderHandleRefs.saturation = gl.getUniformLocation(shaderProgram, "u_Saturation");
    this.shaderHandleRefs.brightness = gl.getUniformLocation(shaderProgram, "u_Brightness");
    this.shaderHandleRefs.contrast = gl.getUniformLocation(shaderProgram, "u_Contrast");

    this.shaderHandleRefs.texCenterU = gl.getUniformLocation(shaderProgram, "u_texCenterU");
    this.shaderHandleRefs.texCenterV = gl.getUniformLocation(shaderProgram, "u_texCenterV");

    this.shaderHandleRefs.imageWidthHandle = gl.getUniformLocation(shaderProgram, "u_ImageWidth");
    this.shaderHandleRefs.imageHeightHandle = gl.getUniformLocation(shaderProgram, "u_ImageHeight");

    this.shaderHandleRefs.doScanLines = gl.getUniformLocation(shaderProgram, "u_doScanLines");
    this.shaderHandleRefs.scanLinesDensity = gl.getUniformLocation(shaderProgram, "u_scanLinesDensity");
    this.shaderHandleRefs.scanLinesOpacity = gl.getUniformLocation(shaderProgram, "u_scanLinesOpacity");

    console.log("max tex size: " + gl.getParameter(gl.MAX_TEXTURE_SIZE));
    //console.log("texSamplerHandle: " + this.shaderHandleRefs.texSamplerHandle);
    gl.useProgram(shaderProgram);
};

/**
 * sets up out viewpoint camera for getting the view projection matrix
 * @param {WebGLRenderingContext} gl
 * @param {wa.render.Viewpoint} viewpoint
 */
wa.render.Renderer.prototype.setViewpoint = function(gl, viewpoint) {
    this.viewpoint = viewpoint;
    // with our viewpoint, we can init our viewport with the viewpoint dimensions
    gl.viewport(0, 0, viewpoint.width, viewpoint.height);
};

/**
 * here is our render function that iterates over our render objects and render them
 * @param {WebGLRenderingContext} gl
 * @param {wa.render.Scene} scene renderer traverses the scene graph and renders every scene node
 */
wa.render.Renderer.prototype.render = function(gl, scene) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // TESTING draw a scene node
    // just iterate a list for now, no tree
    var sceneRoot = scene.getRoot();
    var currentNode = sceneRoot.getFirstChild();

    while(currentNode !== null) {
        currentNode.draw(gl, this);
        currentNode = currentNode.getSibling();
    }
    // now call draw on our scene node
};

/**
 * get the view projection matrix from our viewpoint
 * @return {mat4}
 */
wa.render.Renderer.prototype.getViewProjMatrix = function() {
    return this.viewpoint.getViewProjMatrix();
};

/**
 * get our shader handle refs
 * @return {wa.render.ShaderHandleRefs}
 */
wa.render.Renderer.prototype.getShaderHandleRefs = function() {
    return this.shaderHandleRefs;
};