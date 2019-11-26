
import { client } from "./restClient.js";

export { exampleOperations }

let counter = 0;

const exampleOperations = (baseUrl, out) => {

    counter++;
    out.innerText = "";

    const writeln = (label, text) => out.innerText += "\n\n" + label + "\n" + text;

    client(baseUrl)
        .then(json => writeln("All devs:", JSON.stringify(json)));

    client(baseUrl + '/1', 'PUT', {"firstName": "Dierk", "imageUrl": null, "lastName": "Koenig" + counter})
        .then(json => writeln("Modify dev 1:", JSON.stringify(json)));

    client(baseUrl)
        .then(json => writeln("All devs again: ", JSON.stringify(json)));

    client(baseUrl, 'POST', {"firstName": "Roger", "imageUrl": null, "lastName": "Federer"})
        .then(json => writeln("New dev:", JSON.stringify(json)));

    if (counter < 3) return;
    // const delId = String(counter + 1);
    client(baseUrl + '/' + counter, 'DELETE')
        .then(text => writeln("Deleted dev "+ counter, text))
        .catch(error => writeln("Could not delete dev "+ counter, error));  // Error expected if FK violation
};
