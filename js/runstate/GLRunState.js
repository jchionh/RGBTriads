/**
 * User: jchionh
 * Date: 3/3/13
 * Time: 8:52 PM
 */
// namespace
wa.runstate = wa.runstate || {};

/**
 * GLRunState derives from runstate, but during the render
 * it takes in the WebGLRenderingContext
 * @param {wa.runstate.RunFlag} runFlags
 * @constructor
 * @extends wa.render.BaseRunState
 */
wa.runstate.GLRunState = function(runFlags) {
    // call the super class ctor
    wa.runstate.BaseRunState.call(this, runFlags);

};

// extend GLRunState from BaseRunState
wa.utils.extend(wa.runstate.GLRunState, wa.runstate.BaseRunState);

/**
 * onRender passes in the gl context
 *
 * @override
 * @param {number} dt
 * @param {WebGLRenderingContext} gl
 */
wa.runstate.GLRunState.prototype.onRender = function(dt, gl) {
    //console.log('GLRunState::onRender');
};

