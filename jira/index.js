const jira = require("jira-client");
const dotenv = require('dotenv');

const fetch = require('node-fetch');

dotenv.config();

async function updateTicketStatus(ticketId, newStatus, jiraAuth) {
  // Crear una instancia de JIRA Client con las credenciales de autenticación
  const jiraClient = new jira(jiraAuth);
  console.log(jiraClient);

  // Buscar el ticket en JIRA
  const issue = await jiraClient.findIssue(ticketId);

  // Actualizar el estado del ticket
  await jiraClient.updateIssue(issue.key, {
    fields: {
      status: {
        name: newStatus,
      },
    },
  });

  console.log(`El ticket ${ticketId} ha sido actualizado con éxito al estado "${newStatus}"`);
}

// // Ejemplo de uso: actualizar el estado del ticket "PPA-1" a "En curso"
// updateTicketStatus("PPA-1", "En Curso", {
//   protocol: "https",
//   host: "kiri23.atlassian.net",
//   bearer: process.env.JIRA_TOKEN,
//   apiVersion: "3",
//   strictSSL: true,
// });


/**
 * curl --request PUT \
  --url 'https://kiri23.atlassian.net/rest/api/3/issue/PPA-1' \
  --user 'christian_nogueras94@hotmail.com:token from env' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
   "fields":{
      "status":{
         "name":"In progress"
      }
   }
}'
 * @param {*} issueId 
 */
const updateTicketStatus2 = async (issueId) => {
    // This code sample uses the 'node-fetch' library:
    // https://www.npmjs.com/package/node-fetch

    fetch(`https://kiri23.atlassian.net/rest/api/3/issue/${issueId}`, {
    method: 'GET',
    headers: {
        'Authorization': `Basic ${Buffer.from(
        `christian_nogueras94@hotmail.com:${process.env.JIRA_TOKEN}`
        ).toString('base64')}`,
        'Accept': 'application/json'
    }
    })
    .then(response => {
        console.log(
        `Response: ${response.status} ${response.statusText}`
        );
        return response.text();
    })
    .then(text => console.log(text))
    .catch(err => console.error(err));
}

updateTicketStatus2("PPA-1")