const KafkaAvro = require('kafka-node-avro');

const Settings = {
    "kafka": {
        "kafkaHost": "localhost:9092"
    },
    "schema": {
        "registry": "http://localhost:8081",
        "topics"   : [{
            "name"       : "MYTOPIC",
            "version"    : 1,
            "key_fields" : ["id"]
          }]
    }
};

KafkaAvro.init(Settings).then(kafka => {

    const producer = kafka.addProducer();

    /*producer.send({
        topic: 'topic2',
        key: 'null',
        messages: {
            foo: 'ahaha',
            bar: 'world2'
        }
    }).then(success => {
   
    }, error => {
        console.log(error);
    });*/

    kafka.send({
        topic    : 'MYTOPIC',

        messages : {
          id: '2',
          foo : 'hello',
          bar : 'world'
        }
      }).then( success => {
        // Message was sent encoded with Avro Schema
      }, error => {
        // Something wrong happen
        console.log(error);
      });
    // ready to use
}, error => {
    // something wrong happen
    console.log(error);
});