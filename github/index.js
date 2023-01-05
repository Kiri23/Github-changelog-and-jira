const { Octokit } = require("@octokit/rest");
const dotenv = require('dotenv');

dotenv.config();
const getChangelog = async () => {
  // Crear una instancia de Octokit con un token de acceso personal
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  // Obtener el contenido del archivo changelog del repositorio privado de GitHub
  const { data: changelog } = await octokit.repos.getContent({
    owner: "Kiri23",
    repo: "node-rest-api-swagger-getting-started",
    path: "README.md",
  });
  return Buffer.from(changelog.content, "base64").toString("utf8");
}
getChangelog().then(data => console.log(data))
module.exports = {getChangelog}