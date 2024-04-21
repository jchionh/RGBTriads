/**
 * User: jchionh
 * Date: 2/23/13
 * Time: 4:05 AM
 */

// namespace
wa.render = wa.render || {};

/**
 * Scene is a structure that is a tree.
 * Data structure of the tree is implemented using intrusive lists.
 * @constructor
 */
wa.render.Scene = function() {
    this.nRoot = new wa.render.SceneNode();
};

/**
 *
 * @return {wa.render.SceneNode}
 */
wa.render.Scene.prototype.getRoot = function() {
    return this.nRoot;
};

/**
 *
 * @param sceneNode
 */
wa.render.Scene.prototype.add = function(sceneNode) {

};

// release our entire scene
wa.render.Scene.prototype.release = function() {
    this.nRoot.firstChild = null;
    this.nRoot.nParent = null;
    this.nRoot.nSibling = null;
};
