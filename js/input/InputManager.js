/**
 * User: jchionh
 * Date: 3/3/13
 * Time: 7:04 PM
 */
// namespace
wa.input = wa.input || {};

// we have an inout manager
/**
 *
 * @param {HTMLElement} htmlElement
 * @constructor
 */
wa.input.InputManager = function(htmlElement) {
    this.trackedElement = htmlElement;
    this.mouseInput = new wa.input.MouseInput(htmlElement);
};

/**
 * release events handlers from the DOM
 * @constructor
 */
wa.input.InputManager.prototype.release = function() {
    this.mouseInput.release();
    this.trackedElement = null;
};

/**
 * after one update loop, we clear the states in preparation for the next loop
 */
wa.input.InputManager.prototype.clearStates = function() {
    this.mouseInput.clearStates();
};