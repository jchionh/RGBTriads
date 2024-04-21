/**
 * User: jchionh
 * Date: 2/24/13
 * Time: 4:31 PM
 */
// namespace
wa.cache = wa.cache || {};

wa.cache.QuadShapeConst = wa.cache.QuadShapeConst || {};
wa.cache.QuadShapeConst.NUM_VERTICES = 4;

wa.cache.QuadShapeConst.VERTICES = new Float32Array([
    -0.5,  0.5, 0.0, // top left
    -0.5, -0.5, 0.0, // bot left
     0.5,  0.5, 0.0, // top right
     0.5, -0.5, 0.0  // bot right
]);

/**
 * This is a library of vertex buffers.
 * it creates vertex buffers for re-use
 * @param {WebGLRenderingContext} gl
 * @constructor
 */
wa.cache.QuadVertexBufferLibrary = function(gl) {
    // store a reference to the gl context, in order
    // to create and delete buffers
    this.gl = gl;

    // this is our cache object that caches VBOs for re-use
    this.cache = {};
};

/**
 * here we find a already created VBO of this dimension. if it does not exist, create it
 * @param {number} width
 * @param {number} height
 * @return {WebGLBuffer} the vbo for this dimensions
 */
wa.cache.QuadVertexBufferLibrary.prototype.getVBO = function(width, height) {
    // create a key for lookup
    var key = "" + width + "-" + height;
    var vbo = this.cache[key];
    if (typeof vbo !== 'undefined') {
        // return if we found it
        return vbo;
    }

    // if not, let's create a vbo
    var buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    var vertexArray = new Float32Array(wa.cache.QuadShapeConst.NUM_VERTICES * wa.render.RenderConstants.FLOATS_PER_VTX);
    // iterate and set values into our temp float buffer
    // and set the values straight
    for (var i = 0; i < wa.cache.QuadShapeConst.NUM_VERTICES; ++i) {
        // for every vertex, multiply with the width and height
        var row = i * wa.render.RenderConstants.FLOATS_PER_VTX;
        vertexArray[row + v.X] = wa.cache.QuadShapeConst.VERTICES[row + v.X] * width;
        vertexArray[row + v.Y] = wa.cache.QuadShapeConst.VERTICES[row + v.Y] * height;
        vertexArray[row + v.Z] = 0.0;
    }
    // set the data into the vbo
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexArray, this.gl.STATIC_DRAW);

    // now we have our buffer, let's store it into our cache
    this.cache[key] = buffer;
    // and return this buffer
    return buffer;
};
