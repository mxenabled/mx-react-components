// eslint-disable react/jsx-indent rule added for proper <Markdown /> formatting
/* eslint-disable react/jsx-indent */
const React = require('react');

const { Icon, SimpleInput, Styles, AppConstants } = require('mx-react-components');

const Markdown = require('components/Markdown');

class IconDocs extends React.Component {
  state = {
    backgroundFill: 'transparent',
    iconFill: Styles.Colors.GRAY_700,
    iconSize: 40
  }

  render () {
    const deprecatedIcons = [
      'export',
      'md-cash',
      'md-check-mark',
      'md-credit',
      'md-debts',
      'md-savings'
    ];

    return (
      <div>
        <h1>
          Icon
          <label>A set of predefined svg icons inspired by the MX products</label>
        </h1>

        <h3>Demo</h3>
        <p style={{ marginBottom: Styles.Spacing.XLARGE }}>Warning: Icons marked as deprecated will be removed in a future release.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {AppConstants.Icons.map(icon => {
            return (
              <div key={icon.value} style={{ width: 100, height: 100, textAlign: 'center' }}>
                <Icon
                  backgroundFillColor={this.state.backgroundFill}
                  key={icon.value}
                  size={this.state.iconSize}
                  style={{ fill: this.state.iconFill }}
                  type={icon.value}
                />
                <div style={{ color: Styles.Colors.GRAY_500, fontSize: Styles.FontSizes.SMALL, marginTop: 5 }}>({icon.value}){`${deprecatedIcons.includes(icon.value) ? ' Deprecated' : ''}`}</div>
              </div>
            );
          })}
        </div>

        <h3>Usage</h3>
        <h5>backgroundFillColor <label>String</label></h5>
        <p>Default: 'transparent'</p>
        <p>Some icons have extra svg path data to provide a background fill incase you want parts of them to not be see through. You can set this prop to any valid html color or hexadecimal color value to change the the background fill on supported icons. Use the input below to update the background fill color to see the supported icons update.</p>
        <div>
          <SimpleInput
            elementProps={{
              defaultValue: this.state.backgroundFill,
              onChange: e => (this.setState({ backgroundFill: e.target.value }))
            }}
            prefix={(
              <span style={{ marginRight: 10 }}>Background Fill</span>
            )}
            styles={{
              wrapper: {
                width: '50%'
              }
            }}
            suffix={(
              <span style={{
                backgroundColor: this.state.backgroundFill,
                border: `1px solid ${Styles.Colors.GRAY_700}`,
                height: 20,
                width: 20
              }}
              />
            )}
            type='text'
          />
        </div>

        <h5>size <label>Number, String</label></h5>
        <p>A single number representing the width and height of the icon in pixels. Change the icon's size by using the number input below.</p>
        <div>
          <SimpleInput
            elementProps={{
              defaultValue: this.state.iconSize,
              onChange: e => (this.setState({ iconSize: e.target.value }))
            }}
            prefix={(
              <span style={{ marginRight: 10 }}>Icon Size</span>
            )}
            styles={{
              wrapper: {
                width: '50%'
              }
            }}
            type='number'
          />
        </div>

        <h5>style <label>object</label></h5>
        <p>A style object applied to the main svg element of the icon. You can use this to over ride styling or change the fill color of the icon. Use the input below to over ride the style and change the icon fill to a differnt color.</p>
        <div>
          <SimpleInput
            elementProps={{
              defaultValue: this.state.iconFill,
              onChange: e => (this.setState({ iconFill: e.target.value }))
            }}
            prefix={(
              <span style={{ marginRight: 10 }}>Icon Fill</span>
            )}
            styles={{
              wrapper: {
                width: '50%'
              }
            }}
            suffix={(
              <span style={{
                backgroundColor: this.state.iconFill,
                border: `1px solid ${Styles.Colors.GRAY_700}`,
                height: 20,
                width: 20
              }}
              />
            )}
            type='text'
          />
        </div>

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
