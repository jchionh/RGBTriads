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

    // create our image entities
    /*
    this.imageEntities = wa.entity.createImageEntityArray(wa.data.ImageListURLs);

    // now init all our images to positions, and add to our scene
    for (var i = 0; i < this.imageEntities.length; ++i) {
        var imageEntity = this.imageEntities[i];
        // randomize positions
        imageEntity.position[v.X] = Math.floor(Math.random() * canvasWidth) - halfCanvasWidth;
        imageEntity.position[v.Y] = Math.floor(Math.random() * canvasHeight) - halfCanvasHeight;
        imageEntity.position[v.Z] = Math.floor(Math.random() * -1000.0);
        imageEntity.rotationSpeed = Math.random() * 0.003;
        imageEntity.translateSpeed = Math.random() * 5.0;
        imageEntity.scale[v.X] = 32.0;
        imageEntity.scale[v.Y] = 32.0;
        imageEntity.scale[v.Z] = 1.0;

        imageEntity.texScale[v.X] = 32.00;
        imageEntity.texScale[v.Y] = 32.00;
        imageEntity.texScale[v.Z] = 1.00;

        // add to our scene
        wa.utils.inList.addChild(root, imageEntity);
    }
    */
   this.rgbTriadVideo = new wa.entity.RGBTriadVideoEntity();
   // load image
   // this.rgbTriadVideo.loadImageURL("images/RGB5x3_128x128.jpg", "images/marco_slug_1.jpg", false);
   var selectedImage = wa.gSelectImage.value;
   var selectedTriad = wa.gSelectTriad.value;
   var selectedVideoIndex = wa.gSelectVideo.value;
   this.rgbTriadVideo.videoUrl = wa.data.VideoListURLs[selectedVideoIndex].url;
   this.rgbTriadVideo.loadImageURL(selectedTriad, selectedImage, false);
   // this.rgbTriadVideo.loadImageURL("images/RGB5x3_128x128.jpg", "images/metal_slug_tank_direct_1.png", false);
   this.rgbTriadVideo.setDimensions(1600, 1200);
   this.rgbTriadVideo.texScale[v.X] = wa.entity.ImageEntityGlobals.CurrentDemoSettings.rgbTexScale;
   this.rgbTriadVideo.texScale[v.Y] = wa.entity.ImageEntityGlobals.CurrentDemoSettings.rgbTexScale;
   this.rgbTriadVideo.texScale[v.Z] = 1.00;

   //this.mainImage = new wa.entity.RGBTriadVideoEntity();
   //this.mainImage.loadImageURL("images/natureflowers1342.jpg", true);

   // wa.utils.inList.addChild(root, this.mainImage);
   wa.utils.inList.addChild(root, this.rgbTriadVideo);
};

/**
 * onstop
 * @override
 */
wa.states.RGBTriadVideo.prototype.onStop = function() {
    // cleanup
    /*
    var count = this.imageEntities.length;
    for (var i = 0; i < count; ++i) {
        this.imageEntities[i].release();
        this.imageEntities[i] = null;
    }
    // clear the array
    this.imageEntities.length = 0;
    this.imageEntities = null;
    */
    this.rgbTriadImag.release();
    this.rgbTriadImag = null;

    //this.mainImage.release();
    //this.mainImage = null;

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
    //console.log('StaticImages::onUpdate');

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

