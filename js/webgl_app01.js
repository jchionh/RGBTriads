/**
 * User: jchionh
 * Date: 2/20/13
 * Time: 11:38 PM
 */

// create the app namepsace
var wa = wa || {};

// here are our globals
wa.gTitleElement = document.getElementsByTagName('title')[0];
wa.gPrevTimestamp = 0;
wa.gDelta = 0;
wa.gTrackedInputArea = document.getElementById('renderArea');
wa.gCanvasElement = document.getElementById('renderCanvas');
wa.gSelectState = document.getElementById('StateSelect');
wa.gDELTA_TEXT = "d: ";
wa.gRenderer = null;
wa.gViewpoint = null;
wa.gVtxLibrary = null;
wa.gClrLibrary = null;
wa.gTexCoordLibrary = null;
wa.gTextureLibrary = null;
wa.gInputManager = null;
wa.gStateRunner = null;
wa.gDevicePixelRatio = 1;
wa.gWebGLType = "webgl2";
wa.gRGBTriadState = null;
wa.gSelectImage = document.getElementById('ImageSelect');
wa.gSelectTriad = document.getElementById('TriadSelect');
wa.gSelectVideo = document.getElementById('VideoSelect');
