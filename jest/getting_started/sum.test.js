const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1,2)).toBe(3);
});

test('2 + 2 to be 4', () => {
  expect(2 + 2).toBe(4);
})

test('object assignment', () => {
  data = {one: '1'};
  data['two'] = '2';
  expect(data).toEqual({one: '1', two: '2'});
})

test('adding postitive numbers is not zero', () => {
  for(let i = 1; i < 11; i++) {
    for(let j = 1; j < 11; j++) {
      expect(i + j).not.toBe(0);
    }
  }
})

test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});

test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});