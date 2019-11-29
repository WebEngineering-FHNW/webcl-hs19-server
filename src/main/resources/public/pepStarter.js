
import { client } from "./restClient.js";
import { start }  from "./pep.js";

// use data as provided from view through the window object:
const URL   = `http://${grailsServerName}:${grailsServerPort}${restPath}`;
const appRootId = window.appRootId;

// initial load (async)
client(URL)
    .then(json => {
        // console.log("All devs:", JSON.stringify(json));
        const devs = json.map( (dev,idx) => (
            {
                id: idx, // todo: use proper domain index
                img: "/static/img/"+ (dev.imageUrl || "imgno.jpg"),
                name: dev.firstName + " " + dev.lastName }
        ));
        start(devs);
    })
    .catch( err => console.error(err));
