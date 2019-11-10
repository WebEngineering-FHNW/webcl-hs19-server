<!DOCTYPE html>
<html>
<head>
  <asset:javascript src="spring-websocket"/>
</head>

<body>
<button id="helloButton">hello</button>

<div id="out"></div>


<script>

    const URL = "${createLink(uri: '/stomp')}"; // let gsp put in the current server (relatively) on js creation time
    const channel = "/topic/hello";
    const endpoint = "/app/hello";

    const socket = new SockJS(URL);
    const client = webstomp.over(socket);

    client.connect({},  () => {
        client.subscribe(channel, message =>  {
            document.querySelector("#out").append(message.body + " ");
        });
    });

    document.querySelector("#helloButton").onclick = evt =>
        client.send(endpoint, JSON.stringify("world"))
    ;

</script>
</body>
</html>
