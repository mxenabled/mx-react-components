const React = require('react');

const { Tabs } = require('mx-react-components');

const Markdown = require('components/Markdown');

class TabsDocs extends React.Component {
  state = {
    selectedTab: 0
  };

  _handleTabSelect = (selectedTab) => {
    this.setState({
      selectedTab
    });
  };

  render () {
    const tabs = ['Donuts', 'Ice Cream', 'Bacon', 'Chicken'];

    return (
      <div>
        <h1>
          Tabs
          <label>A component to display tabs for full screen or a dropdown for mobile</label>
        </h1>

        <h3>Demo</h3>

        <h5>type <label>&apos;standard&apos;</label></h5>
        <Tabs
          onTabSelect={this._handleTabSelect}
          selectedTab={this.state.selectedTab}
          tabs={tabs}
        />

        <h5>type <label>&apos;standard&apos;</label> <br /> alignment <label>&apos;center&apos;</label></h5>
        <Tabs
          alignment='center'
          onTabSelect={this._handleTabSelect}
          selectedTab={this.state.selectedTab}
          tabs={tabs}
          useTabsInMobile={true}
        />

        <h5>type <label>&apos;menu&apos;</label></h5>
        <Tabs
          onTabSelect={this._handleTabSelect}
          selectedTab={this.state.selectedTab}
          tabs={tabs}
          type='menu'
        />

        <h5>type <label>&apos;pill&apos;</label></h5>
        <Tabs
          onTabSelect={this._handleTabSelect}
          selectedTab={this.state.selectedTab}
          tabs={tabs}
          type='pill'
        />

        <h3>Usage</h3>

        <h5>activeTabStyles<label>Object</label></h5>
        <p>Styles for the active tab.</p>

        <h5>alignment<label>'left' or 'center'</label></h5>
        <p>Default: 'left'</p>
        <p>Tab alignment.</p>

        <h5>brandColor<label>String</label></h5>
        <p>Default: PRIMARY COLOR</p>
        <p>Hex value or style constant for that brand.</p>

        <h5>onTabSelect <label>Function</label></h5>
        <p><em>(required)</em> A function called when you click on a tab</p>

        <h5>selectedTab<label>Number</label></h5>
        <p>Default: 0</p>
        <p>A number representing the tab that has been selected. Tabs are ordered starting at 0.</p>

        <h5>showBottomBorder <label>Boolean</label></h5>
        <p>Default: true</p>
        <p>Value to set whether you want the bottom border displayed or not.</p>

        <h5>tabs <label>Array</label></h5>
        <p>Default: PRIMARY</p>
        <p><em>(required)</em> Array of values that you want respresented as tabs. Each item in the array should be a string. The "onTabClick" function will be called when you click on each one.</p>

        <h5>type <label>One of: ['standard', 'pill', 'menu']</label></h5>
        <p>Default: standard</p>
        <p></p>

        <h5>DEPRECATED: useTabsInMobile <label>Boolean</label></h5>
        <p>Deprecated, use the `type` prop instead.</p>

        <h3>Example</h3>
        <Markdown>
          {`
            _handleTabSelect (selectedTab) {
                 this.setState({
                   selectedTab
                 });
             },

            <Tabs
              onTabSelect={this._handleTabSelect}
              selectedTab={this.state.selectedTab}
              tabs={['Donuts', 'Ice Cream', 'Bacon', 'Chicken']}
            />
          `}
        </Markdown>
      </div>
    );
  }
}

module.exports = TabsDocs;
