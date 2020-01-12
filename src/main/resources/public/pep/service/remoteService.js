import {client}      from "../../rest/restClient.js";
import {toDeveloper} from "./jsonToModel.js";
import                    "./serviceDoc.js"

export { pepServices }

/**
 * Concrete factory for remote, asynchronous {@link PepService} functions.
 * @returns {PepService}
 */
const pepServices = (URL, imagePath) => {

    let broadcastHandler;
    let assignmentHandler;

    const loadDevelopers = withDevelopers =>
        client(URL)
        .then(json => {
            // console.log("All devs:", JSON.stringify(json));
            const devs = json.map( toDeveloper(imagePath) );
            withDevelopers(devs);
        })
        .catch( err => console.error(err));

    const setAssignmentHandler = newHandler => assignmentHandler = newHandler;

    const startListening = (stompClient, channel) => {
        console.log("start listening", channel, stompClient);
        stompClient.connect({},  () => {
            console.log("subscribing for channel", channel);
            stompClient.subscribe(channel, payload =>  {
                console.log("processing message: ",payload.body);

                // take the payload and see whether we have to update any model
                // for the moment we can assume that we only have to care about assignments
                const assignment = JSON.parse(payload.body)
                assignmentHandler && assignmentHandler(assignment);

            });
        });
    };

    const setBroadcastHandler = initialBroadcastHandler => broadcastHandler = initialBroadcastHandler;

    const broadcast = command => {
        console.log("broadcasting: ", command);
        broadcastHandler(command);
    };

    return {
        loadDevelopers,
        startListening,
        setBroadcastHandler,
        setAssignmentHandler,
        broadcast
    }
};

