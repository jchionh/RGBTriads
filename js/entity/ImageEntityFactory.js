/**
 * User: jchionh
 * Date: 5/22/13
 * Time: 7:32 PM
 */

// namespace
wa.entity = wa.entity || {};

/**
 *
 * given a array of string for the urls of the images, create and return
 * the array of image entities backed by these images.
 *
 * @param {Array.<string>} imageUrlArray
 * @return {Array.<wa.entity.ImageEntity>} the array of image entities
 */
wa.entity.createImageEntityArray = function(imageUrlArray) {
    var imageEntityArray = [];
    // now init all our images in the imageList
    for (var i = 0; i < imageUrlArray.length; ++i) {
        var imageEntity = new wa.entity.ImageEntity();
        // load images
        imageEntity.loadImageURL(imageUrlArray[i]);
        // add them to our array
        imageEntityArray.push(imageEntity);
    }
    return imageEntityArray;
};
