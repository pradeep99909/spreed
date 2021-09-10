var amqp = require("amqplib/callback_api");

amqp.connect("amqp://192.168.99.101/", function (error0, connection) {
  if (!connection) {
    throw new Error(`AMQP connection not available on ${url}`);
  }
  console.log("CONNECTED TO MQ");
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = "my-queue";

    channel.assertQueue(queue, {
      durable: false
    });
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    channel.consume(
      queue,
      function (msg) {
        console.log(" [x] Received %s", msg.content.toString());
      },
      {
        noAck: true
      }
    );
  });
});
