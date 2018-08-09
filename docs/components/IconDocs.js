// eslint-disable react/jsx-indent rule added for proper <Markdown /> formatting
/* eslint-disable react/jsx-indent */
const React = require('react');

const { Button, Icon, Styles, AppConstants } = require('mx-react-components');

const Markdown = require('components/Markdown');

class IconDocs extends React.Component {
  state = {
    fillBackground: false
  }

  render () {
    return (
      <div>
        <h1>
          Icon
          <label>A set of predefined svg icons inspired by the MX products</label>
        </h1>

        <h3>Demo</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {AppConstants.Icons.map(icon => {
            return (
              <div key={icon.value} style={{ width: 100, height: 100, textAlign: 'center' }}>
                <Icon
                  backgroundFillColor={this.state.fillBackground ? Styles.Colors.LIGHT_WARNING : 'transparent'}
                  key={icon.value}
                  size={40}
                  style={{ fill: this.state.fillIcon ? Styles.Colors.PRIMARY : Styles.Colors.GRAY_900 }}
                  type={icon.value}
                />
                <div style={{ color: Styles.Colors.GRAY_500, fontSize: Styles.FontSizes.SMALL, marginTop: 5 }}>({icon.value})</div>
              </div>
            );
          })}
        </div>

        <h3>Usage</h3>
        <h5>backgroundFillColor <label>String</label></h5>
        <p>Default: 'transparent'</p>
        <p>Some icons have extra svg path data to provide a background fill incase you want parts of them to not be see through. You can set this prop to any valid color or hexadecimal value to change the the background fill on supported icons. Click the button below to see the supported icons toggle their background fill color.</p>
        <p><Button onClick={() => (this.setState(state => ({ fillBackground: !state.fillBackground })))}>Toggle Background Fill Color</Button></p>

        <h5>size <label>Number, String</label></h5>
        <p>A single number representing the width and height of the icon in pixels.</p>

        <h5>style <label>object</label></h5>
        <p>A style object applied to the main svg element of the icon. You can use this to over ride styling or change the fill color of the icon. Click the button below to over ride the style and change the icon fill color to blue.</p>
        <p><Button onClick={() => (this.setState(state => ({ fillIcon: !state.fillIcon })))}>Toggle Main SVG Fill Color</Button></p>

        <h5>type <label>String</label></h5>
        <p>The name of the icon to be displayed. See above for available options.</p>

        <h3>Example</h3>
        <Markdown>
          {`
            <Icon
              backgroundFillColor='green'
              size={50}
              style={{ fill: 'red' }}
              type='accounts'
            />
          `}
        </Markdown>

        <h5>Release Canidate 5.0.0</h5>
        <p>Properties to be passed to the svg element must now be passed via the new elementProps property.  This was done to fix React unknow prop warnings.</p>

        <Markdown>
        {`
            <Icon
              backgroundFillColor='green'
              elementProps={{
                onClick: myOnClickCallbackFunction
              }}
              size={50}
              style={{ fill: 'red' }}
              type='accounts'
            />
        `}
        </Markdown>
      </div>
    );
  }
}

module.exports = IconDocs;
