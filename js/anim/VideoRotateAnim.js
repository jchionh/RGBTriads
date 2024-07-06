/**
 * User: jchionh
 * Date: 7/5/24
 * Time: 08:23 PM
 */

// namespace
wa.anim = wa.anim || {};

/**
 * a animation that will translate the ball from start position to end position
 * @param {wa.entity.RGBTriadVideoEntity} videoEntity
 * @param {vec3} endOrientation
 * @param {vec3} endPos
 * @param {number} animTimeMs
 * @constructor
 * @extends wa.anim.Anim
 */
wa.anim.VideoRotateAnim = function(videoEntity, endOrientation, endPos, animTimeMs) {
    // call our supper ctor
    wa.anim.Anim.call(this);

    // constants
    this.videoEntity = videoEntity;
    this.progress = 0.0;
    this.startOrientation = vec3.create(videoEntity.orientation);
    this.endOrientation = vec3.create(endOrientation);
    this.currentOrientation = vec3.create(videoEntity.orientation);
    this.startPos = vec3.create(videoEntity.position);
    this.endPos = vec3.create(endPos);
    this.currentPos = vec3.create(videoEntity.position);
    this.animTimeMs = animTimeMs;
    this.elapsedTime = 0.0;
};

// perform prototype extend
wa.utils.extend(wa.anim.VideoRotateAnim, wa.anim.Anim);

/**
 * when we're added to the anim manager
 * @override
 */
wa.anim.VideoRotateAnim.prototype.onStart = function() {
    //console.log('video rotate anim #onStart');
    this.videoEntity.setOrientation(this.startOrientation);
    this.videoEntity.setPosition(this.startPos);
    this.elapsedTime = 0;
};

/**
 * when we're finished and removed
 * @override
 */
wa.anim.VideoRotateAnim.prototype.onStop = function() {
    //console.log('video rotate anim #onStop');
    this.videoEntity.setOrientation(this.endOrientation);
    this.videoEntity.setPosition(this.endPos);
};

/**
 * @override
 * @param {number} dt (in miliseconds)
 */
wa.anim.VideoRotateAnim.prototype.onUpdate = function(dt) {
    this.elapsedTime += dt;
    this.progress = this.elapsedTime / this.animTimeMs;

    // tween all orientation radians
    //this.currentOrientation[o.YAW] = wa.anim.tweenEaseOutCubic(this.startOrientation[o.YAW], this.endOrientation[o.YAW], this.progress);
    //this.currentOrientation[o.PITCH] = wa.anim.tweenEaseOutCubic(this.startOrientation[o.PITCH], this.endOrientation[o.PITCH], this.progress);
    this.currentOrientation[o.ROLL] = wa.anim.tweenEaseOutCubic(this.startOrientation[o.ROLL], this.endOrientation[o.ROLL], this.progress);
    // affect the orientation
    this.videoEntity.setOrientation(this.currentOrientation);

    // tween all position
    //this.currentPos[v.X] = wa.anim.tweenEaseOutCubic(this.startPos[v.X], this.endPos[v.X], this.progress);
    //this.currentPos[v.Y] = wa.anim.tweenEaseOutCubic(this.startPos[v.Y], this.endPos[v.Y], this.progress);
    this.currentPos[v.Z] = wa.anim.tweenEaseOutCubic(this.startPos[v.Z], this.endPos[v.Z], this.progress);
    // affect the position
    this.videoEntity.setPosition(this.currentPos);
};

/**
 * @override
 * @returns {boolean}
 */
wa.anim.VideoRotateAnim.prototype.hasEnded = function() {
    return this.progress >= 1.0;
};

