import { toggleDone, deleteTodo, addTodo } from '../app/state-functions';

describe('Addition', () => {
  it('knows how to add 1 + 1', () => {
    expect(1 + 1).toBe(2);
  })
})

test('tooggleDone completes an incomplete todo', () => {
  const startState = {
    todos: [{ id: 1, done: false, text: 'Buy Milk' }]
  };

  const finState = toggleDone(startState, 1);

  expect(finState.todos).toEqual([
    { id: 1, done: true, text: 'Buy Milk' }
  ]);
});

test('deleteTodo deletes a todo', () => {
  const startState = {
    todos: [{ id: 1, done: false, text: 'Buy Milk' }]
  }

  const finState = deleteTodo(startState, 1);

  expect(finState.todos).toEqual([]);
})

test('addTodo adds a todo', () => {
  const startState = {
    todos: []
  }
  const todo = { done: false, text: 'Buy Milk' }

  const finState = addTodo(startState, todo)

  // expect({a: 1}).toHaveProperty('a')
  expect(finState.todos[0].done).toBe(false);
  expect(finState.todos[0].text).toBe('Buy Milk');
})