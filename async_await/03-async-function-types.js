const fetch = require('node-fetch');

// this allows use of function hoisting.
async function showGitHubUserDeclaration(handle) {
  const url = `https://api.github.com/users/${handle}`;
  const response = await fetch(url);
  return await response.json();
}

const showGitHubUserExpression = async function(handle) {
  const url = `https://api.github.com/users/${handle}`;
  const response = await fetch(url);
  return await response.json();
}

const showGitHubUserArrow = async (handle) => {
  const url = `https://api.github.com/users/${handle}`;
  const response = await fetch(url);
  return await response.json();
}

// not valid to use await at top level scope
// const user = await showGitHubUserDeclaration('johnschoeman');
// console.log(user.name);
// console.log(user.location);

//using async wrapper
(async () => {
  const user = await showGitHubUserDeclaration('johnschoeman');
  console.log(user.name);
  console.log(user.location);
})();

//using class
class GitHubClient {
  async fetchUser(handle) {
    const url = `https://api.github.com/users/${handle}`;
    const response = await fetch(url);
    return await response.json();
  }
}

(async () => {
  const client = new GitHubClient();
  const user = await client.fetchUser('johnschoeman');
  console.log(user.name);
  console.log(user.location);
})();