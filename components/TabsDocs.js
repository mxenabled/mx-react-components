const React = require('react');

const { Tabs } = require('mx-react-components');

const Markdown = require('components/Markdown');

const TabsDocs = React.createClass({
  render () {
    return (
      <div>
        <h1>
          Tabs
          <label>A component to display tabs for full screen or a dropdown for mobile</label>
        </h1>

        <h3>Demo</h3>
        <Tabs
          activeTabStyle={{ paddingBottom: 25 }}
          onTabSelect={this._handleTabSelect}
          selectedTab={this.state.selectedTab}
          showBottomBorder={false}
          tabs={['donuts', 'ice cream', 'bacon', 'chicken']}
          useTabsInMobile={false}
        />

        <h3>Usage</h3>
        <h5>activeTabStyle<label>Object</label></h5>
        <p>Styles for the active tab.</p>

        <h5>brandColor<label>String</label></h5>
        <p>Default: PRIMARY COLOR</p>
        <p>Hex value or style constant for that brand.</p>

        <h5>onTabSelect <label>Function</label></h5>
        <p><em>(required)</em> A function called when you click on a tab</p>

        <h5>selectedBottomBorderPadding <label>Number</label></h5>
        <p>Default: 2</p>
        <p>Specifies the amount of padding you want below the selectedTab for the bottom border.</p>

        <h5>selectedTab<label>Number</label></h5>
        <p>Default: 0</p>
        <p>A number representing the tab that has been selected. Tabs are ordered starting at 0.</p>

        <h5>showBottomBorder <label>Boolean</label></h5>
        <p>Default: true</p>
        <p>Value to set whether you want the bottom border displayed or not.</p>

        <h5>tabs <label>Array</label></h5>
        <p>Default: PRIMARY</p>
        <p><em>(required)</em> Array of values that you want respresented as tabs. Each item in the array should be a string. The "onTabClick" function will be called when you click on each one.</p>

        <h5>defaultLabelText <label>String</label></h5>
        <p>Default: Roll over item for details</p>
        <p>The text to display in the data label when not hovering over a slice.</p>

        <h5>useTabsInMobile <label>Boolean</label></h5>
        <p>Default: false</p>
        <p>When true, this will override the default and show tabs in mobile instead of a menu screen.</p>

        <h3>Example</h3>
        <Markdown>
{`
  _handleTabSelect (selectedTab) {
       this.setState({
         selectedTab
       });
   },

  <Tabs
    activeTabStyle={{ paddingBottom: 25 }}
    onTabSelect={this._handleTabSelect}
    selectedBottomBorderPadding={25}
    selectedTab={this.state.selectedTab}
    showBottomBorder={false}
    tabs={['donuts', 'ice cream', 'bacon', 'chicken']}
    useTabsInMobile={false}
  />
  `}
        </Markdown>
      </div>
    );
  }
});

module.exports = TabsDocs;
