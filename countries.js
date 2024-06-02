// const axios = require('axios');

// const graphdbEndpoint = 'http://localhost:7200/repositories/paises';

// function getCountryInfo(country) {
//     const sparqlQuery = `
//     PREFIX : <http://www.rpcw.pt/rafa/ontologies/2024/paises/>
//     SELECT ?pais ?verbo ?cena WHERE{
//         :${country} a :Pais.
//         :${country} ?verbo ?cena MINUS {:${country} a ?cena}
//     }
//     `;

//     console.log('SPARQL query:', sparqlQuery);

//     axios.get(graphdbEndpoint, { params: { query: sparqlQuery }, headers: { 'Accept': 'application/sparql-results+json' } })
//         .then(response => {
//             console.log('Response received');
//             console.log('Response data:', JSON.stringify(response.data, null, 2));
//         })
//         .catch(error => {
//             console.error('Error making SPARQL query:', error.message);
//             if (error.response) {
//                 console.error('Response data:', error.response.data);
//                 console.error('Response status:', error.response.status);
//                 console.error('Response headers:', error.response.headers);
//             } else if (error.request) {
//                 console.error('No response received:', error.request);
//             } else {
//                 console.error('Error message:', error.message);
//             }
//         });
// }

console.log('Requesting country info for Portugal...');
//getCountryInfo('Portugal');
console.log('Request initiated...');
