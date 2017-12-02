const e = React.createElement

function Welcome (props) {
  return e('h1', undefined, `welcome ${props.name}`)
}

class WelcomeClass extends React.Component {
  render() {
    return e('h1', undefined, `welcome ${this.props.name}`)
  }
}

function App() {
  return e(
    'div',
    undefined,
    e(Welcome, {name: 'alice'}),
    e(Welcome, {name: 'bob'}),
    e(Welcome, {name: 'charlie'})
  )
}

ReactDOM.render(
  App(),
  document.getElementById('root')
);