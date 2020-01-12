
import { pepServices } from "./service/remoteService.js";
import { start }       from "./pep.js";

// use data as provided from view through the window object:
const URL   = `http://${grailsServerName}:${grailsServerPort}${restPath}`;
const appRootId = window.appRootId;

const channel  = window.webStompChannel;
const endpoint = window.webStompEndPoint;
const client   = window.webStompClient;

const services = pepServices(URL, "/static/pep/img/");

services.setBroadcastHandler(command => client.send(endpoint, JSON.stringify(command)));

services.startListening(client, channel);

services.loadDevelopers( devs => start(services, appRootId, devs) );


