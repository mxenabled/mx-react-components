const focusableSelectors = [
  'input',
  'select',
  'a[href]',
  'textarea',
  'button',
  '[tabindex]'
];

const getFocusableNodesInElement = el => {
  const focusableNodes = Array.prototype.slice.call(el.querySelectorAll(focusableSelectors.join(',')));

  return focusableNodes && focusableNodes.length ? focusableNodes.filter(node => {
    const nodeTabIndexAttr = parseInt(node.getAttribute('tabindex'), 10);
    const nodeTabIndex = isNaN(nodeTabIndexAttr) ? 0 : nodeTabIndexAttr;
    const nodeAriaHiddenAttr = node.getAttribute('aria-hidden') === 'true';

    return nodeTabIndex >= 0 && !nodeAriaHiddenAttr;
  }) : [];
};

const reconcileNodeArrays = (allFocusableNodes, childFocusableNodes) => {
  return allFocusableNodes.filter(node => {
    return childFocusableNodes.indexOf(node) === -1;
  });
};

const setNodeAttributes = (node, attributes) => {
  for (const key in attributes) {
    if (attributes.hasOwnProperty(key)) {
      node.setAttribute(key, attributes[key]);
    }
  }
};

module.exports = {
  focusableSelectors,
  getFocusableNodesInElement,
  reconcileNodeArrays,
  setNodeAttributes
};