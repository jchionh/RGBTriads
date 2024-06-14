/**
 * User: jchionh
 * Date: 2/24/13
 * Time: 4:56 PM
 */

// namespace
wa.cahce = wa.cache || {};
wa.cache.QuadShapeConst.VERTEX_NORMALS_FLAT_ALONG_POSITIVE_Z = new Float32Array([
    0.0, 0.0, 1.0, // top left
    0.0, 0.0, 1.0, // bot left
    0.0, 0.0, 1.0, // top right
    0.0, 0.0, 1.0, // bot right
]);

/*
wa.cache.QuadShapeConst.VERTEX_NORMALS_OUTWARDS_15_ALONG_POSITIVE_Z = new Float32Array([
   (-0.25882 + 1.0) / 2.0,  (0.25 + 1.0) / 2.0, (0.93301 + 1.0) / 2.0, // top left
   (-0.25882 + 1.0) / 2.0, (-0.25 + 1.0) / 2.0, (0.93301 + 1.0) / 2.0, // bot left
    (0.25882 + 1.0) / 2.0,  (0.25 + 1.0) / 2.0, (0.93301 + 1.0) / 2.0, // top right
    (0.25882 + 1.0) / 2.0, (-0.25 + 1.0) / 2.0, (0.93301 + 1.0) / 2.0, // bot right
]);
*/

/*
wa.cache.QuadShapeConst.VERTEX_NORMALS_OUTWARDS_15_ALONG_POSITIVE_Z = new Float32Array([
    -0.25882,  0.25, 0.93301, // top left
    -0.25882, -0.25, 0.93301, // bot left
     0.25882,  0.25, 0.93301, // top right
     0.25882, -0.25, 0.93301, // bot right
 ]);
 */

 /*
 wa.cache.QuadShapeConst.VERTEX_NORMALS_OUTWARDS_15_ALONG_POSITIVE_Z = new Float32Array([
    0.25882,  0.25, 0.93301, // top left
    0.25882, -0.25, 0.93301, // bot left
    -0.25882,  0.25, 0.93301, // top right
    -0.25882, -0.25, 0.93301, // bot right
 ]);
 */

 wa.cache.QuadShapeConst.VERTEX_NORMALS_OUTWARDS_15_ALONG_POSITIVE_Z = new Float32Array([
    0.70711,  0.50, 0.50, // top left
    0.70711, -0.50, 0.50, // bot left
    -0.70711,  0.50, 0.50, // top right
    -0.70711,  -0.50, 0.50, // bot right
 ]);

 

wa.cache.QuadShapeConst.NormalKey = {};
wa.cache.QuadShapeConst.NormalKey.FLAT_ALONG_POSITIVE_Z = "FLAT_ALONG_POSITIVE_Z";
wa.cache.QuadShapeConst.NormalKey.OUTWARDS_15_ALONG_POSITIVE_Z = "OUTWARDS_15_ALONG_POSITIVE_Z";

/**
 * This is a library of vertex buffers.
 * it creates vertex buffers for re-use
 * @param {WebGLRenderingContext} gl
 * @constructor
 */
wa.cache.QuadVertexNormalBufferLibrary = function(gl) {
    // store a reference to the gl context, in order
    // to create and delete buffers
    this.gl = gl;

    // this is our cache object that caches VBOs for re-use
    this.cache = {};

    // let's init a default VBO of flat positive z;
    this.createVBO(wa.cache.QuadShapeConst.NormalKey.FLAT_ALONG_POSITIVE_Z, wa.cache.QuadShapeConst.VERTEX_NORMALS_FLAT_ALONG_POSITIVE_Z);
    this.createVBO(wa.cache.QuadShapeConst.NormalKey.OUTWARDS_15_ALONG_POSITIVE_Z, wa.cache.QuadShapeConst.VERTEX_NORMALS_OUTWARDS_15_ALONG_POSITIVE_Z);
};

/**
 * here we find a already created VBO of this dimension. if it does not exist, create it
 * @param {string} description
 * @return {WebGLBuffer} the vbo for this dimensions
 */
wa.cache.QuadVertexNormalBufferLibrary.prototype.getVBO = function(description) {
    // create a key for lookup
    var key = "" + description;
    var vbo = this.cache[key];
    if (typeof vbo !== 'undefined') {
        // return if we found it
        return vbo;
    }
    return null;
};

/**
 * create a normal vbo with description as the key and the data
 * @param {string} description the key to the cache
 * @param {Float32Array} data
 * @return {WebGLBuffer}
 */
wa.cache.QuadVertexNormalBufferLibrary.prototype.createVBO = function(description, data) {
    // if not, let's create a vbo
    var buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);

    // set the data into the vbo
    this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);

    var key = description;
    // now we have our buffer, let's store it into our cache
    this.cache[key] = buffer;
    // and return this buffer
    return buffer;
};