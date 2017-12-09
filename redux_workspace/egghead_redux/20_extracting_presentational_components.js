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
  children,
  onClick
}) => {
  if (filter === currentFilter) {
    return <span>{children}</span>;
  }
  return (
    <a 
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick(filter)
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

const AddTodo = ({
  onAddClick
}) => {
  let input;
  return (
    <div>
      <input ref={node => { input = node }}/>
      <button onClick={() => {
        onAddClick(input.value)
        input.value = ''; 
        }}>
      Add Todo
      </button>
    </div>
  )
}

const Footer = ({
  visibilityFilter,
  onFilterClick
}) => (
  <p>
  Show:
  {' '}
  <FilterLink 
    filter='SHOW_ALL'
    currentFilter={visibilityFilter}
    onClick={onFilterClick}>
    All
  </FilterLink>
  {' '}
  <FilterLink 
    filter='SHOW_ACTIVE' 
    currentFilter={visibilityFilter}
    onClick={onFilterClick}>
    Active
  </FilterLink>
  {' '}
  <FilterLink 
    filter='SHOW_COMPLETED'
    currentFilter={visibilityFilter}
    onClick={onFilterClick}>
    Completed
  </FilterLink>
</p>
);

let nextId = 0;
const TodoApp = ({
  todos, visibilityFilter
}) => (
  <div>
    <AddTodo 
      onAddClick={(text) => {
        store.dispatch({
          type: 'ADD_TODO',
          text,
          id: nextId++
        })
      }}
    />
    <TodoList
      todos={getVisibleTodos(visibilityFilter, todos)}
      onTodoClick={(id) => {
        store.dispatch({
          type: 'TOGGLE_TODO',
          id
        })
      }}
    />
    <Footer 
      visibilityFilter={visibilityFilter} 
      onFilterClick={filter => {
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        })
      }}
    />
  </div>
)


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