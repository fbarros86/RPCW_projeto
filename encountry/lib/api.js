const axios = require('axios');

const graphdbEndpoint = 'http://localhost:7200/repositories/paises';

const rows_facil = ["continente","hemisferio","latitude","longitude","temperatura_media"]
const rows_medio = ["gdp","area","densidade_populacional","lado_em_que_conduz","populacao"]
const rows_dificil = ["taxa_desemprego","taxa_fertilidade","racio_sexos","emissoes_co2","telefones_por_1000","taxa_de_natalidade","taxa_de_mortalidade","costa","espetativa_de_vida","exportacoes","importacoes","literacia","migracao_liquida","mortalidade_infantil"]

async function getCountriesSearch(searchString) {
    // Convert the search string to lowercase and split it into individual characters
    const searchChars = searchString.toLowerCase().split('');
  
    // Construct the FILTER part of the query dynamically
    const filters = searchChars.map(char => `CONTAINS(LCASE(?name), "${char}")`).join(' && ');
  
    const sparqlQuery = `
      PREFIX : <http://www.rpcw.pt/rafa/ontologies/2024/paises/>
      SELECT (SAMPLE(?name) AS ?country) ?flag WHERE {
          ?c a :Pais.
          ?c :nome ?name.
          ?c :flag ?flag.
          FILTER(${filters})
      } GROUP BY ?flag
    `;
  
    try {
      const response = await axios.get(graphdbEndpoint, {
        params: { query: sparqlQuery },
        headers: { 'Accept': 'application/sparql-results+json' },
      });
      const countryInfo = response.data.results.bindings.map(binding => ({
        country: binding.country.value,
        flag: binding.flag.value,
      }));
      return countryInfo;
    } catch (error) {
      console.error('Error making SPARQL query:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      return null;
    }
  }

function getRandomColumns(){
    // get 3 from rows_facil 1 from the others
    var columns = []
    var random = Math.floor(Math.random() * 4);
    var random2 = Math.floor(Math.random() * 4);
    if (random2 == random){
        random2 = (random2+1)%5
    }
    var random3 = Math.floor(Math.random() * 4);
    while(random3 == random || random3 == random2){
        random3 = (random3+1)%5
    }
    var random4 = Math.floor(Math.random() * 4);
    var random5 = Math.floor(Math.random() * (rows_dificil.length-1));

    columns.push(rows_facil[random])
    columns.push(rows_facil[random2])
    columns.push(rows_facil[random3])
    columns.push(rows_medio[random4])
    columns.push(rows_dificil[random5])
    return columns

}


function getAllFlags(){
    const sparqlQuery = `
    PREFIX : <http://www.rpcw.pt/rafa/ontologies/2024/paises/>
    SELECT (SAMPLE(?name) AS ?country) ?flag WHERE{
        ?c a :Pais.
        ?c :nome ?name.
        ?c :flag ?flag
    } GROUP BY ?flag
    `;


    return axios.get(graphdbEndpoint, { params: { query: sparqlQuery }, headers: { 'Accept': 'application/sparql-results+json' } })
        .then(response => {
            const flags = {};
            for (let binding of response.data.results.bindings) {
                flags[binding.country.value] = binding.flag.value;
            }
            return flags;
        })
        .catch(error => {
            console.error('Error making SPARQL query:', error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            return null;
        });
}

function getCountryInfo(country) {
    const sparqlQuery = `
    PREFIX : <http://www.rpcw.pt/rafa/ontologies/2024/paises/>
    SELECT ?verbo ?cena WHERE{
        ?country :nome "${country}".
        ?country a :Pais.
        ?country ?verbo ?cena MINUS {?country a ?cena}
    }
    `;


    return axios.get(graphdbEndpoint, { params: { query: sparqlQuery }, headers: { 'Accept': 'application/sparql-results+json' } })
        .then(response => {
            const countryInfo = {};
            for (let binding of response.data.results.bindings) {
                const verboURI = binding.verbo.value.split('/');
                const verbo = verboURI[verboURI.length - 1];
                if (verbo=="nome"){
                    if (!(verbo in countryInfo)){
                        countryInfo[verbo] = [];
                    }
                    countryInfo[verbo].push(binding.cena.value);
                }
                else{
                    countryInfo[verbo] = binding.cena.value;
                }
            }
            return countryInfo;
        })
        .catch(error => {
            console.error('Error making SPARQL query:', error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            return null;
        });
}


function compareCountries(country1, country2,row) {
    const sparqlQuery = `
    PREFIX : <http://www.rpcw.pt/rafa/ontologies/2024/paises/>
SELECT ?valor1 ?valor2 WHERE{
    ?country1 :nome "${country1}".
    ?country2 :nome "${country2}".
    ?country1 :${row} ?valor1.
    ?country2 :${row} ?valor2.
}
    `;


    return axios.get(graphdbEndpoint, { params: { query: sparqlQuery }, headers: { 'Accept': 'application/sparql-results+json' } })
        .then(response => {
            var v1 = response.data.results.bindings[0].valor1.value.replace(',', '.');
            var v2 = response.data.results.bindings[0].valor2.value.replace(',', '.');
            
            if (row=="hemisferio" || row=="lado_em_que_conduz" || row=="moeda" || row=="continente"){
                return v1 == v2 ? "igual" : "diferente";
            }
            else{
                v1 = v1.replace('$', '');
                v1 = v1.replace('%', '');
                v2 = v2.replace('$', '');
                v2 = v2.replace('%', '');
                v1 = parseFloat(v1);
                v2 = parseFloat(v2);
                return v1 < v2 ? "baixo" : v1 > v2 ? "alto" : "igual";
            }
        })
        .catch(error => {
            console.error('Error making SPARQL query:', error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            return null;
        });


}


function addCountry(country) {
    countryString = ""
    for (const [key, value] of Object.entries(country)) {
        countryString += `:${key} "${value}" ;\n`
    }
    countryString = countryString.slice(0, -2) + " ."
    const sparqlQuery = `
    PREFIX : <http://www.rpcw.pt/rafa/ontologies/2024/paises/>
    INSERT DATA{
        :${country.nome.replace(" ","_")} rdf:type owl:NamedIndividual ,
                      :Pais ;
            ${countryString}
    }
    `;


    return axios.post(graphdbEndpoint+"/statements", sparqlQuery, {
        headers: {
            'Content-Type': 'application/sparql-update',
            'Accept': 'application/sparql-results+json'
        }
    })
        .then(response => {
            console.log(response.status)
            return response;
        })
        .catch(error => {
            console.error('Error making SPARQL query:', error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            return null;
        });

}

function deleteCountry(country) {
    const sparqlQuery = `
    PREFIX : <http://www.rpcw.pt/rafa/ontologies/2024/paises/>
    DELETE{
       
        ?country ?a ?b
    }
    WHERE{
        ?country :nome "${country}".
        ?country ?a ?b
    }
    `;


    return axios.post(graphdbEndpoint+"/statements", sparqlQuery, {
        headers: {
            'Content-Type': 'application/sparql-update',
            'Accept': 'application/sparql-results+json'
        }
    })
        .then(response => {
            console.log(response.status)
            return response;
        })
        .catch(error => {
            console.error('Error making SPARQL query:', error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            return null;
        });


}

function editCountry(country) {
    triplos = ""
    triposapagar = ""
    countryName = country.nome.replace(" ","_")
    for (const [key, value] of Object.entries(country)) {
        triplos += `:${countryName} :${key} "${value}" .\n`
        triposapagar += `:${countryName} :${key} ?o .\n`
    }
    const sparqlQuery = `
    PREFIX : <http://www.rpcw.pt/rafa/ontologies/2024/paises/>
    DELETE{
        ${triposapagar}
    }
    INSERT{
        ${triplos}
    }WHERE {
        :${countryName} ?p ?o .
    }
    `;


    return axios.post(graphdbEndpoint+"/statements", sparqlQuery, {
        headers: {
            'Content-Type': 'application/sparql-update',
            'Accept': 'application/sparql-results+json'
        }
    })
        .then(response => {
            console.log(response.status)
            return response;
        })
        .catch(error => {
            console.error('Error making SPARQL query:', error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            return null;
        });
}

// getCountryInfo('Portugal')
//     .then(countryInfo => {
//         console.log(countryInfo)
//     })
//     .catch(error => {
//         console.error('Error getting country info:', error.message);
//     }
//     );

// compareCountries('Portugal','Spain','area')
//     .then(countryInfo => {
//         console.log(countryInfo)
//     })
//     .catch(error => {
//         console.error('Error getting country info:', error.message);
//     }
//     );

// addCountry({
//     "nome": "Teste",
//     "area": "92,212",
//     "capital": "test"
// })

// deleteCountry("Teste")

// editCountry({
//     "nome": "Teste",
//     "area": "91,212"
// })

// console.log(getRandomColumns())

getAllFlags()
.then(flags => {
            console.log(flags)
        })
        .catch(error => {
            console.error('Error getting flag info:', error.message);
        }
        );

module.exports = {getCountriesSearch, getRandomColumns, getAllFlags,getCountryInfo, compareCountries, addCountry, deleteCountry, editCountry};


