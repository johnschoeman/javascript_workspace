import React, { Component } from 'react';
import ReactDOM from 'react-dom'

const RefTest = () => {
  return (
    <input
      key={'i-am-input'}
      ref={node => {
        console.log('node: ', node)
        this.node = node
      }}
    />
  )
}

class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
    return (
      <div>
        <input
          type="text"
          ref={(input) => { 
            console.log('input', input)
            this.textInput = input; 
            }} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}

function FunctionalCustomTextInput(props) {
  // textInput must be declared here so the ref callback can refer to it
  let textInput = null;

  function handleClick() {
    textInput.focus();
  }

  return (
    <div>
      <input
        type="text"
        ref={(input) => { 
          console.log(input)
          textInput = input; }} />
      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );  
}

class App extends Component {
  
  render() {
    return (
      <div>
        <FunctionalCustomTextInput />

      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root')
  ReactDOM.render(<App />, root);
})