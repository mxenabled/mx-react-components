const PropTypes = require("prop-types");
const React = require("react");

const { themeShape } = require("../../constants/App");

const StyleUtils = require("../../utils/Style");

/**
 * Common state and prop management and outer styling for Tabs components.
 */
const Tabbable = TabsComponent => {
  const TabbableComponent = class extends React.Component {
    static propTypes = Tabbable.propTypes;

    static defaultProps = {
      alignment: "left",
      selectedTab: 0,
      showBottomBorder: true
    };

    constructor(props) {
      super(props);

      this.state = {
        selectedTab: this.props.selectedTab
      };
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.selectedTab !== this.state.selectedTab) {
        this.setState({
          selectedTab: nextProps.selectedTab
        });
      }
    }

    handleTabSelect(selectedTab) {
      this.props.onTabSelect(selectedTab);

      this.setState({
        selectedTab
      });
    }

    render() {
      const theme = StyleUtils.mergeTheme(this.props.theme);
      const styles = this.styles(theme);
      const tabsProps = Object.assign({}, this.props, {
        onTabSelect: this.handleTabSelect.bind(this), // delegate for keeping state
        selectedTab: this.props.selectedTab
      });

      return <TabsComponent {...tabsProps} style={styles} />;
    }

    styles(theme) {
      return Object.assign(
        {
          borderBottom: this.props.showBottomBorder
            ? "1px solid " + theme.Colors.GRAY_300
            : "none",
          boxSizing: "border-box",
          display: "flex",
          justifyContent:
            this.props.alignment === "left" ? "flex-start" : "center",
          overflowX: "auto",
          width: "100%"
        },
        this.props.style
      );
    }
  };

  return TabbableComponent;
};

Tabbable.propTypes = {
  activeTabStyles: PropTypes.object,
  alignment: PropTypes.oneOf(["left", "center"]),
  onTabSelect: PropTypes.func.isRequired,
  selectedTab: PropTypes.number,
  showBottomBorder: PropTypes.bool,
  style: PropTypes.object,
  tabs: PropTypes.array.isRequired,
  theme: themeShape
};

module.exports = Tabbable;
