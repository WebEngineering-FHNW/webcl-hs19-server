package ch.fhnw.webcl.pep

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo

class PepWebSocket {

    @MessageMapping("/hello")
    @SendTo("/topic/hello")
    String hello(String world) {
        return "Hello, ${world}!"
    }

}
