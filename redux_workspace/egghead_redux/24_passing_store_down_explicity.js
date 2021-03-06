import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'

const todoReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign(
        {}, 
        state, 
        {completed: !state.completed}
      )
    default:
      return state;
  }
}

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todoReducer(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(todo => todoReducer(todo, action))
    default:
      return state;
  }
};

const visibilityFilterReducer = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

const todoAppReducer = combineReducers({
  todos: todosReducer,
  visibilityFilter: visibilityFilterReducer
});

const getVisibleTodos = (
  filter,
  todos
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed);
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed)
  }
}

const Todo = ({
  onClick,
  completed,
  text
}) => {
  return (
  <li 
  onClick={onClick}
  style={{
    textDecoration: completed ? 'line-through' : 'none'
  }
}>
    {text}
  </li>
  )
}

const TodoList = ({
  todos,
  onTodoClick
}) => {
  return (
    <ul>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          {...todo}
          onClick={() => onTodoClick(todo.id)}
          />
      ))}
    </ul>
  )
}

class VisibileTodoList extends Component {
  componentDidMount() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() => 
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const { store } = props;
    const state = store.getState();

    return (
      <TodoList 
        todos={getVisibleTodos(state.visibilityFilter, state.todos)}
        onTodoClick={(id) => {
          store.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
        }}
      />
    )
  }
}

const AddTodo = ({ store }) => {
  let input;
  return (
    <div>
      <input ref={node => { input = node }}/>
      <button onClick={() => {
        store.dispatch({
          type: 'ADD_TODO',
          text: input.value,
          id: nextId++
        })
        input.value = ''; 
        }}>
      Add Todo
      </button>
    </div>
  )
}

const Link = ({
  active,
  children,
  onClick
}) => {
  if (active) {
    return <span>{children}</span>;
  }
  return (
    <a 
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick()
      }} >
      {children}
    </a>
  )
}

class FilterLink extends Component {
  componentDidMount() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() => 
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const { store } = props;
    const state = store.getState();

    return (
      <Link
        active={props.filter === state.visibilityFilter}
        onClick={() => {
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }}
      >
      {props.children}
      </Link>
    )
  }
}

const Footer = ({ store }) => (
  <p>
  Show:
  {' '}
  <FilterLink 
    filter='SHOW_ALL'
    store={store}
  >
    All
  </FilterLink>
  {' '}
  <FilterLink 
    filter='SHOW_ACTIVE'
    store={store} 
  >
    Active
  </FilterLink>
  {' '}
  <FilterLink 
    filter='SHOW_COMPLETED'
    store={store}
  >
    Completed
  </FilterLink>
</p>
);

let nextId = 0;
const TodoApp = ({ store }) => (
  <div>
    <AddTodo store={store}/>
    <VisibileTodoList store={store}/>
    <Footer store={store}/>
  </div>
)


document.addEventListener('DOMContentLoaded', () => {
  const initialState = {
    todos: [
      {
        id: 1234,
        text: 'hey',
        completed: false
      },
      {
        id: 2345,
        text: 'ho',
        completed: false
      },
      {
        id: 3456,
        text: 'let\'s go',
        completed: false
      }
    ]
  }
  ReactDOM.render(
    <TodoApp store={createStore(todoAppReducer, initialState)}/>,
    document.getElementById('root')
  )
})