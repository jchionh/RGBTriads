/**
 * User: jchionh
 * Date: 2/20/13
 * Time: 11:36 PM
 */

// global WebGLRenderingContext gl
gl = null;

/**
 * init our app
 */
function mainInit() {

    // initing our app globals
    wa.gTitleElement = document.getElementsByTagName('title')[0];

    var selectElement = document.getElementById('ImageSelect');

    for (var i = 0; i < wa.data.ImageListURLs.length; ++i) {
        var opt = document.createElement("option");
        opt.value= wa.data.ImageListURLs[i];
        opt.innerHTML = wa.data.ImageListURLs[i].slice("images/".length);
        // then append it to the select element
        selectElement.appendChild(opt);
    }

    var selectVideoElement = document.getElementById('VideoSelect');
    for (var i = 0; i < wa.data.VideoListURLs.length; ++i) {
        var opt = document.createElement("option");
        // just set the index
        opt.value = i;
        //opt.value= wa.data.VideoListURLs[i].url;
        opt.innerHTML = wa.data.VideoListURLs[i].desc;
        // then append it to the select element
        selectVideoElement.appendChild(opt);
    }

    var selectTriadElement = document.getElementById('TriadSelect');

    for (var i = 0; i < wa.data.RGBTriadListURLs.length; ++i) {
        var opt = document.createElement("option");
        opt.value= wa.data.RGBTriadListURLs[i];
        opt.innerHTML = wa.data.RGBTriadListURLs[i].slice("images/".length);
        // then append it to the select element
        selectTriadElement.appendChild(opt);
    }

    //wa.gSysMessageElement = document.getElementById('sysMessageArea');
    wa.gPrevTimestamp = 0;
    wa.gDelta = 0;
    wa.gTrackedInputArea = document.getElementById('renderArea');
    wa.gCanvasElement = document.getElementById('renderCanvas');
    wa.gSelectImage = document.getElementById('ImageSelect');
    wa.gSelectTriad = document.getElementById('TriadSelect');
    wa.gMsgArea = document.getElementById('msgArea');

    wa.gDevicePixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
    wa.gCanvasElement.width = wa.gCanvasElement.clientWidth * wa.gDevicePixelRatio;
    wa.gCanvasElement.height = wa.gCanvasElement.clientHeight * wa.gDevicePixelRatio;
    console.log('devicePixelRatio: ' + wa.gDevicePixelRatio);

    // wa.gCanvasContext = wa.gCanvasElement.getContext('webgl2');

    // now, use khronos helper to test for webGL support and setup the gl context
    gl = WebGLUtils.setupWebGL(wa.gCanvasElement);
    if (!gl) {
        //wa.gSysMessageElement.innerHTML = "Browser does not support WebGL";
        console.log("Browser does not support WebGL");
        return;
    } else {
        //wa.gSysMessageElement.innerHTML = "WebGL initialized.";
        console.log("WebGL initialized.");
    }

    // create our cache libraries
    wa.gVtxLibrary = new wa.cache.QuadVertexBufferLibrary(gl);
    wa.gClrLibrary = new wa.cache.QuadVertexColorBufferLibrary(gl);
    wa.gTexCoordLibrary = new wa.cache.QuadTexCoordBufferLibrary(gl);
    wa.gTextureLibrary = new wa.cache.TextureLibrary(gl);

    // new our input manager
    // REMEMBER TO RELEASE?
    wa.gInputManager = new wa.input.InputManager(wa.gTrackedInputArea);

    // new our renderer
    wa.gRenderer = new wa.render.Renderer(gl);

    // init our renderer
    wa.gRenderer.initDefaultShaders(gl, "vtxShader", "fragShader");

    // new our state runner
    wa.gStateRunner = new wa.runstate.StateRunner();

    // add a initial state to our state runner
    /**
     *
     * @type {wa.runstate.BaseRunState}
     */
    var initialRunState = new wa.states.InitialState();
    wa.gStateRunner.addState(initialRunState);

    // new a furstrum viewpoint
    wa.gViewpoint = new wa.render.FrustumViewpoint(wa.gCanvasElement.width, wa.gCanvasElement.height);
    wa.gViewpoint.updateViewMatrix();
    wa.gViewpoint.updateProjMatrix();

    // int our rendere's view
    wa.gRenderer.initView();

    // set our viewpoint into the renderer
    wa.gRenderer.setViewpoint(gl, wa.gViewpoint);

    // add a the RGB Triad State here
    //wa.gRGBTriadState = new wa.states.RGBTriads();
    wa.gRGBTriadState = new wa.states.RGBTriadVideo();
    wa.gStateRunner.addState(wa.gRGBTriadState);

    // call our mainloop the first time with a current timestamp
    mainLoop(new Date().getTime());
}

function switchImage() {
    if (wa.gRGBTriadState === null) {
        return;
    }

    var selectedImage = wa.gSelectImage.value;
    console.log("Selected Image: " + selectedImage);

    var selectedTriad = wa.gSelectTriad.value;
    console.log("Selected Triad: " + selectedTriad);

    wa.gRGBTriadState.rgbTriadImage.loadImageURL(selectedTriad, selectedImage, false);
}

function switchVideo() {
    if (wa.gRGBTriadState === null) {
        return;
    }

    var selectedVideoIndex = wa.gSelectVideo.value;
    var selectedVideo = wa.data.VideoListURLs[selectedVideoIndex].url;
    console.log("Selected Video: " + selectedVideo);

    var selectedTriad = wa.gSelectTriad.value;
    console.log("Selected Triad: " + selectedTriad);

    wa.gRGBTriadState.rgbTriadVideo.loadVideoURL(selectedTriad, selectedVideo, false);

    // after switching video, set game demo's current and default settings
    var gameDemoSettings = wa.data.VideoListURLs[selectedVideoIndex].settings;

    // use the spread operator to create a copy of the object
    wa.entity.ImageEntityGlobals.DefaultDemoSettings = { ...gameDemoSettings };
    wa.entity.ImageEntityGlobals.CurrentDemoSettings = { ...gameDemoSettings };

    updateCurrentDemoSettings(wa.entity.ImageEntityGlobals.CurrentDemoSettings);
}

/**
 * Given a demo setting, update the UI
 * @param {wa.data.DemoSettings} currentSettings
 */
function updateCurrentDemoSettings(currentSettings) {
    // do triads
    setRGBTriadValues(currentSettings);

    // do scanlines
    setScanLineValues(currentSettings);

    // do vignette
    setVignetteValues(currentSettings);
}

/**
 * turn vignette on or off
 */
function vignetteOnOff() {
    var doVignette = document.getElementById("doVignette").checked;
    document.getElementById("doVignetteText").innerText = doVignette ? "On" : "Off";
    wa.entity.ImageEntityGlobals.doVignette = doVignette;
}

/**
 * turn scanlines on or off
 */
function scanLinesOnOff() {
    var doScanLines = document.getElementById("doScanlines").checked;
    document.getElementById("doScanlinesText").innerText = doScanLines ? "On" : "Off";
    wa.entity.ImageEntityGlobals.doScanLines = doScanLines;
}

/**
 * turn audio on or off
 */
function audioOnOff() {
    var doAudio = document.getElementById("doAudio").checked;
    document.getElementById("doAudioText").innerText = doAudio ? "On" : "Off";
    wa.entity.ImageEntityGlobals.doAudio = doAudio;
}


/**
 * turn triads on or off
 */
function triadsOnOff() {
    var doTriads = document.getElementById("doTriads").checked;
    document.getElementById("doTriadsText").innerText = doTriads ? "On" : "Off";
    wa.entity.ImageEntityGlobals.doTriads = doTriads;

    var defaultDemoSettings = wa.entity.ImageEntityGlobals.DefaultDemoSettings;

    var name = "imageBrightness";
    var doTriadsBrightnessValue = defaultDemoSettings[name];
    var brightnessValue = doTriads ? doTriadsBrightnessValue : 1.0;

    document.getElementById("imageBrightness").value = brightnessValue;
    document.getElementById("imageBrightnessText").innerText = brightnessValue;
    wa.entity.ImageEntityGlobals.CurrentDemoSettings[name] = brightnessValue;
}

/**
 * update the state of the slider
 * @param {String} name
 */
function sliderChanged(name) {
    var value = document.getElementById(name).value;
    document.getElementById(name + "Text").innerText = "" + value;
    wa.entity.ImageEntityGlobals.CurrentDemoSettings[name] = value;
}

function defaultVignetteValues() {
    setVignetteValues(wa.entity.ImageEntityGlobals.DefaultDemoSettings);
}

/**
 * Set Vignette Settings
 * @param {wa.data.DemoSettings} currentSettings
 */
function setVignetteValues(currentSettings) {
    var name = "vigOuterBorder";
    var vigOuterBorder = currentSettings[name];
    document.getElementById(name).value = vigOuterBorder;
    document.getElementById(name + "Text").innerText = vigOuterBorder;
    wa.entity.ImageEntityGlobals.CurrentDemoSettings[name] = vigOuterBorder;

    name = "vigFade";
    var vigFade = currentSettings[name];
    document.getElementById(name).value = vigFade;
    document.getElementById(name + "Text").innerText = vigFade;
    wa.entity.ImageEntityGlobals.CurrentDemoSettings[name] = vigFade;

    name = "fStop";
    var fStop = currentSettings[name];
    document.getElementById(name).value = fStop;
    document.getElementById(name + "Text").innerText = fStop;
    wa.entity.ImageEntityGlobals.CurrentDemoSettings[name] = fStop;
}

function defaultScanLineValues() {
    setScanLineValues(wa.entity.ImageEntityGlobals.DefaultDemoSettings);
}

/**
 * Set Scanline Settings
 * @param {wa.data.DemoSettings} currentSettings
 */
function setScanLineValues(currentSettings) {
    var name = "scanLinesDensity";
    var scanLinesDensity = currentSettings[name];
    document.getElementById(name).value = scanLinesDensity;
    document.getElementById(name + "Text").innerText = scanLinesDensity;
    wa.entity.ImageEntityGlobals.CurrentDemoSettings[name] = scanLinesDensity;

    name = "scanLinesOpacity";
    var scanLinesOpacity = currentSettings[name];
    document.getElementById(name).value = scanLinesOpacity;
    document.getElementById(name + "Text").innerText = scanLinesOpacity;
    wa.entity.ImageEntityGlobals.CurrentDemoSettings[name] = scanLinesOpacity;
}

function defaultVideoImageValues() {
    setVideoImageValues(wa.entity.ImageEntityGlobals.DefaultDemoSettings);
}

function defaultRGBTriadValues() {
    setRGBTriadValues(wa.entity.ImageEntityGlobals.DefaultDemoSettings);
}

/**
 * Set Video Image Settings
 * @param {wa.data.DemoSettings} currentSettings
 */
function setVideoImageValues(currentSettings) {
    var name = "saturation";
    var saturation = currentSettings[name];
    document.getElementById(name).value = saturation;
    document.getElementById(name + "Text").innerText = saturation;
    wa.entity.ImageEntityGlobals.CurrentDemoSettings[name] = saturation;

    name = "brightness";
    var brightness = currentSettings[name];
    document.getElementById(name).value = brightness;
    document.getElementById(name + "Text").innerText = brightness;
    wa.entity.ImageEntityGlobals.CurrentDemoSettings[name] = brightness;

    name = "contrast";
    var contrast = currentSettings[name];
    document.getElementById(name).value = contrast;
    document.getElementById(name + "Text").innerText = contrast;
    wa.entity.ImageEntityGlobals.CurrentDemoSettings[name] = contrast;
}

/**
 * Set Triads Settings
 * @param {wa.data.DemoSettings} currentSettings
 */
function setRGBTriadValues(currentSettings) {
    var name = "rgbTexScale";
    var rgbTexScale = currentSettings[name];
    document.getElementById(name).value = rgbTexScale;
    document.getElementById(name + "Text").innerText = rgbTexScale;
    wa.entity.ImageEntityGlobals.CurrentDemoSettings[name] = rgbTexScale;

    var doTriads = document.getElementById("doTriads").checked;
    
    name = "imageBrightness";
    var doTriadsBrightnessValue = currentSettings[name];
    var brightnessValue = doTriads ? doTriadsBrightnessValue : 1.0;
    document.getElementById(name).value = brightnessValue;
    document.getElementById(name + "Text").innerText = brightnessValue;
    wa.entity.ImageEntityGlobals.CurrentDemoSettings[name] = brightnessValue;

    name = "rBrightness";
    var rBrightness = currentSettings[name];
    document.getElementById(name).value = rBrightness;
    document.getElementById(name + "Text").innerText = rBrightness;
    wa.entity.ImageEntityGlobals.CurrentDemoSettings[name] = rBrightness;

    name = "gBrightness";
    var gBrightness = currentSettings[name];
    document.getElementById(name).value = gBrightness;
    document.getElementById(name + "Text").innerText = gBrightness;
    wa.entity.ImageEntityGlobals.CurrentDemoSettings[name] = gBrightness;

    name = "bBrightness";
    var bBrightness = currentSettings[name];
    document.getElementById(name).value = bBrightness;
    document.getElementById(name + "Text").innerText = bBrightness;
    wa.entity.ImageEntityGlobals.CurrentDemoSettings[name] = bBrightness;
}


/**
 * this is our mainloop, that will be called with requestAnimationFrame
 * @param {number} timestamp
 */
function mainLoop(timestamp) {
    // calculate our delta
    wa.gDelta = timestamp - wa.gPrevTimestamp;
    wa.gPrevTimestamp = timestamp;

    // just a test of updating the title so we know our mainloop is running
    wa.gTitleElement.innerHTML = wa.gDelta;
    // request animation for the next loop call
    // note: requestAnimFrame is a polyfill for cross browser
    // the actual function name is requestAnimationFrame
    window.requestAnimFrame(mainLoop, wa.gCanvasElement);

    // perform state updates
    wa.gStateRunner.update(wa.gDelta);

    // then perform state renders
    wa.gStateRunner.render(wa.gDelta, gl);

    // clear input states
    wa.gInputManager.clearStates();
}

function switchState() {
    var selectedState = wa.gSelectState.value;
    //console.log('value: ' + selectedState);
    if (wa.gStateRunner !== null) {
        switch (selectedState) {
            case 'StaticImages':
                wa.gStateRunner.switchState(new wa.states.StaticImages());
                wa.gMsgArea.innerHTML = '[' + selectedState + ']';
                break;
            case 'FloatyImages':
                wa.gStateRunner.switchState(new wa.states.FloatyImages());
                wa.gMsgArea.innerHTML = '[' + selectedState + ']';
                break;

            case 'SpinningImages':
                wa.gStateRunner.switchState(new wa.states.SpinningImages());
                wa.gMsgArea.innerHTML = '[' + selectedState + ']';
                break;

            default:
                var msg = 'state: [' + selectedState + '] not implemented yet.';
                console.log(msg);
                wa.gMsgArea.innerHTML = msg;
                break;
        }
    }
}

