const { Octokit } = require("@octokit/rest");
const jira = require("jira-client");

async function syncChangelogWithJira(repoOwner, repoName, changelogPath, jiraAuth) {
  // Crear una instancia de Octokit con un token de acceso personal
  const octokit = new Octokit({
    auth: "your_personal_access_token",
  });

  // Obtener el contenido del archivo changelog del repositorio privado de GitHub
  const { data: changelogContent } = await octokit.repos.getContent({
    owner: repoOwner,
    repo: repoName,
    path: changelogPath,
  });
  const changelogContentString = Buffer.from(changelogContent.content, "base64").toString("utf8");

  // Extraer los números de ticket mencionados en el archivo changelog
  const ticketRegex = /\b[A-Z]+-\d+\b/g;
  const tickets = changelogContentString.match(ticketRegex);

  // Crear una instancia de JIRA Client con las credenciales de autenticación
  const jiraClient = new jira(jiraAuth);

  // Actualizar los tickets de JIRA correspondientes con la información del archivo changelog
  for (const ticket of tickets) {
    // Buscar el ticket en JIRA
    const issue = await jiraClient.findIssue(ticket);

    // Actualizar el campo
