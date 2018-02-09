const Bluebird = require('bluebird');

async function main() {
  const x = await 42;
  console.log(x);
  console.log('working...');
  await Bluebird.delay(2000);
  console.log('done');
}

main();