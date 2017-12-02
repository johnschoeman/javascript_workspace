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

const createStore = (reducer) => {
  let state;
  let listeners = []

  const getState = () => {
    return state;
  }

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener())
  }

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }

  dispatch({});

  return { getState, dispatch, subscribe }
}


const store = createStore(counter, 0);

document.addEventListener('DOMContentLoaded', () => {
  const render = () => {
    document.body.innerText = store.getState();
  }
  const subscription = store.subscribe(render)
  render();
  
  document.addEventListener('click', () => {
    store.dispatch({type: 'INCREMENT'})
  })

  document.addEventListener('keypress', () => {
    subscription();
  })
})