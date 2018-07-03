const PropTypes = require('prop-types');
const React = require('react');
const _merge = require('lodash/merge');
const _isNil = require('lodash/isNil');

import { withTheme } from './Theme';
const Icon = require('../components/Icon');

const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');

class MessageBox extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    color: PropTypes.string,
    icon: PropTypes.string,
    styles: PropTypes.object,
    theme: themeShape,
    title: PropTypes.string
  };

  render () {
    const theme = StyleUtils.mergeTheme(this.props.theme);
    const styles = this.styles(theme);

    return (
      <div className='mx-message-box' style={styles.component}>
        <div style={styles.alertbar}>
          <div style={styles.header}>
            <Icon
              size={20}
              style={Object.assign({}, styles.icon, { marginRight: theme.Spacing.SMALL })}
              type={this.props.icon}
            />
            <div style={styles.title}>{this.props.title}</div>
          </div>
        </div>

        {!_isNil(this.props.children) &&
          <div style={styles.children}>
            {this.props.children}
          </div>
        }

      </div>
    );
  }

  styles = (theme) => {
    const color = this.props.color || theme.Colors.PRIMARY;

    return _merge({}, {
      alertbar: {
        background: color,
        borderTop: '1px solid ' + color,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        height: 5
      },
      component: {
        color: theme.Colors.BLACK,
        boxSizing: 'border-box',
        border: '1px solid ' + theme.Colors.GRAY_300,
        borderRadius: 6
      },
      header: {
        display: 'flex',
        padding: theme.Spacing.SMALL,
        alignItems: 'center'
        // padding: theme.Spacing.SMALL
      },
      // leftHeader: {
      //   flex: 1,
      //   display: 'flex',
      //   alignItems: 'center'
      // },
      title: {
        fontFamily: theme.Fonts.SEMIBOLD,
        fontSize: theme.FontSizes.MEDIUM
      },
      icon: {
        fill: theme.Colors.BLACK
      },
      children: {
        padding: theme.Spacing.SMALL,
        margin: theme.Spacing.MEDIUM,
        alignItems: 'center'
      }
    }, this.props.styles);
  };
}

module.exports = withTheme(MessageBox);
