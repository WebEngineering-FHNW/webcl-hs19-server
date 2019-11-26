/**
 * @module Starter. Kicks off the client side.
 * The only file that knows about specifics of the displaying page.
 */

import { exampleOperations } from "./restExample.js"

const URL   = `http://${grailsServerName}:${grailsServerPort}${restPath}`;

const helloButton       = document.createElement("BUTTON");
helloButton.innerText   = "Hello";
const out               = document.createElement("DIV");

appRoot.appendChild(helloButton);
appRoot.appendChild(out);

helloButton.onclick     = _ => exampleOperations(URL, out);
