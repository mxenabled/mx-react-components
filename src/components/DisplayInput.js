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
    const styles = this.styles();

    return (
      <Container>
        <Row>
          <Column>
            { this._isLargeOrMediumWindowSize() && (
              <div style={styles.wrapper}>
                {this.props.label ? (
                  <div key='label' style={styles.label}>
                    <div style={Object.assign({}, styles.labelText, this.props.labelStyle)}>
                      {this.props.label}
                    </div>
                  </div>) : null}
                <input
                  {...this.props}
                  key='input'
                  label={this.props.label}
                  style={styles.input}
                  type='text'
                />
                <div style={styles.hint}>
                  <div style={styles.hintText}>
                    {this.props.showHint && !this.props.status ? (<div>{this.props.hint}</div>) : null}
                    {this.props.status ? (<div style={styles[this.props.status.type]}>{this.props.status.message}</div>) : null}
                  </div>
                </div>
              </div>
            )}

            { !this._isLargeOrMediumWindowSize() && (
              <div style={styles.wrapperSmall}>
                {this.props.label ? (
                  <div key='label' style={styles.labelSmall}>
                    <div style={Object.assign({}, styles.labelText, this.props.labelStyle)}>
                      {this.props.label}
                    </div>
                  </div>) : null}
                <input
                  {...this.props}
                  key='input'
                  label={this.props.label}
                  style={styles.inputSmall}
                  type='text'
                />
                <div style={styles.hint}>
                  <div style={styles.hintText}>
                    {this.props.showHint && !this.props.status ? (<div>{this.props.hint}</div>) : null}
                    {this.props.status ? (<div style={styles[this.props.status.type]}>{this.props.status.message}</div>) : null}
                  </div>
                </div>
              </div>
            )}

          </Column>
        </Row>
      </Container>
    );
  },

  styles () {
    const isLargeOrMediumWindowSize = this._isLargeOrMediumWindowSize();

    return {
      wrapper: Object.assign({
        borderBottom: this.props.valid ? '1px solid ' + StyleConstants.Colors.FOG : '1px solid ' + StyleConstants.Colors.STRAWBERRY,
        height: 43,
        paddingLeft: this.props.label ? 130 : 0,
        paddingRight: this.props.hint || this.props.status ? 100 : 0,
        transition: 'all .2s ease-in',
        WebkitAppearance: 'none',
        whiteSpace: 'nowrap',

        ':focus': {
          borderBottom: this.props.valid ? '1px solid ' + this.props.primaryColor : '1px solid ' + StyleConstants.Colors.STRAWBERRY,
          boxShadow: 'none',
          outline: 'none'
        }
      }, this.props.style),

      input: {
        backgroundColor: 'transparent',
        border: '1px solid transparent',
        float: 'left',
        fontSize: StyleConstants.FontSizes.LARGE,
        padding: 10,
        WebkitAppearance: 'none',
        width: '100%',

        ':focus': {
          boxShadow: 'none',
          outline: 'none'
        }
      },

      label: {
        float: 'left',
        height: '100%',
        marginLeft: -130,
        position: 'relative',
        width: 130,

        ':focus': {
          color: this.props.primaryColor
        }
      },

      labelText: {
        color: StyleConstants.Colors.BLACK,
        fontSize: StyleConstants.FontSizes.SMALL,
        fontFamily: StyleConstants.Fonts.SEMIBOLD,
        bottom: 14,
        left: 5,
        position: 'absolute'

      },

      wrapperSmall: Object.assign({
        display: 'flex',
        borderBottom: this.props.valid ? '1px solid ' + StyleConstants.Colors.FOG : '1px solid ' + StyleConstants.Colors.STRAWBERRY,
        flexWrap: 'wrap',
        height: 80,
        paddingRight: this.props.hint || this.props.status ? 100 : 0,
        transition: 'all .2s ease-in',
        WebkitAppearance: 'none',
        whiteSpace: 'nowrap',

        ':focus': {
          borderBottom: this.props.valid ? '1px solid ' + this.props.primaryColor : '1px solid ' + StyleConstants.Colors.STRAWBERRY,
          boxShadow: 'none',
          outline: 'none'
        }
      }, this.props.style),

      inputSmall: {
        backgroundColor: 'transparent',
        border: '1px solid transparent',
        flex: '1 0 100%',
        float: 'left',
        fontSize: StyleConstants.FontSizes.LARGE,
        height: '70%',
        padding: 10,
        WebkitAppearance: 'none',
        width: '70%',

        ':focus': {
          boxShadow: 'none',
          outline: 'none'
        }
      },

      labelSmall: {
        flex: '1 0 100%',
        height: '30%',
        position: 'relative',
        width: 130,

        ':focus': {
          color: this.props.primaryColor
        }
      },

      hint: {
        color: this.props.primaryColor,
        display: 'inline-block',
        float: 'right',
        height: '100%',
        marginRight: -100,
        position: 'relative',
        textAlign: 'right',
        top: '50%',
        transform: 'translateY(-50%)'
      },

      hintText: {
        bottom: isLargeOrMediumWindowSize ? 14 : 0,
        position: 'absolute',
        right: 5
      },

      error: {
        color: StyleConstants.Colors.STRAWBERRY
      },

      success: {
        color: this.props.primaryColor
      }
    };
  }
});

module.exports = Radium(DisplayInput);
