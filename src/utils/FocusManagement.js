/**
 * focusableSelectors - frozen array of strings
 *
 * Selectors for all HTML elements that are
 * "focusable" including HTML elements with
 * a tabindex applied.
 */
const focusableSelectors = Object.freeze([
  'input',
  'select',
  'a[href]',
  'textarea',
  'button',
  '[tabindex]'
]);

/**
 * getFocusableNodesInElement
 *
 * Returns an array of DOM Nodes found within
 * the supplied DOM Node that are considered
 * focusable(based upon a query with the focusableSelectors)
 * and are not currently hidden via a -1 tabindex
 * or aria-hidden attribute.
 *
 * @param {DOM Node} el
 */
const getFocusableNodesInElement = el => {
  // querySelectorAll returns a nodeList so we have
  // to use Array.prototype.slice.call to convert it
  // to a normal array.
  const focusableNodes = Array.prototype.slice.call(el.querySelectorAll(focusableSelectors.join(',')));

  return focusableNodes && focusableNodes.length ? focusableNodes.filter(node => {
    // If a node doesn't have an existing tabindex
    // eg: buttons, links, inputs, etc...,
    // then we set the nodeTabIndex value to 0 to
    // ensure it passes the equality check of the
    // filter.
    const nodeTabIndexAttr = parseInt(node.getAttribute('tabindex'), 10);
    const nodeTabIndex = isNaN(nodeTabIndexAttr) ? 0 : nodeTabIndexAttr;

    // The getAttribute call returns a string so
    // we have to stritcly check for a string 'true'
    // or things no worky.
    const nodeAriaHiddenAttrValue = node.getAttribute('aria-hidden') === 'true';

    return nodeTabIndex >= 0 && !nodeAriaHiddenAttrValue;
  }) : [];
};

module.exports = {
  focusableSelectors,
  getFocusableNodesInElement
};