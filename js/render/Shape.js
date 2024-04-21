/**
 * User: jchionh
 * Date: 2/23/13
 * Time: 9:05 PM
 */
// namespace
wa.render = wa.render || {};

/**
 * Shape contains the information to define a 3D shape
 * - the vertex buffer objects
 * - the texture coordinate buffer object
 * - the vertex color buffer object
 * @param {WebGLRenderingContext} gl
 * @constructor
 */
wa.render.Shape = function(gl) {

    // store a reference to the gl context for creation of buffers
    // and clearing of buffers

    // these are the vertex buffer objects
    this.vertices = null;
    this.vtxColors = null;
    this.texCoords = null;
    this.numVertices = 0;
};

/**
 *
 * @param {WebGLBuffer} vbo
 */
wa.render.Shape.prototype.setVertexBufferObject = function(vbo) {
    this.vertices = vbo;
};

/**
 *
 * @param {WebGLBuffer} vbo
 */
wa.render.Shape.prototype.setColorBufferObject = function(vbo) {
    this.vtxColors = vbo;
};

/**
 *
 * @param {WebGLBuffer} vbo
 */
wa.render.Shape.prototype.setTexCoordBufferObject = function(vbo) {
    this.texCoords = vbo;
};

/**
 *
 * @return {number} the number of vertices
 */
wa.render.Shape.prototype.getNumVertices = function() {
    return this.numVertices;
};

/**
 *
 * @return {WebGLBuffer} vertex buffer object
 */
wa.render.Shape.prototype.getVertexBufferObject = function() {
    return this.vertices;
};

/**
 *
 * @return {WebGLBuffer} the color buffer object
 */
wa.render.Shape.prototype.getColorBufferObject = function() {
    return this.vtxColors;
};

/**
 *
 * @return {WebGLBuffer} the texture coords buffer object
 */
wa.render.Shape.prototype.getTexCoordBufferObject = function() {
    return this.texCoords;
};