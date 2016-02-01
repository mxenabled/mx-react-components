
 const React = require('react');
 const eslint = required('eslint');
 const Radium = require('radium');  React Component Styling Library
 const StyleConstants = require('../constants/Style');



 // //const Input = React.createClass({
 //      // Allows you to control the presence, or types of certain props ( properties ) passed to the child component.
 //     propTypes:{

 //     },

 //     // Allows you to set default props for your component.
 //     getDefaultProps(){

 //     }

 //      //What you want the HTML template to look like
    
 //     return();
 //     render: function(){
 //         return()
//       }
                 

        const Input = React.createClass({

            alert:  function (){
                alert('Learning React');

            },
            render: function() {
                return (
                    <div>
                        <h1>{this.props.user}{this.props.text}</h1>
                        <a onClick={this.alert} href="#" >Click Me</a>
                    </div>

                );
            },
            

        });

        React.render(
                    <div>
                     <Input user="Shaylee" input="input" /> 
                     <Input user="Alex" input="text" />
                    </div>,
                    document.getElementById('app'));

 });
 module.exports = Radium(Input)
