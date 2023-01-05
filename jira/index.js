const dotenv = require('dotenv');

dotenv.config();

const axios = require("axios");

// TODO: este llamada es bastante similar a la llamada de Github. Hiciera sentido usar una interfaz?
async function updateTicketSummary(ticketId, newSummary) {
  try {
    const response = await axios.put(
      `https://Kiri23.atlassian.net/rest/api/3/issue/${ticketId}`,
      {
        fields: {
          summary: newSummary,
        },
      },
      {
        auth:{
            username:"christian_nogueras94@hotmail.com",
            password:process.env.JIRA_TOKEN
        },
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
        },
      }
    );

    console.log(`El resumen del ticket ${ticketId} ha sido actualizado con éxito`);
  } catch (error) {
    console.log(error.response)
    console.error(error.response.data);
  }
}

// Ejemplo de uso: actualizar el resumen del ticket "PPA-2"
updateTicketSummary("PPA-2", "Nuevo resumen del ticket usando API");