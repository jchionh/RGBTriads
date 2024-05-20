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
        opt.value= wa.data.VideoListURLs[i].url;
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

    var selectedVideo = wa.gSelectVideo.value;
    console.log("Selected Video: " + selectedVideo);

    var selectedTriad = wa.gSelectTriad.value;
    console.log("Selected Triad: " + selectedTriad);

    wa.gRGBTriadState.rgbTriadVideo.loadVideoURL(selectedTriad, selectedVideo, false);
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
    if (doTriads) 
    {
        // default the image brightness to 2.25
        var defaultImageBrightness = 2.25
        document.getElementById("imageBrightness").value = defaultImageBrightness;
        document.getElementById("imageBrightnessText").innerText = "" + defaultImageBrightness;
        wa.entity.ImageEntityGlobals.imageBrightness = defaultImageBrightness;
    }
    else
    {
        // default the image brightness to 1.0
        var defaultImageBrightness = 1.0
        document.getElementById("imageBrightness").value = defaultImageBrightness;
        document.getElementById("imageBrightnessText").innerText = "" + defaultImageBrightness;
        wa.entity.ImageEntityGlobals.imageBrightness = defaultImageBrightness;
    }
}

/**
 * update the state of the slider
 * @param {String} name
 */
function sliderChanged(name) {
    var value = document.getElementById(name).value;
    document.getElementById(name + "Text").innerText = "" + value;
    wa.entity.ImageEntityGlobals[name] = value;
}

function defaultVignetteValues() {
    var name = "vigOuterBorder";
    document.getElementById(name).value = 40.0;
    document.getElementById(name + "Text").innerText = "40.0";
    wa.entity.ImageEntityGlobals[name] = 40.0;

    name = "vigFade";
    document.getElementById(name).value = 70;
    document.getElementById(name + "Text").innerText = "70";
    wa.entity.ImageEntityGlobals[name] = 70;

    name = "fStop";
    document.getElementById(name).value = 8.0;
    document.getElementById(name + "Text").innerText = "8.0";
    wa.entity.ImageEntityGlobals[name] = 8.0;
}

function defaultScanLineValues() {
    var name = "scanLinesDensity";
    document.getElementById(name).value = 80.0;
    document.getElementById(name + "Text").innerText = "80.0";
    wa.entity.ImageEntityGlobals[name] = 80.0;

    name = "scanLinesOpacity";
    document.getElementById(name).value = 0.25;
    document.getElementById(name + "Text").innerText = "0.25";
    wa.entity.ImageEntityGlobals[name] = 0.25;
}

function defaultRGBTriadValues() {
    var name = "rgbTexScale";
    document.getElementById(name).value = 25.0;
    document.getElementById(name + "Text").innerText = "25";
    wa.entity.ImageEntityGlobals[name] = 25.0;

    var doTriads = document.getElementById("doTriads").checked;
    var brightnessValue = doTriads ? 2.25 : 1.0;
    name = "imageBrightness";
    document.getElementById(name).value = brightnessValue;
    document.getElementById(name + "Text").innerText = "" + brightnessValue;
    wa.entity.ImageEntityGlobals[name] = brightnessValue;

    name = "rBrightness";
    document.getElementById(name).value = 1.0;
    document.getElementById(name + "Text").innerText = "1.0";
    wa.entity.ImageEntityGlobals[name] = 1.0;

    name = "gBrightness";
    document.getElementById(name).value = 1.0;
    document.getElementById(name + "Text").innerText = "1.0";
    wa.entity.ImageEntityGlobals[name] = 1.0;

    name = "bBrightness";
    document.getElementById(name).value = 1.0;
    document.getElementById(name + "Text").innerText = "1.0";
    wa.entity.ImageEntityGlobals[name] = 1.0;
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

