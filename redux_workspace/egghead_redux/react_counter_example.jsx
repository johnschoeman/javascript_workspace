const defaultState = 10;

const counterReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const { createStore } = Redux;
const store = createStore(counterReducer, 0);

const Counter = ({ value }) => (
  React.createElement(
    'h1',
    undefined,
    value
  )
)

console.log(React)
console.log(ReactDOM)

document.addEventListener('DOMContentLoaded', () => {
  const render = () => {
    ReactDOM.render(
      React.createElement(
        Counter,
        {value: store.getState()}
      ),
      document.getElementById('root')
    )
  }
  
  render();

  document.addEventListener('click', () => {
    store.dispatch({type: 'INCREMENT'})
  })
})