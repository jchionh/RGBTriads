/**
 * User: jchionh
 * Date: 2/23/13
 * Time: 6:43 PM
 */

// namespace
wa.render = wa.render || {};

/**
 * creates a viewpoint
 * @constructor
 */
wa.render.Viewpoint = function() {
    // attribs of our viewpoint
    this.position = vec3.create();
    this.lookat = vec3.create();
    this.up = vec3.create();

    // looking at the origin
    this.lookat[v.X] = 0.0;
    this.lookat[v.Y] = 0.0;
    this.lookat[v.Z] = 0.0;

    // position
    this.position[v.X] = 0.0;
    this.position[v.Y] = 0.0;
    this.position[v.Z] = 2.0;

    // up vector to the Y axis
    this.up[v.X] = 0.0;
    this.up[v.Y] = 1.0;
    this.up[v.Z] = 0.0;

    // world transform applied to the final view-proj matrix
    this.worldTranslation = vec3.create();
    this.worldScale = vec3.create();

    // near and far planes
    this.near = 1.0;
    this.far = 100.0;

    // w and h of the camera viewport
    this.width = 0.0;
    this.height = 0.0;

    // storage for the various matrices
    this.viewMatrix = mat4.create();
    this.projMatrix = mat4.create();
    this.vpMatrix = mat4.create();

    // identity the matrices
    mat4.identity(this.viewMatrix);
    mat4.identity(this.projMatrix);
    mat4.identity(this.vpMatrix);
};

/**
 * here we calculate the view projection matrix.
 * this is left empty for overriding with frustrum or ortoganal viewpoints
 */
wa.render.Viewpoint.prototype.calcViewProjMatrix = function() {
    console.log("Error! calcViewProjMatrix() has not been implemented!");
};

/**
 * when we change any of the matrix position, up vector, lookat, we need to update the matrix
 */
wa.render.Viewpoint.prototype.updateViewMatrix = function() {
    mat4.lookAt(this.position, this.lookat, this.up, this.viewMatrix);
    this.calcViewProjMatrix();
};

/**
 * whenever viewport changes, we need to update the projection matrix
 */
wa.render.Viewpoint.prototype.updateProjMatrix = function() {
    this.calcViewProjMatrix();
};

/**
 * set the dimensions of the viewport
 * @param {number} width
 * @param {number} height
 */
wa.render.Viewpoint.prototype.setDimensions = function(width, height) {
    this.width = width;
    this.height = height;
};

/**
 * setting a world translation
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
wa.render.Viewpoint.prototype.setWorldTranslation = function(x, y, z) {
    this.worldTranslation[v.X] = x;
    this.worldTranslation[v.Y] = y;
    this.worldTranslation[v.Z] = z;
};

/**
 * setting a world scale
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
wa.render.Viewpoint.prototype.setWorldScale = function(x, y, z) {
    this.worldScale[v.X] = x;
    this.worldScale[v.Y] = y;
    this.worldScale[v.Z] = z;
};

/**
 *
 * @return {mat4} the view matrix
 */
wa.render.Viewpoint.prototype.getViewMatrix = function() {
    return this.viewMatrix;
};

/**
 *
 * @return {mat4} the proj matrix
 */
wa.render.Viewpoint.prototype.getProjMatrix = function() {
    return this.projMatrix;
};

/**
 *
 * @return {mat4} the view proj matrix
 */
wa.render.Viewpoint.prototype.getViewProjMatrix = function() {
    return this.vpMatrix;
};