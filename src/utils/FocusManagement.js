const focusableSelectors = [
  'input',
  'select',
  'a[href]',
  'textarea',
  'button',
  '[tabindex]'
];

const getFocusableNodesInElement = el => {
  return el.querySelectorAll(focusableSelectors.join(',')).filter(node => {
    const nodeTabIndexAttr = parseInt(node.getAttribute('tabindex'), 10);
    const nodeTabIndex = isNaN(nodeTabIndexAttr) ? node.tabIndex : nodeTabIndexAttr;
    const nodeAriaHiddenAttr = node.getAttribute('aria-hidden');

    return nodeTabIndex > 0 && !nodeAriaHiddenAttr;
  });
};

const removeFocusFromNodes = nodes => {
  return nodes.forEach(node => {
    node.setAttribute('tabindex', -1);
    node.setAttribute('aria-hidden', true);
  });
};

module.exports = {
  focusableSelectors,
  getFocusableNodesInElement,
  removeFocusFromNodes
};