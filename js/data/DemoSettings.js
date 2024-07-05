/**
 * User: jchionh
 * Date: 5/26/24
 * Time: 11:03 PM
 */

// namespace
wa.data = wa.data || {};

/**
 * Demo Settings is a struct that inits default param settings
 * to be used when a specific game demo is displayed
 * @constructor
 */
wa.data.DemoSettings = function() {
    // triads settings
    this.doTriads = true;
    this.rgbTexScale = 25.0;
    this.imageBrightness = 2.18;
    this.rBrightness = 1.0;
    this.gBrightness = 1.0;
    this.bBrightness = 1.0;

    // scan lines settings
    this.doScanLines = true;
    this.scanLinesDensity = 80;
    this.scanLinesOpacity = 0.25;

    // vignette settings
    this.doVignette = true;
    this.vigOuterBorder = 0.866;
    this.vigFade = 50;
    this.fStop = 12.0;

    // video image settings
    this.saturation = 0.0;
    this.brightness = 0.0;
    this.contrast = 0.0;

    // curvature
    this.doCurvature = true;
    this.outerWarp = 0.88;
    this.innerWarp = 0.0;
    this.gradientRatio = 0.375;
    this.curvature = 0.065;
    this.curvatureType = 0;
}
