const axios = require("axios");

const configureJira = (JiraMeta) => {
 return axios.create({
    baseURL: JiraMeta.instanceURL, // https://Kiri23.atlassian.net/
    auth:{
      username:JiraMeta.username, //"christian_nogueras94@hotmail.com"
      password:JiraMeta.token
    },
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
    },
  });
}

// TODO: este llamada es bastante similar a la llamada de Github. Hiciera sentido usar una interfaz?
// hacer lo mismo que github tener un metodo donde pueda crear una instancia de axios con la URL y el auth configurado
async function updateTicketSummary(ticketId, axiosInstance) {
  try {
    // get list of transaction using a get method, then with that id use a post method to trigger a transition
    const response = await axiosInstance.post(
      `rest/api/3/issue/${ticketId}/transitions`,
      {
        transition:{
            id: 31
        }
      }
    );
    console.log(response.data)
    console.log(`El resumen del ticket ${ticketId} ha sido actualizado con éxito`);
  } catch (error) {
    console.log(error.response)
    console.error(error.response.data);
  }
}

module.exports = {updateTicketSummary, configureJira}
// Ejemplo de uso: actualizar el resumen del ticket "PPA-2"
// updateTicketSummary("PPA-2", "Nuevo resumen del ticket usando API");

/**
 * gett all status using a get request `https://Kiri23.atlassian.net/rest/api/3/issue/${ticketId}?fields=status`,
 * 
 * transitions using a get method
 * 
 *  {
      id: '11',
      name: 'To Do',
      to: [Object],
      hasScreen: false,
      isGlobal: true,
      isInitial: false,
      isAvailable: true,
      isConditional: false,
      isLooped: false
    },
    {
      id: '21',
      name: 'In Progress',
      to: [Object],
      hasScreen: false,
      isGlobal: true,
      isInitial: false,
      isAvailable: true,
      isConditional: false,
      isLooped: false
    },
    {
      id: '31',
      name: 'Done',
      to: [Object],
      hasScreen: false,
      isGlobal: true,
      isInitial: false,
      isAvailable: true,
      isConditional: false,
      isLooped: false
    }
 * 
 * 
 * [
  {
    self: 'https://kiri23.atlassian.net/rest/api/3/statuscategory/1',
    id: 1,
    key: 'undefined',
    colorName: 'medium-gray',
    name: 'No Category'
  },
  {
    self: 'https://kiri23.atlassian.net/rest/api/3/statuscategory/2',
    id: 2,
    key: 'new',
    colorName: 'blue-gray',
    name: 'To Do'
  },
  {
    self: 'https://kiri23.atlassian.net/rest/api/3/statuscategory/4',
    id: 4,
    key: 'indeterminate',
    colorName: 'yellow',
    name: 'In Progress'
  },
  {
    self: 'https://kiri23.atlassian.net/rest/api/3/statuscategory/3',
    id: 3,
    key: 'done',
    colorName: 'green',
    name: 'Done'
  }
]
 */