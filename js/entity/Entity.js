/**
 * User: jchionh
 * Date: 2/23/13
 * Time: 11:00 PM
 */
// namespace
wa.entity = wa.entity || {};

/**
 * an entity
 * @constructor
 * @extends wa.render.SceneNode
 */
wa.entity.Entity = function() {
    // calls base class ctor
    wa.render.SceneNode.call(this);
}

// extends entity to scene node
wa.utils.extend(wa.entity.Entity, wa.render.SceneNode);

// entity declares an update function
/**
 * update function takes a delta time
 * @param {number} dt
 */
wa.entity.Entity.prototype.update = function(dt) {

};
