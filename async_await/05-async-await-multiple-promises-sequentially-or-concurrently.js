const fetch = require('node-fetch');

async function fetchGitHubUser(endpoint) {
  const url = `https://api.github.com${endpoint}`;
  const response = await fetch(url);
  return await response.json();
}

// Sequencial
// async function showUserAndRepos(handle) {
//   const user = await fetchGitHubUser(`/users/${handle}`)
//   const repos = await fetchGitHubUser(`/users/${handle}/repos`)

//   console.log(user.name);
//   console.log(`${repos.length} repos`);
// }

// Parallel
async function showUserAndRepos(handle) {
  const userPromise = fetchGitHubUser(`/users/${handle}`)
  const reposPromise = fetchGitHubUser(`/users/${handle}/repos`)

  const user = await userPromise;
  const repos = await reposPromise;

  console.log(user.name);
  console.log(`${repos.length} repos`);
}

showUserAndRepos('johnschoeman')