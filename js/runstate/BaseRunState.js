/**
 * User: jchionh
 * Date: 3/3/13
 * Time: 8:37 PM
 */
// namespace
wa.runstate = wa.runstate || {};

/**
 * runstate flag
 *
 * SUSPEND_LOWER: when we have this flag, any state at the bottom of this state in the stack is
 *                suspended
 *
 * RUN_LOWER:     with this flag, any state below this state in the stack, we run them.
 *
 * @type {wa.runstate.RunFlag}
 */
wa.runstate.RunFlag = { "SUSPEND_LOWER": 0, "RUN_LOWER": 1 };

/**
 * BaseRunState defines a base state of the state machine.
 * it will have these methods:
 *
 * onStart()
 * onUpdate(dt)
 * onRender(dt)
 * onStop()
 *
 * @param {wa.runstate.RunFlag} runFlag
 * @constructor
 */
wa.runstate.BaseRunState = function(runFlag) {

    // default suspend lower if runFlag is not set
    this.runFlag = runFlag || wa.runstate.RunFlag.SUSPEND_LOWER;

    // if stopped, our state runner will stop this state and remove it from the run stack
    this.stopped = false;
};

/**
 * onStart is called once when this state is added to the run stack
 */
wa.runstate.BaseRunState.prototype.onStart = function() {

};

/**
 * onStop is called once when this stat is removed from the run stack
 */
wa.runstate.BaseRunState.prototype.onStop = function() {

};

/**
 * onUpdate call is called every loop
 * this is meant to perform calculations and NOT render calls, rendering is done in onRender
 * @param {number} dt the delta time since the last call
 */
wa.runstate.BaseRunState.prototype.onUpdate = function(dt) {

};

/**
 * onRender called every loop
 * this method is meant to do ONLY render calls
 * @param {number} dt
 * @param {Object} ctx the rendering context, -- can be gl, or 2d canvas
 */
wa.runstate.BaseRunState.prototype.onRender = function(dt, ctx) {
    //console.log('BaseRunState::onRender');
};

/**
 * do we suspend lower for this runstate?
 * @return {Boolean}
 */
wa.runstate.BaseRunState.prototype.suspendLower = function() {
    return this.runFlag === wa.runstate.RunFlag.SUSPEND_LOWER;
};