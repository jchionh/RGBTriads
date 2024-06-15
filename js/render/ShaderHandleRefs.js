/**
 * User: jchionh
 * Date: 2/21/13
 * Time: 11:00 PM
 */

// namespace
wa.render = wa.render || {};
/**
 * structure that stores reference to the shader
 * @constructor
 */
wa.render.ShaderHandleRefs = function() {
    this.shaderProgram = null; // WebGLProgram
    this.posHandle = 0; // GLint
    this.colorHandle = 0; // GLint
    this.matrixHandle = null; // WebGLUniformLocation
    this.texMatrixHandle = null; // WebGLUniformLocation
    this.texImageMatrixHandle = null; // WebGLUniformLocation
    this.texSamplerHandle = null; // WebGLUniformLocation
    this.texImageSamplerHandle = null; // WebGLUniformLocation
    this.texCoordHandle = 0; // GLint
    this.doVignetteHandle = 0; // bool
    this.vigOuterHandle = 0; // float
    this.vigFadeHandle = 0; // float
    this.fStop = 0; // float
    this.texCenterU = 0; // float
    this.texCenterV = 0; // float
    this.imageBrightness = 0; // float
    this.rBrightness = 0; // float
    this.gBrightness = 0; // float
    this.bBrightness = 0; // float
    this.imageWidthHandle = 0; // float
    this.imageHeightHandle = 0; // float
    this.doTriads = 0; // bool
    this.doScanLines = 0; // bool
    this.scanLinesDensity = 0; // float
    this.scanLinesOpacity = 0; // float
    this.curvature = 0; // float
    this.saturation = 0; // float
    this.brightness = 0; // float
    this.contrast = 0; // float

};
