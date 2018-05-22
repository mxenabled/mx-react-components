const focusableSelectors = [
  'input',
  'select',
  'a[href]',
  'textarea',
  'button',
  '[tabindex]'
];

const getFocusableNodesInElement = el => {
  const focusableNodes = el.querySelectorAll(focusableSelectors.join(','));

  return focusableNodes && focusableNodeslength ? focusableNodes.filter(node => {
    const nodeTabIndexAttr = parseInt(node.getAttribute('tabindex'), 10);
    const nodeTabIndex = isNaN(nodeTabIndexAttr) ? 0 : nodeTabIndexAttr;
    const nodeAriaHiddenAttr = node.getAttribute('aria-hidden');

    return nodeTabIndex >= 0 && !nodeAriaHiddenAttr;
  }) : [];
};

const reconcileNodeArrays = (allFocusableNodes, childFocusableNodes) => {
  return allFocusableNodes.filter(node => {
    return childFocusableNodes.indexOf(node) === -1;
  });
};

const toggleFocusAttributesForNode = (node, focusable) => {
  node.setAttribute('tabindex', focusable ? 0 : -1);
  node.setAttribute('aria-hidden', !focusable);
};

module.exports = {
  focusableSelectors,
  getFocusableNodesInElement,
  reconcileNodeArrays,
  toggleFocusAttributesForNode
};