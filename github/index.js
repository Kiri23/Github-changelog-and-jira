const { Octokit } = require("@octokit/rest");

const setToken = (token) => {
  return new Octokit({
    auth: token
  })
}
const getChangelog = async (octokit, repoInfo) => {
  // Obtener el contenido del archivo changelog del repositorio privado de GitHub
  const { data: changelog } = await octokit.repos.getContent({
    owner: repoInfo.owner,
    repo: repoInfo.repo, 
    path: repoInfo.path  
  });
  return Buffer.from(changelog.content, "base64").toString("utf8");
}

module.exports = {setToken, getChangelog}