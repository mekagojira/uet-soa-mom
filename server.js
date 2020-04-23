const WebSocket = require("ws");
const ws = new WebSocket("ws://localhost:61614", "stomp");

ws.onopen = () => {
  ws.send("CONNECT\n\n\0");

  ws.send("SUBSCRIBE\ndestination:/topic/SampleTopic\n\nack:auto\n\n\0");
};

ws.onmessage = (e) => {
  if (e.data.startsWith("MESSAGE")) console.log(e.data);
};
