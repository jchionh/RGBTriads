/**
 * User: jchionh
 * Date: 2/23/13
 * Time: 4:26 AM
 */

// namespace
wa.utils = wa.utils || {};

// intrusive list namespace
wa.utils.inList = {};

/**
 * add a child to the parent
 * @param {wa.utils.IntrusiveListNode} parent
 * @param {wa.utils.IntrusiveListNode} child
 */
wa.utils.inList.addChild = function(parent, child) {
    var oldFirstChild = parent.getFirstChild();
    child.setParent(parent);
    parent.setFirstChild(child);
    child.setSibling(oldFirstChild);
};

/**
 * add a sibling to the right of old sibling
 * @param {wa.utils.IntrusiveListNode} oldSibling
 * @param {wa.utils.IntrusiveListNode} newSibling
 */
wa.utils.inList.addSibling = function(oldSibling, newSibling) {
    // they have the same parent
    newSibling.setParent(oldSibling.getParent());
    var nextSibling = oldSibling.getSibling();
    oldSibling.setSibling(newSibling);
    newSibling.setSibling(nextSibling);
};

