<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>

  <asset:javascript src="spring-websocket"/>

  <script src="/static/pep/pepRemoteStarter.js" type="module"></script>

  <title>Personal Einsatz Planung</title>
  <style>
          body {
              margin: 4rem;
              box-sizing: border-box;
              font-family: "Helvetica Neue", "sans-serif";
              height: 100vh;
              background-image:
                      repeating-radial-gradient(circle at 20vw 50vh, white, rgba(127, 116, 205, 0.31));

              --developer-color: #ffe6a5;
              --project-color:   #d1d7ee;
              --hightlight-overlay: rgba(255, 255, 0, 0.6);
              --drop-shadow:      0 .5em 0.5em lightgrey;
          }
          #topicsOverWeeks * {
              -webkit-user-select: none;
              -moz-user-select: none;
              user-select: none;
          }
          #topicsOverWeeks {
              display: grid;
              grid-template-columns: minmax(12em, 1.2fr) repeat(4, 1fr);
              grid-row-gap: 1em;
              grid-column-gap: .5em;
          }
          .topic {
              min-height: 3em;
              padding: .2em .5em .2em 50%;
              border-radius: 3em 0.5em 0.5em 3em;
              display: flex; /* let the text flow to the right, vertical center */
              justify-content: flex-end;
              text-align: right;
              align-items: center;
          }
          .developer {
              background-color: var(--developer-color);
          }
          .project {
              background-color: var(--project-color);
          }
          .topic.developer {
              background-repeat: no-repeat;
              background-size: 6em;
              background-position: left top;
              border: 4px solid var(--developer-color);
              box-shadow: .3em 0 1px 0 var(--developer-color), var(--drop-shadow);
          }
          .topic.project {
              --pid-color: var(--project-color);
              border: 4px solid var(--project-color);
              background-image: linear-gradient(90deg, var(--pid-color),  var(--pid-color) 6em, transparent 6em);
              background-blend-mode: color-burn;
              box-shadow: .3em 0 1px 0 var(--project-color), var(--drop-shadow);
          }
          .week {
              border-radius: 0.5em;
              position: relative;  /* allow the yellow overlay to position itself absolutely against this */
              align-self: end;     /* the content in the grid cells must float to the bottom */
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
          }
          .week.developer {
              box-shadow: -.3em 0 1px 0px var(--developer-color),
                           .3em 0 1px 0px var(--developer-color),
                          var(--drop-shadow);
              background: var(--developer-color);
          }
          .week.project {
              box-shadow: -.3em 0 1px 0px var(--project-color),
                           .3em 0 1px 0px var(--project-color),
                          var(--drop-shadow);
              background: var(--project-color);
          }

          .header {
              background-color: transparent;
              color: gray;
              text-align: center;
              font-weight: bold;
              padding: 1em;
              border-bottom: 1px solid lightgrey;
          }
          .assignment {
              border: 1px solid rgba(0, 0, 125, .1);
              padding: 0.5em ;
              border-radius: 0.5em;
              box-shadow: inset 2px 2px .3em white, inset -2px -2px .2em gray;
              overflow: hidden;
          }
          .assignment.project {
              --pid-color: var(--project-color);
              background-image: linear-gradient(90deg, var(--pid-color), var(--pid-color)  15%, transparent 15%);
              background-blend-mode: color-burn;
              padding: 0.5em 0.5em 0.5em 17%;
          }
          .soll {
              z-index: 10;
              border: 1px solid black;
              border-top-width: 2px;
              border-radius: 0.5rem;
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              user-input: none;
              user-select: none;
              text-align: center;
              font-size: 2em;
              display: flex;
              align-items: center;
              justify-content: center;
              /* default, to be overridden when live: */
              background-color: rgba(255, 255, 255, 0.4);
              opacity: 0.5;
              pointer-events: none;
              color: transparent;
          }
          .soll.live { /* make sure to have higher specificity */
              background-color: var(--hightlight-overlay);
              opacity: 0.7;
              pointer-events: auto;
              color: slateblue;
          }
          .week.drop {
              background-color: var(--hightlight-overlay);
          }
      </style>
</head>

<body>

<h1>Personaleinsatzplanung</h1>

<main>
    <div id="topicsOverWeeks"></div>
</main>


%{-- Relay information to the module by putting it in the window namespace --}%

<script>
  window.grailsServerName = "${request.serverName}"; // note that this is GSP escaped!
  window.grailsServerPort = "${request.serverPort}";
  window.restPath         = '/developers';
  window.appRootId        = 'topicsOverWeeks';                    // keep page specifics in the page

  const URL      = "${createLink(uri: '/stomp')}"; // let gsp put in the current server (relatively) on js creation time
  const channel  = "/queue/broadcast";
  const endpoint = "/app/broadcast";

  const socket   = new SockJS(URL);
  const client   = webstomp.over(socket);

  window.webStompChannel  = channel;
  window.webStompEndPoint = endpoint;
  window.webStompClient   = client;

</script>

</body>
</html>
