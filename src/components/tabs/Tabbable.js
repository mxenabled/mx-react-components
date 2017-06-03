const PropTypes = require('prop-types');
const React = require('react');

/**
 * Common state management and definition of props for Tabs components.
 */
const Tabbable = (TabsComponent) => {
  return class extends React.Component { // eslint-disable-line react/display-name
    static propTypes = {
      activeTabStyles: PropTypes.object,
      brandColor: PropTypes.string,
      onTabSelect: PropTypes.func.isRequired,
      selectedTab: PropTypes.number,
      tabs: PropTypes.array.isRequired
    };

    static defaultProps = {
      selectedTab: 0
    };

    constructor (props) {
      super(props);

      this.state = {
        selectedTab: this.props.selectedTab
      };
    }

    componentWillReceiveProps (nextProps) {
      if (nextProps.selectedTab !== this.state.selectedTab) {
        this.setState({
          selectedTab: nextProps.selectedTab
        });
      }
    }

    handleTabSelect (selectedTab) {
      this.props.onTabSelect(selectedTab);

      this.setState({
        selectedTab
      });
    }

    render () {
      return <TabsComponent {...this.props} />;
    }
  };
};

module.exports = Tabbable;
