/**
 * User: jchionh
 * Date: 2/24/13
 * Time: 5:06 PM
 */

wa.cahce = wa.cache || {};
wa.cache.QuadShapeConst.TEX_COORDS = new Float32Array([
    0.0, 0.0, // top left
    0.0, 1.0, // bot left
    1.0, 0.0, // top right
    1.0, 1.0  // bot right
]);
wa.cache.QuadShapeConst.TexCoordKey = {};
wa.cache.QuadShapeConst.TexCoordKey.FULL = "FULL";

/**
 * This is a library of vertex buffers.
 * it creates vertex buffers for re-use
 * @param {WebGLRenderingContext} gl
 * @constructor
 */
wa.cache.QuadTexCoordBufferLibrary = function(gl) {
    // store a reference to the gl context, in order
    // to create and delete buffers
    this.gl = gl;

    // this is our cache object that caches VBOs for re-use
    this.cache = {};

    // create a defualt tex coord buffer
    this.createVBO(wa.cache.QuadShapeConst.TexCoordKey.FULL, wa.cache.QuadShapeConst.TEX_COORDS);
};

/**
 * here we find a already created VBO of this dimension. if it does not exist, create it
 * @param {string} texCoordKey
 * @return {WebGLBuffer} the vbo for this dimensions
 */
wa.cache.QuadTexCoordBufferLibrary.prototype.getVBO = function(texCoordKey) {
    // create a key for lookup
    var key = "" + texCoordKey;
    var vbo = this.cache[key];
    if (typeof vbo !== 'undefined') {
        // return if we found it
        return vbo;
    }
    return null;
};

/**
 * create a texcoord vbo with texCoordKey as the key and the data
 * @param {string} texCoordKey the key to the cache
 * @param {Float32Array} data
 * @return {WebGLBuffer}
 */
wa.cache.QuadTexCoordBufferLibrary.prototype.createVBO = function(texCoordKey, data) {
    // if not, let's create a vbo
    var buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);

    // set the data into the vbo
    this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);

    var key = texCoordKey;
    // now we have our buffer, let's store it into our cache
    this.cache[key] = buffer;
    // and return this buffer
    return buffer;
};
