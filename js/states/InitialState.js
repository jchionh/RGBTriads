/**
 * User: jchionh
 * Date: 3/3/13
 * Time: 10:19 PM
 */
// namesapce
wa.states = wa.states || {};

/**
 * initial run state in the stack, does nothing
 * @constructor
 * @extends wa.runstate.GLRunState
 */
wa.states.InitialState = function() {
    // call the super class init
    wa.runstate.GLRunState.call(this, wa.runstate.RunFlag.SUSPEND_LOWER);
};

// extend from GLRunState
wa.utils.extend(wa.states.InitialState, wa.runstate.GLRunState);

/**
 * onstart
 * @override
 */
wa.states.InitialState.prototype.onStart = function() {
    console.log('InitialSate::onStart');
};

/**
 * onstop
 * @override
 */
wa.states.InitialState.prototype.onStop = function() {
    console.log('InitialSate::onStop');
};
