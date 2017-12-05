const React = require("react");
const { Link } = require("react-router");

const { MessageBox, Button, Styles } = require("mx-react-components");

const Markdown = require("components/Markdown");

class MessageBoxDocs extends React.Component {
  render() {
    const styles = this.styles();

    return (
      <div>
        <h1>
          Message Box
          <label>A component used to display a message to a user.</label>
        </h1>

        <h3>Demo</h3>
        <MessageBox
          color={Styles.Colors.DANGER}
          icon="attention-solid"
          styles={styles.messageBoxNoChildren}
          title="This is a MessageBox with no children."
        />

        <MessageBox
          icon="attention-solid"
          title="This is a MessageBox with children."
        >
          <div style={styles.messageBoxContents}>
            <div style={styles.messageBoxText}>
              This is some message box text.
            </div>
            <Button style={styles.button}>Its Button Time</Button>
          </div>
        </MessageBox>
        <h3>Usage</h3>
        {
          <div>
            <h5>
              children<label>Node</label>
            </h5>
            <p>
              Passing children allow the message box to be expandable and
              display the children.
            </p>

            <h5>
              color<label>String</label>
            </h5>
            <p>The primary color of the box.</p>

            <h5>
              icon<label>String</label>
            </h5>
            <p>
              The type of icon to display in the upper left of the MessageBox
              header.
            </p>

            <h5>
              theme <label>Object</label>
            </h5>
            <p>
              Customize the component&apos;s look. See{" "}
              <Link to="/components/theme">Theme</Link> for more information.
            </p>

            <h5>
              title<label>String</label>
            </h5>
            <p>The text to display in the MessageBox header.</p>
          </div>
        }

        <h3>Example</h3>
        <Markdown>
          {`
            //Without Children
            <MessageBox
              color={Styles.Colors.DANGER}
              icon='attention-solid'
              title='This is a Message'
            />

            //With Children
            <MessageBox
              color={Styles.Colors.PRIMARY}
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
  }

  styles = () => {
    return {
      messageBoxContents: {
        color: Styles.Colors.GRAY_700,
        display: "flex"
      },
      messageBoxText: {
        flex: 1
      },
      messageBoxNoChildren: {
        component: {
          marginBottom: Styles.Spacing.LARGE
        }
      }
    };
  };
}

module.exports = MessageBoxDocs;
