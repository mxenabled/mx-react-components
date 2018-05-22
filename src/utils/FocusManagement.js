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

const hideNode = node => {
  node.setAttribute('tabindex', -1);
  node.setAttribute('aria-hidden', true);
};

const unHideNode = node => {
  node.setAttribute('tabindex', 0);
  node.setAttribute('aria-hidden', false);
};

const reconcileNodeArrays = (allFocusableNodes, childFocusableNodes) => {
  return allFocusableNodes.filter(node => {
    return childFocusableNodes.indexOf(node) === -1;
  });
};

module.exports = {
  focusableSelectors,
  getFocusableNodesInElement,
  hideNode,
  unHideNode,
  reconcileNodeArrays
};