// eslint-disable react/jsx-indent rule added for proper <Markdown /> formatting
/* eslint-disable react/jsx-indent */
const React = require('react');
const { Link } = require('react-router');

const { SimpleInput } = require('mx-react-components');

const Code = require('components/Code');
const Markdown = require('components/Markdown');

class SimpleInputDocs extends React.Component {
  render () {
    return (
      <div>
        <h1>
          Simple Input
          <label>A simple input field used in forms</label>
        </h1>

        <h3>Demo</h3>
        <div style={{ marginBottom: 5 }}>
          <label htmlFor='inputOne'>
            My Simple Input
          </label>
        </div>
        <SimpleInput
          elementProps={{
            id: 'inputOne',
            placeholder: 'Type something'
          }}
        />
        <br />
        <div style={{ marginBottom: 5 }}>
          <label htmlFor='inputTwo'>
            My Simple Input with prefix and suffix
          </label>
        </div>
        <SimpleInput
          elementProps={{
            id: 'inputTwo',
            placeholder: 'Type something'
          }}
          elementRef={ref => this.myInput = ref}
          prefix={(<span onClick={() => this.myInput.focus()} style={{ paddingRight: 5 }}>Prefix</span>)}
          suffix={(<span onClick={() => this.myInput.focus()} style={{ paddingRight: 5 }}>Suffix</span>)}
        />

        <h3>Usage</h3>
        <h5>baseColor <label>String</label></h5>
        <p>The color of the <Code>input</Code> border on focus.</p>
        <p>*This prop is deprecated, please use <Code>themes</Code> instead.</p>

        <h5>elementProps <label>Object</label></h5>
        <p>Pass props directly to the <Code>input</Code> element. ie. placeholder, value, onchange, etc.</p>

        <h5>elementRef<label>Function</label></h5>
        <p>A callback function used to get the ref of the input for things like handling focus.</p>

        <h5>focusOnLoad <label>Boolean</label></h5>
        <p>Focus <Code>input</Code> on load, default of false.</p>

        <h5>handleResetClick <label>Function</label></h5>
        <p>The function that will execute when <Code>rightIcon</Code> is clicked. This prop will not work properly unless <Code>rightIcon</Code> is also declared. </p>
        <p>*This prop is deprecated, please use <Code>suffix</Code> by passing an element with a click handler instead.</p>

        <h5>icon <label>String || Object</label></h5>
        <p>The type of icon as a string or an object describing the props passed to the Icon component to display on the left side of the <Code>input</Code></p>
        <p>*This prop is deprecated, please use <Code>prefix</Code> instead.</p>

        <h5>prefix <label>Node</label></h5>
        <p>Anything that can be rendered: numbers, strings, elements or an array(or fragment) containing these types that is placed on the left side of the <Code>input</Code>.</p>

        <h5>rightIcon <label>String || Object</label></h5>
        <p>The type of icon as a string or an object describing the props passed to the Icon component to display on the right side of the <Code>input</Code></p>
        <p>*This prop is deprecated, please use <Code>suffix</Code> instead.</p>

        <h5>styles <label>Object</label></h5>
        <p>Allows style additions or overrides to specific component elements including:</p>
          <ul >
          <li><Code>wrapper</Code>: the outermost element of the component.</li>
          <li><Code>activeWrapper</Code>: the outermost element of the component when active.</li>
          <li><Code>input</Code>: the component's <Code>input</Code> element.</li>
          <li><Code>icon</Code>: the icon located in the left side of the <Code>input</Code> element.</li>
          <li><Code>rightIcon</Code>: the icon located in the right side of the <Code>input</Code> element.</li>
          </ul>
          <p>*<Code>styles</Code> will override defaults and conflicting <Code>themes</Code></p>

        <h5>suffix <label>Node</label></h5>
        <p>Anything that can be rendered: numbers, strings, elements or an array(or fragment) containing these types that is placed on the right side of the <Code>input</Code>.</p>

        <h5>theme <label>Object</label></h5>
        <p>Customize the component&apos;s look. See <Link to='/components/theme'>Theme</Link> for more information. Themes will be overridden by conflicting <Code>styles</Code></p>

        <h5>type <label>String</label></h5>
        <p>Specifies the <Code>input</Code> type. Default <Code>type</Code> is text.</p>

        <h5>valid <label>Boolean</label></h5>
        <p>Indicates whether the value of Input field is valid. If it is not valid, the input field will have a red border.</p>

        <h3>Example</h3>
        <Markdown>
          {`
          <SimpleInput
            baseColor={'red'}
            elementProps={{
              placeholder: 'Type something'
            }}
            elementRef={ref => this.myInput = ref}
            focusOnLoad={true}
            prefix={(<span onClick={() => this.myInput.focus()} style={{ paddingRight: 5 }}>Prefix</span>)}
            styles={{
              wrapper: { backgroundColor: 'red', border: '4px solid green' },
              activeWrapper: { backgroundColor: 'blue', border: '4px solid red' },
              input: { color: 'purple' },
            }}
            suffix={(<span onClick={() => this.myInput.focus()} style={{ paddingRight: 5 }}>Suffix</span>)}
            theme={{ Colors: { PRIMARY: 'orange' } }}
            valid={false}
          />
        `}
        </Markdown>
      </div>
    );
  }
}

module.exports = SimpleInputDocs;
