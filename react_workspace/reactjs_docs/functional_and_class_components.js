const e = React.createElement

function Welcome (props) {
  return e('h1', undefined, `welcome ${props.name}`)
}

class WelcomeClass extends React.Component {
  render() {
    return e('h1', undefined, `welcome ${this.props.name}`)
  }
}

function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

function Avatar(props) {
  return e('img', {src: props.author.avatarUrl, alt: props.author.name})
}

function UserInfo(props) {
  return e('div', undefined, `${props.author.name}`)
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