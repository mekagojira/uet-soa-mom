const stompit = require("stompit");

const connectOptions = {
  host: "localhost",
  port: 61613,
  connectHeaders: {
    host: "/",
    "heart-beat": "5000,5000",
  },
};

const website = process.argv[2] || "https://next.voz.vn/";

stompit.connect(connectOptions, function (error, client) {
  if (error) {
    console.log("connect error " + error.message);
    return;
  }

  const sendHeaders = {
    destination: "/queue/test",
    "content-type": "text/plain",
  };

  const frame = client.send(sendHeaders);
  frame.write(website);
  frame.end();
  client.disconnect();
});
