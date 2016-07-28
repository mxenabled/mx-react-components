const React = require('react');
const Radium = require('radium');

const StyleConstants = require('../constants/Style');

const Column = require('../components/grid/Column');
const Container = require('../components/grid/Container');
const Row = require('../components/grid/Row');

const DisplayInput = React.createClass({
  propTypes: {
    hint: React.PropTypes.string,
    label: React.PropTypes.string,
    labelStyle: React.PropTypes.object,
    placeholder: React.PropTypes.string,
    primaryColor: React.PropTypes.string,
    showHint: React.PropTypes.bool,
    status: React.PropTypes.shape({
      type: React.PropTypes.string,
      message: React.PropTypes.string
    }),
    valid: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      primaryColor: StyleConstants.Colors.PRIMARY,
      valid: true
    };
  },

  _isLargeOrMediumWindowSize () {
    const windowSize = StyleConstants.getWindowSize();

    return windowSize === 'large' || windowSize === 'medium';
  },

  render () {
    // Methods
    const isLargeOrMediumWindowSize = this._isLargeOrMediumWindowSize();
    const showHint = this.props.showHint && !this.props.status && isLargeOrMediumWindowSize;

    // Column Sizes
    const twoWidthColumn = { large: 2, medium: 2, small: 0 };
    const inputColumn = showHint ? { large: 8, medium: 8, small: 12 } : { large: 10, medium: 10, small: 12 };
    const labelColumn = { large: 2, medium: 2, small: 12 };
    const statusColumn = { large: 10, medium: 10, small: 12 };

    // Styles
    const styles = this.styles();

    return (
      <Container>
        <div style={styles.wrapper}>
          <Row>
            {this.props.label ? (
              <Column span={labelColumn} style={styles.label}>
                <div key='label' style={styles.label}>
                  <div style={Object.assign({}, styles.labelText, this.props.labelStyle)}>
                    {this.props.label}
                  </div>
                </div>
              </Column>
            ) : null }

            <Column relative={!!this.props.children} span={inputColumn}>
              {this.props.children ? (
                <div style={styles.children}>
                  {this.props.children}
                </div>
              ) : (
                <div style={styles.inputWrapper}>
                  <input
                    {...this.props}
                    key='input'
                    label={this.props.label}
                    style={styles.input}
                    type='text'
                  />
                </div>
              )}
            </Column>

            {showHint ? (
              <Column span={twoWidthColumn}>
                <div style={styles.hint}>
                  {this.props.showHint && !this.props.status ? (<div>{this.props.hint}</div>) : null}
                </div>
              </Column>
            ) : null }
          </Row>
        </div>

        {this.props.status ? (
          <Row>
            <Column offset={twoWidthColumn} span={statusColumn} >
              <div style={styles.status}>
                <div style={styles[this.props.status.type]}>{this.props.status.message}</div>
              </div>
            </Column>
          </Row>
        ) : null}
      </Container>
    );
  },

  styles () {
    const isLargeOrMediumWindowSize = this._isLargeOrMediumWindowSize();
    const textIndent = isLargeOrMediumWindowSize ? 20 : 10;

    return {
      error: {
        color: StyleConstants.Colors.STRAWBERRY
      },

      hint: {
        color: this.props.primaryColor,
        height: 20,
        paddingTop: 15,
        textAlign: 'right'
      },

      input: {
        backgroundColor: 'transparent',
        border: '1px solid transparent',
        fontSize: StyleConstants.FontSizes.LARGE,
        height: isLargeOrMediumWindowSize ? '100%' : '75%',
        paddingBottom: isLargeOrMediumWindowSize ? 10 : 0,
        paddingTop: 0,
        paddingLeft: textIndent,
        textAlign: 'left',
        width: '100%',

        ':focus': {
          boxShadow: 'none',
          outline: 'none'
        }
      },

      inputWrapper: {
        alignItems: 'center',
        display: 'flex',
        height: isLargeOrMediumWindowSize ? 43 : 70
      },

      children: {
        alignItems: 'center',
        display: 'flex',
        height: isLargeOrMediumWindowSize ? 43 : 70,
        paddingBottom: isLargeOrMediumWindowSize ? 10 : 0,
        paddingTop: 0,
        paddingLeft: textIndent,
        width: '100%'
      },

      label: {
        ':focus': {
          color: this.props.primaryColor
        }
      },

      labelText: {
        aligntItems: 'center',
        color: StyleConstants.Colors.CHARCOAL,
        display: 'flex',
        height: isLargeOrMediumWindowSize ? '100%' : '25%',
        fontSize: StyleConstants.FontSizes.SMALL,
        fontFamily: StyleConstants.Fonts.SEMIBOLD,
        padding: isLargeOrMediumWindowSize ? 15 : 0,
        paddingLeft: textIndent,
        textAlign: 'left',
        width: '100%'
      },

      status: {
        height: 10,
        paddingLeft: textIndent,
        paddingRight: StyleConstants.Spacing.SMALL,
        paddingBottom: StyleConstants.Spacing.XSMALL,
        paddingTop: StyleConstants.Spacing.XSMALL,
        width: '50%'
      },

      success: {
        color: this.props.primaryColor
      },

      wrapper: Object.assign({
        borderBottom: this.props.valid ? '1px solid ' + StyleConstants.Colors.FOG : '1px solid ' + StyleConstants.Colors.STRAWBERRY,
        height: isLargeOrMediumWindowSize ? 43 : 70,
        paddingLeft: -10,
        paddingRight: -10,
        transition: 'all .2s ease-in',
        WebkitAppearance: 'none',
        whiteSpace: 'nowrap',

        ':focus': {
          borderBottom: this.props.valid ? '1px solid ' + this.props.primaryColor : '1px solid ' + StyleConstants.Colors.STRAWBERRY,
          boxShadow: 'none',
          outline: 'none'
        }
      }, this.props.style)
    };
  }
});

module.exports = Radium(DisplayInput);