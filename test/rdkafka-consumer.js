var Kafka = require('node-rdkafka');

var consumer = new Kafka.KafkaConsumer({
    'group.id': 'kafka',
    'metadata.broker.list': 'localhost:9092',
  }, {});

  consumer.connect();

consumer.on('ready', function() {
    consumer.subscribe(['transactions']);

    // Consume from the librdtesting-01 topic. This is what determines
    // the mode we are running in. By not specifying a callback (or specifying
    // only a callback) we get messages as soon as they are available.
    consumer.consume();
  }).on('data', function(data) {
    // Output the actual message contents
    console.log(data.value.toString()+ "  part: "+data.partition);
  });