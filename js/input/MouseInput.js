/**
 * User: jchionh
 * Date: 3/3/13
 * Time: 7:11 PM
 */
// namespace
wa.input = wa.input || {};

// mouse input class
/**
 *
 * @param {HTMLElement} htmlElement
 * @constructor
 */
wa.input.MouseInput = function(htmlElement) {

    this.trackedElement = htmlElement;
    // our element position to the document
    // this is a 2D point, but we have a vec3 in our lib, so just use it.
    this.elementPos = vec3.create();

    // find our element position
    var element = htmlElement;
    // if our browser supports offsetParent
    if (element.offsetParent) {
        do {
            // loop through all parents to calcualte the offset of this elemetn from the document
            var offsetPos = vec3.create();
            offsetPos[v.X] = element.offsetLeft;
            offsetPos[v.Y] = element.offsetTop;
            vec3.add(this.elementPos, offsetPos);

        } while (element = element.offsetParent);
        // if there's any more parent left, if no more, assignment operator will return undefined
        // and break out of the loop
    }

    // here are mouse states
    this.isClicked = false;
    this.isMouseDown = false;
    this.isMouseInside = false;
    this.mousePos = vec3.create();
    this.mousePrevPos = vec3.create();
    this.mouseDelta = vec3.create();


    // create our event handlers
    this.mouseClickHandler = this.mouseClick.bind(this);
    this.mouseMoveHandler = this.mouseMove.bind(this);
    this.mouseUpHandler = this.mouseUp.bind(this);
    this.mouseDownHandler = this.mouseDown.bind(this);
    this.mouseOverHandler = this.mouseOver.bind(this);
    this.mouseOutHandler = this.mouseOut.bind(this);

    // register our listeners
    this.trackedElement.addEventListener('click', this.mouseClickHandler, false);
    this.trackedElement.addEventListener('mousemove', this.mouseMoveHandler, false);
    this.trackedElement.addEventListener('mouseup', this.mouseUpHandler, false);
    this.trackedElement.addEventListener('mousedown', this.mouseDownHandler, false);
    this.trackedElement.addEventListener('mouseover', this.mouseOverHandler, false);
    this.trackedElement.addEventListener('mouseout', this.mouseOutHandler, false);
};

/**
 * clear oue states recorded from events
 */
wa.input.MouseInput.prototype.clearStates = function() {
    this.isClicked = false;
    vec3.set(v.ZERO, this.mouseDelta);
    vec3.set(this.mousePos, this.mousePrevPos);
};

/**
 * de-register events and release references
 */
wa.input.MouseInput.prototype.release = function() {

    // remove listeners
    this.trackedElement.removeEventListener('click', this.mouseClickHandler, false);
    this.trackedElement.removeEventListener('mousemove', this.mouseMoveHandler, false);
    this.trackedElement.removeEventListener('mouseup', this.mouseUpHandler, false);
    this.trackedElement.removeEventListener('mousedown', this.mouseDownHandler, false);
    this.trackedElement.removeEventListener('mouseover', this.mouseOverHandler, false);
    this.trackedElement.removeEventListener('mouseout', this.mouseOutHandler, false);

    // release references
    this.trackedElement = null;
    this.elementPos = null;
    this.mouseClickHandler = null;
    this.mouseMoveHandler = null;
    this.mouseUpHandler = null;
    this.mouseDownHandler = null;
    this.mouseOverHandler = null;
    this.mouseOutHandler = null;
};

/**
 * has the mouse clicked?
 * @param {Event} e
 */
wa.input.MouseInput.prototype.mouseClick = function(e) {
    this.isClicked = true;
};

/**
 * Mouse move event
 * @param {Event} e
 */
wa.input.MouseInput.prototype.mouseMove = function(e) {

    // record our current poistion
    this.mousePos[v.X] = e.pageX - this.elementPos[v.X];
    this.mousePos[v.Y] = e.pageY - this.elementPos[v.Y];

    // compute our delta since the last clear state
    this.mouseDelta[v.X] += this.mousePos[v.X] - this.mousePrevPos[v.X];
    this.mouseDelta[v.Y] += this.mousePos[v.Y] - this.mousePrevPos[v.Y];

    // then set our previous position
    vec3.set(this.mousePos, this.mousePrevPos);

    /*
    if (this.isMouseDown) {
        console.log("[move] x: " + this.mousePos[v.X] + " y: " + this.mousePos[v.Y] + " dx: " + this.mouseDelta[v.X] + " dy: " + this.mouseDelta[v.Y]);
    }
    */
    //console.log("[move] x: " + this.mousePos[v.X] + " y: " + this.mousePos[v.Y] + " dx: " + this.mouseDelta[v.X] + " dy: " + this.mouseDelta[v.Y]);
};

/**
 * on mouse up
 * @param {Event} e
 */
wa.input.MouseInput.prototype.mouseUp = function(e) {
    this.isMouseDown = false;
    //console.log('mouse is up!');
};

/**
 * on mouse down
 * @param {Event} e
 */
wa.input.MouseInput.prototype.mouseDown = function(e) {
    this.isMouseDown = true;
    //console.log('mouse is down!');
};

/**
 * mouse is hovering over the element
 * @param {Event} e
 */
wa.input.MouseInput.prototype.mouseOver = function(e) {
    this.isMouseInside = true;
    //console.log('mouse is inside');
};

/**
 * mouse is outside
 * @param {Event} e
 */
wa.input.MouseInput.prototype.mouseOut = function(e) {
    this.isMouseInside = false;
    this.isMouseDown = false;
    //console.log('mouse is outside');
};


