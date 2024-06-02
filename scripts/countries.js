const axios = require('axios');

const graphdbEndpoint = 'http://localhost:7200/repositories/paises';

function getCountryInfo(country) {
    const sparqlQuery = `
    PREFIX : <http://www.rpcw.pt/rafa/ontologies/2024/paises/>
    SELECT ?verbo ?cena WHERE{
        :${country} a :Pais.
        :${country} ?verbo ?cena MINUS {:${country} a ?cena}
    }
    `;


    return axios.get(graphdbEndpoint, { params: { query: sparqlQuery }, headers: { 'Accept': 'application/sparql-results+json' } })
        .then(response => {
            const countryInfo = [];
            for (let binding of response.data.results.bindings) {
                const verboURI = binding.verbo.value.split('/');
                const verbo = verboURI[verboURI.length - 1];
                countryInfo.push({ verbo: verbo, cena: binding.cena.value });
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

function canBeNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

function compareCountries(country1, country2,row) {
    const sparqlQuery = `
    PREFIX : <http://www.rpcw.pt/rafa/ontologies/2024/paises/>
SELECT ?valor1 ?valor2 WHERE{
    :${country1} :${row} ?valor1.
    :${country2} :${row} ?valor2.
}
    `;


    return axios.get(graphdbEndpoint, { params: { query: sparqlQuery }, headers: { 'Accept': 'application/sparql-results+json' } })
        .then(response => {
            const v1 = response.data.results.bindings[0].valor1.value.replace(',', '.');
            const v2 = response.data.results.bindings[0].valor2.value.replace(',', '.');
            
            
            if (canBeNumber(v1) && canBeNumber(v2)) {
                const num1 = parseFloat(v1);
                const num2 = parseFloat(v2);
                return num1 < num2 ? -1 : num1 > num2 ? 1 : 0;
            } else {                
                return v1 === v2;
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
/*
COUNTRY EXAMPLE

:Portugal rdf:type owl:NamedIndividual ,
                      :Pais ;
            :nome "Portugal";
            :area "92,212" ;
            :capital "Lisbon" ;
            :costa "1061.4711416399998" ;
            :densidade_populacional "111" ;
            :espetativa_de_vida "81.3" ;
            :exportacoes "55658" ;
            :gdp "$237,686,075,635 " ;
            :hemisferio "Norte" ;
            :importacoes "67580" ;
            :lado_em_que_conduz "right" ;
            :latitude "39.399872" ;
            :literacia "399.2" ;
            :longitude "-8.224454" ;
            :migracao_liquida "5.05" ;
            :moeda "Euro" ;
            :mortalidade_infantil "3.1" ;
            :populacao "10,269,417" ;
            :taxa_de_mortalidade "0.053" ;
            :taxa_de_natalidade "8.5" ;
            :telefones_por_1000 "686.0" ;
            :temperatura_media "15.85" ;
            :emissoes_co2 "250" ;
            :medicos_por_mil "4.4";
            :racio_sexos "89.8" ;
            :receita_imposto "22.80%";
            :taxa_desemprego "10.5" ;
            :taxa_fertilidade "1.3" .
*/
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
        :${country} ?a ?b
    }
    WHERE{
        :${country.nome.replace(" ","_")} ?a ?b
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

module.exports = { getCountryInfo, compareCountries, addCountry, deleteCountry, editCountry};


