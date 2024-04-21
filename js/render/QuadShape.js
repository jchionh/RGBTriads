/**
 * User: jchionh
 * Date: 2/23/13
 * Time: 9:47 PM
 */
// namespace
wa.render = wa.render || {};

/**
 * Quad shape defines a quad
 * @constructor
 * @extends wa.render.Shape
 */
wa.render.QuadShape = function() {
    // call our base class ctor
    wa.render.Shape.call(this);

    // number of vertices in the quad
    this.numVertices = 4;
    this.width = 1;
    this.height = 1;

    // now init our buffers
    this.setVertexBufferObject(wa.gVtxLibrary.getVBO(1, 1));
    this.setColorBufferObject(wa.gClrLibrary.getVBO(wa.cache.QuadShapeConst.ColorKey.WHITE));
    this.setTexCoordBufferObject(wa.gTexCoordLibrary.getVBO(wa.cache.QuadShapeConst.TexCoordKey.FULL));
};

// quad shape extends from shape
wa.utils.extend(wa.render.QuadShape, wa.render.Shape);

/**
 * here we set the dims of the quad, this will re-init the vertex buffers
 * @param {number} width
 * @param {number} height
 */
wa.render.QuadShape.prototype.setDimensions = function(width, height) {
    this.setVertexBufferObject(wa.gVtxLibrary.getVBO(width, height));
    this.width = width;
    this.height = height;
};

/**
 * get the width
 * @return {Number}
 */
wa.render.QuadShape.prototype.getWidth = function() {
    return this.width;
};

/**
 * get the height
 * @return {Number}
 */
wa.render.QuadShape.prototype.getHeight = function() {
    return this.height;
};