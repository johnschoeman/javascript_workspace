const e = React.createElement;
const br = e('br')

function tick() {
  const helloWorld = e('div', undefined, 'Hello World')
  const date = e('div', undefined, `It is ${new Date().toLocaleTimeString()}.`)
  const element = e(
    'div',
    undefined,
    helloWorld,
    br,
    date
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}
tick();
setInterval(tick, 1000);
