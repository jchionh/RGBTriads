/**
 * User: jchionh
 * Date: 6/23/13
 * Time: 10:09 AM
 */

// namespace
wa.anim = wa.anim || {};

/**
 * this is the base anim object that other specific
 * animations will extend from
 * @constructor
 */
wa.anim.Anim = function() {
};

/**
 * called when an anim is started and addede to the list
 */
wa.anim.Anim.prototype.onStart = function() {

};

/**
 * the anim's update call
 * @param {number} dt
 */
wa.anim.Anim.prototype.onUpdate = function(dt) {

};

/**
 * called when anim has ended and removed from the list
 */
wa.anim.Anim.prototype.onStop = function() {

};

/**
 * this is that the anim manager uses to determine whether to stop an anim.
 * @returns {boolean}
 */
wa.anim.Anim.prototype.hasEnded = function() {
    return true;
};

/**
 * start the anim by adding it to the anim manager
 */
//wa.anim.Anim.prototype.start = function() {

//};

/**
 * stop the anim
 */
//wa.anim.Anim.prototype.stop = function() {

//};