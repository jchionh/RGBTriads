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
    this.texSamplerHandle = null; // WebGLUniformLocation
    this.texCoordHandle = 0; // GLint
    this.doVignetteHandle = 0; // bool
    this.vigOuterHandle = 0; // float
    this.vigFadeHandle = 0; // float
    this.fStop = 0; // float
    this.texCenterU = 0; // float
    this.texCenterV = 0; // float
};
