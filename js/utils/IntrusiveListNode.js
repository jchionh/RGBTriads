/**
 * User: jchionh
 * Date: 2/23/13
 * Time: 4:29 AM
 */

// namespace
wa.utils = wa.utils || {};

/**
 * this is a intrusive list node (extra parent and child added for use in a tree)
 * @constructor
 */
wa.utils.IntrusiveListNode = function() {
    this.nParent = null;
    this.nSibling = null;
    this.nFirstChild = null;
};

/**
 *
 * @param {wa.utils.IntrusiveListNode} parent
 */
wa.utils.IntrusiveListNode.prototype.setParent = function(parent) {
    this.nParent = parent;
}

/**
 *
 * @param {wa.utils.IntrusiveListNode} firstChild
 */
wa.utils.IntrusiveListNode.prototype.setFirstChild = function(firstChild) {
    this.nFirstChild = firstChild;
}

/**
 *
 * @param {wa.utils.IntrusiveListNode} sibling
 */
wa.utils.IntrusiveListNode.prototype.setSibling = function(sibling) {
    this.nSibling = sibling;
}

/**
 *
 * @return {wa.utils.IntrusiveListNode}
 */
wa.utils.IntrusiveListNode.prototype.getFirstChild = function() {
    return this.nFirstChild;
};

/**
 *
 * @return {wa.utils.IntrusiveListNode}
 */
wa.utils.IntrusiveListNode.prototype.getSibling = function() {
    return this.nSibling;
};

/**
 *
 * @return {wa.utils.IntrusiveListNode}
 */
wa.utils.IntrusiveListNode.prototype.getParent = function() {
    return this.nParent;
};