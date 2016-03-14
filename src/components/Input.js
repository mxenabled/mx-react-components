var Input = React.createClass({

  //set up defaults
  getInitialState: function() {  	
    return {
        value: this.props.defaultvalue,
         iStyle: this.baseStyle, 
         inputStyle: this.inputBaseStyle};
  },
  
  //styles for the input field
  baseStyle: {flex: "initial", whiteSpace: "nowrap", padding: "5px"},
  hoverStyle: {fontWeight: "bold", flex: "initial", whiteSpace: "nowrap", padding: "5px"},
  inputBaseStyle: {flexBasis: "100%"},  
  inputFocusStyle: {flexBasis: "100%", fontWeight: "bold"},  
  
//detects change in the input field and validates depending on the field type  
  handleChange: function(event) {
    var value = event.target.value;
    this.setState({value: value});

    this.state.error = "";
    if(this.props.validate){
      if(this.props.validate == "number"){
        if (isNaN(value)){
          this.state.error = "Not a Number";
        }
      }
      else if(this.props.validate == "text"){
          if(typeof(value) != Text){
              this.state.error = "Not text";
          }
      }
      else if(this.props.validate == "other forms of validation"){
          //logic for the other forms of validation
      }
		}
  },
  
  //hover handlers bolds the label prefix suffix
  handleMouseOver: function(event){
    this.setState({iStyle: this.hoverStyle})
  },
  handleMouseOut: function(event){
    this.setState({iStyle: this.baseStyle})
  },
  
  //focus handlers changes the style of the form field text
  handleFocus: function(event){
    this.setState({inputStyle: this.inputFocusStyle})
  }, 
  handleBlur: function(event){
    this.setState({inputStyle: this.inputBaseStyle})
  },
  
  render: function() {
    return (
      <div className="MyInput" style={{display:"flex"}} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
        <label className="MyInputLabel" style={this.state.iStyle}>
          {this.props.label}          
        </label>
        <span style={this.state.iStyle}>
          {this.props.prefix}</span>
        <input 
        label={this.props.label}
          type="text" 
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          style={this.state.inputStyle}
        />
        <span style={this.state.iStyle}>
          {this.props.suffix}</span>
        <span style={{color:"red"}}>
          {this.state.error}</span>
      </div>
    );
  }
});
ReactDOM.render(
  <Input 
    prefix="$" 
    suffix=".00" 
    placeholder="money" 
    defaultvalue="100" 
    label="My Cool"
    validate="number" />,
  document.getElementById('content')
);
