const axios = require('axios');

const graphdbEndpoint = 'http://localhost:7200/repositories/paises';


function getCountryInfo(country){
    const sparqlQuery = `
    PREFIX : 
    SELECT * WHERE {
        
    }
    `;


    axios.get(graphdbEndpoint, { params: {"query":sparqlQuery}, headers: {'Accept': 'application/sparql-results+json'} })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error making SPARQL query:', error);
      });
}