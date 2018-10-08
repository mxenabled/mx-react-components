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
    button: PropTypes.node,
    color: PropTypes.string,
    icon: PropTypes.string,
    isSmall: PropTypes.bool,
    message: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    styles: PropTypes.object,
    theme: themeShape,
    title: PropTypes.string
  };

  render () {
    const theme = StyleUtils.mergeTheme(this.props.theme);
    const styles = this.styles(theme);

    return (
      <article
        aria-live='polite'
        className='mx-message-box'
        role='region'
        style={styles.component}
      >
        <div style={styles.alertbar} />
        <div style={styles.messageWrapper}>
          <div style={styles.messageBody}>
            <section>
              <Icon
                size={20}
                style={styles.icon}
                type={this.props.icon}
              />
            </section>
            <section role='status' style={styles.messageContent}>
              <p style={styles.title}>
                {this.props.title}
              </p>
              { this.props.message ?
                (<p style={styles.message}>
                  {(this.props.message)}
                </p>) :
              null }
            </section>
          </div>
          {!_isNil(this.props.button) &&
            <div style={styles.button}>
              {this.props.button}
            </div>
          }
        </div>
      </article>
    );
  }

  styles = (theme) => {
    const color = this.props.color || theme.Colors.PRIMARY;

    return _merge({}, {
      component: {
        color: theme.Colors.GRAY_900,
        boxShadow: theme.ShadowMed,
        boxSizing: 'border-box',
        borderTop: 'none',
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column'
      },
      alertbar: {
        background: color,
        border: theme.Colors.GRAY_300,
        color: theme.Colors.GRAY_900,
        borderTop: '1px solid ' + color,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        height: 5
      },
      button: {
        marginTop: this.props.isSmall ? 10 : null,
        whiteSpace: 'nowrap',
        alignSelf: this.props.isSmall ? null : 'flex-end',
        textAlign: this.props.isSmall ? 'center' : null
      },
      header: {
        display: 'flex',
        padding: theme.Spacing.SMALL,
        paddingBottom: 0
      },
      icon: {
        fill: theme.Colors.GRAY_900,
        marginRight: theme.Spacing.SMALL
      },
      title: {
        fontFamily: theme.Fonts.SEMIBOLD,
        fontSize: theme.FontSizes.MEDIUM,
        marginBottom: 0
      },
      messageBody: {
        alignItems: 'baseline',
        display: 'flex',
        flex: '1 1 auto'
      },
      messageContent: {
        boxSizing: this.props.isSmall ? null : 'content-box',
        textAlign: 'left',
        width: this.props.isSmall ? '100%' : '75%',
        paddingRight: this.props.isSmall ? 30 : null,
        fontSize: theme.FontSizes.MEDIUM
      },
      message: {
        fontSize: theme.FontSizes.MEDIUM,
        marginBottom: 0
      },
      messageWrapper: {
        display: 'flex',
        flexDirection: this.props.isSmall ? 'column' : 'row',
        padding: theme.Spacing.SMALL
      }
    }, this.props.styles);
  };
}

module.exports = withTheme(MessageBox);
