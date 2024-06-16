/**
 * User: jchionh
 * Date: 3/3/13
 * Time: 10:31 PM
 */
// namespace
wa.states = wa.states || {};

/**
 *
 * // loads up images and displays them in 3D space
 *
 * @constructor
 * @extends wa.runstate.GLRunState
 */
wa.states.RGBTriads = function() {
    // call the super class init
    wa.runstate.GLRunState.call(this, wa.runstate.RunFlag.SUSPEND_LOWER);
    this.scene = new wa.render.Scene();
    /**
     *
     * @type {Array<wa.entity.ImageEntity>}
     */
    this.imageEntities = [];
};

// extend from GLRunState
wa.utils.extend(wa.states.RGBTriads, wa.runstate.GLRunState);


/**
 * onstart
 * @override
 */
wa.states.RGBTriads.prototype.onStart = function() {
    console.log('RGBTriads::onStart');
    var root = this.scene.getRoot();

    var canvasWidth = wa.gCanvasElement.clientWidth;
    var halfCanvasWidth = canvasWidth / 2.0;
    var canvasHeight = wa.gCanvasElement.clientHeight;
    var halfCanvasHeight = canvasHeight / 2.0;

   this.rgbTriadImage = new wa.entity.RGBTriadImageEntity();
   // load image
   var selectedImage = wa.gSelectImage.value;
   var selectedTriad = wa.gSelectTriad.value;
   this.rgbTriadImage.loadImageURL(selectedTriad, selectedImage, false);
   this.rgbTriadImage.setDimensions(1600, 1200);
   this.rgbTriadImage.texScale[v.X] = wa.entity.ImageEntityGlobals.rgbTexScale;
   this.rgbTriadImage.texScale[v.Y] = wa.entity.ImageEntityGlobals.rgbTexScale;
   this.rgbTriadImage.texScale[v.Z] = 1.00;

   wa.utils.inList.addChild(root, this.rgbTriadImage);
};

/**
 * onstop
 * @override
 */
wa.states.RGBTriads.prototype.onStop = function() {
    this.rgbTriadImag.release();
    this.rgbTriadImag = null;

    // release our scene
    this.scene.release();
    this.scene = null;
    console.log('StaticImages::onStop');
};

/**
 * update
 * @override
 * @param {number} dt
 */
wa.states.RGBTriads.prototype.onUpdate = function(dt) {
    //console.log('StaticImages::onUpdate');
    this.rgbTriadImage.texScale[v.X] = wa.entity.ImageEntityGlobals.rgbTexScale;
    this.rgbTriadImage.texScale[v.Y] = wa.entity.ImageEntityGlobals.rgbTexScale;
    this.rgbTriadImage.texScale[v.Z] = 1.00;
};

/**
 * @override
 * @param {number} dt
 * @param {WebGLRenderingContext} gl
 */
wa.states.RGBTriads.prototype.onRender = function(dt, gl) {
    //console.log('StaticImages::onRender');
    wa.gRenderer.render(gl, this.scene);
};

