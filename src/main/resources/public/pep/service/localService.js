
import "./serviceDoc.js"

export { pepServices }

/** @type Developer[] */
const devs = [
    {id:0, img:"img/img0.jpg", name: "Marie-Claude Federspiel"},
    {id:1, img:"img/img1.jpg", name: "Christian Ribeaud"},
];

/**
 * Concrete factory for local {@link PepService} functions.
 * @constructor
 * @returns {PepService}
 */
const pepServices = () => {

    const loadDevelopers = withDevelopers => withDevelopers(devs);

    const startListening = (stompClient, channel) =>
        console.log( "local service cannot listen to websockets.");

    const setBroadcastHandler = initialBroadcastHandler =>
        console.log( "local service cannot set broadcast handler.");

    const broadcast = command =>
        console.log( "local service does not broadcast.");

    return { loadDevelopers, startListening, setBroadcastHandler, broadcast }
};
