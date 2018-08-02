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
    button: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.string,
    isSmall: PropTypes.bool,
    message: PropTypes.string,
    styles: PropTypes.object,
    subMessage: PropTypes.string,
    theme: themeShape,
    title: PropTypes.string
  };

  render () {
    const theme = StyleUtils.mergeTheme(this.props.theme);
    const styles = this.styles(theme);

    return (
      <div className='mx-message-box' style={styles.component}>
        <div className='alert-bar' style={styles.alertbar} />
        <div className='message-section' style={styles.messageSection}>
          <div className='message-body' style={styles.messageBody}>
            <div className='icon-column' style={styles.iconColumn} >
              <Icon
                size={20}
                style={Object.assign({}, styles.icon, { marginRight: theme.Spacing.SMALL })}
                type={this.props.icon}
              />
            </div>
            <div className='message-content' style={styles.messageContent}>
              <div className='title' style={styles.title}>
                {this.props.title}
              </div>
              <div className='main-message' style={styles.mainMessage}>
                {!_isNil(this.props.message) &&
                  <div className='message-bod' style={styles.messageBod}>
                    {this.props.message}
                  </div>
                }
              </div>
              <div className='sub-message' style={styles.subMessage}>
                {!_isNil(this.props.subMessage) &&
                  <div className='message-bod'>
                    {this.props.subMessage}
                  </div>
                }
              </div>
            </div>
          </div>
          <div className='message-button' style={styles.button}>
            {!_isNil(this.props.button) &&
              <div className='button'>
                {this.props.button}
              </div>
            }
          </div>
        </div>
      </div>
    );
  }

  styles = (theme) => {
    const color = this.props.color || theme.Colors.PRIMARY;

    return _merge({}, {
      component: {
        color: theme.Colors.BLACK,
        boxSizing: 'border-box',
        border: '1px solid ' + theme.Colors.GRAY_300,
        borderTop: 'none',
        borderRadius: 6,
        display: 'flex',
        flexDirection: 'column'
      },
      alertbar: {
        background: color,
        borderTop: '1px solid ' + color,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        height: 5
      },
      button: {
        alignSelf: 'flex-end',
        flexGrow: this.props.isSmall ? 1 : 0
      },
      header: {
        display: 'flex',
        padding: theme.Spacing.SMALL,
        paddingBottom: 0
      },
      title: {
        fontFamily: theme.Fonts.SEMIBOLD,
        fontSize: theme.FontSizes.MEDIUM
      },
      icon: {
        fill: theme.Colors.BLACK
      },
      messageBody: {
        alignItems: 'baseline',
        display: 'flex',
        flexGrow: 2
      },
      mainMessage: {
        paddingTop: theme.Spacing.XSMALL
      },
      messageSection: {
        display: 'flex',
        flexDirection: this.props.isSmall ? 'column' : 'row',
        padding: theme.Spacing.SMALL
      },
      subMessage: {
        fontSize: theme.FontSizes.SMALL,
        fontStyle: 'italic',
        paddingTop: theme.Spacing.XSMALL
      }
    }, this.props.styles);
  };
}

module.exports = withTheme(MessageBox);
