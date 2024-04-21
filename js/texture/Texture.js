/**
 * User: jchionh
 * Date: 2/25/13
 * Time: 9:58 PM
 */
// namespace
wa.texture = wa.texture || {};

/**
 * Texture is a data structure that stores
 * textures that has been uploaded to the gpu
 * @constructor
 */
wa.texture.Texture = function() {
    this.id = "";
    this.textureHandle = null;
    this.width = 1;
    this.height = 1;
};
