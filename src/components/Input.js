//Testing Comments
var Input = React.createClass({
  getInitialState: function(){
    return {
      def_Value: 50,
      def_currency: '$'
    };
  },
  
  setCurrency: function(e){
    this.setState({def_currency: e.target.value});
    
    if(e.target.value === ''){
      this.setState({def_currency: '$'});
    }
  },
  
  setDepositAmount: function(input_event){ //inpup_event.target.value is the text from input box
    
    this.setState({def_Value: input_event.target.value});
    
    
  },
  
  render: function(){
    return (
      <div className='main'>
        
        <input type="number" placeholder={'ex. 50'} onChange={ this.setDepositAmount} />
        <select onChange={this.setCurrency}>
          
          <option value='$' selected>US $</option>     
          <option value='€'>EUR €</option>
          <option label=''></option>
        </select>
       <p> A deposit of {this.state.def_currency + this.state.def_Value} will be made. </p>
        </div>);
  }
});

ReactDOM.render(<Input />, document.getElementById('container'));

