const kafka = require('kafka-node');
const avroSchemaRegistry = require('avro-schema-registry');

/* Configuration */
const kafkaTopic = 'transactions';//'kafka.test';
const host =  'localhost:9092';
const schemaRegistry = 'http://localhost:8081';

const Consumer = kafka.Consumer;
const Client = kafka.KafkaClient;
const registry = avroSchemaRegistry(schemaRegistry);

var client = new Client(host);
var topics = [{
  topic: kafkaTopic
}];

var options = {
  autoCommit: false,
  fetchMaxWaitMs: 1000,
  fetchMaxBytes: 1024 * 1024,
  encoding: 'buffer'
};

var consumer = new Consumer(client, topics, options);

consumer.on('message', function(rawMessage) {
  console.log("Raw Message", rawMessage);

  registry.decode(rawMessage.value)
    .then((msg) => {
      console.log(msg)
    })
    .catch(err=>console.log(err))
});

consumer.on('error', (e) => {
  console.log(e.message)
  consumer.close();
})