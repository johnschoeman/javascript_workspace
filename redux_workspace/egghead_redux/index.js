const defaultState = 0;

const counter = (state = defaultState, action) => {
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
const store = createStore(counter, 0);



document.addEventListener('DOMContentLoaded', () => {
  const render = () => {
    document.body.innerText = store.getState();
  }

  store.subscribe(render)
  render();
  
  document.addEventListener('click', () => {
    store.dispatch({type: 'INCREMENT'})
  })
})