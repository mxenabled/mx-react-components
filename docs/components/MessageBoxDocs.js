const React = require('react');
const { Link } = require('react-router');

const { MessageBox, Button, Styles } = require('mx-react-components');

const Markdown = require('components/Markdown');

const StyleUtils = require('utils/Style');

class MessageBoxDocs extends React.Component {
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
          color={Styles.Colors.DANGER}
          icon='attention-solid'
          styles={styles.messageBoxNoMessage}
          title='This is a MessageBox title with no message, only a title.'
        />

        <MessageBox
          button={<Button style={styles.button}>It's Button Time</Button>}
          icon='attention'
          isSmall={false}
          message='This is a MessageBox with a message, and a button.'
          title='This is a MessageBox title.'
        />
        <h3>Usage</h3>
        {
          <div>
            <h5>ariaLive<label>String</label></h5>
            <p>Default: 'polite'</p>
            <p>The aria live property to append to article/parent element.</p>

            <h5>button<label>Node</label></h5>
            <p>The button to display in the MessageBox.</p>

            <h5>children<label>DOM Node/Element</label></h5>
            <p>Children of the MessageBox component can be a component or a DOM node/element.</p>

            <h5>color<label>String</label></h5>
            <p>The primary color of the box.</p>

            <h5>contentRole<label>String</label></h5>
            <p>Default: 'status'</p>
            <p>The aria role of the content section(title, message, and children).</p>

            <h5>icon<label>String</label></h5>
            <p>The type of icon to display in the upper left of the MessageBox header.</p>

            <h5>isSmall<label>Boolean</label></h5>
            <p>If thisis set to 'true', then the button will center, and the message will take up the full width. Designed for smaller screen sizes.</p>

            <h5>message<label>Node, String</label></h5>
            <p>The message to display in the MessageBox.</p>

            <h5>styles<label>Object</label></h5>
            <p>A nested object that allows you to set styles on any of the elements in the component. See the `styles` method in the component code for a full list of available keys and values.</p>

            <h5>theme <label>Object</label></h5>
            <p>Customize the component&apos;s look. See <Link to='/components/theme'>Theme</Link> for more information.</p>

            <h5>title<label>String</label></h5>
            <p>The text to display in the MessageBox header.</p>
          </div>
        }

        <h3>Example</h3>
        <Markdown>
          {`
            //Without a Message
            <MessageBox
              color={Styles.Colors.DANGER}
              icon='attention-solid'
              title='This is a MessageBox title with no message, only a title.'
            />

            //With a Message and a Button
            <MessageBox
              button={<Button style={styles.button}>It's Button Time</Button>}
              color={Styles.Colors.PRIMARY}
              icon='attention'
              message='This is a MessageBox with a message, and a button.'
              title='This is a MessageBox title.'
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
      messageBoxNoMessage: {
        component: {
          marginBottom: Styles.Spacing.LARGE
        },
        fontFace: Styles.Fonts.SEMIBOLD
      },
      button: {
        backgroundColor: Styles.Colors.GRAY_300,
        border: Styles.Colors.GRAY_300,
        color: Styles.Colors.GRAY_900,

        '&:hover': {
          backgroundColor: StyleUtils.adjustColor(Styles.Colors.GRAY_300, -15),
          borderColor: StyleUtils.adjustColor(Styles.Colors.GRAY_300, -15)
        },

        '&:active': {
          backgroundColor: StyleUtils.adjustColor(Styles.Colors.GRAY_300, -30),
          borderColor: StyleUtils.adjustColor(Styles.Colors.GRAY_300, -30)
        }
      }
    };
  };
}

module.exports = MessageBoxDocs;
