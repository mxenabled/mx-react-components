const React = require('react');

const { MessageBox, Button, Styles } = require('mx-react-components');

const Markdown = require('components/Markdown');

const MessageBoxDocs = React.createClass({
  render () {
    const styles = this.styles();

    return (
      <div>
        <h1>
          Message Box
          <label>A component used to display a message to a user.</label>
        </h1>

        <h3>Demo</h3>
        <MessageBox
          color={Styles.Colors.PRIMARY}
          expandable={true}
          icon='attention-solid'
          title='This is a Message'
        >
          <div style={styles.messageBoxContents}>
            <div style={styles.messageBoxText}>This is some message box text.</div>
            <Button style={styles.button}>Its Button Time</Button>
          </div>
        </MessageBox>
        <h3>Usage</h3>
        {
          <div>
            <h5>children<label>Node</label></h5>
            <p>If the MessageBox is expandable, children will be the contens of the expanded box.</p>

            <h5>color<label>String</label></h5>
            <p>The primary color of the box.</p>

            <h5>expandable<label>Boolean</label></h5>
            <p>Whether the message box should expand onClick to display more info. `true` will also display the caret icon</p>

            <h5>icon<label>String</label></h5>
            <p>The type of icon to display in the upper left of the MessageBox header.</p>

            <h5>title<label>String</label></h5>
            <p>The text to display in the MessageBox header.</p>
          </div>
        }

        <h3>Example</h3>
        <Markdown>
          {`
            <MessageBox
              color={Styles.Colors.PRIMARY}
              expandable={true}
              icon='attention-solid'
              title='This is a Message'
            >
              <div>
                <div>This is some message box text.</div>
                <Button>Its Button Time</Button>
              </div>
            </MessageBox>
          `}
        </Markdown>
      </div>
    );
  },

  styles () {
    return {
      messageBoxContents: {
        color: Styles.Colors.CHARCOAL,
        display: 'flex'
      },
      messageBoxText: {
        flex: 1
      }
    };
  }
});

module.exports = MessageBoxDocs;
