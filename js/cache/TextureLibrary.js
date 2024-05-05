/**
 * User: jchionh
 * Date: 2/25/13
 * Time: 9:55 PM
 */
// namespace
wa.cache = wa.cache || {};

/**
 * Texture library holds a cache of uploaded textures
 * @param {WebGLRenderingContext} gl
 * @constructor
 */
wa.cache.TextureLibrary = function(gl) {
    this.gl = gl;
    // the cache object that holds all the created textures
    this.cache = {};
    // create a default 1x1 white texture for untextured images
    this.addDefaultTexture();
};

/**
 * with a textureId, get a texture object or null
 * @param {string} textureId
 * @return {null|wa.texture.Texture}
 */
wa.cache.TextureLibrary.prototype.getTexture = function(textureId) {
    var texture = this.cache[textureId];
    if (typeof texture === 'undefined') {
        return null;
    }
    return texture;
};

/**
 * add a texture to the library
 * this method does a few things:
 * 1. check for existing texture
 * 2. if existing texture does not exist,
 * 3. upload it to the GPU
 * 4. create a new texture object
 * 5. store it in the library
 * @param {String} textureId
 * @param {Image} image
 * @param {Boolean} genMipMaps
 */
wa.cache.TextureLibrary.prototype.addTexture = function(textureId, image, genMipMaps) {
    var texture = this.getTexture(textureId);
    // if we have an existing texture, let's return it
    if (texture !== null) {
        return texture;
    }

    var minFilter = genMipMaps ? this.gl.LINEAR_MIPMAP_LINEAR : this.gl.LINEAR;
    var maxFilter = genMipMaps ? this.gl.LINEAR_MIPMAP_LINEAR : this.gl.LINEAR;
    
    if (wa.gWebGLType !== "webgl2") 
    {
        maxFilter = this.gl.LINEAR;
    }

    // we do not have an existing texture, load it to GPU
    var textureHandle = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, textureHandle);
    // Set the parameters so we can render any size image.
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);

    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, minFilter);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, maxFilter);

    //this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    //this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);

    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
    if (genMipMaps) {
        this.gl.generateMipmap(this.gl.TEXTURE_2D);
    }
    // create the texture object
    texture = new wa.texture.Texture();
    texture.textureHandle = textureHandle;
    texture.width = image.width;
    texture.height = image.height;
    texture.id = textureId;
    // add to library
    this.cache[textureId] = texture;
    // and return it
    return texture;
};

/**
 * we create a 1x1 white texture for default untextured quads
 */
wa.cache.TextureLibrary.prototype.addDefaultTexture = function() {
    var defaultTexHandle = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, defaultTexHandle);
    // Set the parameters so we can render any size image
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);

    this.gl.texImage2D(
        this.gl.TEXTURE_2D, 0,
        this.gl.RGBA, 1, 1, 0,
        this.gl.RGBA,
        this.gl.UNSIGNED_BYTE,
        new Uint8Array([255, 255, 255, 255]));

    // create the texture object
    var texture = new wa.texture.Texture();
    texture.textureHandle = defaultTexHandle;
    texture.width = 1;
    texture.height = 1;
    texture.id = wa.render.RenderConstants.DEFAULT_TEXTURE_ID;
    // add to library
    this.cache[wa.render.RenderConstants.DEFAULT_TEXTURE_ID] = texture;
};