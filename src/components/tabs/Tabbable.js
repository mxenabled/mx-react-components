const PropTypes = require('prop-types');
const React = require('react');

const StyleConstants = require('../../constants/Style');

/**
 * Common state and prop management and outer styling for Tabs components.
 */
const Tabbable = (TabsComponent) => {
  const TabbableComponent = class extends React.Component {
    static propTypes = Tabbable.propTypes;

    static defaultProps = {
      alignment: 'left',
      selectedTab: 0,
      showBottomBorder: true
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
      return <TabsComponent {...this.props} style={this.styles()} />;
    }

    styles () {
      return Object.assign({
        borderBottom: this.props.showBottomBorder ? '1px solid ' + StyleConstants.Colors.FOG : 'none',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: this.props.alignment === 'left' ? 'flex-start' : 'center',
        overflowX: 'scroll',
        width: '100%'
      }, this.props.style);
    }
  };

  return TabbableComponent;
};

Tabbable.propTypes = {
  activeTabStyles: PropTypes.object,
  alignment: PropTypes.oneOf(['left', 'center']),
  brandColor: PropTypes.string,
  onTabSelect: PropTypes.func.isRequired,
  selectedTab: PropTypes.number,
  showBottomBorder: PropTypes.bool,
  style: PropTypes.object,
  tabs: PropTypes.array.isRequired
};

module.exports = Tabbable;
