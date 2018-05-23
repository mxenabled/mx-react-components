const React = require('react');

const Code = require('components/Code');
const Markdown = require('components/Markdown');

class RestrictFocusToChildrenDocs extends React.Component {
  render () {
    return (
      <div>
        <h1>
          Restrict Focus To Children
          <label>Wrapper that restricts focus to it's children</label>
        </h1>

        <h3>Demo</h3>
        <p>
          See Demo of Drawer, Modal, SimpleSelect, or DateRangePicker components to see how focus is trapped when popover content is shown.
        </p>

        <h3>Usage</h3>
        <p>
          When mounted, the <Code>RestrictFocusToChildren</Code> component only allows focus on nodes that are focusable and are children of itself. This is useful for a11y in popover content such as modals and dialogs.
        </p>
        <p>
          In the example below, the <Code>Outter Content Button</Code> would not be focusable once the <Code>RestrictFocusToChildren</Code> component mounted but would become focusable again once <Code>RestrictFocusToChildren</Code> un-mounted.
        </p>

        <h3>Example</h3>
        <Markdown>
          {`
            <div>
              <button onClick={() => this.setState({ showTrappedContent: true })}>
                Outter Content Button
              </button>
              {this.state.showTrappedContent ? (
                <RestrictFocusToChildren>
                  <button onClick={() => this.setState({ showTrappedContent: false })}>
                    Inner Content Button
                  </button>
                </RestrictFocusToChildren>
              ) : null}
            </div>
          `}
        </Markdown>
      </div>
    );
  }
}

module.exports = RestrictFocusToChildrenDocs;
