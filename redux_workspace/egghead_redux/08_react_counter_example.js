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

const e = React.createElement

const Counter = ({ 
  value,
  onIncrement,
  onDecrement
 }) => (
  e('div',
    undefined,
    e('h1',
      undefined,
      value
    ),
    e('button',
      {onClick: onIncrement},
      '+'
    ),
    e('button',
      {onClick: onDecrement},
      '-'
    )
  )
)

console.log(React)
console.log(ReactDOM)

document.addEventListener('DOMContentLoaded', () => {
  const render = () => {
    ReactDOM.render(
      React.createElement(
        Counter,
        {
          value: store.getState(), 
          onIncrement: () => {
            store.dispatch({ type: 'INCREMENT' })
          },
          onDecrement: () => store.dispatch({ type: 'DECREMENT' })
        }
      ),
      document.getElementById('root')
    )
  }
  
  render();

  store.subscribe(render);
})