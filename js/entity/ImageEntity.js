/**
 * User: jchionh
 * Date: 2/23/13
 * Time: 11:02 PM
 */
// namespace
wa.entity = wa.entity || {};

/**
 * Image entity is a rectangle in 3D space which texture maps to an image
 * @constructor
 * @extends wa.entity.Entity
 */
wa.entity.ImageEntity = function() {
    // calls the base class ctor
    wa.entity.Entity.call(this);

    // now we have a shape
    this.shape = new wa.render.QuadShape();

    // let's have an image object to store image data too
    this.image = new Image();

    // here's out texture object used for texture mapping
    // it's inited with the default untextured 1x1 white texture
    this.texture = wa.gTextureLibrary.getTexture(wa.render.RenderConstants.DEFAULT_TEXTURE_ID);

    this.rotationSpeed = 0.0;
    this.translateSpeed = 1.0;
    this.direction = -1;
    this.resizeQuadToMatchImage = true;

    var self = this;
    this.image.onload = function() {

        // TODO: Move this chunk of code to a separate function

        // cache the values
        var imageWidth = self.image.width * 1.0;
        var imageHeight = self.image.height * 1.0;

        // when we get an image, we'll need to scale it down to our max texture dimension
        var widthScale =  wa.render.RenderConstants.MAX_TEXTURE_DIMENSION / imageWidth;
        var heightScale = wa.render.RenderConstants.MAX_TEXTURE_DIMENSION / imageHeight;
        // we'll choose the smallest scale to scale both dimesnions down
        var scale = widthScale < heightScale ? widthScale : heightScale;
        // we apply the scale only if we need to scale down to fit the maximum dims
        scale = scale < 1.0 ? scale : 1.0;
        var scaledImageWidth = Math.floor(imageWidth * scale);
        var scaledImageHeight = Math.floor(imageHeight * scale);
        //self.image.width = Math.floor(scaledImageWidth);
        //self.image.height = Math.floor(scaledImageHeight);

        // cache our original source, for setting of id
        var originalSrc = self.image.src;

        var addToLibraryNext = true;

        var scaledImage = self.image;
        
        // skip this if it is webgl2 since webgl2 supports NPOT, so we don't need extra processing
        if (wa.gWebGLType !== 'webgl2' && (!wa.utils.isPowerOfTwo(scaledImageWidth) || !wa.utils.isPowerOfTwo(scaledImageHeight))) {
            console.log("WebGL2 not found, scaling non power of 2 texture dimensions.");
            // now create a new scaled image
            var scaledCanvas = document.createElement("canvas");
            scaledCanvas.width = wa.utils.nextHighestPowerOfTwo(scaledImageWidth);
            var desiredTexScaleX = self.texScale[v.X];
            self.texScale[v.X] =  (scaledImageWidth * 1.0) / (scaledCanvas.width * 1.0) * desiredTexScaleX;
            //scaledImageWidth = scaledCanvas.width;
            scaledCanvas.height = wa.utils.nextHighestPowerOfTwo(scaledImageHeight);
            var desiredTexScaleY = self.texScale[v.Y];
            self.texScale[v.Y] =  (scaledImageHeight * 1.0) / (scaledCanvas.height * 1.0) * desiredTexScaleY;
            //scaledImageHeight = scaledCanvas.height;
            var scaledCtx = scaledCanvas.getContext("2d");
            scaledCtx.drawImage(scaledImage, 0, 0, scaledImageWidth, scaledImageHeight);
            scaledImage = new Image();
            scaledImage.src = scaledCanvas.toDataURL("image/jpeg");
            addToLibraryNext = false;
            scaledImage.onload = function() {
                var savedTexture = wa.gTextureLibrary.addTexture(originalSrc, scaledImage, true);
                //console.log("sw: " + scaledCanvas.width + " sh: " + scaledCanvas.height);
                //console.log("w: " + self.image.width + " h: " + self.image.height);
                self.texture = savedTexture;
            }
        }
        

        // now let's set our quad dimensions based on scaled image loaded values
        var quadWidthScale = wa.render.RenderConstants.MAX_QUAD_DIMENSION / scaledImageWidth * 1.0;
        var quadHeightScale = wa.render.RenderConstants.MAX_QUAD_DIMENSION / scaledImageHeight * 1.0;
        var quadScale = quadWidthScale < quadHeightScale ? quadWidthScale : quadHeightScale;
        quadScale = quadScale < 1.0 ? quadScale : 1.0;

        var scaledQuadWidth = scaledImageWidth * quadScale;
        var scaledQuadHeight = scaledImageHeight * quadScale;

        if (self.resizeQuadToMatchImage) {
            console.log("ImageEntity resize [" + scaledQuadWidth + "x" + scaledQuadHeight + "]");
            self.setDimensions(Math.floor(scaledQuadWidth), Math.floor(scaledQuadHeight));
        }

        if (addToLibraryNext) {
            var savedTexture = wa.gTextureLibrary.addTexture(originalSrc, scaledImage, false);
            //console.log("w: " + self.image.width + " h: " + self.image.height);
            self.texture = savedTexture;
        }
    };
};

// extend image entity from entity
wa.utils.extend(wa.entity.ImageEntity, wa.entity.Entity);

/**
 * release resources that we're holding on to
 * @override
 */
wa.entity.ImageEntity.prototype.release = function() {
    // call super release
    wa.entity.Entity.prototype.release.call(this);
    //console.log('ImageEntity::release');
    this.shape = null;
    this.image = null;
    this.texture = null;
};

/**
 * set the image dimensions
 * @param {number} width
 * @param {number} height
 */
wa.entity.ImageEntity.prototype.setDimensions = function(width, height) {
    this.shape.setDimensions(width, height);
};

/**
 * load the image data
 * on URL assignment into the Image object, it will fetch the image data
 * from the URL, and then call the callback onload() when done.
 * @param {string} imageURL
 * @param {Boolean} resizeQuadToMatchImage
 */
wa.entity.ImageEntity.prototype.loadImageURL = function(imageURL, resizeQuadToMatchImage) {
    this.resizeQuadToMatchImage = resizeQuadToMatchImage;
    this.image.src = imageURL;
};

/**
 * override the draw texture method to draw textures here
 * @override
 * @param {WebGLRenderingContext} gl
 * @param {wa.render.ShaderHandleRefs} shaderHandleRefs
 */
wa.entity.ImageEntity.prototype.drawTexture = function(gl, shaderHandleRefs) {

    // set the active texture and bind
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture.textureHandle);
    gl.uniform1i(shaderHandleRefs.texSamplerHandle, 0);
    gl.uniform1i(shaderHandleRefs.doVignetteHandle, wa.entity.ImageEntityGlobals.doVignette);

    gl.uniform1f(shaderHandleRefs.vigOuterHandle, wa.entity.ImageEntityGlobals.vigOuterBorder);
    gl.uniform1f(shaderHandleRefs.vigFadeHandle, wa.entity.ImageEntityGlobals.vigFade);
    gl.uniform1f(shaderHandleRefs.fStop, wa.entity.ImageEntityGlobals.fStop);

    gl.uniform1f(shaderHandleRefs.texCenterU, this.texScale[v.X] / 2.0);
    gl.uniform1f(shaderHandleRefs.texCenterV, this.texScale[v.Y] / 2.0);


    gl.bindBuffer(gl.ARRAY_BUFFER, this.shape.getTexCoordBufferObject());
    gl.enableVertexAttribArray(shaderHandleRefs.texCoordHandle);
    gl.vertexAttribPointer(shaderHandleRefs.texCoordHandle, wa.render.RenderConstants.FLOATS_PER_TEX_COORD, gl.FLOAT, false, 0, 0);

    // now let's calculate our texture matrix
    this.calcTexMatrix();

    // and send this tex matrix up into the shader
    gl.uniformMatrix4fv(shaderHandleRefs.texMatrixHandle, false, this.texMatrix);
};

/**
 * update
 * @override
 * @param {number} dt
 */
wa.entity.ImageEntity.prototype.update = function(dt) {
    /*this.orientation[o.PITCH] += this.rotationSpeed;
    if (this.orientation[o.PITCH] > 360.0) {
        this.orientation[o.PITCH] -= (this.orientation[o.PITCH] - 360.0);
    }

    this.orientation[o.ROLL] -= this.rotationSpeed;
    if (this.orientation[o.ROLL] < 0.0) {
        this.orientation[o.ROLL] += (360.0 - this.orientation[o.ROLL]);
    }

    if (this.position[v.Z] > 0.0 || this.position[v.Z] < -1000.0) {
        this.direction *= -1.0;
        this.rotationSpeed = Math.random() * 0.003;
        this.translateSpeed = Math.random() * 5.0;
        this.position[v.Z] += (this.direction * 5.5);
    }
    this.position[v.Z] += (this.direction * this.translateSpeed);*/
};


/**
 * @override
 * @param {WebGLRenderingContext} gl
 * @param {wa.render.Renderer} renderer
 */
/*
wa.entity.ImageEntity.prototype.draw = function(gl, renderer) {
    // call the super class draw
    wa.render.SceneNode.prototype.draw.call(this, gl, renderer);
};
*/


