/**
 * User: jchionh
 * Date: 2/23/13
 * Time: 7:22 PM
 */
// namespace
wa.render = wa.render || {};

/**
 * defines a frustrum viewpoint to calculate our projection matrix
 *
 * @constructor
 * @extends wa.render.Viewpoint
 */
wa.render.FrustumViewpoint = function(width, height) {

    // call the base class ctor
    wa.render.Viewpoint.call(this);

    this.width = width;
    this.height = height;
    this.BOTTOM = -1.0;
    this.TOP = 1.0;
    this.aspectRatio = 1.0;
};

// extend from viewpoint
wa.utils.extend(wa.render.FrustumViewpoint, wa.render.Viewpoint);

/**
 * we update the projection matrix here
 * @override
 */
wa.render.FrustumViewpoint.prototype.updateProjMatrix = function() {
    this.aspectRatio = this.width / this.height;
    //mat4.frustum(-this.aspectRatio, this.aspectRatio, this.BOTTOM, this.TOP, this.near, this.far, this.projMatrix);
    mat4.perspective(45, this.aspectRatio, this.near, this.far, this.projMatrix);
    // call the super class method
    wa.render.Viewpoint.prototype.updateProjMatrix.call(this);
};

/**
 * here, we calculate the proj matrix.
 * this applies an additional world scale and translation in order
 * to give a 1 to 1 pixel mapping on the xy plane when z=0
 * @override
 */
wa.render.FrustumViewpoint.prototype.calcViewProjMatrix = function() {
    // we compute a world scale that will map all world units on the XY plane at z=0
    // to be 1-1 mapping of pixel units on screen.
    var xExtentAtZeroZ = this.aspectRatio * this.position[v.Z];
    // the factor at the end =   sinh(PI /4) / 2.0; --> PI / 4 = 45 deg
    var mapScale = (xExtentAtZeroZ / (this.width / 2.0)) * 0.414375;

    // now we need to scale by our display dpi
    mapScale *= wa.gDevicePixelRatio;

    // mapScale will scale units to 1-1 pixel mapping on the XY plane
    this.setWorldScale(mapScale, mapScale, mapScale);

    // compute the vpMatrix here
    mat4.multiply(this.projMatrix, this.viewMatrix, this.vpMatrix);

    // perform our world transform here
    mat4.scale(this.vpMatrix, this.worldScale);
    mat4.translate(this.vpMatrix, this.worldTranslation);
};