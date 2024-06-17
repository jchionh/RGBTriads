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
wa.states.RGBTriadVideo = function() {
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
wa.utils.extend(wa.states.RGBTriadVideo, wa.runstate.GLRunState);


/**
 * onstart
 * @override
 */
wa.states.RGBTriadVideo.prototype.onStart = function() {
    console.log('RGBTriadVideo::onStart');
    var root = this.scene.getRoot();
    
    var canvasWidth = wa.gCanvasElement.clientWidth;
    var halfCanvasWidth = canvasWidth / 2.0;
    var canvasHeight = wa.gCanvasElement.clientHeight;
    var halfCanvasHeight = canvasHeight / 2.0;

    this.rgbTriadVideo = new wa.entity.RGBTriadVideoEntity();
    // load image
    var selectedImage = wa.gSelectImage.value;
    selectedImage = "images/black_screen_1600_1200.png";
    var selectedTriad = wa.gSelectTriad.value;
    var selectedVideoIndex = wa.gSelectVideo.value;
    this.rgbTriadVideo.videoUrl = wa.data.VideoListURLs[selectedVideoIndex].url;
    this.rgbTriadVideo.loadImageURL(selectedTriad, selectedImage, false);

    this.rgbTriadVideo.setDimensions(1600, 1200);
    this.rgbTriadVideo.texScale[v.X] = wa.entity.ImageEntityGlobals.CurrentDemoSettings.rgbTexScale;
    this.rgbTriadVideo.texScale[v.Y] = wa.entity.ImageEntityGlobals.CurrentDemoSettings.rgbTexScale;
    this.rgbTriadVideo.texScale[v.Z] = 1.00;

    wa.utils.inList.addChild(root, this.rgbTriadVideo);
};

/**
 * onstop
 * @override
 */
wa.states.RGBTriadVideo.prototype.onStop = function() {
    // cleanup
    this.rgbTriadImag.release();
    this.rgbTriadImag = null;

    this.mainImage.release();
    this.mainImage = null;

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
wa.states.RGBTriadVideo.prototype.onUpdate = function(dt) {
    // check audio
    var doAudio = wa.entity.ImageEntityGlobals.doAudio;
    if (this.rgbTriadVideo.videoElement.muted != !doAudio) {
        this.rgbTriadVideo.videoElement.muted = !doAudio;
    }

    if (this.rgbTriadVideo.videoElement.volume != wa.entity.ImageEntityGlobals.volume) {
        this.rgbTriadVideo.videoElement.volume = wa.entity.ImageEntityGlobals.volume;
    }

    this.rgbTriadVideo.texScale[v.X] = wa.entity.ImageEntityGlobals.CurrentDemoSettings.rgbTexScale;
    this.rgbTriadVideo.texScale[v.Y] = wa.entity.ImageEntityGlobals.CurrentDemoSettings.rgbTexScale;
    this.rgbTriadVideo.texScale[v.Z] = 1.00;
    this.rgbTriadVideo.update(dt);

    /* Testing out mouse input
    if (wa.gInputManager.mouseInput.isMouseDown)
    {
        console.log("pos: (" + wa.gInputManager.mouseInput.mousePos[v.X] + ", " + wa.gInputManager.mouseInput.mousePos[v.X] + ") delta: ("+ wa.gInputManager.mouseInput.mouseDelta[v.X] + ", " + wa.gInputManager.mouseInput.mouseDelta[v.X] + ")");
    }
    */
};

/**
 * @override
 * @param {number} dt
 * @param {WebGLRenderingContext} gl
 */
wa.states.RGBTriadVideo.prototype.onRender = function(dt, gl) {
    //console.log('StaticImages::onRender');
    wa.gRenderer.render(gl, this.scene);
};

