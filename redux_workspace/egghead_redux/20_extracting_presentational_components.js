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

const store = createStore(todoAppReducer, initialState);

window.store = store;

const FilterLink = ({
  filter,
  currentFilter,
  children
}) => {
  if (filter === currentFilter) {
    return <span>{children}</span>;
  }
  return (
    <a 
      href="#"
      onClick={(e) => {
        e.preventDefault();
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        })
      }} >
      {children}
    </a>
  )
}

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

let nextId = 0;
class TodoApp extends Component {
  render() {
    const { todos, visibilityFilter } = this.props
    const visibleTodos = getVisibleTodos(visibilityFilter, todos)
    return (
      <div>
        <input ref={node => {
          this.input = node
        }}/>
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: this.input.value,
            id: nextId++
          });
          this.input.value = '';
        }} >
        Add Todo
        </button>
        <TodoList
          todos={visibleTodos}
          onTodoClick={id => {
            store.dispatch({
              type: 'TOGGLE_TODO',
              id
            })
          }
          }/>
        <p>
          Show:
          {' '}
          <FilterLink 
            filter='SHOW_ALL'
            currentFilter={visibilityFilter}>
            All
          </FilterLink>
          {' '}
          <FilterLink 
            filter='SHOW_ACTIVE' 
            currentFilter={visibilityFilter}>
            Active
          </FilterLink>
          {' '}
          <FilterLink 
            filter='SHOW_COMPLETED'
            currentFilter={visibilityFilter}>
            Completed
          </FilterLink>
        </p>
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp {...store.getState()}/>,
    document.getElementById('root')
  )
};

store.subscribe(render);
document.addEventListener('DOMContentLoaded', () => {
  render();
})