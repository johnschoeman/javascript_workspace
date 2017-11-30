function resolveAfter1Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 1000);
  });
}

async function fetchData(cb) {
  let data
  if (typeof cb === "function") {
    data = await resolveAfter1Seconds('peanut butter')
    return cb(data)
  } else {
    return new Promise(resolve => {
      data = 'peanut butter'
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
  }
}

test('the data is peanut butter 1', done => {
  function callback(data) {
    expect(data).toBe('peanut butter');
    done();
  }
  fetchData(callback);
});

test('the data is peanut butter 2', () => {
  expect.assertions(1);
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});

test('the data is peanut butter 3', () => {
  expect.assertions(1);
  return expect(fetchData()).resolves.toBe('peanut butter');
});

test('the data is peanut butter 4', async () => {
  expect.assertions(1);
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});