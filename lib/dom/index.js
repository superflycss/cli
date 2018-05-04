
/** Insert the new node after the reference node's next sibling
 * @param referenceNode the reference node
 * @param newNode the new node
 */
module.exports = (referenceNode, newNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
