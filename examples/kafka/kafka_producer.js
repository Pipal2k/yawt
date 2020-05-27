var kafka = require("kafka-node"),
  Producer = kafka.Producer,
  HighLevelProducer = kafka.HighLevelProducer,
  client = new kafka.KafkaClient();

  const options = {
    // Configuration for when to consider a message as acknowledged, default 1
    requireAcks: 1,
    // The amount of time in milliseconds to wait for all acks before considered, default 100ms
    ackTimeoutMs: 100,
    // Partitioner type (default = 0, random = 1, cyclic = 2, keyed = 3, custom = 4), default 0
    partitionerType: 3
}

  producer = new HighLevelProducer(client,options);

let count = 0;

producer.on("ready", function() {
  console.log("ready");
  setInterval(function() {
    payloads = [
      { topic: "topic101",key: count, messages: `I have ${count} cats`  }
    ];

    producer.send(payloads, function(err, data) {
      console.log(data);
      count += 1;
    });
  }, 5000);
});

producer.on("error", function(err) {
  console.log(err);
});