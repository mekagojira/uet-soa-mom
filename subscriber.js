const stompit = require("stompit");
const crawling = require("./crawling");
const connectOptions = {
  host: "localhost",
  port: 61613,
  connectHeaders: {
    host: "/",
    "heart-beat": "5000,5000",
  },
};

stompit.connect(connectOptions, function (error, client) {
  if (error) {
    console.log("connect error " + error.message);
    return;
  }

  const subscribeHeaders = {
    destination: "/queue/test",
    ack: "client-individual",
  };

  client.subscribe(subscribeHeaders, function (error, message) {
    if (error) {
      console.log("subscribe error " + error.message);
      return;
    }

    message.readString("utf-8", function (error, body) {
      if (error) {
        console.log("read message error " + error.message);
        return;
      }
      client.ack(message);
      return crawling(body);
    });
  });
});
