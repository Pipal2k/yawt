/* first start Kafka container */

const KafkaAvro = require('kafka-node-avro');
const Settings  = {
  "kafka" : {
    "kafkaHost" : "localhost:9092"
  },
  "schema": {
    "registry" : "http://schemaregistry.example.com:8081"
  }
};

KafkaAvro.init(Settings).then( kafka => {
  // ready to use
} , error => {
  // something wrong happen
});