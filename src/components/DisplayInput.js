const React = require('react');
const Radium = require('radium');

const StyleConstants = require('../constants/Style');

const Column = require('../components/grid/Column');
const Container = require('../components/grid/Container');
const Row = require('../components/grid/Row');

class DisplayInput extends React.Component {
  static propTypes = {
    elementProps: React.PropTypes.object,
    hint: React.PropTypes.string,
    isFocused: React.PropTypes.bool,
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
  };

  static defaultProps = {
    elementProps: {},
    isFocused: false,
    primaryColor: StyleConstants.Colors.PRIMARY,
    valid: true
  };

  _isLargeOrMediumWindowSize = () => {
    const windowSize = StyleConstants.getWindowSize();

    return windowSize === 'large' || windowSize === 'medium';
  };

  render () {
    // Input properties
    const { elementProps } = this.props;

    // Methods
    const hasChildren = !!this.props.children;
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
        <div style={Object.assign({}, styles.wrapper, this.props.isFocused ? styles.wrapperFocus : {})}>
          <Row>
            {this.props.label ? (
              <Column span={labelColumn}>
                <div>
                  <div style={Object.assign({}, styles.labelText, this.props.labelStyle)}>
                    {this.props.label}
                  </div>
                </div>
              </Column>
            ) : null }

            <Column relative={!hasChildren} span={inputColumn}>
              {hasChildren ? (
                <div style={styles.children}>
                  {this.props.children}
                </div>
              ) : (
                <div style={styles.inputWrapper}>
                  <input
                    {...elementProps}
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

        <Row>
          {this.props.status ? (
            <Column offset={twoWidthColumn} span={statusColumn} >
              <div style={styles.status}>
                <div style={styles[this.props.status.type]}>{this.props.status.message}</div>
              </div>
            </Column>
          ) : null}
        </Row>
      </Container>
    );
  }

  styles = () => {
    const isLargeOrMediumWindowSize = this._isLargeOrMediumWindowSize();
    const wrapperFocus = {
      borderBottom: this.props.valid ? '1px solid ' + this.props.primaryColor : '1px solid ' + StyleConstants.Colors.STRAWBERRY,
      boxShadow: 'none',
      outline: 'none'
    };

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
        padding: StyleConstants.Spacing.SMALL
      },

      children: {
        alignItems: 'center',
        display: 'flex',
        padding: StyleConstants.Spacing.SMALL
      },

      labelText: {
        alignItems: 'center',
        color: StyleConstants.Colors.CHARCOAL,
        display: 'flex',
        fontSize: StyleConstants.FontSizes.SMALL,
        fontFamily: StyleConstants.Fonts.SEMIBOLD,
        paddingBottom: isLargeOrMediumWindowSize ? StyleConstants.Spacing.MEDIUM : StyleConstants.Spacing.XSMALL,
        paddingLeft: StyleConstants.Spacing.SMALL,
        paddingRight: StyleConstants.Spacing.SMALL,
        paddingTop: isLargeOrMediumWindowSize ? StyleConstants.Spacing.MEDIUM : StyleConstants.Spacing.XSMALL,
        textAlign: 'left'
      },

      status: {
        paddingBottom: StyleConstants.Spacing.XSMALL,
        paddingLeft: isLargeOrMediumWindowSize ? StyleConstants.Spacing.SMALL : StyleConstants.Spacing.XSMALL,
        paddingRight: StyleConstants.Spacing.SMALL,
        paddingTop: StyleConstants.Spacing.XSMALL
      },

      success: {
        color: this.props.primaryColor
      },

      wrapper: Object.assign({
        borderBottom: this.props.valid ? '1px solid ' + StyleConstants.Colors.FOG : '1px solid ' + StyleConstants.Colors.STRAWBERRY,
        boxSizing: 'border-box',
        paddingBottom: StyleConstants.Spacing.XSMALL,
        marginLeft: isLargeOrMediumWindowSize ? 0 : -10,
        marginRight: isLargeOrMediumWindowSize ? 0 : -10,
        paddingTop: StyleConstants.Spacing.XSMALL,
        transition: 'all .2s ease-in',
        WebkitAppearance: 'none',
        whiteSpace: 'nowrap',

        ':focus': wrapperFocus
      }, this.props.style),

      wrapperFocus
    };
  };
}

module.exports = Radium(DisplayInput);
