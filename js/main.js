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
    wa.gFrameTimeElement = document.getElementById('frameTimeText');
    wa.gFrameTimeSlidingWindow = new wa.data.SlidingWindow(10, 0.0);

    var selectElement = document.getElementById('ImageSelect');

    for (let i = 0; i < wa.data.ImageListURLs.length; ++i) {
        let opt = document.createElement("option");
        opt.value= wa.data.ImageListURLs[i];
        opt.innerHTML = wa.data.ImageListURLs[i].slice("images/".length);
        // then append it to the select element
        selectElement.appendChild(opt);
    }

    var selectVideoElement = document.getElementById('VideoSelect');
    for (let i = 0; i < wa.data.VideoListURLs.length; ++i) {
        let opt = document.createElement("option");
        // just set the index
        opt.value = i;
        opt.innerHTML = wa.data.VideoListURLs[i].desc;
        // then append it to the select element
        selectVideoElement.appendChild(opt);
    }

    var selectTriadElement = document.getElementById('TriadSelect');

    for (let i = 0; i < wa.data.RGBTriadListURLs.length; ++i) {
        let opt = document.createElement("option");
        opt.value= wa.data.RGBTriadListURLs[i];
        opt.innerHTML = wa.data.RGBTriadListURLs[i].slice("images/".length);
        // then append it to the select element
        selectTriadElement.appendChild(opt);
    }

    wa.gPrevTimestamp = new Date().getTime();
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

    // now, use khronos helper to test for webGL support and setup the gl context
    gl = WebGLUtils.setupWebGL(wa.gCanvasElement);
    if (!gl) {
        console.log("Browser does not support WebGL");
        return;
    } else {
        if (wa.gWebGLType !== "webgl2") {
            console.log("Require Browser to support WebGL2");
            return;
        }
        console.log("WebGL2 initialized.");
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
    let initialRunState = new wa.states.InitialState();
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
    wa.gRGBTriadState = new wa.states.RGBTriadVideo();
    wa.gStateRunner.addState(wa.gRGBTriadState);

    // after adding the run state, update the current demo settings
    let selectedVideoIndex = wa.gSelectVideo.value;
    updateCurrentDemoSettings(wa.data.VideoListURLs[selectedVideoIndex].settings)

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
    // do videoImageValues
    setVideoImageValues(currentSettings);

    // do triads
    setRGBTriadValues(currentSettings);

    // do scanlines
    setScanLineValues(currentSettings);

    // do vignette
    setVignetteValues(currentSettings);

    // do curvature
    setCurvatureValues(currentSettings);

    // do orientation
    setOrientationValues(currentSettings);
}

/**
 * Do the 3D fun thing!
 */
function do3dFunOnOff() {
    var do3dFun = document.getElementById("do3dFun").checked;
    document.getElementById("do3dFunText").innerText = do3dFun ? "On" : "Off";
    wa.entity.ImageEntityGlobals.do3dFun = do3dFun;
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
 * turn curvature on or off
 */
function curvatureOnOff() {
    var doCurvature = document.getElementById("doCurvature").checked;
    document.getElementById("doCurvatureText").innerText = doCurvature ? "On" : "Off";
    wa.entity.ImageEntityGlobals.doCurvature = doCurvature;
}

/**
 * change the curvature type
 * @param {document.input.radioElement} radioElement
 */
function curvatureChange(radioElement) {
    // console.log("Curvature changed to: " + radioElement.value);
    wa.entity.ImageEntityGlobals.curvatureType = parseInt(radioElement.value);
}

/**
 * change the orientation
 * @param {string} orientation 
 */
function orientationChange(orientation) {
    if (wa.entity.ImageEntityGlobals.orientation === orientation) {
        return;
    }
    wa.entity.ImageEntityGlobals.orientation = orientation;
    wa.entity.ImageEntityGlobals.orientationNeedsChange = true;
    console.log('Change orientation to: ' + orientation);
}

/**
 * turn triads on or off
 */
function triadsOnOff() {
    var doTriads = document.getElementById("doTriads").checked;
    document.getElementById("doTriadsText").innerText = doTriads ? "On" : "Off";
    wa.entity.ImageEntityGlobals.doTriads = doTriads;
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

/**
 * update the state of the slider
 * @param {String} name
 */
function sliderChangedGlobal(name) {
    var value = document.getElementById(name).value;
    document.getElementById(name + "Text").innerText = "" + value;
    wa.entity.ImageEntityGlobals[name] = value;
}

function reset3dFun() {
    wa.entity.ImageEntityGlobals.reset3dFun = true;
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

/**
 * Set the orientation values
 * @param {wa.data.DemoSettings} currentSettings
 */
function setOrientationValues(currentSettings) {

    var orientation = currentSettings.orientation;

    var horizElement = document.getElementById('horizontal');
    var vertElement = document.getElementById('vertical');

    if (orientation === 'horizontal') 
    {
        horizElement.checked = true;
        vertElement.checked = false;
    }
    else
    {
        horizElement.checked = false;
        vertElement.checked = true;
    }

    orientationChange(orientation);
}

/**
 * Set Curvature Settings
 * @param {wa.data.DemoSettings} currentSettings
 */
function setCurvatureValues(currentSettings) {
    var name = "outerWarp";
    var outerWarp = currentSettings[name];
    document.getElementById(name).value = outerWarp;
    document.getElementById(name + "Text").innerText = outerWarp;
    wa.entity.ImageEntityGlobals.CurrentDemoSettings[name] = outerWarp;

    name = "innerWarp";
    var innerWarp = currentSettings[name];
    document.getElementById(name).value = innerWarp;
    document.getElementById(name + "Text").innerText = innerWarp;
    wa.entity.ImageEntityGlobals.CurrentDemoSettings[name] = innerWarp;

    name = "gradientRatio";
    var gradientRatio = currentSettings[name];
    document.getElementById(name).value = gradientRatio;
    document.getElementById(name + "Text").innerText = gradientRatio;
    wa.entity.ImageEntityGlobals.CurrentDemoSettings[name] = gradientRatio;

    name = "curvature";
    var curvature = currentSettings[name];
    document.getElementById(name).value = curvature;
    document.getElementById(name + "Text").innerText = curvature;
    wa.entity.ImageEntityGlobals.CurrentDemoSettings[name] = curvature;
}

function defaultCurvatureValues() {
    setCurvatureValues(wa.entity.ImageEntityGlobals.DefaultDemoSettings);
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

function defaultRGBValues() {
    var defaultValue = 1.0;
    var name = "rBrightness";
    document.getElementById(name).value = defaultValue;
    document.getElementById(name + "Text").innerText = defaultValue;
    wa.entity.ImageEntityGlobals.CurrentDemoSettings[name] = defaultValue;
    
    name = "gBrightness";
    document.getElementById(name).value = defaultValue;
    document.getElementById(name + "Text").innerText = defaultValue;
    wa.entity.ImageEntityGlobals.CurrentDemoSettings[name] = defaultValue;

    name = "bBrightness";
    document.getElementById(name).value = defaultValue;
    document.getElementById(name + "Text").innerText = defaultValue;
    wa.entity.ImageEntityGlobals.CurrentDemoSettings[name] = defaultValue;
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

    setVideoImageValues(currentSettings);
    
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
    wa.gDelta = Math.max(0, timestamp - wa.gPrevTimestamp);
    wa.gPrevTimestamp = timestamp;

    wa.gFrameTimeSlidingWindow.insertNumber(wa.gDelta);
    var averageFrameTime = wa.gFrameTimeSlidingWindow.average();
    
    wa.gFrameTimeElement.innerHTML = averageFrameTime.toFixed(2);
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
                let msg = 'state: [' + selectedState + '] not implemented yet.';
                console.log(msg);
                wa.gMsgArea.innerHTML = msg;
                break;
        }
    }
}

