const React = require('react');

const { Icon, MessageBox, Button, Styles } = require('mx-react-components');

const Markdown = require('components/Markdown');

const MessageBoxDocs = React.createClass({
  render () {
    return (
      <div>
        <h1>
        MESSAGE BOasdgasdgasdX BABY
        </h1>

        <h3>Demo</h3>
        <MessageBox
          color={Styles.Colors.PRIMARY}
          expandable={true}
          title='This is a Message'
        >
          <div>This is some message text</div>
          <Button>Button baby</Button>
        </MessageBox>
        <h3>Usage</h3>
        {/*
          <h5>children <label>Node</label></h5>
          <p>An element that you wish to spin.</p>

          <h5>direction <label>String</label></h5>
          <p>The direction of the spin. Available Options: counterclockwise, clockwise. Default: 'counterclockwise'</p>

          <h5>speed <label>Number</label></h5>
          <p>The time it takes the element to make 1 full rotation in milliseconds. Default: 1000</p>
        */}

        <h3>Example</h3>
        <Markdown>
          {`
            <Spin>
              <Icon
                size={50}
                type='sync'
              />
            </Spin>
          `}
        </Markdown>
      </div>
    );
  }
});

module.exports = MessageBoxDocs;
