const React = require('react');
const Radium = require('radium');

const StyleConstants = require('../constants/Style');

class FormField extends React.Component {
  render () {
    return (
      <div
        className='mx-form-field-component'
        style={[
          styles.component, this.props.style,
          { height: this.props.height + 'px', width: this.props.width + 'px' }
        ]}
      >
        <div
          className='mx-form-field-label'
          style={[
            styles.label, this.props.labelStyle,
            { marginTop: this.props.height - 16 }
          ]}
        >
          {this.props.label}
        </div>
        <div
          className='mx-form-field-wrapper'
          style={[
            styles.fieldWrapper,
            this.props.fieldWrapperStyle
          ]}
        >
          {this.props.isRequired ? (
            <div
              className='mx-form-field-required'
              style={[
                styles.required,
                this.props.requiredStyle
              ]}
            >
              * Required
            </div>
          ) : null}
          {this.props.children}
          {this.props.placeholder ? (
            <div
              className='mx-form-field-placeholder'
              style={[
                styles.placeholder,
                this.props.placeholderStyle,
                { paddingTop: this.props.height / 2 }
              ]}
            >
              {this.props.placeholder}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

FormField.propTypes = {
  fieldWrapperStyle: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]),
  height: React.PropTypes.number,
  isRequired: React.PropTypes.bool,
  label: React.PropTypes.string,
  labelStyle: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]),
  placeholder: React.PropTypes.string,
  placeholderStyle: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]),
  requiredStyle: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]),
  width: React.PropTypes.number
};

FormField.defaultProps = {
  height: 40,
  isRequired: false,
  width: 350
};

const styles = {
  component: {
    borderBottom: '1px solid ' + StyleConstants.Colors.FOG,
    boxSizing: 'border-box'
  },
  fieldWrapper: {
    boxSizing: 'border-box',
    float: 'left',
    position: 'relative',
    width: '70%'
  },
  label: {
    color: StyleConstants.Colors.ASH,
    boxSizing: 'border-box',
    float: 'left',
    fontSize: '12px',
    padding: '0px 5px 0px 0px',
    position: 'relative',
    width: '30%'
  },
  placeholder: {
    boxSizing: 'border-box',
    color: StyleConstants.Colors.ASH,
    fontSize: StyleConstants.FontSizeMedium,
    height: '100%',
    position: 'absolute',
    right: '0px',
    top: '0px',
    width: '100%',
    zIndex: -1
  },
  required: {
    boxSizing: 'border-box',
    color: StyleConstants.Colors.STRAWBERRY,
    fontSize: StyleConstants.FontSize,
    position: 'absolute',
    right: '5px',
    top: '5px'
  }
};

module.exports = Radium(FormField);